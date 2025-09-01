import type { Request, Response } from "express"
import type Express from "express"
import path from "path"
import { Resume } from "../models/resume.model.js"
import { Template } from "../models/template.model.js"
import { Report } from "../models/report.model.js"
import { parseFileToText } from "../services/parser.service.js"
import { analyzeResume } from "../services/analysis.service.js"

export async function uploadAndAnalyze(req: Request, res: Response) {
  const file = (req as any).file as Express.Multer.File | undefined
  if (!file) return res.status(400).json({ error: "File required" })
  const user = (req as any).user as { id: string }
  const saved = await Resume.create({
    userId: user.id,
    originalName: file.originalname,
    filename: path.basename(file.path),
    mimetype: file.mimetype,
    size: file.size,
  })

  const text = await parseFileToText(file.path, file.mimetype)
  saved.textContent = text
  saved.parsedAt = new Date()
  await saved.save()

  const template =
    (await Template.findOne({ role: "Java Full Stack Developer", active: true })) || (await Template.findOne())

  if (!template) return res.status(400).json({ error: "No job template available" })

  const analysis = await analyzeResume({
    resumeText: text,
    template: { skills: template.skills, experienceKeywords: template.experienceKeywords },
  })

  const report = await Report.create({
    userId: user.id,
    resumeId: saved._id,
    templateId: template._id,
    scores: analysis.scores,
    missingSkills: analysis.missingSkills,
    recommendations: analysis.recommendations,
    details: analysis.details,
  })

  res.status(201).json({ resumeId: saved._id, report })
}
