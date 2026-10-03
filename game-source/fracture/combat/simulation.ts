import type { Action, ArenaProp, CombatEvent, Fighter, FrameInput, TrainingStats, Vec3 } from '../core/model.ts';
import { M1, VECTOR, getAbility } from '../characters/vector.ts';
import type { AbilityConfig } from '../characters/vector.ts';
import { containsFighter, directionFrom, isFrontalBlock } from '../abilities/hitboxes.ts';

interface Impact {
  at: number;
  serial: number;
  yaw: number;
  name: string;
  damage: number;
  range: number;
  cone: number;
  knockback: number;
  stun: number;
  ragdoll: number;
  breaksBlock: boolean;
  shape: 'cone' | 'radial' | 'well';
  config?: AbilityConfig;
}
interface Well { origin: Vec3; ends: number; next: number; config: AbilityConfig }
const zero = (): Vec3 => ({ x: 0, y: 0, z: 0 });
const copy = (position: Vec3): Vec3 => ({ ...position });
const clamp = (value: number, min: number, max: number): number => Math.max(min, Math.min(max, value));
const locked = new Set(['stunned', 'ragdolled', 'awakening', 'attacking', 'dashing']);

function fighter(id: string, position: Vec3, yaw: number): Fighter {
  return { id, position: copy(position), velocity: zero(), yaw, health: 100, maxHealth: 100, state: 'idle', stateUntil: 0, grounded: true, combo: 0, comboUntil: 0, nextAttack: 0, cooldowns: {}, awakening: 0, awakenedUntil: 0, attackSerial: 0 };
}

/** Pure, fixed-step combat. Rendering/physics adapters own the player transform. */
export class Simulation {
  player = fighter('player', { x: 0, y: 0, z: 7 }, Math.PI);
  dummies = [fighter('dummy-1', { x: 0, y: 0, z: 2 }, 0), fighter('dummy-2', { x: 7, y: 0, z: -5 }, Math.PI)];
  props: ArenaProp[] = [
    { id: 'crate-1', position: { x: -5, y: 0.7, z: 3 }, size: { x: 1.4, y: 1.4, z: 1.4 }, health: 28, maxHealth: 28, respawnAt: 0 },
    { id: 'crate-2', position: { x: -6.7, y: 0.7, z: 3 }, size: { x: 1.4, y: 1.4, z: 1.4 }, health: 28, maxHealth: 28, respawnAt: 0 },
    { id: 'barrier-1', position: { x: 6, y: 1.1, z: 3 }, size: { x: 3, y: 2.2, z: 0.55 }, health: 42, maxHealth: 42, respawnAt: 0 },
  ];
  now = 0;
  stats: TrainingStats = { damage: 0, comboDamage: 0, hits: 0, dps: 0 };
  events: CombatEvent[] = [];
  readonly externalPhysics = new Set<string>();
  private impacts: Impact[] = [];
  private wells: Well[] = [];
  private input: FrameInput = { moveX: 0, moveZ: 0, yaw: Math.PI, sprint: false, block: false, actions: [] };
  private firstHit = -1;
  private lastHit = -1;
  private playerRespawnAt = 0;
  private dummyRespawns = new Map<string, number>();
  private spawnPoints = new Map(this.dummies.map(dummy => [dummy.id, copy(dummy.position)]));

  tick(dt: number, input: FrameInput): void {
    if (!Number.isFinite(dt) || dt < 0) return;
    this.input = input;
    if (Number.isFinite(input.yaw)) this.player.yaw = input.yaw;
    this.setBlock(input.block);
    for (const action of input.actions) this.act(action);
    // Split elapsed time so impulses, wells and delayed active frames behave the same at low FPS.
    let remaining = Math.min(dt, 2);
    while (remaining > 1e-9) {
      const step = Math.min(remaining, 1 / 120);
      this.now += step;
      this.step(step);
      remaining -= step;
    }
  }

