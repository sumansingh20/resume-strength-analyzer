import dotenv from "dotenv"
dotenv.config({ path: process.env.NODE_ENV === "production" ? ".env.production" : ".env" })

import express from "express"
import helmet from "helmet"
import cors from "cors"
import cookieParser from "cookie-parser"
import compression from "compression"
import morgan from "morgan"
import rateLimit from "express-rate-limit"
import hpp from "hpp"
import xssClean from "xss-clean"
import { connectMongo } from "./db/connection.js"
import { corsOptions } from "./config/cors.js"
import { errorHandler, notFoundHandler } from "./middleware/error.js"
import routes from "./routes/index.js"
import swaggerUi from "swagger-ui-express"
import { swaggerSpec } from "./docs/swagger.js"

const app = express()

app.set("trust proxy", 1)
app.use(helmet())
app.use(cors(corsOptions))
app.use(compression())
app.use(cookieParser())
app.use(express.json({ limit: "2mb" }))
app.use(express.urlencoded({ extended: true, limit: "2mb" }))
app.use(hpp())
app.use(xssClean())
app.use(
  rateLimit({
    windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 60_000,
    limit: Number(process.env.RATE_LIMIT_MAX) || 100,
  }),
)
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"))

// API docs
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// API routes
app.use("/api", routes)

// 404 + error handling
app.use(notFoundHandler)
app.use(errorHandler)

const port = Number(process.env.PORT) || 8080

connectMongo()
  .then(() => {
    app.listen(port, () => {
      console.log(`[api] listening on http://localhost:${port}`)
    })
  })
  .catch((err) => {
    console.error("[api] failed to connect to Mongo:", err)
    process.exit(1)
  })

export default app
