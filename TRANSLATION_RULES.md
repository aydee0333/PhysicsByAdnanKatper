# Translation Rules — PhysicsByAdnanKatper

## Supported Languages
| Code | Language | Direction | Font |
|------|----------|-----------|------|
| `en` | English | LTR | Poppins |
| `ur` | Urdu | RTL | Noto Nastaliq Urdu |
| `sd` | Sindhi | RTL | Noto Naskh Arabic |

## File Structure
```
src/i18n/
├── LanguageContext.tsx        # React context, useLang() / useT() hooks
├── languageUtils.ts           # RTL, number formatting, font helpers
├── translations/
│   ├── index.ts               # Merges all modules, exports translate() and LANG_META
│   ├── common.ts              # Shared strings (nav, login, footer, homepage)
│   ├── unit1.ts ... unit9.ts  # Per-unit translation dictionaries
└── tms/                       # Translation Management System
    ├── index.ts               # Public API barrel export
    ├── types.ts               # TypeScript types
    ├── translationEngine.ts   # Core translateWithTMS() with override chain
    ├── overrideManager.ts     # localStorage-based override CRUD
    ├── translationMemory.ts   # Correction history tracking
    ├── glossary.ts            # Physics terminology glossary
    ├── persistence.ts         # localStorage helpers + cross-tab sync
    ├── overrides/
    │   ├── physics_terms.json # Physics glossary (~150 terms across 8 categories)
    │   ├── ur_overrides.json  # Pre-baked Urdu corrections
    │   └── sd_overrides.json  # Pre-baked Sindhi corrections
    ├── providers/
    │   ├── index.ts           # Provider registry (pluggable)
    │   ├── localProvider.ts   # Wraps TRANSLATIONS dict
    │   └── googleTranslateProvider.ts  # Stub for Google Translate API
    └── components/
        ├── TMSOverlay.tsx         # Admin panel with key search + bulk ops
        ├── AdminToggle.tsx        # Floating admin mode button
        ├── TranslationEditor.tsx  # Modal for editing translations
        ├── GlossaryPanel.tsx      # Physics terminology browser
        └── EditableTranslation.tsx # Inline edit wrapper component
```

## Translation Resolution Chain (TMS)

The `translateWithTMS()` function resolves translations in this order:

1. **Override** (localStorage) — highest priority, user/admin corrections
2. **Translation Memory** — auto-suggests corrections made 2+ times (non-English only)
3. **Base Translation** — the static `TRANSLATIONS` dictionary from `.ts` files
4. **Provider Chain** — pluggable providers (local is default; Google Translate is stubbed)
5. **Fallback** — the provided fallback string, or the raw key itself

This means: **manual overrides always win**. Once you correct a translation through the admin panel, it persists in localStorage and overrides the base translation on every load.

## Translation File Format
Each file exports three dictionaries:
```typescript
type Dict = Record<string, string>;

export const unitNEn: Dict = { ... };
export const unitNUr: Dict = { ... };
export const unitNSd: Dict = { ... };
```

## Key Naming Convention
Keys follow `unitN.camelCase` pattern:
```
unitN.title                    # Unit title
unitN.sectionName              # Section heading
unitN.definitionTerm           # Definition text
unitN.quiz.q1                  # Quiz question 1
unitN.quiz.q1.opt1             # Question 1, option 1
unitN.quiz.q1.exp              # Question 1 explanation
```

## Adding a New Unit's Translations

### Step 1: Create translation file
Create `src/i18n/translations/unitN.ts`:
```typescript
type Dict = Record<string, string>;

export const unitNEn: Dict = {
  'unitN.title': 'Unit Title in English',
  'unitN.section1': 'Section 1 Title',
  // ... all keys
};

export const unitNUr: Dict = {
  'unitN.title': 'عنوان اردو میں',
  'unitN.section1': 'سیکشن 1 کا عنوان',
  // ... same keys, Urdu values
};

export const unitNSd: Dict = {
  'unitN.title': 'عنوان سنڌي ۾',
  'unitN.section1': 'سيڪشن 1 جو عنوان',
  // ... same keys, Sindhi values
};
```

