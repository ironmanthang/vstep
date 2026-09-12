import sys
import os
import io
import re
import base64
import json
import time
import urllib.request
import pypdf
from dotenv import load_dotenv

sys.stdout.reconfigure(encoding='utf-8')
load_dotenv(override=True)

api_key = os.getenv('GOOGLE_API_KEY') or os.getenv('VITE_GEMINI_API_KEY')
if not api_key:
    print("ERROR: Missing GOOGLE_API_KEY in .env", file=sys.stderr)
    sys.exit(1)

MODELS = [
    'gemini-3.8-flash',
    'gemini-3.7-flash',
    'gemini-3.6-flash',
    'gemini-3.5-flash',
    'gemini-3.5-flash-lite',
]

CACHE_DIR = 'scripts/.hcmue_pages_cache'
os.makedirs(CACHE_DIR, exist_ok=True)

TEST_PAGES = {
    1: list(range(11, 25)),   # 11 to 24 (14 pages)
    2: list(range(39, 52)),   # 39 to 51 (13 pages)
    3: list(range(65, 78)),   # 65 to 77 (13 pages)
    4: list(range(91, 105)),  # 91 to 104 (14 pages)
    5: list(range(119, 133)), # 119 to 132 (14 pages)
}

def call_single_api(model, b64_pdf, prompt):
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={api_key}"
    payload = {
        "contents": [{
            "parts": [
                {"inline_data": {"mime_type": "application/pdf", "data": b64_pdf}},
                {"text": prompt}
            ]
        }],
        "generationConfig": {
            "temperature": 0.05
        }
    }
    req = urllib.request.Request(
        url,
        data=json.dumps(payload).encode('utf-8'),
        headers={'Content-Type': 'application/json'}
    )
    with urllib.request.urlopen(req, timeout=45) as resp:
        return json.loads(resp.read().decode('utf-8'))

def call_gemini_ocr(b64_pdf, page_num):
    cache_file = os.path.join(CACHE_DIR, f"page_{page_num:03d}.json")
    if os.path.exists(cache_file):
        try:
            with open(cache_file, 'r', encoding='utf-8') as f:
                data = json.load(f)
                if data.get('text') and len(data['text']) > 50:
                    print(f"  [Cache hit] Page {page_num} ({len(data['text'])} chars)", flush=True)
                    return data['text']
        except Exception:
            pass

    normal_prompt = (
        "Transcribe all text on this page with 100% verbatim accuracy. "
        "Preserve all passage text, paragraph breaks, headers (e.g. PASSAGE 1, PASSAGE 2), "
        "question numbers (e.g. 1. 2. 3. ...), question prompts, options (A. B. C. D. or [A] [B] [C] [D]), "
        "and inline sentence insertion tokens [A], [B], [C], [D]. "
        "Do NOT summarize, truncate, or omit anything."
    )

    indexed_prompt = (
        "Transcribe every line on this page with 100% verbatim accuracy. "
        "Prefix each line with an index token like [1], [2], [3]... to preserve line layout. "
        "Preserve all passage text, questions, options, and [A][B][C][D] tokens."
    )

    # 15 rounds of cascade attempts with sliding window backoff
    for round_idx in range(15):
        for model in MODELS:
            try:
                res_data = call_single_api(model, b64_pdf, normal_prompt)
                candidate = res_data.get('candidates', [{}])[0]
                
                # Check for recitation filter
                if candidate.get('finishReason') == 'RECITATION':
                    print(f"  [RECITATION filter on p.{page_num} with {model}] Retrying with line indexing...", flush=True)
                    res_data = call_single_api(model, b64_pdf, indexed_prompt)
                    candidate = res_data.get('candidates', [{}])[0]

                parts = candidate.get('content', {}).get('parts', [])
                if parts and 'text' in parts[0]:
                    raw_text = parts[0]['text']
                    # Clean any line index markers if applied
                    clean_text = re.sub(r'\[\d+\]\s*', '', raw_text)
                    print(f"  [Model: {model}] Page {page_num} extracted ({len(clean_text)} chars)", flush=True)
                    # Cache to disk
                    with open(cache_file, 'w', encoding='utf-8') as f:
                        json.dump({'page': page_num, 'model': model, 'text': clean_text}, f, ensure_ascii=False, indent=2)
                    return clean_text

            except Exception as e:
                err_str = str(e)
                if '429' in err_str or 'RESOURCE_EXHAUSTED' in err_str:
                    continue
                time.sleep(2)

        wait_sec = 15
        print(f"  [Quota 429 on all models for p.{page_num}] Waiting {wait_sec}s for sliding window reset (Round {round_idx+1}/15)...", file=sys.stderr, flush=True)
        time.sleep(wait_sec)

    raise RuntimeError(f"All models and retries exhausted for page {page_num}")

def extract_test(pdf_path, test_num):
    pages = TEST_PAGES[test_num]
    out_file = f"scripts/hcmue_reading_test_{test_num:02d}_raw.json"
    print(f"\n================ EXTRACTING HCMUE TEST {test_num} (Pages {pages[0]}–{pages[-1]}) ================", flush=True)
    
    reader = pypdf.PdfReader(pdf_path)
    test_results = {}

    for p in pages:
        writer = pypdf.PdfWriter()
        writer.add_page(reader.pages[p - 1])
        buf = io.BytesIO()
        writer.write(buf)
        b64 = base64.b64encode(buf.getvalue()).decode('utf-8')

        extracted = call_gemini_ocr(b64, p)
        test_results[str(p)] = extracted
        time.sleep(2.0)

    with open(out_file, 'w', encoding='utf-8') as f:
        json.dump(test_results, f, ensure_ascii=False, indent=2)
    print(f"Successfully saved {out_file} ({len(test_results)} pages)", flush=True)
    return test_results

if __name__ == '__main__':
    pdf = 'scripts/vstep-collection-20-mock-tests.pdf'
    tests_to_run = [int(x) for x in sys.argv[1:]] if len(sys.argv) > 1 else [1, 2, 3, 4, 5]
    for t in tests_to_run:
        extract_test(pdf, t)
    print("\nAll requested HCMUE reading tests extracted successfully!", flush=True)
