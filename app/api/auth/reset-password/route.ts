import { NextResponse, type NextRequest } from "next/server"
import { z } from "zod"
import { getUsersRepo } from "@/lib/db"
import { hashPassword, rateLimit, clientIp } from "@/lib/auth"

const schema = z.object({
  token: z.string().min(1),
  password: z.string().min(8).max(128),
})

export async function POST(req: NextRequest) {
  const ip = clientIp(req)
  const rl = rateLimit(`reset:${ip}`)
  if (!rl.allowed) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 })
  }

  const body = await req.json().catch(() => null)
  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload", details: parsed.error.flatten() }, { status: 400 })
  }
  const { token, password } = parsed.data

  const users = getUsersRepo()
  const user = await users.findByResetToken(token)
  
  if (!user || !user.resetToken || !user.resetTokenExpiry) {
    return NextResponse.json({ error: "Invalid or expired reset token" }, { status: 400 })
  }

  // Check if token has expired
  const now = new Date()
  const expiry = new Date(user.resetTokenExpiry)
  if (now > expiry) {
    return NextResponse.json({ error: "Reset token has expired" }, { status: 400 })
  }

  // Hash new password
  const passwordHash = await hashPassword(password)

  // Update user with new password and clear reset token
  await users.update(user.id, {
    passwordHash,
    resetToken: undefined,
    resetTokenExpiry: undefined
  })

  return NextResponse.json({ success: true })
}
