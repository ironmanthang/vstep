import sys
import os
import io
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

def call_gemini(b64_pdf, prompt):
    for model in MODELS:
        for attempt in range(4):
            try:
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
                    data = json.loads(resp.read().decode('utf-8'))
                    text = data['candidates'][0]['content']['parts'][0]['text']
                    print(f"  [Model: {model}]", flush=True)
                    return text
            except Exception as e:
                err_str = str(e)
                if '429' in err_str and ('RESOURCE_EXHAUSTED' in err_str or 'Quota exceeded' in err_str):
                    print(f"  [QUOTA EXHAUSTED] {model} daily limit. Skipping...", file=sys.stderr, flush=True)
                    break
                wait_sec = (attempt + 1) * 3
                print(f"  [RETRY {attempt+1}] {model}: {err_str}. Waiting {wait_sec}s...", file=sys.stderr, flush=True)
                time.sleep(wait_sec)
    raise RuntimeError("All models and retries exhausted.")

def extract_pages(pdf_path, start_page, end_page, prompt, output_file=None):
    reader = pypdf.PdfReader(pdf_path)
    total_pages = len(reader.pages)
    print(f"Reading {pdf_path} (Total pages: {total_pages})", flush=True)

    results = {}
    for p_num in range(start_page, end_page + 1):
        if p_num > total_pages:
            break
        print(f"--- Processing Page {p_num} ---", flush=True)
        writer = pypdf.PdfWriter()
        writer.add_page(reader.pages[p_num - 1])
        buf = io.BytesIO()
        writer.write(buf)
        b64 = base64.b64encode(buf.getvalue()).decode('utf-8')

        extracted = call_gemini(b64, prompt)
        results[p_num] = extracted
        print(f"Page {p_num} extracted ({len(extracted)} chars)", flush=True)
        time.sleep(1.5)  # Rate-limit buffer

    if output_file:
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(results, f, ensure_ascii=False, indent=2)
        print(f"Saved results to {output_file}", flush=True)

    return results

if __name__ == '__main__':
    if len(sys.argv) < 4:
        print("Usage: python scripts/extract_pdf_pages.py <pdf_path> <start_page> <end_page> [output_json]")
        sys.exit(1)
    
    pdf_file = sys.argv[1]
    start_p = int(sys.argv[2])
    end_p = int(sys.argv[3])
    out_f = sys.argv[4] if len(sys.argv) > 4 else None

    extract_pages(
        pdf_file,
        start_p,
        end_p,
        "Transcribe all text on this page with 100% verbatim accuracy. Preserve all headers, question numbers, options [A][B][C][D], paragraph breaks, and formatting.",
        out_f
    )
