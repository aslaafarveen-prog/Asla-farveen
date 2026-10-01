$destFolder = "C:\Users\aslaa\mingit"
$zipFile = "C:\Users\aslaa\mingit.zip"
$gitExe = "C:\Users\aslaa\mingit\cmd\git.exe"

if (-not (Test-Path $gitExe)) {
    Write-Host "Downloading MinGit..."
    [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
    $url = "https://github.com/git-for-windows/git/releases/download/v2.48.1.windows.1/MinGit-2.48.1-64-bit.zip"
    Invoke-WebRequest -Uri $url -OutFile $zipFile -UseBasicParsing
    
    Write-Host "Extracting MinGit..."
    Expand-Archive -Path $zipFile -DestinationPath $destFolder -Force
    Remove-Item $zipFile -Force
}

if (Test-Path $gitExe) {
    Write-Host "MinGit Ready at: $gitExe"
    & $gitExe --version

    $env:PATH = "$destFolder\cmd;$destFolder\bin;$env:PATH"

    Set-Location "c:\Users\aslaa\Downloads\landing page"

    Write-Host "Initializing git repository..."
    & $gitExe init
    
    # Configure default git user if not set
    & $gitExe config user.name "Asla Farveen"
    & $gitExe config user.email "aslaafarveen@gmail.com"

    Write-Host "Staging files..."
    & $gitExe add .

    Write-Host "Committing..."
    & $gitExe commit -m "Initial commit: Asla Farveen portfolio landing page"

    Write-Host "Setting branch to main..."
    & $gitExe branch -M main

    Write-Host "Setting remote origin..."
    & $gitExe remote remove origin 2>$null
    & $gitExe remote add origin https://github.com/aslaafarveen-prog/Asla-farveen.git

    Write-Host "Attempting push to origin main..."
    & $gitExe push -u origin main
} else {
    Write-Host "ERROR: MinGit was not found or failed to extract."
}
