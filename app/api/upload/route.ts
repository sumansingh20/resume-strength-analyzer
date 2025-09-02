import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    console.log('📤 DIRECT UPLOAD: Processing request')
    
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided' },
        { 
          status: 400,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          }
        }
      )
    }
    
    console.log('📄 File received:', file.name, file.size)
    
    // Mock analysis result
    const analysis = {
      success: true,
      message: 'Resume analysis completed successfully!',
      id: `report-${Date.now()}`,
      report: {
        id: `report-${Date.now()}`,
        userId: 'user-123',
        createdAt: new Date().toISOString(),
        scores: {
          overall: 87,
          skillsCoverage: 85,
          experienceRelevance: 88,
          atsReadiness: 92,
          impact: 83
        },
        missingSkills: ['Docker', 'Kubernetes', 'GraphQL', 'TypeScript'],
        recommendations: [
          'Add a dedicated Skills section with specific technologies',
          'Include quantified achievements with metrics',
          'Use clear section headings for ATS parsing',
          'Emphasize cloud technologies and DevOps practices'
        ],
        textPreview: `Analysis of ${file.name} (${(file.size / 1024).toFixed(1)}KB) completed successfully.`
      }
    }
    
    return NextResponse.json(analysis, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      }
    })
    
  } catch (error) {
    console.error('❌ Upload error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Upload processing failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        }
      }
    )
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}
