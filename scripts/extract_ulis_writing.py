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

def call_gemini(b64_pdf, prompt, is_json=False):
    for model in MODELS:
        for attempt in range(4):
            try:
                url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={api_key}"
                gen_config = {"temperature": 0.05}
                if is_json:
                    gen_config["response_mime_type"] = "application/json"
                payload = {
                    "contents": [{
                        "parts": [
                            {"inline_data": {"mime_type": "application/pdf", "data": b64_pdf}},
                            {"text": prompt}
                        ]
                    }],
                    "generationConfig": gen_config
                }
                req = urllib.request.Request(
                    url,
                    data=json.dumps(payload).encode('utf-8'),
                    headers={'Content-Type': 'application/json'}
                )
                with urllib.request.urlopen(req, timeout=45) as resp:
                    data = json.loads(resp.read().decode('utf-8'))
                    return data['candidates'][0]['content']['parts'][0]['text']
            except Exception as e:
                err_str = str(e)
                if '429' in err_str:
                    wait_sec = (attempt + 1) * 4
                    print(f"  [429 Quota on {model} attempt {attempt+1}] Backing off {wait_sec}s...", file=sys.stderr, flush=True)
                    time.sleep(wait_sec)
                    continue
                time.sleep(2)
    raise RuntimeError("All models and retries failed.")

def get_page_b64(reader, page_num):
    writer = pypdf.PdfWriter()
    writer.add_page(reader.pages[page_num - 1])
    buf = io.BytesIO()
    writer.write(buf)
    return base64.b64encode(buf.getvalue()).decode('utf-8')

def get_multi_page_b64(reader, page_nums):
    writer = pypdf.PdfWriter()
    for p in page_nums:
        writer.add_page(reader.pages[p - 1])
    buf = io.BytesIO()
    writer.write(buf)
    return base64.b64encode(buf.getvalue()).decode('utf-8')

def main():
    pdf_path = 'scripts/7-Vstep-Tests-B1-B2-C1-Full-Key.pdf'
    reader = pypdf.PdfReader(pdf_path)

    tests_config = [
        {"test_num": 1, "prompt_page": 18, "key_pages": [131, 132, 133, 134]},
        {"test_num": 2, "prompt_page": 32, "key_pages": [136, 137, 138, 139]},
        {"test_num": 3, "prompt_page": 44, "key_pages": [140, 141, 142, 143, 144]},
        {"test_num": 4, "prompt_page": 56, "key_pages": [145, 146, 147, 148]},
        {"test_num": 5, "prompt_page": 69, "key_pages": [149, 150, 151, 152, 153]},
        {"test_num": 6, "prompt_page": 83, "key_pages": [154, 155, 156, 157, 158]},
        {"test_num": 7, "prompt_page": 96, "key_pages": [159, 160, 161, 162]},
    ]

    all_tests = {}

    for cfg in tests_config:
        t_num = cfg["test_num"]
        p_page = cfg["prompt_page"]
        k_pages = cfg["key_pages"]
        cache_file = f"scripts/ulis_writing_test_{t_num:02d}.json"

        if os.path.exists(cache_file):
            with open(cache_file, "r", encoding="utf-8") as f:
                all_tests[t_num] = json.load(f)
            print(f"Loaded Test {t_num} from disk cache.", flush=True)
            continue

        print(f"\n================ TEST {t_num} ================", flush=True)

        # Step 1: Extract Prompts
        print(f"Extracting prompts from page {p_page}...", flush=True)
        prompt_b64 = get_page_b64(reader, p_page)
        prompt_extract_req = """Extract the VSTEP Writing section from this page into clean JSON format:
{
  "task1": {
    "title": "Concise descriptive title of Task 1",
    "prompt_text": "Verbatim full text of Task 1 prompt including bullet points and instructions",
    "context_info": "e.g. Informal Letter, Formal Letter, Email to a Friend, etc."
  },
  "task2": {
    "title": "Concise descriptive title of Task 2 topic",
    "prompt_text": "Verbatim full text of Task 2 statement, question, and instructions",
    "context_info": "e.g. Opinion Essay, Discussion Essay, Advantages and Disadvantages"
  }
}
Return valid JSON only."""
        prompts_json_text = call_gemini(prompt_b64, prompt_extract_req, is_json=True)
        prompts_data = json.loads(prompts_json_text)
        print(f"Task 1: {prompts_data['task1']['title']}", flush=True)
        print(f"Task 2: {prompts_data['task2']['title']}", flush=True)
        time.sleep(3)

        # Step 2: Extract B1 and B2 sample answers from key pages
        print(f"Extracting sample answers from key pages {k_pages}...", flush=True)
        key_b64 = get_multi_page_b64(reader, k_pages)
        key_extract_req = f"""Examine these answer key pages for VSTEP TEST {t_num}.
Find the official sample answers provided for WRITING TASK 1 and WRITING TASK 2.
The book typically provides sample answers labeled B1, B2, or C1.
Extract into JSON:
{{
  "task1_sample": {{
    "band": "B1",
    "text": "Verbatim text of the B1 sample letter/email (if no B1 explicitly labeled, use the lowest available band e.g. B2)",
    "analysis_vi": "Short 1-2 sentence Vietnamese explanation of why this sample meets B1 criteria (clear greeting, all 3 points addressed, simple/compound sentences)"
  }},
  "task2_sample": {{
    "band": "B1",
    "text": "Verbatim text of the B1 sample essay (if no B1 explicitly labeled, use B2)",
    "analysis_vi": "Short 1-2 sentence Vietnamese explanation of why this sample meets B1 criteria (clear 4 paragraphs, thesis stated, basic connectors)"
  }}
}}
Return valid JSON only."""
        keys_json_text = call_gemini(key_b64, key_extract_req, is_json=True)
        keys_data = json.loads(keys_json_text)
        print(f"Task 1 Sample extracted ({len(keys_data.get('task1_sample', {}).get('text', ''))} chars)", flush=True)
        print(f"Task 2 Sample extracted ({len(keys_data.get('task2_sample', {}).get('text', ''))} chars)", flush=True)
        time.sleep(3)

        test_data = {
            "test_number": t_num,
            "task1": {
                "id": f"ulis_writing_test_{t_num:02d}_t1",
                "task_type": "task1_letter",
                "title": prompts_data["task1"]["title"],
                "time_allowed_minutes": 20,
                "min_words": 120,
                "prompt_text": prompts_data["task1"]["prompt_text"],
                "context_info": prompts_data["task1"]["context_info"],
                "sample_response": keys_data.get("task1_sample", {
                    "band": "B1",
                    "text": "",
                    "analysis_vi": ""
                })
            },
            "task2": {
                "id": f"ulis_writing_test_{t_num:02d}_t2",
                "task_type": "task2_essay",
                "title": prompts_data["task2"]["title"],
                "time_allowed_minutes": 40,
                "min_words": 250,
                "prompt_text": prompts_data["task2"]["prompt_text"],
                "context_info": prompts_data["task2"]["context_info"],
                "sample_response": keys_data.get("task2_sample", {
                    "band": "B1",
                    "text": "",
                    "analysis_vi": ""
                })
            }
        }

        with open(cache_file, "w", encoding="utf-8") as f:
            json.dump(test_data, f, ensure_ascii=False, indent=2)
        print(f"Saved {cache_file} to disk cache.", flush=True)
        all_tests[t_num] = test_data

    output_path = "scripts/ulis_writing_full_raw.json"
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(all_tests, f, ensure_ascii=False, indent=2)
    print(f"\nAll 7 tests successfully compiled to {output_path}!", flush=True)

if __name__ == "__main__":
    main()
