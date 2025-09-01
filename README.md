# 🎯 Resume Strength Analyzer

[![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

> An AI-powered resume analysis tool that provides detailed scoring, skill gap analysis, and personalized recommendations to help job seekers create compelling resumes.

## 🚀 Live Demo

🌐 **[Try it live on Netlify](https://resume-strength-analyzer.netlify.app)**

## ✨ Features

### 📊 **Comprehensive Analysis**
- **Overall Strength Score** - Holistic resume evaluation
- **Skills Coverage** - Technical and soft skills assessment  
- **Experience Relevance** - Work history and achievements analysis
- **ATS Readiness** - Applicant Tracking System compatibility check
- **Impact Assessment** - Quantifiable accomplishments evaluation

### 🔍 **Smart Insights**
- **Missing Skills Detection** - Identify skill gaps for target roles
- **Personalized Recommendations** - Actionable improvement suggestions
- **Text Preview** - Visual overview of analyzed content
- **Progress Tracking** - Historical analysis comparison

### 📁 **File Support**
- **PDF Documents** - Complete text extraction and analysis
- **Text Files** - Plain text resume analysis
- **Word Documents** - (Coming soon) .docx support
- **File Size Limit** - Up to 6MB per upload

### 🔐 **User Management**
- **Secure Authentication** - JWT-based login system
- **Email Notifications** - Welcome and login alerts
- **Report History** - Track all analysis sessions
- **Responsive Design** - Works on all devices

## 🛠️ Tech Stack

### **Frontend**
- **Next.js 15.2.4** - React framework with App Router
- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library

### **Backend**
- **Next.js API Routes** - Serverless backend functions
- **JWT Authentication** - Secure token-based auth
- **bcryptjs** - Password hashing
- **PDF Parse** - PDF text extraction
- **In-memory Storage** - Fast data persistence

### **Analysis Engine**
- **Custom AI Algorithm** - Resume scoring logic
- **Skills Detection** - Technology and soft skills recognition
- **ATS Optimization** - Formatting and keyword analysis
- **Impact Measurement** - Achievement quantification

## 📦 Installation

### **Prerequisites**
- Node.js 18+ 
- pnpm (recommended) or npm
- Git

### **Quick Start**

```bash
# Clone the repository
git clone https://github.com/yourusername/resume-strength-analyzer.git
cd resume-strength-analyzer

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Open in browser
open http://localhost:3000
```

### **Available Scripts**

```bash
# Development
pnpm dev          # Start dev server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint

# Deployment
pnpm build        # Build optimized bundle
```

## 🔧 Configuration

### **Environment Variables**

Create a `.env.local` file in the root directory:

```env
# Application Settings
NEXT_PUBLIC_APP_NAME="Resume Strength Analyzer"
NEXT_PUBLIC_API_URL=""  # Leave empty for relative URLs

# JWT Secrets (generate secure random strings)
JWT_ACCESS_SECRET="your-super-secret-access-key-here"
JWT_REFRESH_SECRET="your-super-secret-refresh-key-here"

# Email Configuration (optional)
EMAIL_PROVIDER="console"  # Development mode
# EMAIL_PROVIDER="sendgrid"  # Production
# SENDGRID_API_KEY="your-sendgrid-api-key"
# FROM_EMAIL="noreply@yourapp.com"
```

## 🎨 Usage Guide

### **1. Getting Started**
1. **Visit the app** and click "Get Started"
2. **Register** with your email and password
3. **Login** to access the dashboard

### **2. Analyzing Your Resume**
1. **Navigate** to the "Analyze" page
2. **Upload** your resume (PDF or text file)
3. **Wait** for analysis to complete
4. **Review** your scores and recommendations

### **3. Understanding Scores**

| Score Range | Meaning | Color |
|-------------|---------|-------|
| 80-100% | Excellent | 🟢 Green |
| 60-79% | Good | 🟡 Yellow |
| 0-59% | Needs Improvement | 🔴 Red |

### **4. Viewing Reports**
1. **Go to Reports** page to see history
2. **Click "View Details"** for comprehensive analysis
3. **Track progress** across multiple uploads

## 🚀 Deployment

### **Deploy to Netlify** (Recommended)

1. **Build the project:**
   ```bash
   pnpm build
   ```

2. **Deploy to Netlify:**
   - Connect your GitHub repo to Netlify
   - Set build command: `pnpm build`
   - Set publish directory: `.next`
   - Add environment variables

3. **Environment Variables on Netlify:**
   ```
   JWT_ACCESS_SECRET=your-secret-key
   JWT_REFRESH_SECRET=your-refresh-key
   ```

## 🎯 Scoring Algorithm

### **Overall Score Calculation**

```typescript
const overall = Math.round(
  0.30 * skillsCoverage +      // 30% - Technical skills
  0.25 * experienceRelevance + // 25% - Work experience
  0.25 * atsReadiness +        // 25% - ATS compatibility
  0.20 * impact               // 20% - Quantified achievements
)
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
