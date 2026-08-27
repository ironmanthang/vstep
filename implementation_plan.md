# VSTEP PWA — Project Init & Flashcard SRS Vertical Slice

## Background

Empty project (only `docs/` and `.agents/`). Goal: scaffold Vite + React 19 + TS, establish all foundational patterns (routing, design tokens, responsive layout, PWA), then build the Flashcard SRS feature end-to-end as the first vertical slice.

## Environment (Verified)

- **Node**: 22.19.0
- **pnpm**: 11.15.0 (will use pnpm as primary)
- **Vite**: 8.2.2 (latest, uses Rolldown bundler)
- **React Router**: v8 — `react-router` package only, `react-router-dom` is deprecated. Import from `react-router/dom`. Declarative mode (`BrowserRouter` + `Routes` + `Route`) — no `@react-router/dev` needed for SPA.
- **PWA**: `vite-plugin-pwa` v1.3.0 — auto-generates service worker + manifest

## User Review Required

> [!IMPORTANT]
> **React Router v8 requires React 19.2.7+ and Node 22.22+**. Our Node is 22.19.0 — this *may* cause issues. Two options:
> - **Option A (Recommended)**: Try it — minor version mismatch might not matter in practice. If it breaks, we upgrade Node.
> - **Option B**: Pin `react-router@7.x` which has no Node version gate, and upgrade later.
>
> I'll go with **Option A** unless you say otherwise.

> [!IMPORTANT]
> **Folder structure convention**: I'm using a flat `src/features/` pattern (one folder per feature module) instead of atomic design or deep nesting. Each feature folder owns its components, hooks, data, and styles. Shared UI primitives live in `src/components/`. This keeps things simple and avoids premature abstraction.

## Open Questions

> [!NOTE]
> **Color palette preference**: The plan uses a warm indigo/violet primary with amber accents on a dark charcoal base — targeting a premium, calming feel for "Lan" (the beginner persona). If you have a specific color direction, flag it now.

> [!NOTE]
> **Vietnamese UI language**: The docs are in Vietnamese, and the target user is Vietnamese. Should the UI chrome (nav labels, buttons) be in Vietnamese, English, or bilingual? The flashcard content is inherently bilingual (EN word → VI definition). I'll default to **Vietnamese UI** for nav/buttons since the persona is a Vietnamese learner, with English for the actual learning content.

---

## Proposed Changes

### Project Scaffolding

#### [NEW] Root project files

```
d:\program\vstep\
├── package.json          # pnpm, type: module
├── tsconfig.json         # Vite + React 19 TS config
├── tsconfig.app.json     # App-specific TS config
├── tsconfig.node.json    # Node-specific TS config (vite.config)
├── vite.config.ts        # Vite 8 + React plugin + PWA plugin
├── index.html            # SPA entry point
├── public/
│   ├── favicon.svg
│   ├── pwa-192x192.png
│   └── pwa-512x512.png
└── src/
    ├── main.tsx          # React root + BrowserRouter
    ├── App.tsx           # Layout shell (sidebar/bottom nav) + Routes
    ├── index.css         # Design tokens + global reset + utilities
    ├── types/
    │   └── schemas.ts    # All TypeScript interfaces from data_schemas.md
    ├── components/
    │   └── Layout.tsx    # Responsive shell: sidebar (desktop) + bottom nav (mobile)
    ├── features/
    │   └── flashcard/
    │       ├── FlashcardPage.tsx     # Main page: daily review queue
    │       ├── FlashcardCard.tsx     # 3D flip card component
    │       ├── srs.ts               # SRS algorithm (pure functions)
    │       ├── seed-data.ts         # ~15 sample FlashcardItems
    │       └── useFlashcardStore.ts # localStorage persistence hook
    └── pages/
        ├── HomePage.tsx
        ├── SkillPracticePage.tsx
        ├── MockTestPage.tsx
        ├── SettingsPage.tsx
        └── ProfilePage.tsx
```

