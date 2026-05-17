/* ============================================================
   TRIP FLY BD — COMMON.JS
   Navbar | Hamburger | Scroll Reveal | Counters | Airplane | WhatsApp Float
============================================================ */

'use strict';

/* ============================================================
   THEME TOGGLE - DARK DEFAULT + LIGHT MODE
============================================================ */
(function initThemeToggle() {
  const storageKey = 'tripFlyBdTheme';
  const allowedThemes = new Set(['dark', 'light']);

  const getSavedTheme = () => {
    try {
      const saved = localStorage.getItem(storageKey);
      return allowedThemes.has(saved) ? saved : 'dark';
    } catch (error) {
      return 'dark';
    }
  };

  const saveTheme = theme => {
    try {
      localStorage.setItem(storageKey, theme);
    } catch (error) {
      /* localStorage can be unavailable in private/browser-restricted contexts. */
    }
  };

  const updateToggleState = theme => {
    document.querySelectorAll('.theme-toggle').forEach(button => {
      const isLight = theme === 'light';
      button.setAttribute('aria-pressed', String(isLight));
      button.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');
      button.setAttribute('title', isLight ? 'Dark mode' : 'Light mode');
    });
  };

  const applyTheme = theme => {
    const nextTheme = allowedThemes.has(theme) ? theme : 'dark';
    document.body.setAttribute('data-theme', nextTheme);
    document.documentElement.style.colorScheme = nextTheme;

    const themeMeta = document.querySelector('meta[name="theme-color"]');
    if (themeMeta) {
      themeMeta.setAttribute('content', nextTheme === 'light' ? '#F7F0E2' : '#D4AF37');
    }

    updateToggleState(nextTheme);
  };

  const initialTheme = getSavedTheme();
  applyTheme(initialTheme);

  document.querySelectorAll('.theme-toggle').forEach(button => {
    if (button.dataset.themeBound === 'true') return;
    button.dataset.themeBound = 'true';

    button.addEventListener('click', () => {
      const current = document.body.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
      const next = current === 'light' ? 'dark' : 'light';
      applyTheme(next);
      saveTheme(next);
    });
  });
})();

/* ══════════════════════════════════════
   AIRPLANE ANIMATION — HOME PAGE ONLY
══════════════════════════════════════ */
(function initAirplanes() {
  const page = window.location.pathname.split('/').pop() || 'index.html';

  if (page !== 'index.html' && page !== '') return;
  if (document.querySelector('.airplane-layer')) return;

  const layer = document.createElement('div');
  layer.className = 'airplane-layer';
  document.body.appendChild(layer);

  const configs = [
    { top: '7%',  size: '1.55rem', dur: '19s', delay: '0s',  anim: 'flyLR' },
    { top: '22%', size: '1rem',    dur: '27s', delay: '8s',  anim: 'flyLR2' },
    { top: '40%', size: '1.85rem', dur: '23s', delay: '14s', anim: 'flyLR' },
    { top: '57%', size: '1.2rem',  dur: '32s', delay: '4s',  anim: 'flyLR3' },
    { top: '72%', size: '0.88rem', dur: '21s', delay: '18s', anim: 'flyLR2' },
    { top: '86%', size: '1.45rem', dur: '29s', delay: '10s', anim: 'flyLR' }
  ];

  configs.forEach(cfg => {
    const plane = document.createElement('div');
    plane.className = 'plane-obj';
    plane.innerHTML = '<i class="fas fa-plane"></i>';

    plane.style.cssText = `
      top:${cfg.top};
      left:-180px;
      font-size:${cfg.size};
      animation-name:${cfg.anim};
      animation-duration:${cfg.dur};
      animation-delay:${cfg.delay};
      animation-timing-function:linear;
      animation-iteration-count:infinite;
    `;

    layer.appendChild(plane);
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
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (navbar) {
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  };

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

if (hamburger && navMenu) {
  const openMenu = () => {
    navMenu.classList.add('open');
    hamburger.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    navMenu.classList.remove('open');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  const isOpen = () => navMenu.classList.contains('open');

  hamburger.addEventListener('click', event => {
    event.stopPropagation();
    isOpen() ? closeMenu() : openMenu();
  });

  navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('click', event => {
    if (isOpen() && navbar && !navbar.contains(event.target)) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && isOpen()) {
      closeMenu();
    }
  });

  navMenu.addEventListener(
    'touchmove',
    event => {
      if (isOpen()) event.stopPropagation();
    },
    { passive: true }
  );
}

/* ══════════════════════════════════════
   ACTIVE NAV LINK
══════════════════════════════════════ */
(function setActiveNav() {
  const page = window.location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');

    if (href === page || (page === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();

/* ══════════════════════════════════════
   SCROLL REVEAL
══════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

  if (!revealEls.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          entry.target.classList.add('active-reveal');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.07,
      rootMargin: '0px 0px -35px 0px'
    }
  );

  revealEls.forEach(el => observer.observe(el));
});

/* ══════════════════════════════════════
   COUNTER ANIMATION
══════════════════════════════════════ */
function animateCount(el) {
  const target = parseFloat(el.dataset.count) || 0;
  const suffix = el.dataset.suffix || '';
  const prefix = el.dataset.prefix || '';
  const duration = 1800;
  const fps = 60;
  const steps = Math.round(duration / (1000 / fps));

  let frame = 0;

  const easeOut = t => 1 - Math.pow(1 - t, 3);

  const tick = () => {
    frame++;

    const progress = Math.min(frame / steps, 1);
    const current = target * easeOut(progress);
    const display = target >= 100 ? Math.floor(current).toLocaleString() : Math.floor(current);

    el.textContent = prefix + display + suffix;

    if (progress < 1) {
      requestAnimationFrame(tick);
    }
  };

  requestAnimationFrame(tick);
}

document.addEventListener('DOMContentLoaded', () => {
  const counters = document.querySelectorAll('[data-count]');

  if (!counters.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );

  counters.forEach(counter => observer.observe(counter));
});

/* ══════════════════════════════════════
   HERO PARTICLE STARS
══════════════════════════════════════ */
(function initParticles() {
  const container = document.querySelector('.hero-particles');

  if (!container) return;
  if (window.innerWidth < 600) return;

  for (let i = 0; i < 28; i++) {
    const star = document.createElement('span');
    const size = Math.random() * 3 + 1;

    star.style.cssText = `
      width:${size}px;
      height:${size}px;
      left:${Math.random() * 100}%;
      top:${Math.random() * 100}%;
      animation-duration:${Math.random() * 3 + 2}s;
      animation-delay:${Math.random() * 4}s;
    `;

    container.appendChild(star);
  }
})();

/* ══════════════════════════════════════
   SMOOTH ANCHOR SCROLL
══════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', event => {
    const href = anchor.getAttribute('href');

    if (!href || href === '#') return;

    const target = document.querySelector(href);

    if (!target) return;

    event.preventDefault();

    const navHeight = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--nav-h') || '70',
      10
    );

    const top = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

    window.scrollTo({
      top,
      behavior: 'smooth'
    });
  });
});