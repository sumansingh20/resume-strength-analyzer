import { randomUUID } from "crypto"

export type Scores = {
  overall: number
  skillsCoverage: number
  experienceRelevance: number
  atsReadiness: number
  impact: number
}

export type AnalysisReport = {
  id: string
  userId: string
  createdAt: string
  scores: Scores
  missingSkills: string[]
  recommendations: string[]
  textPreview?: string
}

class InMemoryReports {
  private byId = new Map<string, AnalysisReport>()
  private byUser = new Map<string, string[]>()

  listByUser(userId: string): AnalysisReport[] {
    const ids = this.byUser.get(userId) || []
    return ids.map((id) => this.byId.get(id)!).filter(Boolean)
  }

  get(id: string): AnalysisReport | null {
    return this.byId.get(id) ?? null
  }

  create(userId: string, data: Omit<AnalysisReport, "id" | "createdAt" | "userId">): AnalysisReport {
    const id = randomUUID()
    const rec: AnalysisReport = { id, userId, createdAt: new Date().toISOString(), ...data }
    this.byId.set(id, rec)
    const arr = this.byUser.get(userId) || []
    arr.unshift(id)
    this.byUser.set(userId, arr)
    return rec
  }
}

let reportsSingleton: InMemoryReports | null = null
export function getReportsRepo() {
  if (!reportsSingleton) reportsSingleton = new InMemoryReports()
  return reportsSingleton
}
