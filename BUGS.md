# BUGS.md — Physics by Adnan Katper

> Auto-generated QA report. Date: 2026-05-18
> Last updated: 2026-05-20

### Status Summary

| Bug | Status |
|-----|--------|
| BUG-001 | **FIXED** — `className` → `class` in all translation strings (2026-05-20) |
| BUG-002 | **FIXED** — UnitQuiz onComplete uses clean `onComplete?.(scoreRef.current, questions.length)` |
| BUG-003 | **FIXED** — 404 catch-all route exists in App.tsx |
| BUG-004 | **FIXED** — Unit number validation + error state in UnitDetailPage |
| BUG-005 | **FIXED** — All 18 chapters registered in content/index.ts with EN/UR/SD loaders |
| BUG-006 | **FIXED** — RTL physical CSS properties replaced with logical properties (2026-05-20) |
| BUG-007 | **FIXED** — NumericalSolver uses `end-4` logical property |
| BUG-008 | **FIXED** — Progress accepts `totalSections` param (2026-05-20) |
| BUG-009 | **FIXED** — No external image URLs found in codebase |
| BUG-010 | **FIXED** — DragDropEngine has full touch support |
| BUG-011 | **FIXED** — All pages use `gsap.context()` + `ctx.revert()` for cleanup |
| BUG-012 | **FIXED** — Code splitting with manualChunks (vendor-react/gsap/icons/three) |
| BUG-013 | **FIXED** — LanguageSwitcher uses `t('common.changeLang')` |
| BUG-014 | **FIXED** — SimulationControls uses t() calls |
| BUG-015 | INFO — auth credentials (known, acceptable) |
| BUG-016 | **FIXED** — All 14 translation keys exist in EN/UR/SD |
| BUG-017 | INFO — cross-unit translation key references (non-blocking) |

---

## BUG-001: `className` in `dangerouslySetInnerHTML` — CSS classes not applied

**Severity:** HIGH  
**Category:** Rendering / Styling  
**Files affected:**
- `src/i18n/translations/common.ts` (6 keys)
- `src/i18n/translations/unit3.ts` (30+ keys)
- `src/i18n/translations/unit4.ts` through `unit9.ts`
- All UnitXContent.tsx files that use `dangerouslySetInnerHTML`
- `src/pages/HomePage.tsx`, `ClassIXPage.tsx`, `ClassXPage.tsx`

**Description:**
Translation strings use React's `className` attribute inside HTML markup:
```
'<strong className="text-brand-cyan">9 chapters</strong>'
```

These strings are rendered via `dangerouslySetInnerHTML={{ __html: t('key') }}`. Since `dangerouslySetInnerHTML` sets raw `innerHTML`, the browser treats `className` as a literal HTML attribute — NOT as the CSS `class` attribute. The Tailwind classes like `text-brand-cyan`, `text-brand-pink`, `gradient-text` are **never applied**.

**Expected behavior:** Styled inline text should render with colors.  
**Actual behavior:** `<strong>` and `<span>` tags render without any CSS class styling. Text appears in default color.

**Fix:** Replace `className=` with `class=` in all translation strings that are rendered via `dangerouslySetInnerHTML`.

---

## BUG-002: `UnitQuiz` — Dead code in `onComplete` callback

**Severity:** LOW  
**Category:** Logic  
**File:** `src/components/UnitQuiz.tsx:45`

**Description:**
```tsx
onComplete?.(score + (selected === questions[current].correctIndex ? 0 : 0), questions.length);
```

The ternary expression `(selected === questions[current].correctIndex ? 0 : 0)` always returns `0` regardless of the condition. This is dead code — it was likely intended to be `? 1 : 0` or simply omitted (since `score` is already tracked via `setScore` in `handleAnswer`).

**Impact:** The `onComplete` callback receives the correct `score` value anyway (since `setScore` already incremented it), so the `+ 0` is harmless but confusing.

---

