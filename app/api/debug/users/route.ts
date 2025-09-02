import { NextResponse } from "next/server"
import { getUsersRepo } from "@/lib/db"
import { hashPassword } from "@/lib/auth"

export async function GET() {
  try {
    const users = getUsersRepo()
    const allUsers = await users.getAll()
    
    return NextResponse.json({
      success: true,
      message: "Database status",
      userCount: allUsers.length,
      users: allUsers.map(user => ({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        createdAt: user.createdAt
      }))
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Failed to get users",
      details: error instanceof Error ? error.message : "Unknown error"
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
    
    // Create test user
    const passwordHash = await hashPassword("Harshita@123")
    const created = await users.create({
      email: "harshita@iitp.ac.in",
      name: "Harshita",
      role: "user",
      passwordHash
    })
    
    // Also create some additional test users for demonstration
    try {
      await users.create({
        email: "test@example.com",
        name: "Test User",
        role: "user",
        passwordHash: await hashPassword("TestPass123")
      })
    } catch {
      // Ignore if user already exists
    }
    
    return NextResponse.json({
      success: true,
      message: "Test user created successfully",
      user: {
        id: created.id,
        email: created.email,
        name: created.name,
        role: created.role,
        createdAt: created.createdAt
      }
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Failed to create test user",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 })
  }
}
