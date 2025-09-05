# 🎯 Resume Strength Analyzer

[![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.3.1-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![Deployed on Netlify](https://img.shields.io/badge/Deployed%20on-Netlify-00C7B7)](https://resume-strength-analyzer.netlify.app/)

> **AI-Powered Resume Analysis Tool** - A comprehensive platform to help job seekers analyze, improve, and optimize their resumes with intelligent scoring, detailed feedback, and personalized recommendations.

## 🌐 Live Demo

🚀 **[Visit Resume Strength Analyzer](https://resume-strength-analyzer.netlify.app/)**

🚀 **[Try it live on Netlify](https://resume-strength-analyzer.netlify.app)**

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/sumansingh20/resume-strength-analyzer)

## ✨ Key Features

### 🎯 **Smart Analysis Engine**
- **AI-Powered Scoring** - Comprehensive resume evaluation with detailed metrics
- **ATS Optimization** - Ensure your resume passes Applicant Tracking Systems
- **Skills Gap Analysis** - Identify missing skills for your target roles
- **Impact Assessment** - Quantify and improve achievement statements
- **Instant Feedback** - Get analysis results within seconds

### � **Complete User Management**
- **Secure Authentication** - JWT-based login system with email notifications
- **User Profiles** - Personal information, bio, location, and website
- **Password Management** - Secure password changes and forgot password flow
- **Report History** - Track all analysis sessions and progress over time

### 📊 **Comprehensive Scoring**
- **Overall Strength Score** (0-100) - Holistic resume quality assessment
- **Skills Coverage** (0-100) - Technical and soft skills evaluation
- **Experience Relevance** (0-100) - Work history alignment analysis
- **ATS Readiness** (0-100) - Formatting and keyword optimization
- **Impact Score** (0-100) - Achievement quantification and impact

### 📁 **File Processing**
- **PDF Support** - Complete text extraction and analysis
- **Text Files** - Plain text resume processing
- **Word Documents** - .docx file support (coming soon)
- **File Size Limit** - Up to 6MB per upload
- **Preview Generation** - Visual content overview

## 🛠️ Technology Stack

### **Frontend**
- **Next.js 15.2.4** - React framework with App Router and RSC
- **React 19** - Latest React with concurrent features
- **TypeScript** - Full type safety throughout the application
- **Tailwind CSS** - Utility-first styling with custom design system
- **shadcn/ui** - Beautiful, accessible component library
- **Lucide React** - Comprehensive icon library

### **Backend & Infrastructure**
- **Next.js API Routes** - Serverless backend functions
- **JWT Authentication** - Secure token-based authentication
- **bcryptjs** - Industry-standard password hashing
- **PDF-Parse** - Robust PDF text extraction
- **In-Memory Database** - Fast development with persistence layer

### **Development & Deployment**
- **TypeScript** - Type-safe development experience
- **ESLint & Prettier** - Code quality and formatting
- **pnpm** - Fast, efficient package management
- **Netlify** - Seamless deployment with serverless functions
- **GitHub** - Version control and collaboration

## 🚀 Quick Start

### **Prerequisites**
- Node.js 18 or higher
- pnpm (recommended) or npm
- Git for version control

### **Installation**

```bash
# Clone the repository
git clone https://github.com/harshitaip/Resume-Strength-Analyzer.git
cd resume-strength-analyzer

# Install dependencies
pnpm install

# Create environment file
cp .env.example .env.local

# Start development server
pnpm dev

# Open in browser
open http://localhost:3000
```

### **Environment Configuration**

Create a `.env.local` file:

```env
# Application Settings
NEXT_PUBLIC_APP_NAME="Resume Strength Analyzer"
NEXT_PUBLIC_API_URL=""

# JWT Secrets (generate secure random strings)
JWT_ACCESS_SECRET="your-super-secure-access-secret-key-32-chars-minimum"
JWT_REFRESH_SECRET="your-super-secure-refresh-secret-key-32-chars-minimum"

# Email Configuration (optional)
EMAIL_PROVIDER="console"  # Development mode
# For production, add your email service configuration
```

## 📁 Project Structure

```
resume-strength-analyzer/
├── app/                    # Next.js App Router
│   ├── api/               # Backend API routes
│   │   ├── auth/          # Authentication endpoints
│   │   ├── users/         # User management
│   │   └── resumes/       # Resume analysis
│   ├── dashboard/         # User dashboard
│   ├── profile/           # User profile management
│   ├── upload/            # Resume upload & analysis
│   └── layout.tsx         # Root layout with providers
├── components/            # Reusable UI components
│   ├── ui/               # shadcn/ui components
│   ├── site-header.tsx   # Navigation header
│   └── theme-provider.tsx # Dark/light theme support
├── lib/                  # Core utilities
│   ├── analyzer.ts       # AI analysis engine
│   ├── parser.ts         # File parsing logic
│   ├── auth.ts           # Authentication utilities
│   ├── db.ts             # Database layer
│   └── utils.ts          # Helper functions
├── hooks/                # Custom React hooks
├── public/               # Static assets
└── styles/               # Global styles
```

## 🎯 How It Works

### **1. User Registration & Authentication**
- Create account with email and password
- Secure JWT-based authentication
- Email notifications for account activities
- Profile management with personal information

### **2. Resume Upload & Processing**
- Upload PDF or text files up to 6MB
- Automatic text extraction and parsing
- Content validation and preprocessing
- Error handling for unsupported formats

### **3. AI-Powered Analysis**
- Skills detection and categorization
- Experience relevance evaluation
- ATS compatibility assessment
- Impact statement analysis
- Comprehensive scoring algorithm

### **4. Results & Recommendations**
- Detailed score breakdown with explanations
- Specific improvement suggestions
- Missing skills identification
- Formatting and optimization tips
- Progress tracking over time

## 📊 Scoring Algorithm

### **Comprehensive Evaluation**

```typescript
const overallScore = Math.round(
  0.30 * skillsCoverage +      // 30% - Technical & soft skills
  0.25 * experienceRelevance + // 25% - Work experience quality
  0.25 * atsReadiness +        // 25% - ATS optimization
  0.20 * impactScore          // 20% - Quantified achievements
)
```

### **Score Interpretation**

| Score Range | Quality Level | Recommendation |
|-------------|---------------|----------------|
| 90-100% | Excellent | Minor optimizations |
| 80-89% | Very Good | Few improvements needed |
| 70-79% | Good | Several enhancements |
| 60-69% | Average | Significant improvements |
| Below 60% | Needs Work | Major restructuring |

## 🌐 Deployment

### **Deploy to Netlify** (Recommended)

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy on Netlify:**
   - Connect your GitHub repository
   - Netlify auto-detects Next.js configuration
   - Add environment variables in Site Settings
   - Deploy automatically on git push

3. **Environment Variables:**
   ```
   JWT_ACCESS_SECRET=your-secure-secret-key
   JWT_REFRESH_SECRET=your-secure-refresh-key
   NEXT_PUBLIC_APP_NAME=Resume Strength Analyzer
   ```

### **Alternative Deployment**

```bash
# Build for production
pnpm build

# Deploy with Netlify CLI
netlify deploy --prod

# Or deploy to Vercel
vercel --prod
```

## 🔧 Available Scripts

```bash
# Development
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint checks
pnpm type-check   # Run TypeScript validation

# Testing & Quality
pnpm test         # Run test suite (when available)
pnpm format       # Format code with Prettier
```

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. **Fork the repository**
2. **Create a feature branch:**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes:**
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to the branch:**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### **Contribution Guidelines**
- Follow TypeScript best practices
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure code passes linting and type checks

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Support & Contact

- **Live Application:** [https://resume-strength-analyzer.netlify.app](https://resume-strength-analyzer.netlify.app)
- **GitHub Issues:** [Report bugs or request features](https://github.com/harshitaip/Resume-Strength-Analyzer/issues)
- **GitHub Repository:** [Source code](https://github.com/harshitaip/Resume-Strength-Analyzer)

## 🌟 Acknowledgments

- **[Next.js](https://nextjs.org/)** - Amazing React framework
- **[shadcn/ui](https://ui.shadcn.com/)** - Beautiful component library
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first styling
- **[Radix UI](https://www.radix-ui.com/)** - Accessible component primitives
- **[Netlify](https://netlify.com/)** - Seamless deployment platform

---

**Built with ❤️ by [Harshita](https://github.com/harshitaip)**

*Helping job seekers create better resumes, one analysis at a time.*

---

**Built with ❤️ by [Harshita](https://github.com/harshitaip)**

*Helping job seekers create better resumes, one analysis at a time.*

## 🔧 Environment Variables

Create a `.env.local` file:

```env
# App Configuration
NEXT_PUBLIC_APP_NAME="Resume Analyzer"
NEXT_PUBLIC_API_URL=""

# Optional: Email notifications (if implemented)
# SMTP_HOST=smtp.gmail.com
# SMTP_PORT=587
# SMTP_USER=your-email@gmail.com
# SMTP_PASS=your-app-password
```

## 📊 Analysis Features


