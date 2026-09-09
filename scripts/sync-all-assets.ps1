$items = @(
    @{ id = "19l96eQ9gHex1SG6HEemB2kDCYIHKYRDS"; file = "vstep-test-4.mp3"; minSize = 15000000; isPdf = $false },
    @{ id = "1jqiV-oTJTx8eLvGjgQ42k-sRYGQFkkQs"; file = "vstep-test-5.mp3"; minSize = 15000000; isPdf = $false },
    @{ id = "1t0zmB3fVKFSwWr1lDskABUbJaxIrxZ71"; file = "vstep-test-6.mp3"; minSize = 15000000; isPdf = $false },
    @{ id = "1Qbh_37bO48s5K5lcHo_ZG-XDsS_C-nz9"; file = "vstep-test-7.mp3"; minSize = 15000000; isPdf = $false },
    @{ id = "14TeTHWVJJfwS3L0ue2NthJfMObusWR7u"; file = "7-Vstep-Tests-B1-B2-C1-Full-Key.pdf"; minSize = 15000000; isPdf = $true }
)

$audioDir = "d:\program\vstep\public\audio\listening"
$pdfDir = "d:\program\vstep\scripts"

foreach ($it in $items) {
    $targetDir = if ($it.isPdf) { $pdfDir } else { $audioDir }
    $dest = Join-Path $targetDir $it.file
    
    $attempts = 0
    while ($attempts -lt 5) {
        $curSize = if (Test-Path $dest) { (Get-Item $dest).Length } else { 0 }
        if ($curSize -ge $it.minSize) {
            Write-Host "[OK] $($it.file) verified ($curSize bytes)"
            break
        }
        
        $attempts++
        Write-Host "Attempt $attempts: Syncing $($it.file) (current: $curSize bytes)..."
        $url = "https://drive.usercontent.google.com/download?id=$($it.id)&export=download&confirm=t"
        
        & curl.exe -L -C - --retry 3 --retry-delay 2 -o "$dest" "$url"
        Start-Sleep -Seconds 1
    }
}
