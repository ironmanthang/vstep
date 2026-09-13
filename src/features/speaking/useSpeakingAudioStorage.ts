import { useState, useEffect } from 'react';
import { getAllAudioBlobs } from './speakingStorage';
import type { ClientAudioMetrics } from './services/speakingAudio';

export function useSpeakingAudioStorage(
  testId: string,
  activePart: number,
  onRecordedFound?: () => void
) {
  const [audioBlobs, setAudioBlobs] = useState<Record<number, Blob>>({});
  const [audioUrls, setAudioUrls] = useState<Record<number, string>>({});
  const [clientMetrics, setClientMetrics] = useState<Record<number, ClientAudioMetrics>>({});

  useEffect(() => {
    let isMounted = true;
    getAllAudioBlobs(testId).then((blobs) => {
      if (!isMounted) return;
      setAudioBlobs(blobs);
      const urls: Record<number, string> = {};
      for (const [part, b] of Object.entries(blobs)) {
        urls[Number(part)] = URL.createObjectURL(b);
      }
      setAudioUrls(urls);
      if (blobs[activePart]) {
        onRecordedFound?.();
      }
    });

    return () => {
      isMounted = false;
    };
  }, [testId, activePart, onRecordedFound]);

  useEffect(() => {
    return () => {
      Object.values(audioUrls).forEach((url) => URL.revokeObjectURL(url));
    };
  }, [audioUrls]);

  return {
    audioBlobs,
    setAudioBlobs,
    audioUrls,
    setAudioUrls,
    clientMetrics,
    setClientMetrics,
  };
}
