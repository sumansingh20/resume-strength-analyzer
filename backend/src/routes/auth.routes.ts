import { Router } from "express"
import { login, refreshToken, register } from "../controllers/auth.controller.js"

const r = Router()
r.post("/register", register)
r.post("/login", login)
r.post("/refresh", refreshToken)
export default r
