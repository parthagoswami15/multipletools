$newHeader = (Get-Content "index.html" -Raw) -match '(?s)<header>.*?</header>';
$newHeaderText = $matches[0];
Get-ChildItem -Path . -Filter *.html -Exclude "index.html", "header.html", "footer.html" | ForEach-Object { 
    $filePath = $_.FullName;
    $content = Get-Content $filePath -Raw;
    $newContent = $content -replace '(?s)<header>.*?</header>', $newHeaderText;
    Set-Content -Path $filePath -Value $newContent;
    Write-Host "Updated header in: $($_.Name)"
} 