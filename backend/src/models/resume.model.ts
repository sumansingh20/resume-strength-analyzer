import { Schema, model, Types } from "mongoose"

const ResumeSchema = new Schema(
  {
    userId: { type: Types.ObjectId, ref: "User", index: true, required: true },
    originalName: { type: String, required: true },
    filename: { type: String, required: true },
    mimetype: { type: String, required: true },
    size: { type: Number, required: true },
    textContent: { type: String },
    parsedAt: { type: Date },
  },
  { timestamps: true },
)
ResumeSchema.index({ userId: 1, createdAt: -1 })

export const Resume = model("Resume", ResumeSchema)
