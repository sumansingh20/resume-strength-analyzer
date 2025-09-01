import { Router } from "express"
import auth from "./auth.routes.js"
import resumes from "./resume.routes.js"
import templates from "./templates.routes.js"
import reports from "./reports.routes.js"

const r = Router()
r.use("/auth", auth)
r.use("/resumes", resumes)
r.use("/templates", templates)
r.use("/reports", reports)
export default r
