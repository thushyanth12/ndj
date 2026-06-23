# React Project Showcase Component

Drop `ProjectShowcase.jsx` into a React, Vite, or Next.js portfolio that already has Tailwind CSS enabled.

Install the animation dependencies:

```bash
npm install framer-motion lenis
```

Use it like this:

```jsx
import ProjectShowcase from "./components/ProjectShowcase";

export default function PortfolioPage() {
  return <ProjectShowcase />;
}
```

The demo image paths point at the existing static assets:

```txt
/assets/project-dashboard.png
/assets/project-commerce.png
/assets/project-mobile.png
/assets/project-brand.png
```

If your React app serves assets from `public`, copy the `assets` folder into `public/assets` or update the `image` fields in `projects`.
