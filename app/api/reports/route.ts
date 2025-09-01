import { type NextRequest, NextResponse } from "next/server"
import { getBearerToken, verifyAccessToken } from "@/lib/auth"
import { getReportsRepo } from "@/lib/reports"

export async function GET(req: NextRequest) {
  // Production auth flow
  const token = getBearerToken(req)
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  try {
    const payload = await verifyAccessToken(token)
    const userId = String(payload.sub)
    const repo = getReportsRepo()
    const list = repo.listByUser(userId)
    return NextResponse.json(
      list.map((r) => ({
        _id: r.id,
        createdAt: r.createdAt,
        scores: r.scores,
        missingSkills: r.missingSkills,
        recommendations: r.recommendations || []
      })),
    )
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
}
