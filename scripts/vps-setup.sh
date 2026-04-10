#!/bin/bash
set -e

# Первоначальная настройка VPS для ai-generator
# Запускать из папки репозитория:
#   cd /root/ai-generator
#   bash scripts/vps-setup.sh

APP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/.."
DOMAIN="generator.berghub.ru"
NGINX_CONF_SRC="$APP_DIR/nginx-host.conf"
NGINX_CONF_DST="/etc/nginx/sites-available/$DOMAIN"
NGINX_ENABLED="/etc/nginx/sites-enabled/$DOMAIN"

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

timestamp() { date "+%Y-%m-%d %H:%M:%S"; }
log_info()    { echo -e "${BLUE}[$(timestamp)]${NC} $1"; }
log_success() { echo -e "${GREEN}[$(timestamp)]${NC} $1"; }
log_warn()    { echo -e "${YELLOW}[$(timestamp)]${NC} $1"; }
log_error()   { echo -e "${RED}[$(timestamp)]${NC} $1"; }

if [ "$(id -u)" -ne 0 ]; then
  log_error "Run as root: sudo bash scripts/vps-setup.sh"
  exit 1
fi

echo -e "${BLUE}============================================${NC}"
echo -e "${BLUE}    AI-GENERATOR — VPS SETUP${NC}"
echo -e "${BLUE}    Domain: $DOMAIN${NC}"
echo -e "${BLUE}    App dir: $APP_DIR${NC}"
echo -e "${BLUE}============================================${NC}"
echo ""

# 1. Docker
if ! command -v docker &>/dev/null; then
  log_info "Installing Docker..."
  apt-get update -qq
  apt-get install -y -qq ca-certificates curl gnupg lsb-release
  install -m 0755 -d /etc/apt/keyrings
  curl -fsSL https://download.docker.com/linux/ubuntu/gpg \
    | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
  chmod a+r /etc/apt/keyrings/docker.gpg
  echo \
    "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
    https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" \
    > /etc/apt/sources.list.d/docker.list
  apt-get update -qq
  apt-get install -y -qq docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
  systemctl enable docker
  systemctl start docker
  log_success "Docker installed: $(docker --version)"
else
  log_success "Docker already installed: $(docker --version)"
fi

# 2. Docker Compose plugin
if ! docker compose version &>/dev/null; then
  log_error "Docker Compose plugin not found. Install Docker manually."
  exit 1
else
  log_success "Docker Compose: $(docker compose version)"
fi

# 3. .env
if [ ! -f "$APP_DIR/.env" ]; then
  log_info "Creating .env from .env.example..."
  cp "$APP_DIR/.env.example" "$APP_DIR/.env"
  log_warn ".env создан из шаблона — заполни переменные перед первым запуском:"
  log_warn "  nano $APP_DIR/.env"
else
  log_success ".env already exists"
fi

# 4. nginx config
log_info "Configuring nginx for $DOMAIN..."

if [ ! -f "$NGINX_CONF_SRC" ]; then
  log_error "nginx-host.conf not found at $NGINX_CONF_SRC"
  exit 1
fi

cp "$NGINX_CONF_SRC" "$NGINX_CONF_DST"
log_success "Copied nginx config to $NGINX_CONF_DST"

if [ ! -L "$NGINX_ENABLED" ]; then
  ln -s "$NGINX_CONF_DST" "$NGINX_ENABLED"
  log_success "Created symlink in sites-enabled"
else
  log_success "Symlink already exists in sites-enabled"
fi

# Проверяем что существующие конфиги (slava.berghub.ru и др.) не затронуты
log_info "Checking existing nginx configs are intact..."
if nginx -t 2>&1 | grep -q "successful"; then
  systemctl reload nginx
  log_success "nginx reloaded"
else
  log_error "nginx config test failed — откат изменений"
  rm -f "$NGINX_ENABLED"
  rm -f "$NGINX_CONF_DST"
  nginx -t
  exit 1
fi

# 5. SSL via certbot
if [ -d "/etc/letsencrypt/live/$DOMAIN" ]; then
  log_success "SSL certificate already exists for $DOMAIN"
else
  log_info "Obtaining SSL certificate via certbot..."
  if ! command -v certbot &>/dev/null; then
    log_error "certbot not found. Install it: apt install certbot python3-certbot-nginx"
    exit 1
  fi

  read -rp "Enter email for certbot notifications: " CERTBOT_EMAIL
  if [ -z "$CERTBOT_EMAIL" ]; then
    log_error "Email is required for certbot"
    exit 1
  fi

  certbot --nginx \
    -d "$DOMAIN" \
    --non-interactive \
    --agree-tos \
    -m "$CERTBOT_EMAIL"
  log_success "SSL certificate obtained for $DOMAIN"
fi

# 6. First run — only if .env is filled
if grep -q "^POSTGRES_PASSWORD=$\|^POSTGRES_PASSWORD=change_me" "$APP_DIR/.env"; then
  echo ""
  log_warn "POSTGRES_PASSWORD не заполнен в .env — пропускаем первый запуск контейнеров."
  log_warn "Заполни .env и запусти вручную:"
  log_warn "  cd $APP_DIR && docker compose up -d --build"
else
  log_info "Starting containers..."
  cd "$APP_DIR"
  docker compose up -d --build
  log_success "Containers started"
fi

echo ""
echo -e "${BLUE}============================================${NC}"
echo -e "${GREEN}    SETUP COMPLETED${NC}"
echo -e "${BLUE}============================================${NC}"
echo ""
log_warn "Следующие шаги:"
echo ""
echo "  1. Убедись что .env заполнен:"
echo "     nano $APP_DIR/.env"
echo ""
echo "  2. Если контейнеры ещё не запущены:"
echo "     cd $APP_DIR && docker compose up -d --build"
echo ""
echo "  3. Обнови GitHub Secrets в настройках репозитория:"
echo "     VPS_HOST     = 144.31.158.54"
echo "     VPS_USER     = root"
echo "     VPS_SSH_KEY  = <приватный ключ SSH>"
echo "     VPS_PORT     = 22"
echo ""
echo "  4. Проверь что сайт открывается:"
echo "     https://$DOMAIN"
echo ""
