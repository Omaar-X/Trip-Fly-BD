/* ============================================================
   TRIP FLY BD — SERVICES.JS
   Tab scroll spy | Card glow | Route stagger animation
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
      const top = section.getBoundingClientRect().top + window.pageYOffset - navH - 50 - 12;
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
      if (sec.getBoundingClientRect().top <= navH + 140) current = sec.id;
    });
    tabs.forEach(tab => {
      const id = tab.getAttribute('data-target') || (tab.getAttribute('href') || '').replace('#','');
      tab.classList.toggle('active', id === current);
    });
    const navEl = document.querySelector('.services-nav');
    const activeTab = document.querySelector('.svc-tab.active');
    if (activeTab && navEl) {
      navEl.scrollTo({ left: activeTab.offsetLeft - (navEl.offsetWidth / 2) + (activeTab.offsetWidth / 2), behavior: 'smooth' });
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* CARD GLOW CURSOR */
(function initCardGlow() {
  if (window.matchMedia('(hover: none)').matches) return;
  document.querySelectorAll('.svc-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.background = 'radial-gradient(circle at ' + x + '% ' + y + '%, rgba(212,175,55,.09) 0%, rgba(17,24,32,.98) 65%)';
    });
    card.addEventListener('mouseleave', () => { card.style.background = ''; });
  });
})();

/* DOMESTIC ROUTES STAGGER */
(function initRouteAnimation() {
  const routes = document.querySelectorAll('.domestic-route');
  if (!routes.length) return;
  routes.forEach(r => { r.style.opacity = '0'; r.style.transform = 'translateY(10px)'; r.style.transition = 'opacity .4s ease, transform .4s ease'; });
  const container = document.querySelector('.domestic-routes');
  if (!container) return;
  const obs = new IntersectionObserver(entries => {
    if (!entries[0].isIntersecting) return;
    routes.forEach((r, i) => { setTimeout(() => { r.style.opacity = '1'; r.style.transform = 'translateY(0)'; }, i * 60); });
    obs.disconnect();
  }, { threshold: 0.2 });
  obs.observe(container);
})();