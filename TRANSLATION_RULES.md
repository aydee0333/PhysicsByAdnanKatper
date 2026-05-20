# Translation Rules — PhysicsByAdnanKatper

## Supported Languages
| Code | Language | Direction | Font |
|------|----------|-----------|------|
| `en` | English | LTR | Poppins |
| `ur` | Urdu | RTL | Noto Nastaliq Urdu |
| `sd` | Sindhi | RTL | Noto Naskh Arabic |

## File Structure
```
src/i18n/translations/
├── index.ts      # Merges all modules, exports translate() and LANG_META
├── common.ts     # Shared strings (nav, login, footer, homepage)
├── unit1.ts      # Unit 1 translations
├── unit2.ts      # Unit 2 translations
└── ...           # One file per unit
```

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

## Translation Guidelines

### Do
- Keep all 3 language dictionaries in sync (same keys)
- Use consistent physics terminology across units
- Reuse existing translated terms from other units
- Provide meaningful fallback text in English
- Test RTL layout with Urdu/Sindhi text

### Don't
- Hardcode text in components (always use `t()`)
- Leave empty values in translation dictionaries
- Mix English text into Urdu/Sindhi translations
- Use HTML entities in translation values
- Create keys that are too long or nested too deep

## Physics Terminology Consistency
When adding new physics terms, check existing translations for consistency:
- Search existing translation files for the term
- Use the same Urdu/Sindhi translation across all units
- For new terms, consult standard physics textbooks in Urdu/Sindhi

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
