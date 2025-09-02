"use client"

import { useState } from "react"

export default function AuthDebugPage() {
  const [results, setResults] = useState<string[]>([])

  const addLog = (message: string) => {
    setResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`])
  }

  const testAuth = async () => {
    setResults([])
    addLog("Starting authentication test...")

    try {
      // Step 1: Check if token exists
      const existingToken = localStorage.getItem("access_token")
      addLog(`Existing token: ${existingToken ? `${existingToken.substring(0, 20)}...` : 'None'}`)

      // Step 2: Login
      addLog("Attempting login...")
      const loginResponse = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "suman@iitp.ac.in",
          password: "Khushi@1234"
        })
      })

      addLog(`Login response status: ${loginResponse.status}`)

      if (!loginResponse.ok) {
        const errorText = await loginResponse.text()
        addLog(`Login error: ${errorText}`)
        return
      }

      const loginData = await loginResponse.json()
      addLog(`Login successful! User: ${loginData.user.email}`)
      addLog(`Token length: ${loginData.accessToken.length}`)

      // Step 3: Store token
      localStorage.setItem("access_token", loginData.accessToken)
      addLog("Token stored in localStorage")

      // Step 4: Test /api/users/me
      addLog("Testing /api/users/me...")
      const userResponse = await fetch("/api/users/me", {
        headers: {
          Authorization: `Bearer ${loginData.accessToken}`,
        },
      })

      addLog(`Users/me response status: ${userResponse.status}`)

      if (userResponse.ok) {
        const userData = await userResponse.json()
        addLog(`User data retrieved: ${JSON.stringify(userData)}`)
      } else {
        const errorText = await userResponse.text()
        addLog(`Users/me error: ${errorText}`)
      }

    } catch (error) {
      addLog(`Error: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  const testDashboardFlow = async () => {
    addLog("Testing dashboard authentication flow...")
    
    try {
      const token = localStorage.getItem("access_token")
      if (!token) {
        addLog("No token found in localStorage")
        return
      }

      addLog(`Using token: ${token.substring(0, 20)}...`)

      const response = await fetch("/api/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      addLog(`Dashboard auth check status: ${response.status}`)

      if (response.ok) {
        const userData = await response.json()
        addLog(`Dashboard auth success: ${JSON.stringify(userData)}`)
      } else {
        const errorText = await response.text()
        addLog(`Dashboard auth failed: ${errorText}`)
        
        // Check if it's a 404 or other error
        if (response.status === 404) {
          addLog("ERROR: API endpoint not found - this suggests routing issue")
        } else if (response.status === 401) {
          addLog("ERROR: Token invalid or expired")
        }
      }
    } catch (error) {
      addLog(`Dashboard test error: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  return (
    <div className="container mx-auto p-8 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Authentication Debug</h1>
      
      <div className="space-y-4 mb-6">
        <button 
          onClick={testAuth}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Test Full Auth Flow
        </button>
        
        <button 
          onClick={testDashboardFlow}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 ml-4"
        >
          Test Dashboard Auth
        </button>
      </div>

      <div className="bg-gray-100 p-4 rounded max-h-96 overflow-y-auto">
        <h3 className="font-semibold mb-2">Debug Log:</h3>
        {results.length === 0 ? (
          <p>Click a button to start testing...</p>
        ) : (
          <pre className="text-sm">
            {results.join('\n')}
          </pre>
        )}
      </div>
    </div>
  )
}
