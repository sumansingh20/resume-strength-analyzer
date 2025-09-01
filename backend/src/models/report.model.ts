import { Schema, model, Types } from "mongoose"

const ScoreSchema = new Schema(
  {
    overall: Number,
    skillsCoverage: Number,
    experienceRelevance: Number,
    atsReadiness: Number,
    impact: Number,
  },
  { _id: false },
)

const ReportSchema = new Schema(
  {
    userId: { type: Types.ObjectId, ref: "User", index: true, required: true },
    resumeId: { type: Types.ObjectId, ref: "Resume", index: true, required: true },
    templateId: { type: Types.ObjectId, ref: "Template", index: true, required: true },
    scores: { type: ScoreSchema, required: true },
    missingSkills: { type: [String], default: [] },
    recommendations: { type: [String], default: [] },
    details: { type: Schema.Types.Mixed },
  },
  { timestamps: true },
)
ReportSchema.index({ userId: 1, createdAt: -1 })

export const Report = model("Report", ReportSchema)
