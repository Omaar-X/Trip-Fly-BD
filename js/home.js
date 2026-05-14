/* ============================================================
   TRIP FLY BD — HOME.JS  (Premium v3)
   Typing | Counters | Slider | Parallax | Tilt | Marquee
============================================================ */
'use strict';

/* ══════════════════════════════════════
   TYPING EFFECT
══════════════════════════════════════ */
(function initTyping() {
  const el = document.getElementById('typingText');
  if (!el) return;
  const words = ['With Us','To Thailand','To Dubai','To Maldives','To Malaysia',
                 'To Singapore','To Sri Lanka','To Indonesia','To Nepal','To China','To Japan','To Turkey'];
  let wi=0, ci=0, del=false, pausing=false;
  const TSPD=95, DSPD=55, PEND=2000, PSTART=350;
  function type() {
    if (pausing) return;
    const w = words[wi];
    if (!del) {
      el.textContent = w.slice(0,++ci);
      if (ci === w.length) { pausing=true; setTimeout(()=>{pausing=false;del=true;type();},PEND); return; }
    } else {
      el.textContent = w.slice(0,--ci);
      if (ci === 0) { del=false; wi=(wi+1)%words.length; pausing=true; setTimeout(()=>{pausing=false;type();},PSTART); return; }
    }
    setTimeout(type, del?DSPD:TSPD);
  }
  setTimeout(type, 1400);
})();

/* ══════════════════════════════════════
   HERO STATS COUNTERS
══════════════════════════════════════ */
(function initHeroCounters() {
  const stats = document.querySelector('.hero-stats');
  if (!stats) return;
  const cfgs = [
    {id:'s1', target:5000, suffix:'+'},
    {id:'s2', target:50,   suffix:'+'},
    {id:'s3', target:99,   suffix:'%'},
    {id:'s4', target:10,   suffix:'+'},
  ];
  let done = false;
  const easeOut = t => 1 - Math.pow(1-t, 3);
  const obs = new IntersectionObserver(entries => {
    if (!entries[0].isIntersecting || done) return;
    done = true;
    cfgs.forEach(c => {
      const el = document.getElementById(c.id);
      if (!el) return;
      let frame=0; const steps=80;
      const tick = () => {
        frame++;
        const p = Math.min(frame/steps,1);
        el.textContent = Math.floor(c.target*easeOut(p)).toLocaleString() + c.suffix;
        if (p<1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    obs.disconnect();
  },{threshold:.3});
  obs.observe(stats);
})();

/* ══════════════════════════════════════
   TESTIMONIAL SLIDER
══════════════════════════════════════ */
(function initSlider() {
  const track    = document.querySelector('.test-track');
  const prevBtn  = document.getElementById('testPrev');
  const nextBtn  = document.getElementById('testNext');
  const dotsWrap = document.querySelector('.test-dots');
  if (!track) return;

  const cards = Array.from(track.querySelectorAll('.test-card'));
  if (cards.length < 2) return;

  let cur = 0;
  let autoTimer;

  function getVisible() {
    const w = track.parentElement?.offsetWidth || window.innerWidth;
    if (w < 600) return 1;
    if (w < 960) return 2;
    return 3;
  }

  function getOffset(idx) {
    const cardW = cards[0].offsetWidth;
    const gap   = parseFloat(getComputedStyle(track).gap) || 20;
    return idx * (cardW + gap);
  }

  function goTo(idx) {
    const vis   = getVisible();
    const max   = Math.max(0, cards.length - vis);
    cur = Math.max(0, Math.min(idx, max));
    track.style.transform = `translateX(-${getOffset(cur)}px)`;
    dotsWrap?.querySelectorAll('.test-dot').forEach((d,i) => d.classList.toggle('active', i===cur));
  }

  function buildDots() {
    if (!dotsWrap) return;
    dotsWrap.innerHTML = '';
    const vis = getVisible();
    const count = Math.max(1, cards.length - vis + 1);
    for (let i=0; i<count; i++) {
      const d = document.createElement('button');
      d.className = 'test-dot' + (i===0?' active':'');
      d.setAttribute('aria-label',`Go to slide ${i+1}`);
      d.addEventListener('click', () => { goTo(i); resetAuto(); });
      dotsWrap.appendChild(d);
    }
  }

  function startAuto() {
    autoTimer = setInterval(() => {
      const vis = getVisible();
      const max = Math.max(0, cards.length - vis);
      goTo(cur < max ? cur+1 : 0);
    }, 4500);
  }
  function resetAuto() { clearInterval(autoTimer); startAuto(); }

  prevBtn?.addEventListener('click', () => { goTo(cur-1); resetAuto(); });
  nextBtn?.addEventListener('click', () => { goTo(cur+1); resetAuto(); });

  // Touch/swipe
  let tx=0;
  track.addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, {passive:true});
  track.addEventListener('touchend',   e => {
    const dx = e.changedTouches[0].clientX - tx;
    if (Math.abs(dx)>50) { dx<0?goTo(cur+1):goTo(cur-1); resetAuto(); }
  });

  window.addEventListener('resize', () => { buildDots(); goTo(0); });

  buildDots();
  startAuto();
})();

/* ══════════════════════════════════════
   HERO PARALLAX SCROLL
══════════════════════════════════════ */
(function initHeroParallax() {
  const img = document.querySelector('.hero-bg-img img');
  if (!img || window.matchMedia('(max-width:768px)').matches) return;
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      img.style.transform = `scale(1.08) translateY(${y*.18}px)`;
      ticking = false;
    });
    ticking = true;
  },{passive:true});
})();

