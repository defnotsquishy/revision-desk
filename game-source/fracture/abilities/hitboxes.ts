import type { Fighter, Vec3 } from '../core/model.ts';

export interface Hitbox {
  origin: Vec3;
  yaw: number;
  range: number;
  cone: number;
  shape: 'cone' | 'radial';
}

/** A fighter's foot position is the shared simulation coordinate, not its visual mesh centre. */
export function containsFighter(hitbox: Hitbox, fighter: Fighter): boolean {
  const dx = fighter.position.x - hitbox.origin.x;
  const dz = fighter.position.z - hitbox.origin.z;
  const distance = Math.hypot(dx, dz);
  if (fighter.health <= 0 || Math.abs(fighter.position.y - hitbox.origin.y) > 2.5 || distance > hitbox.range + 0.45) return false;
  if (hitbox.shape === 'radial' || distance < 0.05) return true;
  const dot = (Math.sin(hitbox.yaw) * dx + Math.cos(hitbox.yaw) * dz) / distance;
  return dot >= Math.cos(hitbox.cone);
}

export function isFrontalBlock(target: Fighter, origin: Vec3): boolean {
  if (target.state !== 'blocking') return false;
  const dx = origin.x - target.position.x;
  const dz = origin.z - target.position.z;
  const distance = Math.hypot(dx, dz);
  return distance < 0.01 || (Math.sin(target.yaw) * dx + Math.cos(target.yaw) * dz) / distance >= Math.cos(Math.PI / 3);
}

export function directionFrom(origin: Vec3, target: Vec3, fallbackYaw: number): Vec3 {
  const dx = target.x - origin.x;
  const dz = target.z - origin.z;
  const distance = Math.hypot(dx, dz);
  return distance > 0.001 ? { x: dx / distance, y: 0, z: dz / distance } : { x: Math.sin(fallbackYaw), y: 0, z: Math.cos(fallbackYaw) };
}
