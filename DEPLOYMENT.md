# 🚀 Deployment Guide for Resume Strength Analyzer

This guide will help you deploy your Resume Strength Analyzer to Netlify for free.

## 📋 Prerequisites

- GitHub account
- Netlify account (free)
- Git installed locally

## 🔧 Step-by-Step Deployment

### **Step 1: Prepare Your Repository**

1. **Initialize Git** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Create GitHub Repository**:
   - Go to [GitHub](https://github.com)
   - Click "New repository"
   - Name it `resume-strength-analyzer`
   - Make it public
   - Don't initialize with README (you already have one)

3. **Push to GitHub**:
   ```bash
   git remote add origin https://github.com/yourusername/resume-strength-analyzer.git
   git branch -M main
   git push -u origin main
   ```

### **Step 2: Deploy to Netlify**

1. **Visit Netlify**:
   - Go to [netlify.com](https://netlify.com)
   - Sign up/login with GitHub

2. **Import Project**:
   - Click "New site from Git"
   - Choose "GitHub"
   - Select your repository

3. **Configure Build Settings**:
   ```
   Build command: pnpm build
   Publish directory: .next
   ```

4. **Add Environment Variables**:
   Go to Site Settings → Environment Variables and add:
   ```
   JWT_ACCESS_SECRET=your-generated-secret-key-here
   JWT_REFRESH_SECRET=your-different-secret-key-here
   ```

5. **Generate Secrets**:
   Run this command to generate secure secrets:
   ```bash
   node -e "console.log('ACCESS:', require('crypto').randomBytes(64).toString('hex'))"
   node -e "console.log('REFRESH:', require('crypto').randomBytes(64).toString('hex'))"
   ```

### **Step 3: Verify Deployment**

1. **Build Process**: Watch the build logs in Netlify
2. **Test Functionality**:
   - Registration/Login
   - File upload
   - Analysis results
   - Reports page

## 🔧 Configuration Files

Your project includes these deployment files:

### **netlify.toml**
```toml
[build]
  publish = ".next"
  command = "pnpm build"

[build.environment]
  NODE_VERSION = "18"
  PNPM_VERSION = "8"
```

### **.env.example**
Template for environment variables - copy to `.env.local` for local development.

## 🚨 Important Notes

### **Environment Variables**
- **JWT_ACCESS_SECRET**: Must be at least 32 characters
- **JWT_REFRESH_SECRET**: Must be different from access secret
- Never commit `.env.local` to Git

### **Next.js Configuration**
- The app uses Next.js API routes (serverless functions)
- Static export is not supported due to API routes
- Netlify automatically handles Next.js builds

### **File Uploads**
- Netlify has a 6MB file limit (perfect for resumes)
- Files are processed in serverless functions
- No permanent storage - files are analyzed and discarded

## 🐛 Troubleshooting

### **Build Fails**
```bash
# Check your build locally first
pnpm build

# Common issues:
# 1. Missing dependencies
# 2. TypeScript errors
# 3. Environment variables
```

### **Runtime Errors**
```bash
# Check Netlify function logs
# Common issues:
# 1. Missing JWT secrets
# 2. API route problems
# 3. Authentication issues
```

### **Token Storage Issues**
- App uses `localStorage` for token persistence
- Ensure consistent key names: `access_token`
- Clear browser storage if experiencing auth issues

## 🎯 Deployment Checklist

- [ ] Repository pushed to GitHub
- [ ] Netlify site connected
- [ ] Build command configured: `pnpm build`
- [ ] Publish directory set: `.next`
- [ ] Environment variables added
- [ ] JWT secrets generated (32+ chars)
- [ ] Build completed successfully
- [ ] Site accessible and functional
- [ ] Registration/login working
- [ ] File upload working
- [ ] Analysis generating results

## 🔗 Useful Links

- **Netlify Docs**: [docs.netlify.com](https://docs.netlify.com)
- **Next.js Deployment**: [nextjs.org/docs/deployment](https://nextjs.org/docs/deployment)
- **GitHub Integration**: [docs.netlify.com/configure-builds/repo-permissions-linking/](https://docs.netlify.com/configure-builds/repo-permissions-linking/)

## 📞 Support

If you encounter issues:
1. Check the build logs in Netlify
2. Review the troubleshooting section
3. Ensure all environment variables are set
4. Test locally with `pnpm build` first

---

**Happy Deploying! 🚀**

Your Resume Strength Analyzer will be live at: `https://yoursite.netlify.app`
