import { Router } from "express"
import multer from "multer"
import path from "path"
import { requireAuth } from "../middleware/auth.js"
import { uploadAndAnalyze } from "../controllers/resume.controller.js"

const upload = multer({
  dest: path.join(process.cwd(), "uploads"),
  fileFilter: (_req, file, cb) => {
    const ok = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ].includes(file.mimetype)
    cb(ok ? null : new Error("Invalid file type"), ok)
  },
  limits: { fileSize: 8 * 1024 * 1024 },
})

const r = Router()
r.post("/upload", requireAuth, upload.single("file"), uploadAndAnalyze)
export default r
