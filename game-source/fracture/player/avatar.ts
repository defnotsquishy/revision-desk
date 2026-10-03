import * as THREE from 'three';
import type { Fighter } from '../core/model.ts';

export interface BodyPart { name: string; offset: THREE.Vector3; size: THREE.Vector3; mesh: THREE.Mesh }

export class FighterAvatar {
  readonly root = new THREE.Group();
  readonly body = new THREE.Group();
  readonly parts: BodyPart[] = [];
  private leftArm = new THREE.Group();
  private rightArm = new THREE.Group();
  private leftLeg = new THREE.Group();
  private rightLeg = new THREE.Group();
  private torso = new THREE.Group();
  private geometries: THREE.BufferGeometry[] = [];
  private materials: THREE.Material[] = [];
  private phase = 0;
  private attackStarted = -10;
  private lastAttack = -1;
  private colour: THREE.MeshStandardMaterial;
  private glow: THREE.MeshStandardMaterial;
  private marker: THREE.Mesh;
  private baseColour: number;

  constructor(scene: THREE.Scene, dummy = false) {
    this.baseColour = dummy ? 0xc68b5f : 0x46566d;
    this.colour = new THREE.MeshStandardMaterial({ color: dummy ? 0xc68b5f : 0x46566d, roughness: 0.6, metalness: 0.18 });
    const dark = new THREE.MeshStandardMaterial({ color: dummy ? 0x3c3530 : 0x1d2635, roughness: 0.7 });
    this.glow = new THREE.MeshStandardMaterial({ color: dummy ? 0xffc993 : 0x86fbe3, emissive: dummy ? 0x9b5e2e : 0x48c4ac, emissiveIntensity: 0.65 });
    this.materials.push(this.colour, dark, this.glow);
    this.body.add(this.torso, this.leftArm, this.rightArm, this.leftLeg, this.rightLeg);
    this.root.add(this.body);
    this.torso.position.y = 1.15;
    this.part('torso', this.torso, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0.66, 0.67, 0.4), this.colour, new THREE.Vector3(0, 1.15, 0));
    this.part('head', this.torso, new THREE.Vector3(0, 0.57, 0), new THREE.Vector3(0.4, 0.43, 0.39), dark, new THREE.Vector3(0, 1.72, 0));
    const visor = this.mesh(new THREE.BoxGeometry(0.32, 0.055, 0.04), this.glow);
    visor.position.set(0, 0.62, 0.205);
    this.torso.add(visor);
    const core = this.mesh(new THREE.OctahedronGeometry(0.12), this.glow);
    core.scale.z = 0.4;
    core.position.set(0, 0.04, 0.225);
    this.torso.add(core);
    this.leftArm.position.set(-0.46, 1.43, 0);
    this.rightArm.position.set(0.46, 1.43, 0);
    this.part('armLeft', this.leftArm, new THREE.Vector3(0, -0.28, 0), new THREE.Vector3(0.24, 0.68, 0.27), this.colour, new THREE.Vector3(-0.46, 1.15, 0));
    this.part('armRight', this.rightArm, new THREE.Vector3(0, -0.28, 0), new THREE.Vector3(0.24, 0.68, 0.27), this.colour, new THREE.Vector3(0.46, 1.15, 0));
    this.leftLeg.position.set(-0.19, 0.78, 0);
    this.rightLeg.position.set(0.19, 0.78, 0);
    this.part('legLeft', this.leftLeg, new THREE.Vector3(0, -0.36, 0), new THREE.Vector3(0.28, 0.76, 0.3), dark, new THREE.Vector3(-0.19, 0.42, 0));
    this.part('legRight', this.rightLeg, new THREE.Vector3(0, -0.36, 0), new THREE.Vector3(0.28, 0.76, 0.3), dark, new THREE.Vector3(0.19, 0.42, 0));
    const ring = this.mesh(new THREE.RingGeometry(0.55, 0.62, 24), new THREE.MeshBasicMaterial({ color: dummy ? 0xf4b889 : 0x67c8b9, transparent: true, opacity: 0.6, side: THREE.DoubleSide, depthWrite: false }));
    this.materials.push(ring.material as THREE.Material);
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 0.035;
    this.root.add(ring);
    this.marker = ring;
    scene.add(this.root);
  }

  private mesh(geometry: THREE.BufferGeometry, material: THREE.Material): THREE.Mesh {
    this.geometries.push(geometry);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return mesh;
  }

  private part(name: string, pivot: THREE.Group, local: THREE.Vector3, size: THREE.Vector3, material: THREE.Material, offset: THREE.Vector3): void {
    const mesh = this.mesh(new THREE.BoxGeometry(size.x, size.y, size.z), material);
    mesh.position.copy(local);
    pivot.add(mesh);
    this.parts.push({ name, mesh, offset, size });
  }

  update(fighter: Fighter, dt: number, now: number, visualRagdoll: boolean): void {
    this.root.position.set(fighter.position.x, fighter.position.y, fighter.position.z);
    this.root.rotation.y = fighter.yaw;
    this.body.visible = !visualRagdoll && fighter.health > 0;
    this.marker.visible = fighter.health > 0;
    const awakened = fighter.awakenedUntil > now;
    this.glow.emissiveIntensity = awakened ? 2.1 : 0.65;
    this.colour.color.setHex(awakened ? 0x667185 : this.baseColour);
    this.phase += dt * (fighter.state === 'running' ? 15 : 4);
    const gait = fighter.state === 'running' ? Math.sin(this.phase) * 0.65 : 0;
    const airborne = !fighter.grounded;
    this.leftLeg.rotation.x = airborne ? -0.45 : gait;
    this.rightLeg.rotation.x = airborne ? 0.45 : -gait;
    this.leftArm.rotation.set(-gait * 0.7, 0, 0.08);
    this.rightArm.rotation.set(gait * 0.7, 0, -0.08);
    this.torso.rotation.set(0, 0, 0);
    this.body.position.y = fighter.state === 'running' ? Math.abs(Math.sin(this.phase)) * 0.035 : Math.sin(now * 2) * 0.01;
    if (fighter.attackSerial !== this.lastAttack) { this.attackStarted = now; this.lastAttack = fighter.attackSerial; }
    const age = now - this.attackStarted;
    if (age < 0.4 && fighter.attackSerial > 0) {
      const punch = Math.sin(Math.min(1, age / 0.28) * Math.PI);
      const arm = fighter.combo % 2 ? this.rightArm : this.leftArm;
      arm.rotation.x = -punch * 1.7;
      this.torso.rotation.y = punch * (fighter.combo % 2 ? -0.32 : 0.32);
    }
    if (fighter.state === 'blocking') { this.leftArm.rotation.x = this.rightArm.rotation.x = -1.65; this.leftArm.rotation.z = -0.3; this.rightArm.rotation.z = 0.3; }
    if (fighter.state === 'dashing') { this.torso.rotation.x = 0.22; this.leftArm.rotation.x = this.rightArm.rotation.x = 0.6; }
    if (fighter.state === 'awakening') { this.leftArm.rotation.z = -1; this.rightArm.rotation.z = 1; this.body.position.y = Math.sin(now * 20) * 0.03; }
    if (fighter.state === 'stunned') this.torso.rotation.x = -0.25;
    if (fighter.state === 'ragdolled' && !visualRagdoll) { this.torso.rotation.x = -0.4; this.body.position.y -= 0.25; }
  }

  dispose(): void {
    this.root.removeFromParent();
    this.geometries.forEach(item => item.dispose());
    this.materials.forEach(item => item.dispose());
  }
}
