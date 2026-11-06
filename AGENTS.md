# PURRCIEL.BABY — agent notes

## Development

Start the dev server in background mode:

```sh
npm run dev
```

Check it with `curl -I http://localhost:3000`, and stop it when finished.

## Checks

Run these before calling work done:

```sh
npm run typecheck
npm run lint
npm run build
```

## Documentation

- [Next.js App Router](https://nextjs.org/docs/app)
- [Next.js metadata and OG images](https://nextjs.org/docs/app/api-reference/file-conventions/metadata)
- [Tailwind CSS 4](https://tailwindcss.com/docs)
- [MDX with next-mdx-remote](https://github.com/hashicorp/next-mdx-remote)
- [Vercel deployment](https://vercel.com/docs/frameworks/nextjs)

## Conventions

- Keep the Russian language and the pixel/Undertale visual language.
- Content lives in `src/content/garden` (MDX) and `src/data` (JSON).
- Use `next/font/local` and the existing pixel fonts; do not add Google Fonts at runtime.
- Respect `prefers-reduced-motion` in new animations.
- Audio must stay persistent across route changes (root `AudioProvider`).

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
