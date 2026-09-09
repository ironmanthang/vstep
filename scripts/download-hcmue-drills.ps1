$items = @(
    # Test 2
    @{ id = "1PyAvQiKmKRIB3ytRMPktRKB04cOR2bQH"; dest = "public/audio/listening/drills/hcmue2/hcmue-test-2-part1.mp3"; minSize = 10000000 },
    @{ id = "1UnZ_2ERI8pL-lxP2kWsMujbT6ek2VMiO"; dest = "public/audio/listening/drills/hcmue2/hcmue-test-2-part2.mp3"; minSize = 10000000 },
    @{ id = "1XoQw4c7dXv65g4YoUSx9fRkmLiK9CNTc"; dest = "public/audio/listening/drills/hcmue2/hcmue-test-2-part3.mp3"; minSize = 20000000 },
    # Test 3
    @{ id = "1CPbgz0QnmjoAmsVh-jkpH72xAbEvL_GH"; dest = "public/audio/listening/drills/hcmue3/hcmue-test-3-part1.mp3"; minSize = 10000000 },
    @{ id = "1Mu5msUTxCqM8m_6FX5y2ZqoLgws1HmOf"; dest = "public/audio/listening/drills/hcmue3/hcmue-test-3-part2.mp3"; minSize = 10000000 },
    @{ id = "1FHBjxIiXimBHajcJManonnABjz2xm8DN"; dest = "public/audio/listening/drills/hcmue3/hcmue-test-3-part3.mp3"; minSize = 20000000 },
    # Test 4
    @{ id = "1UPToxRFrRCk01jxsCWcRKd-qbKhmDHda"; dest = "public/audio/listening/drills/hcmue4/hcmue-test-4-part1.mp3"; minSize = 10000000 },
    @{ id = "1JnFxylLsDIyJWm8lUuoboVCB4D0_lzFG"; dest = "public/audio/listening/drills/hcmue4/hcmue-test-4-part2.mp3"; minSize = 10000000 },
    @{ id = "1YTl0SVUKPurK7CuXZgINhVQFIKOmhAk-"; dest = "public/audio/listening/drills/hcmue4/hcmue-test-4-part3.mp3"; minSize = 20000000 },
    # Test 5
    @{ id = "1KLqsTziZTAcco0k89P3RKThoUgY56_sg"; dest = "public/audio/listening/drills/hcmue5/hcmue-test-5-part1.mp3"; minSize = 10000000 },
    @{ id = "1h6R5MREeKMBdnTjQBKFzSKge2WKcQNpG"; dest = "public/audio/listening/drills/hcmue5/hcmue-test-5-part2.mp3"; minSize = 10000000 },
    @{ id = "12Kr5BrKl9ER3uSnZurK5tanQmZ2LpYJg"; dest = "public/audio/listening/drills/hcmue5/hcmue-test-5-part3.mp3"; minSize = 20000000 }
)

foreach ($it in $items) {
    $dest = $it.dest
    $dir = Split-Path -Parent $dest
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
    }
    
    if (Test-Path $dest) {
        $curSize = (Get-Item $dest).Length
        if ($curSize -ge $it.minSize) {
            Write-Host "[OK] $dest verified ($curSize bytes)"
            continue
        } else {
            Remove-Item $dest -Force -ErrorAction SilentlyContinue
        }
    }
    
    $url = "https://drive.usercontent.google.com/download?id=$($it.id)&export=download&confirm=t"
    Write-Host "Downloading $($it.id) -> $dest..."
    & curl.exe -L --retry 3 --retry-delay 2 -o "$dest" "$url"
    $newSize = if (Test-Path $dest) { (Get-Item $dest).Length } else { 0 }
    Write-Host "Finished $dest ($newSize bytes)"
}
