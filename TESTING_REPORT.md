# TESTING_REPORT.md — Physics by Adnan Katper

> QA & Debugging Report. Date: 2026-05-18  
> Agent: OpenClaude QA Agent

---

## 1. Build & Compilation

### TypeScript Compilation
```
npx tsc --noEmit
```
**Result:** PASS — Zero type errors. Strict mode enabled with `noUnusedLocals` and `noUnusedParameters`.

### Vite Production Build
```
npx vite build
```
**Result:** PASS — 1,836 modules transformed, builds in ~12s.  
**Output:** Single `dist/index.html` at 1,070 kB (270 kB gzip).  
**Note:** `vite-plugin-singlefile` + `inlineDynamicImports: true` forces everything into one file. No code splitting.

---

## 2. Routes & Navigation

| Route | Component | Status |
|-------|-----------|--------|
| `/#/login` | LoginPage | OK |
| `/#/` | HomePage (protected) | OK |
| `/#/class-ix` | ClassIXPage (protected) | OK |
| `/#/class-x` | ClassXPage (protected) | OK |
| `/#/class-ix/unit/:id` | UnitDetailPage (protected) | OK |
| `/#/class-x/unit/:id` | UnitDetailPage (protected) | OK |
| `/#/nonexistent` | **Blank page** | BUG-003 |
| `/#/class-ix/unit/99` | **Infinite loading** | BUG-004 |

**Auth flow:** Unauthenticated users redirect to `/login`. Login credentials: `adnan` / `physics@2025`. "Keep me signed in" persists to localStorage; otherwise uses sessionStorage.

---

## 3. Translation System

### Architecture
- 3 languages: English (`en`), Urdu (`ur`), Sindhi (`sd`)
- 11 translation files: `common.ts`, `unit1.ts` through `unit9.ts`, `index.ts`
- RTL for Urdu and Sindhi; document `dir` attribute and `lang` updated on switch
- Font switching: Poppins (EN), Noto Nastaliq Urdu (UR), Noto Sans Sindhi (SD)

### Key Coverage
The `translate()` function has a 3-tier fallback: requested language → English → key string itself.

**14 missing keys** found (will display raw key strings to users):
- **Unit 2:** 9 keys — `unit2.h4MotionAnim`, `unit2.h4DistExamples`, `unit2.h4SpeedComparison`, `unit2.h4UniformExplainer`, `unit2.h4VectorTool`, `unit2.h4GraphPlotter`, `unit2.scenario1.note`, `unit2.scenario2.note`, `unit2.scenario3.note`
- **Unit 4:** 1 key — `unit4.quizSection`
- **Unit 9:** 5 keys — `unit9.melting`, `unit9.liquidWater`, `unit9.steam`, `unit9.condensation`, `unit9.freezing`

**Cross-unit references:** `unit5.status` used in Unit4, `unit4.reset` used in Unit5 (works at runtime, maintenance concern).

**Unused keys:** ~8 dead keys in common.ts and unit1.ts (harmless).

### Translation Issues Found

| Issue | Severity | Details |
|-------|----------|---------|
| `className` vs `class` in HTML strings | HIGH | BUG-001 — CSS classes not applied via `dangerouslySetInnerHTML` |
| 14 missing translation keys | MEDIUM | BUG-016 — Raw key strings shown to users in Units 2, 4, 9 |
| Cross-unit key references | INFO | BUG-017 — `unit5.status` in Unit4, `unit4.reset` in Unit5 |
| Hardcoded English aria-labels | LOW | BUG-014 — Navbar, Sidebar, SimulationControls, QuizStrings |
| Quiz feedback string not translated | LOW | `DragDropEngine.tsx:214` — `"{count}/{total} correct"` hardcoded |
| ~8 unused/dead translation keys | INFO | `nav.signedInAs`, `common.language`, `login.welcome`, etc. |

### RTL Rendering Assessment

| Area | Status | Notes |
|------|--------|-------|
| Document direction | OK | `<html dir="rtl">` applied correctly |
| Font switching | OK | Correct fonts loaded per language |
| Text alignment | PARTIAL | Main content flows RTL, but `text-left` used in 28 places |
| Margins/Padding | PARTIAL | `ml-*`/`mr-*` used instead of `ms-*`/`me-*` in 9 places |
| Navigation drawer | OK | Navbar drawer slides from correct side |
| Breadcrumb chevron | OK | Flips direction for RTL (uses ChevronLeft) |
| LanguageSwitcher | OK | `dir="ltr"` hardcoded on dropdown (correct) |
| Quiz options | PARTIAL | `text-left` on MCQ options doesn't flip |
| Sidebar (desktop) | PARTIAL | Fixed `right-*` positioning doesn't flip for RTL |

---

## 4. Quiz System

