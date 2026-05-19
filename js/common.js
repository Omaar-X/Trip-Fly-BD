/* ============================================================
   TRIP FLY BD â€” COMMON.JS
   Navbar | Hamburger | Scroll Reveal | Counters | Airplane | WhatsApp Float
============================================================ */

'use strict';

/* ============================================================
   THEME TOGGLE - DARK DEFAULT + LIGHT MODE
============================================================ */
(function initThemeToggle() {
  const storageKey = 'tripFlyBdThemeV3';
  const legacyStorageKeys = ['tripFlyBdTheme', 'tripFlyBdThemeV2'];
  const allowedThemes = new Set(['dark', 'light']);

  try {
    legacyStorageKeys.forEach(key => localStorage.removeItem(key));
  } catch (error) {
    /* Ignore storage cleanup failures. */
  }

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
    document.documentElement.setAttribute('data-theme', nextTheme);
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

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   AIRPLANE ANIMATION â€” HOME PAGE ONLY
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
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

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   FLOATING MULTI-CONTACT MENU
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
(function initFloatingContactMenu() {
  if (document.querySelector('.floating-contact')) return;

  const contact = document.createElement('div');
  contact.className = 'floating-contact';
  contact.setAttribute('aria-label', 'Trip Fly BD contact options');

  contact.innerHTML = `
    <div class="floating-contact-actions" aria-hidden="true">
      <a href="tel:+8801898801939" class="fc-action fc-call" aria-label="Call Trip Fly BD">
        <i class="fas fa-phone-alt" aria-hidden="true"></i>
        <span class="fc-tooltip">Call</span>
      </a>
      <a href="https://m.me/tripflybdofficial" target="_blank" rel="noopener" class="fc-action fc-messenger" aria-label="Message Trip Fly BD on Messenger">
        <i class="fab fa-facebook-messenger" aria-hidden="true"></i>
        <span class="fc-tooltip">Messenger</span>
      </a>
      <a href="https://wa.me/8801898801939" target="_blank" rel="noopener" class="fc-action fc-whatsapp" aria-label="Chat with Trip Fly BD on WhatsApp">
        <i class="fab fa-whatsapp" aria-hidden="true"></i>
        <span class="fc-tooltip">WhatsApp</span>
      </a>
      <button type="button" class="fc-action fc-close" aria-label="Close contact menu">
        <i class="fas fa-times" aria-hidden="true"></i>
        <span class="fc-tooltip">Close</span>
      </button>
    </div>
    <button type="button" class="fc-main" aria-label="Open contact menu" aria-expanded="false">
      <i class="fas fa-headset" aria-hidden="true"></i>
      <span class="fc-main-dot" aria-hidden="true"></span>
    </button>
  `;

  document.body.appendChild(contact);

  const main = contact.querySelector('.fc-main');
  const closeButton = contact.querySelector('.fc-close');
  const actions = contact.querySelector('.floating-contact-actions');

  const setOpen = isOpen => {
    contact.classList.toggle('open', isOpen);
    main.setAttribute('aria-expanded', String(isOpen));
    main.setAttribute('aria-label', isOpen ? 'Close contact menu' : 'Open contact menu');
    if (actions) actions.setAttribute('aria-hidden', String(!isOpen));
  };

  main.addEventListener('click', event => {
    event.stopPropagation();
    setOpen(!contact.classList.contains('open'));
  });

  if (closeButton) {
    closeButton.addEventListener('click', event => {
      event.stopPropagation();
      setOpen(false);
      main.focus();
    });
  }

  document.addEventListener('click', event => {
    if (contact.classList.contains('open') && !contact.contains(event.target)) {
      setOpen(false);
    }
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && contact.classList.contains('open')) {
      setOpen(false);
      main.focus();
    }
  });
})();

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   NAVBAR â€” SCROLL + HAMBURGER
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
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

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   ACTIVE NAV LINK
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
(function setActiveNav() {
  const page = window.location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');

    if (href === page || (page === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   SCROLL REVEAL
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
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

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   COUNTER ANIMATION
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
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

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   HERO PARTICLE STARS
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
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

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   SMOOTH ANCHOR SCROLL
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
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
