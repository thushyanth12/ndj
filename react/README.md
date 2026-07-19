# ProjectShowcase — React Component

A drop-in React component that renders an animated, filterable project grid with expandable cards, a lightbox modal, and animated impact counters. Designed for Next.js 13+, Vite + React 18, or any project with Tailwind CSS enabled.

---

## Prerequisites

| Tool | Version |
|------|---------|
| Node.js | 18+ |
| React | 18+ |
| Tailwind CSS | 3+ (must be configured in your project) |
| framer-motion | 11+ |
| lenis | 1.1+ |

---

## Installation

### 1. Clone or copy the component

Copy `ProjectShowcase.jsx` into your project's components directory:

```bash
# From the repo root
cp react/ProjectShowcase.jsx your-app/src/components/ProjectShowcase.jsx
```

### 2. Install dependencies

```bash
npm install framer-motion lenis
```

Or with yarn / pnpm:

```bash
yarn add framer-motion lenis
pnpm add framer-motion lenis
```

### 3. Copy project images

The component references images from `/assets/`. Copy the `assets/` folder into your app's `public/` directory:

```bash
cp -r assets/ your-app/public/assets/
```

Your public folder should look like:

```
public/
└── assets/
    ├── project-dashboard.png
    ├── project-commerce.png
    ├── project-mobile.png
    └── project-brand.png
```

---

## Example `package.json`

```json
{
  "name": "my-portfolio",
  "version": "1.0.0",
  "dependencies": {
    "framer-motion": "^11.0.0",
    "lenis": "^1.1.0",
    "next": "^14.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  },
  "devDependencies": {
    "tailwindcss": "^3.4.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0"
  }
}
```

---

## Usage

### Next.js (App Router)

```jsx
// app/page.jsx  or  app/work/page.jsx
import ProjectShowcase from "@/components/ProjectShowcase";

export default function WorkPage() {
  return (
    <main>
      <ProjectShowcase />
    </main>
  );
}
```

> The component has `"use client"` at the top — it works with the App Router out of the box.

### Vite + React

```jsx
// src/App.jsx
import ProjectShowcase from "./components/ProjectShowcase";

function App() {
  return <ProjectShowcase />;
}

export default App;
```

---

## Component Structure

```
ProjectShowcase (default export)
└── ThemeProvider          — light/dark context
    └── InnerProjectShowcase
        ├── header + filter tabs
        ├── project grid
        │   └── ProjectCard (×4)
        │       └── AnimatePresence expand panel
        ├── metrics row
        │   └── Counter (animated on scroll)
        └── ProjectModal   — lightbox overlay
```

---

## Props

`ProjectShowcase` accepts **no props** — all data is self-contained in the `projects` array inside the file. To customise projects, edit that array directly.

### Project data shape

```ts
type Project = {
  id:       number;   // unique key
  title:    string;   // displayed as card heading
  type:     string;   // used for filter tabs ("Dashboard", "Commerce", etc.)
  year:     string;   // displayed in card header
  image:    string;   // path relative to public/ e.g. "/assets/project-dashboard.png"
  gradient: string;   // Tailwind gradient classes e.g. "from-[#001F3F] to-[#00D9FF]"
  tags:     string[]; // technology / skill badges
  impact:   number;   // animated counter value (shown as "Impact XX%")
  summary:  string;   // short description shown on card
  detail:   string;   // expanded text shown in modal and expand panel
};
```

### Example — adding a new project

```js
// Inside ProjectShowcase.jsx, in the `projects` array:
{
  id: 5,
  title: "My New Project",
  type: "SaaS",
  year: "2026",
  image: "/assets/project-saas.png",
  gradient: "from-[#0F172A] to-[#22D3EE]",
  tags: ["Next.js", "Tailwind", "Supabase"],
  impact: 64,
  summary: "A one-line summary for the card.",
  detail: "A longer paragraph with full context shown in the modal and expand panel.",
},
```

---

## Customisation

### Change the accent colour

The active filter button uses `bg-cyan-300`. Replace every instance of `cyan-300` in the file with your own Tailwind colour token (e.g. `orange-400`).

### Disable smooth scroll

Remove the `useEffect` that creates the `Lenis` instance if your app already manages scroll globally.

### Remove the theme toggle

Delete the `<button>` that calls `setTheme(...)` and remove the `ThemeContext` / `ThemeProvider` wrappers if you only need one colour mode.

### Static image paths

If your project serves assets from a CDN or a different directory, update the `image` field in each project object:

```js
image: "https://cdn.example.com/images/project-dashboard.webp",
```

---

## Build

No special build step — the component is pure JSX and is compiled by your app's bundler (Next.js, Vite, CRA, etc.).

```bash
# Next.js
npm run build

# Vite
npm run build
```

---

## Accessibility Notes

- Filter buttons use `role="tab"` and `aria-selected` for screen reader support.
- The modal sets `role="dialog"` and `aria-modal="true"`.
- The modal closes on **Escape** key or backdrop click.
- All images have descriptive `alt` text via the `title` field.
- Interactive elements are focusable with `focus-visible` ring styles.
