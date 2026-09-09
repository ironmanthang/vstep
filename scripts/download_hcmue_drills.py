import os
import sys
import urllib.request

AUDIO_ITEMS = [
    # Test 2
    {"id": "1PyAvQiKmKRIB3ytRMPktRKB04cOR2bQH", "dest": "public/audio/listening/drills/hcmue2/hcmue-test-2-part1.mp3"},
    {"id": "1UnZ_2ERI8pL-lxP2kWsMujbT6ek2VMiO", "dest": "public/audio/listening/drills/hcmue2/hcmue-test-2-part2.mp3"},
    {"id": "1XoQw4c7dXv65g4YoUSx9fRkmLiK9CNTc", "dest": "public/audio/listening/drills/hcmue2/hcmue-test-2-part3.mp3"},
    # Test 3
    {"id": "1CPbgz0QnmjoAmsVh-jkpH72xAbEvL_GH", "dest": "public/audio/listening/drills/hcmue3/hcmue-test-3-part1.mp3"},
    {"id": "1Mu5msUTxCqM8m_6FX5y2ZqoLgws1HmOf", "dest": "public/audio/listening/drills/hcmue3/hcmue-test-3-part2.mp3"},
    {"id": "1FHBjxIiXimBHajcJManonnABjz2xm8DN", "dest": "public/audio/listening/drills/hcmue3/hcmue-test-3-part3.mp3"},
    # Test 4
    {"id": "1UPToxRFrRCk01jxsCWcRKd-qbKhmDHda", "dest": "public/audio/listening/drills/hcmue4/hcmue-test-4-part1.mp3"},
    {"id": "1JnFxylLsDIyJWm8lUuoboVCB4D0_lzFG", "dest": "public/audio/listening/drills/hcmue4/hcmue-test-4-part2.mp3"},
    {"id": "1YTl0SVUKPurK7CuXZgINhVQFIKOmhAk-", "dest": "public/audio/listening/drills/hcmue4/hcmue-test-4-part3.mp3"},
    # Test 5
    {"id": "1KLqsTziZTAcco0k89P3RKThoUgY56_sg", "dest": "public/audio/listening/drills/hcmue5/hcmue-test-5-part1.mp3"},
    {"id": "1h6R5MREeKMBdnTjQBKFzSKge2WKcQNpG", "dest": "public/audio/listening/drills/hcmue5/hcmue-test-5-part2.mp3"},
    {"id": "12Kr5BrKl9ER3uSnZurK5tanQmZ2LpYJg", "dest": "public/audio/listening/drills/hcmue5/hcmue-test-5-part3.mp3"},
]

def download_audio_files():
    for item in AUDIO_ITEMS:
        dest = item["dest"]
        os.makedirs(os.path.dirname(dest), exist_ok=True)
        if os.path.exists(dest) and os.path.getsize(dest) > 1000000:
            print(f"[OK] Already present: {dest} ({os.path.getsize(dest)} bytes)")
            continue
        
        url = f"https://drive.usercontent.google.com/download?id={item['id']}&export=download&confirm=t"
        print(f"Downloading {item['id']} -> {dest}...")
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req) as resp, open(dest, "wb") as out:
            data = resp.read()
            out.write(data)
        size = os.path.getsize(dest)
        print(f"[SUCCESS] Downloaded {dest}: {size} bytes")

if __name__ == "__main__":
    download_audio_files()
