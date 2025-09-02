import { NextResponse, type NextRequest } from "next/server"

export const runtime = "nodejs" 

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}

export async function POST(req: NextRequest) {
  try {
    console.log("📄 Working Upload request received")
    
    // Parse form data to test file upload
    const formData = await req.formData().catch(() => null)
    
    if (!formData) {
      return NextResponse.json({ 
        success: false,
        error: "No form data received"
      }, { status: 400 })
    }
    
    const file = formData.get('file')
    
    if (!file || !(file instanceof File)) {
      return NextResponse.json({ 
        success: false,
        error: "No file uploaded"
      }, { status: 400 })
    }
    
    // Return file info for now
    return NextResponse.json({ 
      success: true,
      message: "File upload successful (test mode)",
      file: {
        name: file.name,
        size: file.size,
        type: file.type
      },
      id: "test-report-" + Date.now(),
      report: {
        id: "test-report-" + Date.now(),
        scores: {
          overall: 75,
          skillsCoverage: 80,
          experienceRelevance: 70,
          atsReadiness: 75,
          impact: 75
        },
        missingSkills: ["React", "Node.js", "AWS"],
        recommendations: ["Add more technical skills", "Include quantified achievements"]
      }
    }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      }
    })
  } catch (error) {
    console.error("❌ Working Upload error:", error)
    return NextResponse.json({ 
      success: false,
      error: "Upload processing failed",
      details: error instanceof Error ? error.message : 'Unknown error'
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
