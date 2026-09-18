"""
Reading Markdown Batch Enrichment via Gemini Vision OCR (Phase 2)
Authentic VSTEP reading exam test bank enricher.
Detects bold/underlined target vocabulary and referent pronouns from authentic scanned PDFs,
and applies atomic 3-point synchronized patches to:
1. content_paragraphs
2. clue_sentence
3. question_text
"""

import os
import sys
import io
import re
import json
import time
import base64
import argparse
import urllib.request
import urllib.error
import fitz  # PyMuPDF
from dotenv import load_dotenv

sys.stdout.reconfigure(encoding='utf-8')
load_dotenv(override=True)

API_KEY = os.getenv('GOOGLE_API_KEY') or os.getenv('VITE_GEMINI_API_KEY')
if not API_KEY:
    print("ERROR: Missing GOOGLE_API_KEY or VITE_GEMINI_API_KEY in .env", file=sys.stderr)
    sys.exit(1)

MODELS = [
    'gemini-3.8-flash',
    'gemini-3.7-flash',
    'gemini-3.6-flash',
    'gemini-3.5-flash',
    'gemini-3.5-flash-lite',
]

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(SCRIPT_DIR)

CACHE_DIR = os.path.join(SCRIPT_DIR, '.enrichment_cache')
os.makedirs(CACHE_DIR, exist_ok=True)
LOG_FILE = os.path.join(SCRIPT_DIR, '.enrichment_log.json')

HCMUE_PDF = os.path.join(SCRIPT_DIR, 'vstep-collection-20-mock-tests.pdf')
ULIS_PDF = os.path.join(SCRIPT_DIR, '7-Vstep-Tests-B1-B2-C1-Full-Key.pdf')

# Full 12-test registry with passage text page mappings (1-indexed page numbers in PDF)
TEST_REGISTRY = {
    # HCMUE Drills 1 to 5
    'hcmue_01': {
        'name': 'HCMUE Practice Drill 1',
        'pdf': HCMUE_PDF,
        'ts_file': 'src/features/reading/data/drills/hcmue/hcmueReadingTest01.ts',
        'passages': {
            1: [11, 12],
            2: [13, 14],
            3: [16, 17],
            4: [20, 21, 22],
        }
    },
    'hcmue_02': {
        'name': 'HCMUE Practice Drill 2',
        'pdf': HCMUE_PDF,
        'ts_file': 'src/features/reading/data/drills/hcmue/hcmueReadingTest02.ts',
        'passages': {
            1: [39, 40],
            2: [41, 42],
            3: [44, 45, 46],
            4: [48, 49],
        }
    },
    'hcmue_03': {
        'name': 'HCMUE Practice Drill 3',
        'pdf': HCMUE_PDF,
        'ts_file': 'src/features/reading/data/drills/hcmue/hcmueReadingTest03.ts',
        'passages': {
            1: [65, 66],
            2: [67, 68],
            3: [70, 71],
            4: [74, 75],
        }
    },
    'hcmue_04': {
        'name': 'HCMUE Practice Drill 4',
        'pdf': HCMUE_PDF,
        'ts_file': 'src/features/reading/data/drills/hcmue/hcmueReadingTest04.ts',
        'passages': {
            1: [91, 92],
            2: [94, 95],
            3: [96, 97, 98],
            4: [100, 101, 102],
        }
    },
    'hcmue_05': {
        'name': 'HCMUE Practice Drill 5',
        'pdf': HCMUE_PDF,
        'ts_file': 'src/features/reading/data/drills/hcmue/hcmueReadingTest05.ts',
        'passages': {
            1: [119, 120],
            2: [121, 122],
            3: [124, 125, 126],
            4: [128, 129],
        }
    },
    # ULIS Mock Tests 1 to 7
    'ulis_01': {
        'name': 'ULIS Mock Test 1',
        'pdf': ULIS_PDF,
        'ts_file': 'src/features/reading/data/mockTests/ulisReadingTest01.ts',
        'passages': {
            1: [10, 11],
            2: [12, 13],
            3: [14, 15],
            4: [15, 16, 17],
        }
    },
    'ulis_02': {
        'name': 'ULIS Mock Test 2',
        'pdf': ULIS_PDF,
        'ts_file': 'src/features/reading/data/mockTests/ulisReadingTest02.ts',
        'passages': {
            1: [24, 25],
            2: [25, 26, 27],
            3: [28, 29],
            4: [30, 31],
        }
    },
    'ulis_03': {
        'name': 'ULIS Mock Test 3',
        'pdf': ULIS_PDF,
        'ts_file': 'src/features/reading/data/mockTests/ulisReadingTest03.ts',
        'passages': {
            1: [38, 39],
            2: [39, 40],
            3: [41, 42],
            4: [42, 43],
        }
    },
    'ulis_04': {
        'name': 'ULIS Mock Test 4',
        'pdf': ULIS_PDF,
        'ts_file': 'src/features/reading/data/mockTests/ulisReadingTest04.ts',
        'passages': {
            1: [50, 51],
            2: [51, 52, 53],
            3: [53, 54],
            4: [54, 55],
        }
    },
    'ulis_05': {
        'name': 'ULIS Mock Test 5',
        'pdf': ULIS_PDF,
        'ts_file': 'src/features/reading/data/mockTests/ulisReadingTest05.ts',
        'passages': {
            1: [62, 63],
            2: [63, 64, 65],
            3: [65, 66],
            4: [66, 67, 68],
        }
    },
    'ulis_06': {
        'name': 'ULIS Mock Test 6',
        'pdf': ULIS_PDF,
        'ts_file': 'src/features/reading/data/mockTests/ulisReadingTest06.ts',
        'passages': {
            1: [75, 76],
            2: [76, 77, 78],
            3: [78, 79, 80],
            4: [80, 81, 82],
        }
    },
    'ulis_07': {
        'name': 'ULIS Mock Test 7',
        'pdf': ULIS_PDF,
        'ts_file': 'src/features/reading/data/mockTests/ulisReadingTest07.ts',
        'passages': {
            1: [89, 90],
            2: [91, 92],
            3: [92, 93, 94],
            4: [94, 95],
        }
    },
}

