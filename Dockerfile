# 1) Base image
FROM node:20-alpine AS base
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# 2) Install deps
FROM base AS deps
WORKDIR /app
# Copy only package manifests first for better caching
COPY package.json package-lock.json* ./
# Prefer deterministic installs; fall back if no lockfile
RUN npm ci || npm install

# 3) Build
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Build with standalone output (configured in next.config.mjs)
RUN npm run build

# 4) Run
FROM base AS runner
WORKDIR /app

# Create non-root user
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

# Copy standalone output
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Expose and run
ENV PORT=3000
EXPOSE 3000
USER nextjs

CMD ["node", "server.js"]
