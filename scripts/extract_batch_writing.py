import sys
import os
import io
import base64
import json
import urllib.request
import time
import pypdf
from dotenv import load_dotenv

sys.stdout.reconfigure(encoding='utf-8')
load_dotenv(override=True)

api_key = os.getenv('GOOGLE_API_KEY') or os.getenv('VITE_GEMINI_API_KEY')
if not api_key:
    print("ERROR: Missing GOOGLE_API_KEY in .env", file=sys.stderr, flush=True)
    sys.exit(1)

MODELS = [
    'gemini-3.5-flash-lite',
    'gemini-3.5-flash',
    'gemini-3.6-flash',
    'gemini-3.7-flash',
    'gemini-3.8-flash',
]

def call_gemini_json(b64_pdf, prompt):
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
                        "temperature": 0.05,
                        "response_mime_type": "application/json"
                    }
                }
                req = urllib.request.Request(
                    url,
                    data=json.dumps(payload).encode('utf-8'),
                    headers={'Content-Type': 'application/json'}
                )
                with urllib.request.urlopen(req, timeout=40) as resp:
                    data = json.loads(resp.read().decode('utf-8'))
                    text = data['candidates'][0]['content']['parts'][0]['text']
                    return json.loads(text)
            except Exception as e:
                err_str = str(e)
                if '429' in err_str:
                    wait_sec = (attempt + 1) * 3
                    print(f"  [429 on {model}, attempt {attempt+1}] waiting {wait_sec}s...", file=sys.stderr, flush=True)
                    time.sleep(wait_sec)
                    continue
                time.sleep(2)
    raise RuntimeError("All models exhausted.")

def get_page_b64(reader, page_num):
    writer = pypdf.PdfWriter()
    writer.add_page(reader.pages[page_num - 1])
    buf = io.BytesIO()
    writer.write(buf)
    return base64.b64encode(buf.getvalue()).decode('utf-8')

def normalize_sample(sample):
    if isinstance(sample, list):
        b1_item = next((x for x in sample if isinstance(x, dict) and x.get('band') == 'B1'), None)
        if not b1_item:
            b1_item = next((x for x in sample if isinstance(x, dict) and 'B2' in str(x.get('band', ''))), None)
        if not b1_item and len(sample) > 0 and isinstance(sample[0], dict):
            b1_item = sample[0]
        return b1_item or {"band": "B1", "text": "", "analysis_vi": ""}
    if isinstance(sample, dict):
        return sample
    return {"band": "B1", "text": "", "analysis_vi": ""}

def main():
    pdf_path = 'scripts/7-Vstep-Tests-B1-B2-C1-Full-Key.pdf'
    reader = pypdf.PdfReader(pdf_path)

    test_mappings = [
        {"test_num": 1, "prompt_page": 18, "t1_page": 131, "t2_page": 133},
        {"test_num": 2, "prompt_page": 32, "t1_page": 136, "t2_page": 138},
        {"test_num": 3, "prompt_page": 44, "t1_page": 140, "t2_page": 143},
        {"test_num": 4, "prompt_page": 56, "t1_page": 145, "t2_page": 147},
        {"test_num": 5, "prompt_page": 69, "t1_page": 149, "t2_page": 152},
        {"test_num": 6, "prompt_page": 83, "t1_page": 154, "t2_page": 157},
        {"test_num": 7, "prompt_page": 96, "t1_page": 159, "t2_page": 161},
    ]

    all_tests = {}

    for item in test_mappings:
        t_num = item["test_num"]
        p_page = item["prompt_page"]
        t1_page = item["t1_page"]
        t2_page = item["t2_page"]
        cache_file = f"scripts/ulis_writing_test_{t_num:02d}.json"

        if os.path.exists(cache_file):
            with open(cache_file, "r", encoding="utf-8") as f:
                all_tests[t_num] = json.load(f)
            print(f"Test {t_num} loaded from {cache_file}", flush=True)
            continue

        print(f"\n--- Extracting Test {t_num} ---", flush=True)

        # 1. Extract Prompts
        prompt_b64 = get_page_b64(reader, p_page)
        prompt_req = """Extract the VSTEP Writing section from this page into clean JSON:
{
  "task1": {
    "title": "Concise descriptive title of Task 1",
    "prompt_text": "Verbatim full text of Task 1 prompt including bullet points and instructions",
    "context_info": "e.g. Informal Letter, Formal Letter, Email to a Friend"
  },
  "task2": {
    "title": "Concise descriptive title of Task 2 topic",
    "prompt_text": "Verbatim full text of Task 2 statement, question, and instructions",
    "context_info": "e.g. Opinion Essay, Discussion Essay, Advantages and Disadvantages"
  }
}"""
        prompts = call_gemini_json(prompt_b64, prompt_req)
        print(f"  Prompts: T1='{prompts['task1']['title']}', T2='{prompts['task2']['title']}'", flush=True)
        time.sleep(1.5)

        # 2. Extract Task 1 Sample Answer
        t1_b64 = get_page_b64(reader, t1_page)
        t1_req = """Extract the official Writing Task 1 sample answer (prefer Band B1 or B2) from this page into JSON:
{
  "band": "B1",
  "text": "Verbatim sample letter/email text",
  "analysis_vi": "1-2 sentence Vietnamese explanation of why this meets B1 criteria"
}"""
        raw_t1_sample = call_gemini_json(t1_b64, t1_req)
        t1_sample = normalize_sample(raw_t1_sample)
        print(f"  T1 Sample extracted ({len(t1_sample.get('text', ''))} chars)", flush=True)
        time.sleep(1.5)

        # 3. Extract Task 2 Sample Answer
        t2_b64 = get_page_b64(reader, t2_page)
        t2_req = """Extract the official Writing Task 2 sample answer (prefer Band B1 or B2) from this page into JSON:
{
  "band": "B1",
  "text": "Verbatim sample essay text",
  "analysis_vi": "1-2 sentence Vietnamese explanation of why this meets B1 criteria"
}"""
        raw_t2_sample = call_gemini_json(t2_b64, t2_req)
        t2_sample = normalize_sample(raw_t2_sample)
        print(f"  T2 Sample extracted ({len(t2_sample.get('text', ''))} chars)", flush=True)
        time.sleep(1.5)

        test_data = {
            "test_number": t_num,
            "task1": {
                "id": f"ulis_writing_test_{t_num:02d}_t1",
                "task_type": "task1_letter",
                "title": prompts["task1"]["title"],
                "time_allowed_minutes": 20,
                "min_words": 120,
                "prompt_text": prompts["task1"]["prompt_text"],
                "context_info": prompts["task1"]["context_info"],
                "sample_response": t1_sample
            },
            "task2": {
                "id": f"ulis_writing_test_{t_num:02d}_t2",
                "task_type": "task2_essay",
                "title": prompts["task2"]["title"],
                "time_allowed_minutes": 40,
                "min_words": 250,
                "prompt_text": prompts["task2"]["prompt_text"],
                "context_info": prompts["task2"]["context_info"],
                "sample_response": t2_sample
            }
        }

        with open(cache_file, "w", encoding="utf-8") as f:
            json.dump(test_data, f, ensure_ascii=False, indent=2)
        print(f"  Saved {cache_file}", flush=True)
        all_tests[t_num] = test_data

    # Final combined save
    combined_path = "scripts/ulis_writing_full_raw.json"
    with open(combined_path, "w", encoding="utf-8") as f:
        json.dump(all_tests, f, ensure_ascii=False, indent=2)
    print(f"\nAll {len(all_tests)} tests successfully compiled to {combined_path}!", flush=True)

if __name__ == "__main__":
    main()
