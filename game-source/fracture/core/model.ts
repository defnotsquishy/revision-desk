export type CombatState = 'idle' | 'running' | 'jumping' | 'attacking' | 'blocking' | 'dashing' | 'stunned' | 'ragdolled' | 'awakening';
export type Action = 'm1' | 'dash' | 'jump' | 'special' | 'ability1' | 'ability2' | 'ability3' | 'ability4' | 'awaken';
export interface Vec3 { x: number; y: number; z: number }
export interface Fighter {
  id: string;
  position: Vec3;
  velocity: Vec3;
  yaw: number;
  health: number;
  maxHealth: number;
  state: CombatState;
  stateUntil: number;
  grounded: boolean;
  combo: number;
  comboUntil: number;
  nextAttack: number;
  cooldowns: Record<string, number>;
  awakening: number;
  awakenedUntil: number;
  attackSerial: number;
}
export interface CombatEvent {
  type: 'attack' | 'hit' | 'block' | 'dash' | 'well' | 'awake' | 'break' | 'respawn';
  position: Vec3;
  targetId?: string;
  attackerId?: string;
  damage?: number;
  strength?: number;
  ability?: string;
}
export interface ArenaProp {
  id: string;
  position: Vec3;
  size: Vec3;
  health: number;
  maxHealth: number;
  respawnAt: number;
}
export interface TrainingStats { damage: number; comboDamage: number; hits: number; dps: number }
export interface FrameInput { moveX: number; moveZ: number; yaw: number; sprint: boolean; block: boolean; actions: Action[] }
export interface GameSettings {
  preset: 'low' | 'medium' | 'high' | 'ultra' | 'custom';
  resolution: number;
  shadows: boolean;
  particles: boolean;
  effects: boolean;
  bloom: boolean;
  motionBlur: boolean;
  shake: boolean;
  ragdolls: boolean;
  destruction: boolean;
  sensitivity: number;
  volume: number;
  stats: boolean;
}
export interface GameFrame {
  health: number;
  maxHealth: number;
  state: CombatState;
  awakening: number;
  awakenedSeconds: number;
  cooldowns: Record<string, number>;
  abilities: string[];
  stats: TrainingStats;
  fps: number;
  dummyHealth: number;
}
export interface LaunchOptions {
  container: HTMLElement;
  settings: GameSettings;
  signal: AbortSignal;
  onStage: (stage: string) => void;
  onFrame: (frame: GameFrame) => void;
  onPause: () => void;
  onError: (message: string) => void;
}
export interface GameSession {
  dispose(): void;
  pause(): void;
  resume(): void;
  updateSettings(settings: GameSettings): void;
  resetTraining(): void;
}
