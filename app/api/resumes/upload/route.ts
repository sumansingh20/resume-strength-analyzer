import { NextResponse, type NextRequest } from "next/server"
import { getBearerToken, verifyAccessToken } from "@/lib/auth"
import { extractTextFromFile } from "@/lib/parser"
import { getReportsRepo } from "@/lib/reports"
import { getAnalyzer } from "@/lib/analysis/provider"
import { createAPIResponse, createCORSResponse } from "@/lib/api-utils"

export const runtime = "nodejs" 

export async function OPTIONS() {
  return createCORSResponse()
} 

export async function POST(req: NextRequest) {
  console.log("📄 Upload request received")
  
  // Auth required
  const token = getBearerToken(req)
  if (!token) {
    console.log("❌ No token provided")
    return NextResponse.json({ error: "Unauthorized", success: false }, { 
      status: 401,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      }
    })
  }
  let sub = ""
  try {
    const payload = await verifyAccessToken(token)
    sub = String(payload.sub)
    console.log("✅ User authenticated:", sub)
  } catch (error) {
    console.log("❌ Token verification failed:", error)
    return NextResponse.json({ error: "Unauthorized", success: false }, { 
      status: 401,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      }
    })
  }

  const form = await req.formData().catch((err) => {
    console.log("❌ Failed to parse form data:", err)
    return null
  })
  if (!form) {
    console.log("❌ Invalid form data received")
    return NextResponse.json({ error: "Invalid form data", success: false }, { 
      status: 400,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      }
    })
  }
  
  const file = form.get("file")
  if (!(file instanceof File)) {
    console.log("❌ No file found in form data")
    return NextResponse.json({ error: "Missing file", success: false }, { 
      status: 400,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      }
    })
  }
  
  console.log("📁 File received:", file.name, "Size:", file.size, "Type:", file.type)
  if (file.size > 6_000_000) {
    console.log("❌ File too large:", file.size)
    return NextResponse.json({ error: "File too large (max 6MB)", success: false }, { 
      status: 413,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      }
    })
  }
  const allowed = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "text/plain",
  ]
  if (file.type && !allowed.includes(file.type)) {
    console.log("❌ Unsupported file type:", file.type)
    return NextResponse.json({ error: "Unsupported file type", success: false }, { 
      status: 415,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      }
    })
  }

  console.log("🔍 Starting text extraction...")
  try {
    const text = await extractTextFromFile(file)
    console.log("✅ Text extracted successfully, length:", text.length)
    
    console.log("📊 Starting analysis...")
    const analyzer = getAnalyzer()
    const analysis = analyzer.analyze(text)
    console.log("✅ Analysis completed:", analysis.scores)
    
    console.log("💾 Saving report...")
    const repo = getReportsRepo()
    const saved = repo.create(sub, {
      scores: analysis.scores,
      missingSkills: analysis.missingSkills,
      recommendations: analysis.recommendations,
      textPreview: text.slice(0, 600),
    })
    console.log("✅ Report saved with ID:", saved.id)

    return createAPIResponse({ id: saved.id, report: saved })
  } catch (error) {
    console.error("❌ Upload processing failed:", error)
    return NextResponse.json({ 
      error: "Failed to process file: " + (error instanceof Error ? error.message : "Unknown error"),
      success: false 
    }, { 
      status: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      }
    })
  }
}
