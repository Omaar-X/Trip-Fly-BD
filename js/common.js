/* ============================================================
   TRIP FLY BD — COMMON.JS
   Navbar | Hamburger | Scroll Reveal | Counters | Airplane | WhatsApp Float
============================================================ */

'use strict';

/* ══════════════════════════════════════
   ✈  AIRPLANE ANIMATION
══════════════════════════════════════ */
(function initAirplanes() {
  // Avoid double-init on spa navigation
  if (document.querySelector('.airplane-layer')) return;

  const layer = document.createElement('div');
  layer.className = 'airplane-layer';
  document.body.appendChild(layer);

  const configs = [
    { top: '7%',  size: '1.55rem', dur: '19s', delay: '0s',   anim: 'flyLR'  },
    { top: '22%', size: '1rem',    dur: '27s', delay: '8s',   anim: 'flyLR2' },
    { top: '40%', size: '1.85rem', dur: '23s', delay: '14s',  anim: 'flyLR'  },
    { top: '57%', size: '1.2rem',  dur: '32s', delay: '4s',   anim: 'flyLR3' },
    { top: '72%', size: '0.88rem', dur: '21s', delay: '18s',  anim: 'flyLR2' },
    { top: '86%', size: '1.45rem', dur: '29s', delay: '10s',  anim: 'flyLR'  },
  ];

  configs.forEach(cfg => {
    const el = document.createElement('div');
    el.className = 'plane-obj';
    el.innerHTML = '<i class="fas fa-plane"></i>';
    el.style.cssText = [
      `top:${cfg.top}`,
      'left:0',
      `font-size:${cfg.size}`,
      `animation-name:${cfg.anim}`,
      `animation-duration:${cfg.dur}`,
      `animation-delay:${cfg.delay}`,
      'animation-timing-function:linear',
      'animation-iteration-count:infinite',
    ].join(';');
    layer.appendChild(el);
  });
})();

/* ══════════════════════════════════════
   FLOATING WHATSAPP BUTTON
══════════════════════════════════════ */
(function initWAFloat() {
  if (document.querySelector('.wa-float')) return;
  const wa = document.createElement('a');
  wa.className = 'wa-float';
  wa.href = 'https://wa.me/8801XXXXXXXXX?text=Hello%20Trip%20Fly%20BD!%20I%20want%20to%20enquire%20about%20a%20trip.';
  wa.target = '_blank';
  wa.rel = 'noopener noreferrer';
  wa.setAttribute('aria-label', 'Chat on WhatsApp');
  wa.innerHTML = '<i class="fab fa-whatsapp"></i><span class="wa-float-tooltip">Chat with us!</span>';
  document.body.appendChild(wa);
})();

/* ══════════════════════════════════════
   NAVBAR — SCROLL + HAMBURGER
══════════════════════════════════════ */
const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('navMenu');

// Scroll-based class
if (navbar) {
  const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 60);
  onScroll(); // Run once on load
  window.addEventListener('scroll', onScroll, { passive: true });
}

// Hamburger toggle
if (hamburger && navMenu) {
  const openMenu  = () => { navMenu.classList.add('open');    hamburger.classList.add('active');    document.body.style.overflow = 'hidden'; };
  const closeMenu = () => { navMenu.classList.remove('open'); hamburger.classList.remove('active'); document.body.style.overflow = ''; };
  const isOpen    = () => navMenu.classList.contains('open');

  hamburger.addEventListener('click', e => {
    e.stopPropagation();
    isOpen() ? closeMenu() : openMenu();
  });

  // Close when a link is clicked
  navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on backdrop click
  document.addEventListener('click', e => {
    if (isOpen() && navbar && !navbar.contains(e.target)) closeMenu();
  });

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && isOpen()) closeMenu();
  });

  // Prevent touch scroll bleed on the nav drawer
  navMenu.addEventListener('touchmove', e => { if (isOpen()) e.stopPropagation(); }, { passive: true });
}

/* ══════════════════════════════════════
   ACTIVE NAV LINK
══════════════════════════════════════ */
(function setActiveNav() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(a => {
    const href = a.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
})();

/* ══════════════════════════════════════
   SCROLL REVEAL
══════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
  if (!revealEls.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.07, rootMargin: '0px 0px -35px 0px' });

  revealEls.forEach(el => obs.observe(el));
});

/* ══════════════════════════════════════
   COUNTER ANIMATION
   Usage: <span data-count="5000" data-suffix="+">0</span>
══════════════════════════════════════ */
function animateCount(el) {
  const target = parseFloat(el.dataset.count) || 0;
  const suffix = el.dataset.suffix || '';
  const prefix = el.dataset.prefix || '';
  const duration = 1800; // ms
  const fps = 60;
  const steps = Math.round(duration / (1000 / fps));
  let current = 0;
  let frame = 0;

  const easeOut = t => 1 - Math.pow(1 - t, 3);

  const tick = () => {
    frame++;
    const progress = Math.min(frame / steps, 1);
    current = target * easeOut(progress);
    const display = target >= 100 ? Math.floor(current).toLocaleString() : Math.floor(current);
    el.textContent = prefix + display + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

document.addEventListener('DOMContentLoaded', () => {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  counters.forEach(el => obs.observe(el));
});

/* ══════════════════════════════════════
   HERO PARTICLE STARS (lightweight)
══════════════════════════════════════ */
(function initParticles() {
  const container = document.querySelector('.hero-particles');
  if (!container) return;

  // Only on non-mobile (performance)
  if (window.innerWidth < 600) return;

  for (let i = 0; i < 28; i++) {
    const s = document.createElement('span');
    const size = Math.random() * 3 + 1;
    s.style.cssText = [
      `width:${size}px`,
      `height:${size}px`,
      `left:${Math.random() * 100}%`,
      `top:${Math.random() * 100}%`,
      `animation-duration:${Math.random() * 3 + 2}s`,
      `animation-delay:${Math.random() * 4}s`,
    ].join(';');
    container.appendChild(s);
  }
})();

/* ══════════════════════════════════════
   SMOOTH ANCHOR SCROLL
══════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h') || '70');
    const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});