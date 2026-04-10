# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development (from backend/)
npm run dev              # ts-node src/server.ts  →  port 3001
npm run prisma:migrate   # Create and apply new migration
npm run prisma:deploy    # Apply pending migrations (used in Docker)
npm run prisma:generate  # Regenerate Prisma client after schema change

# Production build
npm run build            # tsc → dist/
npm run start            # node dist/server.js

# From monorepo root
docker compose up -d --build   # Build all + start
docker compose logs -f app     # Follow app logs
docker compose down            # Stop all
```

Requires `.env` — copy from `../.env.example` and fill in values.

## Architecture

Express 5 + TypeScript. Source in `src/`, compiled to `dist/`.
Frontend static files served from `public/` (built by Vite into this directory via `build.outDir`).

### Module structure

```
src/
├── config/env.ts                  Zod env validation — fails fast on bad config
├── modules/
│   ├── user/                      CRUD; createUser triggers description generation
│   ├── generator/                 GPTunnel primary + HuggingFace/Pollinations fallback
│   └── session/                   Rate limit info endpoint
└── shared/
    ├── middleware/rate-limit.ts   3 req per fingerprint per 4 h (in-memory Map)
    ├── logger.ts                  Winston (JSON in prod, colorized in dev)
    └── prisma.ts                  Singleton PrismaClient
```

### API

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | /api/session | — | Rate limit status for caller |
| POST | /api/users | rate-limited | Create user + generate description |
| GET | /api/users | — | All users, newest first |
| GET | /api/users/:uuid | — | Single user |
| GET | /api/generate/:uuid | — | Get/regenerate character description |
| POST | /api/generate-image | — | Generate image URL from description |

### Rate limiting

Fingerprint = `SHA256(IP + User-Agent)`.
After 3 successful generations → 4 h cooldown.
`POST /api/users` returns `session` object alongside `user`.
429 response: `{ error, cooldownUntil: timestamp, retryAfter: seconds }`.

### AI services (`generator.service.ts`)

- **Primary** — GPTunnel (OpenAI-compatible): `GPTUNNEL_BASE_URL` + `GPTUNNEL_API_KEY`
  - Text: `GPTUNNEL_TEXT_MODEL` (default `gpt-4o-mini`)
  - Image: `GPTUNNEL_IMAGE_MODEL` (default `dall-e-2`)
- **Text fallback** — HuggingFace Mixtral (no key needed)
- **Image fallback** — Pollinations.ai URL construction

### Database

Single `User` model: `id, uuid, name, surname, age, profession?, description?, createdAt`.
Migrations live in `prisma/migrations/`. Docker CMD runs `prisma migrate deploy` automatically.

### Production mode

When `NODE_ENV=production`, Express serves `public/` as static files and falls back to `public/index.html` for client-side routing.
