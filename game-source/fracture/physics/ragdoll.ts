import * as THREE from 'three';
import RAPIER from '@dimforge/rapier3d-compat';
import type { Fighter } from '../core/model.ts';
import type { FighterAvatar } from '../player/avatar.ts';
import { ArenaPhysics, RAGDOLL_GROUPS } from './world.ts';

interface RagdollPart { name: string; body: RAPIER.RigidBody; mesh: THREE.Mesh }

export class Ragdoll {
  private parts: RagdollPart[] = [];
  private group = new THREE.Group();
  private yawRotation = new THREE.Quaternion();
  private joints: RAPIER.ImpulseJoint[] = [];
  private physics: ArenaPhysics;

  constructor(physics: ArenaPhysics, scene: THREE.Scene, avatar: FighterAvatar, fighter: Fighter) {
    this.physics = physics;
    this.yawRotation.setFromAxisAngle(new THREE.Vector3(0, 1, 0), fighter.yaw);
    for (const source of avatar.parts) {
      const offset = source.offset.clone().applyQuaternion(this.yawRotation);
      const desc = RAPIER.RigidBodyDesc.dynamic()
        .setTranslation(fighter.position.x + offset.x, fighter.position.y + offset.y, fighter.position.z + offset.z)
        .setRotation(this.yawRotation).setLinearDamping(0.8).setAngularDamping(1.5).setCcdEnabled(true)
        .setLinvel(fighter.velocity.x, Math.max(2, fighter.velocity.y), fighter.velocity.z);
      const body = physics.world.createRigidBody(desc);
      physics.world.createCollider(RAPIER.ColliderDesc.cuboid(source.size.x / 2, source.size.y / 2, source.size.z / 2).setCollisionGroups(RAGDOLL_GROUPS).setDensity(source.name === 'torso' ? 6 : 2).setFriction(0.8), body);
      body.setAngvel({ x: 1.2, y: 0.4, z: source.name.includes('Left') ? 1 : -1 }, true);
      const mesh = new THREE.Mesh(source.mesh.geometry, source.mesh.material);
      mesh.castShadow = true;
      this.group.add(mesh);
      this.parts.push({ name: source.name, body, mesh });
    }
    const torso = this.parts[0].body;
    const connections: Record<string, [number[], number[]]> = {
      head: [[0, 0.35, 0], [0, -0.22, 0]],
      armLeft: [[-0.39, 0.28, 0], [0.07, 0.28, 0]],
      armRight: [[0.39, 0.28, 0], [-0.07, 0.28, 0]],
      legLeft: [[-0.19, -0.36, 0], [0, 0.37, 0]],
      legRight: [[0.19, -0.36, 0], [0, 0.37, 0]],
    };
    for (const part of this.parts.slice(1)) {
      const [a, b] = connections[part.name];
      const joint = RAPIER.JointData.spherical({ x: a[0], y: a[1], z: a[2] }, { x: b[0], y: b[1], z: b[2] });
      this.joints.push(physics.world.createImpulseJoint(joint, torso, part.body, true));
    }
    scene.add(this.group);
    this.update(fighter);
  }

  update(fighter: Fighter): void {
    for (const part of this.parts) {
      const position = part.body.translation();
      const rotation = part.body.rotation();
      part.mesh.position.set(position.x, position.y, position.z);
      part.mesh.quaternion.set(rotation.x, rotation.y, rotation.z, rotation.w);
    }
    const torso = this.parts[0].body;
    const position = torso.translation();
    const velocity = torso.linvel();
    fighter.position.x = position.x;
    fighter.position.y = Math.max(0, position.y - 1.15);
    fighter.position.z = position.z;
    fighter.velocity.x = velocity.x;
    fighter.velocity.y = velocity.y;
    fighter.velocity.z = velocity.z;
  }

  dispose(): void {
    this.group.removeFromParent();
    this.joints.forEach(joint => this.physics.world.removeImpulseJoint(joint, true));
    this.parts.forEach(part => this.physics.world.removeRigidBody(part.body));
    this.parts.length = 0;
  }
}