class QuotaExhaustedException(Exception):
    """Raised when gemini-3.5-flash-lite hits quota limits."""
    pass

def render_pages_to_b64(pdf_path, page_numbers):
    """Renders 1-indexed PDF pages to base64 PNG pixmaps at 150 DPI."""
    doc = fitz.open(pdf_path)
    b64_list = []
    for p_num in page_numbers:
        idx = p_num - 1
        if 0 <= idx < len(doc):
            page = doc[idx]
            pix = page.get_pixmap(dpi=150)
            b64_list.append(base64.b64encode(pix.tobytes("png")).decode('utf-8'))
    return b64_list

def call_gemini_vision_cascade(images_b64, prompt):
    """
    Executes Gemini Vision generation across official cascade:
    3.8-flash -> 3.7-flash -> 3.6-flash -> 3.5-flash -> 3.5-flash-lite.
    Uses 12s timeout with fast transition to next model if endpoint is hanging or 503-ing.
    If 3.5-flash-lite hits limit, raises QuotaExhaustedException and stops.
    """
    for round_idx in range(1, 4):
        for model in MODELS:
            try:
                url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={API_KEY}"
                parts = [{"inline_data": {"mime_type": "image/png", "data": img}} for img in images_b64]
                parts.append({"text": prompt})
                payload = {
                    "contents": [{"parts": parts}],
                    "generationConfig": {
                        "temperature": 0.1,
                        "responseMimeType": "application/json"
                    }
                }
                req = urllib.request.Request(
                    url,
                    data=json.dumps(payload).encode('utf-8'),
                    headers={'Content-Type': 'application/json'}
                )
                with urllib.request.urlopen(req, timeout=12) as resp:
                    data = json.loads(resp.read().decode('utf-8'))
                    text = data.get('candidates', [{}])[0].get('content', {}).get('parts', [{}])[0].get('text')
                    if text:
                        print(f"    [Generated via: {model}]", flush=True)
                        parsed = json.loads(text)
                        if isinstance(parsed, dict):
                            for v in parsed.values():
                                if isinstance(v, list):
                                    return v
                            return [parsed]
                        return parsed
            except urllib.error.HTTPError as e:
                err_str = str(e)
                try:
                    err_body = e.read().decode('utf-8')
                    err_str += f": {err_body}"
                except Exception:
                    pass
                if '429' in err_str or 'RESOURCE_EXHAUSTED' in err_str or 'Quota exceeded' in err_str:
                    print(f"    [QUOTA 429] {model} hit rate limit.", flush=True)
                    if model == 'gemini-3.5-flash-lite':
                        raise QuotaExhaustedException("gemini-3.5-flash-lite hit rate limit/quota. Stopping immediately as requested.")
                    continue
                print(f"    [{model}] {e}. Skipping to next model...", flush=True)
                continue
            except Exception as e:
                err_str = str(e)
                if '429' in err_str or 'RESOURCE_EXHAUSTED' in err_str or 'Quota exceeded' in err_str:
                    print(f"    [QUOTA 429] {model} hit rate limit.", flush=True)
                    if model == 'gemini-3.5-flash-lite':
                        raise QuotaExhaustedException("gemini-3.5-flash-lite hit rate limit/quota. Stopping immediately as requested.")
                    continue
                print(f"    [{model}] {e}. Skipping to next model...", flush=True)
                continue

        if round_idx < 3:
            print(f"    [Cascade Round {round_idx} complete] Waiting 5s before round {round_idx+1}...", flush=True)
            time.sleep(5)

    raise RuntimeError("All models in cascade failed or exhausted.")

