import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({ ok: true, service: "resume-strength-analyzer", ts: Date.now() })
}
