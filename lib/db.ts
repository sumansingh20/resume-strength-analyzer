import { randomUUID } from "crypto"

export type UserRecord = {
  id: string
  email: string
  name?: string
  role: "user" | "admin"
  passwordHash: string
  resetToken?: string
  resetTokenExpiry?: string
  bio?: string
  location?: string
  website?: string
  createdAt: string
  updatedAt: string
}

export interface UsersRepo {
  findByEmail(email: string): Promise<UserRecord | null>
  findById(id: string): Promise<UserRecord | null>
  findByResetToken(token: string): Promise<UserRecord | null>
  create(data: Omit<UserRecord, "id" | "createdAt" | "updatedAt">): Promise<UserRecord>
  update(id: string, data: Partial<Pick<UserRecord, "name" | "email" | "passwordHash" | "resetToken" | "resetTokenExpiry" | "bio" | "location" | "website">>): Promise<UserRecord | null>
  getAll(): Promise<UserRecord[]>
}

class InMemoryUsers implements UsersRepo {
  private readonly byId = new Map<string, UserRecord>()
  private readonly byEmail = new Map<string, string>()
  private readonly byResetToken = new Map<string, string>()

  async findByEmail(email: string) {
    const id = this.byEmail.get(email.toLowerCase())
    if (!id) return null
    return this.byId.get(id) ?? null
  }

  async findById(id: string) {
    return this.byId.get(id) ?? null
  }

  async findByResetToken(token: string) {
    const id = this.byResetToken.get(token)
    if (!id) return null
    return this.byId.get(id) ?? null
  }

  async create(data: Omit<UserRecord, "id" | "createdAt" | "updatedAt">) {
    const now = new Date().toISOString()
    const id = randomUUID()
    const rec: UserRecord = { id, createdAt: now, updatedAt: now, ...data }
    this.byId.set(id, rec)
    this.byEmail.set(rec.email.toLowerCase(), id)
    return rec
  }

  async update(id: string, data: Partial<Pick<UserRecord, "name" | "email" | "passwordHash" | "resetToken" | "resetTokenExpiry" | "bio" | "location" | "website">>) {
    const existing = this.byId.get(id)
    if (!existing) return null

    // If email is being updated, remove old email mapping and add new one
    if (data.email && data.email !== existing.email) {
      this.byEmail.delete(existing.email.toLowerCase())
      this.byEmail.set(data.email.toLowerCase(), id)
    }

    // Handle reset token mapping
    if (data.resetToken !== undefined) {
      // Remove old token mapping if it exists
      if (existing.resetToken) {
        this.byResetToken.delete(existing.resetToken)
      }
      // Add new token mapping if token is provided
      if (data.resetToken) {
        this.byResetToken.set(data.resetToken, id)
      }
    }

    const now = new Date().toISOString()
    const updated: UserRecord = {
      ...existing,
      ...data,
      updatedAt: now
    }
    
    this.byId.set(id, updated)
    return updated
  }

  async getAll() {
    return Array.from(this.byId.values())
  }
}

let usersSingleton: UsersRepo | null = null

// In development, preserve the singleton across hot reloads
if (typeof globalThis !== 'undefined') {
  // @ts-ignore
  if (globalThis.__usersRepo) {
    // @ts-ignore
    usersSingleton = globalThis.__usersRepo
  }
}

export function getUsersRepo(): UsersRepo {
  if (!usersSingleton) {
    usersSingleton = new InMemoryUsers()
    // In development, store in global to survive hot reloads
    if (typeof globalThis !== 'undefined') {
      // @ts-ignore
      globalThis.__usersRepo = usersSingleton
    }
  }
  return usersSingleton
}