  act(action: Action): boolean {
    const player = this.player;
    if (player.health <= 0 || locked.has(player.state) || player.state === 'blocking') return false;
    if (action === 'jump') {
      if (!player.grounded) return false;
      player.grounded = false;
      player.velocity.y = 8.5;
      player.state = 'jumping';
      player.stateUntil = 0;
      return true;
    }
    if (action === 'dash' || action === 'special') {
      const config = action === 'dash' ? VECTOR.dash : VECTOR.special;
      if ((player.cooldowns[action] ?? 0) > this.now) return false;
      const direction = this.moveDirection();
      player.velocity.x = direction.x * config.speed;
      player.velocity.z = direction.z * config.speed;
      player.state = 'dashing';
      player.stateUntil = this.now + config.duration;
      player.cooldowns[action] = this.now + config.cooldown;
      this.emit({ type: 'dash', position: copy(player.position), attackerId: player.id, strength: config.speed, ability: action === 'special' ? VECTOR.special.name : 'Dash' });
      return true;
    }
    if (action === 'awaken') {
      if (player.awakening < 100 || player.awakenedUntil > this.now || !player.grounded) return false;
      player.awakening = 0;
      player.awakenedUntil = this.now + VECTOR.awakening.transformation + VECTOR.awakening.duration;
      player.state = 'awakening';
      player.stateUntil = this.now + VECTOR.awakening.transformation;
      for (const key of ['ability1', 'ability2', 'ability3', 'ability4']) player.cooldowns[key] = this.now;
      this.emit({ type: 'awake', position: copy(player.position), attackerId: player.id, ability: VECTOR.awakening.name, strength: VECTOR.awakening.duration });
      return true;
    }
    if (action === 'm1') return this.melee();
    const ability = getAbility(action, player.awakenedUntil > this.now);
    if (!ability || (player.cooldowns[ability.key] ?? 0) > this.now) return false;
    player.cooldowns[ability.key] = this.now + ability.cooldown;
    player.combo = 0;
    player.comboUntil = 0;
    this.beginImpact({ name: ability.name, damage: ability.damage, range: ability.range, cone: ability.cone, knockback: ability.knockback, stun: ability.stun, ragdoll: ability.ragdoll, breaksBlock: ability.breaksBlock, shape: ability.shape, config: ability }, ability.startup, ability.recovery);
    return true;
  }

  setBlock(enabled: boolean): void {
    const player = this.player;
    if (enabled && player.health > 0 && player.grounded && !locked.has(player.state)) {
      player.state = 'blocking';
      player.stateUntil = Infinity;
    } else if (!enabled && player.state === 'blocking') {
      player.state = player.grounded ? 'idle' : 'jumping';
      player.stateUntil = 0;
    }
  }

  takeEvents(): CombatEvent[] { const events = this.events; this.events = []; return events; }

  resetTraining(): void {
    const now = this.now;
    const replacement = fighter('player', { x: 0, y: 0, z: 7 }, Math.PI);
    Object.assign(this.player, replacement);
    for (const dummy of this.dummies) Object.assign(dummy, fighter(dummy.id, this.spawnPoints.get(dummy.id) ?? { x: 0, y: 0, z: 2 }, dummy.id === 'dummy-1' ? 0 : Math.PI));
    for (const prop of this.props) { prop.health = prop.maxHealth; prop.respawnAt = 0; }
    this.impacts = [];
    this.wells = [];
    this.dummyRespawns.clear();
    this.playerRespawnAt = 0;
    this.externalPhysics.clear();
    this.firstHit = -1;
    this.lastHit = -1;
    Object.assign(this.stats, { damage: 0, comboDamage: 0, hits: 0, dps: 0 });
    this.now = now;
    this.events = [{ type: 'respawn', position: copy(this.player.position), targetId: this.player.id }];
  }

  debugHeal(): void { this.player.health = this.player.maxHealth; }
  debugAwaken(): void { if (this.player.awakenedUntil <= this.now) this.player.awakening = 100; }
  debugSpawnDummy(position?: Vec3): Fighter {
    const spawn = position && [position.x, position.y, position.z].every(Number.isFinite)
      ? { x: clamp(position.x, -22, 22), y: Math.max(0, position.y), z: clamp(position.z, -22, 22) }
      : { x: this.player.position.x + Math.sin(this.player.yaw) * 4, y: 0, z: this.player.position.z + Math.cos(this.player.yaw) * 4 };
    const dummy = fighter(`dummy-${this.dummies.length + 1}`, spawn, this.player.yaw + Math.PI);
    this.dummies.push(dummy);
    this.spawnPoints.set(dummy.id, copy(spawn));
    this.emit({ type: 'respawn', position: copy(spawn), targetId: dummy.id });
    return dummy;
  }

