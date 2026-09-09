$items = @(
    @{ id = "1jNwkONs0oyHwGigZzYUQkmctkAentkUP"; file = "vstep-test-2.mp3" },
    @{ id = "1JryyGxLhsPsfP5XwVAAfYtNV1fUjqblt"; file = "vstep-test-3.mp3" },
    @{ id = "19l96eQ9gHex1SG6HEemB2kDCYIHKYRDS"; file = "vstep-test-4.mp3" },
    @{ id = "1jqiV-oTJTx8eLvGjgQ42k-sRYGQFkkQs"; file = "vstep-test-5.mp3" },
    @{ id = "1t0zmB3fVKFSwWr1lDskABUbJaxIrxZ71"; file = "vstep-test-6.mp3" },
    @{ id = "1Qbh_37bO48s5K5lcHo_ZG-XDsS_C-nz9"; file = "vstep-test-7.mp3" },
    @{ id = "14TeTHWVJJfwS3L0ue2NthJfMObusWR7u"; file = "7-Vstep-Tests-B1-B2-C1-Full-Key.pdf"; isPdf = $true }
)

$audioDir = "d:\program\vstep\public\audio\listening"
$pdfDir = "d:\program\vstep\scripts"

foreach ($it in $items) {
    $targetDir = if ($it.isPdf) { $pdfDir } else { $audioDir }
    $dest = Join-Path $targetDir $it.file
    if (Test-Path $dest) {
        $len = (Get-Item $dest).Length
        if ($len -gt 500000) {
            Write-Host "Already downloaded: $($it.file) ($len bytes)"
            continue
        }
    }
    
    $url = "https://drive.usercontent.google.com/download?id=$($it.id)&export=download&confirm=t"
    Write-Host "Downloading $($it.file)..."
    & curl.exe -L -o "$dest" "$url"
    $len = (Get-Item $dest).Length
    Write-Host "Finished $($it.file): $len bytes"
}
