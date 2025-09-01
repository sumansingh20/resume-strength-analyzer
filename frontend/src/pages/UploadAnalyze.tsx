"use client"

import { useState } from "react"
import { api } from "../lib/api"

export default function UploadAnalyze() {
  const [file, setFile] = useState<File | null>(null)
  const [status, setStatus] = useState<string>("")

  const submit = async () => {
    if (!file) return
    setStatus("Uploading...")
    const form = new FormData()
    form.append("file", file)
    try {
      const { data } = await api.post("/api/resumes/upload", form, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      setStatus(`Analysis complete. Overall: ${data.report.scores.overall}`)
    } catch (e: any) {
      setStatus(e?.response?.data?.error || "Upload failed")
    }
  }

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-semibold mb-4">Upload & Analyze</h1>
      <input
        type="file"
        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="block"
      />
      <button
        onClick={submit}
        className="mt-3 bg-blue-600 text-white rounded px-3 py-2 disabled:opacity-50"
        disabled={!file}
      >
        Analyze Resume
      </button>
      <div className="mt-3 text-sm">{status}</div>
    </div>
  )
}
