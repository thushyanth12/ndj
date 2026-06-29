/* ============================================================
   NINJA DESIGN HUB — Main Script
   ============================================================ */

'use strict';

// ── LOADER ──────────────────────────────────────────────────
const loader = document.getElementById('loader');
window.addEventListener('load', () => {
  setTimeout(() => {
    loader.classList.add('hidden');
    document.body.style.overflow = '';
  }, 1900);
});
document.body.style.overflow = 'hidden';

// ── HEADER SCROLL STATE ──────────────────────────────────────
const header = document.querySelector('[data-header]');
const setHeaderState = () => {
  header.classList.toggle('is-scrolled', window.scrollY > 30);
};
setHeaderState();
window.addEventListener('scroll', setHeaderState, { passive: true });

// ── MOBILE MENU ──────────────────────────────────────────────
const menuToggles = document.querySelectorAll('[data-menu-toggle]');
const mobilePanel = document.querySelector('[data-mobile-panel]');
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
    const isOpen = mobilePanel.classList.contains('is-open');
    isOpen ? closeMenu() : openMenu();
  });
});

mobileOverlay.addEventListener('click', closeMenu);
mobilePanel.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));

// ── HERO TITLE WORD SPLIT ─────────────────────────────────────
const splitEl = document.querySelector('[data-split]');
if (splitEl) {
  const words = splitEl.textContent.trim().split(/\s+/);
  splitEl.innerHTML = words.map((w, i) =>
    `<span class="word" style="animation-delay:${i * 0.09 + 0.3}s">${w}</span>`
  ).join(' ');
}

// ── INTERSECTION OBSERVER — REVEAL ───────────────────────────
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });

document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = `${Math.min(i % 6, 5) * 65}ms`;
  revealObs.observe(el);
});

// ── STAT COUNTER ANIMATION ────────────────────────────────────
const counters = document.querySelectorAll('.stat-num[data-count]');
const countObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseInt(el.dataset.count, 10);
    const duration = 1600;
    const step = target / (duration / 16);
    let current = 0;
    const tick = () => {
      current = Math.min(current + step, target);
      el.textContent = Math.floor(current);
      if (current < target) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    countObs.unobserve(el);
  });
}, { threshold: 0.5 });

counters.forEach(c => countObs.observe(c));

// ── PARALLAX HERO GLOW ────────────────────────────────────────
const heroGlow = document.querySelector('.hero-glow');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion && heroGlow) {
  document.querySelector('.hero')?.addEventListener('mousemove', e => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    heroGlow.style.left = `${x}%`;
    heroGlow.style.top = `${y}%`;
  }, { passive: true });
}

// ── CONTACT FORM ──────────────────────────────────────────────
const form = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');
const submitBtn = document.getElementById('form-submit-btn');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Basic validation
    const required = form.querySelectorAll('[required]');
    let valid = true;
    required.forEach(field => {
      field.style.borderColor = '';
      if (!field.value.trim()) {
        field.style.borderColor = '#e53935';
        valid = false;
      }
    });

    // Email validation
    const emailField = document.getElementById('field-email');
    const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailField && !emailRx.test(emailField.value)) {
      emailField.style.borderColor = '#e53935';
      valid = false;
    }

    if (!valid) return;

    // Simulate send
    const label = submitBtn.querySelector('.btn-label');
    label.textContent = 'Sending…';
    submitBtn.disabled = true;

    setTimeout(() => {
      form.reset();
      form.style.display = 'none';
      formSuccess.classList.add('show');
      submitBtn.disabled = false;
      label.textContent = 'Send Message';
    }, 1400);
  });
}

// ── SMOOTH NAV ACTIVE STATE ───────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.desktop-nav a');

const activeObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle(
          'active',
          link.getAttribute('href') === `#${entry.target.id}`
        );
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => activeObs.observe(s));
