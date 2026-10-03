import type { Action } from '../core/model.ts';

export type AbilityKey = 'ability1' | 'ability2' | 'ability3' | 'ability4';
export interface WellConfig { radius: number; duration: number; pull: number; interval: number }
export interface AbilityConfig {
  key: AbilityKey;
  name: string;
  description: string;
  cooldown: number;
  damage: number;
  range: number;
  radius: number;
  cone: number;
  knockback: number;
  stun: number;
  ragdoll: number;
  startup: number;
  recovery: number;
  shape: 'cone' | 'radial' | 'well';
  breaksBlock: boolean;
  well?: WellConfig;
}

function immutableAbilities(abilities: AbilityConfig[]): readonly AbilityConfig[] {
  for (const ability of abilities) {
    if (ability.well) Object.freeze(ability.well);
    Object.freeze(ability);
  }
  return Object.freeze(abilities);
}

const base: readonly AbilityConfig[] = immutableAbilities([
  { key: 'ability1', name: 'Gravity Strike', description: 'A weighty close-range punch. Commit to the wind-up, then drive your target back.', cooldown: 8, damage: 18, range: 3.6, radius: 1.4, cone: 0.65, knockback: 8, stun: 0.45, ragdoll: 0, startup: 0.18, recovery: 0.5, shape: 'cone', breaksBlock: false },
  { key: 'ability2', name: 'Repulse', description: 'A directional force burst. Catch opponents in front of you and launch them away.', cooldown: 12, damage: 13, range: 7.5, radius: 3, cone: 0.74, knockback: 15, stun: 0.2, ragdoll: 0.7, startup: 0.23, recovery: 0.58, shape: 'cone', breaksBlock: false },
  { key: 'ability3', name: 'Gravity Well', description: 'Place a brief gravity field ahead of you. Its pulses pull nearby opponents toward the centre.', cooldown: 16, damage: 2, range: 5, radius: 4.6, cone: Math.PI, knockback: 0, stun: 0.12, ragdoll: 0, startup: 0.3, recovery: 0.6, shape: 'well', breaksBlock: false, well: { radius: 4.6, duration: 3.5, pull: 10, interval: 0.5 } },
  { key: 'ability4', name: 'Zero Point', description: 'Collapse the space around you into a heavy close-range burst. Breaks a frontal guard.', cooldown: 20, damage: 26, range: 4.4, radius: 4.4, cone: Math.PI, knockback: 18, stun: 0.25, ragdoll: 1.1, startup: 0.38, recovery: 0.8, shape: 'radial', breaksBlock: true },
]);

const awakened: readonly AbilityConfig[] = immutableAbilities([
  { key: 'ability1', name: 'Orbit Breaker', description: 'A compressed force strike with a longer reach and a sharp upward launch.', cooldown: 6, damage: 23, range: 4.5, radius: 2, cone: 0.7, knockback: 12, stun: 0.35, ragdoll: 0.55, startup: 0.16, recovery: 0.48, shape: 'cone', breaksBlock: false },
  { key: 'ability2', name: 'Tidal Force', description: 'A broad directional wave that pushes opponents out of your space.', cooldown: 9, damage: 19, range: 9, radius: 4, cone: 0.85, knockback: 19, stun: 0.25, ragdoll: 0.95, startup: 0.2, recovery: 0.55, shape: 'cone', breaksBlock: false },
  { key: 'ability3', name: 'Singularity Well', description: 'A wider, stronger gravity field. Keep your opponents in its pulses, then follow up.', cooldown: 13, damage: 3, range: 6, radius: 6, cone: Math.PI, knockback: 0, stun: 0.15, ragdoll: 0, startup: 0.28, recovery: 0.56, shape: 'well', breaksBlock: false, well: { radius: 6, duration: 4, pull: 13, interval: 0.5 } },
  { key: 'ability4', name: 'Event Horizon', description: 'Release a heavy radial blast. A powerful guard-breaker, but the wind-up leaves you exposed.', cooldown: 16, damage: 32, range: 5.5, radius: 5.5, cone: Math.PI, knockback: 22, stun: 0.3, ragdoll: 1.3, startup: 0.42, recovery: 0.88, shape: 'radial', breaksBlock: true },
]);

export const VECTOR = Object.freeze({
  name: 'VECTOR',
  title: 'Directional force',
  description: 'Control the fight with momentum, gravity and precise movement.',
  abilities: base,
  awakenedAbilities: awakened,
  special: Object.freeze({ name: 'Vector Shift', cooldown: 10, speed: 30, duration: 0.16 }),
  dash: Object.freeze({ cooldown: 2.2, speed: 22, duration: 0.18 }),
  awakening: Object.freeze({ name: 'Absolute Direction', duration: 20, transformation: 0.75, dealtGain: 1.1, receivedGain: 1.4 }),
});

export const M1 = Object.freeze([
  { damage: 6, startup: 0.09, recovery: 0.25, next: 0.27, knockback: 1.4, stun: 0.23, ragdoll: 0 },
  { damage: 6, startup: 0.1, recovery: 0.25, next: 0.27, knockback: 1.4, stun: 0.23, ragdoll: 0 },
  { damage: 7, startup: 0.12, recovery: 0.28, next: 0.3, knockback: 1.8, stun: 0.27, ragdoll: 0 },
  { damage: 10, startup: 0.16, recovery: 0.54, next: 0.78, knockback: 11.5, stun: 0.25, ragdoll: 0.85 },
].map(hit => Object.freeze(hit)));

export function getAbilities(isAwakened: boolean): readonly AbilityConfig[] { return isAwakened ? awakened : base; }
export function getAbility(action: Action, isAwakened: boolean): AbilityConfig | undefined {
  return getAbilities(isAwakened).find(ability => ability.key === action);
}
