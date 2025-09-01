import type { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

export interface JwtPayload {
  sub: string
  role: "user" | "admin"
  iat: number
  exp: number
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization
  if (!header?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" })
  }
  const token = header.split(" ")[1]
  try {
    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET!) as JwtPayload
    ;(req as any).user = { id: payload.sub, role: payload.role }
    next()
  } catch {
    return res.status(401).json({ error: "Invalid or expired token" })
  }
}

export function requireRole(role: "admin" | "user") {
  return (req: Request, res: Response, next: NextFunction) => {
    const u = (req as any).user
    if (!u) return res.status(401).json({ error: "Unauthorized" })
    if (role === "admin" && u.role !== "admin") return res.status(403).json({ error: "Forbidden" })
    next()
  }
}
