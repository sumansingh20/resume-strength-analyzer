import { Router } from "express"
import { requireAuth, requireRole } from "../middleware/auth.js"
import { createTemplate, listTemplates } from "../controllers/templates.controller.js"

const r = Router()
r.get("/", requireAuth, listTemplates)
r.post("/", requireAuth, requireRole("admin"), createTemplate)
export default r
