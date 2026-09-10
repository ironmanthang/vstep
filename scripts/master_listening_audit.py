import os, sys, re, json, io, subprocess
from faster_whisper import WhisperModel

if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')

print("Loading Whisper model (tiny, int8)...")
model = WhisperModel('tiny', device='cpu', compute_type='int8')
print("Model ready.\n")

def get_audio_slice(audio_path, start_sec, duration_sec=18):
    cmd = [
        'ffmpeg', '-y', '-ss', str(max(0, start_sec)), '-t', str(duration_sec),
        '-i', audio_path, '-f', 'wav', '-ar', '16000', '-ac', '1', 'pipe:1'
    ]
    proc = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.DEVNULL)
    return proc.stdout

def transcribe(audio_bytes):
    if not audio_bytes:
        return ""
    segments, _ = model.transcribe(io.BytesIO(audio_bytes))
    return ' '.join([s.text.strip() for s in segments])

def clean_speech_text(text):
    # Remove speaker prefixes and question announcements to focus on core content
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

def audit_test(test):
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

    # Filter clue segments
    clue_segments = []
    for idx, seg in enumerate(test['transcript']):
        if seg['is_clue_for_question']:
            clue_segments.append((idx, seg))

    # Transcribe speech for each clue segment
    audio_transcripts = []
    for idx, seg in clue_segments:
        start_sec = seg['start_ms'] / 1000.0
        dur_sec = min(22, max(12, (seg['end_ms'] - seg['start_ms']) / 1000.0))
        audio_slice = get_audio_slice(audio_abs, start_sec, dur_sec)
        spoken = transcribe(audio_slice)
        audio_transcripts.append({
            'seg_idx': idx,
            'clue': seg['is_clue_for_question'],
            'start_sec': start_sec,
            'spoken': spoken,
            'code_text': seg['text_en']
        })

    # Build similarity matrix: len(clue_segments) x len(clue_segments)
    N = len(audio_transcripts)
    sim_matrix = [[0.0 for _ in range(N)] for _ in range(N)]
    for i in range(N):
        for j in range(N):
            sim_matrix[i][j] = compute_overlap(audio_transcripts[i]['code_text'], audio_transcripts[j]['spoken'])

    results = []
    for i in range(N):
        code_item = audio_transcripts[i]
        diag_overlap = sim_matrix[i][i]
        
        # Find best audio match for this code segment
        best_j = max(range(N), key=lambda j: sim_matrix[i][j])
        best_overlap = sim_matrix[i][best_j]

        code_preview = code_item['code_text'].replace('\n', ' ')[:75]
        audio_preview = code_item['spoken'][:75]

        print(f"\n[Seg {code_item['seg_idx']}] Clue: {code_item['clue']} @ {code_item['start_sec']:.1f}s | Self-Overlap: {diag_overlap*100:.1f}%")
        print(f"  Code : {code_preview}...")
        print(f"  Audio: {audio_preview}...")

        if best_j != i and best_overlap >= 0.35 and best_overlap > diag_overlap + 0.15:
            # Clear swap detected!
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
        elif diag_overlap < 0.25:
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

def main():
    data_path = "scripts/all_listening_data.json"
    if not os.path.exists(data_path):
        print(f"Error: {data_path} not found. Run scripts/export_all_listening.mjs first.")
        sys.exit(1)

    with open(data_path, "r", encoding="utf-8") as f:
        all_tests = json.load(f)

    filter_arg = sys.argv[1] if len(sys.argv) > 1 else None
    if filter_arg:
        tests_to_run = [t for t in all_tests if filter_arg.lower() in t['id'].lower() or filter_arg.lower() in t['relPath'].lower()]
    else:
        tests_to_run = all_tests

    all_defects = []
    print(f"Auditing {len(tests_to_run)} listening tests...")

    for t in tests_to_run:
        defects = audit_test(t)
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
