type AnalysisInput = {
  resumeText: string
  template: { skills: string[]; experienceKeywords: string[] }
}

export type AnalysisResult = {
  scores: {
    overall: number
    skillsCoverage: number
    experienceRelevance: number
    atsReadiness: number
    impact: number
  }
  missingSkills: string[]
  recommendations: string[]
  details?: any
}

// naive scoring fallback; replace with provider integration later
export async function analyzeResume(input: AnalysisInput): Promise<AnalysisResult> {
  const text = input.resumeText.toLowerCase()
  const skillsCovered = input.template.skills.filter((s) => text.includes(s.toLowerCase()))
  const missing = input.template.skills.filter((s) => !skillsCovered.includes(s))
  const expHits = input.template.experienceKeywords.filter((k) => text.includes(k.toLowerCase()))

  const skillsCoverage = Math.round((skillsCovered.length / Math.max(1, input.template.skills.length)) * 100)
  const experienceRelevance = Math.min(100, expHits.length * 15)
  const atsReadiness = Math.min(100, Math.round((text.length > 1200 ? 80 : 60) + skillsCovered.length * 2))
  const impact = Math.min(
    100,
    Math.round((text.match(/\d+%|\$\d+|led|reduced|increased|achieved/gi)?.length || 0) * 10),
  )
  const overall = Math.round(skillsCoverage * 0.35 + experienceRelevance * 0.35 + atsReadiness * 0.15 + impact * 0.15)

  const recommendations = [
    ...(missing.length ? [`Add or demonstrate: ${missing.slice(0, 8).join(", ")}`] : []),
    "Quantify achievements with metrics (%, $, time saved).",
    "Align section headings to ATS-friendly terms (Experience, Skills, Education).",
    "Use active verbs and tailor to the job description.",
  ]

  return {
    scores: { overall, skillsCoverage, experienceRelevance, atsReadiness, impact },
    missingSkills: missing,
    recommendations,
    details: { skillsCovered, expHits },
  }
}
