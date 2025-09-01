import { type NextRequest, NextResponse } from "next/server"
import { verifyRefreshToken, signAccessToken } from "@/lib/auth"

export async function POST(req: NextRequest) {
  const cookieToken = req.cookies.get("refresh_token")?.value
  const body = await req.json().catch(() => ({}))
  const token: string | undefined = body?.refreshToken || cookieToken
  if (!token) {
    return NextResponse.json({ error: "Missing refresh token" }, { status: 400 })
  }
  try {
    const payload = await verifyRefreshToken(token)
    const sub = payload.sub as string
    const email = (payload as any).email as string | undefined
    const name = (payload as any).name as string | undefined
    const role = ((payload as any).role as "user" | "admin") || "user"
    const accessToken = await signAccessToken({ id: sub, email: email ?? "", name, role })
    return NextResponse.json({ accessToken })
  } catch {
    return NextResponse.json({ error: "Invalid refresh token" }, { status: 401 })
  }
}