def detect_bold_targets_for_passage(test_key, passage_num, passage_data, pdf_path, page_numbers, force=False):
    """
    Detects bold/underlined target vocabulary and pronouns for a passage using Gemini Vision.
    Reuses disk cache if available.
    """
    cache_file = os.path.join(CACHE_DIR, f"{test_key}_p{passage_num}.json")
    if not force and os.path.exists(cache_file):
        try:
            with open(cache_file, 'r', encoding='utf-8') as f:
                cached = json.load(f)
                if isinstance(cached, list):
                    print(f"    [Cache hit] Reusing cached detection ({len(cached)} targets)", flush=True)
                    return cached
        except Exception:
            pass

    images_b64 = render_pages_to_b64(pdf_path, page_numbers)
    if not images_b64:
        print(f"    [Warning] No images rendered for pages {page_numbers}", flush=True)
        return []

    # Build prompt with existing digital paragraphs and questions
    para_lines = []
    for idx, p in enumerate(passage_data['content_paragraphs']):
        clean_p = p.replace('**', '')
        para_lines.append(f"[Paragraph {idx}] {clean_p}")

    q_lines = []
    for q in passage_data['questions']:
        q_lines.append(f"- {q['id']} ({q['type']}): {q['question_text']}")
        if q.get('clue_sentence'):
            q_lines.append(f"  Clue: {q['clue_sentence'].replace('**', '')}")

    prompt = f"""You are an expert VSTEP exam data engineer analyzing authentic scanned book pages.
Below is the verified digital text of the passage:

{chr(10).join(para_lines)}

And here are the questions testing this passage:
{chr(10).join(q_lines)}

YOUR TASK:
Look carefully at the attached authentic scanned book page(s).
Identify EVERY target vocabulary word, phrase, or reference pronoun that is printed in BOLD (or BOLD/UNDERLINED) in the reading passage text itself.
Note:
- In VSTEP reading passages, vocabulary and reference questions typically test a word/phrase that is printed in bold in the text (e.g. 'a resonant hoot', 'precious charges', 'they', 'weary of', 'preeminent', 'green', 'hampered', 'Beijing', 'those men', etc.).
- If a tested pronoun like 'they' or 'it' appears multiple times in the paragraph, identify the EXACT sentence in which it appears bolded in the authentic book.
- Do NOT include passage headings or sentence insertion markers like [A], [B], [C], [D] unless printed as bold words in the text.
- Clean punctuation: do not include trailing commas, quotes, or periods inside target_phrase unless strictly part of the tested term.

Return a JSON array of objects with the schema:
[
  {{
    "target_phrase": "exact word or phrase printed in bold in the book passage",
    "paragraph_index": 0,
    "surrounding_sentence": "the full sentence in the paragraph containing this bold target",
    "question_id": "id of the question testing this target (e.g. {passage_data['questions'][0]['id']})"
  }}
]
"""
    detections = call_gemini_vision_cascade(images_b64, prompt)
    with open(cache_file, 'w', encoding='utf-8') as f:
        json.dump(detections, f, ensure_ascii=False, indent=2)

    return detections

