#!/bin/bash

# JKFirm Vercel Deployment Script
# This script helps you deploy to Vercel quickly

echo "🚀 JKFirm Vercel Deployment Script"
echo "=================================="
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null
then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
    echo "✅ Vercel CLI installed"
else
    echo "✅ Vercel CLI found"
fi

echo ""
echo "📦 Building the application..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful"
else
    echo "❌ Build failed. Please fix errors and try again."
    exit 1
fi

echo ""
echo "🔐 Please make sure you have set the following environment variables in Vercel:"
echo "   - MONGODB_URI"
echo "   - NODE_ENV"
echo ""
read -p "Have you set the environment variables? (y/n) " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]
then
    echo ""
    echo "🚀 Deploying to Vercel..."
    vercel --prod
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "✅ Deployment successful!"
        echo "🌐 Your app is now live!"
        echo ""
        echo "📝 Next steps:"
        echo "   1. Test your app at the provided URL"
        echo "   2. Configure custom domain (optional)"
        echo "   3. Update CORS settings in server.js"
        echo ""
    else
        echo "❌ Deployment failed. Check the errors above."
        exit 1
    fi
else
    echo ""
    echo "⚠️  Please set environment variables first:"
    echo "   vercel env add MONGODB_URI production"
    echo "   vercel env add NODE_ENV production"
    echo ""
    echo "Then run this script again."
fi
