import * as THREE from 'three';
import RAPIER from '@dimforge/rapier3d-compat';
import type { Fighter, FrameInput, GameFrame, GameSession, GameSettings, LaunchOptions } from './model.ts';
import { Simulation } from '../combat/simulation.ts';
import { getAbilities } from '../characters/vector.ts';
import { GameInput } from '../player/input.ts';
import { FighterAvatar } from '../player/avatar.ts';
import { ArenaPhysics } from '../physics/world.ts';
import { Ragdoll } from '../physics/ragdoll.ts';
import { CityArena } from '../maps/arena.ts';
import { CombatCamera } from '../camera/orbit.ts';
import { ImpactEffects } from '../effects/impacts.ts';
import { CombatAudio } from '../audio/synth.ts';
import { screenShakeAllowed } from '../ui/preferences.ts';

let physicsReady: Promise<void> | undefined;
const timestep = 1 / 60;

export async function launchGame(options: LaunchOptions): Promise<GameSession> {
  let disposed = false;
  let paused = false;
  let raf = 0;
  let settings = { ...options.settings };
  const systemMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let renderer: THREE.WebGLRenderer | undefined;
  let glContext: WebGL2RenderingContext | undefined;
  let physics: ArenaPhysics | undefined;
  let arena: CityArena | undefined;
  let effects: ImpactEffects | undefined;
  let input: GameInput | undefined;
  let observer: ResizeObserver | undefined;
  let debugPanel: HTMLElement | undefined;
  let debugGeometry: THREE.BufferGeometry | undefined;
  let debugMaterial: THREE.LineBasicMaterial | undefined;
  let hitboxGeometry: THREE.BufferGeometry | undefined;
  let hitboxMaterial: THREE.LineBasicMaterial | undefined;
  const abortListeners = new AbortController();
  const scene = new THREE.Scene();
  const camera = new CombatCamera();
  const sim = new Simulation();
  const avatars = new Map<string, FighterAvatar>();
  const ragdolls = new Map<string, Ragdoll>();
  const audio = new CombatAudio();
  const canvas = document.createElement('canvas');
  canvas.className = 'fracture-canvas';
  let accumulator = 0;
  let previous = performance.now();
  let lastFrame = -Infinity;
  let smoothedFps = 60;
  let hitPause = 0;
  let debugLines: THREE.LineSegments | undefined;
  let hitbox: THREE.Line | undefined;
  let showPhysics = false;
  let showCollisions = false;
  let debugFPS: HTMLElement | undefined;
  const pendingActions: FrameInput['actions'] = [];

  const dispose = (): void => {
    if (disposed) return;
    disposed = true;
    cancelAnimationFrame(raf);
    options.signal.removeEventListener('abort', dispose);
    abortListeners.abort();
    observer?.disconnect();
    input?.dispose();
    ragdolls.forEach(item => item.dispose());
    ragdolls.clear();
    avatars.forEach(item => item.dispose());
    avatars.clear();
    effects?.dispose();
    arena?.dispose();
    debugGeometry?.dispose();
    debugMaterial?.dispose();
    hitboxGeometry?.dispose();
    hitboxMaterial?.dispose();
    debugPanel?.remove();
    audio.dispose();
    physics?.dispose();
    renderer?.renderLists.dispose();
    renderer?.dispose();
    renderer?.forceContextLoss();
    if (!renderer) glContext?.getExtension('WEBGL_lose_context')?.loseContext();
    canvas.remove();
    scene.clear();
  };

  const checkAborted = (): void => {
    if (options.signal.aborted || disposed) throw new DOMException('Game launch cancelled', 'AbortError');
  };

  const pause = (): void => {
    if (disposed || paused) return;
    paused = true;
    cancelAnimationFrame(raf);
    input?.pause();
    pendingActions.length = 0;
    sim.setBlock(false);
    accumulator = 0;
  };

  const requestedPause = (): void => {
    if (paused || disposed) return;
    pause();
    options.onPause();
  };

  const resize = (): void => {
    if (!renderer || disposed) return;
    const bounds = options.container.getBoundingClientRect();
    const width = Math.max(1, bounds.width);
    const height = Math.max(1, bounds.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2) * settings.resolution);
    renderer.setSize(width, height, false);
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    camera.resize(width, height);
    if (paused) renderer.render(scene, camera.camera);
  };

  const reconcileAvatars = (): void => {
    for (const fighter of [sim.player, ...sim.dummies]) {
      if (!avatars.has(fighter.id)) avatars.set(fighter.id, new FighterAvatar(scene, fighter.id !== sim.player.id));
    }
  };

  const clearRagdoll = (fighter: Fighter): void => {
    const ragdoll = ragdolls.get(fighter.id);
    if (!ragdoll) return;
    ragdoll.dispose();
    ragdolls.delete(fighter.id);
    sim.externalPhysics.delete(fighter.id);
    fighter.position.y = Math.max(0, fighter.position.y);
    fighter.velocity.y = 0;
    fighter.grounded = true;
    if (fighter.id === sim.player.id && physics) { physics.playerCollider.setEnabled(true); physics.align(fighter); }
  };

  const updateRagdolls = (): void => {
    if (!physics) return;
    for (const fighter of [sim.player, ...sim.dummies]) {
      const active = fighter.state === 'ragdolled' && settings.ragdolls;
      if (active && !ragdolls.has(fighter.id)) {
        const avatar = avatars.get(fighter.id);
        if (!avatar) continue;
        ragdolls.set(fighter.id, new Ragdoll(physics, scene, avatar, fighter));
        sim.externalPhysics.add(fighter.id);
        if (fighter.id === sim.player.id) physics.playerCollider.setEnabled(false);
      } else if (!active && ragdolls.has(fighter.id)) clearRagdoll(fighter);
    }
  };

  const publishFrame = (time: number): void => {
    if (time - lastFrame < 100 || disposed) return;
    lastFrame = time;
    const frame: GameFrame = {
      health: sim.player.health,
      maxHealth: sim.player.maxHealth,
      state: sim.player.state,
      awakening: sim.player.awakening,
      awakenedSeconds: Math.max(0, sim.player.awakenedUntil - sim.now),
      cooldowns: Object.fromEntries(Object.entries(sim.player.cooldowns).map(([key, until]) => [key, Math.max(0, until - sim.now)])),
      abilities: getAbilities(sim.player.awakenedUntil > sim.now).map(ability => ability.name),
      stats: { ...sim.stats },
      fps: Math.round(smoothedFps),
      dummyHealth: sim.dummies[0]?.health ?? 0,
    };
    canvas.dataset.playerPosition = `${sim.player.position.x.toFixed(3)},${sim.player.position.y.toFixed(3)},${sim.player.position.z.toFixed(3)}`;
    canvas.dataset.playerYaw = sim.player.yaw.toFixed(3);
    canvas.dataset.combatState = sim.player.state;
    canvas.dataset.combo = String(sim.player.combo);
    canvas.dataset.ragdolls = String(ragdolls.size);
    canvas.dataset.physicsBodies = String(physics?.world.bodies.len() ?? 0);
    options.onFrame(frame);
    if (debugFPS) debugFPS.textContent = `${Math.round(smoothedFps)} FPS · ${renderer?.info.render.calls ?? 0} draws · ${physics?.world.bodies.len() ?? 0} bodies`;
  };

  const renderDebug = (): void => {
    if (!import.meta.env.DEV || !physics) return;
    if (debugLines && debugGeometry) {
      debugLines.visible = showPhysics || showCollisions;
      if (debugLines.visible) {
        const data = physics.world.debugRender(showPhysics ? undefined : RAPIER.QueryFilterFlags.ONLY_FIXED);
        const existing = debugGeometry.getAttribute('position');
        if (!existing || existing.array.length !== data.vertices.length) {
          debugGeometry.dispose();
          debugGeometry.setAttribute('position', new THREE.BufferAttribute(data.vertices, 3));
          debugGeometry.setAttribute('color', new THREE.BufferAttribute(data.colors, 4));
        } else {
          (existing.array as Float32Array).set(data.vertices);
          existing.needsUpdate = true;
          const color = debugGeometry.getAttribute('color');
          (color.array as Float32Array).set(data.colors);
          color.needsUpdate = true;
        }
        debugGeometry.computeBoundingSphere();
      }
    }
    if (hitbox?.visible) {
      hitbox.position.set(sim.player.position.x, sim.player.position.y + 0.9, sim.player.position.z);
      hitbox.rotation.y = sim.player.yaw;
    }
  };

  const loop = (time: number): void => {
    if (disposed || paused || !renderer || !physics || !input || !arena || !effects) return;
    try {
      const elapsed = Math.min(0.1, Math.max(0, (time - previous) / 1000));
      const allowShake = screenShakeAllowed(settings.shake, document.documentElement.dataset.motion, systemMotion.matches);
      previous = time;
      if (elapsed > 0) smoothedFps += (1 / elapsed - smoothedFps) * 0.06;
      const frameInput = input.frame();
      pendingActions.push(...frameInput.actions);
      const freeze = Math.min(elapsed, hitPause);
      hitPause -= freeze;
      accumulator += elapsed - freeze;
      while (accumulator >= timestep) {
        const fixedInput = { ...frameInput, actions: pendingActions.splice(0) };
        sim.tick(timestep, fixedInput);
        reconcileAvatars();
        updateRagdolls();
        arena.syncProps();
        const physicalPlayer = ragdolls.has(sim.player.id);
        if (!physicalPlayer) physics.move(sim.player, fixedInput, timestep);
        physics.step(timestep, sim.player, !physicalPlayer);
        ragdolls.forEach((ragdoll, id) => {
          const fighter = id === sim.player.id ? sim.player : sim.dummies.find(candidate => candidate.id === id);
          if (fighter) { ragdoll.update(fighter); if (id === sim.player.id) physics?.align(fighter); }
        });
        for (const event of sim.takeEvents()) {
          effects.emit(event);
          audio.play(event);
          if (event.type === 'hit') { hitPause = Math.max(hitPause, 0.038); if (allowShake) camera.impact(event.strength ?? 4); }
          if (event.type === 'awake' && allowShake) camera.impact(9);
        }
        accumulator -= timestep;
      }
      for (const fighter of [sim.player, ...sim.dummies]) avatars.get(fighter.id)?.update(fighter, elapsed - freeze, sim.now, ragdolls.has(fighter.id));
      effects.update(elapsed);
      scene.updateMatrixWorld(true);
      camera.update(sim.player.position, input.yaw, input.pitch, elapsed, arena.walls.filter(wall => wall.visible), allowShake);
      renderDebug();
      renderer.render(scene, camera.camera);
      publishFrame(time);
      raf = requestAnimationFrame(loop);
    } catch (error) {
      pause();
      const message = error instanceof Error ? error.message : String(error);
      options.onError(`The arena stopped safely: ${message}. Leave and launch again.`);
    }
  };

  const resetTraining = (): void => {
    if (disposed || !physics) return;
    [sim.player, ...sim.dummies].forEach(clearRagdoll);
    sim.resetTraining();
    physics.reset(sim.player);
    if (input) input.yaw = Math.PI;
    arena?.syncProps();
    lastFrame = -Infinity;
    publishFrame(performance.now());
  };

  const updateSettings = (next: GameSettings): void => {
    if (disposed) return;
    settings = { ...next };
    if (input) input.sensitivity = settings.sensitivity;
    audio.setVolume(settings.volume);
    arena?.settings(settings);
    effects?.updateSettings(settings);
    if (renderer) renderer.shadowMap.enabled = settings.shadows;
    if (!settings.ragdolls) [sim.player, ...sim.dummies].forEach(clearRagdoll);
    resize();
  };

  options.signal.addEventListener('abort', dispose, { once: true });
  try {
    checkAborted();
    glContext = canvas.getContext('webgl2', { antialias: true, alpha: false, powerPreference: 'high-performance' }) ?? undefined;
    if (!glContext) throw new Error('FRACTURE needs WebGL 2. Try an up-to-date Chrome, Edge or Firefox with hardware acceleration enabled. Your browser or school policy may disable 3D graphics.');
    options.onStage('Map');
    physicsReady ??= RAPIER.init().catch(error => { physicsReady = undefined; throw error; });
    await physicsReady;
    checkAborted();
    renderer = new THREE.WebGLRenderer({ canvas, context: glContext, antialias: true });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    physics = new ArenaPhysics(sim.player.position);
    arena = new CityArena(scene, physics, sim.props);
    checkAborted();
    options.onStage('Character');
    reconcileAvatars();
    options.onStage('Animations');
    for (const fighter of [sim.player, ...sim.dummies]) avatars.get(fighter.id)?.update(fighter, 0, sim.now, false);
    scene.updateMatrixWorld(true);
    checkAborted();
    options.onStage('Effects');
    effects = new ImpactEffects(scene, settings);
    audio.setVolume(settings.volume);
    options.container.append(canvas);
    input = new GameInput(canvas, requestedPause, () => audio.unlock());
    canvas.addEventListener('webglcontextlost', event => {
      event.preventDefault();
      requestedPause();
      options.onError('The browser lost its 3D graphics context. Leave the arena, choose Low graphics and launch again.');
    }, { signal: abortListeners.signal });
    document.addEventListener('visibilitychange', () => { if (document.hidden) requestedPause(); }, { signal: abortListeners.signal });
    observer = new ResizeObserver(resize);
    observer.observe(options.container);
    updateSettings(settings);
    physics.world.step();
    camera.update(sim.player.position, Math.PI, 0.28, timestep, arena.walls, false);
    renderer.render(scene, camera.camera);
    checkAborted();

    if (import.meta.env.DEV) {
      const panel = document.createElement('details');
      panel.className = 'fracture-devtools';
      panel.style.cssText = 'position:absolute;right:12px;top:12px;z-index:6;max-width:280px;padding:8px;background:#111c;color:#fff;font:12px system-ui;border:1px solid #667;';
      const summary = document.createElement('summary');
      summary.textContent = 'Developer tools';
      panel.append(summary);
      debugFPS = document.createElement('p');
      panel.append(debugFPS);
      const button = (label: string, action: (element: HTMLButtonElement) => void): void => {
        const element = document.createElement('button');
        element.type = 'button';
        element.textContent = label;
        element.addEventListener('click', () => action(element), { signal: abortListeners.signal });
        panel.append(element);
      };
      button('Reset player & arena', () => resetTraining());
      button('Heal player', () => { sim.debugHeal(); lastFrame = -Infinity; publishFrame(performance.now()); });
      button('Fill awakening', () => { sim.debugAwaken(); lastFrame = -Infinity; publishFrame(performance.now()); });
      button('Spawn dummy', () => { sim.debugSpawnDummy({ x: sim.player.position.x + Math.sin(sim.player.yaw) * 3, y: 0, z: sim.player.position.z + Math.cos(sim.player.yaw) * 3 }); reconcileAvatars(); });
      button('Reload character', () => { avatars.get(sim.player.id)?.dispose(); avatars.delete(sim.player.id); reconcileAvatars(); });
      debugGeometry = new THREE.BufferGeometry();
      debugMaterial = new THREE.LineBasicMaterial({ vertexColors: true, depthTest: false });
      debugLines = new THREE.LineSegments(debugGeometry, debugMaterial);
      debugLines.frustumCulled = false;
      scene.add(debugLines);
      const points = [new THREE.Vector3(0, 0, 0)];
      for (let i = 0; i <= 20; i++) {
        const angle = -0.85 + 1.7 * i / 20;
        points.push(new THREE.Vector3(Math.sin(angle) * 3, 0, Math.cos(angle) * 3));
      }
      points.push(new THREE.Vector3(0, 0, 0));
      hitboxGeometry = new THREE.BufferGeometry().setFromPoints(points);
      hitboxMaterial = new THREE.LineBasicMaterial({ color: 0xffff55, depthTest: false });
      hitbox = new THREE.Line(hitboxGeometry, hitboxMaterial);
      hitbox.visible = false;
      scene.add(hitbox);
      button('M1 hitbox', element => { if (hitbox) { hitbox.visible = !hitbox.visible; element.setAttribute('aria-pressed', String(hitbox.visible)); } });
      button('Collision boxes', element => { showCollisions = !showCollisions; element.setAttribute('aria-pressed', String(showCollisions)); });
      button('Physics debug', element => { showPhysics = !showPhysics; element.setAttribute('aria-pressed', String(showPhysics)); });
      button('Toggle FPS', element => { if (debugFPS) { debugFPS.hidden = !debugFPS.hidden; element.setAttribute('aria-pressed', String(!debugFPS.hidden)); } });
      options.container.append(panel);
      debugPanel = panel;
    }
    publishFrame(performance.now());
    previous = performance.now();
    raf = requestAnimationFrame(loop);
    // Mouse capture is requested only by an actual canvas/Resume click, not after an asynchronous asset load.
    canvas.focus({ preventScroll: true });
    return {
      dispose,
      pause,
      resume: () => {
        if (disposed) return;
        paused = false;
        previous = performance.now();
        input?.resume();
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(loop);
      },
      updateSettings,
      resetTraining,
    };
  } catch (error) {
    dispose();
    if (error instanceof DOMException && error.name === 'AbortError') throw error;
    const message = error instanceof Error ? error.message : 'The game could not start. Try Low graphics or another modern browser.';
    options.onError(message);
    throw error;
  }
}
