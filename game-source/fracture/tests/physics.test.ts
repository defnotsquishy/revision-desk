import assert from 'node:assert/strict';
import { before, test } from 'node:test';
import * as THREE from 'three';
import RAPIER from '@dimforge/rapier3d-compat';
import { Simulation } from '../combat/simulation.ts';
import { ArenaPhysics } from '../physics/world.ts';
import { Ragdoll } from '../physics/ragdoll.ts';
import { FighterAvatar } from '../player/avatar.ts';
import { CombatCamera } from '../camera/orbit.ts';
import type { FrameInput, Vec3 } from '../core/model.ts';

before(async () => { await RAPIER.init(); });

const idle = (): FrameInput => ({ moveX: 0, moveZ: 0, yaw: Math.PI, sprint: false, block: false, actions: [] });
const step = 1 / 60;

function finite(position: Vec3): void {
  assert.ok(Number.isFinite(position.x) && Number.isFinite(position.y) && Number.isFinite(position.z), `Invalid transform: ${JSON.stringify(position)}`);
}

function close(actual: number, expected: number, tolerance = 0.025): void {
  assert.ok(Math.abs(actual - expected) <= tolerance, `${actual} should be near ${expected} (±${tolerance})`);
}

function arena(): { sim: Simulation; physics: ArenaPhysics } {
  const sim = new Simulation();
  const physics = new ArenaPhysics(sim.player.position);
  physics.box({ x: 0, y: -0.15, z: 0 }, { x: 40, y: 0.3, z: 40 });
  physics.world.step();
  return { sim, physics };
}

function advance(sim: Simulation, physics: ArenaPhysics, steps: number, input: FrameInput = idle()): number {
  let peak = sim.player.position.y;
  for (let index = 0; index < steps; index++) {
    sim.tick(step, input);
    physics.move(sim.player, input, step);
    physics.step(step, sim.player);
    finite(sim.player.position);
    peak = Math.max(peak, sim.player.position.y);
  }
  return peak;
}

test('Rapier capsule stops at a fixed wall without sinking or tunnelling', () => {
  const { sim, physics } = arena();
  try {
    physics.box({ x: 0, y: 1, z: -2 }, { x: 10, y: 2, z: 1 });
    physics.world.step();
    advance(sim, physics, 180, { ...idle(), moveZ: -1 });
    // Wall front is -1.5; capsule radius and controller separation keep its centre in front.
    assert.ok(sim.player.position.z > -1.16 && sim.player.position.z < -1.08);
    close(sim.player.position.x, 0);
    close(sim.player.position.y, 0);
    assert.equal(sim.player.grounded, true);
  } finally { physics.dispose(); }
});

test('jump uses the combat impulse, clears ground contact, then lands on the floor', () => {
  const { sim, physics } = arena();
  try {
    advance(sim, physics, 3);
    const input = { ...idle(), actions: ['jump'] as FrameInput['actions'] };
    advance(sim, physics, 1, input);
    assert.equal(sim.player.grounded, false);
    assert.ok(sim.player.position.y > 0.05);
    assert.equal(sim.act('jump'), false);
    const peak = advance(sim, physics, 120);
    assert.ok(peak > 1.3 && peak < 1.65, `Unexpected jump height: ${peak}`);
    close(sim.player.position.y, 0);
    assert.equal(sim.player.grounded, true);
    advance(sim, physics, 1);
    assert.equal(sim.player.state, 'idle');
  } finally { physics.dispose(); }
});

test('walking, sprinting and guarding produce distinct real movement speeds', () => {
  const distance = (sprint: boolean, block: boolean): number => {
    const { sim, physics } = arena();
    try {
      advance(sim, physics, 60, { ...idle(), moveX: 1, sprint, block });
      return sim.player.position.x;
    } finally { physics.dispose(); }
  };
  close(distance(false, false), 6, 0.08);
  close(distance(true, false), 9.5, 0.08);
  close(distance(false, true), 2.2, 0.08);
});

test('dash consumes its directional impulse and stops once recovery finishes', () => {
  const { sim, physics } = arena();
  try {
    advance(sim, physics, 1, { ...idle(), actions: ['dash'] });
    advance(sim, physics, 30);
    const displacement = 7 - sim.player.position.z;
    assert.ok(displacement > 3.1 && displacement < 4, `Unexpected dash travel: ${displacement}`);
    assert.equal(sim.player.velocity.x, 0);
    assert.equal(sim.player.velocity.z, 0);
    assert.equal(sim.act('dash'), false);
    const stopped = sim.player.position.z;
    advance(sim, physics, 30);
    close(sim.player.position.z, stopped, 0.001);
  } finally { physics.dispose(); }
});

