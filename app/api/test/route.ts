import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    success: true,
    message: "Server is working!",
    timestamp: new Date().toISOString(),
    status: "OK"
  })
}

export async function POST() {
  return NextResponse.json({
    success: true,
    message: "POST endpoint working!",
    timestamp: new Date().toISOString()
  })
}
