# Architecture Documentation — PhysicsByAdnanKatper

## Overview

Interactive physics learning portal for Class IX & X students at Govt. Boys Higher Secondary School, Naudero (Sindh, Pakistan). Built as a single-file offline-capable SPA with trilingual support (English, Urdu, Sindhi).

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| UI Framework | React | 19.2.3 |
| Language | TypeScript | 5.9.3 |
| Bundler | Vite | 7.3.2 |
| Styling | Tailwind CSS | v4.1.17 |
| Animations | GSAP + ScrollTrigger | 3.15 |
| 3D (planned) | Three.js | 0.184 |
| Icons | Lucide React | latest |
| Routing | react-router-dom | 7.15.0 |
| Build Output | vite-plugin-singlefile | 2.3.0 |

## Project Structure

```
src/
├── main.tsx                          # Entry point
├── App.tsx                           # Root: providers + router
├── index.css                         # Global styles, glassmorphic theme
│
├── auth/
│   ├── AuthContext.tsx                # Client-side auth (hardcoded credentials)
│   └── ProtectedRoute.tsx            # Route guard
│
├── i18n/
│   ├── LanguageContext.tsx            # Language provider, useT() hook
│   └── translations/
│       ├── index.ts                  # Merges all modules, exports translate()
│       ├── common.ts                 # Nav, login, homepage, footer
│       └── unit[1-9].ts              # Per-unit translation dictionaries
│
├── pages/
│   ├── HomePage.tsx                  # Landing page with hero, about, features
│   ├── LoginPage.tsx                 # Auth gate with typewriter effect
│   ├── ClassIXPage.tsx               # Unit grid for Class IX
│   ├── ClassXPage.tsx                # Unit grid for Class X
│   └── UnitDetailPage.tsx            # Dynamic unit content renderer
│
├── components/
│   ├── Navbar.tsx                    # Fixed nav with language switcher
│   ├── Footer.tsx                    # Site footer
│   ├── LanguageSwitcher.tsx          # Dropdown language selector
│   ├── PhysicsBackground.tsx         # Animated particle canvas background
│   ├── UnitQuiz.tsx                  # Reusable MCQ quiz engine
│   ├── UnitSidebar.tsx               # Section navigation sidebar
│   └── units/
│       └── Unit[1-9]Content.tsx      # Per-unit interactive content + simulations
│
├── hooks/
│   └── useProgress.ts                # Progress tracking (localStorage)
│
├── utils/
│   ├── cn.ts                         # clsx + tailwind-merge utility
│   └── performance.ts                # Throttle + device detection
│
└── content/                          # (In progress) Content-driven architecture
    ├── types.ts                      # Content type definitions
    ├── index.ts                      # Content loader registry
    └── helpers.ts                    # Content utility functions
```

## Architecture Patterns

### Provider Hierarchy
```
LanguageProvider
  └── AuthProvider
      └── HashRouter
          └── Shell (Navbar + Routes + Footer)
```

### Routing (HashRouter)
| Route | Component | Auth |
|-------|-----------|------|
| `/login` | LoginPage | No |
| `/` | HomePage | Yes |
| `/class-ix` | ClassIXPage | Yes |
| `/class-x` | ClassXPage | Yes |
| `/class-ix/unit/:unitNumber` | UnitDetailPage | Yes |
| `/class-x/unit/:unitNumber` | UnitDetailPage | Yes |

### State Management
- **Language**: Context API (`LanguageContext`) + localStorage persistence
- **Auth**: Context API (`AuthContext`) + localStorage/sessionStorage + cross-tab sync
- **Progress**: Custom hook (`useProgress`) + localStorage + IntersectionObserver

### Translation System
- Modular per-unit files (`unit1.ts` ... `unit9.ts`)
- Each file exports `unitNEn`, `unitNUr`, `unitNSd` dictionaries
- Merged in `index.ts` into flat `TRANSLATIONS` object
- `useT()` hook returns `t(key, fallback?)` with fallback chain: current lang → English → key

### Styling
- Tailwind CSS v4 with custom theme tokens in `index.css`
- Glassmorphic design system (`.glass-card`, `.glass-card-strong`)
- CSS utility classes for gradients, animations, RTL support
- Mobile-first responsive breakpoints

### Build
- Single-file output via `vite-plugin-singlefile`
- All assets inlined → works offline from `file://`
- ~1MB output, ~270KB gzipped

## Key Design Decisions

1. **HashRouter over BrowserRouter**: Required for `file://` protocol compatibility (offline use)
2. **Single-file build**: Teacher can distribute via USB/email as one HTML file
3. **Client-side auth**: Not real security — just a friendly gate for the school environment
4. **Per-unit translation files**: Keeps translation bundles manageable as units grow
5. **Section-based content**: Each unit is split into sections with individual scroll-reveal animations
6. **Inline simulations**: Physics simulations are React components within unit content, not separate routes

## Current Status

- Class IX: All 9 units complete with interactive content and trilingual translations
- Class X: Grid page only, no unit content yet
- TypeScript: Clean (0 errors)
- Build: Passes (~1MB single-file output)
