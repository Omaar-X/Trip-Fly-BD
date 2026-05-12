/* ============================================================
   TRIP FLY BD — MANAGEMENT.JS  (Premium Edition)
   Profile Modal | 3D Tilt | Counters | Scroll Reveal
============================================================ */
'use strict';

/* ══════════════════════════════════════════════
   TEAM MEMBER DATA
   ⚠️  EDIT EACH MEMBER'S PHONE, WHATSAPP, FACEBOOK, LINKEDIN HERE
══════════════════════════════════════════════ */
const TEAM = [
  {
    id:        'tahmina',
    name:      'Tahmina Bashar Nishat',
    role:      'Proprietor — Trip Fly BD',
    badge:     'Proprietor',
    img:       'images/Propiter.png',
    fallback:  'fas fa-crown',
    bio:       'Founder and Proprietor of Trip Fly BD. Tahmina Bashar Nishat leads the agency with a clear vision of making quality travel services accessible to every Bangladeshi. Her dedication to client trust, transparent pricing and service excellence has driven the agency\'s growth since February 2023.',
    // ── EDIT CONTACT DETAILS BELOW ──
    phone:    '+880 1XXXXXXXXX',          // Replace with actual phone
    whatsapp: 'https://wa.me/8801XXXXXXXXX', // Replace with actual WA link
    facebook: '#',                           // Replace with actual FB URL
    linkedin: '#',                           // Replace with actual LI URL
  },
  {
    id:        'samsuddin',
    name:      'Samsuddin Razib',
    role:      'Head of Department — Operations',
    badge:     'HOD Operations',
    img:       'images/Dept.png',
    fallback:  'fas fa-user-tie',
    bio:       'Samsuddin Razib oversees all operational activities at Trip Fly BD — from visa applications and air ticketing to client coordination and team management. His deep industry expertise ensures every service is delivered with speed, precision and professionalism.',
    phone:    '+880 1XXXXXXXXX',
    whatsapp: 'https://wa.me/8801XXXXXXXXX',
    facebook: '#',
    linkedin: '#',
  },
  {
    id:        'nijhu',
    name:      'Nijhu Dey',
    role:      'Accountant & Manager',
    badge:     'Accounts',
    img:       'images/Act.png',
    fallback:  'fas fa-calculator',
    bio:       'Nijhu Dey manages all financial operations, billing records, payment tracking and accounting for Trip Fly BD. Her meticulous approach ensures complete transparency and accuracy in every financial transaction.',
    phone:    '+880 1XXXXXXXXX',
    whatsapp: 'https://wa.me/8801XXXXXXXXX',
    facebook: '#',
    linkedin: '#',
  },
  {
    id:        'nazmul',
    name:      'Nazmul Hasan',
    role:      'Marketing Coordinator',
    badge:     'Marketing',
    img:       'images/Mkt.png',
    fallback:  'fas fa-bullhorn',
    bio:       'Nazmul Hasan drives marketing campaigns, customer outreach and travel package promotions for Trip Fly BD. He connects clients with the right services through strategic digital and offline marketing communication.',
    phone:    '+880 1XXXXXXXXX',
    whatsapp: 'https://wa.me/8801XXXXXXXXX',
    facebook: '#',
    linkedin: '#',
  },
  {
    id:        'omar',
    name:      'Omar Farque',
    role:      'Web Developer & Digital Marketer',
    badge:     'Digital',
    img:       'images/web.png',
    fallback:  'fas fa-laptop-code',
    bio:       'Omar Farque manages Trip Fly BD\'s complete digital presence — website development, search engine marketing, social media branding and online advertising strategy. He is the technology and digital growth engine behind the brand.',
    phone:    '+880 1XXXXXXXXX',
    whatsapp: 'https://wa.me/8801XXXXXXXXX',
    facebook: '#',
    linkedin: '#',
  },
  {
    id:        'shifat',
    name:      'Shahriar Mahmud Shifat',
    role:      'Digital Marketer',
    badge:     'Digital Mkt',
    img:       'images/DM.png',
    fallback:  'fas fa-chart-line',
    bio:       'Shahriar Mahmud Shifat manages digital marketing campaigns across social media platforms and performance advertising channels, growing Trip Fly BD\'s online reach and generating quality travel inquiries.',
    phone:    '+880 1XXXXXXXXX',
    whatsapp: 'https://wa.me/8801XXXXXXXXX',
    facebook: '#',
    linkedin: '#',
  },
  {
    id:        'burhan',
    name:      'Md Burhan Uddin',
    role:      'Consultant',
    badge:     'Consultant',
    img:       'images/con.png',
    fallback:  'fas fa-passport',
    bio:       'Md Burhan Uddin provides expert visa and travel consultation to Trip Fly BD clients. He guides travelers through document requirements, embassy procedures and destination planning with professional precision.',
    phone:    '+880 1XXXXXXXXX',
    whatsapp: 'https://wa.me/8801XXXXXXXXX',
    facebook: '#',
    linkedin: '#',
  },
];

/* ══════════════════════════════════════
   IMAGE FALLBACK
   Shows icon if image fails to load
══════════════════════════════════════ */
function applyImgFallback(imgEl, iconClass, fallbackEl) {
  imgEl.addEventListener('error', () => {
    imgEl.style.display = 'none';
    if (fallbackEl) fallbackEl.style.display = 'flex';
  });
  // If already broken (cached error)
  if (imgEl.complete && imgEl.naturalHeight === 0) {
    imgEl.style.display = 'none';
    if (fallbackEl) fallbackEl.style.display = 'flex';
  }
}