def wrap_target_in_text(text, target):
    """
    Wraps target with **target** if not already wrapped.
    Ensures idempotency and avoids double wrapping.
    """
    if not target or len(target) < 1:
        return text

    # Already wrapped?
    if f"**{target}**" in text:
        return text

    # Escape for regex
    escaped = re.escape(target)
    # Check if surrounded by word boundaries if it's alphanumeric
    pattern = r'(?<!\*\*)(' + escaped + r')(?!\*\*)'
    if re.search(r'^\w', target) and re.search(r'\w$', target):
        pattern = r'(?<!\*\*)(?<![a-zA-Z0-9])(' + escaped + r')(?![a-zA-Z0-9])(?!\*\*)'

    def repl(m):
        return f"**{m.group(1)}**"

    new_text, count = re.subn(pattern, repl, text, count=1)
    if count > 0:
        return new_text

    # Fallback to simple first substring replacement if regex boundary missed punctuation
    idx = text.find(target)
    if idx != -1:
        # Check if already preceded or followed by **
        before = text[max(0, idx - 2):idx]
        after = text[idx + len(target):idx + len(target) + 2]
        if before == '**' and after == '**':
            return text
        return text[:idx] + f"**{target}**" + text[idx + len(target):]

    return text

def apply_3point_patch(passage_data, detections):
    """
    Applies atomic 3-point synchronization:
    1. content_paragraphs
    2. clue_sentence
    3. question_text
    Preserves paragraph.includes(q.clue_sentence) invariant.
    """
    paragraphs = list(passage_data['content_paragraphs'])
    questions = passage_data['questions']
    patches_applied = []

    for d in detections:
        target = d.get('target_phrase', '').strip().strip('*').strip()
        p_idx = d.get('paragraph_index', 0)
        surr_sent = d.get('surrounding_sentence', '').strip()
        q_id = d.get('question_id', '')

        if not target or p_idx < 0 or p_idx >= len(paragraphs):
            continue

        par = paragraphs[p_idx]
        old_par = par

        # 1. Update paragraph scoped to surrounding_sentence if possible
        if surr_sent and surr_sent in par:
            clean_surr = surr_sent.replace('**', '')
            # Find clean_surr in par if surr_sent had asterisks or vice-versa
            target_in_surr = wrap_target_in_text(surr_sent, target)
            if target_in_surr != surr_sent:
                par = par.replace(surr_sent, target_in_surr, 1)
        elif surr_sent.replace('**', '') in par:
            clean_surr = surr_sent.replace('**', '')
            target_in_surr = wrap_target_in_text(clean_surr, target)
            if target_in_surr != clean_surr:
                par = par.replace(clean_surr, target_in_surr, 1)
        else:
            # Fallback: wrap target directly in paragraph
            par = wrap_target_in_text(par, target)

        if par != old_par:
            paragraphs[p_idx] = par
            patches_applied.append({
                'type': 'content_paragraphs',
                'target': target,
                'paragraph_index': p_idx
            })

        # 2. Update clue_sentence in questions
        for q in questions:
            if q.get('clue_paragraph_index') == p_idx and q.get('clue_sentence'):
                clue = q['clue_sentence']
                # Check if old clue is missing bold wrap present in updated paragraph
                needs_sync = (clue not in paragraphs[p_idx]) or (
                    f"**{target}**" in paragraphs[p_idx] and f"**{target}**" not in clue and target in clue
                )
                if needs_sync:
                    # Try wrapping target in clue
                    wrapped_clue = wrap_target_in_text(clue, target)
                    if wrapped_clue in paragraphs[p_idx]:
                        q['clue_sentence'] = wrapped_clue
                        patches_applied.append({
                            'type': 'clue_sentence',
                            'question_id': q['id'],
                            'target': target
                        })

        # 3. Update question_text in corresponding question
        matching_q = None
        if q_id:
            for q in questions:
                if q['id'].lower() == q_id.lower() or q['id'].lower().endswith(q_id.lower()):
                    matching_q = q
                    break

        if not matching_q:
            # Match by target presence in question_text
            for q in questions:
                if q.get('clue_paragraph_index') == p_idx:
                    q_text_clean = q['question_text'].replace('**', '')
                    if re.search(r'[\"“\']' + re.escape(target) + r'[\"”\']', q_text_clean, re.IGNORECASE) or target.lower() in q_text_clean.lower():
                        matching_q = q
                        break

        if matching_q:
            q_text = matching_q['question_text']
            new_q_text = q_text
            pattern = r'([\"“\'])(' + re.escape(target) + r')([\"”\'])'
            new_q_text, c = re.subn(pattern, r'\1**\2**\3', q_text, count=1, flags=re.IGNORECASE)
            if c == 0 and f"**{target}**" not in q_text:
                m_quote = re.search(r'(?:word|phrase|term)\s+([\"“\'])(.*?)([\"”\'])', q_text, re.IGNORECASE)
                if m_quote:
                    quoted_word = m_quote.group(2)
                    if quoted_word and not quoted_word.startswith('**') and (quoted_word.lower() in target.lower() or target.lower() in quoted_word.lower()):
                        new_q_text = q_text[:m_quote.start(1)] + m_quote.group(1) + f"**{quoted_word}**" + m_quote.group(3) + q_text[m_quote.end(3):]
                        c = 1
            if c == 0 and f"**{target}**" not in q_text and not re.search(r'\*\*[^*]+\*\*', q_text):
                if re.search(r'\b' + re.escape(target) + r'\b', q_text, re.IGNORECASE):
                    new_q_text = re.sub(r'\b(' + re.escape(target) + r')\b', r'**\1**', q_text, count=1, flags=re.IGNORECASE)
            if new_q_text != q_text:
                matching_q['question_text'] = new_q_text
                patches_applied.append({
                    'type': 'question_text',
                    'question_id': matching_q['id'],
                    'target': target
                })

    passage_data['content_paragraphs'] = paragraphs
    return patches_applied

