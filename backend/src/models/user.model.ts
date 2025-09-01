import { Schema, model } from "mongoose"

const RefreshTokenSchema = new Schema(
  {
    tokenHash: { type: String, required: true },
    userAgent: { type: String },
    ip: { type: String },
  },
  { _id: false },
)

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, index: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user", index: true },
    refreshTokens: { type: [RefreshTokenSchema], default: [] },
  },
  { timestamps: true },
)

export type UserDocument = typeof UserSchema extends infer T ? any : any
export const User = model("User", UserSchema)
