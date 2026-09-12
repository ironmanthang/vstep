import sys
import pypdf
import os
import io
import base64
import json
import urllib.request
import time
from dotenv import load_dotenv

sys.stdout.reconfigure(encoding='utf-8')
load_dotenv(override=True)
api_key = os.getenv('GOOGLE_API_KEY') or os.getenv('VITE_GEMINI_API_KEY')

reader = pypdf.PdfReader('scripts/7-Vstep-Tests-B1-B2-C1-Full-Key.pdf')

for p_num in [130, 131, 132, 133]:
    writer = pypdf.PdfWriter()
    writer.add_page(reader.pages[p_num - 1])
    buf = io.BytesIO()
    writer.write(buf)
    b64 = base64.b64encode(buf.getvalue()).decode('utf-8')
    url = f'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key={api_key}'
    payload = {
        'contents': [{
            'parts': [
                {'inline_data': {'mime_type': 'application/pdf', 'data': b64}},
                {'text': 'Output verbatim any Test 1 Key, Listening key, Reading key, or Writing/Speaking answers on this page.'}
            ]
        }]
    }
    req = urllib.request.Request(url, data=json.dumps(payload).encode('utf-8'), headers={'Content-Type': 'application/json'})
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            res = json.loads(resp.read().decode('utf-8'))
            print(f"=== PAGE {p_num} ===", flush=True)
            print(res['candidates'][0]['content']['parts'][0]['text'], flush=True)
    except Exception as e:
        print(f"=== PAGE {p_num} ERROR: {e} ===", flush=True)
    time.sleep(1)
