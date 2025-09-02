import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    success: true,
    message: "Registration endpoint check",
    available: true,
    timestamp: new Date().toISOString()
  })
}

export async function POST() {
  try {
    return NextResponse.json({
      success: true,
      message: "Registration temporarily bypassed for testing",
      user: {
        id: "test-123",
        email: "test@example.com",
        name: "Test User",
        role: "user"
      },
      accessToken: "test-token-will-be-replaced",
      note: "This is a test response. Use the main registration for real accounts."
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Registration test failed",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 })
  }
}
