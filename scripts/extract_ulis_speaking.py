#!/usr/bin/env python3
"""
Authentic ULIS Speaking Tests 01-07 Extractor
Extracts speaking prompts and official sample answers from '7-Vstep-Tests-B1-B2-C1-Full-Key.pdf'
"""
import sys
import os
import io
import base64
import json
import urllib.request
import time
import pypdf
from dotenv import load_dotenv

if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')

load_dotenv(override=True)

api_key = os.getenv('GOOGLE_API_KEY') or os.getenv('VITE_GEMINI_API_KEY')
if not api_key:
    print("ERROR: Missing GOOGLE_API_KEY in .env", file=sys.stderr, flush=True)
    sys.exit(1)

MODELS = [
    'gemini-3.8-flash',
    'gemini-3.7-flash',
    'gemini-3.6-flash',
    'gemini-3.5-flash',
    'gemini-3.5-flash-lite',
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
        if p <= len(reader.pages):
            writer.add_page(reader.pages[p - 1])
    buf = io.BytesIO()
    writer.write(buf)
    return base64.b64encode(buf.getvalue()).decode('utf-8')

def safe_json_loads(text):
    import re
    text = text.strip()
    try:
        return json.loads(text)
    except Exception:
        # Match largest JSON block
        m = re.search(r'\{[\s\S]*\}', text)
        if m:
            clean = m.group(0)
            # Remove trailing commas before } or ]
            clean = re.sub(r',\s*([\}\]])', r'\1', clean)
            return json.loads(clean)
        raise

def main():
    pdf_path = 'scripts/7-Vstep-Tests-B1-B2-C1-Full-Key.pdf'
    reader = pypdf.PdfReader(pdf_path)

    tests_config = [
        {"test_num": 1, "prompt_page": 19, "key_pages": [134, 135]},
        {"test_num": 2, "prompt_page": 33, "key_pages": [138, 139]},
        {"test_num": 3, "prompt_page": 45, "key_pages": [143, 144]},
        {"test_num": 4, "prompt_page": 57, "key_pages": [147, 148]},
        {"test_num": 5, "prompt_page": 70, "key_pages": [152, 153]},
        {"test_num": 6, "prompt_page": 84, "key_pages": [157, 158]},
        {"test_num": 7, "prompt_page": 97, "key_pages": [161, 162]},
    ]

    all_tests = {}

    for cfg in tests_config:
        t_num = cfg["test_num"]
        p_page = cfg["prompt_page"]
        k_pages = cfg["key_pages"]
        cache_file = f"scripts/ulis_speaking_test_{t_num:02d}.json"

        if os.path.exists(cache_file):
            with open(cache_file, "r", encoding="utf-8") as f:
                all_tests[t_num] = json.load(f)
            print(f"Loaded Test {t_num} from disk cache.", flush=True)
            continue

        print(f"\n================ SPEAKING TEST {t_num} ================", flush=True)

        # Step 1: Extract Prompts
        print(f"Extracting speaking prompts from page {p_page}...", flush=True)
        prompt_b64 = get_page_b64(reader, p_page)
        prompt_extract_req = """Extract the complete VSTEP Speaking test on this page into clean JSON adhering to this exact schema:
{
  "id": "ulis_spk_test_01",
  "test_number": 1,
  "title": "ULIS Authentic VSTEP Speaking Test 01",
  "part1": {
    "title": "Social Interaction",
    "duration_minutes": 3,
    "topics": [
      {
        "topic_name": "Topic 1 Name in English",
        "topic_name_vi": "Tên chủ đề bằng tiếng Việt",
        "questions": [
          "Question 1?",
          "Question 2?",
          "Question 3?"
        ]
      },
      {
        "topic_name": "Topic 2 Name in English",
        "topic_name_vi": "Tên chủ đề bằng tiếng Việt",
        "questions": [
          "Question 1?",
          "Question 2?",
          "Question 3?"
        ]
      }
    ]
  },
  "part2": {
    "title": "Solution Discussion",
    "duration_minutes": 4,
    "situation": "Full situation description verbatim from page",
    "options": [
      {
        "key": "Option 1",
        "title": "Title of Option 1",
        "description": "Brief description"
      },
      {
        "key": "Option 2",
        "title": "Title of Option 2",
        "description": "Brief description"
      },
      {
        "key": "Option 3",
        "title": "Title of Option 3",
        "description": "Brief description"
      }
    ]
  },
  "part3": {
    "title": "Topic Development",
    "duration_minutes": 5,
    "topic": "Central topic statement verbatim",
    "mindmap_ideas": [
      "Idea 1",
      "Idea 2",
      "Idea 3"
    ],
    "follow_up_questions": [
      "Follow-up question 1?",
      "Follow-up question 2?"
    ]
  }
}
Transcribe accurately with 100% fidelity to the authentic test page. Return valid JSON only."""
        prompts_json_text = call_gemini(prompt_b64, prompt_extract_req, is_json=True)
        test_data = safe_json_loads(prompts_json_text)
        test_data["id"] = f"ulis_spk_test_{t_num:02d}"
        test_data["test_number"] = t_num
        test_data["title"] = f"ULIS Authentic VSTEP Speaking Test {t_num:02d}"
        time.sleep(2)

        # Step 2: Extract official sample answers
        print(f"Extracting official sample answers from key pages {k_pages}...", flush=True)
        key_b64 = get_multi_page_b64(reader, k_pages)
        key_extract_req = f"""Examine these answer key pages for VSTEP TEST {t_num}.
Find the official sample answers provided for SPEAKING Part 1, Part 2, and Part 3.
Extract into JSON:
{{
  "part1_sample": {{
    "band": "B1",
    "text": "Verbatim text of the sample answers given for the Part 1 questions",
    "analysis_vi": "Phân tích ngắn gọn vì sao câu trả lời đạt chuẩn B1 (1-2 câu)"
  }},
  "part2_sample": {{
    "band": "B1",
    "text": "Verbatim text of the sample response for Part 2 Solution Discussion",
    "analysis_vi": "Phân tích ngắn gọn cấu trúc B1 (chọn 1 phương án, đưa 2 lý do, phản biện 2 phương án còn lại)"
  }},
  "part3_sample": {{
    "band": "B1",
    "text": "Verbatim text of the sample response for Part 3 Topic Development",
    "analysis_vi": "Phân tích ngắn gọn cách phát triển chủ đề theo 3 nhánh ý"
  }}
}}
If any part does not have an explicit sample in the key pages, provide a concise authentic B1 model answer based strictly on the questions. Return valid JSON only."""
        keys_json_text = call_gemini(key_b64, key_extract_req, is_json=True)
        keys_data = safe_json_loads(keys_json_text)

        if "part1_sample" in keys_data and keys_data["part1_sample"].get("text"):
            test_data["part1"]["sample_response"] = keys_data["part1_sample"]
        if "part2_sample" in keys_data and keys_data["part2_sample"].get("text"):
            test_data["part2"]["sample_response"] = keys_data["part2_sample"]
        if "part3_sample" in keys_data and keys_data["part3_sample"].get("text"):
            test_data["part3"]["sample_response"] = keys_data["part3_sample"]

        with open(cache_file, "w", encoding="utf-8") as f:
            json.dump(test_data, f, ensure_ascii=False, indent=2)
        print(f"Saved Test {t_num} to {cache_file}", flush=True)
        all_tests[t_num] = test_data
        time.sleep(2)

    with open("scripts/ulis_speaking_full_raw.json", "w", encoding="utf-8") as f:
        json.dump(all_tests, f, ensure_ascii=False, indent=2)
    print("\n[SUCCESS] Extracted all 7 ULIS Speaking Tests successfully!", flush=True)

if __name__ == "__main__":
    main()
