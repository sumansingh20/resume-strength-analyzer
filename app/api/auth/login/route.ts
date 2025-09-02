import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { getUsersRepo } from "@/lib/db"
import { verifyPassword, signAccessToken, signRefreshToken, rateLimit, clientIp } from "@/lib/auth"
import { generateLoginNotificationEmail, sendEmail } from "@/lib/email"
import { handleAPIError, createAPIResponse, createCORSResponse } from "@/lib/api-utils"

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(128),
})

export async function OPTIONS() {
  return createCORSResponse()
}

export async function POST(req: NextRequest) {
  try {
    const ip = clientIp(req)
    const rl = rateLimit(`login:${ip}`)
    if (!rl.allowed) {
      return NextResponse.json({ error: "Too many requests", success: false }, { status: 429 })
    }

    const body = await req.json().catch(() => null)
    const parsed = schema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ 
        error: "Invalid payload", 
        details: parsed.error.flatten(),
        success: false 
      }, { status: 400 })
    }
    const { email, password } = parsed.data

    const users = getUsersRepo()
    const user = await users.findByEmail(email)
    
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials", success: false }, { status: 401 })
    }

    const ok = await verifyPassword(password, user.passwordHash)
    if (!ok) {
      return NextResponse.json({ error: "Invalid credentials", success: false }, { status: 401 })
    }

    const accessToken = await signAccessToken({ id: user.id, email: user.email, name: user.name, role: user.role })
    const refreshToken = await signRefreshToken({ id: user.id, email: user.email, name: user.name, role: user.role })

    // Send login notification email
    try {
      const loginEmail = generateLoginNotificationEmail(
        user.email, 
        new Date(), 
        req.headers.get('user-agent') || undefined
      )
      await sendEmail(user.email, loginEmail)
    } catch (error) {
      console.error('Failed to send login notification email:', error)
      // Don't fail login if email fails
    }

    const res = createAPIResponse({
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
      accessToken,
    })
    
    res.cookies.set("refresh_token", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    })
    
    return res
  } catch (error) {
    return handleAPIError(error)
  }
}
