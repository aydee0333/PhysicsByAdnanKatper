# Component Guidelines — PhysicsByAdnanKatper

## Component Architecture

### Unit Content Components
Each unit has a dedicated `UnitXContent.tsx` component that contains:
1. **Section wrapper** — Repeating card layout with icon + title
2. **Simulations** — Interactive physics demos as sub-components
3. **Quiz** — MCQ quiz using `UnitQuiz` component
4. **Summary** — Key takeaways section

### Shared Components
| Component | Purpose | Location |
|-----------|---------|----------|
| `UnitQuiz` | Reusable MCQ quiz engine | `components/UnitQuiz.tsx` |
| `UnitSidebar` | Section navigation sidebar | `components/UnitSidebar.tsx` |
| `PhysicsBackground` | Animated particle canvas | `components/PhysicsBackground.tsx` |
| `LanguageSwitcher` | Language dropdown | `components/LanguageSwitcher.tsx` |

## Writing a New Unit Component

### 1. File Structure
```tsx
import { useState } from 'react';
import { IconName } from 'lucide-react';
import { useT } from '../../i18n/LanguageContext';
import UnitQuiz from '../UnitQuiz';

// Section wrapper (will be extracted to shared component)
function Section({ title, icon, children, color = 'brand-cyan' }) {
  // ... standard section wrapper
}

// Simulation sub-components
function MySimulation() {
  const t = useT();
  // Interactive simulation logic
  return <div>...</div>;
}

// Main export
export default function UnitXContent() {
  const t = useT();

  return (
    <>
      <Section title={t('unitX.section1')} icon={<IconName />}>
        <MySimulation />
      </Section>

      <UnitQuiz
        unitId="unitX"
        questions={[
          {
            id: 'q1',
            question: t('unitX.quiz.q1'),
            options: [t('unitX.quiz.q1.opt1'), t('unitX.quiz.q1.opt2'), t('unitX.quiz.q1.opt3'), t('unitX.quiz.q1.opt4')],
            correctIndex: 0,
          },
        ]}
      />

      <div className="unit-detail-reveal glass-card-strong rounded-3xl p-8 text-center mb-16">
        <h3 className="text-2xl font-black text-white mb-6">{t('unitX.summary')}</h3>
        {/* Summary content */}
      </div>
    </>
  );
}
```

### 2. Simulation Guidelines
- Keep simulations self-contained as sub-components
- Use `useState` for interactive state (sliders, toggles)
- Use `useRef` + canvas for particle/physics animations
- Use `useT()` for all user-facing text
- Support both touch and mouse input for mobile

### 3. Styling Patterns
- Use `glass-card` for content sections
- Use `glass-card-strong` for emphasis sections
- Use brand color tokens: `brand-purple`, `brand-cyan`, `brand-pink`, `brand-amber`, etc.
- Use `unit-detail-reveal` class for scroll-reveal animations
- Always include `mb-16` spacing between sections

### 4. Translation Integration
- All strings must use `t('unitX.key')` pattern
- Never hardcode English/Urdu/Sindhi text
- Quiz options must use translation keys
- Section titles must use translation keys

## Quiz Question Format
```typescript
interface QuizQuestion {
  id?: string;           // Optional unique identifier
  question: string;      // t('unitX.quiz.q1')
  options: string[];     // [t('unitX.quiz.q1.opt1'), ...]
  correctIndex: number;  // 0-based index of correct answer
  explanation?: string;  // Optional explanation text
}
```

## Color Palette
| Token | Hex | Usage |
|-------|-----|-------|
| `brand-dark` | `#0a0a1a` | Background |
| `brand-navy` | `#0f0f2e` | Secondary bg |
| `brand-purple` | `#7c3aed` | Primary accent |
| `brand-pink` | `#ec4899` | Secondary accent |
| `brand-cyan` | `#06b6d4` | Info/links |
| `brand-amber` | `#f59e0b` | Warnings/highlights |
| `brand-lime` | `#84cc16` | Success |
| `brand-rose` | `#f43f5e` | Errors/danger |
| `brand-teal` | `#14b8a6` | Neutral accent |

## Responsive Breakpoints
- Mobile-first: base styles for phones
- `sm:` — 640px (large phones)
- `md:` — 768px (tablets)
- `lg:` — 1024px (desktop)
- `xl:` — 1280px (large desktop)
