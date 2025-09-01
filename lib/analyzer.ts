type AnalyzeOptions = { jobKeywords?: string[] }

const DEFAULT_SKILLS = [
  "javascript",
  "typescript",
  "react",
  "next.js",
  "node",
  "python",
  "java",
  "sql",
  "aws",
  "docker",
  "kubernetes",
  "graphql",
  "rest",
  "ci",
  "cd",
  "testing",
  "jest",
  "cypress",
  "tailwind",
  "css",
  "html",
  "git",
  "agile",
  "scrum",
]
const IMPACT_WORDS = [
  "improved",
  "reduced",
  "increased",
  "optimized",
  "led",
  "delivered",
  "achieved",
  "drove",
  "owned",
  "launched",
  "built",
  "shipped",
]
const ATS_HINTS = [
  "summary",
  "experience",
  "education",
  "skills",
  "projects",
  "contact",
  "email",
  "phone",
  "github",
  "linkedin",
]

export function analyzeResume(text: string, opts: AnalyzeOptions = {}) {
  const lower = text.toLowerCase()
  const words = lower.split(/\W+/).filter(Boolean)

  // Skills coverage
  const skillsSet = new Set(DEFAULT_SKILLS)
  const foundSkills = new Set<string>()
  for (const w of words) if (skillsSet.has(w)) foundSkills.add(w)
  const skillsCoverage = Math.min(100, Math.round((foundSkills.size / Math.max(8, DEFAULT_SKILLS.length / 2)) * 100))

  // Experience relevance (very rough): count occurrences of "experience", verbs, years
  const expHits = (lower.match(/experience|years|managed|developed|designed|engineer|lead|led|senior/g) || []).length
  const experienceRelevance = Math.max(20, Math.min(100, expHits * 10 + (/\b\d{4}\b/.test(text) ? 10 : 0)))

  // ATS readiness: presence of section headings, contact, simple formatting hints
  const atsHits = ATS_HINTS.reduce((acc, k) => acc + (lower.includes(k) ? 1 : 0), 0)
  const atsReadiness = Math.min(100, 40 + atsHits * 6)

  // Impact: quantify action/impact words
  const impactHits = IMPACT_WORDS.reduce((acc, k) => acc + (lower.match(new RegExp(`\\b${k}\\b`, "g")) || []).length, 0)
  const impact = Math.max(20, Math.min(100, 30 + impactHits * 8))

  // Overall as weighted mean
  const overall = Math.round(0.3 * skillsCoverage + 0.25 * experienceRelevance + 0.25 * atsReadiness + 0.2 * impact)

  // Missing skills based on common keywords (could be adapted by jobKeywords)
  const targetSkills = new Set(opts.jobKeywords && opts.jobKeywords.length ? opts.jobKeywords : DEFAULT_SKILLS)
  const missingSkills = [...targetSkills].filter((s) => !foundSkills.has(s)).slice(0, 10)

  // Recommendations
  const recommendations: string[] = []
  if (skillsCoverage < 70) recommendations.push("Add a dedicated Skills section with specific tools and frameworks.")
  if (experienceRelevance < 70) recommendations.push("Emphasize relevant experience with quantified outcomes.")
  if (atsReadiness < 70)
    recommendations.push("Use clear headings (Summary, Experience, Skills, Education) for ATS parsing.")
  if (impact < 70) recommendations.push("Use action verbs and metrics (%, $, time saved) to demonstrate impact.")

  return {
    scores: { overall, skillsCoverage, experienceRelevance, atsReadiness, impact },
    missingSkills,
    recommendations,
  }
}