### Supported Question Types
1. **MCQ** — `MCQEngine.tsx` — OK
2. **True/False** — `MCQEngine.tsx` (shared) — OK
3. **Drag & Drop** — `DragDropEngine.tsx` — BUG-010 (no touch support)
4. **Match the Following** — `DragDropEngine.tsx` (shared) — OK (tap-to-connect)
5. **Numerical** — `NumericalSolver.tsx` — OK
6. **Concept Test** — `ConceptTestEngine.tsx` — OK (sub-questions)

### Quiz Functionality

| Feature | Status | Notes |
|---------|--------|-------|
| Question navigation | OK | Next/Previous with progress dots |
| Answer selection | OK | Visual feedback (correct/incorrect colors) |
| Score tracking | OK | State-based, persists across questions |
| Explanations | OK | Toggle "Why?" section per question |
| Retry quiz | OK | Full reset to question 0 |
| Results summary | OK | SVG circle chart, expandable review |
| Progress persistence | OK | `useProgress` saves to localStorage |
| Hints (Numerical) | OK | Toggle show/hide |
| Try again (Numerical) | OK | Resets input on wrong answer |
| Keyboard submit (Numerical) | OK | Enter key triggers submit |

### Legacy Quiz (`UnitQuiz.tsx`)
- Simpler MCQ-only quiz component
- Has dead code in `onComplete` callback (BUG-002)
- Still used in some UnitXContent components

---

## 5. Component Architecture

### Pages
| Page | Animations | Physics BG | GSAP | Status |
|------|-----------|------------|------|--------|
| HomePage | Hero reveal, cards | Yes | ScrollTrigger | OK |
| LoginPage | Typewriter, particles | No (custom) | No | OK |
| ClassIXPage | Card reveal | Yes | ScrollTrigger | OK |
| ClassXPage | Card reveal | Yes | ScrollTrigger | OK |
| UnitDetailPage | Section reveal | Yes | ScrollTrigger | OK |

### Reusable UI Components (`src/components/ui/`)
- `ProgressBar` — ARIA-compliant, gradient colors
- `ProgressDots` — Quiz navigation dots
- `Breadcrumb` — RTL-aware chevron direction
- `SectionCard` — Glass card wrapper
- `FormulaCard` — Formula display

### Content System (`src/content/`)
- Type-safe block system: definition, formula, example, quiz, numerical, exercise, interactive
- Lazy-loaded per language via dynamic imports
- `ChapterRenderer` → `BlockRenderer` dispatch
- Only 2 chapters registered (class-ix/ch01, class-x/ch01)
- 16 chapters still use legacy UnitXContent components

### Simulation System (`src/simulation/`)
- Canvas-based with `requestAnimationFrame` loop
- Performance-aware (low-end device detection)
- Touch input support via `useSimulationInput`
- `PhysicsCanvas` wrapper with play/pause/reset controls

---

## 6. Performance

### PhysicsBackground Canvas
- Particle count adapts to screen width and device capability
- Low-end devices: 40 particles max, reduced connection distance
- `prefers-reduced-motion` respected: animation paused
- `isLowEndDevice()` checks `navigator.deviceMemory` and `hardwareConcurrency`

### GSAP Animations
- All page animations use `gsap.context()` for proper cleanup
- ScrollTrigger used for scroll-based reveals
- `will-change` CSS applied to animated elements

### Bundle Analysis
| Metric | Value |
|--------|-------|
| Total modules | 1,836 |
| Output size | 1,070 kB |
| Gzipped | 270 kB |
| Build time | ~12s |

**Heavy dependencies:**
- `three` + `@types/three` — Three.js (for future 3D simulations)
- `gsap` — Animation library
- `react` + `react-dom` — React 19

**Note:** Three.js is imported as a dependency but doesn't appear to be used in any current component. It may be reserved for future use but adds significant bundle weight.

---

## 7. Accessibility

### Positive
- `aria-label` on key interactive elements (menu buttons, language switcher, sidebar)
- `role="progressbar"` with `aria-valuenow/min/max` on ProgressBar
- `aria-label="Breadcrumb"` on breadcrumb nav
- Keyboard support: Escape closes drawer, Enter submits quiz answers
- Focus management in drawer (auto-focus on open)
- `prefers-reduced-motion` respected in PhysicsBackground

### Issues
| Issue | Severity | File |
|-------|----------|------|
| Missing `alt` text on images | MEDIUM | LoginPage (teacher photo), HomePage (school logo) |
| Hardcoded English aria-labels | LOW | BUG-013, BUG-014 |
| No skip-to-content link | LOW | — |
| Color contrast not verified | INFO | Dark theme with colored accents needs WCAG audit |
| No `role="alert"` on quiz feedback | LOW | Quiz correct/incorrect indicators |

---

## 8. Mobile Responsiveness

### Layout
- Tailwind responsive breakpoints used throughout (`sm:`, `md:`, `lg:`, `xl:`)
- Grid layouts collapse to single column on mobile
- Card layouts stack vertically on small screens
- Navbar collapses to hamburger menu on mobile

