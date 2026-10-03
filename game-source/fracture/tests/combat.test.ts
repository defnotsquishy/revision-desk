import assert from 'node:assert/strict';
import test from 'node:test';
import { Simulation } from '../combat/simulation.ts';
import { VECTOR, getAbilities } from '../characters/vector.ts';
import type { FrameInput } from '../core/model.ts';

const idle = (yaw = Math.PI): FrameInput => ({ moveX: 0, moveZ: 0, yaw, sprint: false, block: false, actions: [] });
function advance(sim: Simulation, seconds: number, input: FrameInput = idle(sim.player.yaw)): void {
  let remaining = seconds;
  while (remaining > 1e-8) { const dt = Math.min(remaining, 0.1); sim.tick(dt, input); remaining -= dt; }
}
function nearDummy(): Simulation { const sim = new Simulation(); sim.player.position.z = 4.6; return sim; }
function close(actual: number, expected: number, tolerance = 1e-6): void { assert.ok(Math.abs(actual - expected) < tolerance, `${actual} should equal ${expected}`); }

test('default coordinates and normal motion remain owned by the physics adapter', () => {
  const sim = new Simulation();
  assert.deepEqual(sim.player.position, { x: 0, y: 0, z: 7 });
  assert.deepEqual(sim.dummies[0]?.position, { x: 0, y: 0, z: 2 });
  sim.tick(0.5, { ...idle(), moveX: 1, moveZ: -1, sprint: true });
  assert.deepEqual(sim.player.position, { x: 0, y: 0, z: 7 });
  assert.equal(sim.player.state, 'running');
  close(sim.now, 0.5);
});

test('melee hits only after startup and one active frame cannot deal repeated damage', () => {
  const sim = nearDummy();
  assert.equal(sim.act('m1'), true);
  assert.equal(sim.dummies[0]?.health, 100);
  advance(sim, 0.07);
  assert.equal(sim.dummies[0]?.health, 100);
  advance(sim, 0.04);
  assert.equal(sim.dummies[0]?.health, 94);
  advance(sim, 0.2);
  assert.equal(sim.dummies[0]?.health, 94);
  assert.equal(sim.stats.hits, 1);
  assert.equal(sim.takeEvents().filter(event => event.type === 'hit').length, 1);
  assert.deepEqual(sim.takeEvents(), []);
});

test('melee is range-, height- and direction-limited', () => {
  const distant = new Simulation();
  distant.act('m1'); advance(distant, 0.15);
  assert.equal(distant.stats.hits, 0);
  const behind = nearDummy(); behind.player.yaw = 0;
  behind.act('m1'); advance(behind, 0.15, idle(0));
  assert.equal(behind.stats.hits, 0);
  const above = nearDummy(); above.player.position.y = 4;
  above.act('m1'); advance(above, 0.15);
  assert.equal(above.stats.hits, 0);
});

test('four-hit combo ends in knockback/ragdoll, with a protected recovery window', () => {
  const sim = nearDummy();
  for (let hit = 1; hit <= 4; hit += 1) {
    assert.equal(sim.act('m1'), true);
    assert.equal(sim.player.combo, hit);
    assert.equal(sim.act('m1'), false);
    advance(sim, hit === 3 ? 0.31 : hit === 4 ? 0.2 : 0.28);
  }
  assert.equal(sim.dummies[0]?.health, 71);
  assert.equal(sim.stats.damage, 29);
  assert.equal(sim.stats.comboDamage, 29);
  assert.equal(sim.dummies[0]?.state, 'ragdolled');
  assert.ok((sim.dummies[0]?.velocity.z ?? 0) < -5);
  assert.equal(sim.act('m1'), false);
  advance(sim, 0.6);
  assert.equal(sim.act('m1'), true);
  assert.equal(sim.player.combo, 1);
});

test('expired chains reset and a frame containing M1 spam accepts only one action', () => {
  const sim = nearDummy();
  sim.tick(0.01, { ...idle(), actions: ['m1', 'm1', 'm1', 'm1'] });
  assert.equal(sim.player.attackSerial, 1);
  advance(sim, 1.2);
  assert.equal(sim.player.combo, 0);
  assert.equal(sim.act('m1'), true);
  assert.equal(sim.player.combo, 1);
});

