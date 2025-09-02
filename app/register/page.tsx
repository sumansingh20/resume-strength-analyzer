"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export default function RegisterPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    
    try {
      if (!email || !password || !name) throw new Error("All fields are required")
      if (password !== confirmPassword) throw new Error("Passwords do not match")
      if (password.length < 8) throw new Error("Password must be at least 8 characters")
      
      // Real API call to register endpoint
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name }),
      })

      // Check if response is JSON
      const contentType = response.headers.get("content-type")
      if (!contentType?.includes("application/json")) {
        throw new Error("Server returned invalid response format")
      }

      let data
      try {
        data = await response.json()
      } catch (jsonError) {
        console.error("JSON parsing error:", jsonError)
        throw new Error("Failed to parse server response")
      }

      if (!response.ok) {
        // Handle specific error cases
        if (response.status === 409 && data.error === "Email already in use") {
          throw new Error("This email is already registered. Please use a different email or try logging in instead.")
        }
        throw new Error(data.error || `Registration failed (${response.status})`)
      }

      if (!data.success) {
        throw new Error(data.error || "Registration failed")
      }
      
      // Store the access token
      if (data.accessToken) {
        localStorage.setItem("access_token", data.accessToken)
      }
      
      // Redirect to dashboard page
      window.location.href = "/dashboard"
      
    } catch (err: any) {
      console.error("Registration error:", err)
      const errorMessage = err?.message || "Registration failed. Please try again."
      setError(errorMessage)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4">
      <div className="mx-auto max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold gradient-text">Create Account</h1>
          <p className="text-muted-foreground">Join thousands of users improving their resumes with AI</p>
        </div>

        {/* Registration Form */}
        <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl border p-8">
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
              {error}
              {error.includes("already registered") && (
                <div className="mt-2 pt-2 border-t border-destructive/20">
                  <Link href="/login" className="text-primary hover:underline font-medium">
                    Go to login page →
                  </Link>
                </div>
              )}
            </div>
          )}
          
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
              <Input 
                id="name" 
                type="text" 
                placeholder="Your Name"
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
                className="h-11"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="Enter your email address"
                value={email} 
                onChange={(e) => {
                  setEmail(e.target.value)
                  // Clear error when user starts typing a new email
                  if (error?.includes("already registered")) {
                    setError(null)
                  }
                }} 
                required 
                className="h-11"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a secure password (8+ characters)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-11"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Repeat your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="h-11"
              />
            </div>

            <Button 
              type="submit"
              disabled={loading} 
              className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline font-medium">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
