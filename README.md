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

### SSL

1. Положить сертификаты в:
   - `./certs/fullchain.pem`
   - `./certs/privkey.pem`
2. Включить HTTPS-блок в `nginx/conf.d/default.conf`.
3. Перезапустить nginx:

```bash
docker compose restart nginx
```

## Полезные примечания

- Если `nuxt dev` уже запущен, для build/generate в параллельной сессии используйте:
  - `NUXT_IGNORE_LOCK=1 npm run build`
- Для поддержки чистой архитектуры запускайте `npm run fsd:check` перед коммитом.
