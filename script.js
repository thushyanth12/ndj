/* ============================================================
   NINJA DESIGN HUB — Enhanced Main Script
   ============================================================ */

'use strict';

/* ── PREFERS-REDUCED-MOTION ────────────────────────────────── */
const PRM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ── LOADER ─────────────────────────────────────────────────── */
const loader = document.getElementById('loader');
document.body.style.overflow = 'hidden';
window.addEventListener('load', () => {
  setTimeout(() => {
    loader.classList.add('hidden');
    document.body.style.overflow = '';
  }, 1900);
});

/* ── SCROLL STATE (single rAF loop) ─────────────────────────── */
const progressBar   = document.getElementById('scroll-progress');
const header        = document.querySelector('[data-header]');

const allSections = Array.from(document.querySelectorAll('section[id]'));

let ticking = false;

function onScroll() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(updateScroll);
}

function updateScroll() {
  const scrollY     = window.scrollY;
  const docH        = document.documentElement.scrollHeight - window.innerHeight;
  const pct         = docH > 0 ? Math.min((scrollY / docH) * 100, 100) : 0;

  /* Progress bar */
  if (progressBar) progressBar.style.width = pct + '%';

  /* Header scrolled state */
  if (header) header.classList.toggle('is-scrolled', scrollY > 30);

  ticking = false;
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll(); // run once on load

/* ── MOBILE MENU ────────────────────────────────────────────── */
const menuToggles   = document.querySelectorAll('[data-menu-toggle]');
const mobilePanel   = document.querySelector('[data-mobile-panel]');
const mobileOverlay = document.querySelector('[data-mobile-overlay]');

const openMenu = () => {
  mobilePanel.classList.add('is-open');
  mobileOverlay.classList.add('is-open');
  menuToggles[0].setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
};
const closeMenu = () => {
  mobilePanel.classList.remove('is-open');
  mobileOverlay.classList.remove('is-open');
  menuToggles.forEach(t => t.setAttribute('aria-expanded', 'false'));
  document.body.style.overflow = '';
};

menuToggles.forEach(toggle => {
  toggle.addEventListener('click', () => {
    mobilePanel.classList.contains('is-open') ? closeMenu() : openMenu();
  });
});
mobileOverlay.addEventListener('click', closeMenu);
mobilePanel.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));

/* ── HERO TITLE WORD SPLIT ──────────────────────────────────── */
const splitEl = document.querySelector('[data-split]');
if (splitEl) {
  const words = splitEl.textContent.trim().split(/\s+/);
  splitEl.innerHTML = words.map((w, i) =>
    `<span class="word" style="animation-delay:${i * 0.09 + 0.3}s">${w}</span>`
  ).join(' ');
}

/* ── TERMINAL CURSOR ────────────────────────────────────────── */
const terminalLine = document.getElementById('terminal-line');
if (terminalLine) {
  const phrases = [
    'crafting digital experiences',
    'building premium websites',
    'designing brand identities',
    'shipping pixel-perfect UI',
  ];
  let pIdx = 0, cIdx = 0, deleting = false;
  const SPEED_TYPE = 65, SPEED_DEL = 35, PAUSE = 2000;

  function typeLoop() {
    const phrase = phrases[pIdx];
    terminalLine.textContent = phrase.slice(0, cIdx);
    if (!deleting) {
      if (cIdx < phrase.length) { cIdx++; setTimeout(typeLoop, SPEED_TYPE); }
      else { deleting = true; setTimeout(typeLoop, PAUSE); }
    } else {
      if (cIdx > 0) { cIdx--; setTimeout(typeLoop, SPEED_DEL); }
      else { deleting = false; pIdx = (pIdx + 1) % phrases.length; setTimeout(typeLoop, 400); }
    }
  }
  if (!PRM) typeLoop();
  else terminalLine.textContent = phrases[0];
}

/* ── INTERSECTION OBSERVER — .reveal (staggered by group) ───── */
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.06, rootMargin: '0px 0px -4% 0px' });

// Group siblings in same parent for stagger — feels more orchestrated
document.querySelectorAll('.reveal').forEach((el) => {
  const siblings = el.parentElement
    ? Array.from(el.parentElement.querySelectorAll('.reveal'))
    : [el];
  const idx = siblings.indexOf(el);
  // Max 5 items stagger, 70ms step — smooth without feeling slow
  el.style.transitionDelay = `${Math.min(idx, 4) * 70}ms`;
  revealObs.observe(el);
});