test('frontal guarding reduces damage, rear attacks bypass it, heavy finisher breaks it', () => {
  const sim = nearDummy();
  const dummy = sim.dummies[0]; assert.ok(dummy);
  dummy.state = 'blocking'; dummy.stateUntil = Infinity; dummy.yaw = 0;
  sim.act('m1'); advance(sim, 0.15);
  close(dummy.health, 99.28);
  assert.equal(dummy.state, 'blocking');
  assert.ok(sim.takeEvents().some(event => event.type === 'block'));
  advance(sim, 0.2); dummy.yaw = Math.PI;
  sim.act('m1'); advance(sim, 0.15);
  close(dummy.health, 93.28);
  const heavy = nearDummy(); const heavyDummy = heavy.dummies[0]; assert.ok(heavyDummy);
  heavyDummy.state = 'blocking'; heavyDummy.stateUntil = Infinity;
  heavy.act('ability4'); advance(heavy, 0.45);
  assert.equal(heavyDummy.health, 74);
  assert.equal(heavyDummy.state, 'ragdolled');
  assert.ok(Number.isFinite(heavyDummy.stateUntil));
});

test('blocking, attacks, stun, ragdolls and transformation reject impossible actions', () => {
  const sim = nearDummy();
  sim.setBlock(true);
  for (const action of ['m1', 'dash', 'jump', 'ability1', 'special'] as const) assert.equal(sim.act(action), false);
  sim.setBlock(false); assert.equal(sim.act('m1'), true);
  assert.equal(sim.act('dash'), false); assert.equal(sim.act('jump'), false);
  sim.receiveDamage(5, { x: 0, y: 0, z: 0 }, 5, 0, 0.4);
  assert.equal(sim.player.state, 'stunned');
  assert.equal(sim.act('ability2'), false);
  advance(sim, 0.5); assert.equal(sim.act('dash'), true);
  assert.equal(sim.receiveDamage(20, { x: 0, y: 0, z: 0 }), false);
  advance(sim, 0.3); sim.receiveDamage(5, { x: 0, y: 0, z: 0 }, 8, 0.5);
  assert.equal(sim.player.state, 'ragdolled'); assert.equal(sim.act('m1'), false);
});

test('damage interrupt cancels a queued attack before its active hitbox', () => {
  const sim = nearDummy();
  sim.act('ability4'); advance(sim, 0.1);
  sim.receiveDamage(5, { x: 0, y: 0, z: 0 }, 0, 0, 0.1);
  advance(sim, 0.5);
  assert.equal(sim.stats.hits, 0);
});

test('dash/special use normalized input impulses and cooldown timestamps', () => {
  const sim = new Simulation();
  sim.tick(0, { ...idle(), moveX: 3, moveZ: 4 });
  assert.equal(sim.act('dash'), true);
  close(Math.hypot(sim.player.velocity.x, sim.player.velocity.z), VECTOR.dash.speed);
  close(sim.player.cooldowns['dash'] ?? 0, VECTOR.dash.cooldown);
  advance(sim, 0.2); assert.equal(sim.player.velocity.x, 0); assert.equal(sim.player.velocity.z, 0);
  assert.equal(sim.act('dash'), false);
  assert.equal(sim.act('special'), true);
  close(Math.hypot(sim.player.velocity.x, sim.player.velocity.z), VECTOR.special.speed);
  advance(sim, 0.3); assert.equal(sim.act('special'), false);
  advance(sim, 2); assert.equal(sim.act('dash'), true);
});

test('jump requires a grounded valid state and supplies vertical impulse only', () => {
  const sim = new Simulation();
  assert.equal(sim.act('jump'), true); assert.equal(sim.player.grounded, false);
  assert.equal(sim.player.velocity.y, 8.5); assert.equal(sim.act('jump'), false);
  advance(sim, 0.2);
  assert.equal(sim.player.position.y, 0);
  sim.player.grounded = true; advance(sim, 0.01); assert.equal(sim.player.state, 'idle');
});

