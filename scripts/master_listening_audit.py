#!/usr/bin/env python3
"""
VSTEP Master Listening Acoustic Auditor
Uses faster-whisper to transcribe audio slices at clue timestamps and performs
cross-segment similarity matrix analysis to catch question inversions, audio drift, or missing audio.

Usage:
  python scripts/master_listening_audit.py [filter] [options]

Examples:
  python scripts/master_listening_audit.py hcmue_lis_p1_01
  python scripts/master_listening_audit.py mock01 --model base.en
  python scripts/master_listening_audit.py --all
"""

import os
import sys
import re
import json
import io
import subprocess
import argparse
from faster_whisper import WhisperModel

if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')

_model_instance = None

def get_whisper_model(model_name="tiny"):
    global _model_instance
    if _model_instance is None:
        print(f"Loading faster-whisper model ({model_name}, int8 CPU)...")
        _model_instance = WhisperModel(model_name, device='cpu', compute_type='int8')
        print("Model ready.\n")
    return _model_instance

def get_audio_slice(audio_path, start_sec, duration_sec=18):
    cmd = [
        'ffmpeg', '-y', '-ss', str(max(0, start_sec)), '-t', str(duration_sec),
        '-i', audio_path, '-f', 'wav', '-ar', '16000', '-ac', '1', 'pipe:1'
    ]
    proc = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.DEVNULL)
    return proc.stdout

def transcribe(audio_bytes, model):
    if not audio_bytes:
        return ""
    segments, _ = model.transcribe(io.BytesIO(audio_bytes))
    return ' '.join([s.text.strip() for s in segments])

def clean_speech_text(text):
    text = re.sub(r'^(Announcer|Speaker|Man|Woman|Professor|Girl|Boy):\s*', '', text, flags=re.IGNORECASE)
    text = re.sub(r'^Questions?\s+\d+.*?(refer to|look through|choose).*?(\n|\.)', '', text, flags=re.IGNORECASE)
    return text

def tokenize(text):
    cleaned = clean_speech_text(text)
    words = re.findall(r'[a-zA-Z0-9]+', cleaned.lower())
    stopwords = {
        'the', 'a', 'an', 'and', 'or', 'to', 'of', 'in', 'on', 'for', 'with', 'at', 'by', 
        'is', 'it', 'this', 'that', 'you', 'i', 'we', 'they', 'he', 'she', 'announcer', 
        'speaker', 'man', 'woman', 'question', 'questions', 'now', 'are', 'your', 'have',
        'what', 'why', 'who', 'where', 'when', 'how', 'which', 'will', 'not', 'can'
    }
    return set(w for w in words if w not in stopwords and len(w) > 2)

def compute_overlap(text1, text2):
    t1 = tokenize(text1)
    t2 = tokenize(text2)
    if not t1 or not t2:
        return 0.0
    inter = t1.intersection(t2)
    return len(inter) / min(len(t1), len(t2))

