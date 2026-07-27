<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Stack

- **Next.js 16.2.10** (App Router) — not 14/15; APIs differ. Check `node_modules/next/dist/docs/` before writing code.
- **React 19** — not 18. Hooks and rendering behavior may differ.
- **Tailwind CSS v4** — config is via `postcss.config.mjs` plugin `@tailwindcss/postcss`, not a `tailwind.config.*` file. No `tailwind.config.js` exists.
- **ESLint 9** with flat config in `eslint.config.mjs` (not `.eslintrc`).
- **TypeScript 5** with strict mode.

## Commands

| Task | Command |
|------|---------|
| Dev server | `npm run dev` |
| Build | `npm run build` |
| Lint | `npm run lint` |
| Typecheck | `npx tsc --noEmit` |

No test framework is configured. No `test` script in `package.json`.

## Project structure

Single-package Next.js app (not a monorepo). All source code lives in `app/` (App Router). Path alias `@/*` maps to the project root. Static assets go in `public/`.

## Gotchas

- No CI, no pre-commit hooks, no formatter configured — lint and typecheck must be run manually.
- `.env*` files are gitignored; create `.env.local` for local secrets.
- `next-env.d.ts` is auto-generated — do not edit.
- No database, no auth, no deployment config — this is a bare scaffold.
