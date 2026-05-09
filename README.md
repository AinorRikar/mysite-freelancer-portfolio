# Freelancer Business Card (Nuxt 3)

Сайт-визитка фрилансера на Nuxt 3 + Nitro + TypeScript с SSR, FSD-структурой и Docker-окружением для серверного деплоя.

## Технологический стек

- Nuxt 3 (SSR + роутинг + сборка)
- Nitro (server engine, API routes)
- Vue 3 + Composition API
- TypeScript
- Pinia (`@pinia/nuxt`)
- Tailwind CSS (`@nuxtjs/tailwindcss`)
- Iconify (`@iconify/vue`, Material Symbols)
- Docker + Docker Compose + Nginx reverse proxy

## Архитектура: `server/` и `src/`

- `server/` — серверный слой Nitro (API/обработчики).
- `src/` — клиентский слой приложения (Nuxt app entry, pages, widgets, features, entities, shared).

Nuxt настроен через `srcDir: "src/"`, поэтому импорты вида `~/features/...` резолвятся в `src/features/...`.

## Структура проекта

```text
.
├── server/                      # Nitro API and server handlers
│   └── api/
├── src/                         # Client layer
│   ├── app.vue                  # Root layout (header/main/footer + NuxtPage)
│   ├── assets/                  # Global styles and static client assets
│   ├── pages/                   # Route pages (Nuxt file-based routing)
│   ├── widgets/                 # Large UI blocks / page sections
│   │   ├── layout/
│   │   └── landing/
│   ├── features/                # User scenarios
│   │   ├── contact-form/
│   │   └── service-order/
│   ├── entities/                # Domain entities and state
│   │   ├── profile/
│   │   ├── service/
│   │   └── site/                # Compatibility facade over profile/service
│   ├── shared/                  # Reusable shared primitives
│   │   └── ui/
│   ├── components/              # Nuxt auto-import components (if needed)
│   └── stores/                  # Optional Pinia stores directory (legacy/extension point)
├── scripts/
│   └── fsd/check-public-api.mjs # Deep-import guardrail
├── docs/
│   └── FSD.md                   # FSD conventions for this codebase
├── Dockerfile
├── docker-compose.yml
├── tailwind.config.ts
├── nuxt.config.ts
└── tsconfig.json
```

## FSD правила в проекте

- Импорты между срезами — через public API (`index.ts`).
- Deep import внутренних сегментов (`ui/model/lib/api/config`) запрещен вне среза.
- Направление слоев: `pages -> widgets -> features -> entities -> shared`.
- Детали и исключения описаны в `docs/FSD.md`.

Проверка правил:

```bash
npm run fsd:check
```

## Локальный запуск

Установка зависимостей:

```bash
npm install
```

Режим разработки:

```bash
npm run dev
```

Production build:

```bash
npm run build
```

Локальный preview production-сборки:

```bash
npm run preview
```

## Docker и деплой

### Быстрый запуск через Docker Compose

```bash
docker compose build
docker compose up -d
docker compose logs -f app
```

`app` контейнер:
- билдит Nuxt и запускает `.output/server/index.mjs` на `3000` внутри сети compose.

`nginx` контейнер:
- публикует `80/443`,
- проксирует трафик в `app:3000`,
- использует конфиг `nginx/conf.d/default.conf`.

### HTTPS (браузер открывает `https://` по умолчанию)

Пока на **443** нет TLS, запросы на `https://IP` падают или помечаются как «заблокированные». Раньше у вас, скорее всего, уже лежали сертификаты в `./certs` и был включён SSL-блок.

**Вариант A — самоподписанный сертификат (доступ по IP, без домена)**

На машине с OpenSSL (на сервере в каталоге MySite):

```bash
chmod +x ./scripts/generate-selfsigned-certs.sh
./scripts/generate-selfsigned-certs.sh ВАШ_ПУБЛИЧНЫЙ_IP
```

Появятся `certs/fullchain.pem` и `certs/privkey.pem`. В текущем `nginx/conf.d/default.conf` блок **443 уже включён** — после появления файлов:

```bash
docker compose restart nginx
```

В браузере будет предупреждение о недоверенном сертификате — один раз «Дополнительно → перейти» (или импорт исключения). Так `https://IP` снова начинает работать.

**Вариант B — Let's Encrypt (нужен домен)**

Положите выданные LE файлы в те же пути `certs/fullchain.pem` и `certs/privkey.pem`, перезапустите nginx. Тогда предупреждений не будет.

**Принудительный переход с HTTP на HTTPS**

В `nginx/conf.d/default.conf` в блоке `server` на порту **80** раскомментируйте строку:

`# return 301 https://$host$request_uri;`

(только когда 443 уже настроен и проверен.)

## Полезные примечания

- Если `nuxt dev` уже запущен, для build/generate в параллельной сессии используйте:
  - `NUXT_IGNORE_LOCK=1 npm run build`
- Для поддержки чистой архитектуры запускайте `npm run fsd:check` перед коммитом.