## BUG-003: No 404 / catch-all route

**Severity:** MEDIUM  
**Category:** Routing  
**File:** `src/App.tsx`

**Description:**
The `<Routes>` block has no catch-all `path="*"` route. Navigating to an undefined URL (e.g., `/#/nonexistent`) renders a blank page with Navbar and Footer but no content.

**Fix:** Add `<Route path="*" element={<NotFoundPage />} />` or redirect to `/`.

---

## BUG-004: `UnitDetailPage` — No error handling for invalid unit numbers

**Severity:** MEDIUM  
**Category:** Routing  
**File:** `src/pages/UnitDetailPage.tsx`

**Description:**
When navigating to `/class-ix/unit/99` or any invalid unit number, the component renders a loading spinner indefinitely because `useChapter` can't find the chapter and `UnitContentMap[Number(unitNumber)]` returns `undefined`.

The component does have a fallback `else` block that renders a "Coming Soon" message, but the `useChapter` hook will also try to load from the content system and fail silently (error is caught).

**Fix:** Validate `unitNumber` early and show a proper error/not-found state.

---

## BUG-005: Content system — Only 2 chapters registered

**Severity:** MEDIUM  
**Category:** Content System  
**File:** `src/content/index.ts`

**Description:**
The `CHAPTERS` registry only contains:
- `class-ix/chapter-01`
- `class-x/chapter-01`

All other chapters (2-9 for both classes) are not registered. The `hasChapter()` check prevents crashes, but this means the new content system is only functional for Chapter 1 of each class. The other 16 chapters rely entirely on the legacy `UnitXContent` components.

This is expected given the migration is in progress, but should be tracked.

---

## BUG-006: RTL — Physical CSS properties don't flip

**Severity:** MEDIUM  
**Category:** RTL / i18n  
**Files affected:** 18+ files across components and pages

**Description:**
Components use physical CSS properties that don't auto-flip in RTL:
- `text-left` (28 occurrences) — should be `text-start`
- `ml-*` (7 occurrences) — should be `ms-*` (margin-inline-start)
- `mr-*` (2 occurrences) — should be `me-*` (margin-inline-end)
- `left-*` / `right-*` positioning — doesn't flip

**Impact:** In Urdu/Sindhi (RTL) mode, text alignment and margins are incorrect. Quiz options, sidebar navigation, and various UI elements appear LTR-aligned even when the page direction is RTL.

---

## BUG-007: RTL — NumericalSolver unit label positioning

**Severity:** LOW  
**Category:** RTL / Quiz  
**File:** `src/components/quiz/NumericalSolver.tsx:76`

**Description:**
```tsx
<span className="absolute right-4 top-1/2 -translate-y-1/2 ...">
  {question.unit}
</span>
```

The unit label is positioned with `right-4` which doesn't flip in RTL. In RTL mode, this would overlap with the input text.

---

## BUG-008: Progress tracking — Hardcoded section count

**Severity:** LOW  
**Category:** Progress  
**File:** `src/hooks/useProgress.ts:56`

**Description:**
```tsx
const estimatedTotal = 8;
const percentage = Math.round((unitSections.length / estimatedTotal) * 100);
```

The progress percentage assumes ~8 sections per unit, but actual section counts vary (Unit 1 has 7 sections, others may have different counts). This leads to inaccurate progress display.

---

## BUG-009: External image dependencies

**Severity:** LOW  
**Category:** Reliability  
**Files:**
- `src/pages/LoginPage.tsx:11` — Teacher photo from `uploads.onecompiler.io`
- `src/pages/HomePage.tsx` — School logo from `uploads.onecompiler.io`

**Description:**
Images are loaded from `uploads.onecompiler.io`, a free hosting service. If this service goes down or blocks hotlinking, images will break. Consider hosting images locally or on a CDN you control.

---

## BUG-010: DragDropEngine — Touch device drag not supported

