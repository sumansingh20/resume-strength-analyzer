import pdfParse from "pdf-parse"
import mammoth from "mammoth"
import fs from "fs/promises"
import path from "path"

export async function parseFileToText(filePath: string, mimetype: string) {
  const ext = path.extname(filePath).toLowerCase()
  const buf = await fs.readFile(filePath)

  if (mimetype === "application/pdf" || ext === ".pdf") {
    const result = await pdfParse(buf)
    return result.text
  }
  if (mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || ext === ".docx") {
    const { value } = await mammoth.extractRawText({ buffer: buf })
    return value
  }
  throw Object.assign(new Error("Unsupported file format"), { status: 400 })
}
