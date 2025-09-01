import type { CorsOptions } from "cors"

const allowlist = (process.env.CORS_ALLOWLIST || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean)

export const corsOptions: CorsOptions = {
  origin: (origin, cb) => {
    if (!origin) return cb(null, true)
    if (allowlist.includes(origin)) return cb(null, true)
    return cb(new Error("Not allowed by CORS"))
  },
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization", "X-CSRF-Token"],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
}
