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
    print("ERROR: Missing GOOGLE_API_KEY / VITE_GEMINI_API_KEY in .env", file=sys.stderr)
    sys.exit(1)

MODELS = [
    'gemini-3.8-flash',
    'gemini-3.7-flash',
    'gemini-3.6-flash',
    'gemini-3.5-flash',
    'gemini-3.5-flash-lite',
]

CACHE_DIR = os.path.join('scripts', '.hcmue_productive_cache')
os.makedirs(CACHE_DIR, exist_ok=True)

TEST_PAGES = {
    1: {
        'writing_prompt': [25, 26],
        'speaking_prompt': [27, 28],
        'answer_key': [146, 147, 148, 149, 150],
    },
    2: {
        'writing_prompt': [52, 53],
        'speaking_prompt': [54, 55],
        'answer_key': [158, 159, 160, 161, 162],
    },
    3: {
        'writing_prompt': [78, 79],
        'speaking_prompt': [80, 81],
        'answer_key': [168, 169, 170, 171],
    },
    4: {
        'writing_prompt': [105, 106],
        'speaking_prompt': [107, 108],
        'answer_key': [178, 179, 180, 181],
    },
    5: {
        'writing_prompt': [133, 134],
        'speaking_prompt': [135, 136],
        'answer_key': [189, 190, 191, 192, 193, 194, 195, 196],
    },
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

def ocr_page(reader, page_num):
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

    writer = pypdf.PdfWriter()
    writer.add_page(reader.pages[page_num - 1])
    buf = io.BytesIO()
    writer.write(buf)
    b64_pdf = base64.b64encode(buf.getvalue()).decode('utf-8')

    prompt = (
        "Transcribe all text on this page with 100% verbatim accuracy. "
        "Preserve all headers, task instructions, prompt texts, letters, essays, questions, options, "
        "suggested ideas, sample responses, and bullet points. "
        "Do NOT summarize, truncate, or omit anything."
    )

    for round_idx in range(15):
        for model in MODELS:
            try:
                res_data = call_single_api(model, b64_pdf, prompt)
                candidate = res_data.get('candidates', [{}])[0]
                parts = candidate.get('content', {}).get('parts', [])
                if parts and 'text' in parts[0]:
                    clean_text = parts[0]['text']
                    print(f"  [Model: {model}] Page {page_num} extracted ({len(clean_text)} chars)", flush=True)
                    with open(cache_file, 'w', encoding='utf-8') as f:
                        json.dump({'page': page_num, 'model': model, 'text': clean_text}, f, ensure_ascii=False, indent=2)
                    return clean_text
            except Exception as e:
                err_str = str(e)
                if '404' in err_str:
                    continue
                if '429' in err_str or 'RESOURCE_EXHAUSTED' in err_str:
                    continue
                time.sleep(1)

        wait_sec = 15
        print(f"  [Quota 429 on all models for p.{page_num}] Waiting {wait_sec}s for reset (Round {round_idx+1}/15)...", file=sys.stderr, flush=True)
        time.sleep(wait_sec)

    raise RuntimeError(f"All models and retries exhausted for page {page_num}")

def run_extraction(pdf_path, tests_to_run):
    reader = pypdf.PdfReader(pdf_path)
    for test_num in tests_to_run:
        cfg = TEST_PAGES[test_num]
        all_pages = cfg['writing_prompt'] + cfg['speaking_prompt'] + cfg['answer_key']
        print(f"\n================ EXTRACTING HCMUE PRODUCTIVE TEST {test_num} (Pages: {all_pages}) ================", flush=True)
        
        test_out = {
            'test_number': test_num,
            'writing_prompt_pages': {},
            'speaking_prompt_pages': {},
            'answer_key_pages': {},
        }

        for p in cfg['writing_prompt']:
            test_out['writing_prompt_pages'][str(p)] = ocr_page(reader, p)
            time.sleep(2.0)

        for p in cfg['speaking_prompt']:
            test_out['speaking_prompt_pages'][str(p)] = ocr_page(reader, p)
            time.sleep(2.0)

        for p in cfg['answer_key']:
            test_out['answer_key_pages'][str(p)] = ocr_page(reader, p)
            time.sleep(2.0)

        raw_file = os.path.join('scripts', f"hcmue_productive_test_{test_num:02d}_raw.json")
        with open(raw_file, 'w', encoding='utf-8') as f:
            json.dump(test_out, f, ensure_ascii=False, indent=2)
        print(f"Saved {raw_file}", flush=True)

if __name__ == '__main__':
    pdf_path = os.path.join('scripts', 'vstep-collection-20-mock-tests.pdf')
    tests = [int(x) for x in sys.argv[1:]] if len(sys.argv) > 1 else [1, 2, 3, 4, 5]
    run_extraction(pdf_path, tests)
    print("\nExtraction complete for all requested tests!", flush=True)
