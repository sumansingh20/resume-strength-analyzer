import type { Request, Response } from "express"
import { Template } from "../models/template.model.js"

export async function listTemplates(_req: Request, res: Response) {
  const docs = await Template.find({ active: true }).sort({ createdAt: -1 }).lean()
  res.json(docs)
}

export async function createTemplate(req: Request, res: Response) {
  const { name, role, skills, experienceKeywords } = req.body
  const doc = await Template.create({ name, role, skills, experienceKeywords })
  res.status(201).json(doc)
}