  /** Incoming damage is an authority-side operation: network clients must send attempted actions, never this amount. */
  receiveDamage(amount: number, origin: Vec3, knockback = 0, ragdoll = 0, stun = 0.3, breaksBlock = false): boolean {
    const player = this.player;
    if (!Number.isFinite(amount) || amount <= 0 || ![origin.x, origin.y, origin.z, knockback, ragdoll, stun].every(Number.isFinite)) return false;
    if (player.health <= 0 || player.state === 'awakening' || player.state === 'dashing') return false;
    const blocked = isFrontalBlock(player, origin) && !breaksBlock;
    const damage = Math.min(player.health, Math.min(amount, 100) * (blocked ? 0.12 : 1));
    player.health = Math.max(0, player.health - damage);
    if (player.awakenedUntil <= this.now) player.awakening = clamp(player.awakening + damage * VECTOR.awakening.receivedGain, 0, 100);
    if (!blocked) {
      player.attackSerial += 1;
      const direction = directionFrom(origin, player.position, player.yaw);
      player.velocity.x = direction.x * clamp(knockback, 0, 30);
      player.velocity.z = direction.z * clamp(knockback, 0, 30);
      if (ragdoll > 0) { player.velocity.y = 5; player.grounded = false; }
      player.state = ragdoll > 0 ? 'ragdolled' : 'stunned';
      player.stateUntil = this.now + clamp(Math.max(ragdoll, stun), 0.05, 3);
    }
    this.emit({ type: blocked ? 'block' : 'hit', position: copy(player.position), targetId: player.id, attackerId: 'opponent', damage, strength: knockback });
    if (player.health === 0) { player.state = 'ragdolled'; player.stateUntil = Infinity; this.playerRespawnAt = this.now + 3; }
    return true;
  }

  private emit(event: CombatEvent): void {
    // A neglected rendering subscriber must not turn an offline training session into an unbounded queue.
    if (this.events.length >= 256) this.events.shift();
    this.events.push(event);
  }

  private moveDirection(): Vec3 {
    const x = Number.isFinite(this.input.moveX) ? this.input.moveX : 0;
    const z = Number.isFinite(this.input.moveZ) ? this.input.moveZ : 0;
    const length = Math.hypot(x, z);
    return length > 0.05 ? { x: x / length, y: 0, z: z / length } : { x: Math.sin(this.player.yaw), y: 0, z: Math.cos(this.player.yaw) };
  }

  private melee(): boolean {
    const player = this.player;
    if (player.nextAttack > this.now) return false;
    if (player.comboUntil <= this.now || player.combo >= 4) { player.combo = 0; this.stats.comboDamage = 0; }
    player.combo += 1;
    const hit = M1[player.combo - 1];
    if (!hit) return false;
    player.comboUntil = this.now + 1.05;
    player.nextAttack = this.now + hit.next;
    this.beginImpact({ name: `M1 ${player.combo}`, damage: hit.damage, range: 3, cone: 0.85, knockback: hit.knockback, stun: hit.stun, ragdoll: hit.ragdoll, breaksBlock: player.combo === 4, shape: 'cone' }, hit.startup, hit.recovery);
    return true;
  }

  private beginImpact(impact: Omit<Impact, 'at' | 'serial' | 'yaw'>, startup: number, recovery: number): void {
    this.player.attackSerial += 1;
    this.player.state = 'attacking';
    this.player.stateUntil = this.now + recovery;
    this.player.velocity.x = 0;
    this.player.velocity.z = 0;
    this.impacts.push({ ...impact, at: this.now + startup, serial: this.player.attackSerial, yaw: this.player.yaw });
    this.emit({ type: 'attack', position: copy(this.player.position), attackerId: this.player.id, ability: impact.name, strength: impact.damage });
  }

