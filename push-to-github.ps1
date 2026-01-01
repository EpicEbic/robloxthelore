# PowerShell script to push changes to GitHub
# Run this script after Git is installed

Write-Host "Checking for Git..." -ForegroundColor Cyan

# Try to find git
$gitPath = $null
if (Get-Command git -ErrorAction SilentlyContinue) {
    $gitPath = "git"
} elseif (Test-Path "C:\Program Files\Git\bin\git.exe") {
    $gitPath = "C:\Program Files\Git\bin\git.exe"
} elseif (Test-Path "C:\Program Files (x86)\Git\bin\git.exe") {
    $gitPath = "C:\Program Files (x86)\Git\bin\git.exe"
}

if (-not $gitPath) {
    Write-Host "ERROR: Git is not installed or not found in PATH." -ForegroundColor Red
    Write-Host "Please install Git from: https://git-scm.com/download/win" -ForegroundColor Yellow
    Write-Host "Or use GitHub Desktop: https://desktop.github.com/" -ForegroundColor Yellow
    exit 1
}

Write-Host "Git found! Proceeding with push..." -ForegroundColor Green
Write-Host ""

# Check status
Write-Host "Checking git status..." -ForegroundColor Cyan
& $gitPath status

# Stage all changes
Write-Host "`nStaging all changes..." -ForegroundColor Cyan
& $gitPath add .

# Commit
Write-Host "`nCommitting changes..." -ForegroundColor Cyan
$commitMessage = "The Characteristics & Coils Update: Implement archetype system, update character stats, reintroduce Coils of Power, rename Equipment to Objects"
& $gitPath commit -m $commitMessage

# Check if remote exists
Write-Host "`nChecking remote configuration..." -ForegroundColor Cyan
$remoteExists = & $gitPath remote get-url origin 2>$null
if (-not $remoteExists) {
    Write-Host "Adding remote origin..." -ForegroundColor Cyan
    & $gitPath remote add origin https://github.com/EpicEbic/robloxthelore.git
} else {
    Write-Host "Remote already configured: $remoteExists" -ForegroundColor Green
}

# Push
Write-Host "`nPushing to GitHub..." -ForegroundColor Cyan
Write-Host "You will be prompted for credentials:" -ForegroundColor Yellow
Write-Host "  Username: EpicEbic" -ForegroundColor Yellow
Write-Host "  Password: Use your GitHub Personal Access Token" -ForegroundColor Yellow
Write-Host ""

& $gitPath push origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "`nSuccessfully pushed to GitHub!" -ForegroundColor Green
} else {
    Write-Host "`nPush failed. Please check your credentials and try again." -ForegroundColor Red
}

