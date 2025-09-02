import { NextResponse, type NextRequest } from "next/server"
import { getBearerToken, verifyAccessToken } from "@/lib/auth"
import { createAPIResponse, createCORSResponse } from "@/lib/api-utils"

export const runtime = "nodejs" 

export async function OPTIONS() {
  return createCORSResponse()
}

export async function POST(req: NextRequest) {
  console.log("📄 Simple upload request received")
  
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
  
  // Return success without processing the file for testing
  return createAPIResponse({ 
    message: "File uploaded successfully (test mode)",
    file: {
      name: file.name,
      size: file.size,
      type: file.type
    },
    userId: sub
  })
}
