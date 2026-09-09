import { useState, useEffect, useRef, useCallback } from 'react';
import type { ListeningTest, ListeningMode } from './types';

interface UseAudioPlayerOptions {
  test: ListeningTest;
  mode: ListeningMode;
  onAudioEnded?: () => void;
}

/**
 * Play a gentle audio chime using Web Audio API for immediate tactile sound feedback.
 */
export function playAudioFeedbackChime(freq = 523.25, duration = 0.25) {
  try {
    if (typeof window === 'undefined') return;
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;

    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.5, ctx.currentTime + duration);

    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch {
    // AudioContext blocked or unsupported
  }
}

export function useAudioPlayer({ test, mode, onAudioEnded }: UseAudioPlayerOptions) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(() => test.duration_seconds || 180);
  const [playbackRate, setPlaybackRate] = useState<number>(1.0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [activeSubtitleIndex, setActiveSubtitleIndex] = useState<number>(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const testRef = useRef<ListeningTest>(test);
  const modeRef = useRef<ListeningMode>(mode);
  const onAudioEndedRef = useRef(onAudioEnded);
  const playbackRateRef = useRef<number>(playbackRate);
  const currentTimeRef = useRef<number>(currentTime);

  useEffect(() => {
    testRef.current = test;
    modeRef.current = mode;
    onAudioEndedRef.current = onAudioEnded;
    playbackRateRef.current = playbackRate;
    currentTimeRef.current = currentTime;
  }, [test, mode, onAudioEnded, playbackRate, currentTime]);

  // Helper to compute subtitle index for given time in seconds
  const getSubtitleIndexForTime = useCallback((timeSec: number): number => {
    const timeMs = timeSec * 1000;
    const transcript = testRef.current.transcript;
    if (!transcript || transcript.length === 0) return 0;

    const idx = transcript.findIndex(item => timeMs >= item.start_ms && timeMs < item.end_ms);
    if (idx !== -1) return idx;
    if (timeMs >= (transcript[transcript.length - 1]?.end_ms || 0)) {
      return transcript.length - 1;
    }
    return 0;
  }, []);

  // HTML5 audio setup with stable lifecycle tied strictly to test.audio_url
  useEffect(() => {
    if (!test.audio_url) {
      return;
    }

    const audio = new Audio(test.audio_url);
    audio.playbackRate = playbackRateRef.current;
    audio.preload = 'auto';

    const handleLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration) && isFinite(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      const subIdx = getSubtitleIndexForTime(audio.currentTime);
      setActiveSubtitleIndex(subIdx);
    };

    const handlePlay = () => {
      setIsPlaying(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      onAudioEndedRef.current?.();
    };

    const handleError = (e: Event) => {
      console.error('Audio playback error:', e);
      setIsPlaying(false);
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audioRef.current = null;
    };
  }, [test.audio_url, getSubtitleIndexForTime]);

  // Sync playback rate directly to audio element when state changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  // Play
  const play = useCallback(() => {
    playAudioFeedbackChime(587.33);

    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.warn('Audio play request failed:', err);
      });
    }
  }, []);

  // Pause
  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setIsPlaying(false);
  }, []);

  // Toggle Play / Pause
  const togglePlay = useCallback(() => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        play();
      } else {
        pause();
      }
    }
  }, [play, pause]);

  // Seek to absolute time
  const seekTo = useCallback((targetSeconds: number) => {
    if (modeRef.current === 'exam') return;

    const clamped = Math.max(0, Math.min(duration, targetSeconds));
    setCurrentTime(clamped);
    const subIdx = getSubtitleIndexForTime(clamped);
    setActiveSubtitleIndex(subIdx);

    if (audioRef.current) {
      audioRef.current.currentTime = clamped;
    }
  }, [duration, getSubtitleIndexForTime]);

  // Seek relative delta seconds
  const seekBy = useCallback((deltaSeconds: number) => {
    if (modeRef.current === 'exam') return;
    playAudioFeedbackChime(deltaSeconds > 0 ? 659.25 : 440);
    const current = audioRef.current ? audioRef.current.currentTime : currentTimeRef.current;
    seekTo(current + deltaSeconds);
  }, [seekTo]);

  // Change playback rate
  const changePlaybackRate = useCallback((rate: number) => {
    if (modeRef.current === 'exam') return;
    setPlaybackRate(rate);
    if (audioRef.current) {
      audioRef.current.playbackRate = rate;
    }
  }, []);

  // Play specific segment/subtitle line
  const playSegment = useCallback((index: number) => {
    const seg = testRef.current.transcript[index];
    if (!seg) return;

    playAudioFeedbackChime(523.25);
    const startSec = seg.start_ms / 1000;
    setCurrentTime(startSec);
    setActiveSubtitleIndex(index);

    if (audioRef.current) {
      audioRef.current.currentTime = startSec;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {});
    }
  }, []);

  // Global desktop keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT' || target.isContentEditable)) {
        return;
      }

      if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        seekBy(-5);
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        seekBy(5);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [togglePlay, seekBy]);

  return {
    isPlaying,
    currentTime,
    duration,
    playbackRate,
    isMuted,
    activeSubtitleIndex,
    play,
    pause,
    togglePlay,
    seekTo,
    seekBy,
    setPlaybackRate: changePlaybackRate,
    playSegment,
    setIsMuted,
  };
}
