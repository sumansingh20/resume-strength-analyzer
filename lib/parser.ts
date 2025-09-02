// @ts-ignore - pdf-parse types not available
let pdf: any = null
try {
  pdf = require('pdf-parse')
} catch (e) {
  console.warn('PDF parsing not available in this environment')
}

export async function extractTextFromFile(file: File): Promise<string> {
  const type = file.type || ""
  
  if (type.startsWith("text/")) {
    return handleTextFile(file)
  }
  
  if (type === "application/pdf") {
    return handlePdfFile(file)
  }
  
  if (isWordDocument(type)) {
    return handleWordDocument(file)
  }
  
  return handleOtherFiles(file)
}

async function handleTextFile(file: File): Promise<string> {
  return await file.text()
}

async function handlePdfFile(file: File): Promise<string> {
  try {
    if (!pdf) {
      return "PDF parsing not available in this environment. Please upload your resume as a text file (.txt) for analysis."
    }
    
    console.log("🔍 Parsing PDF file:", file.name, "Size:", file.size)
    const arrayBuffer = await file.arrayBuffer()
    console.log("✅ ArrayBuffer created, size:", arrayBuffer.byteLength)
    
    const buffer = Buffer.from(arrayBuffer)
    console.log("✅ Buffer created, size:", buffer.length)
    
    const data = await pdf(buffer)
    console.log("✅ PDF parsed, text length:", data.text?.length || 0)
    
    return data.text || "Unable to extract text from PDF"
  } catch (error) {
    console.error("❌ PDF parsing error:", error)
    return `Error parsing PDF: ${error instanceof Error ? error.message : 'Unknown error'}. Please try uploading your resume as a text file (.txt) for better analysis.`
  }
}

function isWordDocument(type: string): boolean {
  return type === "application/msword" || 
         type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
}

async function handleWordDocument(file: File): Promise<string> {
  try {
    // In production, you would use mammoth.js or similar library
    throw new Error("Word document parsing not yet implemented. Please use PDF or text files.")
  } catch (error) {
    return `Error parsing Word document: ${error instanceof Error ? error.message : 'Unknown error'}`
  }
}

async function handleOtherFiles(file: File): Promise<string> {
  // Try to decode as text if under 2MB
  if (file.size <= 2_000_000) {
    try {
      const buf = await file.arrayBuffer()
      const text = new TextDecoder("utf-8", { fatal: false }).decode(new Uint8Array(buf))
      // Heuristic: if decoded text has enough word chars, keep; else fallback
      if ((text.match(/[A-Za-z0-9]/g) || []).length > 200) return text
    } catch {
      // ignore
    }
  }
  
  // Unable to parse this file type
  throw new Error(`Unsupported file type: ${file.type}. Please use PDF or text files.`)
}