test('all four VECTOR moves have independent cooldowns, fair damage and meaningful events', () => {
  for (const ability of getAbilities(false)) {
    const sim = nearDummy();
    assert.equal(sim.act(ability.key), true);
    assert.equal(sim.act(ability.key), false);
    advance(sim, ability.recovery + 0.1);
    assert.equal(sim.act(ability.key), false);
    assert.ok(sim.stats.damage > 0);
    assert.ok(sim.stats.damage < 100);
    assert.ok(sim.takeEvents().some(event => event.ability === ability.name));
  }
});

test('persistent gravity well pulls and damages over time, then expires', () => {
  const sim = new Simulation();
  const dummy = sim.dummies[0]; assert.ok(dummy);
  dummy.position.x = 2;
  sim.act('ability3'); advance(sim, 0.5);
  const startX = dummy.position.x;
  const initial = sim.stats.damage;
  advance(sim, 1.5);
  assert.ok(dummy.position.x < startX);
  assert.ok(sim.stats.damage > initial);
  advance(sim, 3);
  const after = sim.stats.damage;
  advance(sim, 2);
  assert.equal(sim.stats.damage, after);
});

test('dealt and received damage earn awakening; it swaps abilities only for a limited window', () => {
  const sim = nearDummy();
  assert.equal(sim.act('awaken'), false);
  sim.act('ability1'); advance(sim, 0.6);
  close(sim.player.awakening, 18 * VECTOR.awakening.dealtGain);
  sim.receiveDamage(20, { x: 0, y: 0, z: 0 });
  close(sim.player.awakening, 18 * VECTOR.awakening.dealtGain + 20 * VECTOR.awakening.receivedGain);
  advance(sim, 0.4); sim.debugAwaken();
  assert.equal(sim.act('awaken'), true);
  assert.equal(sim.player.state, 'awakening'); assert.equal(sim.player.awakening, 0);
  assert.equal(sim.act('ability1'), false);
  advance(sim, 0.8);
  assert.notDeepEqual(getAbilities(true).map(ability => ability.name), getAbilities(false).map(ability => ability.name));
  assert.equal(sim.act('ability1'), true);
  assert.equal(sim.takeEvents().find(event => event.type === 'attack')?.ability, 'Gravity Strike');
  advance(sim, 0.5);
  assert.ok(sim.takeEvents().some(event => event.ability === 'Orbit Breaker'));
  advance(sim, 21);
  assert.equal(sim.player.awakenedUntil, 0);
});

test('powerful attacks break designated props and reset them after a cooldown', () => {
  const sim = new Simulation();
  sim.player.position = { x: -5, y: 0, z: 5 };
  const prop = sim.props[0]; assert.ok(prop);
  sim.act('ability4'); advance(sim, 0.5);
  assert.equal(prop.health, 0); assert.ok(prop.respawnAt > sim.now);
  assert.ok(sim.takeEvents().some(event => event.type === 'break' && event.targetId === prop.id));
  advance(sim, 12.2);
  assert.equal(prop.health, prop.maxHealth);
  assert.ok(sim.takeEvents().some(event => event.type === 'respawn' && event.targetId === prop.id));
});

test('defeated dummies and players respawn, restoring usable states', () => {
  const sim = nearDummy(); const dummy = sim.dummies[0]; assert.ok(dummy);
  dummy.health = 5; sim.act('ability1'); advance(sim, 0.4);
  assert.equal(dummy.health, 0); assert.equal(dummy.state, 'ragdolled');
  advance(sim, 3.2); assert.equal(dummy.health, 100); assert.equal(dummy.state, 'idle');
  assert.deepEqual(dummy.position, { x: 0, y: 0, z: 2 });
  sim.receiveDamage(100, { x: 0, y: 0, z: 0 }); assert.equal(sim.player.health, 0);
  assert.equal(sim.act('m1'), false); advance(sim, 3.2);
  assert.equal(sim.player.health, 100); assert.equal(sim.player.state, 'idle');
});

test('physics-owned ragdolls skip duplicate transform integration, without skipping timers', () => {
  const sim = new Simulation(); const dummy = sim.dummies[0]; assert.ok(dummy);
  dummy.state = 'ragdolled'; dummy.stateUntil = 0.3; dummy.velocity = { x: 10, y: 8, z: 5 };
  sim.externalPhysics.add(dummy.id);
  advance(sim, 0.4);
  assert.deepEqual(dummy.position, { x: 0, y: 0, z: 2 });
  assert.equal(dummy.state, 'idle');
});

