import type { Request, Response } from "express"
import { User } from "../models/user.model.js"
import { hashPassword, verifyPassword } from "../services/password.service.js"
import { issueRefreshToken, signAccessToken, verifyRefreshToken } from "../services/token.service.js"

export async function register(req: Request, res: Response) {
  const { email, password } = req.body as { email: string; password: string }
  if (!email || !password) return res.status(400).json({ error: "Email and password required" })
  const exists = await User.findOne({ email })
  if (exists) return res.status(409).json({ error: "Email already registered" })
  const passwordHash = await hashPassword(password)
  const user = await User.create({ email, passwordHash })
  const access = signAccessToken(String(user._id), "user")
  const refresh = await issueRefreshToken(String(user._id), {
    ua: req.headers["user-agent"],
    ip: req.ip,
  })
  return res.status(201).json({ accessToken: access, refreshToken: refresh, role: "user" })
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body as { email: string; password: string }
  const user = await User.findOne({ email })
  if (!user) return res.status(401).json({ error: "Invalid credentials" })
  const ok = await verifyPassword(password, user.passwordHash)
  if (!ok) return res.status(401).json({ error: "Invalid credentials" })
  const access = signAccessToken(String(user._id), user.role)
  const refresh = await issueRefreshToken(String(user._id), {
    ua: req.headers["user-agent"],
    ip: req.ip,
  })
  return res.json({ accessToken: access, refreshToken: refresh, role: user.role })
}

export async function refreshToken(req: Request, res: Response) {
  const { refreshToken } = req.body as { refreshToken: string }
  if (!refreshToken) return res.status(400).json({ error: "refreshToken required" })
  try {
    const payload = verifyRefreshToken(refreshToken)
    const access = signAccessToken(payload.sub, "user")
    return res.json({ accessToken: access })
  } catch {
    return res.status(401).json({ error: "Invalid refresh token" })
  }
}
