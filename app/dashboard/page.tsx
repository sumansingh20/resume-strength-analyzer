"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Upload, User, LogOut, AlertCircle, CheckCircle } from "lucide-react"

type User = {
  id: string
  email: string
  name?: string
  role: "user" | "admin"
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("access_token")
      console.log("Token check:", token ? `${token.substring(0, 20)}...` : 'No token')
      
      if (!token) {
        setError("No authentication token found. Please log in.")
        setLoading(false)
        return
      }

      console.log("Making request to /api/users/me...")
      const response = await fetch("/api/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      console.log("Response status:", response.status)

      if (response.ok) {
        const userData = await response.json()
        console.log("User data received:", userData)
        setUser(userData)
        setError("") // Clear any previous errors
      } else {
        const errorText = await response.text()
        console.error("API Error:", response.status, errorText)
        
        localStorage.removeItem("access_token")
        
        if (response.status === 401) {
          setError("Session expired. Please log in again.")
        } else if (response.status === 404) {
          setError("User not found. Please register or contact support.")
        } else {
          setError(`Authentication failed: ${errorText}`)
        }
      }
    } catch (err) {
      console.error("Auth check error:", err)
      setError("Failed to verify authentication. Please check your connection.")
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("access_token")
    setUser(null)
    router.push("/")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full space-y-6 p-6">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-orange-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold">Authentication Required</h2>
            <p className="text-muted-foreground mt-2">
              You need to be logged in to access this dashboard.
            </p>
            {error && (
              <p className="text-sm text-red-600 mt-2">{error}</p>
            )}
          </div>
          
          <div className="space-y-4">
            <Button 
              onClick={checkAuth} 
              variant="outline" 
              className="w-full"
              disabled={loading}
            >
              {loading ? "Checking..." : "Retry Authentication"}
            </Button>
            <Link href="/login">
              <Button className="w-full" size="lg">
                Sign In
              </Button>
            </Link>
            <Link href="/register">
              <Button variant="outline" className="w-full" size="lg">
                Create Account
              </Button>
            </Link>
            <Link href="/">
              <Button variant="ghost" className="w-full">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Welcome back, {user.name || user.email}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant={user.role === "admin" ? "default" : "secondary"}>
            {user.role === "admin" ? "Admin" : "User"}
          </Badge>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>

      {/* Success Status */}
      <Card className="mb-6 border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800">
        <CardContent className="pt-6">
          <div className="flex items-center">
            <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
            <div>
              <p className="font-medium text-green-900 dark:text-green-100">
                Authentication Successful
              </p>
              <p className="text-sm text-green-700 dark:text-green-300">
                You are successfully logged in and can now access all features.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-6 md:grid-cols-2 mb-8">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Upload className="h-5 w-5 mr-2 text-blue-600" />
              Analyze Resume
            </CardTitle>
            <CardDescription>
              Upload and analyze your resume to get insights and recommendations.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/upload">
              <Button className="w-full">
                Upload Resume
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="h-5 w-5 mr-2 text-purple-600" />
              Account Info
            </CardTitle>
            <CardDescription>
              Your account details and current session information.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-sm">
              <span className="font-medium">Email:</span> {user.email}
            </div>
            {user.name && (
              <div className="text-sm">
                <span className="font-medium">Name:</span> {user.name}
              </div>
            )}
            <div className="text-sm">
              <span className="font-medium">Role:</span> {user.role}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Getting Started */}
      <Card>
        <CardHeader>
          <CardTitle>Getting Started</CardTitle>
          <CardDescription>
            Follow these steps to analyze your first resume
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
              1
            </div>
            <div>
              <p className="font-medium">Upload Your Resume</p>
              <p className="text-sm text-muted-foreground">
                Click "Upload Resume" above and select your PDF, DOC, or DOCX file (max 6MB).
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
              2
            </div>
            <div>
              <p className="font-medium">Get Instant Analysis</p>
              <p className="text-sm text-muted-foreground">
                Our AI will analyze your resume and provide scores for skills, experience, ATS readiness, and impact.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
              3
            </div>
            <div>
              <p className="font-medium">Review Recommendations</p>
              <p className="text-sm text-muted-foreground">
                Get personalized suggestions to improve your resume and increase your chances of landing interviews.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
