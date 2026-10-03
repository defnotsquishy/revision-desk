import * as THREE from 'three';
import type { ArenaProp, GameSettings, Vec3 } from '../core/model.ts';
import { ArenaPhysics } from '../physics/world.ts';
import type RAPIER from '@dimforge/rapier3d-compat';

export interface PropVisual { mesh: THREE.Mesh; collider: RAPIER.Collider; prop: ArenaProp; wasBroken: boolean }

export class CityArena {
  readonly group = new THREE.Group();
  readonly walls: THREE.Object3D[] = [];
  readonly props: PropVisual[] = [];
  readonly sunlight = new THREE.DirectionalLight(0xffe3b5, 3.5);
  private materials: THREE.Material[] = [];
  private geometries: THREE.BufferGeometry[] = [];
  private textures: THREE.Texture[] = [];

  constructor(scene: THREE.Scene, physics: ArenaPhysics, props: ArenaProp[]) {
    scene.background = new THREE.Color(0x132235);
    scene.fog = new THREE.Fog(0x132235, 38, 105);
    const stone = this.material(0x525c69);
    const asphalt = this.material(0x242f3d);
    const pavement = this.material(0x737f8d);
    const edge = this.material(0x192231);
    const warm = this.material(0xcbb79a);
    const emissive = new THREE.MeshStandardMaterial({ color: 0x87f3de, emissive: 0x44bea8, emissiveIntensity: 0.55, roughness: 0.4 });
    this.materials.push(emissive);
    this.box({ x: 0, y: -0.15, z: 0 }, { x: 64, y: 0.3, z: 64 }, asphalt, physics, true);
    this.box({ x: 0, y: 0.015, z: 0 }, { x: 20, y: 0.03, z: 20 }, stone);
    this.box({ x: 21, y: 0.2, z: 0 }, { x: 7, y: 0.4, z: 15 }, pavement, physics, true);
    for (let z = -8; z <= 8; z += 4) this.box({ x: 13, y: 0.021, z }, { x: 0.08, y: 0.02, z: 1.7 }, warm);
    for (let x = -24; x <= 24; x += 6) {
      this.box({ x, y: 0.018, z: -12 }, { x: 2.2, y: 0.02, z: 0.08 }, warm);
      this.box({ x, y: 0.018, z: 12 }, { x: 2.2, y: 0.02, z: 0.08 }, warm);
    }
    const buildings = [
      [-21, -20, 8, 13, 9], [-10, -23, 7, 17, 5], [2, -24, 10, 9, 5], [16, -22, 10, 15, 7],
      [-23, -5, 8, 11, 9], [-23, 11, 8, 7, 11], [-16, 24, 10, 12, 7], [1, 25, 15, 10, 6], [20, 23, 9, 15, 8], [27, 1, 5, 13, 13],
    ];
    const windows = this.geometry(new THREE.BoxGeometry(0.6, 0.95, 0.04));
    const windowMaterial = new THREE.MeshStandardMaterial({ color: 0xe8cda0, emissive: 0x987e4c, emissiveIntensity: 0.5, roughness: 0.35 });
    this.materials.push(windowMaterial);
    const windowTransforms: THREE.Matrix4[] = [];
    const transform = new THREE.Object3D();
    buildings.forEach(([x, z, width, height, depth], index) => {
      this.box({ x, y: height / 2, z }, { x: width, y: height, z: depth }, index % 2 ? stone : edge, physics, true);
      this.box({ x, y: height + 0.18, z }, { x: width + 0.4, y: 0.36, z: depth + 0.4 }, pavement);
      for (let row = 2; row < height - 1; row += 2.2) for (let col = -width / 2 + 1.1; col < width / 2 - 0.4; col += 1.7) {
        transform.position.set(x + col, row, z + depth / 2 + 0.04);
        transform.updateMatrix();
        windowTransforms.push(transform.matrix.clone());
      }
    });
    const windowMesh = new THREE.InstancedMesh(windows, windowMaterial, windowTransforms.length);
    windowTransforms.forEach((matrix, index) => windowMesh.setMatrixAt(index, matrix));
    windowMesh.instanceMatrix.needsUpdate = true;
    this.group.add(windowMesh);
    for (const x of [-12, 12]) for (const z of [-10, 10]) {
      this.box({ x, y: 2.25, z }, { x: 0.14, y: 4.5, z: 0.14 }, edge, physics, true);
      this.box({ x, y: 4.25, z }, { x: 0.8, y: 0.15, z: 0.35 }, emissive);
    }
    // Short stairs make the side training platform genuinely accessible to the capsule controller.
    for (let i = 0; i < 2; i++) this.box({ x: 17.2 + i * 0.35, y: (i + 1) * 0.1, z: 0 }, { x: 0.35, y: (i + 1) * 0.2, z: 3.5 }, pavement, physics, true);
    this.box({ x: -12, y: 0.45, z: 0 }, { x: 1.2, y: 0.9, z: 7 }, pavement, physics, true);
    this.box({ x: 0, y: 0.55, z: -15 }, { x: 9, y: 1.1, z: 0.8 }, stone, physics, true);
    for (const prop of props) {
      const mesh = this.box(prop.position, prop.size, this.material(0x786b56));
      const collider = physics.box(prop.position, prop.size);
      this.props.push({ mesh, collider, prop, wasBroken: false });
      this.walls.push(mesh);
      const strap = this.box({ x: prop.position.x, y: prop.position.y + prop.size.y * 0.28, z: prop.position.z }, { x: prop.size.x + 0.02, y: 0.08, z: prop.size.z + 0.02 }, edge);
      mesh.add(strap);
      strap.position.sub(mesh.position);
    }
    this.sign('VECTOR / TRAINING', { x: -5.5, y: 0.05, z: 7.5 }, 4.4, 1.2, true);
    this.sign('FRACTURE', { x: 2, y: 7.2, z: -21.43 }, 5.8, 1.3, false);
    this.sign('CITY 01 — FORCE YARD', { x: 20.5, y: 0.43, z: 5 }, 4.4, 1.1, true);
    const sky = new THREE.HemisphereLight(0xc8e7ff, 0x303347, 2.6);
    this.sunlight.position.set(-12, 28, 18);
    this.sunlight.castShadow = true;
    this.sunlight.shadow.mapSize.set(1024, 1024);
    this.sunlight.shadow.camera.left = this.sunlight.shadow.camera.bottom = -30;
    this.sunlight.shadow.camera.right = this.sunlight.shadow.camera.top = 30;
    this.sunlight.shadow.camera.near = 0.5;
    this.sunlight.shadow.camera.far = 85;
    this.sunlight.shadow.bias = -0.0004;
    this.group.add(sky, this.sunlight, this.sunlight.target);
    scene.add(this.group);
    scene.updateMatrixWorld(true);
  }

