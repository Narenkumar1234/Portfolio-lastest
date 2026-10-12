/**
 * Audio utilities for converting between browser Web Audio and Gemini 3.8 Live API formats.
 * Live API requires:
 * - Input: 16kHz raw 16-bit PCM little-endian
 * - Output: 24kHz raw 16-bit PCM little-endian
 */

// Convert Float32Array from microphone (16kHz) to Base64-encoded 16-bit PCM
export function pcmFloat32ToBase64(float32Array: Float32Array): string {
  const int16Array = new Int16Array(float32Array.length);
  for (let i = 0; i < float32Array.length; i++) {
    // Clamp to [-1, 1] range
    const s = Math.max(-1, Math.min(1, float32Array[i]));
    int16Array[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
  }

  // Convert Int16Array buffer to base64
  const bytes = new Uint8Array(int16Array.buffer);
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

// Convert Base64 16-bit PCM (24kHz) from Gemini Live into an AudioBuffer
export function pcmBase64ToAudioBuffer(
  audioCtx: AudioContext,
  base64Audio: string
): AudioBuffer {
  const binaryString = atob(base64Audio);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  const int16 = new Int16Array(bytes.buffer);
  const float32 = new Float32Array(int16.length);
  for (let i = 0; i < int16.length; i++) {
    float32[i] = int16[i] / 32768.0;
  }

  const audioBuffer = audioCtx.createBuffer(1, float32.length, 24000);
  audioBuffer.copyToChannel(float32, 0);
  return audioBuffer;
}

// Audio queue player to ensure gapless streaming playback
export class LiveAudioPlayer {
  private audioCtx: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private nextStartTime = 0;
  private activeSources: AudioBufferSourceNode[] = [];
  public isPlaying = false;
  public onPlaybackEnd?: () => void;

  constructor() {
    // AudioContext will be initialized on first user gesture
  }

  private getAudioContext(): AudioContext {
    if (!this.audioCtx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.audioCtx = new AudioCtx({ sampleRate: 24000 });
      this.analyser = this.audioCtx.createAnalyser();
      this.analyser.fftSize = 64;
      this.analyser.smoothingTimeConstant = 0.8;
      this.analyser.connect(this.audioCtx.destination);
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  public getFrequencyData(array: Uint8Array<ArrayBuffer>): void {
    if (this.analyser && this.isPlaying) {
      this.analyser.getByteFrequencyData(array);
    } else {
      array.fill(0);
    }
  }

  public getAverageVolume(): number {
    if (!this.analyser || !this.isPlaying) return 0;
    const buffer = new ArrayBuffer(this.analyser.frequencyBinCount);
    const data = new Uint8Array(buffer);
    this.analyser.getByteFrequencyData(data);
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
      sum += data[i];
    }
    return data.length > 0 ? (sum / data.length) / 255 : 0;
  }

  public playChunk(base64Audio: string): void {
    try {
      const ctx = this.getAudioContext();
      const buffer = pcmBase64ToAudioBuffer(ctx, base64Audio);
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      
      // Connect to analyser which connects to destination
      if (this.analyser) {
        source.connect(this.analyser);
      } else {
        source.connect(ctx.destination);
      }

      const currentTime = ctx.currentTime;
      if (this.nextStartTime < currentTime) {
        this.nextStartTime = currentTime + 0.05; // 50ms initial safety cushion
      }

      source.start(this.nextStartTime);
      this.nextStartTime += buffer.duration;
      this.isPlaying = true;

      this.activeSources.push(source);
      source.onended = () => {
        const idx = this.activeSources.indexOf(source);
        if (idx !== -1) this.activeSources.splice(idx, 1);
        if (this.activeSources.length === 0) {
          this.isPlaying = false;
          this.onPlaybackEnd?.();
        }
      };
    } catch (err) {
      console.error('Failed to play audio chunk:', err);
    }
  }

  public stopAll(): void {
    for (const src of this.activeSources) {
      try {
        src.stop();
        src.disconnect();
      } catch {
        // Ignore already stopped
      }
    }
    this.activeSources = [];
    if (this.audioCtx) {
      this.nextStartTime = this.audioCtx.currentTime;
    }
    this.isPlaying = false;
  }

  public close(): void {
    this.stopAll();
    if (this.analyser) {
      this.analyser.disconnect();
      this.analyser = null;
    }
    if (this.audioCtx) {
      this.audioCtx.close();
      this.audioCtx = null;
    }
  }
}
