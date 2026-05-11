/* ============================================================
   TRIP FLY BD — SERVICES.JS
   Tab navigation | Scroll spy | Card glow | Route animation
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
      const top = section.getBoundingClientRect().top + window.pageYOffset - navH - 53 - 16;
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
      if (sec.getBoundingClientRect().top <= navH + 130) current = sec.id;
    });
    tabs.forEach(tab => {
      const id = tab.getAttribute('data-target') || (tab.getAttribute('href') || '').replace('#','');
      tab.classList.toggle('active', id === current);
    });

    // auto-scroll active tab into view
    const navEl = document.querySelector('.services-nav');
    const activeTab = document.querySelector('.svc-tab.active');
    if (activeTab && navEl) {
      const tabLeft  = activeTab.offsetLeft;
      const tabWidth = activeTab.offsetWidth;
      const navWidth = navEl.offsetWidth;
      navEl.scrollTo({ left: tabLeft - (navWidth / 2) + (tabWidth / 2), behavior: 'smooth' });
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* SERVICE CARD GLOW ON HOVER */
(function initCardGlow() {
  if (window.matchMedia('(hover: none)').matches) return;
  document.querySelectorAll('.svc-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width)  * 100;
      const y = ((e.clientY - rect.top)  / rect.height) * 100;
      card.style.background = 'radial-gradient(circle at ' + x + '% ' + y + '%, rgba(212,175,55,.08) 0%, var(--bg-card) 60%)';
    });
    card.addEventListener('mouseleave', () => { card.style.background = ''; });
  });
})();

/* DOMESTIC ROUTES — ANIMATE IN */
(function initRouteAnimation() {
  const routes = document.querySelectorAll('.domestic-route');
  if (!routes.length) return;
  routes.forEach(r => { r.style.opacity = '0'; r.style.transform = 'translateY(12px)'; r.style.transition = 'opacity .4s ease, transform .4s ease'; });
  const container = document.querySelector('.domestic-routes');
  if (!container) return;
  const obs = new IntersectionObserver(entries => {
    if (!entries[0].isIntersecting) return;
    routes.forEach((route, i) => {
      setTimeout(() => { route.style.opacity = '1'; route.style.transform = 'translateY(0)'; }, i * 65);
    });
    obs.disconnect();
  }, { threshold: 0.2 });
  obs.observe(container);
})();