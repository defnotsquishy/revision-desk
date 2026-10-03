import type { CombatEvent } from '../core/model.ts';

export class CombatAudio {
  private context?: AudioContext;
  private gain?: GainNode;
  private noise?: AudioBuffer;
  private disposed = false;
  private volume = 0.5;
  private nodes = new Set<AudioScheduledSourceNode>();

  setVolume(volume: number): void {
    this.volume = Math.min(1, Math.max(0, volume));
    if (this.context && this.gain) this.gain.gain.setTargetAtTime(this.volume * 0.22, this.context.currentTime, 0.02);
  }

  unlock(): void {
    if (this.disposed || this.volume === 0) return;
    try {
      if (!this.context) {
        this.context = new AudioContext();
        this.gain = this.context.createGain();
        this.gain.gain.value = this.volume * 0.22;
        this.gain.connect(this.context.destination);
        this.noise = this.context.createBuffer(1, Math.floor(this.context.sampleRate * 0.22), this.context.sampleRate);
        const data = this.noise.getChannelData(0);
        for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
      }
      if (this.context.state === 'suspended') void this.context.resume().catch(() => { /* Audio can remain unavailable under managed browser policies. */ });
    } catch { /* Gameplay does not depend on WebAudio. */ }
  }

  play(event: CombatEvent): void {
    const context = this.context;
    if (!context || !this.gain || context.state !== 'running' || this.volume <= 0 || this.nodes.size > 20) return;
    if (!['attack', 'hit', 'block', 'dash', 'awake', 'break'].includes(event.type)) return;
    const gain = context.createGain();
    const oscillator = context.createOscillator();
    const hit = event.type === 'hit' || event.type === 'break';
    const duration = event.type === 'awake' ? 0.6 : hit ? 0.16 : 0.1;
    const start = context.currentTime;
    oscillator.type = event.type === 'awake' ? 'sine' : 'triangle';
    const frequency = event.type === 'awake' ? 160 : event.type === 'block' ? 440 : hit ? 120 : 260;
    oscillator.frequency.setValueAtTime(frequency, start);
    oscillator.frequency.exponentialRampToValueAtTime(event.type === 'awake' ? 480 : 40, start + duration);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(hit ? 1 : 0.4, start + 0.006);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    oscillator.connect(gain);
    gain.connect(this.gain);
    this.nodes.add(oscillator);
    oscillator.onended = () => { this.nodes.delete(oscillator); oscillator.disconnect(); gain.disconnect(); };
    oscillator.start(start);
    oscillator.stop(start + duration + 0.02);
    if (hit && this.noise) {
      const source = context.createBufferSource();
      const noiseGain = context.createGain();
      source.buffer = this.noise;
      noiseGain.gain.setValueAtTime(0.5, start);
      noiseGain.gain.exponentialRampToValueAtTime(0.0001, start + 0.15);
      source.connect(noiseGain);
      noiseGain.connect(this.gain);
      this.nodes.add(source);
      source.onended = () => { this.nodes.delete(source); source.disconnect(); noiseGain.disconnect(); };
      source.start(start);
    }
  }

  dispose(): void {
    this.disposed = true;
    this.nodes.forEach(node => { try { node.stop(); } catch { /* Already ended. */ } node.disconnect(); });
    this.nodes.clear();
    this.gain?.disconnect();
    if (this.context && this.context.state !== 'closed') void this.context.close().catch(() => { /* Browser teardown may already have closed it. */ });
    this.context = undefined;
  }
}
