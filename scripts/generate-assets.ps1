Add-Type -AssemblyName System.Drawing

$assetDir = Join-Path (Get-Location) "assets"
New-Item -ItemType Directory -Force -Path $assetDir | Out-Null

function New-Canvas {
    param([int]$Width, [int]$Height)
    $bmp = New-Object Drawing.Bitmap $Width, $Height
    $gfx = [Drawing.Graphics]::FromImage($bmp)
    $gfx.SmoothingMode = [Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $gfx.TextRenderingHint = [Drawing.Text.TextRenderingHint]::AntiAliasGridFit
    return @{ Bitmap = $bmp; Graphics = $gfx }
}

function Add-Panel {
    param($Graphics, [int]$X, [int]$Y, [int]$W, [int]$H, [string]$Fill, [string]$Stroke = "#3A3A3A")
    $brush = New-Object Drawing.SolidBrush ([Drawing.ColorTranslator]::FromHtml($Fill))
    $pen = New-Object Drawing.Pen ([Drawing.ColorTranslator]::FromHtml($Stroke), 2)
    $Graphics.FillRectangle($brush, $X, $Y, $W, $H)
    $Graphics.DrawRectangle($pen, $X, $Y, $W, $H)
    $brush.Dispose()
    $pen.Dispose()
}

function Add-Line {
    param($Graphics, [int]$X1, [int]$Y1, [int]$X2, [int]$Y2, [string]$Color = "#D8D8D8", [int]$Width = 2)
    $pen = New-Object Drawing.Pen ([Drawing.ColorTranslator]::FromHtml($Color), $Width)
    $Graphics.DrawLine($pen, $X1, $Y1, $X2, $Y2)
    $pen.Dispose()
}

function Add-Label {
    param($Graphics, [string]$Text, [int]$X, [int]$Y, [int]$Size = 28, [string]$Color = "#F5F5F5")
    $font = New-Object Drawing.Font("Arial", $Size, [Drawing.FontStyle]::Bold, [Drawing.GraphicsUnit]::Pixel)
    $brush = New-Object Drawing.SolidBrush ([Drawing.ColorTranslator]::FromHtml($Color))
    $Graphics.DrawString($Text, $font, $brush, $X, $Y)
    $font.Dispose()
    $brush.Dispose()
}

function Save-Art {
    param([string]$Name, [int]$Width, [int]$Height, [scriptblock]$Draw)
    $canvas = New-Canvas $Width $Height
    $gfx = $canvas.Graphics
    $bg = New-Object Drawing.SolidBrush ([Drawing.ColorTranslator]::FromHtml("#050505"))
    $gfx.FillRectangle($bg, 0, 0, $Width, $Height)
    $bg.Dispose()

    & $Draw $gfx $Width $Height

    $path = Join-Path $assetDir $Name
    $canvas.Bitmap.Save($path, [Drawing.Imaging.ImageFormat]::Png)
    $gfx.Dispose()
    $canvas.Bitmap.Dispose()
}

Save-Art "hero-showcase.png" 1600 2000 {
    param($g, $w, $h)
    for ($i = 0; $i -lt 18; $i++) {
        $x = 90 + ($i * 82)
        Add-Line $g $x 0 ($x + 320) $h "#151515" 3
    }
    Add-Panel $g 180 260 940 560 "#F4F4F0" "#FFFFFF"
    Add-Panel $g 320 470 960 610 "#101010" "#4A4A4A"
    Add-Panel $g 450 770 850 620 "#E7E7E1" "#FFFFFF"
    Add-Line $g 250 370 930 370 "#111111" 6
    Add-Line $g 250 455 690 455 "#595959" 4
    Add-Line $g 390 610 1150 610 "#FFFFFF" 4
    Add-Line $g 390 710 990 710 "#8B0000" 6
    Add-Line $g 535 920 1110 920 "#121212" 8
    Add-Line $g 535 1040 920 1040 "#5F5F5F" 5
    Add-Label $g "AK" 1180 1340 88 "#FFFFFF"
}

Save-Art "project-dashboard.png" 1600 1100 {
    param($g, $w, $h)
    Add-Panel $g 110 120 1380 860 "#EDEDE8" "#FFFFFF"
    Add-Panel $g 160 190 260 720 "#111111" "#303030"
    for ($i = 0; $i -lt 5; $i++) { Add-Line $g 205 (260 + $i * 92) 360 (260 + $i * 92) "#DADADA" 5 }
    for ($i = 0; $i -lt 3; $i++) { Add-Panel $g (480 + $i * 300) 210 250 170 "#FFFFFF" "#C4C4C4" }
    Add-Panel $g 480 460 580 390 "#111111" "#333333"
    for ($i = 0; $i -lt 9; $i++) { Add-Line $g 525 (800 - $i * 34) (600 + $i * 55) (720 - $i * 20) "#F3F3F3" 3 }
    Add-Panel $g 1110 460 260 390 "#FFFFFF" "#C4C4C4"
    Add-Line $g 1160 650 1320 650 "#8B0000" 10
}

Save-Art "project-commerce.png" 1200 1400 {
    param($g, $w, $h)
    Add-Panel $g 150 160 900 1040 "#F1F1ED" "#FFFFFF"
    Add-Panel $g 240 250 720 540 "#111111" "#333333"
    Add-Line $g 300 900 830 900 "#111111" 12
    Add-Line $g 300 980 720 980 "#696969" 6
    Add-Panel $g 300 1080 260 74 "#111111" "#111111"
    Add-Panel $g 590 1080 230 74 "#F1F1ED" "#111111"
}

Save-Art "project-mobile.png" 1200 1700 {
    param($g, $w, $h)
    Add-Panel $g 230 120 330 1180 "#F7F7F2" "#FFFFFF"
    Add-Panel $g 640 300 330 1180 "#121212" "#3A3A3A"
    for ($i = 0; $i -lt 6; $i++) {
        Add-Panel $g 280 (250 + $i * 150) 230 84 "#111111" "#111111"
        Add-Panel $g 690 (430 + $i * 145) 230 78 "#F2F2EE" "#F2F2EE"
    }
    Add-Line $g 735 1240 900 1240 "#8B0000" 8
}

Save-Art "project-brand.png" 1200 1200 {
    param($g, $w, $h)
    Add-Panel $g 130 130 940 940 "#EDEDE9" "#FFFFFF"
    Add-Label $g "A" 480 390 260 "#111111"
    Add-Line $g 240 760 960 760 "#111111" 10
    Add-Line $g 240 840 730 840 "#777777" 6
    Add-Line $g 240 930 340 930 "#8B0000" 12
}

Save-Art "project-saas.png" 1400 1100 {
    param($g, $w, $h)
    Add-Panel $g 100 110 1200 840 "#101010" "#333333"
    Add-Panel $g 170 190 270 690 "#EDEDE8" "#FFFFFF"
    Add-Panel $g 500 190 720 150 "#1B1B1B" "#444444"
    for ($i = 0; $i -lt 4; $i++) { Add-Panel $g 500 (410 + $i * 115) 720 76 "#F1F1EC" "#C9C9C3" }
    Add-Line $g 1020 238 1160 238 "#8B0000" 7
}
