# AI Generator

Генератор персонажей на базе ИИ. Введи имя, фамилию и профессию — получи описание и портрет.
Ограничение: 3 генерации на сессию, затем 4 часа cooldown.

## Стек

| Часть | Технологии |
|-------|-----------|
| Frontend | React 18, Vite, styled-components, Redux Toolkit |
| Backend | Node.js 20, Express 5, TypeScript, Prisma ORM |
| База данных | PostgreSQL 16 |
| AI | GPTunnel (текст + изображение), fallback: HuggingFace / Pollinations |
| Инфраструктура | Docker, GitHub Actions CI/CD |

## Локальная разработка

### Требования
- Node.js 20+
- PostgreSQL (или Docker Compose для базы)

```bash
# 1. Клонировать
git clone <repo-url> && cd ai-generator

# 2. Переменные окружения
cp .env.example .env
# Заполни .env: POSTGRES_PASSWORD, GPTUNNEL_API_KEY, поменяй CORS_ORIGIN

# 3. Backend
cd backend
npm install
cp ../.env.example .env  # или создай backend/.env.local
npx prisma migrate dev
npm run dev              # port 3001

# 4. Frontend (отдельный терминал)
cd frontend
npm install
npm run dev              # port 5173
```

> В dev режиме фронтенд проксирует `/api` запросы на `:3001` через Vite proxy.

## Production (Docker)

```bash
cp .env.example .env
# Заполни все значения в .env

docker compose up -d --build
# Приложение на порту 3001
# Миграции применяются автоматически при старте
```

## CI/CD (GitHub Actions)

Push в ветку `main` автоматически деплоит на VPS.

### Настройка GitHub Secrets

Добавь в `Settings → Secrets → Actions`:

| Secret | Описание |
|--------|----------|
| `VPS_HOST` | IP-адрес или домен сервера |
| `VPS_USER` | SSH пользователь (например, `root`) |
| `VPS_SSH_KEY` | Приватный SSH ключ (`~/.ssh/id_rsa`) |
| `VPS_PORT` | SSH порт (обычно `22`) |

### Первый деплой на VPS

```bash
# На сервере:
cd /
git clone <repo-url> ai-generator
cd /ai-generator
cp .env.example .env
nano .env  # заполни все значения

# Nginx + SSL (пример в nginx-host.conf):
sudo cp nginx-host.conf /etc/nginx/sites-available/yourdomain.com
sudo nano /etc/nginx/sites-available/yourdomain.com  # замени yourdomain.com
sudo ln -s /etc/nginx/sites-available/yourdomain.com /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d yourdomain.com

# Запуск
docker compose up -d --build
```

## Структура проекта

```
ai-generator/
├── backend/          Node.js API
│   ├── src/
│   │   ├── config/   Env validation (Zod)
│   │   ├── modules/  user, generator, session
│   │   └── shared/   logger, prisma, middleware
│   └── prisma/       Schema + migrations
├── frontend/         Vite + React
│   └── src/
│       ├── entities/ RTK Query API, types
│       ├── features/ generator form, character UI, navigation
│       ├── pages/    Home, Generator, Characters, Policy
│       └── shared/   hooks, UI kit, theme
├── Dockerfile        Multi-stage: frontend → backend → production
├── docker-compose.yml
├── nginx-host.conf   Пример конфига хостового nginx
└── .github/workflows/deploy.yml
```
