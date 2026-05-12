/* ============================================================
   TRIP FLY BD — HOME.JS
   Typing Effect | Hero Stats Counter | Interactions
============================================================ */

'use strict';

/* ══════════════════════════════════════
   TYPING EFFECT — HERO TITLE
══════════════════════════════════════ */
(function initTyping() {
  const el = document.getElementById('typingText');
  if (!el) return;

  const words = [
    'With Us',
    'To Thailand',
    'To Dubai',
    'To Maldives',
    'To Malaysia',
    'To Singapore',
    'To Sri Lanka',
    'To Indonesia',
    'To Nepal',
    'To India',
    'To China',
    'To Europe',
  ];

  let wordIndex  = 0;
  let charIndex  = 0;
  let isDeleting = false;
  let isPausing  = false;

  const TYPING_SPEED  = 95;   // ms per char
  const DELETING_SPEED = 55;  // ms per char
  const PAUSE_END     = 2000; // pause at end of word
  const PAUSE_START   = 350;  // pause before typing next

  function type() {
    if (isPausing) return;

    const word = words[wordIndex];

    if (!isDeleting) {
      charIndex++;
      el.textContent = word.slice(0, charIndex);

      if (charIndex === word.length) {
        // Finished typing — pause then delete
        isPausing = true;
        setTimeout(() => {
          isPausing  = false;
          isDeleting = true;
          setTimeout(type, DELETING_SPEED);
        }, PAUSE_END);
        return;
      }
    } else {
      charIndex--;
      el.textContent = word.slice(0, charIndex);

      if (charIndex === 0) {
        // Finished deleting — next word
        isDeleting  = false;
        wordIndex   = (wordIndex + 1) % words.length;
        isPausing   = true;
        setTimeout(() => {
          isPausing = false;
          setTimeout(type, TYPING_SPEED);
        }, PAUSE_START);
        return;
      }
    }

    setTimeout(type, isDeleting ? DELETING_SPEED : TYPING_SPEED);
  }

  // Start after initial page-load delay
  setTimeout(type, 1400);
})();

/* ══════════════════════════════════════
   HERO STATS ANIMATED COUNTERS
══════════════════════════════════════ */
(function initHeroCounters() {
  const stats = document.querySelector('.hero-stats');
  if (!stats) return;

  const counterConfigs = [
    { id: 's1', target: 5000, suffix: '+' },
    { id: 's2', target: 50,   suffix: '+' },
    { id: 's3', target: 99,   suffix: '%' },
    { id: 's4', target: 10,   suffix: '+' },
  ];

  let triggered = false;

  const obs = new IntersectionObserver(entries => {
    if (!entries[0].isIntersecting || triggered) return;
    triggered = true;

    counterConfigs.forEach(cfg => {
      const el = document.getElementById(cfg.id);
      if (!el) return;

      const duration = 1800;
      const fps      = 60;
      const steps    = Math.round(duration / (1000 / fps));
      let frame      = 0;

      const easeOut = t => 1 - Math.pow(1 - t, 3);

      const tick = () => {
        frame++;
        const progress = Math.min(frame / steps, 1);
        const value    = Math.floor(cfg.target * easeOut(progress));
        el.textContent = (value >= 1000 ? value.toLocaleString() : value) + cfg.suffix;
        if (progress < 1) requestAnimationFrame(tick);
      };

      requestAnimationFrame(tick);
    });

    obs.disconnect();
  }, { threshold: 0.3 });

  obs.observe(stats);
})();

/* ══════════════════════════════════════
   PACKAGE CARD HOVER — SUBTLE 3D TILT
══════════════════════════════════════ */
(function initCardTilt() {
  // Only on devices that likely have a pointer (non-touch)
  if (window.matchMedia('(hover: none)').matches) return;

  const cards = document.querySelectorAll('.pkg-card, .why-card, .svc-mini');
  const MAX   = 8; // max tilt degrees

  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x    = (e.clientX - rect.left) / rect.width  - 0.5;
      const y    = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform = `translateY(-8px) rotateY(${x * MAX}deg) rotateX(${-y * MAX}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();

/* ══════════════════════════════════════
   FEATURED PACKAGE — PARALLAX SCROLL
══════════════════════════════════════ */
(function initFeaturedParallax() {
  const img = document.querySelector('.fp-img img');
  if (!img || window.matchMedia('(max-width: 768px)').matches) return;

  const section = img.closest('.packages-section');
  if (!section) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (ticking) return;
    requestAnimationFrame(() => {
      const rect  = section.getBoundingClientRect();
      const winH  = window.innerHeight;
      const progress = (winH - rect.top) / (winH + rect.height);
      if (progress > 0 && progress < 1) {
        const shift = (progress - 0.5) * 40;
        img.style.transform = `scale(1.08) translateY(${shift}px)`;
      }
      ticking = false;
    });
    ticking = true;
  }, { passive: true });
})();

/* ══════════════════════════════════════
   GALLERY LIGHTBOX (home strip)
══════════════════════════════════════ */
(function initGalleryLightbox() {
  const thumbs = document.querySelectorAll('.gallery-thumb');
  if (!thumbs.length) return;

  // Build minimal lightbox
  const overlay = document.createElement('div');
  overlay.id = 'homeLightbox';
  overlay.style.cssText = [
    'position:fixed', 'inset:0', 'z-index:9999',
    'background:rgba(0,0,0,.95)', 'display:none',
    'align-items:center', 'justify-content:center',
    'padding:1rem', 'cursor:zoom-out',
  ].join(';');

  const imgEl = document.createElement('img');
  imgEl.style.cssText = 'max-width:90vw;max-height:90vh;border-radius:12px;object-fit:contain;box-shadow:0 0 60px rgba(212,175,55,.25);';

  const closeBtn = document.createElement('button');
  closeBtn.innerHTML = '<i class="fas fa-times"></i>';
  closeBtn.style.cssText = [
    'position:absolute', 'top:1.2rem', 'right:1.5rem',
    'background:transparent', 'border:none', 'color:#fff',
    'font-size:1.6rem', 'cursor:pointer', 'z-index:1',
    'opacity:.7', 'transition:opacity .3s',
  ].join(';');
  closeBtn.onmouseenter = () => { closeBtn.style.opacity = '1'; };
  closeBtn.onmouseleave = () => { closeBtn.style.opacity = '.7'; };

  overlay.appendChild(imgEl);
  overlay.appendChild(closeBtn);
  document.body.appendChild(overlay);

  const open  = src => { imgEl.src = src; overlay.style.display = 'flex'; document.body.style.overflow = 'hidden'; };
  const close = ()  => { overlay.style.display = 'none'; imgEl.src = ''; document.body.style.overflow = ''; };

  thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      const src = thumb.querySelector('img')?.src;
      if (src) open(src);
    });
  });

  overlay.addEventListener('click', e => { if (e.target !== imgEl) close(); });
  closeBtn.addEventListener('click', close);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
})();

/* ══════════════════════════════════════
   MARQUEE — PAUSE ON HOVER
══════════════════════════════════════ */
(function initMarqueePause() {
  const track = document.querySelector('.marquee-track');
  if (!track) return;
  track.addEventListener('mouseenter', () => { track.style.animationPlayState = 'paused'; });
  track.addEventListener('mouseleave', () => { track.style.animationPlayState = 'running'; });
})();