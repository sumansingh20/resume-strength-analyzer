import swaggerJSDoc from "swagger-jsdoc"

const options = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Resume Strength Analyzer API",
      version: "0.1.0",
    },
    servers: [{ url: "/api" }],
    components: {
      securitySchemes: { bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" } },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ["./src/routes/*.ts", "./src/controllers/*.ts"],
}

export const swaggerSpec = swaggerJSDoc(options)