---

### Design Token System

#### [NEW] `src/index.css`

CSS custom properties system covering:

- **Colors**: Dark mode primary (charcoal `#0f0f14` base, indigo-violet primary `#6366f1` → `#8b5cf6`, amber accent `#f59e0b`, semantic success/warning/error). Light mode override via `[data-theme="light"]`.
- **Typography**: Google Fonts — `Inter` for body (clean, neutral), `Outfit` for headings (geometric, modern). Scale from `--fs-xs` (0.75rem) to `--fs-2xl` (2rem).
- **Spacing**: 4px base scale (`--space-1` through `--space-16`).
- **Elevation**: Glassmorphism layers — `backdrop-filter: blur()` + semi-transparent backgrounds + subtle borders.
- **Radius**: `--radius-sm` (6px), `--radius-md` (12px), `--radius-lg` (20px), `--radius-full`.
- **Transitions**: `--transition-fast` (150ms), `--transition-normal` (250ms), `--transition-slow` (400ms).
- **Global reset**: Modern CSS reset (box-sizing, margin, font smoothing).

---

### Routing

#### [NEW] `src/App.tsx`

Six routes using React Router v8 declarative mode:

| Path | Component | Label |
|:---|:---|:---|
| `/` | `HomePage` | Trang chủ |
| `/practice` | `SkillPracticePage` | Luyện tập |
| `/flashcard` | `FlashcardPage` | Từ vựng |
| `/mock-test` | `MockTestPage` | Thi thử |
| `/settings` | `SettingsPage` | Cài đặt |
| `/profile` | `ProfilePage` | Hồ sơ |

- Nested inside `<Layout>` which provides the sidebar/bottom nav.
- `<Layout>` uses CSS media queries — no JS breakpoint detection.

---

### Responsive Layout Shell

#### [NEW] `src/components/Layout.tsx` + `src/components/Layout.css`

- **Desktop (>= 1024px)**: Left sidebar (240px width), glassmorphism card with nav links + icons, sticky. Main content fills remaining width.
- **Tablet (768-1023px)**: Collapsed sidebar (64px, icons only) with tooltip labels on hover.
- **Mobile (<= 767px)**: Bottom navigation bar (fixed, 5 main items), no sidebar. Uses `safe-area-inset-bottom` for notch phones.
- Nav items use `NavLink` from `react-router/dom` with `aria-current` active states.
- Smooth active indicator animation.

---

### PWA Setup

#### [MODIFY] `vite.config.ts`

Using `vite-plugin-pwa` with:
- `registerType: 'autoUpdate'`
- `manifest` inline config: app name "VSTEP Prep", theme color matching dark mode, icons
- `workbox.runtimeCaching` for Google Fonts

---

### Flashcard SRS Feature

#### [NEW] `src/types/schemas.ts`

Direct copy of `FlashcardItem` interface from `data_schemas.md`. Only the interfaces needed now — no speculative types.

#### [NEW] `src/features/flashcard/seed-data.ts`

~15 sample flashcards covering 3 topics (Environment, Technology, Education) at B1-B2 level. Matches `FlashcardItem` exactly. `srs_metadata` initialized as `status: "new"`, `interval_days: 1`, `next_review_timestamp: 0` (immediately due).

#### [NEW] `src/features/flashcard/srs.ts`

Pure functions, no side effects:
- `getReviewQueue(cards: FlashcardItem[]): FlashcardItem[]` — filters cards where `next_review_timestamp <= Date.now()`, sorted by priority (new first, then oldest due).
- `reviewCard(card: FlashcardItem, rating: 'forgot' | 'remembered' | 'easy'): FlashcardItem` — returns new card with updated `srs_metadata`:
  - **Quên (forgot)**: Reset `interval_days` to 1, `repetition_count` stays, `ease_factor` decreases (min 1.3)
  - **Nhớ (remembered)**: `interval_days` multiplied by `ease_factor`, `repetition_count` + 1
  - **Rất dễ (easy)**: `interval_days` multiplied by `ease_factor * 1.3`, `repetition_count` + 1, `ease_factor` increases slightly
  - All ratings update `last_reviewed_at` and `next_review_timestamp`.

