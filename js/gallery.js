<<<<<<< HEAD
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
=======
/* GALLERY JS */
const items    = document.querySelectorAll('.masonry-item');
const lightbox = document.getElementById('lightbox');
const lbImg    = document.getElementById('lbImg');
const lbCap    = document.getElementById('lbCaption');
const lbCnt    = document.getElementById('lbCounter');
const lbClose  = document.getElementById('lbClose');
const lbPrev   = document.getElementById('lbPrev');
const lbNext   = document.getElementById('lbNext');
const lbBack   = document.getElementById('lbBackdrop');

let cur=0;
const srcs=[], caps=[];
items.forEach((it,i)=>{ srcs.push(it.dataset.src); caps.push(it.dataset.caption||''); it.addEventListener('click',()=>open(i)); });

function open(i){ cur=i; lbImg.src=srcs[i]; lbCap.textContent=caps[i]; lbCnt.textContent=`${i+1} / ${srcs.length}`; lightbox.classList.add('open'); document.body.style.overflow='hidden'; }
function close(){ lightbox.classList.remove('open'); document.body.style.overflow=''; }
function prev(){ cur=(cur-1+srcs.length)%srcs.length; open(cur); }
function next(){ cur=(cur+1)%srcs.length; open(cur); }

lbClose.addEventListener('click',close);
lbBack.addEventListener('click',close);
lbPrev.addEventListener('click',prev);
lbNext.addEventListener('click',next);
document.addEventListener('keydown',e=>{ if(!lightbox.classList.contains('open'))return; if(e.key==='Escape')close(); if(e.key==='ArrowLeft')prev(); if(e.key==='ArrowRight')next(); });
>>>>>>> ef590147a10e3748a2fc0bbd04a8c0ec28f26565
