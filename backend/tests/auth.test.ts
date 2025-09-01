import { describe, it, expect } from "vitest"
import request from "supertest"
import app from "../src/index.js"

describe("auth", () => {
  it("rejects missing body", async () => {
    const res = await request(app).post("/api/auth/register").send({})
    expect(res.status).toBe(400)
  })
})
