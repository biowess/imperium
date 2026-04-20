<div align="center">

# Imperium

<img src="https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=white&color=8B1A2A" />
<img src="https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white&color=9E1426" />
<img src="https://img.shields.io/badge/Tailwind_CSS_v4-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white&color=BD1228" />
<img src="https://img.shields.io/badge/Motion-animation-purple?style=for-the-badge&logo=framer&logoColor=white&color=851624" />
<img src="https://img.shields.io/badge/Zustand-state-orange?style=for-the-badge&logoColor=white&color=7A1220" />
<img src="https://img.shields.io/badge/Vite-6.x-646CFF?style=for-the-badge&logo=vite&logoColor=white&color=C0182C" />
<img src="https://img.shields.io/badge/Status-Production_Ready-success?style=for-the-badge&color=A01422" />

<br />
<br />

> **Precision Sudoku Instrument** — a premium, futuristic, and tactile puzzle experience built for those who demand elegance from their tools.

<br />

[![Live Demo](https://img.shields.io/badge/▶%20PLAY%20IMPERIUM-Launch%20Demo-9e1426?style=for-the-badge&labelColor=2c2727&color=9e1426)](https://YOUR_DEMO_URL_HERE)

> 📌 **Demo:** Replace the link above with your deployed URL. The app is fully client-side and can be hosted on any static platform — Vercel, Netlify, GitHub Pages, or Cloudflare Pages.

</div>

---

## Overview

**Imperium** is not merely a Sudoku app. It is a fully realized puzzle instrument — a piece of software with a distinct character, a cohesive aesthetic identity, and an uncompromising attention to craft.

The interface draws from the aesthetic intersection of **precision mechanical watchmaking**, **Japanese sakura imagery**, and **futuristic terminal design**. The result is a game that feels expensive: warm ivory surfaces, crimson accents, gold glints, subtle circuit-grid backgrounds, and cherry blossom petals that drift across the screen at configurable intensity.

Every detail — from the key-like shadows on buttons, to the serif type of the Sudoku digits, to the scanning holographic line that crosses the viewport — was chosen to make the act of playing Sudoku feel deliberate and premium.

---

## Features

- 🎮 **Full Sudoku gameplay** across three difficulty tiers: Easy, Medium, and Hard
- ✏️ **Pencil / candidate mode** for marking possible values in cells
- 💡 **One-time hint system** — a single, precious reveal per game
- ❌ **Error tracking** — up to 3 mistakes allowed before the sequence is terminated
- ⏱️ **Live chronograph timer** with pause and resume functionality
- 🏆 **Leaderboard** tracking personal best times per difficulty
- 📋 **Game history (Archives)** — a full operational ledger of past games with result, time, difficulty, and error count
- ⚙️ **Settings panel** — configure default difficulty, visual fidelity (particle intensity), and data management
- 🌸 **Sakura particle system** — ambient falling petal animations with four performance tiers
- 🎬 **Splash screen** — a branded, timed intro sequence with scanning animation
- 📖 **Help / Manual** — in-app instruction page
- 🧬 **About / Origin** — the story behind the app
- 📱 **Fully responsive** — optimized for both mobile and desktop
- 💾 **Persistent state** — settings, history, and leaderboard survive page reloads via `localStorage`

---

## Screens / Pages

| Screen | Codename | Purpose |
|---|---|---|
| Splash | — | Branded intro with fade-in and scanning bar |
| Main Menu | `menu` | Navigation hub with difficulty-aware game start |
| Game | `game` | Primary puzzle interface with board, numpad, and HUD |
| Leaderboard | `leaderboard` | Best times per difficulty tier |
| Archives | `history` | Full game history log |
| Configuration | `settings` | Difficulty, theme fidelity, and data management |
| Manual | `help` | How to play |
| Origin | `about` | Lore and creative dedication |

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI Framework | React 19 |
| Language | TypeScript 5.8 |
| Styling | Tailwind CSS v4 (Vite plugin) |
| Animation | Motion (Framer Motion) v12 |
| State Management | Zustand v5 with `persist` middleware |
| Icons | Lucide React |
| Build Tool | Vite 6 |
| Utilities | `clsx`, `tailwind-merge` |
| Runtime | Node.js / browser |

The project is entirely client-side. There is no server, no database, and no authentication. Everything lives in the browser — generated on-demand, persisted locally.

---

## Design Philosophy

Imperium was designed around a single principle: **a game should feel like an object worth holding**.

Most Sudoku apps are functional and forgettable. Imperium operates differently. It borrows the visual grammar of **high-end mechanical instruments** — square-cornered panels, inset shadows that simulate physical depth, monospaced chronograph timers, and precision tracking copy like *"Initiate Sequence"* and *"System Suspended"*. These choices are intentional. They make the interface feel like something crafted, not assembled.

At the same time, the **sakura motif** softens what could otherwise be cold and clinical. The crimson and ivory palette — punctuated by warm gold accents — creates a tension between organic and mechanical that gives the app its identity. The ambient cherry blossom particles aren't decorative noise. They're the counterweight.

Typography is split between **Playfair Display** (a classical serif for headings and cell numerals, evoking etched engraving) and **Inter** (clean sans-serif for UI chrome and metadata). This pairing separates the game world from the system world.

---

## How It Works

### Sudoku Engine

The core puzzle logic lives in `src/lib/sudoku.ts`. Puzzles are generated entirely at runtime using a three-phase algorithm:

1. **Fill** — A complete, valid 9×9 grid is constructed using recursive backtracking with a shuffled candidate list, ensuring randomized output on every generation.
2. **Remove** — Cells are removed one by one, in shuffled order, until the target clue count is reached. After each removal, a `countSolutions` function verifies that exactly one valid solution remains. If removing a cell creates ambiguity, it is restored.
3. **Clue targets** — Easy: 45 clues, Medium: 35, Hard: 25.

This approach guarantees that every generated puzzle is both random and uniquely solvable.

### State Architecture

All game state is managed through a single **Zustand store** (`src/store/useStore.ts`). The store is divided into:

- **Routing state** — the active screen (`Screen` type)
- **Settings** — default difficulty, theme intensity, pencil default
- **Live game state** — the 81-cell puzzle array, solution array, user entries, pencil mark sets, selected cell, mistake counter, timer, and pause state
- **History and leaderboard** — persisted across sessions

The `partialize` function in the persist middleware ensures only safe, serializable slices (settings, history, leaderboard) are written to `localStorage`. Active game state — including `Set` objects for pencil marks — is deliberately excluded to prevent hydration bugs.

### Cell Rendering

`SudokuCell` (`src/components/game/SudokuCell.tsx`) is a `React.memo` component that subscribes to precisely the state slices it needs. Rather than reading entire arrays, each cell subscribes to its own index — `s.puzzle[index]`, `s.userEntries[index]`, `s.pencilMarks[index]` — so that only the affected cells re-render when state changes. This prevents the entire board from re-rendering on every timer tick or selection change.

Each cell computes its own visual state: selected, peer (same row/column/box), highlighted (same number), error, and given. The 3×3 box borders are derived from cell position using modulo arithmetic, with thicker borders drawn at box boundaries.

### Animation System

All screen transitions, modal entrances, and interactive micro-animations run through **Motion** (`motion/react`). `AnimatePresence` in `App.tsx` wraps all screen components, enabling smooth cross-fade and scale transitions between views. Key frames include:

- Splash fade-in with scanning gold bar
- Screen slide-in on `y: 10` with simultaneous `opacity` and `scale` easing
- Cell value pop-in on `scale: 0.8 → 1`
- Pause overlay backdrop blur from `0px → 8px`
- Result modal slide-up with `y: 20 → 0`

### Sakura Particles

`SakuraParticles` (`src/components/ui/SakuraParticles.tsx`) renders 0–15 absolutely-positioned divs styled as petal shapes (`border-radius` on opposite corners). Each petal is assigned randomized starting position, scale, duration (15–30s), and rotation. They animate infinitely using `motion` with `willChange: transform` for GPU compositing. Particle count is controlled by the `ThemeIntensity` setting (`ultra | balanced | minimal | performance`).

### Persistence

Zustand's `persist` middleware writes the selected state slice to `localStorage` under the key `imperium-storage`. On app mount, settings, history, and leaderboard records are hydrated automatically. History entries are typed as `GameHistoryEntry` objects with `id`, `date`, `difficulty`, `result`, `time`, `mistakes`, and `usedHint`.

---

## Project Structure

```
imperium/
├── src/
│   ├── App.tsx                    # Root — splash screen, screen routing, AnimatePresence
│   ├── main.tsx                   # React entry point
│   ├── index.css                  # Tailwind v4 @theme tokens, global styles, utility layers
│   │
│   ├── lib/
│   │   ├── sudoku.ts              # Puzzle generation engine (fill, remove, uniqueness check)
│   │   └── utils.ts               # cn() utility (clsx + tailwind-merge)
│   │
│   ├── store/
│   │   └── useStore.ts            # Zustand store — all game state, actions, persistence
│   │
│   ├── components/
│   │   ├── game/
│   │   │   ├── SudokuBoard.tsx    # 9×9 grid container, renders 81 SudokuCell instances
│   │   │   ├── SudokuCell.tsx     # Individual cell — value, pencil marks, highlights, errors
│   │   │   └── NumberPad.tsx      # Input controls — digits 1–9, pencil, hint, eraser, pause
│   │   └── ui/
│   │       ├── Layout.tsx         # Global wrapper — circuit grid, vignette, scan line, particles
│   │       ├── SakuraParticles.tsx # Animated ambient petal system
│   │       ├── Button.tsx         # Shared button component (primary / secondary / ghost)
│   │       └── ConfirmModal.tsx   # Destructive action confirmation dialog
│   │
│   └── screens/
│       ├── MainMenu.tsx           # Navigation hub
│       ├── GameScreen.tsx         # Active game view — HUD, board, result modal
│       ├── LeaderboardScreen.tsx  # Best times per difficulty
│       ├── HistoryScreen.tsx      # Past game log
│       ├── SettingsScreen.tsx     # Configuration panel
│       ├── HelpScreen.tsx         # How to play
│       └── AboutScreen.tsx        # Origin / dedication
│
├── index.html
├── vite.config.ts
├── tsconfig.json
├── package.json
└── .env.example
```

---

## Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/imperium-sudoku.git
cd imperium-sudoku

# Install dependencies
npm install
```

---

## Running Locally

```bash
npm run dev
```

The app will start on `http://localhost:3000`.

---

## Build & Deploy

```bash
# Production build
npm run build

# Preview the production build locally
npm run preview

# Type check without emitting
npm run lint
```

The `dist/` directory contains a fully static build. Deploy to any platform that serves static files — Vercel, Netlify, Cloudflare Pages, or GitHub Pages.

---

## Dedication

*There is a person whose presence shaped the color of this project without her ever touching a line of code. The choice of crimson — warm and precise, alive without being loud — belongs to her. The sakura motif, the tension between organic softness and mechanical structure, the quiet elegance the whole thing reaches toward: all of it reflects something she carries naturally. Imperium was built as a puzzle instrument, but it was colored by her. She will know.*

---

## Credits

**Design & Engineering** — BIOWESS © 2026

Built with [React](https://react.dev), [Tailwind CSS](https://tailwindcss.com), [Motion](https://motion.dev), and [Zustand](https://github.com/pmndrs/zustand).

Icons by [Lucide](https://lucide.dev).

---

## License

This project is currently **proprietary**. All rights reserved by BIOWESS © 2026.

> To discuss licensing or collaboration, open an issue or reach out directly.

---

<div align="center">

```
BIOWESS · 2026 · PRECISION ARCHITECTURE
```

</div>
