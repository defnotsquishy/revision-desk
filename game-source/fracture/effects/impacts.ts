import * as THREE from 'three';
import type { CombatEvent, GameSettings, Vec3 } from '../core/model.ts';

interface Particle { life: number; total: number; x: number; y: number; z: number; vx: number; vy: number; vz: number; size: number }
interface Ring { life: number; total: number; radius: number; mesh: THREE.Mesh }
interface NumberSprite { life: number; total: number; sprite: THREE.Sprite; context: CanvasRenderingContext2D; texture: THREE.CanvasTexture }

export class ImpactEffects {
  private particles: Particle[] = Array.from({ length: 96 }, () => ({ life: 0, total: 1, x: 0, y: 0, z: 0, vx: 0, vy: 0, vz: 0, size: 0 }));
  private particleGeometry = new THREE.BoxGeometry(1, 1, 1);
  private particleMaterial = new THREE.MeshBasicMaterial({ color: 0xa3edd7, transparent: true, opacity: 0.85 });
  private mesh = new THREE.InstancedMesh(this.particleGeometry, this.particleMaterial, 96);
  private matrix = new THREE.Object3D();
  private cursor = 0;
  private ringGeometry = new THREE.RingGeometry(0.85, 1, 32);
  private rings: Ring[] = [];
  private numbers: NumberSprite[] = [];
  private settings: GameSettings;

  constructor(private scene: THREE.Scene, settings: GameSettings) {
    this.settings = settings;
    this.mesh.frustumCulled = false;
    this.mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    scene.add(this.mesh);
    for (let i = 0; i < 10; i++) {
      const mesh = new THREE.Mesh(this.ringGeometry, new THREE.MeshBasicMaterial({ color: 0x98eadb, transparent: true, opacity: 0, side: THREE.DoubleSide, depthWrite: false }));
      mesh.rotation.x = -Math.PI / 2;
      mesh.visible = false;
      this.rings.push({ mesh, life: 0, total: 1, radius: 1 });
      scene.add(mesh);
    }
    for (let i = 0; i < 12; i++) {
      const canvas = document.createElement('canvas');
      canvas.width = 128;
      canvas.height = 64;
      const context = canvas.getContext('2d');
      if (!context) continue;
      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, transparent: true, depthTest: false, depthWrite: false }));
      sprite.scale.set(0.95, 0.48, 1);
      sprite.visible = false;
      scene.add(sprite);
      this.numbers.push({ sprite, context, texture, life: 0, total: 0.8 });
    }
    this.update(0);
  }

  private ring(position: Vec3, radius: number, duration: number): void {
    const ring = this.rings.find(item => item.life <= 0) ?? this.rings[0];
    ring.mesh.position.set(position.x, position.y + 0.06, position.z);
    ring.radius = radius;
    ring.life = ring.total = duration;
    ring.mesh.visible = this.settings.effects;
  }

  private number(position: Vec3, damage: number): void {
    const item = this.numbers.find(candidate => candidate.life <= 0) ?? this.numbers[0];
    if (!item) return;
    item.context.clearRect(0, 0, 128, 64);
    item.context.font = '800 44px system-ui, sans-serif';
    item.context.textAlign = 'center';
    item.context.textBaseline = 'middle';
    item.context.lineWidth = 5;
    item.context.strokeStyle = '#15202c';
    item.context.strokeText(String(Math.round(damage)), 64, 34);
    item.context.fillStyle = '#fff0bd';
    item.context.fillText(String(Math.round(damage)), 64, 34);
    item.texture.needsUpdate = true;
    item.sprite.position.set(position.x, position.y + 2, position.z);
    item.life = item.total;
    item.sprite.visible = true;
  }

  emit(event: CombatEvent): void {
    if (event.type === 'hit' && event.damage) this.number(event.position, event.damage);
    if (event.type === 'well') this.ring(event.position, event.strength ?? 4, 3);
    if (event.type === 'awake') this.ring(event.position, 5, 1.5);
    if (event.type === 'hit' || event.type === 'block' || event.type === 'break') this.ring(event.position, event.type === 'break' ? 2 : 1.1, 0.35);
    if (!this.settings.particles || (event.type === 'break' && !this.settings.destruction) || !['hit', 'block', 'break', 'awake', 'dash'].includes(event.type)) return;
    const maximum = this.settings.preset === 'low' ? 6 : this.settings.preset === 'medium' ? 12 : 20;
    for (let i = 0; i < maximum; i++) {
      const particle = this.particles[this.cursor++ % this.particles.length];
      const debris = event.type === 'break' && this.settings.destruction;
      particle.life = particle.total = debris ? 1.2 : 0.3 + Math.random() * 0.25;
      particle.x = event.position.x;
      particle.y = event.position.y + (event.type === 'hit' ? 1.2 : 0.3);
      particle.z = event.position.z;
      particle.vx = (Math.random() - 0.5) * (debris ? 8 : 6);
      particle.vy = Math.random() * (debris ? 6 : 4) + 1;
      particle.vz = (Math.random() - 0.5) * (debris ? 8 : 6);
      particle.size = debris ? 0.2 + Math.random() * 0.25 : 0.035 + Math.random() * 0.045;
    }
  }

  update(dt: number): void {
    this.mesh.visible = this.settings.particles;
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      p.life = Math.max(0, p.life - dt);
      if (p.life > 0) {
        p.vy -= dt * 15;
        p.x += p.vx * dt;
        p.y = Math.max(0.06, p.y + p.vy * dt);
        p.z += p.vz * dt;
      }
      this.matrix.position.set(p.x, p.y, p.z);
      this.matrix.rotation.set(p.life * 5, p.life * 3, 0);
      this.matrix.scale.setScalar(p.life > 0 ? p.size * Math.min(1, p.life * 6) : 0);
      this.matrix.updateMatrix();
      this.mesh.setMatrixAt(i, this.matrix.matrix);
    }
    this.mesh.instanceMatrix.needsUpdate = true;
    for (const ring of this.rings) {
      ring.life = Math.max(0, ring.life - dt);
      ring.mesh.visible = ring.life > 0 && this.settings.effects;
      const progress = 1 - ring.life / ring.total;
      ring.mesh.scale.setScalar(ring.radius * (0.25 + progress * 0.75));
      (ring.mesh.material as THREE.MeshBasicMaterial).opacity = ring.life / ring.total * 0.65;
    }
    for (const item of this.numbers) {
      item.life = Math.max(0, item.life - dt);
      item.sprite.visible = item.life > 0;
      item.sprite.position.y += dt * 0.9;
      (item.sprite.material as THREE.SpriteMaterial).opacity = Math.min(1, item.life * 3);
    }
  }

  updateSettings(settings: GameSettings): void {
    this.settings = settings;
    if (!settings.particles) this.particles.forEach(item => { item.life = 0; });
  }

  dispose(): void {
    this.mesh.removeFromParent();
    this.mesh.dispose();
    this.particleGeometry.dispose();
    this.particleMaterial.dispose();
    this.ringGeometry.dispose();
    this.rings.forEach(item => { item.mesh.removeFromParent(); (item.mesh.material as THREE.Material).dispose(); });
    this.numbers.forEach(item => { item.sprite.removeFromParent(); item.sprite.material.dispose(); item.texture.dispose(); });
  }
}
