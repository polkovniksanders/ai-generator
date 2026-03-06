# DEPLOYMENT.md

Инструкция по запуску и деплою проекта «Алёна знает».

---

## Локальная разработка

### Требования
- Node.js 20+
- Docker + Docker Compose

### 1. Зависимости

```bash
cd backend && npm install
cd ../frontend && npm install
```

### 2. Окружение

```bash
cp .env.example .env
# Заполни GPTUNNEL_API_KEY и DATABASE_URL
```

Минимальный `.env` для локальной разработки:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/aigen
GPTUNNEL_API_KEY=your-key
GPTUNNEL_BASE_URL=https://api.gpttunnel.com/v1
```

### 3. База данных (через Docker)

```bash
docker compose up db -d
cd backend && npm run prisma:migrate
```

### 4. Запуск

Два терминала:

```bash
# Терминал 1 — backend
cd backend && npm run dev

# Терминал 2 — frontend
cd frontend && npm run dev
```

Открыть: http://localhost:5173

---

## Деплой на VPS

### Требования на сервере
- Docker + Docker Compose
- nginx с certbot (уже установлены)
- Домен `generator.berghub.ru` указывает на IP сервера

### 1. Первый деплой

```bash
# На сервере
mkdir -p /ai-generator
cd /ai-generator
git clone <repo-url> .

cp .env.example .env
nano .env  # заполнить все переменные
```

Пример продакшн `.env`:

```env
POSTGRES_USER=postgres
POSTGRES_PASSWORD=strong_password_here
POSTGRES_DB=aigen
DATABASE_URL=postgresql://postgres:strong_password_here@db:5432/aigen
GPTUNNEL_API_KEY=your-gptunnel-api-key
GPTUNNEL_BASE_URL=https://api.gpttunnel.com/v1
GPTUNNEL_TEXT_MODEL=gpt-4o-mini
GPTUNNEL_IMAGE_MODEL=dall-e-2
CORS_ORIGIN=https://generator.berghub.ru
RATE_LIMIT_MAX=3
RATE_LIMIT_WINDOW_MS=14400000
```

### 2. Запуск контейнеров

```bash
cd /ai-generator
docker compose up -d --build
```

Приложение поднимется на порту `3001`.

### 3. Настройка nginx

```bash
sudo cp /ai-generator/nginx-host.conf /etc/nginx/sites-available/generator.berghub.ru
sudo ln -s /etc/nginx/sites-available/generator.berghub.ru /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

### 4. SSL-сертификат

```bash
sudo certbot --nginx -d generator.berghub.ru
```

Certbot автоматически обновит конфиг nginx.

### 5. Проверка

```bash
curl https://generator.berghub.ru/api/session
# Должно вернуть JSON с данными сессии
```

---

## GitHub Actions (автодеплой)

При пуше в ветку `main` деплой запускается автоматически.

### Необходимые секреты в репозитории

| Секрет | Описание |
|---|---|
| `VPS_HOST` | IP-адрес или hostname сервера |
| `VPS_USER` | SSH-пользователь (например, `root`) |
| `VPS_SSH_KEY` | Приватный SSH-ключ (содержимое `~/.ssh/id_rsa`) |

Добавить: Settings → Secrets and variables → Actions → New repository secret.

### Что делает CI

1. Подключается к серверу по SSH
2. Переходит в `/ai-generator`
3. Делает `git pull origin main`
4. Запускает `docker compose up -d --build`

---

## Управление на сервере

```bash
# Логи приложения
docker compose -f /ai-generator/docker-compose.yml logs -f app

# Перезапуск
docker compose -f /ai-generator/docker-compose.yml restart app

# Остановка
docker compose -f /ai-generator/docker-compose.yml down

# Статус
docker compose -f /ai-generator/docker-compose.yml ps
```

## Домен

Рекомендуемый домен: **`generator.berghub.ru`**

Паттерн по аналогии с другими проектами: `<service>.berghub.ru`.
