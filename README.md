# Ninja Design Hub Portfolio

---

## 🎯 Project Overview

**Ninja Design Hub** is a premium, modern portfolio website showcasing design work for a high‑end freelancing agency. The site is built with **vanilla HTML, CSS, and JavaScript**—no frameworks—while delivering a polished, dark‑themed UI using a **Black & Rustic Gold** color palette.

Key highlights:
- Responsive layout that works beautifully on mobile, tablet, and desktop
- Elegant hero section with animated scroll effects
- Clean, reusable component classes for services, projects, testimonials, and contact form
- SEO‑friendly markup with proper heading hierarchy, meta tags, and Open Graph data
- Accessible design – high contrast, focus styles, and keyboard navigation

---

## 🛠️ Tech Stack

- **HTML5** – Semantic markup (`<header>`, `<section>`, `<article>`, etc.)
- **CSS3** – Custom design system, CSS variables for theme colors, fluid grid, and micro‑animations
- **JavaScript (ES6+)** – Light interactivity (hamburger menu, smooth scrolling, form validation)
- **Git** – Version control, CI‑ready

---

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Edge, Safari)
- Node.js (optional, only for running a local dev server)

### Installation
```bash
# Clone the repository
git clone https://github.com/your-username/ninja-design-hub.git

# Navigate to the project folder
cd ninja-design-hub
```

### Development Server (optional)
If you prefer hot‑reloading while you develop:
```bash
# Using npm's serve package (install globally if needed)
npm install -g serve
serve -s .
```
Open `http://localhost:5000` in your browser.

---

## 📂 Project Structure
```
📁 root
├─ index.html          # Main entry point
├─ assets/             # Images, fonts, icons
├─ css/
│   ├─ base.css       # Reset & base styles
│   ├─ layout.css     # Grid & layout utilities
│   └─ theme.css      # Dark theme, color variables
├─ js/
│   └─ main.js        # UI interactions (menu, scroll effects)
└─ README.md           # This file
```

---

## 🎨 Design System
- **Colors** (CSS variables in `theme.css`):
  - `--color-bg`: `hsl(0, 0%, 5%)` (deep black)
  - `--color-primary`: `hsl(30, 100%, 45%)` (rustic gold)
  - `--color-accent`: `hsl(30, 90%, 55%)`
  - `--color-muted`: `hsl(0, 0%, 30%)`
- **Typography** – Google Font **"Outfit"** for headings and **"Inter"** for body text.
- **Micro‑animations** – `fade-in`, `slide-up`, and subtle hover glows using `transition` and `@keyframes`.

---

## 📈 SEO & Accessibility
- Semantic HTML with a single `<h1>` per page
- Meta tags: `title`, `description`, `viewport`, `robots`
- Open Graph tags for social sharing
- Alt text for all images
- Keyboard‑focusable interactive elements

---

## 📦 Deployment
The site consists of static files, so you can host it on any static‑site provider:
- GitHub Pages
- Netlify
- Vercel (static output)
- AWS S3 + CloudFront

Simply push the `main` branch; the hosting service will serve the files.

---

## 🧰 Scripts & Commands
| Command | Description |
|---------|-------------|
| `npm run dev` | Starts a local dev server (if you install `serve` locally) |
| `git push` | Deploys the latest changes |
| `git status` | Checks repository status |

---

## 🤝 Contributing
Contributions are welcome! Please:
1. Fork the repo
2. Create a feature branch (`git checkout -b feature/awesome-feature`)
3. Commit your changes with clear messages
4. Open a Pull Request

---

## 📜 License
This project is licensed under the **MIT License** – see the `LICENSE` file for details.

---

## ✨ Acknowledgments
- Inspired by premium agency templates and modern UI trends
- Fonts from **Google Fonts**
- Icons from **Font Awesome**

---

*Built with love by the Ninja Design Hub team.*
