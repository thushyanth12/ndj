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

/* ── LENIS SMOOTH SCROLL ────────────────────────────────────── */
let lenis;
if (!PRM && typeof Lenis !== 'undefined') {
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smoothWave: true,
    syncTouch: false,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Smooth scroll anchors using Lenis
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        lenis.scrollTo(target, {
          offset: -80,
          duration: 1.2,
        });
        
        // Support closing mobile menu panel on anchor link click
        if (typeof closeMenu === 'function') {
          closeMenu();
        }
      }
    });
  });
}

/* ── SCROLL STATE (single rAF loop) ─────────────────────────── */
const progressBar   = document.getElementById('scroll-progress');
const header        = document.querySelector('[data-header]');

const allSections = Array.from(document.querySelectorAll('section[id]'));
const navLinks    = document.querySelectorAll('.desktop-nav a');

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

  /* Scrollspy active class */
  updateActiveNavLink(scrollY);

  ticking = false;
}

function updateActiveNavLink(scrollY) {
  const scrollPosition = scrollY + 120; // offset for fixed header
  let activeSectionId = '';
  
  // Handle bottom of page scroll override
  const isAtBottom = (scrollY + window.innerHeight) >= (document.documentElement.scrollHeight - 20);
  
  if (isAtBottom && allSections.length > 0) {
    activeSectionId = allSections[allSections.length - 1].id;
  } else {
    allSections.forEach(section => {
      const top = section.getBoundingClientRect().top + scrollY;
      const height = section.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        activeSectionId = section.id;
      }
    });
  }
  
  if (activeSectionId) {
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${activeSectionId}`);
    });
  }
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

/* ── PARALLAX HERO ELEMENTS (glow + floating cards) ───────── */
const heroSection = document.querySelector('.hero');
const heroGlow = document.querySelector('.hero-glow');
const fc1 = document.querySelector('.fc1');
const fc2 = document.querySelector('.fc2');
const fc3 = document.querySelector('.fc3');

if (!PRM && heroSection) {
  let glowX = 30, glowY = 50, targetX = 30, targetY = 50;
  let fc1X = 0, fc1Y = 0, fc2X = 0, fc2Y = 0, fc3X = 0, fc3Y = 0;
  let targetFc1X = 0, targetFc1Y = 0, targetFc2X = 0, targetFc2Y = 0, targetFc3X = 0, targetFc3Y = 0;
  let parallaxRaf = null;

  function lerpParallax() {
    // Glow lerp
    glowX += (targetX - glowX) * 0.08;
    glowY += (targetY - glowY) * 0.08;
    if (heroGlow) {
      heroGlow.style.left = `${glowX}%`;
      heroGlow.style.top  = `${glowY}%`;
    }

    // Float cards lerp (3D parallax translations)
    fc1X += (targetFc1X - fc1X) * 0.08;
    fc1Y += (targetFc1Y - fc1Y) * 0.08;
    fc2X += (targetFc2X - fc2X) * 0.08;
    fc2Y += (targetFc2Y - fc2Y) * 0.08;
    fc3X += (targetFc3X - fc3X) * 0.08;
    fc3Y += (targetFc3Y - fc3Y) * 0.08;

    if (fc1) fc1.style.transform = `translate(${fc1X}px, ${fc1Y}px)`;
    if (fc2) fc2.style.transform = `translate(${fc2X}px, ${fc2Y}px)`;
    if (fc3) fc3.style.transform = `translate(${fc3X}px, ${fc3Y}px)`;

    parallaxRaf = requestAnimationFrame(lerpParallax);
  }

  heroSection.addEventListener('mouseenter', () => {
    parallaxRaf = requestAnimationFrame(lerpParallax);
  }, { passive: true });

  heroSection.addEventListener('mouseleave', () => {
    cancelAnimationFrame(parallaxRaf);
    // Reset to defaults
    targetX = 30; targetY = 50;
    targetFc1X = 0; targetFc1Y = 0;
    targetFc2X = 0; targetFc2Y = 0;
    targetFc3X = 0; targetFc3Y = 0;
    
    // Lerp back to center
    parallaxRaf = requestAnimationFrame(lerpParallax);
    setTimeout(() => cancelAnimationFrame(parallaxRaf), 1200);
  }, { passive: true });

  heroSection.addEventListener('mousemove', e => {
    const rect = heroSection.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Normalized coordinates (-0.5 to 0.5)
    const nx = (x / rect.width) - 0.5;
    const ny = (y / rect.height) - 0.5;

    // Set glow targets
    targetX = (x / rect.width) * 100;
    targetY = (y / rect.height) * 100;

    // Set float card offsets (different weights and directions for 3D depth feeling)
    targetFc1X = nx * 35;  targetFc1Y = ny * 35;  // moves with mouse
    targetFc2X = -nx * 45; targetFc2Y = -ny * 45; // moves opposite to mouse (feels deeper)
    targetFc3X = nx * 20;  targetFc3Y = ny * 20;  // moves slightly with mouse
  }, { passive: true });
}

/* ── CARD 3D TILT & GLOW ───────────────────────────────────── */
if (!PRM) {
  const tiltCards = document.querySelectorAll('.why-card, .service-card, .project-card, .testi-card');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const w = rect.width;
      const h = rect.height;
      
      // Calculate rotation angles based on cursor position relative to card center
      // Max rotation: 8 degrees for a premium refined tactile feedback
      const rotateX = ((h / 2 - y) / (h / 2)) * 8;
      const rotateY = ((x - w / 2) / (w / 2)) * 8;
      
      // Apply 3D rotation
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
      
      // Update mouse glow coordinates
      const mx = (x / w) * 100;
      const my = (y / h) * 100;
      card.style.setProperty('--mx', `${mx}%`);
      card.style.setProperty('--my', `${my}%`);
    }, { passive: true });
    
    card.addEventListener('mouseleave', () => {
      // Smoothly reset rotation
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
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

/* ── DESKTOP NAV ACTIVE INITIALIZATION ─────────────────────── */
// Handled reactively by the main tick listener updateActiveNavLink

/* ── PROJECT CARD — number labels ──────────────────────────── */
document.querySelectorAll('.project-card').forEach((card, i) => {
  const num = card.querySelector('.proj-num');
  if (num) num.textContent = String(i + 1).padStart(2, '0');
});