/* ══════════════════════════════════════
   PACKAGE CARD 3D TILT
══════════════════════════════════════ */
(function initCardTilt() {
  if (window.matchMedia('(hover:none)').matches) return;
  const MAX = 7;
  document.querySelectorAll('.pkg-card,.why-card,.svc-mini,.trust-item').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX-r.left)/r.width  - .5;
      const y = (e.clientY-r.top) /r.height - .5;
      card.style.transform = `translateY(-8px) rotateY(${x*MAX}deg) rotateX(${-y*MAX}deg)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform=''; });
  });
})();

/* ══════════════════════════════════════
   FEATURED PACKAGE PARALLAX
══════════════════════════════════════ */
(function initFeaturedParallax() {
  const img = document.querySelector('.fp-img img');
  if (!img || window.matchMedia('(max-width:768px)').matches) return;
  const section = img.closest('.packages-section');
  if (!section) return;
  let ticking=false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    requestAnimationFrame(() => {
      const r = section.getBoundingClientRect();
      const progress = (window.innerHeight - r.top)/(window.innerHeight + r.height);
      if (progress>0 && progress<1)
        img.style.transform = `scale(1.08) translateY(${(progress-.5)*40}px)`;
      ticking=false;
    });
    ticking=true;
  },{passive:true});
})();

/* ══════════════════════════════════════
   GALLERY LIGHTBOX
══════════════════════════════════════ */
(function initGalleryLightbox() {
  const thumbs = document.querySelectorAll('.gallery-thumb');
  if (!thumbs.length) return;
  const ov  = document.createElement('div');
  const img = document.createElement('img');
  ov.style.cssText = 'position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,.95);display:none;align-items:center;justify-content:center;padding:1rem;cursor:zoom-out;';
  img.style.cssText = 'max-width:90vw;max-height:90vh;border-radius:12px;object-fit:contain;box-shadow:0 0 60px rgba(212,175,55,.25);';
  const cb = document.createElement('button');
  cb.innerHTML='<i class="fas fa-times"></i>';
  cb.style.cssText='position:absolute;top:1.2rem;right:1.5rem;background:transparent;border:none;color:#fff;font-size:1.6rem;cursor:pointer;opacity:.7;';
  cb.onmouseenter=()=>{cb.style.opacity='1';};
  cb.onmouseleave=()=>{cb.style.opacity='.7';};
  ov.appendChild(img); ov.appendChild(cb); document.body.appendChild(ov);
  const open  = src => { img.src=src; ov.style.display='flex'; document.body.style.overflow='hidden'; };
  const close = ()  => { ov.style.display='none'; img.src=''; document.body.style.overflow=''; };
  thumbs.forEach(t => t.addEventListener('click', () => { open(t.querySelector('img')?.src||''); }));
  ov.addEventListener('click', e => { if(e.target!==img) close(); });
  cb.addEventListener('click', close);
  document.addEventListener('keydown', e => { if(e.key==='Escape') close(); });
})();

/* ══════════════════════════════════════
   MARQUEE PAUSE ON HOVER
══════════════════════════════════════ */
(function initMarquee() {
  const t = document.querySelector('.marquee-track');
  if (!t) return;
  t.addEventListener('mouseenter', ()=>{ t.style.animationPlayState='paused'; });
  t.addEventListener('mouseleave', ()=>{ t.style.animationPlayState='running'; });
})();

/* ══════════════════════════════════════
   PARTICLES INIT (hero)
══════════════════════════════════════ */
(function initParticles() {
  const c = document.querySelector('.hero-particles');
  if (!c || window.innerWidth<600) return;
  for (let i=0;i<24;i++) {
    const s=document.createElement('span');
    const size=Math.random()*3+1;
    s.style.cssText=`width:${size}px;height:${size}px;left:${Math.random()*100}%;top:${Math.random()*100}%;animation-duration:${Math.random()*3+2}s;animation-delay:${Math.random()*4}s;`;
    c.appendChild(s);
  }
})();