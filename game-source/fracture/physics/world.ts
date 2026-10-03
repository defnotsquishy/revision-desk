import RAPIER from '@dimforge/rapier3d-compat';
import type { Fighter, FrameInput, Vec3 } from '../core/model.ts';

export const WORLD_GROUPS = 0x0001000f;
export const PLAYER_GROUPS = 0x00020001;
export const RAGDOLL_GROUPS = 0x00040001;
const footOffset = 0.935;

export class ArenaPhysics {
  readonly world = new RAPIER.World({ x: 0, y: -24, z: 0 });
  readonly playerBody: RAPIER.RigidBody;
  readonly playerCollider: RAPIER.Collider;
  readonly controller: RAPIER.KinematicCharacterController;
  private vertical = 0;
  private lastState = 'idle';
  private desired = { x: 0, y: 0, z: 0 };

  constructor(position: Vec3) {
    this.playerBody = this.world.createRigidBody(RAPIER.RigidBodyDesc.kinematicPositionBased().setTranslation(position.x, position.y + footOffset, position.z));
    this.playerCollider = this.world.createCollider(RAPIER.ColliderDesc.capsule(0.56, 0.35).setCollisionGroups(PLAYER_GROUPS), this.playerBody);
    this.controller = this.world.createCharacterController(0.025);
    // Resolve contact with a small outward nudge so the capsule does not intermittently
    // stick to the wide plaza floor or drift sideways when held against a wall.
    this.controller.setNormalNudgeFactor(0.01);
    this.controller.enableAutostep(0.4, 0.25, false);
    this.controller.enableSnapToGround(0.4);
    this.controller.setMaxSlopeClimbAngle(Math.PI / 4);
    this.controller.setMinSlopeSlideAngle(Math.PI / 3);
  }

  box(position: Vec3, size: Vec3): RAPIER.Collider {
    return this.world.createCollider(RAPIER.ColliderDesc.cuboid(size.x / 2, size.y / 2, size.z / 2).setTranslation(position.x, position.y, position.z).setCollisionGroups(WORLD_GROUPS));
  }

  move(fighter: Fighter, input: FrameInput, dt: number): void {
    const old = this.playerBody.translation();
    const immobilised = ['stunned', 'ragdolled', 'awakening'].includes(fighter.state);
    const speed = fighter.state === 'blocking' ? 2.2 : fighter.state === 'attacking' ? 1.1 : input.sprint ? 9.5 : 6;
    if (fighter.velocity.y > this.vertical && !fighter.grounded) this.vertical = fighter.velocity.y;
    if (fighter.grounded && fighter.velocity.y > 1) this.vertical = fighter.velocity.y;
    this.vertical -= 24 * dt;
    const impulse = fighter.state === 'dashing' || fighter.state === 'stunned' || fighter.state === 'ragdolled';
    this.desired.x = (impulse ? fighter.velocity.x : immobilised ? 0 : input.moveX * speed) * dt;
    this.desired.z = (impulse ? fighter.velocity.z : immobilised ? 0 : input.moveZ * speed) * dt;
    this.desired.y = this.vertical * dt;
    if (fighter.state !== 'dashing' && this.lastState === 'dashing') fighter.velocity.x = fighter.velocity.z = 0;
    this.controller.computeColliderMovement(this.playerCollider, this.desired, RAPIER.QueryFilterFlags.EXCLUDE_SENSORS, PLAYER_GROUPS);
    const corrected = this.controller.computedMovement();
    this.playerBody.setNextKinematicTranslation({ x: old.x + corrected.x, y: old.y + corrected.y, z: old.z + corrected.z });
    fighter.grounded = this.controller.computedGrounded();
    if (fighter.grounded && this.vertical < 0) this.vertical = -0.2;
    else if (this.vertical > 0 && corrected.y < this.desired.y - 0.001) this.vertical = 0;
    fighter.velocity.y = this.vertical;
    this.lastState = fighter.state;
  }

  step(dt: number, fighter: Fighter, ownsPlayer = true): void {
    this.world.timestep = dt;
    this.world.step();
    if (!ownsPlayer) return;
    const p = this.playerBody.translation();
    fighter.position.x = p.x;
    fighter.position.y = p.y - footOffset;
    fighter.position.z = p.z;
    if (p.y < -10) this.reset(fighter);
  }

  align(fighter: Fighter): void {
    const position = { x: fighter.position.x, y: fighter.position.y + footOffset, z: fighter.position.z };
    this.playerBody.setTranslation(position, true);
    this.playerBody.setNextKinematicTranslation(position);
    this.vertical = fighter.velocity.y;
  }

  reset(fighter: Fighter): void {
    this.playerBody.setTranslation({ x: 0, y: footOffset, z: 7 }, true);
    this.playerBody.setNextKinematicTranslation({ x: 0, y: footOffset, z: 7 });
    fighter.position.x = 0;
    fighter.position.y = 0;
    fighter.position.z = 7;
    fighter.velocity.x = fighter.velocity.y = fighter.velocity.z = this.vertical = 0;
    fighter.grounded = true;
  }

  dispose(): void { this.world.free(); }
}
