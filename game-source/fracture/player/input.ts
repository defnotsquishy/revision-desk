import type { Action, FrameInput } from '../core/model.ts';

const actions: Record<string, Action> = {
  Space: 'jump', KeyQ: 'dash', KeyR: 'special', KeyG: 'awaken',
  Digit1: 'ability1', Digit2: 'ability2', Digit3: 'ability3', Digit4: 'ability4',
};

export class GameInput {
  private keys = new Set<string>();
  private queued: Action[] = [];
  private dragging = false;
  private previousX = 0;
  private previousY = 0;
  private active = true;
  private listeners = new AbortController();
  private lockRequested = false;
  yaw = Math.PI;
  pitch = 0.28;
  sensitivity = 1;

  constructor(private canvas: HTMLCanvasElement, private onPause: () => void, private onGesture: () => void) {
    canvas.tabIndex = 0;
    canvas.setAttribute('aria-label', 'FRACTURE arena. Click to capture mouse; Escape opens menu.');
    const signal = this.listeners.signal;
    canvas.addEventListener('pointerdown', this.pointerDown, { signal });
    window.addEventListener('pointerup', this.pointerUp, { signal });
    window.addEventListener('pointermove', this.pointerMove, { signal });
    window.addEventListener('keydown', this.keyDown, { signal });
    window.addEventListener('keyup', this.keyUp, { signal });
    window.addEventListener('blur', this.blur, { signal });
    document.addEventListener('pointerlockchange', this.lockChange, { signal });
    canvas.addEventListener('contextmenu', event => event.preventDefault(), { signal });
  }

  private ownsInput(): boolean {
    return this.active && (document.pointerLockElement === this.canvas || document.activeElement === this.canvas);
  }

  private pointerDown = (event: PointerEvent): void => {
    if (!this.active) return;
    this.canvas.focus({ preventScroll: true });
    this.onGesture();
    if (event.button === 0) this.queued.push('m1');
    if (event.button === 2) {
      this.dragging = true;
      this.previousX = event.clientX;
      this.previousY = event.clientY;
    }
    if (event.button === 0 && document.pointerLockElement !== this.canvas) this.requestLock();
    event.preventDefault();
  };

  private pointerUp = (): void => { this.dragging = false; };

  private pointerMove = (event: PointerEvent): void => {
    if (!this.active) return;
    let dx = 0;
    let dy = 0;
    if (document.pointerLockElement === this.canvas) {
      dx = event.movementX;
      dy = event.movementY;
    } else if (this.dragging && this.ownsInput()) {
      dx = event.clientX - this.previousX;
      dy = event.clientY - this.previousY;
      this.previousX = event.clientX;
      this.previousY = event.clientY;
    }
    this.yaw -= dx * 0.0025 * this.sensitivity;
    this.pitch = Math.max(-0.2, Math.min(1.05, this.pitch + dy * 0.0025 * this.sensitivity));
  };

  private keyDown = (event: KeyboardEvent): void => {
    if (!this.ownsInput()) return;
    if (event.code === 'Escape') {
      event.preventDefault();
      this.pause();
      this.onPause();
      return;
    }
    if (actions[event.code] || ['KeyW', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'ShiftLeft', 'ShiftRight'].includes(event.code)) {
      event.preventDefault();
      this.onGesture();
      this.keys.add(event.code);
      if (!event.repeat && actions[event.code]) this.queued.push(actions[event.code]);
    }
  };

  private keyUp = (event: KeyboardEvent): void => { this.keys.delete(event.code); };
  private blur = (): void => {
    if (!this.active) return;
    this.pause();
    this.onPause();
  };

  private lockChange = (): void => {
    if (document.pointerLockElement === this.canvas) this.lockRequested = true;
    else if (this.lockRequested && this.active) {
      this.lockRequested = false;
      this.pause();
      this.onPause();
    }
  };

  private requestLock(): void {
    try {
      const result = this.canvas.requestPointerLock();
      if (result && typeof result.catch === 'function') void result.catch(() => { /* Right-drag remains available when policy denies capture. */ });
    } catch { /* School/browser policies can reject mouse capture; drag camera is still usable. */ }
  }

  frame(): FrameInput {
    if (!this.ownsInput()) { this.keys.clear(); this.queued.length = 0; }
    const forward = (this.keys.has('KeyW') ? 1 : 0) - (this.keys.has('KeyS') ? 1 : 0);
    const right = (this.keys.has('KeyD') ? 1 : 0) - (this.keys.has('KeyA') ? 1 : 0);
    const length = Math.hypot(forward, right) || 1;
    return {
      moveX: (Math.sin(this.yaw) * forward - Math.cos(this.yaw) * right) / length,
      moveZ: (Math.cos(this.yaw) * forward + Math.sin(this.yaw) * right) / length,
      yaw: this.yaw,
      sprint: this.keys.has('ShiftLeft') || this.keys.has('ShiftRight'),
      block: this.keys.has('KeyF'),
      actions: this.queued.splice(0),
    };
  }

  pause(): void {
    this.active = false;
    this.keys.clear();
    this.queued.length = 0;
    this.dragging = false;
    if (document.pointerLockElement === this.canvas) document.exitPointerLock();
  }

  resume(): void {
    this.active = true;
    this.canvas.focus({ preventScroll: true });
    this.onGesture();
    this.requestLock();
  }

  dispose(): void { this.pause(); this.listeners.abort(); }
}
