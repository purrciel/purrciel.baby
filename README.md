# PURRCIEL.BABY

Маленький пиксельный личный мир: главная-сцена в духе Undertale, сад заметок,
лаборатория, комната и кот. Пересобран на Next.js и адаптирован под Vercel.

## Стек

- **Next.js 16** (App Router, React Server Components)
- **React 19**
- **TypeScript**
- **Tailwind CSS 4**
- **MDX** (`next-mdx-remote` + `gray-matter` + `zod`)
- **cmdk** для командной палитры
- **Vercel Analytics / Speed Insights**

## Локальный запуск

```sh
npm install
npm run dev
```

Сайт откроется на `http://localhost:3000`.

Полезные команды:

```sh
npm run dev        # dev-сервер
npm run build      # production-сборка
npm run start      # запуск собранной версии
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
```

## Структура

```text
src/
  app/                 # маршруты, layout, SEO, OG-картинки
  components/          # интерфейс: сцена, сад, лаб, мир, UI
  content/garden/      # заметки в MDX
  data/                # menu, activity, lab, world, dialogues
  lib/                 # контент, даты, лаборатория, конфиг сайта
  assets/fonts/        # пиксельные шрифты (next/font/local)
public/
  audio/theme.mp3      # фоновый трек
  favicon.svg
  favicon.ico
```

## Как добавлять контент

**Заметка в саду** — новый файл `src/content/garden/my-note.mdx`:

```mdx
---
title: "Название"
description: "Короткое описание для списка и SEO."
created: 2026-11-06
type: note # note | idea | exploration
tags: ["тег"]
draft: false
---

Текст заметки. Поддерживаются MDX, таблицы, код и ссылки.
```

**Проект в лаборатории** — `src/data/lab.json`:

```json
{
  "title": "Название",
  "description": "Что это и зачем.",
  "status": "active",
  "stack": ["Rust", "Elixir"],
  "year": 2026,
  "href": "https://example.com",
  "repo": "https://github.com/purrciel/example"
}
```

`status`: `active`, `done` или `paused`.

**Блок «сейчас»** — `src/data/activity.json`.
**Комната и ссылки** — `src/data/world.json`.
**Реплики кота и приветствия** — `src/data/dialogues.json`.
**Меню на главной** — `src/data/menu.json`.

Шрифты лежат в `src/assets/fonts/`, музыка — в `public/audio/theme.mp3`.
Чтобы заменить трек, просто положи новый файл с тем же именем.

В оригинальном Pixelify Sans нет заглавных кириллических «О» и «П» — в локальные
файлы они добавлены вручную (глифы Omicron/Pi), чтобы буквы не выпадали в
системный шрифт. Если будешь менять шрифт, проверь эти две буквы.

## Деплой на Vercel

1. Запушь репозиторий в GitHub.
2. Открой [vercel.com/new](https://vercel.com/new) и импортируй репозиторий.
3. Framework Preset определится как **Next.js**; менять ничего не нужно.
   - Install Command: `npm install`
   - Build Command: `npm run build`
4. Нажми **Deploy**.

Каждый push в `main` уходит в production, pull request получает preview-ссылку.

### Домен

В Vercel: **Project → Settings → Domains → Add** и добавь:

- `purrciel.baby`
- `www.purrciel.baby`

Vercel покажет точные DNS-записи. Обычно для apex-домена нужен `A`-record на
`76.76.21.21`, а для `www` — `CNAME` на `cname.vercel-dns.com`. Если старые
записи от GitHub Pages ещё живут — удали их.

## Переменные окружения

Не нужны. Аналитика Vercel работает без ключей (включается в дашборде проекта).

## Лицензия

Личный проект. Код можно читать и вдохновляться, контент — нет.