/* ── INTERSECTION OBSERVER — .fade-up (new reusable class) ──── */
const fadeUpObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      fadeUpObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -5% 0px' });

document.querySelectorAll('.fade-up').forEach((el, i) => {
  el.style.transitionDelay = `${(i % 4) * 75}ms`;
  fadeUpObs.observe(el);
});

/* ── STAT COUNTER ───────────────────────────────────────────── */
const counters = document.querySelectorAll('.stat-num[data-count]');
const countObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el     = entry.target;
    const target = parseInt(el.dataset.count, 10);
    const dur    = 1600;
    const step   = target / (dur / 16);
    let cur = 0;
    const tick = () => {
      cur = Math.min(cur + step, target);
      el.textContent = Math.floor(cur);
      if (cur < target) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    countObs.unobserve(el);
  });
}, { threshold: 0.5 });
counters.forEach(c => countObs.observe(c));

/* ── PARALLAX HERO GLOW (smooth lerp) ─────────────────────── */
const heroGlow = document.querySelector('.hero-glow');
const heroSection = document.querySelector('.hero');
if (!PRM && heroGlow && heroSection) {
  let glowX = 30, glowY = 50, targetX = 30, targetY = 50;
  let glowRaf = null;

  function lerpGlow() {
    glowX += (targetX - glowX) * 0.06;
    glowY += (targetY - glowY) * 0.06;
    heroGlow.style.left = `${glowX}%`;
    heroGlow.style.top  = `${glowY}%`;
    glowRaf = requestAnimationFrame(lerpGlow);
  }

  heroSection.addEventListener('mouseenter', () => {
    glowRaf = requestAnimationFrame(lerpGlow);
  }, { passive: true });
  heroSection.addEventListener('mouseleave', () => {
    cancelAnimationFrame(glowRaf);
    // Drift back to center
    targetX = 30; targetY = 50;
    glowRaf = requestAnimationFrame(lerpGlow);
    setTimeout(() => cancelAnimationFrame(glowRaf), 1000);
  }, { passive: true });
  heroSection.addEventListener('mousemove', e => {
    const rect = heroSection.getBoundingClientRect();
    targetX = ((e.clientX - rect.left) / rect.width) * 100;
    targetY = ((e.clientY - rect.top)  / rect.height) * 100;
  }, { passive: true });
}

/* ── CARD MOUSE-GLOW SPOTLIGHT ─────────────────────────────── */
if (!PRM) {
  const glowCards = document.querySelectorAll('.why-card, .service-card, .project-card');
  glowCards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width)  * 100;
      const y = ((e.clientY - r.top)  / r.height) * 100;
      card.style.setProperty('--mx', `${x}%`);
      card.style.setProperty('--my', `${y}%`);
    }, { passive: true });
  });
}

/* ── CONTACT FORM ───────────────────────────────────────────── */
const form        = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');
const submitBtn   = document.getElementById('form-submit-btn');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const required = form.querySelectorAll('[required]');
    let valid = true;
    required.forEach(field => {
      field.style.borderColor = '';
      if (!field.value.trim()) { field.style.borderColor = '#e53935'; valid = false; }
    });
    const emailField = document.getElementById('field-email');
    const emailRx    = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailField && !emailRx.test(emailField.value)) {
      emailField.style.borderColor = '#e53935'; valid = false;
    }
    if (!valid) return;

    const label = submitBtn.querySelector('.btn-label');
    label.textContent = 'Sending…';
    submitBtn.disabled = true;

    setTimeout(() => {
      form.reset();
      form.style.display = 'none';
      formSuccess.classList.add('show');
      submitBtn.disabled = false;
      label.textContent  = 'Send Message';
    }, 1400);
  });
}

/* ── DESKTOP NAV ACTIVE (fallback via IntersectionObserver) ─── */
const navLinks = document.querySelectorAll('.desktop-nav a');
const activeObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
      });
    }
  });
}, { threshold: 0.4 });
allSections.forEach(s => activeObs.observe(s));

/* ── PROJECT CARD — number labels ──────────────────────────── */
document.querySelectorAll('.project-card').forEach((card, i) => {
  const num = card.querySelector('.proj-num');
  if (num) num.textContent = String(i + 1).padStart(2, '0');
});
