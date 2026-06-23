"use client";

import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useMotionValue, useSpring } from "framer-motion";
import Lenis from "lenis";

const ThemeContext = createContext(null);

const projects = [
  {
    id: 1,
    title: "Signal Ops Dashboard",
    type: "Dashboard",
    year: "2026",
    image: "/assets/project-dashboard.png",
    gradient: "from-[#001F3F] to-[#00D9FF]",
    tags: ["React", "Analytics", "Motion"],
    impact: 42,
    summary: "A high-contrast command center for teams that need fast operational clarity.",
    detail:
      "Designed dense KPI cards, live status surfaces, and motion-led drilldowns so operators can scan problems quickly without losing context.",
  },
  {
    id: 2,
    title: "Monochrome Checkout",
    type: "Commerce",
    year: "2025",
    image: "/assets/project-commerce.png",
    gradient: "from-[#8B0099] to-[#FF006E]",
    tags: ["UX", "Checkout", "A/B"],
    impact: 31,
    summary: "A premium checkout experience with fewer decisions and clearer purchase momentum.",
    detail:
      "Reduced friction through progressive disclosure, quiet validation states, and a compact order review flow optimized for mobile shoppers.",
  },
  {
    id: 3,
    title: "Focus Mobile Suite",
    type: "Mobile",
    year: "2025",
    image: "/assets/project-mobile.png",
    gradient: "from-[#111827] to-[#A3E635]",
    tags: ["Mobile", "Design System", "SaaS"],
    impact: 58,
    summary: "A focused mobile workflow suite for fast capture, sorting, and follow-through.",
    detail:
      "Built reusable interaction patterns for cards, stacks, progress states, and responsive gestures that feel native on small screens.",
  },
  {
    id: 4,
    title: "Studio Launch Kit",
    type: "Brand",
    year: "2024",
    image: "/assets/project-brand.png",
    gradient: "from-[#0F172A] to-[#F97316]",
    tags: ["Brand", "Landing", "CMS"],
    impact: 76,
    summary: "A launch-ready identity and landing experience for a boutique creative studio.",
    detail:
      "Created an editorial homepage, flexible case-study modules, and a restrained visual language built around contrast and confidence.",
  },
];

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("dark");
  const value = useMemo(() => ({ theme, setTheme }), [theme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used inside ThemeProvider");
  return context;
}

function Counter({ value, suffix = "%" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let frame;
    const startedAt = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - startedAt) / 900, 1);
      setDisplay(Math.round(value * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

function SkeletonGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4" aria-label="Loading projects">
      {[0, 1, 2, 3].map((item) => (
        <div key={item} className="h-[420px] overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="h-56 animate-pulse rounded-xl bg-gradient-to-r from-white/5 via-white/15 to-white/5" />
          <div className="mt-5 h-4 w-2/3 animate-pulse rounded bg-white/15" />
          <div className="mt-3 h-3 w-1/2 animate-pulse rounded bg-white/10" />
        </div>
      ))}
    </div>
  );
}

function ProjectCard({ project, selected, onToggle, onOpen }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ type: "spring", stiffness: 110, damping: 18 }}
      whileHover={{ y: -8, rotateX: 2, rotateY: -2 }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] p-3 shadow-2xl shadow-black/30 backdrop-blur-xl"
    >
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Open ${project.title} details`}
        className="block w-full overflow-hidden rounded-xl text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
      >
        <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${project.gradient}`} />
        <div className="relative h-56 overflow-hidden rounded-xl bg-black">
          <img
            src={project.image}
            alt={`${project.title} preview`}
            loading="lazy"
            className="h-full w-full object-cover grayscale transition duration-700 group-hover:scale-110 group-hover:grayscale-0"
          />
          <div className={`absolute inset-0 bg-gradient-to-t ${project.gradient} opacity-0 mix-blend-screen transition duration-500 group-hover:opacity-30`} />
        </div>
      </button>

      <div className="p-3">
        <div className="flex items-center justify-between gap-3 text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
          <span>{project.type}</span>
          <span>{project.year}</span>
        </div>
        <h3 className="mt-4 text-2xl font-black tracking-tight text-white">{project.title}</h3>
        <p className="mt-3 min-h-12 text-sm leading-6 text-slate-300">{project.summary}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-semibold text-white/80 backdrop-blur transition group-hover:border-cyan-300/40 group-hover:bg-white/15"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between">
          <p className="text-sm font-semibold text-slate-300">
            Impact <Counter value={project.impact} />
          </p>
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={selected}
            className="rounded-full border border-white/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white transition hover:border-cyan-300 hover:bg-cyan-300 hover:text-slate-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
          >
            {selected ? "Collapse" : "Expand"}
          </button>
        </div>

        <AnimatePresence initial={false}>
          {selected && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.32 }}
              className="overflow-hidden"
            >
              <p className="mt-5 border-t border-white/10 pt-5 text-sm leading-6 text-slate-200">{project.detail}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}