test('reset preserves clock and fighter references but clears training transient state', () => {
  const sim = nearDummy(); const player = sim.player; const dummy = sim.dummies[0];
  sim.act('m1'); advance(sim, 0.5); sim.debugAwaken();
  sim.resetTraining();
  assert.equal(sim.player, player); assert.equal(sim.dummies[0], dummy);
  close(sim.now, 0.5); assert.equal(sim.stats.damage, 0); assert.equal(sim.stats.hits, 0);
  assert.equal(sim.player.awakening, 0); assert.equal(sim.player.combo, 0);
  assert.deepEqual(sim.player.position, { x: 0, y: 0, z: 7 });
  assert.equal(sim.takeEvents().length, 1);
});

test('simulation is deterministic across render frame sizes for the same cast', () => {
  const fast = nearDummy(); const slow = nearDummy();
  fast.act('ability2'); slow.act('ability2');
  for (let index = 0; index < 120; index += 1) fast.tick(1 / 120, idle());
  for (let index = 0; index < 10; index += 1) slow.tick(0.1, idle());
  close(fast.now, slow.now); close(fast.dummies[0]?.health ?? 0, slow.dummies[0]?.health ?? 0);
  close(fast.dummies[0]?.position.z ?? 0, slow.dummies[0]?.position.z ?? 0);
  close(fast.stats.damage, slow.stats.damage);
});

test('invalid time/damage are rejected and undrained events remain bounded', () => {
  const sim = new Simulation();
  sim.tick(NaN, idle()); sim.tick(-1, idle()); close(sim.now, 0);
  assert.equal(sim.receiveDamage(NaN, { x: 0, y: 0, z: 0 }), false);
  assert.equal(sim.receiveDamage(-5, { x: 0, y: 0, z: 0 }), false);
  assert.equal(sim.player.health, 100);
  for (let index = 0; index < 300; index += 1) { sim.act('m1'); advance(sim, 1.1); }
  assert.ok(sim.events.length <= 256);
});

test('development spawn creates a unique dummy and resets it at its saved position', () => {
  const sim = new Simulation();
  const spawned = sim.debugSpawnDummy({ x: 5, y: 0, z: 5 });
  assert.equal(spawned.id, 'dummy-3');
  assert.equal(sim.dummies.length, 3);
  spawned.position.x = 10; spawned.health = 1;
  sim.resetTraining();
  assert.deepEqual(spawned.position, { x: 5, y: 0, z: 5 });
  assert.equal(spawned.health, 100);
});

test('ragdoll airborne recovery returns to idle on landing', () => {
  const sim = new Simulation(); const dummy = sim.dummies[0]; assert.ok(dummy);
  dummy.position.y = 2; dummy.grounded = false; dummy.velocity.y = 2;
  dummy.state = 'ragdolled'; dummy.stateUntil = 0.05;
  advance(sim, 0.1); assert.equal(dummy.state, 'jumping');
  advance(sim, 1); assert.equal(dummy.state, 'idle'); assert.equal(dummy.grounded, true);
});

test('player frontal guard and authority-validated guard-breaking hits use the same rules', () => {
  const sim = new Simulation(); sim.setBlock(true);
  assert.equal(sim.receiveDamage(20, { x: 0, y: 0, z: 2 }), true);
  close(sim.player.health, 97.6); assert.equal(sim.player.state, 'blocking');
  assert.equal(sim.receiveDamage(20, { x: 0, y: 0, z: 2 }, 12, 0.6, 0.3, true), true);
  close(sim.player.health, 77.6); assert.equal(sim.player.state, 'ragdolled');
});

test('character balance data is immutable to prevent accidental runtime divergence', () => {
  assert.ok(Object.isFrozen(VECTOR));
  assert.ok(Object.isFrozen(getAbilities(false)));
  assert.ok(Object.isFrozen(getAbilities(false)[0]));
  assert.ok(Object.isFrozen(getAbilities(false)[2]?.well));
});
