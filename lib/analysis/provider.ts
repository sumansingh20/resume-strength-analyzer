import { analyzeResume } from "@/lib/analyzer"

export type AnalyzeOptions = { jobKeywords?: string[] }

export interface Analyzer {
  analyze(
    text: string,
    opts?: AnalyzeOptions,
  ): {
    scores: {
      overall: number
      skillsCoverage: number
      experienceRelevance: number
      atsReadiness: number
      impact: number
    }
    missingSkills: string[]
    recommendations: string[]
  }
}

class LocalAnalyzer implements Analyzer {
  analyze(text: string, opts?: AnalyzeOptions) {
    return analyzeResume(text, opts)
  }
}

export function getAnalyzer(): Analyzer {
  // If in the future we add env-based providers, select them here.
  return new LocalAnalyzer()
}
