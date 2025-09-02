import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { getUsersRepo } from "@/lib/db"
import { getBearerToken, verifyAccessToken, verifyPassword, hashPassword, rateLimit, clientIp } from "@/lib/auth"

const schema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z.string().min(8).max(128),
})

export async function POST(req: NextRequest) {
  const ip = clientIp(req)
  const rl = rateLimit(`change-pass:${ip}`)
  if (!rl.allowed) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 })
  }

  const token = getBearerToken(req)
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const payload = await verifyAccessToken(token)
    const userId = payload.sub as string

    const body = await req.json().catch(() => null)
    const parsed = schema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ 
        error: "Invalid payload", 
        details: parsed.error.flatten() 
      }, { status: 400 })
    }

    const { currentPassword, newPassword } = parsed.data
    const users = getUsersRepo()
    const user = await users.findById(userId)
    
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Verify current password
    const isCurrentPasswordValid = await verifyPassword(currentPassword, user.passwordHash)
    if (!isCurrentPasswordValid) {
      return NextResponse.json({ error: "Current password is incorrect" }, { status: 400 })
    }

    // Hash new password
    const newPasswordHash = await hashPassword(newPassword)
    
    // Update password
    const updatedUser = await users.update(userId, { passwordHash: newPasswordHash })
    if (!updatedUser) {
      return NextResponse.json({ error: "Failed to update password" }, { status: 500 })
    }

    return NextResponse.json({ message: "Password changed successfully" })
  } catch (error) {
    console.error("Change password error:", error)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
}