Intervals follow the spec pattern: 1 → 3 → 7 → 14 → 30 (natural progression via ease_factor ~2.5).

#### [NEW] `src/features/flashcard/useFlashcardStore.ts`

Custom hook wrapping `useState` + `localStorage`:
- Loads cards from localStorage on mount (falls back to seed data on first launch).
- `saveCards(cards)` persists to localStorage.
- `reviewCard(cardId, rating)` applies SRS algorithm and saves.
- Key: `vstep_flashcards`

#### [NEW] `src/features/flashcard/FlashcardPage.tsx` + `FlashcardPage.css`

Main page:
- Header: "Ôn tập hôm nay" + count badge (e.g., "12 thẻ")
- If review queue is empty: empty state with encouraging message + illustration
- If queue has cards: shows current card with swipe/tap to flip + 3 review buttons at bottom
- Progress bar showing cards reviewed / total due today
- Stats summary (mastered / learning / new counts)

#### [NEW] `src/features/flashcard/FlashcardCard.tsx` + `FlashcardCard.css`

3D flip card with CSS `transform: rotateY(180deg)` + `perspective`:
- **Front face**: Word (large), phonetic IPA (smaller), part of speech tag, audio play button (placeholder — just the button, no real audio yet)
- **Back face**: Vietnamese definition (large), collocations as chips/tags, example sentence EN with VI translation below
- Flip triggered by click/tap
- Smooth 3D transform animation (600ms, preserve-3d)
- Card has glassmorphism styling — frosted glass background, subtle border glow

---

### Placeholder Pages

#### [NEW] `src/pages/HomePage.tsx`

Dashboard shell with greeting ("Xin chào, Lan!"), quick-action cards linking to Flashcard/Practice/Mock Test. Statistics summary (placeholder numbers). Premium-looking hero section.

#### [NEW] `src/pages/SkillPracticePage.tsx`, `MockTestPage.tsx`, `SettingsPage.tsx`, `ProfilePage.tsx`

Minimal placeholder pages with title + "Coming soon" styled cards. Just enough to prove routing works. No dead code, just the minimum to render.

---

## Verification Plan

### Manual Verification
- `pnpm dev` starts without errors
- All 6 routes render correctly
- Desktop sidebar nav appears >= 1024px, bottom nav appears <= 767px
- Flashcard page shows seed data cards
- 3D flip animation works on click
- 3 review buttons (Quên/Nhớ/Rất dễ) update SRS state
- Refreshing page preserves SRS state (localStorage)
- Cards disappear from queue after review, reappear when next_review_timestamp is due
- Dark mode looks premium (glassmorphism, gradients, smooth transitions)
- PWA manifest loads (check DevTools → Application tab)

### Automated Tests
- `src/features/flashcard/srs.test.ts` — Unit tests for the SRS pure functions (forgot resets interval, remembered multiplies, easy boosts). Will verify after the feature is built.

---

## Execution Order

- Scaffold Vite project (`npm create vite@latest`)
- Install dependencies (`react-router`, `vite-plugin-pwa`)
- Design tokens (`index.css`)
- Type definitions (`schemas.ts`)
- Layout shell (`Layout.tsx` + responsive CSS)
- Routing (`App.tsx` + `main.tsx`)
- PWA config (`vite.config.ts` + manifest)
- Placeholder pages (5 pages)
- Flashcard SRS algorithm (`srs.ts`)
- Flashcard store (`useFlashcardStore.ts`)
- Flashcard seed data (`seed-data.ts`)
- Flashcard UI (`FlashcardCard.tsx` + `FlashcardPage.tsx`)
- Verify everything runs