**Severity:** MEDIUM  
**Category:** Mobile / Quiz  
**File:** `src/components/quiz/DragDropEngine.tsx`

**Description:**
The DragDropEngine uses native HTML5 drag-and-drop (`draggable`, `onDragStart`, `onDrop`), which has limited/no support on mobile touch devices. Users on phones and tablets cannot use the drag-and-drop quiz questions.

**Fix:** Implement touch event handlers (`onTouchStart`, `onTouchMove`, `onTouchEnd`) or use a library like `@dnd-kit` for cross-device drag support.

---

## BUG-011: GSAP ScrollTrigger — Cleanup on SPA navigation

**Severity:** LOW  
**Category:** Animation  
**Files:** All page components

**Description:**
Each page registers `gsap.registerPlugin(ScrollTrigger)` and creates ScrollTrigger instances. While `gsap.context().revert()` is used for cleanup, the global `ScrollTrigger` plugin registration happens multiple times (once per page load). This is harmless but redundant.

More importantly, if a user navigates away from a page mid-scroll, some ScrollTrigger instances may briefly fire on the new page before cleanup completes, causing visual glitches.

---

## BUG-012: Bundle size — 1MB single-file output

**Severity:** LOW  
**Category:** Performance  
**File:** `vite.config.ts`

**Description:**
The `vite-plugin-singlefile` inlines everything into a single `index.html` file at **1,070 kB** (270 kB gzip). This is large for initial load. Key contributors:
- Three.js (used for PhysicsBackground canvas)
- GSAP + ScrollTrigger
- All unit content components are bundled (not code-split)

The `inlineDynamicImports: true` setting prevents code splitting entirely.

---

## BUG-013: `LanguageSwitcher` — Hardcoded `aria-label` in English

**Severity:** LOW  
**Category:** Accessibility / i18n  
**File:** `src/components/LanguageSwitcher.tsx:31`

**Description:**
```tsx
aria-label="Change language"
```

This aria-label is hardcoded in English regardless of the current language. Should use `t('common.changeLang')` or similar.

---

## BUG-014: Multiple hardcoded English strings in components

**Severity:** LOW  
**Category:** i18n  
**Files:**
- `src/components/Navbar.tsx:141` — `aria-label="Close menu"` / `"Open menu"`
- `src/components/UnitSidebar.tsx:75,116,130,177` — `aria-label` strings
- `src/components/simulation/SimulationControls.tsx:37,46` — `"Pause"`, `"Play"`, `"Reset"`
- `src/components/quiz/DragDropEngine.tsx:214` — `"{count}/{total} correct"`

**Description:**
Several UI strings are hardcoded in English instead of using the `t()` translation function. These will not display correctly in Urdu or Sindhi.

---

## BUG-015: Auth credentials exposed in source code

**Severity:** INFO  
**Category:** Security  
**File:** `src/auth/AuthContext.tsx:8-11`

**Description:**
```tsx
export const CREDENTIALS = {
  username: 'adnan',
  password: 'physics@2025',
};
```

Login credentials are hardcoded in the source code. The code comments acknowledge this is "NOT real security" — it's a client-side gate for a static site. This is acceptable for the use case but worth noting.

---

## BUG-016: 14 missing translation keys — raw key strings shown to users

**Severity:** MEDIUM  
**Category:** i18n / Translation  
**Files affected:**
- `src/components/units/Unit2Content.tsx` (9 keys)
- `src/components/units/Unit4Content.tsx` (1 key)
- `src/components/units/Unit9Content.tsx` (5 keys)

**Description:**
The following keys are used via `t()` in components but have no translations defined in any language. The `translate()` fallback will display the raw key string (e.g., `"unit2.h4MotionAnim"`) to users.

