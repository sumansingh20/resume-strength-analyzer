import type { NextFunction, Request, Response } from "express"

export function notFoundHandler(req: Request, res: Response) {
  res.status(404).json({ error: "Not Found" })
}

export function errorHandler(err: any, req: Request, res: Response, _next: NextFunction) {
  console.error("[api:error]", err)
  const status = err.status || 500
  res.status(status).json({
    error: err.message || "Internal Server Error",
  })
}
