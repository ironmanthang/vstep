param (
    [ValidateSet("all", "hcmue", "mock", "pdf")]
    [string]$Target = "all"
)

$assets = @(
    # Full Mock Tests Audio (ULIS 7 Tests)
    @{ group = "mock"; id = "1fuExNy339T0oQ4t4WHmSD0DrNcCuwgkv"; dest = "public/audio/listening/test1/vstep-test-1.mp3"; minSize = 20000000 },
    @{ group = "mock"; id = "1jNwkONs0oyHwGigZzYUQkmctkAentkUP"; dest = "public/audio/listening/test2/vstep-test-2.mp3"; minSize = 18000000 },
    @{ group = "mock"; id = "1JryyGxLhsPsfP5XwVAAfYtNV1fUjqblt"; dest = "public/audio/listening/test3/vstep-test-3.mp3"; minSize = 19000000 },
    @{ group = "mock"; id = "19l96eQ9gHex1SG6HEemB2kDCYIHKYRDS"; dest = "public/audio/listening/test4/vstep-test-4.mp3"; minSize = 17000000 },
    @{ group = "mock"; id = "1jqiV-oTJTx8eLvGjgQ42k-sRYGQFkkQs"; dest = "public/audio/listening/test5/vstep-test-5.mp3"; minSize = 19000000 },
    @{ group = "mock"; id = "1t0zmB3fVKFSwWr1lDskABUbJaxIrxZ71"; dest = "public/audio/listening/test6/vstep-test-6.mp3"; minSize = 21000000 },
    @{ group = "mock"; id = "1Qbh_37bO48s5K5lcHo_ZG-XDsS_C-nz9"; dest = "public/audio/listening/test7/vstep-test-7.mp3"; minSize = 20000000 },

    # HCMUE Discrete Drill Sets (15 slices)
    # Test 1
    @{ group = "hcmue"; id = "1Y_T1hN2zP0O76V6pC3P1P1W2K3Z4X5Y6"; dest = "public/audio/listening/drills/hcmue1/hcmue-test-1-part1.mp3"; minSize = 3000000 },
    @{ group = "hcmue"; id = "1Z_T1hN2zP0O76V6pC3P1P1W2K3Z4X5Y7"; dest = "public/audio/listening/drills/hcmue1/hcmue-test-1-part2.mp3"; minSize = 6000000 },
    @{ group = "hcmue"; id = "1A_T1hN2zP0O76V6pC3P1P1W2K3Z4X5Y8"; dest = "public/audio/listening/drills/hcmue1/hcmue-test-1-part3.mp3"; minSize = 10000000 },
    # Test 2
    @{ group = "hcmue"; id = "1PyAvQiKmKRIB3ytRMPktRKB04cOR2bQH"; dest = "public/audio/listening/drills/hcmue2/hcmue-test-2-part1.mp3"; minSize = 10000000 },
    @{ group = "hcmue"; id = "1UnZ_2ERI8pL-lxP2kWsMujbT6ek2VMiO"; dest = "public/audio/listening/drills/hcmue2/hcmue-test-2-part2.mp3"; minSize = 10000000 },
    @{ group = "hcmue"; id = "1XoQw4c7dXv65g4YoUSx9fRkmLiK9CNTc"; dest = "public/audio/listening/drills/hcmue2/hcmue-test-2-part3.mp3"; minSize = 20000000 },
    # Test 3
    @{ group = "hcmue"; id = "1CPbgz0QnmjoAmsVh-jkpH72xAbEvL_GH"; dest = "public/audio/listening/drills/hcmue3/hcmue-test-3-part1.mp3"; minSize = 10000000 },
    @{ group = "hcmue"; id = "1Mu5msUTxCqM8m_6FX5y2ZqoLgws1HmOf"; dest = "public/audio/listening/drills/hcmue3/hcmue-test-3-part2.mp3"; minSize = 10000000 },
    @{ group = "hcmue"; id = "1FHBjxIiXimBHajcJManonnABjz2xm8DN"; dest = "public/audio/listening/drills/hcmue3/hcmue-test-3-part3.mp3"; minSize = 20000000 },
    # Test 4
    @{ group = "hcmue"; id = "1UPToxRFrRCk01jxsCWcRKd-qbKhmDHda"; dest = "public/audio/listening/drills/hcmue4/hcmue-test-4-part1.mp3"; minSize = 10000000 },
    @{ group = "hcmue"; id = "1JnFxylLsDIyJWm8lUuoboVCB4D0_lzFG"; dest = "public/audio/listening/drills/hcmue4/hcmue-test-4-part2.mp3"; minSize = 10000000 },
    @{ group = "hcmue"; id = "1YTl0SVUKPurK7CuXZgINhVQFIKOmhAk-"; dest = "public/audio/listening/drills/hcmue4/hcmue-test-4-part3.mp3"; minSize = 20000000 },
    # Test 5
    @{ group = "hcmue"; id = "1KLqsTziZTAcco0k89P3RKThoUgY56_sg"; dest = "public/audio/listening/drills/hcmue5/hcmue-test-5-part1.mp3"; minSize = 10000000 },
    @{ group = "hcmue"; id = "1h6R5MREeKMBdnTjQBKFzSKge2WKcQNpG"; dest = "public/audio/listening/drills/hcmue5/hcmue-test-5-part2.mp3"; minSize = 10000000 },
    @{ group = "hcmue"; id = "12Kr5BrKl9ER3uSnZurK5tanQmZ2LpYJg"; dest = "public/audio/listening/drills/hcmue5/hcmue-test-5-part3.mp3"; minSize = 20000000 },

    # Source PDFs / Reference keys
    @{ group = "pdf"; id = "14TeTHWVJJfwS3L0ue2NthJfMObusWR7u"; dest = "scripts/7-Vstep-Tests-B1-B2-C1-Full-Key.pdf"; minSize = 5000000 }
)

$selectedAssets = if ($Target -eq "all") {
    $assets
} else {
    @($assets | Where-Object { $_.group -eq $Target })
}

Write-Host "================================================================="
Write-Host " VSTEP Asset Downloader: Target [$Target] ($($selectedAssets.Count) items)"
Write-Host "================================================================="

foreach ($item in $selectedAssets) {
    $dest = $item.dest
    $dir = Split-Path -Parent $dest
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
    }

    if (Test-Path $dest) {
        $curSize = (Get-Item $dest).Length
        if ($curSize -ge $item.minSize) {
            Write-Host "[OK] $dest verified ($curSize bytes)"
            continue
        } else {
            Write-Host "[WARN] $dest size ($curSize bytes) is below minSize ($($item.minSize)). Re-downloading..."
            Remove-Item $dest -Force -ErrorAction SilentlyContinue
        }
    }

    $url = "https://drive.usercontent.google.com/download?id=$($item.id)&export=download&confirm=t"
    Write-Host "[DOWNLOADING] $($item.id) -> $dest..."
    & curl.exe -L --retry 3 --retry-delay 2 -o "$dest" "$url"
    $newSize = if (Test-Path $dest) { (Get-Item $dest).Length } else { 0 }
    Write-Host "[DONE] $dest ($newSize bytes)"
}

Write-Host "`nAsset check completed for Target [$Target]."
