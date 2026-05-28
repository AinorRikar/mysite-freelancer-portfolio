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
- Docker + Docker Compose (reverse proxy — отдельно в `../gogol_nginx`)

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

На сервере один раз создайте общую сеть (если ещё нет):

```bash
docker network create web
```

Запуск приложения (порт **3000** только внутри сети `web`, снаружи — через nginx):

```bash
docker compose build
docker compose up -d
docker compose logs -f app
```

Контейнер `mysite-app` билдит Nuxt и слушает `3000` в сети `web`.

### Reverse proxy и HTTPS

Nginx вынесен в соседний репозиторий [`../gogol_nginx`](../gogol_nginx): порты **80/443**, TLS, прокси на `mysite-app`, gogol dashboard и movement-studio. Инструкции по сертификатам и запуску — в README того проекта.

## Полезные примечания

- Если `nuxt dev` уже запущен, для build/generate в параллельной сессии используйте:
  - `NUXT_IGNORE_LOCK=1 npm run build`
- Для поддержки чистой архитектуры запускайте `npm run fsd:check` перед коммитом.