def audit_test(test, model, threshold=0.25, part=None):
    audio_rel = test['audio_url'].lstrip('/')
    audio_abs = os.path.join(os.getcwd(), 'public', audio_rel)

    print(f"\n{'='*90}")
    print(f"AUDITING: {test['title']} ({test['id']})")
    print(f"File: {test['relPath']}")
    print(f"Audio: {test['audio_url']}")
    print(f"{'='*90}")

    if not os.path.exists(audio_abs):
        print(f"❌ [AUDIO MISSING] File not on disk: {audio_abs}")
        return [{
            'type': 'AUDIO_MISSING',
            'file': test['relPath'],
            'test_id': test['id'],
            'details': f"Audio file not found at {audio_abs}"
        }]

    clue_segments = []
    for idx, seg in enumerate(test['transcript']):
        clue = seg.get('is_clue_for_question', '')
        if not clue:
            continue
        if part == 1:
            if 'part1' in test.get('relPath', '').lower() or (test.get('part') == 1 and 'hcmue' in test.get('id', '')):
                # In discrete HCMUE Part 1 tests, all clues belong to Part 1
                pass
            else:
                # In continuous mock tests, Part 1 is questions 1 to 8
                clue_tokens = [c.strip() for c in clue.split(',')]
                if not any(re.search(r'q\d+_[1-8]$', tok) for tok in clue_tokens):
                    continue
        elif part == 2:
            if 'part2' in test.get('relPath', '').lower() or (test.get('part') == 2 and 'hcmue' in test.get('id', '')):
                # In discrete HCMUE Part 2 tests, all clues belong to Part 2
                pass
            else:
                # In continuous mock tests, Part 2 is questions 9 to 20
                clue_tokens = [c.strip() for c in clue.split(',')]
                if not any(re.search(r'q\d+_(?:9|1[0-9]|20)$', tok) for tok in clue_tokens):
                    continue
        elif part == 3:
            if 'part3' in test.get('relPath', '').lower() or (test.get('part') == 3 and 'hcmue' in test.get('id', '')):
                # In discrete HCMUE Part 3 tests, all clues belong to Part 3
                pass
            else:
                # In continuous mock tests, Part 3 is questions 21 to 35
                clue_tokens = [c.strip() for c in clue.split(',')]
                if not any(re.search(r'q\d+_(?:2[1-9]|3[0-5])$', tok) for tok in clue_tokens):
                    continue
        clue_segments.append((idx, seg))

    if not clue_segments:
        print(f"  ℹ️ No clue segments found matching part={part}.")
        return []

    audio_transcripts = []
    for idx, seg in clue_segments:
        start_sec = seg['start_ms'] / 1000.0
        dur_sec = min(22, max(12, (seg['end_ms'] - seg['start_ms']) / 1000.0))
        audio_slice = get_audio_slice(audio_abs, start_sec, dur_sec)
        spoken = transcribe(audio_slice, model)
        audio_transcripts.append({
            'seg_idx': idx,
            'clue': seg['is_clue_for_question'],
            'start_sec': start_sec,
            'spoken': spoken,
            'code_text': seg['text_en']
        })

    N = len(audio_transcripts)
    sim_matrix = [[0.0 for _ in range(N)] for _ in range(N)]
    for i in range(N):
        for j in range(N):
            sim_matrix[i][j] = compute_overlap(audio_transcripts[i]['code_text'], audio_transcripts[j]['spoken'])

    results = []
    for i in range(N):
        code_item = audio_transcripts[i]
        diag_overlap = sim_matrix[i][i]
        best_j = max(range(N), key=lambda j: sim_matrix[i][j])
        best_overlap = sim_matrix[i][best_j]

        code_preview = code_item['code_text'].replace('\n', ' ')[:75]
        audio_preview = code_item['spoken'][:75]

        print(f"\n[Seg {code_item['seg_idx']}] Clue: {code_item['clue']} @ {code_item['start_sec']:.1f}s | Self-Overlap: {diag_overlap*100:.1f}%")
        print(f"  Code : {code_preview}...")
        print(f"  Audio: {audio_preview}...")

        if best_j != i and best_overlap >= 0.35 and best_overlap > diag_overlap + 0.15:
            swapped_with = audio_transcripts[best_j]
            err_msg = (
                f"SWAPPED SEGMENT: Segment {code_item['seg_idx']} (Clue: {code_item['clue']}) code text "
                f"actually matches audio at Segment {swapped_with['seg_idx']} (Clue: {swapped_with['clue']}) "
                f"with {best_overlap*100:.1f}% confidence (self: {diag_overlap*100:.1f}%)"
            )
            print(f"  ❌ {err_msg}")
            results.append({
                'type': 'SWAP_MISMATCH',
                'file': test['relPath'],
                'test_id': test['id'],
                'seg_idx': code_item['seg_idx'],
                'clue': code_item['clue'],
                'swapped_with_seg': swapped_with['seg_idx'],
                'swapped_with_clue': swapped_with['clue'],
                'confidence': round(best_overlap, 3),
                'details': err_msg,
                'code_text': code_item['code_text'],
                'audio_heard_here': code_item['spoken'],
                'audio_heard_there': swapped_with['spoken']
            })
        elif diag_overlap < threshold:
            err_msg = (
                f"LOW OVERLAP: Segment {code_item['seg_idx']} (Clue: {code_item['clue']}) "
                f"audio does not match code text (overlap {diag_overlap*100:.1f}%, best other: {best_overlap*100:.1f}%)"
            )
            print(f"  ⚠️ {err_msg}")
            results.append({
                'type': 'LOW_OVERLAP',
                'file': test['relPath'],
                'test_id': test['id'],
                'seg_idx': code_item['seg_idx'],
                'clue': code_item['clue'],
                'confidence': round(diag_overlap, 3),
                'details': err_msg,
                'code_text': code_item['code_text'],
                'audio_heard': code_item['spoken']
            })
        else:
            print(f"  ✔ Aligned (overlap {diag_overlap*100:.1f}%)")

    return results

