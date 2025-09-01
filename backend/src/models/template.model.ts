import { Schema, model } from "mongoose"

const TemplateSchema = new Schema(
  {
    name: { type: String, required: true, unique: true, index: true },
    role: { type: String, required: true, index: true },
    skills: { type: [String], default: [] },
    experienceKeywords: { type: [String], default: [] },
    active: { type: Boolean, default: true },
    version: { type: Number, default: 1 },
  },
  { timestamps: true },
)

export const Template = model("Template", TemplateSchema)