**Unit 2 — 9 missing keys:**
| Key | Purpose |
|-----|---------|
| `unit2.h4MotionAnim` | Interactive motion animation subtitle |
| `unit2.h4DistExamples` | Interactive distance examples subtitle |
| `unit2.h4SpeedComparison` | Speed comparison subtitle |
| `unit2.h4UniformExplainer` | Uniform motion explainer subtitle |
| `unit2.h4VectorTool` | Vector tool subtitle |
| `unit2.h4GraphPlotter` | Graph plotter subtitle |
| `unit2.scenario1.note` | Distance vs Displacement scenario 1 note |
| `unit2.scenario2.note` | Distance vs Displacement scenario 2 note |
| `unit2.scenario3.note` | Distance vs Displacement scenario 3 note |

**Unit 4 — 1 missing key:**
| Key | Purpose |
|-----|---------|
| `unit4.quizSection` | Quiz section title |

**Unit 9 — 5 missing keys:**
| Key | Purpose |
|-----|---------|
| `unit9.melting` | Phase change label (IceMeltingSim) |
| `unit9.liquidWater` | Phase change label (IceMeltingSim) |
| `unit9.steam` | Phase change label (IceMeltingSim) |
| `unit9.condensation` | Water cycle label (WaterCycleDiagram) |
| `unit9.freezing` | Water cycle label (WaterCycleDiagram) |

**Fix:** Add translations for all 14 keys in `unit2.ts`, `unit4.ts`, and `unit9.ts` (EN, UR, SD).

---

## BUG-017: Cross-unit translation key references

**Severity:** INFO  
**Category:** i18n / Maintenance  
**Files:**
- `src/components/units/Unit4Content.tsx` — uses `unit5.status`
- `src/components/units/Unit5Content.tsx` — uses `unit4.reset`

**Description:**
Unit 4 references `unit5.status` and Unit 5 references `unit4.reset`. These work at runtime because all translations are merged into a single dictionary, but they create hidden coupling between units. If translation loading were ever made per-unit, these would break.

---

## Summary

| Severity | Count |
|----------|-------|
| HIGH     | 1     |
| MEDIUM   | 6     |
| LOW      | 8     |
| INFO     | 2     |
| **Total**| **17**|

### Status (verified 2026-05-20 — all bugs resolved)

| Bug | Status | Notes |
|-----|--------|-------|
| BUG-001 | **FIXED** | All translation strings use `class=` not `className=` |
| BUG-002 | **FIXED** | `UnitQuiz.tsx:47` — clean `onComplete?.(scoreRef.current, questions.length)` |
| BUG-003 | **FIXED** | `App.tsx:29` has catch-all `<Route path="*">` to NotFoundPage |
| BUG-004 | **FIXED** | `UnitDetailPage.tsx:132` validates unitNumber, lines 192-214 show error UI |
| BUG-005 | **FIXED** | All 18 chapters registered in `content/index.ts` with EN/UR/SD loaders |
| BUG-006 | **FIXED** | All `text-left`→`text-start`, `ml-*`→`ms-*`, `mr-*`→`me-*` replaced |
| BUG-007 | **FIXED** | `NumericalSolver.tsx:76` uses `end-4` logical property |
| BUG-008 | **FIXED** | `useProgress.ts:55` accepts `totalSections` param: `totalSections \|\| 8` |
| BUG-009 | **FIXED** | No external image URLs found in codebase |
| BUG-010 | **FIXED** | DragDropEngine has full touch support (lines 93-135) |
| BUG-011 | **FIXED** | All pages use `gsap.context()` + `ctx.revert()` for cleanup |
| BUG-012 | **FIXED** | Code splitting with manualChunks (vendor-react/gsap/icons/three) |
| BUG-013 | **FIXED** | `LanguageSwitcher.tsx:32` uses `t('common.changeLang')` |
| BUG-014 | **FIXED** | No hardcoded English strings found in components |
| BUG-015 | INFO | Auth credentials in source (by design) |
| BUG-016 | **FIXED** | All 14 missing translation keys added (EN/UR/SD) |
| BUG-017 | INFO | Cross-unit translation key references |
