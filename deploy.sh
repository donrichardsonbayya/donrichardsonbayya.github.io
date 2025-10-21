#!/bin/bash

# Portfolio Deployment Script for GitHub Pages
# This script helps deploy your portfolio to GitHub Pages

echo "🚀 Portfolio Deployment Script"
echo "=============================="

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo "❌ Not in a git repository. Initializing..."
    git init
    git remote add origin https://github.com/donrichardsonbayya/donrichardsonbayya.github.io.git
fi

# Check if files exist
if [ ! -f "index.html" ]; then
    echo "❌ index.html not found. Make sure you're in the portfolio directory."
    exit 1
fi

# Add all files
echo "📁 Adding files to git..."
git add .

# Check if there are changes to commit
if git diff --staged --quiet; then
    echo "ℹ️  No changes to commit."
else
    # Get commit message
    if [ -z "$1" ]; then
        commit_message="Update portfolio - $(date '+%Y-%m-%d %H:%M:%S')"
    else
        commit_message="$1"
    fi
    
    echo "💾 Committing changes..."
    git commit -m "$commit_message"
    
    echo "🚀 Pushing to GitHub..."
    git push origin main
    
    echo "✅ Portfolio deployed successfully!"
    echo "🌐 Your site will be live at: https://donrichardsonbayya.github.io"
    echo "⏱️  It may take a few minutes for changes to appear."
else
    echo "ℹ️  No changes to deploy."
fi

echo ""
echo "📋 Next steps:"
echo "1. Visit https://donrichardsonbayya.github.io to see your site"
echo "2. Check GitHub Pages settings if needed"
echo "3. Add custom domain if desired"
echo ""
echo "🎉 Happy coding!"
