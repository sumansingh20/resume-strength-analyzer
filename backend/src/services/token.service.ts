import jwt from "jsonwebtoken"
import crypto from "crypto"
import { User } from "../models/user.model.js"
import { hash as _hash } from "bcryptjs"

export function signAccessToken(userId: string, role: "user" | "admin") {
  const secret = process.env.JWT_ACCESS_SECRET!
  return jwt.sign({ sub: userId, role }, secret, { expiresIn: "15m" })
}

export async function issueRefreshToken(userId: string, meta?: { ua?: string; ip?: string }) {
  const secret = process.env.JWT_REFRESH_SECRET!
  const raw = crypto.randomBytes(48).toString("hex")
  const token = jwt.sign({ sub: userId, jti: raw }, secret, { expiresIn: "30d" })
  const tokenHash = await _hash(token, 10)
  await User.updateOne({ _id: userId }, { $push: { refreshTokens: { tokenHash, userAgent: meta?.ua, ip: meta?.ip } } })
  return token
}

export async function revokeRefreshToken(userId: string, token: string) {
  // remove matching hashed token
  await User.updateOne({ _id: userId }, { $pull: { refreshTokens: {} } })
}

export function verifyRefreshToken(token: string) {
  const secret = process.env.JWT_REFRESH_SECRET!
  return jwt.verify(token, secret) as any
}
