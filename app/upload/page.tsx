"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, Tooltip } from "recharts"
import { authHeader } from "@/lib/api"

type AnalysisReport = {
  scores: {
    overall: number
    skillsCoverage: number
    experienceRelevance: number
    atsReadiness: number
    impact: number
  }
  missingSkills: string[]
  recommendations: string[]
}

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [status, setStatus] = useState<string>("")
  const [report, setReport] = useState<AnalysisReport | null>(null)
  const [userName, setUserName] = useState<string>("")
  const router = useRouter()

  useEffect(() => {
    // Check authentication and get user info
    const token = localStorage.getItem("access_token")
    if (!token) {
      router.push("/login")
      return
    }
    
    // Try to get user info from token or API
    fetchUserInfo()
  }, [router])

  const fetchUserInfo = async () => {
    try {
      const response = await fetch("/api/users/me", {
        headers: authHeader()
      })
      if (response.ok) {
        const user = await response.json()
        setUserName(user.name || user.email)
      }
    } catch (error) {
      console.error("Failed to fetch user info:", error)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("access_token")
    router.push("/login")
  }

  const getStatusClasses = (status: string) => {
    if (status.includes("Error")) return "bg-destructive/10 text-destructive"
    if (status.includes("complete")) return "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
    return "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
  }

  const getScoreWidth = (score: number) => {
    if (score >= 90) return 'w-full'
    if (score >= 80) return 'w-4/5'
    if (score >= 70) return 'w-3/5'
    if (score >= 60) return 'w-2/5'
    if (score >= 50) return 'w-1/5'
    return 'w-1/12'
  }

  async function analyze() {
    if (!file) return
    setStatus("Uploading and analyzing...")
    setReport(null)
    
    try {
      // Check if user is authenticated
      const token = localStorage.getItem("access_token")
      if (!token) {
        setStatus("Error: Please log in first")
        return
      }
      
      console.log("🔑 Token found:", token ? "Yes" : "No")
      console.log("📁 File:", file.name, file.size, file.type)
      
      const form = new FormData()
      form.append("file", file)
      
      const headers = authHeader()
      console.log("📤 Headers:", headers)
      
      const res = await fetch("/api/resumes/upload", {
        method: "POST",
        headers: headers, // Content-Type omitted for multipart
        body: form,
      })
      
      if (res.ok) {
        const data = await res.json()
        setReport(data.report)
        setStatus(`Analysis complete. Overall: ${data.report.scores.overall}%`)
        return
      }
      
      // Handle errors
      const errorData = await res.json().catch(() => ({}))
      throw new Error(errorData?.error || `HTTP ${res.status}: ${res.statusText}`)
      
    } catch (err: any) {
      setReport(null)
      setStatus(`Error: ${err?.message || "Upload failed"}`)
    }
  }

  const radarData = report
    ? [
        { metric: "Skills", score: report.scores.skillsCoverage },
        { metric: "Experience", score: report.scores.experienceRelevance },
        { metric: "ATS", score: report.scores.atsReadiness },
        { metric: "Impact", score: report.scores.impact },
      ]
    : []

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      {/* Navigation Header */}
      <div className="flex justify-between items-center border-b pb-4">
        <div>
          <h1 className="text-2xl font-bold">Resume Analyzer</h1>
          {userName && <p className="text-sm text-muted-foreground">Welcome, {userName}</p>}
        </div>
        <Button variant="outline" onClick={handleLogout}>
          Logout
        </Button>
      </div>

      {/* Header Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold gradient-text">Upload & Analyze Resume</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Get instant AI-powered analysis of your resume with detailed scoring, skill gap analysis, and personalized recommendations.
        </p>
      </div>

      {/* Upload Section */}
      <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl border p-8">
        <div className="grid gap-6">
          <div className="space-y-2">
            <Label htmlFor="resume" className="text-lg font-semibold">Choose Your Resume</Label>
            <p className="text-sm text-muted-foreground">
              Supported formats: PDF, DOC, DOCX, TXT (Maximum size: 6MB)
            </p>
          </div>
          
          <div className="relative">
            <Input
              id="resume"
              type="file"
              accept=".pdf,.doc,.docx,.txt,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="cursor-pointer file:cursor-pointer file:rounded-lg file:border-0 file:bg-primary file:text-primary-foreground file:px-4 file:py-2 file:mr-4 hover:file:bg-primary/90 transition-colors"
            />
          </div>
          
          {file && (
            <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-bold text-sm">📄</span>
              </div>
              <div className="flex-1">
                <p className="font-medium">{file.name}</p>
                <p className="text-sm text-muted-foreground">
                  {(file.size / 1024 / 1024).toFixed(2)} MB • {file.type || 'Unknown type'}
                </p>
              </div>
            </div>
          )}
          
          <Button
            size="lg"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-6"
            onClick={analyze}
            disabled={!file}
            aria-disabled={!file}
          >
            {status.includes("Uploading") || status.includes("Running") ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                Analyzing Resume...
              </>
            ) : (
              "🚀 Analyze Resume"
            )}
          </Button>
          
          {status && (
            <div className={`text-center p-3 rounded-lg ${getStatusClasses(status)}`}>
              {status}
            </div>
          )}
        </div>
      </div>

      {/* Results Section */}
      {report && (
        <div className="grid gap-8 md:grid-cols-2">
          {/* Radar Chart */}
          <div className="bg-card rounded-xl border p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              📊 Performance Breakdown
            </h2>
            <div className="h-80">
              <ResponsiveContainer>
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="metric" />
                  <Tooltip />
                  <Radar dataKey="score" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.2} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 text-center">
              <div className="text-3xl font-bold text-primary">{report.scores.overall}%</div>
              <p className="text-sm text-muted-foreground">Overall Strength Score</p>
            </div>
          </div>

          {/* Analysis Details */}
          <div className="bg-card rounded-xl border p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              🎯 Detailed Analysis
            </h2>
            
            {/* Individual Scores */}
            <div className="space-y-3 mb-6">
              {[
                { label: "Skills Coverage", score: report.scores.skillsCoverage, icon: "🔧" },
                { label: "Experience Relevance", score: report.scores.experienceRelevance, icon: "💼" },
                { label: "ATS Readiness", score: report.scores.atsReadiness, icon: "🤖" },
                { label: "Impact & Results", score: report.scores.impact, icon: "📈" }
              ].map(({ label, score, icon }) => (
                <div key={label} className="flex items-center justify-between">
                  <span className="text-sm font-medium flex items-center gap-2">
                    <span>{icon}</span>
                    {label}
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                      <div className={`h-full bg-primary transition-all duration-500 ${getScoreWidth(score)}`} />
                    </div>
                    <span className="text-sm font-bold w-8">{score}%</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Missing Skills */}
            <div className="mb-4">
              <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
                ⚠️ Skills to Add
              </h3>
              <div className="flex flex-wrap gap-2">
                {report.missingSkills.length > 0 ? (
                  report.missingSkills.map((skill) => (
                    <span key={skill} className="px-2 py-1 bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400 rounded-md text-xs">
                      {skill}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-muted-foreground">No missing skills identified</span>
                )}
              </div>
            </div>

            {/* Recommendations */}
            <div>
              <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
                💡 Recommendations
              </h3>
              <ul className="space-y-2">
                {report.recommendations.map((rec) => (
                  <li key={rec.slice(0, 20)} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">•</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
