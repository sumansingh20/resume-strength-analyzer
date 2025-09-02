# 🚀 Netlify Automatic Deployment Guide

This guide will help you set up automatic deployment to Netlify for the Resume Strength Analyzer.

## 📋 Prerequisites

- GitHub account with the repository
- Netlify account (free tier available)
- Repository: `https://github.com/sumansingh20/resume-strength-analyzer`

## 🔗 Step 1: Connect Repository to Netlify

### Option A: One-Click Deploy
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/sumansingh20/resume-strength-analyzer)

### Option B: Manual Setup
1. **Log in to Netlify**: Go to [netlify.com](https://netlify.com)
2. **Add new site**: Click "Add new site" → "Import an existing project"
3. **Connect Git provider**: Choose GitHub
4. **Select repository**: `sumansingh20/resume-strength-analyzer`
5. **Configure build settings** (auto-detected from netlify.toml):
   - Build command: `pnpm run build`
   - Publish directory: `.next`
   - Node version: 18

## ⚙️ Step 2: Environment Variables

In your Netlify dashboard, go to **Site settings** → **Environment variables** and add:

### Required Variables
```bash
JWT_ACCESS_SECRET = "generate-a-secure-32-character-secret-key"
JWT_REFRESH_SECRET = "generate-a-different-secure-32-character-secret-key"
```

### Optional Variables
```bash
NEXT_PUBLIC_APP_NAME = "Resume Strength Analyzer"
EMAIL_PROVIDER = "console"
```

### Generate Secure Secrets
Use one of these methods to generate secure secrets:

**Method 1: Node.js**
```javascript
// Run in Node.js console
console.log(require('crypto').randomBytes(32).toString('hex'))
```

**Method 2: Online Generator**
Visit: [randomkeygen.com](https://randomkeygen.com/) and use "Fort Knox Passwords"

**Method 3: Command Line**
```bash
# On Mac/Linux
openssl rand -hex 32

# On Windows (PowerShell)
[System.Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(32))
```

## 🔄 Step 3: Automatic Deployment Setup

Once connected, Netlify will automatically:

1. **Build on every push** to the main branch
2. **Deploy successful builds** immediately
3. **Provide deploy previews** for pull requests
4. **Send notifications** on build status

### Deployment Triggers
- ✅ **Push to main branch** → Production deployment
- ✅ **Pull request** → Deploy preview
- ✅ **Manual trigger** → On-demand deployment

## 📊 Step 4: Monitor Deployment

### Build Process
1. **Trigger**: Git push detected
2. **Install**: Dependencies via pnpm
3. **Build**: Next.js production build
4. **Deploy**: Upload to Netlify CDN
5. **Live**: Application available at your URL

### Build Output Example
```
✓ Installing dependencies via pnpm
✓ Running build command: pnpm run build
✓ Next.js build completed successfully
✓ Deploying to Netlify CDN
✓ Site is live at: https://your-app-name.netlify.app
```

## 🌐 Step 5: Custom Domain (Optional)

1. **Go to Domain settings** in Netlify
2. **Add custom domain** (e.g., resume-analyzer.com)
3. **Configure DNS** with your domain provider
4. **Enable HTTPS** (automatic with Netlify)

## ⚡ Quick Verification

After deployment, test these URLs:

- **Home page**: `https://your-app.netlify.app`
- **Login**: `https://your-app.netlify.app/login`
- **Register**: `https://your-app.netlify.app/register`
- **API Health**: `https://your-app.netlify.app/api/health`

## 🔧 Troubleshooting

### Common Issues

**Build Fails**
```bash
# Check build logs in Netlify dashboard
# Ensure environment variables are set
# Verify pnpm is available (should be auto-detected)
```

**Environment Variables Not Working**
```bash
# Restart deployment after adding variables
# Check variable names match exactly
# Ensure no trailing spaces in values
```

**Database Issues**
```bash
# Remember: In-memory database resets on each deployment
# For persistent data, implement external database
# Current setup is perfect for demo/testing
```

## 📈 Deployment Status

- ✅ **Repository**: Connected to GitHub
- ✅ **Build Configuration**: Optimized for Next.js
- ✅ **Environment**: Production-ready
- ✅ **Security**: Headers configured
- ✅ **Performance**: Static optimization enabled

## 🚀 Going Live Checklist

- [ ] Repository connected to Netlify
- [ ] Environment variables configured
- [ ] First deployment successful
- [ ] Custom domain configured (optional)
- [ ] HTTPS enabled
- [ ] Application tested and working

Your Resume Strength Analyzer is now automatically deployed! 🎉

Every time you push code to GitHub, Netlify will automatically build and deploy your updates.
