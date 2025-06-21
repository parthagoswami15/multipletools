Get-ChildItem -Path . -Filter *.html -Exclude "index.html", "header.html", "footer.html" | ForEach-Object {
    $filePath = $_.FullName
    $content = Get-Content $filePath -Raw
    if ($content -notmatch 'cdnjs.cloudflare.com/ajax/libs/font-awesome') {
        $insertion = '<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">'
        $newContent = $content -replace '</head>', "    $insertion`r`n</head>"
        Set-Content -Path $filePath -Value $newContent
        Write-Host "Updated: $($_.Name)"
    }
} 