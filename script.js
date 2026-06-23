const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const mobilePanel = document.querySelector("[data-mobile-panel]");

const setHeaderState = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 24);
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Open menu" : "Close menu");
  mobilePanel.classList.toggle("is-open", !isOpen);
});

mobilePanel.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
    mobilePanel.classList.remove("is-open");
  });
});

const splitTitle = document.querySelector("[data-split]");
if (splitTitle) {
  const words = splitTitle.textContent.trim().split(/\s+/);
  splitTitle.textContent = "";
  words.forEach((word, index) => {
    const span = document.createElement("span");
    span.className = "word";
    span.textContent = word;
    span.style.animationDelay = `${index * 0.08 + 0.12}s`;
    splitTitle.append(span);
    splitTitle.append(document.createTextNode(" "));
  });
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14, rootMargin: "0px 0px -8% 0px" },
);

document.querySelectorAll(".reveal").forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index % 5, 4) * 70}ms`;
  revealObserver.observe(element);
});

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const heroVisual = document.querySelector(".hero-visual");
const heroSubtitle = document.querySelector(".hero-subtitle");

if (!prefersReducedMotion && heroVisual && heroSubtitle) {
  window.addEventListener(
    "scroll",
    () => {
      const progress = Math.min(window.scrollY / window.innerHeight, 1);
      heroVisual.style.transform = `translateY(${progress * 34}px)`;
      heroSubtitle.style.transform = `translateY(${progress * -18}px)`;
      heroSubtitle.style.opacity = `${1 - progress * 0.38}`;
    },
    { passive: true },
  );
}
