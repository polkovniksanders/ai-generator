# Stage 1: Build frontend
FROM node:20-alpine AS frontend-build
WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN npm ci

COPY frontend/ .
RUN npx vite build --outDir /build/public

# Stage 2: Build backend
FROM node:20-alpine AS backend-build
WORKDIR /app/backend

COPY backend/package*.json ./
COPY backend/prisma ./prisma/
RUN npm ci
RUN npx prisma generate

COPY backend/tsconfig.json .
COPY backend/src ./src
RUN npx tsc

# Stage 3: Production image
FROM node:20-alpine AS production
WORKDIR /app

COPY --from=backend-build /app/backend/node_modules ./node_modules
COPY --from=backend-build /app/backend/dist ./dist
COPY --from=backend-build /app/backend/prisma ./prisma
COPY --from=backend-build /app/backend/package*.json ./
COPY --from=frontend-build /build/public ./public

EXPOSE 3001

CMD ["sh", "-c", "npx prisma migrate deploy && node dist/server.js"]
