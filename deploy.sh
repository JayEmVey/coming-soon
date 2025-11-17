#!/bin/bash

# Gate 7 Coffee Roastery - Deploy Script
# Builds and deploys to GitHub Pages

set -e

echo "🔨 Building production bundle..."
npm run build

echo "📦 Copying static files..."
cp CNAME dist/CNAME 2>/dev/null || true
cp robots.txt dist/robots.txt 2>/dev/null || true
cp sitemap.xml dist/sitemap.xml 2>/dev/null || true
cp .htaccess dist/.htaccess 2>/dev/null || true

echo "📝 Creating git commit..."
git add dist -f
git commit -m "chore: production build $(date '+%Y-%m-%d %H:%M:%S')" || echo "No changes to commit"

echo "🚀 Pushing to GitHub..."
git push origin main

echo "✅ Deployment complete!"
echo "🎉 Site is live at: https://gate7.vn"
