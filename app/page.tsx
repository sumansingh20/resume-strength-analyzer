"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("access_token")
    if (token) {
      router.push("/upload")
    } else {
      router.push("/login")
    }
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Resume Analyzer</h1>
        <p className="text-muted-foreground">Redirecting...</p>
      </div>
    </div>
  )
}
