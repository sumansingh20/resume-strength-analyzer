import { Router } from "express"
import { requireAuth } from "../middleware/auth.js"
import { exportReport, listMyReports } from "../controllers/reports.controller.js"

const r = Router()
r.get("/", requireAuth, listMyReports)
r.get("/:id/export", requireAuth, exportReport)
export default r
