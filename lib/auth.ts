import type { NextRequest } from "next/server"
import { SignJWT, jwtVerify } from "jose"
import bcrypt from "bcryptjs"

const encoder = new TextEncoder()

export type JwtUser = {
  id: string
  email: string
  name?: string
  role?: "user" | "admin"
}

function requireEnv(key: string): string {
  const v = process.env[key]
  if (!v) {
    throw new Error(`Missing required env var: ${key}`)
  }
  return v
}

export function getAccessSecret() {
  return encoder.encode(requireEnv("JWT_ACCESS_SECRET"))
}
export function getRefreshSecret() {
  return encoder.encode(requireEnv("JWT_REFRESH_SECRET"))
}

export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(password, salt)
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash)
}

export async function signAccessToken(user: JwtUser) {
  return new SignJWT({ sub: user.id, email: user.email, name: user.name, role: user.role })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30m")
    .sign(getAccessSecret())
}

export async function signRefreshToken(user: JwtUser) {
  return new SignJWT({ sub: user.id, typ: "refresh" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(getRefreshSecret())
}

export async function verifyAccessToken(token: string) {
  const { payload } = await jwtVerify(token, getAccessSecret())
  return payload
}

export async function verifyRefreshToken(token: string) {
  const { payload } = await jwtVerify(token, getRefreshSecret())
  return payload
}

export function getBearerToken(req: NextRequest) {
  const hdr = req.headers.get("authorization") || ""
  const [scheme, token] = hdr.split(" ")
  if (scheme?.toLowerCase() !== "bearer" || !token) return null
  return token
}

// Naive in-memory IP-based rate limiter
const windowMs = 60_000
const max = 60
const buckets = new Map<string, { count: number; reset: number }>()
export function rateLimit(key: string) {
  const now = Date.now()
  const entry = buckets.get(key)
  if (!entry || now > entry.reset) {
    buckets.set(key, { count: 1, reset: now + windowMs })
    return { allowed: true, remaining: max - 1, reset: now + windowMs }
  }
  if (entry.count >= max) {
    return { allowed: false, remaining: 0, reset: entry.reset }
  }
  entry.count += 1
  return { allowed: true, remaining: max - entry.count, reset: entry.reset }
}

export function clientIp(req: NextRequest) {
  const xff = req.headers.get("x-forwarded-for")
  if (xff) return xff.split(",")[0].trim()
  // Return unknown as fallback since req.ip is not available in NextRequest
  return "unknown"
}
