/* ============================================================
   TRIP FLY BD — MANAGEMENT.JS  (Ultra Premium v2)
   Floating Particles | 3D Tilt | Modal | Counters | Cursor Glow
============================================================ */
'use strict';

/* ══════════════════════════════════════════════
   TEAM DATA  ← Edit contacts here
══════════════════════════════════════════════ */
const TEAM = [
  {
    id:       'tahmina',
    name:     'Tahmina Bashar Nishat',
    role:     'Proprietor — Trip Fly BD',
    badge:    'Proprietor',
    img:      'images/Propiter.png',
    icon:     'fas fa-crown',
    bio:      'Founder and Proprietor of Trip Fly BD. Tahmina Bashar Nishat leads the agency with unwavering vision since February 2023. Her dedication to client trust, transparent pricing and service excellence has made Trip Fly BD one of Bangladesh\'s most reliable travel partners.',
    phone:    '+880 1630-840405',
    wa:       'https://wa.me/8801630840405',
    facebook: 'https://www.facebook.com/tahmina.bashar.nishat',
    linkedin: '#',
  },
  {
    id:       'samsuddin',
    name:     'Samsuddin Razib',
    role:     'Head of Operation',
    badge:    'Head of Operation',
    img:      'images/Dept.png',
    icon:     'fas fa-user-tie',
    bio:      'Samsuddin Razib oversees all operational activities at Trip Fly BD — visa applications, air ticketing, client coordination and team management. His deep industry expertise ensures every service is delivered with speed, precision and genuine professionalism.',
    phone:    '+880 1672-710556',
    wa:       'https://wa.me/8801672710556',
    facebook: 'https://www.facebook.com/sam.razib.5',
    linkedin: '#',
  },
  {
    id:       'nijhu',
    name:     'Nijhu Dey',
    role:     'Coordinator',
    badge:    'Coordinator',
    img:      'images/Act.png',
    icon:     'fas fa-tasks',
    bio:      'Nijhu Dey coordinates operational activities, client follow-ups and team communication at Trip Fly BD. Her organised approach ensures smooth service delivery and exceptional client satisfaction at every stage.',
    phone:    '+880 1898-801949',
    wa:       'https://wa.me/8801898801949',
    facebook: 'https://www.facebook.com/abhijit.nijhu',
    linkedin: '#',
  },
  {
    id:       'nazmul',
    name:     'Nazmul Hasan',
    role:     'Head of Reservation',
    badge:    'Head of Reservation',
    img:      'images/Mkt.png',
    icon:     'fas fa-calendar-check',
    bio:      'Nazmul Hasan leads the reservation division at Trip Fly BD — managing flight bookings, hotel reservations and travel package arrangements for all clients with efficiency and professional care.',
    phone:    '+880 1898-801943',
    wa:       'https://wa.me/8801898801943',
    facebook: 'https://www.facebook.com/nazmul.hasan.92560281',
    linkedin: '#',
  },
  {
    id:       'shifat',
    name:     'Shahriar Mahmud Shifat',
    role:     'Reservation Executive',
    badge:    'Reservation',
    img:      'images/DM.png',
    icon:     'fas fa-ticket-alt',
    bio:      'Shahriar Mahmud Shifat handles flight reservations, ticket issuance and client booking support under the Head of Reservation team — ensuring fast, accurate and stress-free travel bookings every time.',
    phone:    '+880 1886-734968',
    wa:       'https://wa.me/8801886734968',
    facebook: 'https://www.facebook.com/shifat.shahrir',
    linkedin: '#',
  },
  {
    id:       'omar',
    name:     'Omar Farque',
    role:     'Web Developer & Digital Marketer',
    badge:    'Digital',
    img:      'images/web.png',
    icon:     'fas fa-laptop-code',
    bio:      'Omar Farque manages Trip Fly BD\'s complete digital presence — website development, performance advertising, social media branding and digital marketing strategy for maximum online growth and lead generation.',
    phone:    '+880 1705-182933',
    wa:       'https://wa.me/8801705182933',
    facebook: 'https://www.facebook.com/tas.rif.3386',
    linkedin: '#',
  },
  {
    id:       'borhan',
    name:     'Md Borhan Uddin',
    role:     'Visa Consultant',
    badge:    'Visa Consultant',
    img:      'images/con.png',
    icon:     'fas fa-passport',
    bio:      'Md Borhan Uddin provides expert visa consultation to Trip Fly BD clients — guiding travelers through document requirements, embassy procedures and destination-specific application processes with accuracy and professionalism.',
    phone:    '+880 1613-156805',
    wa:       'https://wa.me/8801613156805',
    facebook: 'https://www.facebook.com/share/1FrwTGgXfA/',
    linkedin: '#',
  },
];

