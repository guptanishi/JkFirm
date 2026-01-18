# JKFirm Vercel Deployment Script (PowerShell)
# This script helps you deploy to Vercel quickly on Windows

Write-Host "🚀 JKFirm Vercel Deployment Script" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

# Check if Vercel CLI is installed
$vercelInstalled = Get-Command vercel -ErrorAction SilentlyContinue

if (-not $vercelInstalled) {
    Write-Host "❌ Vercel CLI not found. Installing..." -ForegroundColor Yellow
    npm install -g vercel
    Write-Host "✅ Vercel CLI installed" -ForegroundColor Green
} else {
    Write-Host "✅ Vercel CLI found" -ForegroundColor Green
}

Write-Host ""
Write-Host "📦 Building the application..." -ForegroundColor Cyan
npm run build

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Build successful" -ForegroundColor Green
} else {
    Write-Host "❌ Build failed. Please fix errors and try again." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "🔐 Please make sure you have set the following environment variables in Vercel:" -ForegroundColor Yellow
Write-Host "   - MONGODB_URI" -ForegroundColor White
Write-Host "   - NODE_ENV" -ForegroundColor White
Write-Host ""

$response = Read-Host "Have you set the environment variables? (y/n)"

if ($response -eq "y" -or $response -eq "Y") {
    Write-Host ""
    Write-Host "🚀 Deploying to Vercel..." -ForegroundColor Cyan
    vercel --prod
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "✅ Deployment successful!" -ForegroundColor Green
        Write-Host "🌐 Your app is now live!" -ForegroundColor Green
        Write-Host ""
        Write-Host "📝 Next steps:" -ForegroundColor Cyan
        Write-Host "   1. Test your app at the provided URL" -ForegroundColor White
        Write-Host "   2. Configure custom domain (optional)" -ForegroundColor White
        Write-Host "   3. Update CORS settings in server.js" -ForegroundColor White
        Write-Host ""
    } else {
        Write-Host "❌ Deployment failed. Check the errors above." -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host ""
    Write-Host "⚠️  Please set environment variables first:" -ForegroundColor Yellow
    Write-Host "   vercel env add MONGODB_URI production" -ForegroundColor White
    Write-Host "   vercel env add NODE_ENV production" -ForegroundColor White
    Write-Host ""
    Write-Host "Then run this script again." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
