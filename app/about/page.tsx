"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { 
  FileText, 
  Target, 
  TrendingUp, 
  CheckCircle, 
  Shield,
  ArrowRight,
  Upload,
  BarChart3,
  Award,
  Bot,
  Search,
  Lightbulb,
  Eye,
  Layers
} from "lucide-react"

export default function AboutPage() {
  const features = [
    {
      icon: <Bot className="h-8 w-8" />,
      title: "AI-Powered Analysis",
      description: "Our advanced AI algorithms analyze your resume content, structure, and formatting to provide comprehensive feedback.",
      benefits: ["Content quality assessment", "Writing style evaluation", "Professional tone analysis"]
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Comprehensive Scoring",
      description: "Get detailed scoring with specific breakdowns for different aspects of your resume.",
      benefits: ["Overall strength score", "Section-by-section analysis", "Benchmark comparisons"]
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "ATS Optimization",
      description: "Ensure your resume passes through Applicant Tracking Systems used by most employers.",
      benefits: ["Keyword optimization", "Format compatibility", "Parser-friendly structure"]
    },
    {
      icon: <Search className="h-8 w-8" />,
      title: "Keyword Analysis",
      description: "Identify missing keywords and optimize your resume for specific job requirements.",
      benefits: ["Industry-specific keywords", "Skill gap identification", "Competitive analysis"]
    },
    {
      icon: <Lightbulb className="h-8 w-8" />,
      title: "Smart Recommendations",
      description: "Receive actionable suggestions to improve your resume's effectiveness.",
      benefits: ["Content improvements", "Structure optimization", "Industry best practices"]
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Privacy & Security",
      description: "Your data is encrypted and secure. I never share your information with third parties.",
      benefits: ["End-to-end encryption", "GDPR compliant", "No data sharing"]
    }
  ]

  const analysisAreas = [
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Content Quality",
      description: "Analysis of writing quality, impact statements, and professional language"
    },
    {
      icon: <Layers className="h-6 w-6" />,
      title: "Structure & Format",
      description: "Evaluation of layout, organization, and visual hierarchy"
    },
    {
      icon: <Eye className="h-6 w-6" />,
      title: "ATS Readability",
      description: "Compatibility check with Applicant Tracking Systems"
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Professional Impact",
      description: "Assessment of achievements, quantified results, and career progression"
    }
  ]

  const process = [
    {
      step: "1",
      title: "Upload Resume",
      description: "Upload your resume in PDF, DOC, DOCX, or TXT format",
      icon: <Upload className="h-6 w-6" />
    },
    {
      step: "2", 
      title: "AI Analysis",
      description: "Our AI analyzes content, structure, keywords, and ATS compatibility",
      icon: <Bot className="h-6 w-6" />
    },
    {
      step: "3",
      title: "Get Results",
      description: "Receive comprehensive scoring and actionable recommendations",
      icon: <BarChart3 className="h-6 w-6" />
    },
    {
      step: "4",
      title: "Improve & Iterate",
      description: "Apply suggestions and re-analyze to track improvements",
      icon: <TrendingUp className="h-6 w-6" />
    }
  ]

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* Header */}
      <div className="text-center mb-16">
        <Badge variant="outline" className="mb-4 bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800">
          🚀 How It Works
        </Badge>
        <h1 className="text-4xl lg:text-5xl font-bold mb-6">
          <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
            Powerful AI Analysis
          </span>
          <br />
          <span className="text-gray-900 dark:text-gray-100">
            For Your Resume
          </span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
          My comprehensive resume analysis tool uses advanced AI to evaluate every aspect of your resume 
          and provide actionable insights to help you land more interviews.
        </p>
      </div>

      {/* How It Works Process */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-gray-100">
          Simple 4-Step Process
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {process.map((item, index) => (
            <div key={index} className="text-center">
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white mx-auto mb-4">
                  {item.icon}
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {item.step}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Analysis Areas */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-gray-100">
          What We Analyze
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {analysisAreas.map((area, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white mx-auto mb-4">
                  {area.icon}
                </div>
                <CardTitle className="text-lg">{area.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center leading-relaxed">
                  {area.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-gray-100">
          Comprehensive Features
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {feature.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Analysis Results Preview */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-gray-100">
          Comprehensive Analysis Results
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Detailed Scoring & Insights
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              Get comprehensive feedback on every aspect of your resume with specific scores 
              and actionable recommendations for improvement.
            </p>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">Overall Assessment</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">ATS Compatibility</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">Content Quality</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">Industry Standards</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 shadow-2xl">
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Key Recommendations</h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Add 3 more technical skills relevant to your target role
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Quantify achievements with specific numbers and metrics
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Include 2-3 more action verbs to strengthen impact
                    </span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Strengths Identified</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300">
                    Great Structure
                  </Badge>
                  <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">
                    ATS Friendly
                  </Badge>
                  <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300">
                    Good Keywords
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 rounded-2xl p-12 text-white">
        <h2 className="text-3xl lg:text-4xl font-bold mb-6">
          Ready to Optimize Your Resume?
        </h2>
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Join professionals who have improved their job search success with this AI-powered analysis tool
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/register">
            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-3 text-lg">
              <Upload className="mr-2 h-5 w-5" />
              Analyze Your Resume
            </Button>
          </Link>
          <Link href="/login">
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 font-semibold px-8 py-3 text-lg">
              Sign In
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
        
        <p className="text-blue-200 mt-6 text-sm">
          ✨ Free analysis • ⚡ Instant results • 🔒 Completely secure
        </p>
      </section>
    </div>
  )
}