/* ══════════════════════════════════════
   FLOATING HERO PARTICLES
══════════════════════════════════════ */
(function initParticles() {
  const container = document.querySelector('.mgmt-hero-particles');
  if (!container) return;
  const count = window.innerWidth < 600 ? 12 : 22;
  for (let i = 0; i < count; i++) {
    const s = document.createElement('span');
    const size = Math.random() * 4 + 1.5;
    const dur  = Math.random() * 12 + 8;
    const del  = Math.random() * 10;
    s.style.cssText = [
      `width:${size}px`, `height:${size}px`,
      `left:${Math.random() * 100}%`,
      `bottom:${Math.random() * 30}%`,
      `animation-duration:${dur}s`,
      `animation-delay:${del}s`,
    ].join(';');
    container.appendChild(s);
  }
})();

/* ══════════════════════════════════════
   IMAGE FALLBACK
══════════════════════════════════════ */
function applyFallback(imgEl, fallbackEl) {
  if (!imgEl || !fallbackEl) return;
  const show = () => { imgEl.style.display = 'none'; fallbackEl.style.display = 'flex'; };
  imgEl.addEventListener('error', show);
  if (imgEl.complete && imgEl.naturalHeight === 0) show();
}
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-member-id]').forEach(card => {
    applyFallback(
      card.querySelector('[data-member-img]'),
      card.querySelector('[data-member-fallback]')
    );
  });
});