### Mobile-Specific Issues
| Issue | Severity | Details |
|-------|----------|---------|
| DragDrop quiz unusable | MEDIUM | BUG-010 — HTML5 drag doesn't work on touch |
| Sidebar floating button | OK | Shows on mobile as FAB, opens bottom sheet |
| Table overflow | OK | `overflow-x-auto` on data tables |
| Font sizes | OK | Responsive text sizes used |
| Touch targets | OK | Min 44px height on interactive elements |

---

## 9. Simulation Stability

### Canvas Rendering
- `requestAnimationFrame` loop with proper cleanup
- `cancelAnimationFrame` on unmount
- Resize observer for responsive canvas
- Error handling for missing canvas/context

### Performance Safeguards
- Low-end device detection limits particle count
- Reduced motion support pauses animations
- Throttled resize handler

---

## 10. Authentication

### Flow
1. User visits any route → `ProtectedRoute` checks `AuthContext`
2. If not logged in → redirect to `/#/login` with `state.from`
3. Login validates against hardcoded credentials
4. On success → redirect to original destination
5. "Keep me signed in" → localStorage; otherwise → sessionStorage
6. Cross-tab sync via `StorageEvent` listener

### Issues
- Credentials in source code (documented, acceptable for static site)
- No session expiry (INFO level)

---

## 11. Multilingual Rendering

### Font Loading
- Google Fonts loaded via `<link>` in `index.html`
- Preconnect hints for `fonts.googleapis.com` and `fonts.gstatic.com`
- Fonts: Poppins, Space Grotesk, Noto Nastaliq Urdu, Noto Naskh Arabic, Noto Sans Sindhi

### Number Formatting
- `formatNumber()` in `languageUtils.ts` supports Urdu/Sindhi digit conversion
- Western numerals kept for formulas (correct behavior)
- `convertDigits` opt-in flag

### Text Utilities
- `getLineHeight()` returns appropriate line-height per script
- `getWordSpacing()` adjusts for Nastaliq rendering
- `getLetterSpacing()` tightens for Arabic-derived scripts
- `getFontFeatureSettings()` enables contextual alternates for RTL

---

## 12. Recommendations (Priority Order)

1. **[HIGH] Fix `className` → `class` in translation strings** — BUG-001. All styled inline HTML in translations uses the wrong attribute name for `dangerouslySetInnerHTML`.

2. **[MEDIUM] Add 14 missing translation keys** — BUG-016. Unit 2 (9 keys), Unit 4 (1 key), Unit 9 (5 keys) display raw key strings to users.

3. **[MEDIUM] Add touch support for DragDrop quiz** — BUG-010. Mobile users cannot complete drag-and-drop questions.

4. **[MEDIUM] Add catch-all 404 route** — BUG-003. Prevents blank pages on invalid URLs.

5. **[MEDIUM] Fix RTL layout issues** — BUG-006. Replace `text-left` with `text-start`, `ml-*` with `ms-*`, etc.

6. **[LOW] Translate hardcoded strings** — BUG-014. Aria-labels and quiz feedback strings need i18n.

7. **[LOW] Evaluate Three.js dependency** — Currently unused but adds ~150kB to bundle. Remove if not needed soon.

8. **[LOW] Consider code splitting** — The single-file build is convenient for sharing but 1MB is heavy for initial load. Could offer both modes.

---

## Files Examined

```
src/App.tsx
src/main.tsx
src/index.css
src/auth/AuthContext.tsx
src/auth/ProtectedRoute.tsx
src/i18n/LanguageContext.tsx
src/i18n/languageUtils.ts
src/i18n/translations/index.ts
src/i18n/translations/common.ts
src/i18n/translations/unit1.ts through unit9.ts
src/hooks/useProgress.ts
src/utils/cn.ts
src/utils/performance.ts
src/content/index.ts
src/content/types.ts
src/content/helpers.ts
src/content/useChapter.ts
src/content/class-ix/chapter-01/en.ts
src/pages/HomePage.tsx
src/pages/LoginPage.tsx
src/pages/ClassIXPage.tsx
src/pages/ClassXPage.tsx
src/pages/UnitDetailPage.tsx
src/components/Navbar.tsx
src/components/Footer.tsx
src/components/LanguageSwitcher.tsx
src/components/PhysicsBackground.tsx
src/components/UnitSidebar.tsx
src/components/UnitQuiz.tsx
src/components/ui/ProgressBar.tsx
src/components/ui/Breadcrumb.tsx
src/components/content/ChapterRenderer.tsx
src/components/content/BlockRenderer.tsx
src/components/quiz/QuizEngine.tsx
src/components/quiz/MCQEngine.tsx
src/components/quiz/DragDropEngine.tsx
src/components/quiz/NumericalSolver.tsx
src/components/quiz/ConceptTestEngine.tsx
src/components/quiz/ResultSummary.tsx
src/components/quiz/QuizStrings.ts
src/components/quiz/types.ts
src/components/simulation/PhysicsCanvas.tsx
src/components/simulation/SimulationControls.tsx
src/components/units/Unit1Content.tsx
index.html
package.json
tsconfig.json
vite.config.ts
```
