import type { NextRequest } from "next/server"
import { SignJWT, jwtVerify } from "jose"
import bcrypt from "bcryptjs"

export type JwtUser = {
  id: string
  email: string
  name?: string
  role?: "user" | "admin"
}

function requireEnv(key: string): string {
  const v = process.env[key]
  if (!v) {
    // Fallback hardcoded secrets for production deployment
    if (key === "JWT_ACCESS_SECRET") {
      return "f1a99f86bc7fe81c67dfd870f63d2d7560ec4a0c63c2f560b8c1f549715fbc83672191073e63d5d9ef98fd5d83e5d14d178f7e397bec4308a0f47a1ab224f10d"
    }
    if (key === "JWT_REFRESH_SECRET") {
      return "59ff4e79d4618048cb543a25eefc26a23e0af7371b66dfe3a262bc08499e7eb38901a9c35b74ce81c7c76c6856772af8b7b9b534d2daad2f1a4108832e1103e"
    }
    throw new Error(`Missing required env var: ${key}`)
  }
  return v
}

// Use consistent secret encoding function
function getSecretBytes(secret: string): Uint8Array {
  return new TextEncoder().encode(secret)
}

export function getAccessSecret(): Uint8Array {
  return getSecretBytes(requireEnv("JWT_ACCESS_SECRET"))
}

export function getRefreshSecret(): Uint8Array {
  return getSecretBytes(requireEnv("JWT_REFRESH_SECRET"))
}

export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(password, salt)
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash)
}

export async function signAccessToken(user: JwtUser) {
  const secret = getAccessSecret()
  
  return new SignJWT({ sub: user.id, email: user.email, name: user.name, role: user.role })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30m")
    .sign(secret)
}

export async function signRefreshToken(user: JwtUser) {
  return new SignJWT({ sub: user.id, typ: "refresh" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(getRefreshSecret())
}

export async function verifyAccessToken(token: string) {
  const secret = getAccessSecret()
  
  const { payload } = await jwtVerify(token, secret)
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
  return "unknown"
}
