import { randomUUID } from "crypto"

export type UserRecord = {
  id: string
  email: string
  name?: string
  role: "user" | "admin"
  passwordHash: string
  createdAt: string
  updatedAt: string
}

export interface UsersRepo {
  findByEmail(email: string): Promise<UserRecord | null>
  findById(id: string): Promise<UserRecord | null>
  create(data: Omit<UserRecord, "id" | "createdAt" | "updatedAt">): Promise<UserRecord>
  update(id: string, data: Partial<Pick<UserRecord, "name" | "email">>): Promise<UserRecord | null>
  getAll(): Promise<UserRecord[]>
}

class InMemoryUsers implements UsersRepo {
  private readonly byId = new Map<string, UserRecord>()
  private readonly byEmail = new Map<string, string>()

  async findByEmail(email: string) {
    const id = this.byEmail.get(email.toLowerCase())
    if (!id) return null
    return this.byId.get(id) ?? null
  }

  async findById(id: string) {
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

  async update(id: string, data: Partial<Pick<UserRecord, "name" | "email">>) {
    const existing = this.byId.get(id)
    if (!existing) return null

    // If email is being updated, remove old email mapping and add new one
    if (data.email && data.email !== existing.email) {
      this.byEmail.delete(existing.email.toLowerCase())
      this.byEmail.set(data.email.toLowerCase(), id)
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
export function getUsersRepo(): UsersRepo {
  usersSingleton ??= new InMemoryUsers()
  return usersSingleton
}
