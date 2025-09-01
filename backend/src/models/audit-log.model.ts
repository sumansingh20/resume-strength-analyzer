import { Schema, model, Types } from "mongoose"

const AuditLogSchema = new Schema(
  {
    userId: { type: Types.ObjectId, ref: "User", index: true },
    action: { type: String, required: true, index: true },
    entity: { type: String },
    entityId: { type: String },
    ip: { type: String },
    userAgent: { type: String },
    meta: { type: Schema.Types.Mixed },
  },
  { timestamps: true },
)

AuditLogSchema.index({ createdAt: -1 })
export const AuditLog = model("AuditLog", AuditLogSchema)