/* ══════════════════════════════════════
   3D CARD TILT  (desktop pointer only)
══════════════════════════════════════ */
(function initTilt() {
  if (window.matchMedia('(hover: none)').matches) return;
  const MAX = 9;
  document.querySelectorAll('.exec-card, .team-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - .5;
      const y = (e.clientY - r.top)  / r.height - .5;
      card.style.transform = `translateY(-10px) rotateX(${-y*MAX}deg) rotateY(${x*MAX}deg) scale(1.01)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
})();

/* ══════════════════════════════════════
   CURSOR GLOW EFFECT  (desktop only)
══════════════════════════════════════ */
(function initCursorGlow() {
  if (window.matchMedia('(hover: none)').matches) return;
  const glow = document.createElement('div');
  glow.style.cssText = [
    'position:fixed', 'pointer-events:none', 'z-index:9999',
    'width:300px', 'height:300px', 'border-radius:50%',
    'background:radial-gradient(circle,rgba(212,175,55,.07) 0%,transparent 70%)',
    'transform:translate(-50%,-50%)', 'transition:opacity .3s',
    'opacity:0',
  ].join(';');
  document.body.appendChild(glow);

  let raf;
  document.addEventListener('mousemove', e => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      glow.style.left = e.clientX + 'px';
      glow.style.top  = e.clientY + 'px';
      glow.style.opacity = '1';
    });
  });
  document.addEventListener('mouseleave', () => { glow.style.opacity = '0'; });
})();

/* ══════════════════════════════════════
   PROFILE MODAL
══════════════════════════════════════ */
(function initModal() {
  const overlay = document.getElementById('profileModalOverlay');
  const modal   = document.getElementById('profileModal');
  if (!overlay || !modal) return;

  const elImg  = document.getElementById('pmPhoto');
  const elFb   = document.getElementById('pmFallback');
  const elFbI  = document.getElementById('pmFallbackIcon');
  const elBdg  = document.getElementById('pmBadge');
  const elName = document.getElementById('pmName');
  const elRole = document.getElementById('pmRole');
  const elBio  = document.getElementById('pmBio');
  const elCall = document.getElementById('pmCall');
  const elWA   = document.getElementById('pmWA');
  const elFB   = document.getElementById('pmFB');
  const elLI   = document.getElementById('pmLI');

  function open(id) {
    const m = TEAM.find(t => t.id === id);
    if (!m) return;

    // Photo
    if (elImg) {
      elImg.src = m.img; elImg.alt = m.name; elImg.style.display = 'block';
      if (elFb)  elFb.style.display = 'none';
      if (elFbI) elFbI.className = m.icon;
      elImg.onerror = () => { elImg.style.display='none'; if(elFb) elFb.style.display='flex'; };
    }
    if (elBdg)  elBdg.textContent  = m.badge;
    if (elName) elName.textContent = m.name;
    if (elRole) elRole.textContent = m.role;
    if (elBio)  elBio.textContent  = m.bio;

    // Contacts
    if (elCall) {
      const clean = m.phone.replace(/[\s\-]/g, '');
      elCall.href = 'tel:' + clean;
      elCall.querySelector('span').textContent = m.phone;
    }
    if (elWA)   elWA.href   = m.wa;
    if (elFB) { elFB.href = m.facebook; elFB.style.opacity = m.facebook === '#' ? '.4' : '1'; }
    if (elLI) { elLI.href = m.linkedin; elLI.style.opacity = m.linkedin === '#' ? '.4' : '1'; }

    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    modal.scrollTop = 0;
  }

  function close() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Clicks on cards (not on social buttons)
  document.querySelectorAll('[data-member-id]').forEach(card => {
    card.addEventListener('click', e => {
      if (e.target.closest('.soc-btn,.tc-view-btn,.view-profile-btn,a')) return;
      open(card.dataset.memberId);
    });
    // Keyboard
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(card.dataset.memberId); }
    });
  });

  // View profile buttons
  document.querySelectorAll('[data-view-profile]').forEach(btn => {
    btn.addEventListener('click', e => { e.stopPropagation(); open(btn.dataset.viewProfile); });
  });

  document.getElementById('pmCloseBtn')?.addEventListener('click', close);
  overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  modal.addEventListener('touchmove', e => e.stopPropagation(), { passive: true });
})();

/* ══════════════════════════════════════
   STAT COUNTERS
══════════════════════════════════════ */
(function initCounters() {
  const els = document.querySelectorAll('[data-stat]');
  if (!els.length) return;
  const easeOut = t => 1 - Math.pow(1 - t, 3);

  function animate(el) {
    const target   = parseFloat(el.dataset.stat) || 0;
    const suffix   = el.dataset.suffix || '';
    const prefix   = el.dataset.prefix || '';
    const steps    = 90;
    let   frame    = 0;
    const tick = () => {
      frame++;
      const p = Math.min(frame / steps, 1);
      const v = Math.floor(target * easeOut(p));
      el.textContent = prefix + (v >= 1000 ? v.toLocaleString() : v) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { animate(e.target); obs.unobserve(e.target); }
    });
  }, { threshold: .55 });
  els.forEach(el => obs.observe(el));
})();

/* ══════════════════════════════════════
   SCROLL REVEAL (supplement common.js)
══════════════════════════════════════ */
(function initReveal() {
  const cards = document.querySelectorAll(
    '.exec-card:not(.reveal-up):not(.reveal-left):not(.reveal-right), .team-card:not(.reveal-up), .stat-card:not(.reveal-up), .process-card:not(.reveal-up)'
  );
  cards.forEach((c, i) => {
    c.classList.add('reveal-up');
    c.style.transitionDelay = (i % 4 * .1) + 's';
  });
})();