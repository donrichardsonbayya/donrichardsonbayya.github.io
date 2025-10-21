# Portfolio Deployment Script for GitHub Pages (PowerShell)
# This script helps deploy your portfolio to GitHub Pages

Write-Host "🚀 Portfolio Deployment Script" -ForegroundColor Cyan
Write-Host "==============================" -ForegroundColor Cyan

# Check if we're in a git repository
if (-not (Test-Path ".git")) {
    Write-Host "❌ Not in a git repository. Initializing..." -ForegroundColor Red
    git init
    git remote add origin https://github.com/donrichardsonbayya/donrichardsonbayya.github.io.git
}

# Check if files exist
if (-not (Test-Path "index.html")) {
    Write-Host "❌ index.html not found. Make sure you're in the portfolio directory." -ForegroundColor Red
    exit 1
}

# Add all files
Write-Host "📁 Adding files to git..." -ForegroundColor Yellow
git add .

# Check if there are changes to commit
$gitStatus = git status --porcelain
if ($gitStatus) {
    # Get commit message
    if ($args.Count -eq 0) {
        $commitMessage = "Update portfolio - $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
    } else {
        $commitMessage = $args[0]
    }
    
    Write-Host "💾 Committing changes..." -ForegroundColor Yellow
    git commit -m $commitMessage
    
    Write-Host "🚀 Pushing to GitHub..." -ForegroundColor Yellow
    git push origin main
    
    Write-Host "✅ Portfolio deployed successfully!" -ForegroundColor Green
    Write-Host "🌐 Your site will be live at: https://donrichardsonbayya.github.io" -ForegroundColor Green
    Write-Host "⏱️  It may take a few minutes for changes to appear." -ForegroundColor Yellow
} else {
    Write-Host "ℹ️  No changes to deploy." -ForegroundColor Blue
}

Write-Host ""
Write-Host "📋 Next steps:" -ForegroundColor Cyan
Write-Host "1. Visit https://donrichardsonbayya.github.io to see your site" -ForegroundColor White
Write-Host "2. Check GitHub Pages settings if needed" -ForegroundColor White
Write-Host "3. Add custom domain if desired" -ForegroundColor White
Write-Host ""
Write-Host "🎉 Happy coding!" -ForegroundColor Green
