#!/usr/bin/env python3
"""
VSTEP Listening Stage 1 Transcriber
Dual-engine transcription with sub-second timestamps:
1. Primary: Groq Cloud Whisper (whisper-large-v3-turbo) via OpenAI-compatible endpoint (~2-3s execution).
2. Fallback: Local faster-whisper (CTranslate2 int8 on CPU) (~35-45s execution, 100% offline).

Usage:
  python scripts/transcribe_listening.py <audio_path> [options]

Options:
  --local            Force local faster-whisper execution even if GROQ_API_KEY is present
  --model <name>     Local Whisper model (default: large-v3-turbo, options: tiny, base, small.en, large-v3-turbo)
  --out <path>       Output JSON file path (default: <audio_path_without_ext>.intermediate.json)
"""

import os
import sys
import argparse
import json
import time
import requests

if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')

def load_env_file(env_path=".env"):
    if not os.path.exists(env_path):
        return
    with open(env_path, "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            key, val = line.split("=", 1)
            key = key.strip()
            val = val.strip().strip("'\"")
            if key and key not in os.environ:
                os.environ[key] = val

def transcribe_groq(audio_path, api_key):
    print(f"[Stage 1: Groq] Connecting to Groq Whisper Cloud (whisper-large-v3-turbo)...")
    url = "https://api.groq.com/openai/v1/audio/transcriptions"
    headers = {
        "Authorization": f"Bearer {api_key}"
    }
    
    file_size_mb = os.path.getsize(audio_path) / (1024 * 1024)
    print(f"[Stage 1: Groq] Uploading {file_size_mb:.2f} MB audio to Groq...")
    start_t = time.time()
    
    with open(audio_path, "rb") as f:
        files = {
            "file": (os.path.basename(audio_path), f, "audio/mpeg")
        }
        data = {
            "model": "whisper-large-v3-turbo",
            "response_format": "verbose_json",
            "temperature": "0.0"
        }
        res = requests.post(url, headers=headers, files=files, data=data, timeout=120)
        
    if not res.ok:
        raise RuntimeError(f"Groq API returned HTTP {res.status_code}: {res.text}")
        
    elapsed = time.time() - start_t
    print(f"[Stage 1: Groq] Completed in {elapsed:.2f}s!")
    
    payload = res.json()
    raw_segments = payload.get("segments", [])
    
    formatted_segments = []
    for idx, seg in enumerate(raw_segments):
        start_ms = int(round(seg.get("start", 0) * 1000))
        end_ms = int(round(seg.get("end", 0) * 1000))
        text = seg.get("text", "").strip()
        formatted_segments.append({
            "id": idx,
            "start_ms": start_ms,
            "end_ms": end_ms,
            "text_en": text
        })
        
    return {
        "audio_path": audio_path,
        "duration_seconds": payload.get("duration", 0),
        "engine": "groq/whisper-large-v3-turbo",
        "segments": formatted_segments
    }

def transcribe_local(audio_path, model_name="large-v3-turbo"):
    print(f"[Stage 1: Local] Initializing faster-whisper ({model_name}, int8 CPU)...")
    from faster_whisper import WhisperModel
    
    start_t = time.time()
    try:
        model = WhisperModel(model_name, device="cpu", compute_type="int8")
    except Exception as e:
        if model_name != "tiny":
            print(f"[Stage 1: Local] Warning: Failed to load {model_name} ({e}). Falling back to 'tiny'...")
            model = WhisperModel("tiny", device="cpu", compute_type="int8")
        else:
            raise e

    print(f"[Stage 1: Local] Model ready. Transcribing local audio...")
    segments_gen, info = model.transcribe(audio_path, beam_size=5, vad_filter=True)
    
    formatted_segments = []
    for idx, seg in enumerate(segments_gen):
        start_ms = int(round(seg.start * 1000))
        end_ms = int(round(seg.end * 1000))
        formatted_segments.append({
            "id": idx,
            "start_ms": start_ms,
            "end_ms": end_ms,
            "text_en": seg.text.strip()
        })
        
    elapsed = time.time() - start_t
    print(f"[Stage 1: Local] Completed in {elapsed:.2f}s! (Duration: {info.duration:.1f}s)")
    
    return {
        "audio_path": audio_path,
        "duration_seconds": info.duration,
        "engine": f"local/faster-whisper/{model_name}",
        "segments": formatted_segments
    }

def main():
    load_env_file()
    
    parser = argparse.ArgumentParser(description="VSTEP Stage 1 Audio Transcriber")
    parser.add_argument("audio", help="Path to input audio file (MP3/WAV)")
    parser.add_argument("--local", action="store_true", help="Force local faster-whisper execution")
    parser.add_argument("--model", default="large-v3-turbo", help="Local Whisper model name")
    parser.add_argument("--out", help="Output path for intermediate JSON")
    args = parser.parse_args()
    
    if not os.path.exists(args.audio):
        print(f"Error: Audio file not found: {args.audio}")
        sys.exit(1)
        
    groq_key = os.getenv("GROQ_API_KEY")
    result = None
    
    if not args.local and groq_key:
        try:
            result = transcribe_groq(args.audio, groq_key)
        except Exception as e:
            print(f"[Stage 1: Groq Failed] Error: {e}")
            print("[Stage 1: Fallback] Switching to local faster-whisper...")
            result = transcribe_local(args.audio, args.model)
    else:
        if not groq_key and not args.local:
            print("[Stage 1] GROQ_API_KEY not found in environment or .env. Using local faster-whisper...")
        result = transcribe_local(args.audio, args.model)
        
    out_path = args.out
    if not out_path:
        base, _ = os.path.splitext(args.audio)
        out_path = f"{base}.intermediate.json"
        
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(result, f, indent=2, ensure_ascii=False)
        
    print(f"\n[Stage 1 Complete] Transcribed {len(result['segments'])} segments.")
    print(f"Intermediate transcript written to: {out_path}")

if __name__ == "__main__":
    main()
