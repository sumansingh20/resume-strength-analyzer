import { NextResponse, type NextRequest } from "next/server"
import { z } from "zod"
import { getUsersRepo } from "@/lib/db"
import { hashPassword, rateLimit, clientIp, signAccessToken, signRefreshToken } from "@/lib/auth"
import { generateWelcomeEmail, sendEmail } from "@/lib/email"

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(128),
  name: z.string().min(1).max(120).optional(),
})

export async function POST(req: NextRequest) {
  const ip = clientIp(req)
  const rl = rateLimit(`reg:${ip}`)
  if (!rl.allowed) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 })
  }

  const body = await req.json().catch(() => null)
  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload", details: parsed.error.flatten() }, { status: 400 })
  }
  const { email, password, name } = parsed.data

  const users = getUsersRepo()
  const existing = await users.findByEmail(email)
  if (existing) {
    return NextResponse.json({ error: "Email already in use" }, { status: 409 })
  }

  const allUsers = await users.getAll()
  const role = allUsers.length === 0 ? "admin" : "user"

  const passwordHash = await hashPassword(password)
  const created = await users.create({ email, name, role, passwordHash })

  // Send welcome email
  try {
    const welcomeEmail = generateWelcomeEmail(email, name)
    await sendEmail(email, welcomeEmail)
  } catch (error) {
    console.error('Failed to send welcome email:', error)
    // Don't fail registration if email fails
  }

  const accessToken = await signAccessToken({
    id: created.id,
    email: created.email,
    name: created.name,
    role: created.role,
  })

  const refreshToken = await signRefreshToken({
    id: created.id,
    email: created.email,
    name: created.name,
    role: created.role,
  })

  const res = NextResponse.json({
    user: { id: created.id, email: created.email, name: created.name, role: created.role },
    accessToken,
  })
  res.cookies.set("refresh_token", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30d
  })
  return res
}