  private step(dt: number): void {
    const player = this.player;
    if (this.playerRespawnAt > 0 && this.playerRespawnAt <= this.now) {
      Object.assign(player, fighter('player', { x: 0, y: 0, z: 7 }, Math.PI));
      this.playerRespawnAt = 0;
      this.impacts = [];
      this.emit({ type: 'respawn', position: copy(player.position), targetId: player.id });
    }
    if (player.awakenedUntil > 0 && player.awakenedUntil <= this.now) player.awakenedUntil = 0;
    this.recover(player);
    if (player.comboUntil > 0 && player.comboUntil <= this.now) { player.combo = 0; player.comboUntil = 0; this.stats.comboDamage = 0; }
    if (player.state === 'jumping' && player.grounded) player.state = 'idle';
    if (player.state === 'idle' || player.state === 'running') player.state = Math.hypot(this.input.moveX, this.input.moveZ) > 0.05 ? 'running' : 'idle';
    if (this.input.block) this.setBlock(true);
    const ready = this.impacts.filter(impact => impact.at <= this.now + 1e-8);
    this.impacts = this.impacts.filter(impact => impact.at > this.now + 1e-8);
    for (const impact of ready) {
      if (impact.serial !== player.attackSerial || player.health <= 0 || player.state === 'stunned' || player.state === 'ragdolled') continue;
      this.resolveImpact(impact);
    }
    this.stepWells(dt);
    for (const dummy of this.dummies) {
      const respawn = this.dummyRespawns.get(dummy.id);
      if (respawn !== undefined && this.now >= respawn) {
        Object.assign(dummy, fighter(dummy.id, this.spawnPoints.get(dummy.id) ?? { x: 0, y: 0, z: 2 }, dummy.id === 'dummy-1' ? 0 : Math.PI));
        this.dummyRespawns.delete(dummy.id);
        this.externalPhysics.delete(dummy.id);
        this.emit({ type: 'respawn', position: copy(dummy.position), targetId: dummy.id });
      }
      this.recover(dummy);
      if (!this.externalPhysics.has(dummy.id)) this.integrateDummy(dummy, dt);
    }
    for (const prop of this.props) {
      if (prop.health <= 0 && prop.respawnAt <= this.now) {
        prop.health = prop.maxHealth;
        prop.respawnAt = 0;
        this.emit({ type: 'respawn', position: copy(prop.position), targetId: prop.id });
      }
    }
    if (this.firstHit >= 0) this.stats.dps = this.stats.damage / Math.max(1, this.now - this.firstHit);
    if (this.lastHit >= 0 && this.now - this.lastHit > 1.5 && player.combo === 0) this.stats.comboDamage = 0;
  }

  private recover(target: Fighter): void {
    if (target.health <= 0 || target.state === 'blocking' || target.stateUntil > this.now) return;
    if (locked.has(target.state)) {
      const dashEnded = target.state === 'dashing';
      target.state = target.grounded ? 'idle' : 'jumping';
      target.stateUntil = 0;
      if (dashEnded) { target.velocity.x = 0; target.velocity.z = 0; }
    }
  }

  private resolveImpact(impact: Impact): void {
    const origin = copy(this.player.position);
    if (impact.shape === 'well' && impact.config?.well) {
      origin.x += Math.sin(impact.yaw) * impact.range;
      origin.z += Math.cos(impact.yaw) * impact.range;
      origin.y = 0;
      this.wells.push({ origin, config: impact.config, ends: this.now + impact.config.well.duration, next: this.now });
      this.emit({ type: 'well', position: copy(origin), attackerId: this.player.id, ability: impact.name, strength: impact.config.well.radius });
      return;
    }
    const hitbox = { origin, yaw: impact.yaw, range: impact.range, cone: impact.cone, shape: impact.shape === 'radial' ? 'radial' as const : 'cone' as const };
    for (const target of this.dummies) if (containsFighter(hitbox, target)) this.damage(target, impact, origin);
    if (impact.knockback >= 7) {
      for (const prop of this.props) {
        if (prop.health <= 0) continue;
        const test = fighter(prop.id, { x: prop.position.x, y: 0, z: prop.position.z }, 0);
        if (!containsFighter({ ...hitbox, range: hitbox.range + Math.max(prop.size.x, prop.size.z) * 0.5 }, test)) continue;
        prop.health = Math.max(0, prop.health - impact.damage * 1.5);
        if (prop.health === 0) {
          prop.respawnAt = this.now + 12;
          this.emit({ type: 'break', position: copy(prop.position), attackerId: this.player.id, targetId: prop.id, strength: impact.knockback, ability: impact.name });
        }
      }
    }
  }

