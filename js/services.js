/* ============================================================
   TRIP FLY BD — SERVICES.JS
<<<<<<< HEAD
   Tab scroll spy | Card glow | Route stagger animation
=======
   Tab navigation | Scroll spy | Card glow | Route animation
>>>>>>> ef590147a10e3748a2fc0bbd04a8c0ec28f26565
============================================================ */
'use strict';

/* SERVICES NAV TABS + SCROLL SPY */
(function initServicesTabs() {
  const tabs = document.querySelectorAll('.svc-tab');
  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', e => {
      e.preventDefault();
      const id = tab.getAttribute('data-target') || (tab.getAttribute('href') || '').replace('#','');
      if (!id) return;
      const section = document.getElementById(id);
      if (!section) return;
      const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h') || '70');
<<<<<<< HEAD
      const top = section.getBoundingClientRect().top + window.pageYOffset - navH - 50 - 12;
=======
      const top = section.getBoundingClientRect().top + window.pageYOffset - navH - 53 - 16;
>>>>>>> ef590147a10e3748a2fc0bbd04a8c0ec28f26565
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  const sections = Array.from(tabs).map(tab => {
    const id = tab.getAttribute('data-target') || (tab.getAttribute('href') || '').replace('#','');
    return id ? document.getElementById(id) : null;
  }).filter(Boolean);

  if (!sections.length) return;
  const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h') || '70');

  const onScroll = () => {
    let current = '';
    sections.forEach(sec => {
<<<<<<< HEAD
      if (sec.getBoundingClientRect().top <= navH + 140) current = sec.id;
=======
      if (sec.getBoundingClientRect().top <= navH + 130) current = sec.id;
>>>>>>> ef590147a10e3748a2fc0bbd04a8c0ec28f26565
    });
    tabs.forEach(tab => {
      const id = tab.getAttribute('data-target') || (tab.getAttribute('href') || '').replace('#','');
      tab.classList.toggle('active', id === current);
    });
<<<<<<< HEAD
    const navEl = document.querySelector('.services-nav');
    const activeTab = document.querySelector('.svc-tab.active');
    if (activeTab && navEl) {
      navEl.scrollTo({ left: activeTab.offsetLeft - (navEl.offsetWidth / 2) + (activeTab.offsetWidth / 2), behavior: 'smooth' });
=======

    // auto-scroll active tab into view
    const navEl = document.querySelector('.services-nav');
    const activeTab = document.querySelector('.svc-tab.active');
    if (activeTab && navEl) {
      const tabLeft  = activeTab.offsetLeft;
      const tabWidth = activeTab.offsetWidth;
      const navWidth = navEl.offsetWidth;
      navEl.scrollTo({ left: tabLeft - (navWidth / 2) + (tabWidth / 2), behavior: 'smooth' });
>>>>>>> ef590147a10e3748a2fc0bbd04a8c0ec28f26565
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

<<<<<<< HEAD
/* CARD GLOW CURSOR */
=======
/* SERVICE CARD GLOW ON HOVER */
>>>>>>> ef590147a10e3748a2fc0bbd04a8c0ec28f26565
(function initCardGlow() {
  if (window.matchMedia('(hover: none)').matches) return;
  document.querySelectorAll('.svc-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
<<<<<<< HEAD
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.background = 'radial-gradient(circle at ' + x + '% ' + y + '%, rgba(212,175,55,.09) 0%, rgba(17,24,32,.98) 65%)';
=======
      const x = ((e.clientX - rect.left) / rect.width)  * 100;
      const y = ((e.clientY - rect.top)  / rect.height) * 100;
      card.style.background = 'radial-gradient(circle at ' + x + '% ' + y + '%, rgba(212,175,55,.08) 0%, var(--bg-card) 60%)';
>>>>>>> ef590147a10e3748a2fc0bbd04a8c0ec28f26565
    });
    card.addEventListener('mouseleave', () => { card.style.background = ''; });
  });
})();

<<<<<<< HEAD
/* DOMESTIC ROUTES STAGGER */
(function initRouteAnimation() {
  const routes = document.querySelectorAll('.domestic-route');
  if (!routes.length) return;
  routes.forEach(r => { r.style.opacity = '0'; r.style.transform = 'translateY(10px)'; r.style.transition = 'opacity .4s ease, transform .4s ease'; });
=======
/* DOMESTIC ROUTES — ANIMATE IN */
(function initRouteAnimation() {
  const routes = document.querySelectorAll('.domestic-route');
  if (!routes.length) return;
  routes.forEach(r => { r.style.opacity = '0'; r.style.transform = 'translateY(12px)'; r.style.transition = 'opacity .4s ease, transform .4s ease'; });
>>>>>>> ef590147a10e3748a2fc0bbd04a8c0ec28f26565
  const container = document.querySelector('.domestic-routes');
  if (!container) return;
  const obs = new IntersectionObserver(entries => {
    if (!entries[0].isIntersecting) return;
<<<<<<< HEAD
    routes.forEach((r, i) => { setTimeout(() => { r.style.opacity = '1'; r.style.transform = 'translateY(0)'; }, i * 60); });
=======
    routes.forEach((route, i) => {
      setTimeout(() => { route.style.opacity = '1'; route.style.transform = 'translateY(0)'; }, i * 65);
    });
>>>>>>> ef590147a10e3748a2fc0bbd04a8c0ec28f26565
    obs.disconnect();
  }, { threshold: 0.2 });
  obs.observe(container);
})();