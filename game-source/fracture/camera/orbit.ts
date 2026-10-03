import * as THREE from 'three';
import type { Vec3 } from '../core/model.ts';

export class CombatCamera {
  readonly camera = new THREE.PerspectiveCamera(58, 1, 0.1, 160);
  private target = new THREE.Vector3(0, 1.35, 7);
  private desired = new THREE.Vector3();
  private direction = new THREE.Vector3();
  private ray = new THREE.Raycaster();
  private shakePower = 0;
  private initialized = false;

  impact(strength: number): void { this.shakePower = Math.min(0.18, this.shakePower + strength * 0.012); }

  update(position: Vec3, yaw: number, pitch: number, dt: number, walls: THREE.Object3D[], shake: boolean): void {
    this.target.set(position.x, position.y + 1.35, position.z);
    this.desired.set(-Math.sin(yaw) * Math.cos(pitch) * 5.6, Math.sin(pitch) * 5.6 + 0.6, -Math.cos(yaw) * Math.cos(pitch) * 5.6).add(this.target);
    this.direction.copy(this.desired).sub(this.target);
    const distance = this.direction.length();
    this.direction.normalize();
    this.ray.set(this.target, this.direction);
    this.ray.far = distance;
    const first = this.ray.intersectObjects(walls, false)[0];
    if (first) this.desired.copy(this.target).addScaledVector(this.direction, Math.max(0.65, first.distance - 0.28));
    if (!this.initialized) { this.camera.position.copy(this.desired); this.initialized = true; }
    else this.camera.position.lerp(this.desired, 1 - Math.exp(-24 * dt));
    this.shakePower *= Math.exp(-18 * dt);
    if (shake && this.shakePower > 0.002) {
      this.camera.position.x += (Math.random() - 0.5) * this.shakePower;
      this.camera.position.y += (Math.random() - 0.5) * this.shakePower;
    }
    this.camera.lookAt(this.target);
  }

  resize(width: number, height: number): void { this.camera.aspect = width / Math.max(1, height); this.camera.updateProjectionMatrix(); }
}
