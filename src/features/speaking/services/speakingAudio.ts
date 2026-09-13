// Audio capture, Dynamic MIME negotiation, Web Audio BEEP synthesizer & RMS analyzer

export interface ClientAudioMetrics {
  durationSeconds: number;
  speakingDurationSeconds: number;
  silenceDurationSeconds: number;
  longPausesCount: number; // Pauses > 2.0s
}

/**
 * Negotiate best supported audio recording MIME type across modern browsers.
 */
export function getSupportedAudioMimeType(): string {
  if (typeof MediaRecorder === 'undefined') return '';

  const candidates = [
    'audio/webm;codecs=opus',
    'audio/webm',
    'audio/mp4',
    'audio/aac',
    'audio/ogg;codecs=opus',
  ];

  for (const mime of candidates) {
    if (MediaRecorder.isTypeSupported(mime)) {
      return mime;
    }
  }
  return '';
}

/**
 * Web Audio API native BEEP synthesizer.
 * Eliminates dependency on external audio MP3 assets and network latency.
 */
let sharedAudioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!sharedAudioCtx || sharedAudioCtx.state === 'closed') {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    sharedAudioCtx = new AudioCtx();
  }
  if (sharedAudioCtx.state === 'suspended') {
    sharedAudioCtx.resume().catch(() => {});
  }
  return sharedAudioCtx;
}

export function playChimeTone(frequency = 800, durationMs = 200, type: OscillatorType = 'sine'): void {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);

    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + durationMs / 1000);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + durationMs / 1000);
  } catch {
    // Ignore audio context errors
  }
}

/** Double beep when recording starts */
export function playStartRecordingBeep(): void {
  playChimeTone(800, 150);
  setTimeout(() => {
    playChimeTone(1000, 250);
  }, 180);
}

/** Long chime when recording stops / time is up */
export function playStopRecordingBeep(): void {
  playChimeTone(600, 450);
}

/**
 * Audio Recording Session Manager with real-time RMS amplitude analysis.
 */
export class AudioRecordingSession {
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];
  private mediaStream: MediaStream | null = null;
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private sourceNode: MediaStreamAudioSourceNode | null = null;

  private startTime = 0;
  private silenceDuration = 0;
  private longPausesCount = 0;
  private lastSilenceStart = 0;
  private isSilent = false;
  private monitorTimer: number | null = null;

  public async start(): Promise<void> {
    this.audioChunks = [];
    this.silenceDuration = 0;
    this.longPausesCount = 0;
    this.isSilent = false;

    const stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true,
      },
    });
    this.mediaStream = stream;

    const mimeType = getSupportedAudioMimeType();
    const options = mimeType ? { mimeType } : undefined;
    this.mediaRecorder = new MediaRecorder(stream, options);

    this.mediaRecorder.ondataavailable = (event) => {
      if (event.data && event.data.size > 0) {
        this.audioChunks.push(event.data);
      }
    };

    // Setup Web Audio Analyser for RMS volume and waveform
    try {
      this.audioContext = getAudioContext();
      this.sourceNode = this.audioContext.createMediaStreamSource(stream);
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 256;
      this.analyser.smoothingTimeConstant = 0.8;
      this.sourceNode.connect(this.analyser);

      // Start silence & pause monitor (polling every 100ms)
      this.monitorSilence();
    } catch {
      // AudioContext fallback
    }

    this.startTime = performance.now();
    this.mediaRecorder.start(250); // Slice every 250ms
  }

  private monitorSilence(): void {
    if (!this.analyser) return;

    const dataArray = new Uint8Array(this.analyser.fftSize);
    const SILENCE_THRESHOLD = 0.015; // RMS threshold

    this.monitorTimer = window.setInterval(() => {
      if (!this.analyser) return;
      this.analyser.getByteTimeDomainData(dataArray);

      let sumSquare = 0;
      for (let i = 0; i < dataArray.length; i++) {
        const normalized = (dataArray[i] - 128) / 128;
        sumSquare += normalized * normalized;
      }
      const rms = Math.sqrt(sumSquare / dataArray.length);

      const now = performance.now();
      if (rms < SILENCE_THRESHOLD) {
        if (!this.isSilent) {
          this.isSilent = true;
          this.lastSilenceStart = now;
        } else {
          // Accumulate ongoing silence
          this.silenceDuration += 0.1;
        }
      } else {
        if (this.isSilent) {
          const pauseLengthSeconds = (now - this.lastSilenceStart) / 1000;
          if (pauseLengthSeconds >= 2.0) {
            this.longPausesCount += 1;
          }
          this.isSilent = false;
        }
      }
    }, 100);
  }

  public getAnalyser(): AnalyserNode | null {
    return this.analyser;
  }

  public async stop(): Promise<{ blob: Blob; metrics: ClientAudioMetrics }> {
    if (this.monitorTimer) {
      clearInterval(this.monitorTimer);
      this.monitorTimer = null;
    }

    // Check if ended during a long silence
    if (this.isSilent) {
      const pauseLengthSeconds = (performance.now() - this.lastSilenceStart) / 1000;
      if (pauseLengthSeconds >= 2.0) {
        this.longPausesCount += 1;
      }
    }

    const durationSeconds = Math.max(0.5, (performance.now() - this.startTime) / 1000);
    const silenceDurationSeconds = Math.min(durationSeconds, this.silenceDuration);
    const speakingDurationSeconds = Math.max(0.1, durationSeconds - silenceDurationSeconds);

    const metrics: ClientAudioMetrics = {
      durationSeconds: Math.round(durationSeconds * 10) / 10,
      speakingDurationSeconds: Math.round(speakingDurationSeconds * 10) / 10,
      silenceDurationSeconds: Math.round(silenceDurationSeconds * 10) / 10,
      longPausesCount: this.longPausesCount,
    };

    return new Promise((resolve) => {
      if (!this.mediaRecorder) {
        resolve({
          blob: new Blob([], { type: 'audio/webm' }),
          metrics,
        });
        return;
      }

      this.mediaRecorder.onstop = () => {
        const mimeType = this.mediaRecorder?.mimeType || 'audio/webm';
        const finalBlob = new Blob(this.audioChunks, { type: mimeType });

        // Clean up tracks
        if (this.mediaStream) {
          this.mediaStream.getTracks().forEach((track) => track.stop());
          this.mediaStream = null;
        }

        if (this.sourceNode) {
          this.sourceNode.disconnect();
          this.sourceNode = null;
        }

        resolve({
          blob: finalBlob,
          metrics,
        });
      };

      if (this.mediaRecorder.state !== 'inactive') {
        this.mediaRecorder.stop();
      }
    });
  }
}
