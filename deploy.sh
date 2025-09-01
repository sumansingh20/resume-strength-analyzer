#!/bin/bash

# 🚀 Resume Strength Analyzer - Quick Deploy Script
# This script helps you deploy to Netlify quickly

echo "🎯 Resume Strength Analyzer - Deployment Helper"
echo "=============================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📝 Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit: Resume Strength Analyzer"
else
    echo "✅ Git repository found"
fi

# Build the project
echo "🔨 Building project..."
pnpm build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed. Please fix errors before deploying."
    exit 1
fi

echo ""
echo "🚀 Ready for deployment!"
echo ""
echo "Next steps:"
echo "1. Push your code to GitHub:"
echo "   git remote add origin https://github.com/yourusername/resume-strength-analyzer.git"
echo "   git push -u origin main"
echo ""
echo "2. Deploy to Netlify:"
echo "   - Visit https://netlify.com"
echo "   - Connect your GitHub repository"
echo "   - Set build command: pnpm build"
echo "   - Set publish directory: .next"
echo "   - Add environment variables (see DEPLOYMENT.md)"
echo ""
echo "3. Generate JWT secrets:"
echo "   node -e \"console.log('ACCESS:', require('crypto').randomBytes(64).toString('hex'))\""
echo "   node -e \"console.log('REFRESH:', require('crypto').randomBytes(64).toString('hex'))\""
echo ""
echo "📖 For detailed instructions, see DEPLOYMENT.md"
echo "🎉 Happy deploying!"
