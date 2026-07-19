# Ninja Design Hub — Portfolio

> Premium freelance design & web agency portfolio. Built with vanilla HTML5, CSS3, and JavaScript — no framework required.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## 📋 Project Overview

**Ninja Design Hub** is a production-ready portfolio website for a high-end freelancing agency. It showcases web design, UI/UX, brand identity, and digital experience work using a **Black & Rustic Gold** design system.

The repository contains two distinct entry points:

| File | Purpose |
|------|---------|
| `index.html` | **Ninja Design Hub** — primary portfolio site (dark theme, gold palette) |
| `ndj.html` | **NDJ Agency** — alternate brand page (orange/black palette, pricing & AI focus) |

Both pages are production-ready and serve distinct branding purposes. `index.html` is the main entry point for deployment.

---

## ✨ Features

- 🎨 **Premium dark UI** — Black & Rustic Gold design system with CSS custom properties
- 🌀 **Smooth scrolling** — powered by [Lenis](https://github.com/darkroomengineering/lenis)
- ⚡ **Animated hero** — word-split title, typewriter terminal intro, parallax floating cards
- 📊 **Animated counters** — Intersection Observer-driven stat roll-up
- 🖱️ **3D card tilt** — `mousemove`-driven perspective tilt on project / testimonial cards
- 📱 **Fully responsive** — mobile-first layout across 375 px → 1440 px+
- ♿ **Accessible** — skip link, ARIA labels, `focus-visible` outlines, semantic HTML5
- 🔍 **SEO-ready** — unique titles, meta descriptions, Open Graph, Twitter Card, JSON-LD, sitemap, robots.txt
- 📨 **Contact form** — client-side validation with success state
- 🖼️ **Lazy-loaded images** — `loading="lazy"` + explicit `width`/`height` to prevent CLS
- ⚙️ **React component** — optional `ProjectShowcase.jsx` for Next.js / Vite projects

---

## 🛠️ Technologies Used

| Layer | Technology |
|-------|-----------|
| Markup | HTML5 (semantic elements) |
| Styling | CSS3 (custom properties, Grid, Flexbox, `clamp()`) |
| Scripting | Vanilla JavaScript ES6+ |
| Smooth scroll | [Lenis 1.1.20](https://github.com/darkroomengineering/lenis) (CDN) |
| Fonts | Google Fonts — Space Grotesk, Inter, Playfair Display, JetBrains Mono |
| React (optional) | React 18 + Framer Motion + Lenis |
| Version control | Git / GitHub |

---

## 📂 Folder Structure

```
ndj/                         ← repository root
├── index.html               ← Main entry point (Ninja Design Hub portfolio)
├── ndj.html                 ← NDJ Agency brand page (separate identity)
├── styles.css               ← Complete design system for index.html
├── script.js                ← All JS for index.html (scroll, menu, animations)
├── robots.txt               ← Search crawler directives
├── sitemap.xml              ← XML sitemap for SEO
├── LICENSE                  ← MIT License
├── README.md                ← This file
├── assets/
│   ├── logo.png             ← Ninja Design Hub logo
│   ├── ndj.jpeg             ← NDJ brand image
│   ├── hero-showcase.png    ← OG / hero image
│   ├── project-florist.png  ← The Secret Florist project screenshot
│   ├── project-dashboard.png
│   ├── project-commerce.png
│   ├── project-mobile.png
│   ├── project-brand.png
│   └── project-saas.png
├── react/
│   ├── ProjectShowcase.jsx  ← Drop-in React component (Framer Motion)
│   └── README.md            ← React component usage guide
└── scripts/
    ├── static-server.mjs    ← Local dev server (Node.js)
    └── generate-assets.ps1  ← PowerShell asset generation helper
```

---

## 🚀 Installation

### Prerequisites

- A modern web browser (Chrome 90+, Firefox 88+, Edge 90+, Safari 14+)
- **Node.js 18+** — only required if you want a local dev server

### Clone the repository

```bash
git clone https://github.com/thushyanth12/ndj.git
cd ndj
```

---

## 💻 Running Locally

### Option A — Open directly (zero dependencies)

Double-click `index.html` — the site works entirely from the file system.

### Option B — Node.js dev server (recommended, avoids CORS issues)

```bash
node scripts/static-server.mjs
```

Then open **http://localhost:3000** in your browser.

### Option C — npm `serve` (install once globally)

```bash
npm install -g serve
serve .
```

Open the URL printed in the terminal (usually **http://localhost:3000**).

---

## 🌐 Deployment

The site consists of static files — deploy to any static host with zero build step.

### GitHub Pages (recommended)

```bash
# Push the main branch — GitHub Pages serves index.html automatically
git add .
git commit -m "feat: update portfolio"
git push origin main
```

Enable Pages under **Settings → Pages → Branch: main / root**.

Live URL: `https://thushyanth12.github.io/ndj/`

### Netlify / Vercel

1. Connect the repository.
2. Set **Publish directory** to `.` (root).
3. No build command needed.

### Other hosts (AWS S3, Cloudflare Pages, Firebase Hosting)

Upload all files at the root level. Ensure `index.html` is served as the default document.

---

## 🎨 Customization

### Brand colours

Edit the CSS custom properties in `styles.css`:

```css
:root {
  --rustic-gold:     #e03000;  /* primary accent */
  --muted-rustic-gold: #ff4500;
  --deep-gold:       #c02800;
  --text-main:       #f5f0ee;
  --text-muted:      #a8a8a8;
  --black:           #050505;
}
```

### Typography

Swap Google Font families in the `<link>` tag inside `index.html` and update the `font-family` references in `styles.css`.

### Projects

Each project card lives in the **Selected Work** section of `index.html`. Duplicate an `<article class="project-card">` block and update:
- `src` — point to your image in `assets/`
- `alt` — descriptive alt text
- Category tags, title, description, and tech stack spans

### Contact email

Replace `hello@ninjadesignhub.com` in `index.html` (contact section `<a href="mailto:…">` and the form action).

### Social links

Update the `href` values in the contact section and footer of `index.html`.

---

## 📸 Screenshots

The portfolio itself is the screenshot — open `index.html` in a browser to see the live design.

Key sections: Hero → Why Us → Stats → Trusted Brands → Services → Selected Work → Testimonials → Process → FAQ → Contact

---

## 📝 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

```
Copyright (c) 2026 Thushyanth
```

---

## 👤 Author

**Thushyanth**

- GitHub: [@thushyanth12](https://github.com/thushyanth12)
- Repository: [github.com/thushyanth12/ndj](https://github.com/thushyanth12/ndj)

---

*Crafting digital experiences for brands that refuse to be ordinary.*