def verify_passage_clues(passage_data):
    """Asserts that all clue_sentence strings are exact verbatim substrings of their paragraphs."""
    paragraphs = passage_data['content_paragraphs']
    for q in passage_data['questions']:
        p_idx = q.get('clue_paragraph_index', 0)
        clue = q.get('clue_sentence', '')
        if p_idx < 0 or p_idx >= len(paragraphs):
            raise AssertionError(f"Question {q['id']} invalid clue_paragraph_index {p_idx}")
        par = paragraphs[p_idx]
        if clue not in par:
            raise AssertionError(
                f"Question {q['id']} clue_sentence is NOT a substring of paragraph {p_idx}!\n"
                f"Clue: {repr(clue)}\n"
                f"Paragraph: {repr(par[:120])}..."
            )

def process_test(test_key, dry_run=False, force=False, passage_filter=None):
    """Processes all 4 passages for a test."""
    cfg = TEST_REGISTRY[test_key]
    ts_file = os.path.join(PROJECT_ROOT, cfg['ts_file']) if not os.path.isabs(cfg['ts_file']) else cfg['ts_file']
    print(f"\n================ PROCESSING {cfg['name']} ({test_key}) ================", flush=True)

    with open(ts_file, 'r', encoding='utf-8') as f:
        content = f.read()

    brace_idx = content.find('{', content.find('export const'))
    semi_idx = content.rfind('};')
    if brace_idx == -1 or semi_idx == -1:
        raise ValueError(f"Could not parse JSON boundary in {ts_file}")

    prefix = content[:brace_idx]
    json_str = content[brace_idx:semi_idx + 1]
    suffix = content[semi_idx + 1:]

    test_data = json.loads(json_str)
    all_test_patches = []

    for p_idx, passage in enumerate(test_data['passages']):
        p_num = p_idx + 1
        if passage_filter and p_num != passage_filter:
            continue

        print(f"\n--- Passage {p_num}: {passage['title']} ---", flush=True)
        pages = cfg['passages'].get(p_num, [])
        detections = detect_bold_targets_for_passage(
            test_key, p_num, passage, cfg['pdf'], pages, force=force
        )
        print(f"    Detected {len(detections)} authentic bold targets from OCR.", flush=True)

        patches = apply_3point_patch(passage, detections)
        print(f"    Applied {len(patches)} atomic 3-point patches.", flush=True)
        for p in patches:
            print(f"      - [{p['type']}] {p['target']} ({p.get('question_id') or f'P{p.get('paragraph_index')}'})")

        # Verify clue invariant immediately
        verify_passage_clues(passage)
        all_test_patches.extend(patches)

    if not dry_run and all_test_patches:
        new_json_str = json.dumps(test_data, ensure_ascii=False, indent=2)
        new_content = prefix + new_json_str + suffix
        with open(ts_file, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"\n  [SUCCESS] Wrote enriched test module to {ts_file}", flush=True)
    elif dry_run:
        print(f"\n  [DRY RUN] Would write {len(all_test_patches)} patches to {ts_file}", flush=True)
    else:
        print(f"\n  [NO CHANGES] {ts_file} already enriched.", flush=True)

    return all_test_patches

