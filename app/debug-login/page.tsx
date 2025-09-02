"use client"

import { useState } from "react"

export default function DebugLoginPage() {
  const [result, setResult] = useState("")

  const testLogin = async () => {
    setResult("Testing...")
    
    try {
      console.log("Starting login test...")
      
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "suman@iitp.ac.in",
          password: "Khushi@1234"
        })
      })

      console.log("Response status:", response.status)
      console.log("Response headers:", Object.fromEntries(response.headers.entries()))

      if (!response.ok) {
        const errorText = await response.text()
        console.error("Error response:", errorText)
        setResult(`Error ${response.status}: ${errorText}`)
        return
      }

      const data = await response.json()
      console.log("Success data:", data)
      
      // Test localStorage
      localStorage.setItem("access_token", data.accessToken)
      const stored = localStorage.getItem("access_token")
      
      setResult(`SUCCESS!\nUser: ${JSON.stringify(data.user, null, 2)}\nToken stored: ${stored ? 'YES' : 'NO'}\nToken length: ${data.accessToken?.length || 0}`)
      
    } catch (error) {
      console.error("Fetch error:", error)
      setResult(`Fetch Error: ${error.message}`)
    }
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h1>Login Debug Test</h1>
      <button onClick={testLogin} style={{ padding: '10px 20px', margin: '10px 0' }}>
        Test Login with suman@iitp.ac.in
      </button>
      <pre style={{ background: '#f5f5f5', padding: '10px', whiteSpace: 'pre-wrap' }}>
        {result}
      </pre>
      <div>
        <h3>Browser Info:</h3>
        <p>User Agent: {typeof window !== 'undefined' ? navigator.userAgent : 'N/A'}</p>
        <p>Local Storage Available: {typeof window !== 'undefined' && window.localStorage ? 'YES' : 'NO'}</p>
      </div>
    </div>
  )
}
