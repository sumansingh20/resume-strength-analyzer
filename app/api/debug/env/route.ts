import { NextResponse } from "next/server"

export async function GET() {
  try {
    const accessSecret = process.env.JWT_ACCESS_SECRET
    const refreshSecret = process.env.JWT_REFRESH_SECRET
    const appName = process.env.NEXT_PUBLIC_APP_NAME
    
    return NextResponse.json({
      success: true,
      environment: {
        hasAccessSecret: !!accessSecret,
        hasRefreshSecret: !!refreshSecret,
        appName: appName || "Not set",
        accessSecretLength: accessSecret ? accessSecret.length : 0,
        refreshSecretLength: refreshSecret ? refreshSecret.length : 0,
        nodeEnv: process.env.NODE_ENV,
        timestamp: new Date().toISOString()
      }
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Environment check failed",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 })
  }
}
