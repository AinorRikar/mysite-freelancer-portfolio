# FSD rules

## Import policy

- Import between slices only through public API (`index.ts`).
- Forbidden: deep imports like `~/features/x/ui/*`, `~/entities/y/model/*` from outside slice.
- Allowed temporary exception: `src/entities/site/model/site.store.ts` as compatibility facade.

## Layer direction

- `pages` -> `widgets` -> `features` -> `entities` -> `shared`.
- Lower layers must not import upper layers.

## Slice responsibilities in this project

- `entities/profile`: owner, about, hero stats.
- `entities/portfolio`: portfolio projects from gogol_tasks Integration API.
- `widgets/portfolio-detail`: portfolio project detail page content.
- `entities/service`: service catalog and service lookup.
- `features/contact-form`: reusable contact form.
- `features/service-order`: service order flow (button + modal + topic prefill).
- `widgets/landing`: page sections composition.
- `src/shared/ui`: reusable UI primitives (e.g., reveal on scroll).

## Automated check

- Run `npm run fsd:check` before commit/PR.
- The check scans imports and fails on deep-import violations.