  private geometry<T extends THREE.BufferGeometry>(value: T): T { this.geometries.push(value); return value; }
  private material(color: number): THREE.MeshStandardMaterial {
    const value = new THREE.MeshStandardMaterial({ color, roughness: 0.88, metalness: 0.08 });
    this.materials.push(value);
    return value;
  }

  private box(position: Vec3, size: Vec3, material: THREE.Material, physics?: ArenaPhysics, collision = false): THREE.Mesh {
    const mesh = new THREE.Mesh(this.geometry(new THREE.BoxGeometry(size.x, size.y, size.z)), material);
    mesh.position.set(position.x, position.y, position.z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    this.group.add(mesh);
    if (physics && collision) { physics.box(position, size); this.walls.push(mesh); }
    return mesh;
  }

  private sign(text: string, position: Vec3, width: number, height: number, ground: boolean): void {
    const canvas = document.createElement('canvas');
    canvas.width = 768;
    canvas.height = 180;
    const context = canvas.getContext('2d');
    if (!context) return;
    context.fillStyle = '#a5d3cc';
    context.font = '700 48px system-ui, sans-serif';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(text, 384, 90, 720);
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    this.textures.push(texture);
    const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, depthWrite: false });
    this.materials.push(material);
    const mesh = new THREE.Mesh(this.geometry(new THREE.PlaneGeometry(width, height)), material);
    mesh.position.set(position.x, position.y, position.z);
    if (ground) mesh.rotation.x = -Math.PI / 2;
    this.group.add(mesh);
  }

  syncProps(): void {
    for (const item of this.props) {
      const broken = item.prop.health <= 0;
      item.collider.setEnabled(!broken);
      item.mesh.visible = !broken;
      item.wasBroken = broken;
    }
  }

  settings(settings: GameSettings): void {
    this.sunlight.castShadow = settings.shadows;
    const size = settings.preset === 'ultra' ? 2048 : settings.preset === 'low' ? 512 : 1024;
    if (this.sunlight.shadow.mapSize.x !== size) {
      this.sunlight.shadow.map?.dispose();
      this.sunlight.shadow.map = null;
      this.sunlight.shadow.mapSize.set(size, size);
    }
  }

  dispose(): void {
    this.group.removeFromParent();
    this.geometries.forEach(item => item.dispose());
    this.materials.forEach(item => item.dispose());
    this.textures.forEach(item => item.dispose());
    this.sunlight.shadow.dispose();
  }
}