def main():
    parser = argparse.ArgumentParser(description="Enrich VSTEP reading test bank with authentic bold markdown.")
    parser.add_argument('--test', type=str, help="Specific test key to process (e.g. hcmue_01, ulis_01).")
    parser.add_argument('--passage', type=int, help="Specific passage number (1..4).")
    parser.add_argument('--dry-run', action='store_true', help="Do not write changes to disk.")
    parser.add_argument('--force', action='store_true', help="Bypass OCR disk cache.")
    args = parser.parse_args()

    tests_to_run = [args.test] if args.test else list(TEST_REGISTRY.keys())
    full_log = []

    print("================ STARTING READING MARKDOWN BATCH ENRICHMENT ================")
    print(f"Total tests in scope: {len(tests_to_run)}", flush=True)

    try:
        for t_key in tests_to_run:
            if t_key not in TEST_REGISTRY:
                print(f"Error: Unknown test key {t_key}", file=sys.stderr)
                continue
            patches = process_test(t_key, dry_run=args.dry_run, force=args.force, passage_filter=args.passage)
            full_log.append({
                'test_key': t_key,
                'patches_count': len(patches),
                'patches': patches
            })
            time.sleep(1.0)

        # Write audit log
        with open(LOG_FILE, 'w', encoding='utf-8') as f:
            json.dump(full_log, f, ensure_ascii=False, indent=2)
        print(f"\nAudit log saved to {LOG_FILE}", flush=True)
        print("================ BATCH ENRICHMENT COMPLETE ================", flush=True)

    except QuotaExhaustedException as qe:
        print(f"\n!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", file=sys.stderr)
        print(f"STOPPING EXECUTION: {qe}", file=sys.stderr)
        print(f"!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", file=sys.stderr)
        # Write partial log
        with open(LOG_FILE, 'w', encoding='utf-8') as f:
            json.dump(full_log, f, ensure_ascii=False, indent=2)
        sys.exit(2)

if __name__ == '__main__':
    main()