### Step 2: Register in index.ts
```typescript
import { unitNEn, unitNUr, unitNSd } from './unitN';

export const TRANSLATIONS = {
  en: { ...commonEn, ...unit1En, /* ... */ ...unitNEn },
  ur: { ...commonUr, ...unit1Ur, /* ... */ ...unitNUr },
  sd: { ...commonSd, ...unit1Sd, /* ... */ ...unitNSd },
};
```

### Step 3: Use in component
```tsx
const t = useT();
return <h1>{t('unitN.title')}</h1>;
```

## Admin Panel (TMS)

### How to Use

1. **Login** to the app (credentials in AuthContext)
2. Click the **gear icon** (bottom-right) to enter Edit Mode
3. A **Translation Manager** panel appears (top-right) with a search box
4. **Search** for any translation key or text content across all 3 languages
5. **Click a result** to open the TranslationEditor modal
6. **Edit** English, Urdu, and Sindhi values
7. **Save** — changes persist in localStorage and override base translations

### Inline Editing with EditableTranslation

For components that want inline edit buttons, use the `EditableTranslation` wrapper:

```tsx
import { EditableTranslation } from '../i18n/tms';

// Instead of:
<h1>{t('unit1.title')}</h1>

// Use:
<EditableTranslation tKey="unit1.title" as="h1" />
```

When admin mode is ON, a small edit pencil icon appears on hover. Clicking it opens the TranslationEditor for that key. When admin mode is OFF, it renders identically to `t()`.

### Bulk Export/Import

- **Export**: Click the download icon in the panel header to export all overrides as JSON
- **Import**: Click the upload icon to import overrides from a JSON file
- Supports multiple formats: flat key-value, multi-language objects, and full override store format

### Glossary

Click the "Glossary" button in the admin toggle to browse the physics terminology glossary. Use it to ensure consistent translations of physics terms across all units.

## Translation Guidelines

### Do
- Keep all 3 language dictionaries in sync (same keys)
- Use consistent physics terminology across units
- Reuse existing translated terms from other units
- Provide meaningful fallback text in English
- Test RTL layout with Urdu/Sindhi text
- Use the admin panel to correct translations — corrections persist automatically
- Check the glossary before translating physics terms

### Don't
- Hardcode text in components (always use `t()` or `EditableTranslation`)
- Leave empty values in translation dictionaries
- Mix English text into Urdu/Sindhi translations
- Use HTML entities in translation values
- Create keys that are too long or nested too deep

## Physics Terminology Consistency
When adding new physics terms, check existing translations for consistency:
- Search existing translation files for the term
- Use the same Urdu/Sindhi translation across all units
- For new terms, consult standard physics textbooks in Urdu/Sindhi
- The glossary (`physics_terms.json`) has ~150 terms across 8 categories

## RTL Considerations
- Urdu and Sindhi are RTL languages
- The `LanguageContext` automatically sets `dir="rtl"` on `<html>`
- Use Tailwind's RTL utilities where needed
- Test all layouts with RTL text to ensure proper alignment
- Numbers and formulas remain LTR even in RTL text

## Fallback Chain
The `translate()` function uses this fallback:
1. Current language translation
2. English translation
3. The key string itself (or provided fallback)

This ensures the app never shows blank text even if translations are missing.

## Override System

Overrides are stored in `localStorage` under key `tms_overrides`. They persist across page reloads and sync across browser tabs. The override format is:

```json
{
  "lang::key": {
    "key": "unit1.title",
    "lang": "ur",
    "value": "تصحیح شدہ عنوان",
    "timestamp": 1716300000000,
    "source": "manual"
  }
}
```

To clear all overrides: use the admin panel or call `clearOverrides()` from the TMS API.
