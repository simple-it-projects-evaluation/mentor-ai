# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**mentor.ai** — B2B SaaS web-приложение для управления качеством продаж. AI анализирует звонки менеджеров, выявляет потерянных клиентов, генерирует рекомендации и тренирует через голосовой тренажёр.

## Development Commands

All commands run from `/frontend` directory:

```bash
npm run dev      # Start dev server at http://localhost:3000
npm run build    # Production build
npm run lint     # ESLint check (next lint)
npm start        # Start production server
```

No test framework configured yet.

## Tech Stack

- **Framework:** Next.js 16.1.2 (App Router)
- **UI:** React 19 + MUI 7 + Emotion
- **Language:** TypeScript 5.9 (strict mode)
- **Styling:** Dark theme with coral (#FF6B4A) and purple (#A78BFA) accents

## Project Structure

```
/frontend/src/
├── app/                 # Next.js App Router pages
│   ├── page.tsx         # Dashboard (main report)
│   ├── calls/           # Call analysis page
│   ├── training/        # AI voice trainer
│   ├── materials/       # Learning materials
│   └── settings/        # System settings
├── components/layout/   # MainLayout, Sidebar, Header
├── theme/               # MUI theme configuration
└── mocks/data.ts        # Mock data (all backend data currently mocked)
```

## Key Architecture Notes

- **All pages use `'use client'`** — client-side components with MUI
- **Path alias:** `@/` maps to `./src/`
- **No backend yet** — all data in `/mocks/data.ts`, needs real API
- **Theme:** Custom dark theme in `/theme/theme.ts`
- **Layout:** All pages wrapped in `MainLayout` (Sidebar + Header)

## Documentation

- `/docs/MENTOR_AI_ANALYSIS.md` — Product requirements and features
- `/docs/PROJECT_ESTIMATION.md` — Development estimates and roadmap
- `/docs/*.pdf` — Technical specification (ТЗ)

## Current Status

Frontend prototype is ~70% complete with mock data. Backend, AI integrations, and telephony integration are not implemented.