function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 grid place-items-end bg-black/70 p-3 backdrop-blur-sm md:place-items-center md:p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        role="dialog"
        aria-modal="true"
        aria-label={`${project.title} case study`}
        onClick={onClose}
      >
        <motion.div
          initial={{ y: 70, scale: 0.96, opacity: 0 }}
          animate={{ y: 0, scale: 1, opacity: 1 }}
          exit={{ y: 70, scale: 0.96, opacity: 0 }}
          transition={{ type: "spring", stiffness: 140, damping: 20 }}
          className="max-h-[88vh] w-full max-w-4xl overflow-auto rounded-3xl border border-white/15 bg-slate-950 p-5 shadow-2xl shadow-cyan-950/40 md:p-8"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">{project.type}</p>
              <h3 className="mt-2 text-3xl font-black tracking-tight text-white md:text-5xl">{project.title}</h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close project modal"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white transition hover:bg-white hover:text-slate-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            >
              X
            </button>
          </div>
          <img src={project.image} alt="" loading="lazy" className="mt-6 h-72 w-full rounded-2xl object-cover grayscale" />
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200">{project.detail}</p>
          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            {project.tags.map((tag, index) => (
              <motion.div
                key={tag}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm font-bold text-white"
              >
                {tag}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function InnerProjectShowcase() {
  const { theme, setTheme } = useTheme();
  const [activeFilter, setActiveFilter] = useState("All");
  const [expandedId, setExpandedId] = useState(projects[0].id);
  const [modalProject, setModalProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const mouseX = useSpring(useMotionValue(0), { stiffness: 90, damping: 24 });
  const mouseY = useSpring(useMotionValue(0), { stiffness: 90, damping: 24 });

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
    let frame;
    const raf = (time) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 650);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") setModalProject(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const filters = useMemo(() => ["All", ...new Set(projects.map((project) => project.type))], []);
  const visibleProjects = activeFilter === "All" ? projects : projects.filter((project) => project.type === activeFilter);
  const isDark = theme === "dark";

  return (
    <section
      onMouseMove={(event) => {
        mouseX.set(event.clientX);
        mouseY.set(event.clientY);
      }}
      className={`relative isolate overflow-hidden px-4 py-16 transition-colors duration-700 sm:px-6 lg:px-8 ${
        isDark ? "bg-[#050816] text-white" : "bg-[#F8FAFC] text-slate-950"
      }`}
    >
      <motion.div
        aria-hidden="true"
        style={{ left: mouseX, top: mouseY }}
        className="pointer-events-none fixed z-30 hidden h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300/10 blur-3xl md:block"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.055)_1px,transparent_1px)] bg-[size:54px_54px]"
      />
      <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-80 bg-gradient-to-b from-cyan-400/20 to-transparent" />

      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className={`text-xs font-black uppercase tracking-[0.24em] ${isDark ? "text-cyan-300" : "text-cyan-700"}`}>
              Ninja Designs Hub showcase
            </p>
            <h2 className="mt-4 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl lg:text-7xl">
              Ninja Designs Hub work that moves, responds, and earns attention.
            </h2>
            <p className={`mt-5 max-w-2xl text-base leading-7 ${isDark ? "text-slate-300" : "text-slate-600"}`}>
              Explore premium portfolio work with filters, expandable cards, case details, and metrics that animate as the section comes alive.
            </p>
          </motion.div>

          <button
            type="button"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
            className={`w-fit rounded-full border px-5 py-3 text-sm font-black uppercase tracking-[0.14em] transition ${
              isDark
                ? "border-white/15 bg-white/10 text-white hover:bg-white hover:text-slate-950"
                : "border-slate-300 bg-white text-slate-950 hover:bg-slate-950 hover:text-white"
            }`}
          >
            {isDark ? "Light mode" : "Dark mode"}
          </button>
        </div>

        <div className="mt-10 flex flex-wrap gap-3" role="tablist" aria-label="Project filters">
          {filters.map((filter) => {
            const active = activeFilter === filter;
            return (
              <button
                key={filter}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full px-5 py-3 text-sm font-bold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 ${
                  active
                    ? "bg-cyan-300 text-slate-950 shadow-lg shadow-cyan-300/20"
                    : isDark
                      ? "border border-white/10 bg-white/5 text-white hover:bg-white/10"
                      : "border border-slate-200 bg-white text-slate-700 hover:border-slate-400"
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>

        <div className="mt-10" aria-live="polite">
          {isLoading ? (
            <SkeletonGrid />
          ) : (
            <motion.div layout className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <AnimatePresence mode="popLayout">
                {visibleProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    selected={expandedId === project.id}
                    onToggle={() => setExpandedId(expandedId === project.id ? null : project.id)}
                    onOpen={() => setModalProject(project)}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {[
            ["Projects", projects.length, ""],
            ["Avg impact", 52, "%"],
            ["Motion states", 18, "+"],
          ].map(([label, value, suffix]) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`rounded-2xl border p-6 backdrop-blur-xl ${
                isDark ? "border-white/10 bg-white/[0.06]" : "border-slate-200 bg-white/80"
              }`}
            >
              <p className={`text-sm font-bold uppercase tracking-[0.18em] ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                {label}
              </p>
              <p className="mt-3 text-4xl font-black">
                <Counter value={Number(value)} suffix={String(suffix)} />
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <ProjectModal project={modalProject} onClose={() => setModalProject(null)} />
    </section>
  );
}

export default function ProjectShowcase() {
  return (
    <ThemeProvider>
      <InnerProjectShowcase />
    </ThemeProvider>
  );
}