test('a dash cannot teleport through a fixed wall', () => {
  const { sim, physics } = arena();
  try {
    physics.box({ x: 0, y: 1, z: 5 }, { x: 10, y: 2, z: 1 });
    physics.world.step();
    advance(sim, physics, 1, { ...idle(), actions: ['dash'] });
    advance(sim, physics, 30);
    assert.ok(sim.player.position.z > 5.85 && sim.player.position.z < 5.95);
    assert.equal(sim.player.grounded, true);
  } finally { physics.dispose(); }
});

test('resetting a jumping player synchronises model and capsule and clears old impulse', () => {
  const { sim, physics } = arena();
  try {
    advance(sim, physics, 1, { ...idle(), actions: ['jump'] });
    advance(sim, physics, 15, { ...idle(), moveX: 1 });
    assert.ok(sim.player.position.y > 0.5);
    sim.resetTraining();
    physics.reset(sim.player);
    advance(sim, physics, 10);
    close(sim.player.position.x, 0);
    close(sim.player.position.z, 7);
    close(sim.player.position.y, 0);
    assert.equal(sim.player.grounded, true);
    assert.ok(sim.player.velocity.y <= 0);
  } finally { physics.dispose(); }
});

test('camera is clipped in front of a wall instead of passing through it', () => {
  const camera = new CombatCamera();
  const geometry = new THREE.BoxGeometry(10, 5, 0.4);
  const material = new THREE.MeshBasicMaterial();
  const wall = new THREE.Mesh(geometry, material);
  try {
    wall.position.set(0, 2, 10);
    wall.updateMatrixWorld(true);
    camera.update({ x: 0, y: 0, z: 7 }, Math.PI, 0.28, step, [wall], false);
    assert.ok(camera.camera.position.z < 9.8 && camera.camera.position.z > 9.2);
    assert.ok(camera.camera.position.y > 1.35);
    camera.resize(1280, 720);
    close(camera.camera.aspect, 1280 / 720, 1e-8);
  } finally { geometry.dispose(); material.dispose(); }
});

test('physical ragdolls create six linked limbs, receive knockback and release all bodies/joints', () => {
  const { sim, physics } = arena();
  const scene = new THREE.Scene();
  const avatar = new FighterAvatar(scene, true);
  const dummy = sim.dummies[0];
  assert.ok(dummy);
  const bodiesBefore = physics.world.bodies.len();
  const collidersBefore = physics.world.colliders.len();
  dummy.velocity = { x: 3, y: 5, z: -7 };
  const ragdoll = new Ragdoll(physics, scene, avatar, dummy);
  try {
    assert.equal(physics.world.bodies.len(), bodiesBefore + 6);
    assert.equal(physics.world.colliders.len(), collidersBefore + 6);
    assert.equal(physics.world.impulseJoints.len(), 5);
    assert.equal(scene.children.length, 2);
    for (let index = 0; index < 120; index++) {
      physics.world.timestep = step;
      physics.world.step();
      ragdoll.update(dummy);
      finite(dummy.position);
      finite(dummy.velocity);
    }
    assert.ok(dummy.position.x > 1 && dummy.position.z < 0, `Ragdoll did not receive its launch: ${JSON.stringify(dummy.position)}`);
    assert.equal(dummy.position.y, 0);
  } finally {
    ragdoll.dispose();
    assert.equal(physics.world.bodies.len(), bodiesBefore);
    assert.equal(physics.world.colliders.len(), collidersBefore);
    assert.equal(physics.world.impulseJoints.len(), 0);
    assert.equal(scene.children.length, 1);
    avatar.dispose();
    assert.equal(scene.children.length, 0);
    physics.dispose();
  }
});

test('the physical-ragdoll owner can bypass capsule writes and restore its model transform', () => {
  const { sim, physics } = arena();
  try {
    sim.player.position = { x: 3, y: 1, z: 4 };
    sim.player.velocity.y = -2;
    physics.playerCollider.setEnabled(false);
    physics.step(step, sim.player, false);
    assert.deepEqual(sim.player.position, { x: 3, y: 1, z: 4 });
    physics.align(sim.player);
    const body = physics.playerBody.translation();
    close(body.x, 3, 1e-6);
    close(body.y, 1.935, 1e-6);
    close(body.z, 4, 1e-6);
    physics.playerCollider.setEnabled(true);
    advance(sim, physics, 60);
    close(sim.player.position.y, 0);
    assert.equal(sim.player.grounded, true);
  } finally { physics.dispose(); }
});
