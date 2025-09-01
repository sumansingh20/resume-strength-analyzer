import type { Request, Response } from "express"
import { Report } from "../models/report.model.js"
import PDFDocument from "pdfkit"
import { format } from "date-fns"
import { stringify } from "csv-stringify/sync"

export async function listMyReports(req: Request, res: Response) {
  const user = (req as any).user as { id: string }
  const docs = await Report.find({ userId: user.id }).sort({ createdAt: -1 }).lean()
  res.json(docs)
}

export async function exportReport(req: Request, res: Response) {
  const { id } = req.params
  const { format: fmt = "pdf" } = req.query
  const doc = await Report.findById(id).lean()
  if (!doc) return res.status(404).json({ error: "Report not found" })

  if (fmt === "json") {
    res.setHeader("Content-Type", "application/json")
    return res.send(JSON.stringify(doc, null, 2))
  }
  if (fmt === "csv") {
    res.setHeader("Content-Type", "text/csv")
    const csv = stringify(
      [
        ["overall", doc.scores.overall],
        ["skillsCoverage", doc.scores.skillsCoverage],
        ["experienceRelevance", doc.scores.experienceRelevance],
        ["atsReadiness", doc.scores.atsReadiness],
        ["impact", doc.scores.impact],
      ],
      { header: true },
    )
    return res.send(csv)
  }

  res.setHeader("Content-Type", "application/pdf")
  const pdf = new PDFDocument()
  pdf.pipe(res)
  pdf.fontSize(18).text("Resume Analysis Report", { underline: true })
  pdf
    .moveDown()
    .fontSize(12)
    .text(`Generated: ${format(new Date(doc.createdAt!), "PPpp")}`)
  pdf.moveDown()
  pdf.text(`Overall: ${doc.scores.overall}`)
  pdf.text(`Skills Coverage: ${doc.scores.skillsCoverage}`)
  pdf.text(`Experience Relevance: ${doc.scores.experienceRelevance}`)
  pdf.text(`ATS Readiness: ${doc.scores.atsReadiness}`)
  pdf.text(`Impact: ${doc.scores.impact}`)
  pdf.moveDown().text(`Missing Skills: ${doc.missingSkills.join(", ") || "None"}`)
  pdf.moveDown().text("Recommendations:")
  for (const r of doc.recommendations) pdf.text(`• ${r}`)
  pdf.end()
}
