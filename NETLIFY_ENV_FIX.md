# URGENT: Netlify Environment Variables Setup

## The Issue
The JWT_ACCESS_SECRET environment variable is still not being read by Netlify, even though it's in netlify.toml.

## Quick Fix Instructions

### Method 1: Manual Netlify Dashboard Setup
1. Go to: https://app.netlify.com/sites/resume-strength-analyzer/settings/env
2. Click "Add environment variable"
3. Add these variables:

**JWT_ACCESS_SECRET**
```
f1a99f86bc7fe81c67dfd870f63d2d7560ec4a0c63c2f560b8c1f549715fbc83672191073e63d5d9ef98fd5d83e5d14d178f7e397bec4308a0f47a1ab224f10d
```

**JWT_REFRESH_SECRET**
```
59ff4e79d4618048cb543a25eefc26a23e0af7371b66dfe3a262bc08499e7eb38901a9c35b74ce81c7c76c6856772af8b7b9b534d2daad2f1a4108832e1103e
```

4. Click "Save" and redeploy

### Method 2: Alternative Registration
Use the debug endpoint to create the user directly:
1. Go to: https://resume-strength-analyzer.netlify.app/api/debug/users
2. Make a POST request to create the test user

### Method 3: Use Registration After Manual Fix
Once env vars are set manually in Netlify:
1. Go to: https://resume-strength-analyzer.netlify.app/register
2. Use: harshita@iitp.ac.in / Harshita@123

## Status
- ✅ Code is correct
- ✅ Local development works
- ❌ Netlify environment variables not loading from netlify.toml
- 🔧 Needs manual environment variable setup in Netlify dashboard

The issue is specifically with Netlify's environment variable configuration, not the application code.
