import { NextResponse } from "next/server"
import { getUsersRepo } from "@/lib/db"

export async function GET() {
  try {
    const users = getUsersRepo()
    const allUsers = await users.getAll()
    
    return NextResponse.json({
      success: true,
      message: "Database status - Simple version",
      userCount: allUsers.length,
      users: allUsers.map(user => ({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        createdAt: user.createdAt
      })),
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error("Debug users error:", error)
    return NextResponse.json({
      success: false,
      error: "Failed to get users",
      details: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}

export async function POST() {
  try {
    const users = getUsersRepo()
    
    // Check if test user already exists
    const existing = await users.findByEmail("harshita@iitp.ac.in")
    if (existing) {
      return NextResponse.json({
        success: true,
        message: "Test user already exists",
        user: {
          id: existing.id,
          email: existing.email,
          name: existing.name,
          role: existing.role
        }
      })
    }
    
    // Create test user with simple hash
    const created = await users.create({
      email: "harshita@iitp.ac.in",
      name: "Harshita",
      role: "user",
      passwordHash: "$2a$10$simplified.hash.for.testing.purposes.only.replace.with.real.hash"
    })
    
    return NextResponse.json({
      success: true,
      message: "Test user created successfully (with simplified auth)",
      user: {
        id: created.id,
        email: created.email,
        name: created.name,
        role: created.role,
        createdAt: created.createdAt
      },
      note: "User created for testing. Use registration for proper authentication."
    })
  } catch (error) {
    console.error("Create user error:", error)
    return NextResponse.json({
      success: false,
      error: "Failed to create test user",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 })
  }
}
