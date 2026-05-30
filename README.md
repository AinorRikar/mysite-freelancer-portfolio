# MySite — сайт-визитка фрилансера

Лендинг и витрина услуг на **Nuxt 3** с SSR: главная с hero-блоком, каталог услуг, портфолио из внешнего API, детальные страницы проектов и заявка на услугу.

## Что на сайте

- **Главная** — переключение «Основной» / «Обо мне», CTA на услуги и портфолио, bento со статистикой.
- **Услуги** — карточки с ценой, сроком, стеком; детальная страница `/services/[slug]`; заказ через модальное окно с формой.
- **Портфолио** — сетка проектов с каруселью превью; страница проекта `/portfolio/[id]` с описанием, стеком, результатами и ссылками.
- **Интеграция** — список проектов и медиа подтягиваются из **gogol dashboard** (Integration API); картинки отдаются через прокси с JWT, чтобы браузер не ходил на защищённый URL напрямую.

## Стек

| Слой | Технологии |
|------|------------|
| Frontend | Vue 3, Nuxt 3, TypeScript, Tailwind CSS |
| State | Pinia |
| Icons | Iconify (Material Symbols) |
| Server | Nitro (API routes, SSR) |
| Deploy | Docker, внешняя сеть `web` + nginx в [`../gogol_nginx`](../gogol_nginx) |

## Структура репозитория

```text
.
├── server/                 # Nitro: API и интеграция с dashboard
│   ├── api/
│   │   ├── portfolio.get.ts
│   │   ├── portfolio/[id].get.ts
│   │   ├── portfolio-media/[...path].get.ts   # прокси картинок
│   │   └── profile.get.ts
│   └── utils/
├── src/                    # Nuxt-приложение (srcDir)
│   ├── pages/              # /, /services/:slug, /portfolio/:id
│   ├── widgets/            # landing, layout, portfolio-detail
│   ├── features/           # contact-form, service-order, hero-блоки
│   ├── entities/           # profile, service, portfolio, site (facade)
│   └── shared/             # layout-токены, UI, icons, lib
├── docs/FSD.md             # правила Feature-Sliced Design
├── scripts/fsd/            # проверка public API импортов
├── tailwind.config.ts
├── nuxt.config.ts
├── Dockerfile
└── docker-compose.yml
```

Импорты вида `~/widgets/...` указывают на `src/`, не на корень репозитория.

### Слои FSD (кратко)

Направление зависимостей: `pages → widgets → features → entities → shared`.

Между срезами — только через `index.ts` (public API). Подробности и проверка:

```bash
npm run fsd:check
```

## Переменные окружения

Скопируйте `.env.example` в `.env` для локальной разработки:

```bash
cp .env.example .env
```

| Переменная | Назначение |
|------------|------------|
| `INTEGRATION_SECRET` | Секрет Integration API (тот же, что в gogol dashboard) |
| `GOGOL_DASHBOARD_BASE_URL` | Базовый URL dashboard, напр. `http://178.250.158.178/dashboard` или `http://gogol-dashboard:3000/dashboard` в Docker |

В `nuxt.config.ts` они мапятся на `runtimeConfig.integrationSecret` и `runtimeConfig.gogolDashboardBaseUrl`.

Без корректных значений портфолио на сайте не загрузится — в секции будет сообщение об ошибке.

## Локальная разработка

```bash
npm install
npm run dev
```

Сайт по умолчанию: [http://localhost:3000](http://localhost:3000).

Сборка и preview production:

```bash
npm run build
npm run preview
```

Если параллельно уже крутится `nuxt dev` и build падает из‑за lock-файла:

```bash
NUXT_IGNORE_LOCK=1 npm run build
```

## Docker

На сервере один раз создайте общую сеть (если её ещё нет):

```bash
docker network create web
```

Сборка и запуск (порт **3000** только внутри сети `web`):

```bash
docker compose build
docker compose up -d
docker compose logs -f app
```

Переменные `INTEGRATION_SECRET` и `GOGOL_DASHBOARD_BASE_URL` задайте в `.env` рядом с `docker-compose.yml` или экспортируйте в shell — compose подхватит их в контейнер.

HTTPS и проксирование снаружи — в репозитории **gogol_nginx** (порты 80/443, TLS, upstream на `mysite-app`).

## API этого проекта

| Endpoint | Описание |
|----------|----------|
| `GET /api/portfolio` | Список проектов (прокси в dashboard + переписанные URL медиа) |
| `GET /api/portfolio/:id` | Один проект |
| `GET /api/portfolio-media/*` | Прокси файла с `Authorization: Bearer` |
| `GET /api/profile` | Профиль для совместимости (если используется) |

Данные услуг и текст hero хранятся в Pinia (`entities/service`, `entities/profile`), не в dashboard.

## Скрипты

| Команда | Действие |
|---------|----------|
| `npm run dev` | Dev-сервер |
| `npm run build` | Production-сборка |
| `npm run preview` | Preview собранного приложения |
| `npm run fsd:check` | Проверка импортов по FSD |

## Дизайн

- Тёмный graphite-фон на лендинге, светлые paper-карточки для контента.
- Общие классы и отступы — в `src/shared/config/layout.ts`, палитра — в `tailwind.config.ts`.
- Иконки — константы в `src/shared/config/icons.ts` (Material Symbols через Iconify).

---

Вопросы по деплою nginx и сертификатам — в README соседнего репозитория `gogol_nginx`.
