# Physics by Adnan Katper

Interactive Class IX & X Physics learning portal — built for students of **Govt. Boys Higher Secondary School, Naudero (Sindh, Pakistan)**.

> Teacher: **Adnan Katper** · 0333‑7575953

![Stack](https://img.shields.io/badge/React-19-61dafb) ![Vite](https://img.shields.io/badge/Vite-7-646cff) ![Tailwind](https://img.shields.io/badge/Tailwind-v4-38bdf8) ![Single-file](https://img.shields.io/badge/Build-Single%20HTML-success)

---

## ✨ Features

- 🔐 **Login screen** with floating teacher portrait, modern typewriter animation, and animated physics background
- 🌐 **Tri-lingual UI** — English, Urdu (اُردُو), Sindhi (سنڌي) with full RTL support and proper fonts (Noto Nastaliq Urdu / Noto Naskh Arabic)
- 📚 **9 units per class** with rich content, formulas, real-life Pakistani examples, and interactive widgets
- 🎨 Modern glassmorphic dark UI with GSAP scroll animations
- 📦 **Single-file build** — the entire site is one `index.html` (works offline via double-click)
- 🌍 Deploys to **GitHub Pages, Netlify, Vercel** or any static host

---

## 🔑 Login Credentials

| Field | Value |
|---|---|
| Username | `adnan` |
| Password | `physics@2025` |

> ⚠️ Edit `src/auth/AuthContext.tsx` (`CREDENTIALS` constant) to change these.
> This is a static-site gate, **not real authentication** — anyone with browser devtools can bypass it. Don't use this to protect anything sensitive.

---

## 🚀 Run locally (development)

```bash
npm install
npm run dev
```

Open <http://localhost:5173>.

---

## 📦 Build for production

```bash
npm run build
```

This produces a single self-contained file: `dist/index.html` (~190 KB gzipped, with all CSS, JS, and assets inlined).

### Run offline (no server needed)

Just **double-click `dist/index.html`** — it opens in your browser and works fully offline.
You can also share this file via WhatsApp, USB, or email — students can open it without internet.

> Note: if you've never visited the site before, the Google Fonts (Poppins, Noto Nastaliq Urdu, etc.) are loaded from the CDN on first visit. The site still works without them — fonts just fall back to system defaults.

---

## 🌐 Deployment

### Option 1 — GitHub Pages (automatic) ⭐ recommended

A workflow is included at `.github/workflows/deploy.yml` that builds & deploys on every push to `main`.

**One-time setup:**
1. Push your code to GitHub.
2. Go to your repo → **Settings → Pages**.
3. Under **"Build and deployment"** → **Source**, select **"GitHub Actions"**.
4. Done. Every push to `main` will redeploy automatically.

Your live URL will be:
**https://aydee0333.github.io/PhysicsByAdnanKatper/**

### Option 2 — Netlify (drag & drop)

1. Run `npm run build`.
2. Go to <https://app.netlify.com/drop>.
3. Drag the `dist` folder onto the page.
4. Done. Netlify gives you a free URL like `https://your-site.netlify.app`.

### Option 3 — Vercel

```bash
npm install -g vercel
vercel deploy --prod
```

### Option 4 — Any static host

Upload the contents of `dist/` (just `index.html`) to any web server, Firebase Hosting, Cloudflare Pages, S3, etc. Because `vite.config.ts` uses `base: './'`, the same file works at the root or in any sub-folder.

---

## 🗂 Project structure

```
src/
├── App.tsx                    Routes + auth gate
├── main.tsx, index.css        Theme & global styles
├── auth/                      AuthContext + ProtectedRoute (client-side gate)
├── i18n/                      Tri-lingual translations + LanguageContext
├── pages/
│   ├── LoginPage.tsx          ⭐ Animated full-page login screen
│   ├── HomePage.tsx
│   ├── ClassIXPage.tsx        Grid of 9 unit cards
│   ├── ClassXPage.tsx
│   └── UnitDetailPage.tsx
├── components/
│   ├── Navbar.tsx             With logout + lang switcher
│   ├── Footer.tsx
│   ├── LanguageSwitcher.tsx
│   ├── PhysicsBackground.tsx
│   └── units/Unit1Content.tsx … Unit9Content.tsx
└── utils/cn.ts
```

---

## 🌍 Adding more translations

Open `src/i18n/translations.ts` and add a new key to all three dictionaries (`en`, `ur`, `sd`). Then in any component:

```tsx
import { useT } from '../i18n/LanguageContext';
const t = useT();
return <h1>{t('your.new.key')}</h1>;
```

If a key is missing in `ur` or `sd`, it falls back to English — so you can translate incrementally.

---

## 📝 License

For educational use by Adnan Katper and his students.