def ensure_data_file(data_path="scripts/all_listening_data.json"):
    if not os.path.exists(data_path):
        print(f"[Audit] {data_path} not found. Running export_all_listening.mjs...")
        subprocess.run(["node", "--experimental-strip-types", "scripts/export_all_listening.mjs"], check=True)

def main():
    parser = argparse.ArgumentParser(description="VSTEP Master Listening Acoustic Auditor")
    parser.add_argument("filter", nargs="?", help="Optional filter by test ID or file path")
    parser.add_argument("--model", default="tiny", help="faster-whisper model (default: tiny, options: tiny, base.en, small.en, large-v3-turbo)")
    parser.add_argument("--threshold", type=float, default=0.25, help="Minimum overlap threshold (default: 0.25)")
    parser.add_argument("--part", type=int, choices=[1, 2, 3], help="Filter by section part (e.g. 1 for Part 1 announcements)")
    parser.add_argument("--export", action="store_true", help="Force re-export of all listening tests before auditing")
    args = parser.parse_args()

    data_path = "scripts/all_listening_data.json"
    if args.export:
        subprocess.run(["node", "--experimental-strip-types", "scripts/export_all_listening.mjs"], check=True)
    else:
        ensure_data_file(data_path)

    with open(data_path, "r", encoding="utf-8") as f:
        all_tests = json.load(f)

    if args.filter and args.filter != "--all":
        filt = args.filter.lower()
        tests_to_run = [t for t in all_tests if filt in t['id'].lower() or filt in t['relPath'].lower()]
    else:
        tests_to_run = all_tests

    if args.part:
        tests_to_run = [t for t in tests_to_run if t.get('part') == args.part or 'mock' in t.get('id', '')]

    if not tests_to_run:
        print(f"No tests matched filter: {args.filter}")
        sys.exit(0)

    model = get_whisper_model(args.model)

    all_defects = []
    print(f"Auditing {len(tests_to_run)} listening tests (part filter: {args.part or 'all'})...")

    for t in tests_to_run:
        defects = audit_test(t, model, threshold=args.threshold, part=args.part)
        if defects:
            all_defects.extend(defects)

    print("\n" + "="*90)
    print("EXHAUSTIVE AUDIT SUMMARY")
    print("="*90)
    print(f"Total tests audited: {len(tests_to_run)}")
    print(f"Total defects/mismatches found: {len(all_defects)}")

    for d in all_defects:
        print(f"- [{d['type']}] {d['test_id']} ({d['file']}): {d['details']}")

    out_path = "scripts/listening_audit_report.json"
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(all_defects, f, indent=2, ensure_ascii=False)
    print(f"\nDetailed report written to: {out_path}")

if __name__ == '__main__':
    main()
