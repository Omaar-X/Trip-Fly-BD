/* ============================================================
   TRIP FLY BD — GALLERY.JS
   Filter | Lightbox | Lazy loading
============================================================ */
'use strict';

/* FILTER */
(function initFilter() {
  const btns  = document.querySelectorAll('.gf-btn');
  const items = document.querySelectorAll('.gallery-item');
  const countEl = document.getElementById('galleryCount');
  if (!btns.length || !items.length) return;

  const updateCount = () => {
    if (countEl) countEl.textContent = document.querySelectorAll('.gallery-item:not(.hide)').length;
  };

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      items.forEach(item => {
        const match = f === 'all' || item.dataset.cat === f;
        item.classList.toggle('hide', !match);
      });
      updateCount();
    });
  });
  updateCount();
})();

/* LIGHTBOX */
(function initLightbox() {
  const items   = Array.from(document.querySelectorAll('.gallery-item'));
  const lb      = document.getElementById('lightbox');
  const lbImg   = document.getElementById('lbImg');
  const lbCap   = document.getElementById('lbCaption');
  const lbCnt   = document.getElementById('lbCounter');
  const bdrop   = document.getElementById('lbBackdrop');
  const btnClose= document.getElementById('lbClose');
  const btnPrev = document.getElementById('lbPrev');
  const btnNext = document.getElementById('lbNext');
  if (!lb || !lbImg) return;

  let cur = 0;
  const visibleItems = () => items.filter(i => !i.classList.contains('hide'));

  const open = idx => {
    const vis = visibleItems();
    if (!vis[idx]) return;
    cur = idx;
    lbImg.src = '';
    lbImg.src = vis[idx].dataset.src || vis[idx].querySelector('img')?.src || '';
    if (lbCap) lbCap.textContent = vis[idx].dataset.caption || '';
    if (lbCnt) lbCnt.textContent = `${idx + 1} / ${vis.length}`;
    lb.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const close = () => {
    lb.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => { lbImg.src = ''; }, 350);
  };

  const prev = () => { const v = visibleItems(); open((cur - 1 + v.length) % v.length); };
  const next = () => { const v = visibleItems(); open((cur + 1) % v.length); };

  items.forEach((item, i) => {
    item.addEventListener('click', () => {
      const vis = visibleItems();
      const visIdx = vis.indexOf(item);
      if (visIdx >= 0) open(visIdx);
    });
  });

  if (bdrop)    bdrop.addEventListener('click', close);
  if (btnClose) btnClose.addEventListener('click', close);
  if (btnPrev)  btnPrev.addEventListener('click', prev);
  if (btnNext)  btnNext.addEventListener('click', next);

  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('active')) return;
    if (e.key === 'Escape')      close();
    if (e.key === 'ArrowLeft')   prev();
    if (e.key === 'ArrowRight')  next();
  });

  // Touch swipe
  let tx = 0;
  lb.addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend',   e => {
    const dx = e.changedTouches[0].clientX - tx;
    if (Math.abs(dx) > 50) { dx < 0 ? next() : prev(); }
  });
})();