import { NextResponse, type NextRequest } from "next/server"
import { z } from "zod"
import { getUsersRepo } from "@/lib/db"
import { rateLimit, clientIp } from "@/lib/auth"
import { generatePasswordResetEmail, sendEmail } from "@/lib/email"
import { randomUUID } from "crypto"

const schema = z.object({
  email: z.string().email(),
})

export async function POST(req: NextRequest) {
  const ip = clientIp(req)
  const rl = rateLimit(`forgot:${ip}`)
  if (!rl.allowed) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 })
  }

  const body = await req.json().catch(() => null)
  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload", details: parsed.error.flatten() }, { status: 400 })
  }
  const { email } = parsed.data

  const users = getUsersRepo()
  const user = await users.findByEmail(email)
  
  // Always return success to prevent email enumeration
  if (!user) {
    return NextResponse.json({ success: true })
  }

  // Generate reset token that expires in 1 hour
  const resetToken = randomUUID()
  const resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000).toISOString() // 1 hour from now

  // Update user with reset token
  await users.update(user.id, {
    resetToken,
    resetTokenExpiry
  })

  // Send password reset email
  try {
    const resetEmail = generatePasswordResetEmail(email, resetToken, user.name)
    await sendEmail(email, resetEmail)
  } catch (error) {
    console.error('Failed to send password reset email:', error)
    // Still return success to user - don't reveal email sending issues
  }

  return NextResponse.json({ success: true })
}