// Apply fallbacks to all member images on page load
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-member-id]').forEach(card => {
    const id  = card.dataset.memberId;
    const mem = TEAM.find(m => m.id === id);
    if (!mem) return;
    const img = card.querySelector('[data-member-img]');
    const fb  = card.querySelector('[data-member-fallback]');
    if (img && fb) applyImgFallback(img, mem.fallback, fb);
  });
});

/* ══════════════════════════════════════
   3D CARD TILT (desktop hover only)
══════════════════════════════════════ */
(function initTilt() {
  if (window.matchMedia('(hover: none)').matches) return;
  const CARDS = '.leader-card, .team-card';
  const MAX = 10;

  document.querySelectorAll(CARDS).forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - .5;
      const y = (e.clientY - rect.top)  / rect.height - .5;
      card.style.transform = `translateY(-10px) rotateX(${-y * MAX}deg) rotateY(${x * MAX}deg) scale(1.01)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();

/* ══════════════════════════════════════
   PROFILE MODAL
══════════════════════════════════════ */
(function initModal() {
  const overlay = document.getElementById('profileModalOverlay');
  const modal   = document.getElementById('profileModal');
  if (!overlay || !modal) return;

  // Elements inside modal
  const els = {
    photo:    modal.querySelector('#pmPhoto'),
    fallback: modal.querySelector('#pmFallback'),
    fallIcon: modal.querySelector('#pmFallbackIcon'),
    badge:    modal.querySelector('#pmBadge'),
    name:     modal.querySelector('#pmName'),
    role:     modal.querySelector('#pmRole'),
    bio:      modal.querySelector('#pmBio'),
    call:     modal.querySelector('#pmCall'),
    wa:       modal.querySelector('#pmWA'),
    fb:       modal.querySelector('#pmFB'),
    li:       modal.querySelector('#pmLI'),
  };

  function openModal(memberId) {
    const m = TEAM.find(t => t.id === memberId);
    if (!m) return;

    // Photo
    if (els.photo) {
      els.photo.src = m.img;
      els.photo.alt = m.name;
      els.photo.style.display = 'block';
      if (els.fallback) els.fallback.style.display = 'none';
      if (els.fallIcon) els.fallIcon.className = m.fallback;
      // Fallback on error
      els.photo.onerror = () => {
        els.photo.style.display = 'none';
        if (els.fallback) els.fallback.style.display = 'flex';
      };
    }
    if (els.badge)    els.badge.textContent    = m.badge;
    if (els.name)     els.name.textContent     = m.name;
    if (els.role)     els.role.textContent     = m.role;
    if (els.bio)      els.bio.textContent      = m.bio;

    // Contact links
    if (els.call) { els.call.href = 'tel:' + m.phone.replace(/\s+/g,''); els.call.querySelector('span').textContent = m.phone; }
    if (els.wa)   els.wa.href   = m.whatsapp;
    if (els.fb)   els.fb.href   = m.facebook;
    if (els.li)   els.li.href   = m.linkedin;

    // Show
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    modal.scrollTop = 0;
  }

  function closeModal() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Open on card click
  document.querySelectorAll('[data-member-id]').forEach(card => {
    card.addEventListener('click', e => {
      // Don't open if clicking a social button/link
      if (e.target.closest('.soc-btn') || e.target.closest('a')) return;
      openModal(card.dataset.memberId);
    });
  });
  // Open on View Profile button
  document.querySelectorAll('[data-view-profile]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      openModal(btn.dataset.viewProfile);
    });
  });

  // Close
  document.getElementById('pmCloseBtn')?.addEventListener('click', closeModal);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
  modal.addEventListener('touchmove', e => e.stopPropagation(), { passive: true });
})();

/* ══════════════════════════════════════
   ANIMATED STAT COUNTERS
══════════════════════════════════════ */
(function initCounters() {
  const counters = document.querySelectorAll('[data-stat]');
  if (!counters.length) return;

  const easeOut = t => 1 - Math.pow(1 - t, 3);

  function animateCounter(el) {
    const target   = parseFloat(el.dataset.stat) || 0;
    const suffix   = el.dataset.suffix || '';
    const prefix   = el.dataset.prefix || '';
    const duration = 1800;
    const fps      = 60;
    const steps    = Math.round(duration / (1000 / fps));
    let frame = 0;

    const tick = () => {
      frame++;
      const progress = Math.min(frame / steps, 1);
      const value    = Math.floor(target * easeOut(progress));
      el.textContent = prefix + (value >= 1000 ? value.toLocaleString() : value) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => obs.observe(el));
})();

/* ══════════════════════════════════════
   SCROLL REVEAL (supplement common.js)
══════════════════════════════════════ */
(function supplementReveal() {
  // common.js handles .reveal-up etc.
  // This ensures newly-added elements also animate
  const additional = document.querySelectorAll('.leader-card:not(.reveal-up), .team-card:not(.reveal-up), .stat-card:not(.reveal-up), .process-card:not(.reveal-up)');
  additional.forEach((el, i) => {
    el.classList.add('reveal-up');
    el.style.transitionDelay = (i % 4 * 0.1) + 's';
  });
})();