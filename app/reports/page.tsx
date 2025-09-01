"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FileText, TrendingUp, Users, Target, Star, Calendar, Eye } from "lucide-react"

interface AnalysisReport {
  id: string
  userId: string
  createdAt: string
  scores: {
    overall: number
    skillsCoverage: number
    experienceRelevance: number
    atsReadiness: number
    impact: number
  }
  missingSkills: string[]
  recommendations: string[]
  textPreview?: string
}

export default function ReportsPage() {
  const [reports, setReports] = useState<AnalysisReport[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedReport, setSelectedReport] = useState<AnalysisReport | null>(null)

  useEffect(() => {
    loadReports()
  }, [])

  const loadReports = async () => {
    try {
      const token = localStorage.getItem("access_token")
      if (!token) {
        setError("Please log in to view reports")
        setLoading(false)
        return
      }

      const response = await fetch("/api/reports", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })

      if (!response.ok) {
        if (response.status === 401) {
          setError("Please log in to view reports")
        } else {
          setError("Failed to load reports")
        }
        setLoading(false)
        return
      }

      const data = await response.json()
      setReports(data.reports || [])
    } catch (err) {
      setError("Failed to load reports")
      console.error("Error loading reports:", err)
    } finally {
      setLoading(false)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreBadgeVariant = (score: number): "default" | "secondary" | "destructive" => {
    if (score >= 80) return "default"
    if (score >= 60) return "secondary"
    return "destructive"
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    })
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your reports...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Unable to Load Reports</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Button onClick={loadReports} className="bg-blue-600 hover:bg-blue-700">
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  if (reports.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">No Reports Yet</h2>
          <p className="text-gray-600 mb-6">Upload and analyze your first resume to see reports here.</p>
          <Button 
            onClick={() => window.location.href = '/upload'}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Upload Resume
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Analysis Reports</h1>
        <p className="text-gray-600">View and manage your resume analysis history</p>
      </div>

      <div className="grid gap-6">
        {reports.map((report) => (
          <Card key={report.id} className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <FileText className="h-8 w-8 text-blue-600" />
                  <div>
                    <h3 className="font-semibold">Resume Analysis</h3>
                    <p className="text-sm text-gray-600 flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(report.createdAt)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant={getScoreBadgeVariant(report.scores.overall)}>
                    {report.scores.overall}%
                  </Badge>
                  <Button 
                    onClick={() => setSelectedReport(report)} 
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div className="text-center">
                  <p className="text-sm text-gray-600">Skills</p>
                  <p className={`font-semibold ${getScoreColor(report.scores.skillsCoverage)}`}>
                    {report.scores.skillsCoverage}%
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Experience</p>
                  <p className={`font-semibold ${getScoreColor(report.scores.experienceRelevance)}`}>
                    {report.scores.experienceRelevance}%
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">ATS Ready</p>
                  <p className={`font-semibold ${getScoreColor(report.scores.atsReadiness)}`}>
                    {report.scores.atsReadiness}%
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Impact</p>
                  <p className={`font-semibold ${getScoreColor(report.scores.impact)}`}>
                    {report.scores.impact}%
                  </p>
                </div>
              </div>

              {report.textPreview && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700 line-clamp-2">
                    {report.textPreview}...
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Report Detail Modal */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Detailed Analysis Report</h2>
                <Button 
                  onClick={() => setSelectedReport(null)} 
                  variant="outline"
                  className="border-gray-300 hover:bg-gray-50"
                >
                  Close
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Target className="h-5 w-5 text-blue-600 mr-2" />
                    <span className="font-medium">Skills Coverage</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-600 mb-2">
                    {selectedReport.scores.skillsCoverage}%
                  </div>
                  <Progress value={selectedReport.scores.skillsCoverage} className="w-full" />
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Users className="h-5 w-5 text-green-600 mr-2" />
                    <span className="font-medium">Experience</span>
                  </div>
                  <div className="text-2xl font-bold text-green-600 mb-2">
                    {selectedReport.scores.experienceRelevance}%
                  </div>
                  <Progress value={selectedReport.scores.experienceRelevance} className="w-full" />
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <FileText className="h-5 w-5 text-purple-600 mr-2" />
                    <span className="font-medium">ATS Ready</span>
                  </div>
                  <div className="text-2xl font-bold text-purple-600 mb-2">
                    {selectedReport.scores.atsReadiness}%
                  </div>
                  <Progress value={selectedReport.scores.atsReadiness} className="w-full" />
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <TrendingUp className="h-5 w-5 text-orange-600 mr-2" />
                    <span className="font-medium">Impact</span>
                  </div>
                  <div className="text-2xl font-bold text-orange-600 mb-2">
                    {selectedReport.scores.impact}%
                  </div>
                  <Progress value={selectedReport.scores.impact} className="w-full" />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Missing Skills</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {selectedReport.missingSkills.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {selectedReport.missingSkills.map((skill, index) => (
                          <Badge key={index} variant="outline">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-600">No missing skills identified!</p>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Recommendations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-40">
                      {selectedReport.recommendations.length > 0 ? (
                        <ul className="space-y-2">
                          {selectedReport.recommendations.map((rec, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <Star className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{rec}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-600">Great job! No specific recommendations.</p>
                      )}
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