  private damage(target: Fighter, impact: Impact, origin: Vec3): void {
    if (target.health <= 0 || target.state === 'awakening' || target.state === 'dashing') return;
    const blocked = isFrontalBlock(target, origin) && !impact.breaksBlock;
    const amount = Math.min(target.health, blocked ? impact.damage * 0.12 : impact.damage);
    target.health = Math.max(0, target.health - amount);
    if (blocked) {
      this.emit({ type: 'block', position: copy(target.position), targetId: target.id, attackerId: this.player.id, damage: amount, ability: impact.name });
    } else {
      const direction = directionFrom(origin, target.position, impact.yaw);
      target.velocity.x = direction.x * impact.knockback;
      target.velocity.z = direction.z * impact.knockback;
      if (impact.ragdoll > 0) { target.velocity.y = 4.2 + impact.knockback * 0.12; target.grounded = false; }
      if (target.state !== 'ragdolled' || target.stateUntil <= this.now || impact.ragdoll > 0) {
        const existingUntil = Number.isFinite(target.stateUntil) ? target.stateUntil : 0;
        target.state = impact.ragdoll > 0 ? 'ragdolled' : 'stunned';
        target.stateUntil = Math.max(existingUntil, this.now + Math.max(impact.ragdoll, impact.stun));
      }
      this.emit({ type: 'hit', position: copy(target.position), targetId: target.id, attackerId: this.player.id, damage: amount, strength: impact.knockback, ability: impact.name });
    }
    this.recordDamage(amount);
    if (target.health === 0) {
      target.state = 'ragdolled';
      target.stateUntil = Infinity;
      this.dummyRespawns.set(target.id, this.now + 3);
    }
  }

  private recordDamage(amount: number): void {
    if (this.firstHit < 0) this.firstHit = this.now;
    if (this.lastHit < 0 || this.now - this.lastHit > 1.5) this.stats.comboDamage = 0;
    this.lastHit = this.now;
    this.stats.damage += amount;
    this.stats.comboDamage += amount;
    this.stats.hits += 1;
    if (this.player.awakenedUntil <= this.now) this.player.awakening = clamp(this.player.awakening + amount * VECTOR.awakening.dealtGain, 0, 100);
  }

  private stepWells(dt: number): void {
    this.wells = this.wells.filter(well => well.ends > this.now);
    for (const well of this.wells) {
      const config = well.config.well;
      if (!config) continue;
      for (const target of this.dummies) {
        if (target.health <= 0 || Math.abs(target.position.y - well.origin.y) > 3) continue;
        const distance = Math.hypot(target.position.x - well.origin.x, target.position.z - well.origin.z);
        if (distance > config.radius || distance < 0.1) continue;
        const direction = directionFrom(target.position, well.origin, 0);
        target.velocity.x += direction.x * config.pull * dt;
        target.velocity.z += direction.z * config.pull * dt;
      }
      if (well.next <= this.now) {
        well.next += config.interval;
        const impact: Impact = { at: this.now, serial: this.player.attackSerial, yaw: 0, name: well.config.name, damage: well.config.damage, range: config.radius, cone: Math.PI, knockback: 0, stun: well.config.stun, ragdoll: 0, breaksBlock: false, shape: 'radial' };
        for (const target of this.dummies) if (containsFighter({ origin: well.origin, yaw: 0, range: config.radius, cone: Math.PI, shape: 'radial' }, target)) {
          const velocity = copy(target.velocity);
          this.damage(target, impact, well.origin);
          // Gravity pulses apply damage without discarding the pull accumulated by the persistent field.
          target.velocity.x = velocity.x;
          target.velocity.z = velocity.z;
        }
      }
    }
  }

  private integrateDummy(target: Fighter, dt: number): void {
    target.velocity.y -= target.grounded ? 0 : 20 * dt;
    target.position.x = clamp(target.position.x + target.velocity.x * dt, -23, 23);
    target.position.z = clamp(target.position.z + target.velocity.z * dt, -23, 23);
    target.position.y = Math.max(0, target.position.y + target.velocity.y * dt);
    if (target.position.y <= 0) {
      target.grounded = true;
      target.velocity.y = 0;
      if (target.state === 'jumping') target.state = 'idle';
    }
    const drag = Math.exp(-(target.grounded ? 8 : 1.5) * dt);
    target.velocity.x *= drag;
    target.velocity.z *= drag;
  }
}
