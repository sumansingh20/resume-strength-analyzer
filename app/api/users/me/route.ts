import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { getUsersRepo } from "@/lib/db"
import { getBearerToken, verifyAccessToken } from "@/lib/auth"

const updateSchema = z.object({
  name: z.string().min(1).max(120).optional(),
  email: z.string().email().optional(),
})

export async function GET(req: NextRequest) {
  const token = getBearerToken(req)
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  try {
    const payload = await verifyAccessToken(token)
    const sub = payload.sub as string
    const users = getUsersRepo()
    const user = await users.findById(sub)
    if (!user) return NextResponse.json({ error: "Not found" }, { status: 404 })
    return NextResponse.json({ id: user.id, email: user.email, name: user.name, role: user.role })
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
}

export async function PATCH(req: NextRequest) {
  const token = getBearerToken(req)
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const payload = await verifyAccessToken(token)
    const userId = payload.sub as string

    const body = await req.json().catch(() => null)
    const parsed = updateSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ 
        error: "Invalid payload", 
        details: parsed.error.flatten() 
      }, { status: 400 })
    }

    const { name, email } = parsed.data
    const users = getUsersRepo()
    
    if (email) {
      const existingUser = await users.findByEmail(email)
      if (existingUser && existingUser.id !== userId) {
        return NextResponse.json({ 
          error: "Email already in use" 
        }, { status: 409 })
      }
    }

    // Update user
    const updateData: any = {}
    if (name !== undefined) updateData.name = name
    if (email !== undefined) updateData.email = email

    const updatedUser = await users.update(userId, updateData)
    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({
      id: updatedUser.id,
      email: updatedUser.email,
      name: updatedUser.name,
      role: updatedUser.role
    })
  } catch (error) {
    console.error("Profile update error:", error)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
}
