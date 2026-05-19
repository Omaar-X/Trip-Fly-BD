/* ============================================================
   TRIP FLY BD - HOME.JS
   Homepage effects | Expert consultation | Package inquiry modal
============================================================ */
'use strict';

(() => {
  const APPS_SCRIPT_URL =
    'https://script.google.com/macros/s/AKfycbxNNt8_3RtKAAHf2X4QjCrlfgSqPJCX1UmDNmT_u0ltneXI4sRhirNRzq9j2k4l4gwinQ/exec';
  const WHATSAPP_NUMBER = '8801898801939';

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  const onReady = callback => {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback, { once: true });
      return;
    }

    callback();
  };

  onReady(() => {
    initTypingEffect();
    initHeroCounters();
    initScrollReveal();
    initHeroParticles();
    initHeroParallax();
    initFeaturedPackageParallax();
    initCardTilt();
    initTestimonialSlider();
    initGalleryLightbox();
    initMarqueePause();
    initExpertConsultationForm();
    initPackageInquiryModal();
    initPackageDetailsModal();
  });

  function initTypingEffect() {
    const el = $('#typingText');
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
      'To China',
      'To Japan',
      'To Turkey'
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let paused = false;

    const typeSpeed = 95;
    const deleteSpeed = 55;
    const endPause = 2000;
    const startPause = 350;

    const type = () => {
      if (paused) return;

      const word = words[wordIndex];

      if (!deleting) {
        charIndex += 1;
        el.textContent = word.slice(0, charIndex);

        if (charIndex === word.length) {
          paused = true;
          window.setTimeout(() => {
            paused = false;
            deleting = true;
            type();
          }, endPause);
          return;
        }
      } else {
        charIndex -= 1;
        el.textContent = word.slice(0, charIndex);

        if (charIndex === 0) {
          deleting = false;
          wordIndex = (wordIndex + 1) % words.length;
          paused = true;
          window.setTimeout(() => {
            paused = false;
            type();
          }, startPause);
          return;
        }
      }

      window.setTimeout(type, deleting ? deleteSpeed : typeSpeed);
    };

    window.setTimeout(type, 1400);
  }

  function initHeroCounters() {
    const stats = $('.hero-stats');
    if (!stats) return;

    const counters = [
      { id: 's1', target: 5000, suffix: '+' },
      { id: 's2', target: 50, suffix: '+' },
      { id: 's3', target: 99, suffix: '%' },
      { id: 's4', target: 10, suffix: '+' }
    ];

    const runCounters = () => {
      counters.forEach(counter => {
        const el = document.getElementById(counter.id);
        if (!el || el.dataset.homeCounted === 'true') return;

        el.dataset.homeCounted = 'true';
        animateNumber(el, counter.target, counter.suffix);
      });
    };

    if (!('IntersectionObserver' in window)) {
      runCounters();
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        if (!entries.some(entry => entry.isIntersecting)) return;

        runCounters();
        observer.disconnect();
      },
      { threshold: 0.3 }
    );

    observer.observe(stats);
  }

  function animateNumber(el, target, suffix = '') {
    const frames = 80;
    const easeOut = progress => 1 - Math.pow(1 - progress, 3);
    let frame = 0;

    const tick = () => {
      frame += 1;
      const progress = Math.min(frame / frames, 1);
      const value = Math.floor(target * easeOut(progress)).toLocaleString();
      el.textContent = `${value}${suffix}`;

      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }

  function initScrollReveal() {
    const revealEls = $$('.reveal-up, .reveal-left, .reveal-right').filter(
      el => el.dataset.homeReveal !== 'true'
    );

    if (!revealEls.length) return;

    revealEls.forEach(el => {
      el.dataset.homeReveal = 'true';
    });

    if (!('IntersectionObserver' in window)) {
      revealEls.forEach(el => {
        el.classList.add('visible', 'active-reveal');
      });
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add('visible', 'active-reveal');
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.07,
        rootMargin: '0px 0px -35px 0px'
      }
    );

    revealEls.forEach(el => observer.observe(el));
  }

  function initHeroParticles() {
    const container = $('.hero-particles');
    if (!container || window.innerWidth < 600 || container.childElementCount) return;

    for (let i = 0; i < 28; i += 1) {
      const particle = document.createElement('span');
      const size = Math.random() * 3 + 1;

      particle.style.cssText = [
        `width:${size}px`,
        `height:${size}px`,
        `left:${Math.random() * 100}%`,
        `top:${Math.random() * 100}%`,
        `animation-duration:${Math.random() * 3 + 2}s`,
        `animation-delay:${Math.random() * 4}s`
      ].join(';');

      container.appendChild(particle);
    }
  }

  function initHeroParallax() {
    const img = $('.hero-bg-img img');
    if (!img || isReducedMotion() || window.matchMedia('(max-width: 768px)').matches) return;

    let ticking = false;

    window.addEventListener(
      'scroll',
      () => {
        if (ticking) return;

        ticking = true;
        requestAnimationFrame(() => {
          img.style.transform = `scale(1.08) translateY(${window.scrollY * 0.18}px)`;
          ticking = false;
        });
      },
      { passive: true }
    );
  }

  function initFeaturedPackageParallax() {
    const img = $('.fp-img img');
    if (!img || isReducedMotion() || window.matchMedia('(max-width: 768px)').matches) return;

    const section = img.closest('.packages-section');
    if (!section) return;

    let ticking = false;

    window.addEventListener(
      'scroll',
      () => {
        if (ticking) return;

        ticking = true;
        requestAnimationFrame(() => {
          const rect = section.getBoundingClientRect();
          const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);

          if (progress > 0 && progress < 1) {
            img.style.transform = `scale(1.08) translateY(${(progress - 0.5) * 40}px)`;
          }

          ticking = false;
        });
      },
      { passive: true }
    );
  }

  function initCardTilt() {
    if (isReducedMotion() || window.matchMedia('(hover: none)').matches) return;

    const cards = $$('.pkg-card, .why-card, .svc-mini, .trust-item');
    if (!cards.length) return;

    const maxTilt = 7;

    cards.forEach(card => {
      card.addEventListener('mousemove', event => {
        const rect = card.getBoundingClientRect();
        if (!rect.width || !rect.height) return;

        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;

        card.style.transform = `translateY(-8px) rotateY(${x * maxTilt}deg) rotateX(${-y * maxTilt}deg)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  function initTestimonialSlider() {
    const track = $('.test-track');
    if (!track) return;

    const cards = $$('.test-card', track);
    const prevBtn = $('#testPrev');
    const nextBtn = $('#testNext');
    const dotsWrap = $('.test-dots');

    if (cards.length < 2) return;

    let current = 0;
    let autoTimer = null;
    let touchStartX = 0;

    const getVisibleCount = () => {
      const width = track.parentElement?.offsetWidth || window.innerWidth;
      if (width < 600) return 1;
      if (width < 960) return 2;
      return 3;
    };

    const getMaxIndex = () => Math.max(0, cards.length - getVisibleCount());

    const getOffset = index => {
      const cardWidth = cards[0]?.offsetWidth || 0;
      const gap = parseFloat(getComputedStyle(track).gap) || 20;
      return index * (cardWidth + gap);
    };

    const updateDots = () => {
      if (!dotsWrap) return;

      $$('.test-dot', dotsWrap).forEach((dot, index) => {
        dot.classList.toggle('active', index === current);
        dot.setAttribute('aria-selected', index === current ? 'true' : 'false');
      });
    };

    const goTo = index => {
      current = Math.max(0, Math.min(index, getMaxIndex()));
      track.style.transform = `translateX(-${getOffset(current)}px)`;
      updateDots();
    };

    const buildDots = () => {
      if (!dotsWrap) return;

      dotsWrap.innerHTML = '';
      const count = getMaxIndex() + 1;

      for (let index = 0; index < count; index += 1) {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = `test-dot${index === current ? ' active' : ''}`;
        dot.setAttribute('aria-label', `Go to review ${index + 1}`);
        dot.setAttribute('aria-selected', index === current ? 'true' : 'false');

        dot.addEventListener('click', () => {
          goTo(index);
          resetAuto();
        });

        dotsWrap.appendChild(dot);
      }
    };

    const startAuto = () => {
      if (isReducedMotion()) return;

      window.clearInterval(autoTimer);
      autoTimer = window.setInterval(() => {
        goTo(current < getMaxIndex() ? current + 1 : 0);
      }, 4500);
    };

    const resetAuto = () => {
      startAuto();
    };

    prevBtn?.addEventListener('click', () => {
      goTo(current - 1);
      resetAuto();
    });

    nextBtn?.addEventListener('click', () => {
      goTo(current + 1);
      resetAuto();
    });

    track.addEventListener(
      'touchstart',
      event => {
        touchStartX = event.touches[0]?.clientX || 0;
      },
      { passive: true }
    );

    track.addEventListener(
      'touchend',
      event => {
        const touchEndX = event.changedTouches[0]?.clientX || touchStartX;
        const delta = touchEndX - touchStartX;

        if (Math.abs(delta) > 50) {
          goTo(delta < 0 ? current + 1 : current - 1);
          resetAuto();
        }
      },
      { passive: true }
    );

    window.addEventListener(
      'resize',
      debounce(() => {
        current = Math.min(current, getMaxIndex());
        buildDots();
        goTo(current);
      }, 120)
    );

    buildDots();
    goTo(0);
    startAuto();
  }

  function initGalleryLightbox() {
    const thumbs = $$('.gallery-thumb');
    if (!thumbs.length) return;

    let overlay = $('#homeGalleryLightbox');
    let img = overlay ? $('img', overlay) : null;
    let closeBtn = overlay ? $('button', overlay) : null;
    let previousOverflow = '';

    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'homeGalleryLightbox';
      overlay.setAttribute('role', 'dialog');
      overlay.setAttribute('aria-modal', 'true');
      overlay.setAttribute('aria-label', 'Photo lightbox');
      overlay.style.cssText =
        'position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,.95);display:none;align-items:center;justify-content:center;padding:1rem;cursor:zoom-out;';

      img = document.createElement('img');
      img.alt = 'Trip Fly BD gallery preview';
      img.style.cssText =
        'max-width:90vw;max-height:90vh;border-radius:12px;object-fit:contain;box-shadow:0 0 60px rgba(212,175,55,.25);';

      closeBtn = document.createElement('button');
      closeBtn.type = 'button';
      closeBtn.setAttribute('aria-label', 'Close gallery preview');
      closeBtn.innerHTML = '<i class="fas fa-times" aria-hidden="true"></i>';
      closeBtn.style.cssText =
        'position:absolute;top:1.2rem;right:1.5rem;background:transparent;border:none;color:#fff;font-size:1.6rem;cursor:pointer;opacity:.75;';

      closeBtn.addEventListener('mouseenter', () => {
        closeBtn.style.opacity = '1';
      });
      closeBtn.addEventListener('mouseleave', () => {
        closeBtn.style.opacity = '.75';
      });

      overlay.append(img, closeBtn);
      document.body.appendChild(overlay);
    }

    const open = src => {
      if (!src || !overlay || !img) return;

      previousOverflow = document.body.style.overflow;
      img.src = src;
      overlay.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    };

    const close = () => {
      if (!overlay || !img || overlay.style.display === 'none') return;

      overlay.style.display = 'none';
      img.removeAttribute('src');
      document.body.style.overflow = previousOverflow;
    };

    thumbs.forEach(thumb => {
      if (thumb.dataset.homeLightboxBound === 'true') return;

      thumb.dataset.homeLightboxBound = 'true';
      thumb.addEventListener('click', () => {
        const src = $('img', thumb)?.currentSrc || $('img', thumb)?.src || '';
        open(src);
      });
    });

    overlay?.addEventListener('click', event => {
      if (event.target === overlay || event.target === closeBtn) close();
    });

    closeBtn?.addEventListener('click', close);

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') close();
    });
  }

  function initMarqueePause() {
    const track = $('.marquee-track');
    if (!track) return;

    track.addEventListener('mouseenter', () => {
      track.style.animationPlayState = 'paused';
    });

    track.addEventListener('mouseleave', () => {
      track.style.animationPlayState = 'running';
    });
  }

  function initExpertConsultationForm() {
    const form = $('#expertForm');
    if (!form || form.dataset.homeFormBound === 'true') return;

    form.dataset.homeFormBound = 'true';

    const status = $('#exStatus');
    const submitBtn = $('#exSubmit');
    const followup = $('#exWAFollowup');

    form.addEventListener('submit', async event => {
      event.preventDefault();

      if (($('#exHoneypot')?.value || '').trim()) return;

      const payload = {
        source: 'Trip Fly BD Homepage Expert Consultation',
        form_type: 'Expert Consultation',
        package: 'Expert Consultation',
        destination: getValue('#exDest'),
        name: getValue('#exName'),
        whatsapp: getValue('#exPhone'),
        travel_date: getValue('#exMonth'),
        budget: getValue('#exBudget'),
        adults: '',
        message: getValue('#exMessage'),
        submitted_at: new Date().toISOString()
      };

      clearStatus(status);
      hideFollowup(followup);

      const validationError = validateLead(payload);
      if (validationError) {
        showStatus(status, 'error', validationError);
        return;
      }

      setLoading(submitBtn, true);
      const result = await submitToGoogleSheets(payload);
      setLoading(submitBtn, false);

      const whatsappUrl = buildWhatsAppUrl(payload);

      if (!result.ok) {
        showStatus(
          status,
          'error',
          result.message || 'Something went wrong. Please continue on WhatsApp.'
        );
        showFollowup(followup, whatsappUrl);
        return;
      }

      showStatus(
        status,
        'success',
        'Success! Your consultation request has been sent. Our travel expert will contact you shortly.'
      );
      showFollowup(followup, whatsappUrl);
      form.reset();
    });
  }

  function initPackageInquiryModal() {
    const overlay = ensurePackageModal();
    if (!overlay || overlay.dataset.homeModalBound === 'true') return;

    overlay.dataset.homeModalBound = 'true';
    patchPackageModal(overlay);

    const modal = $('.pkg-modal', overlay);
    const closeBtn = $('#pkgModalClose', overlay);
    const form = $('#pkgInquiryForm', overlay);
    const status = $('#pkgStatus', overlay);
    const submitBtn = $('#pkgSubmit', overlay);
    const followup = $('#pkgWAFollowup', overlay);

    if (!modal || !form) return;

    let lastFocused = null;
    let previousOverflow = '';

    const openModal = (packageName, destination) => {
      lastFocused = document.activeElement;
      previousOverflow = document.body.style.overflow;

      form.reset();
      clearStatus(status);
      hideFollowup(followup);

      setText('#pkgModalTitle', packageName, overlay);
      setValue('#pkgPackage', packageName, overlay);
      setValue('#pkgDestination', destination, overlay);

      overlay.classList.add('show');
      overlay.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';

      window.setTimeout(() => {
        $('#pkgName', overlay)?.focus();
      }, 80);
    };

    const closeModal = () => {
      if (!overlay.classList.contains('show')) return;

      overlay.classList.remove('show');
      overlay.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = previousOverflow;

      if (lastFocused && typeof lastFocused.focus === 'function') {
        lastFocused.focus();
      }
    };

    document.addEventListener('click', event => {
      const button = event.target.closest('.pkg-inquiry-btn');
      if (!button) return;

      event.preventDefault();

      const packageName =
        button.dataset.package ||
        button.getAttribute('data-package') ||
        getPackageNameFromCard(button) ||
        'Travel Package';
      const destination =
        button.dataset.destination || button.getAttribute('data-destination') || packageName;

      openModal(packageName.trim(), destination.trim());
    });

    closeBtn?.addEventListener('click', closeModal);

    overlay.addEventListener('click', event => {
      if (event.target === overlay) closeModal();
    });

    document.addEventListener('keydown', event => {
      if (!overlay.classList.contains('show')) return;

      if (event.key === 'Escape') {
        closeModal();
        return;
      }

      if (event.key === 'Tab') trapFocus(event, modal);
    });

    form.addEventListener('submit', async event => {
      event.preventDefault();

      if (($('#pkgHoneypot', overlay)?.value || '').trim()) return;

      const payload = {
        source: 'Trip Fly BD Homepage Package Inquiry',
        form_type: 'Package Inquiry',
        package: getValue('#pkgPackage', overlay),
        destination: getValue('#pkgDestination', overlay),
        name: getValue('#pkgName', overlay),
        whatsapp: getValue('#pkgPhone', overlay),
        travel_date: getValue('#pkgDate', overlay),
        budget: getValue('#pkgBudget', overlay),
        adults: getValue('#pkgAdults', overlay),
        message: getValue('#pkgMessage', overlay),
        submitted_at: new Date().toISOString()
      };

      clearStatus(status);
      hideFollowup(followup);

      const validationError = validateLead(payload);
      if (validationError) {
        showStatus(status, 'error', validationError);
        return;
      }

      setLoading(submitBtn, true);
      const result = await submitToGoogleSheets(payload);
      setLoading(submitBtn, false);

      const whatsappUrl = buildWhatsAppUrl(payload);

      if (!result.ok) {
        showStatus(
          status,
          'error',
          result.message || 'Could not submit right now. Please continue on WhatsApp.'
        );
        showFollowup(followup, whatsappUrl);
        return;
      }

      showStatus(
        status,
        'success',
        'Success! Your package inquiry has been sent. Our travel expert will contact you shortly.'
      );
      showFollowup(followup, whatsappUrl);
    });
  }

  const PACKAGE_DETAILS = {
    thailand: {
      title: 'Bangkok + Pattaya Tour',
      destination: 'Thailand',
      duration: '4N/5D',
      priceHtml: '&#2547;16,490 / &#2547;16,500',
      airTicketHtml: 'Dhaka to Bangkok return approx &#2547;40,000',
      minPax: 'Minimum 8 Pax / group pricing available',
      highlights: ['Coral Island Tour', 'Chao Phraya Dinner Cruise', 'Bangkok + Pattaya', 'Hotel with Breakfast', 'Airport Pick & Drop'],
      itinerary: [
        { day: 'Day 1', title: 'Arrival + Pattaya Transfer', items: ['Airport pick-up', 'Transfer to Pattaya', 'Hotel check-in and leisure time'] },
        { day: 'Day 2', title: 'Coral Island Tour', items: ['Coral Island experience', 'Beach time and optional water activities', 'Return to Pattaya hotel'] },
        { day: 'Day 3', title: 'Bangkok Transfer + Dinner Cruise', items: ['Transfer from Pattaya to Bangkok', 'Chao Phraya Dinner Cruise', 'Overnight in Bangkok'] },
        { day: 'Day 4', title: 'Bangkok Leisure', items: ['Breakfast at hotel', 'Free time for shopping or optional city experience', 'Overnight in Bangkok'] },
        { day: 'Day 5', title: 'Departure', items: ['Breakfast', 'Airport drop-off', 'Return flight support'] }
      ],
      includes: ['Hotel with breakfast', 'Coral Island Tour', 'Chao Phraya Dinner Cruise', 'Airport Pick & Drop', 'Bangkok + Pattaya transfer support'],
      exclusions: ['Air ticket unless added separately', 'Personal expenses', 'Optional activities', 'Any item not mentioned in inclusions'],
      whatsappText: 'I need details for Thailand Bangkok + Pattaya Tour.'
    },
    malaysia: {
      title: 'Malaysia Mid Premium Package',
      destination: 'Malaysia',
      duration: '5N/6D',
      priceHtml: '&#2547;24,300',
      airTicketHtml: 'Air ticket approx &#2547;45,300',
      minPax: '',
      highlights: ['Langkawi', 'Kuala Lumpur', 'Island Hopping', 'Genting Highlands', 'Batu Caves', 'Cable Car'],
      itinerary: [
        { day: 'Day 1', title: 'Arrival in Langkawi', items: ['Airport pick-up', 'Hotel check-in', 'Leisure time'] },
        { day: 'Day 2', title: 'Langkawi Island Hopping', items: ['Breakfast', 'Island Hopping Tour', 'Return to hotel'] },
        { day: 'Day 3', title: 'Langkawi to Kuala Lumpur', items: ['Breakfast', 'Transfer support', 'Kuala Lumpur hotel check-in'] },
        { day: 'Day 4', title: 'Genting Highlands + Batu Caves', items: ['Breakfast', 'Batu Caves visit', 'Genting Highlands with Cable Car'] },
        { day: 'Day 5', title: 'Kuala Lumpur Leisure', items: ['Breakfast', 'Free day for shopping or optional city tour', 'Overnight in Kuala Lumpur'] },
        { day: 'Day 6', title: 'Departure', items: ['Breakfast', 'Airport drop-off', 'Return flight support'] }
      ],
      includes: ['Hotel with breakfast', 'Island Hopping Tour', 'Genting Highlands + Batu Caves with Cable Car', 'Airport Pick & Drop'],
      exclusions: ['Visa fee excluded', 'Entry fees excluded', 'Personal expenses excluded', 'Air ticket unless added separately'],
      whatsappText: 'I need details for Malaysia Mid Premium Package.'
    },
    indonesia: {
      title: 'Indonesia Bali Package',
      destination: 'Indonesia',
      duration: 'Bali Full Package',
      priceHtml: '&#2547;55,000',
      airTicketHtml: 'Air ticket approx &#2547;80,000',
      minPax: '',
      highlights: ['Nusa Penida', 'Nusa Dua', 'Uluwatu Temple', 'Visa fee approx &#2547;12,000 including insurance'],
      itinerary: [
        { day: 'Day 1', title: 'Arrival in Bali', items: ['Airport meet and transfer', 'Hotel check-in', 'Leisure evening'] },
        { day: 'Day 2', title: 'Nusa Penida Experience', items: ['Breakfast', 'Nusa Penida tour support', 'Photo stops and beach time'] },
        { day: 'Day 3', title: 'Nusa Dua + Uluwatu', items: ['Breakfast', 'Nusa Dua visit', 'Uluwatu Temple experience'] },
        { day: 'Day 4', title: 'Leisure + Departure Support', items: ['Breakfast', 'Free time for shopping or optional activity', 'Airport transfer support'] }
      ],
      includes: ['Bali land package support', 'Nusa Penida plan', 'Nusa Dua visit', 'Uluwatu Temple plan', 'Travel consultation'],
      exclusions: ['Air ticket approx &#2547;80,000', 'Visa fee approx &#2547;12,000 including insurance', 'Entry fees if not mentioned', 'Personal expenses'],
      whatsappText: 'I need details for Indonesia Bali Package.'
    },
    maldives: {
      title: 'Maldives Package',
      destination: 'Maldives',
      duration: 'Island + Honeymoon Support',
      priceHtml: '&#2547;99,600',
      airTicketHtml: 'Air ticket approx &#2547;50,000 per pax',
      minPax: '',
      highlights: ['Private Island', 'Beach Villa', 'Maafushi', 'Hulhumale', 'Shared Speedboat Transfer'],
      itinerary: [
        { day: 'Day 1', title: 'Arrival in Maldives', items: ['Airport meet and greet', 'Transfer to Hulhumale or Maafushi', 'Hotel check-in'] },
        { day: 'Day 2', title: 'Island Experience', items: ['Breakfast or meal plan as per hotel', 'Beach time', 'Optional couple activities'] },
        { day: 'Day 3', title: 'Private Island / Beach Villa', items: ['Shared speedboat transfer', 'Private island or beach villa experience', 'Honeymoon support by request'] },
        { day: 'Day 4', title: 'Departure Support', items: ['Breakfast', 'Free time', 'Transfer support for departure'] }
      ],
      includes: ['Private Island + Maafushi + Hulhumale plan', 'Beach Villa option', 'Shared Speedboat Transfer', 'Meal plan depending on hotel', 'Luxury honeymoon support'],
      exclusions: ['Air ticket unless added separately', 'Personal expenses excluded', 'Optional activities', 'Any item not mentioned in inclusions'],
      whatsappText: 'I need details for Maldives Package.'
    },
    singapore: {
      title: 'Singapore Tour',
      destination: 'Singapore',
      duration: '2N/3D',
      priceHtml: '&#2547;16,000',
      airTicketHtml: 'Air ticket approx &#2547;40,000',
      minPax: '',
      highlights: ['Singapore City Tour', 'Merlion', 'Sentosa', 'Chinatown', 'Private Airport Transfer'],
      itinerary: [
        { day: 'Day 1', title: 'Arrival + Private Transfer', items: ['Airport pick-up', 'Private transfer to hotel', 'Check-in and leisure time'] },
        { day: 'Day 2', title: 'Singapore City Tour', items: ['Breakfast', 'Merlion visit', 'Sentosa and Chinatown experience', 'English speaking driver/guide support'] },
        { day: 'Day 3', title: 'Departure', items: ['Breakfast', 'Check-out', 'Private airport transfer'] }
      ],
      includes: ['2 Nights Singapore hotel', 'Breakfast', 'Singapore City Tour', 'Private Airport Transfer', 'English speaking driver/guide'],
      exclusions: ['Air ticket unless added separately', 'Visa fee if applicable', 'Entry fees not mentioned', 'Personal expenses'],
      whatsappText: 'I need details for Singapore Tour.'
    },
    china: {
      title: 'China Group Tour',
      destination: 'China',
      duration: 'Shenzhen 2N + Guangzhou 2N',
      priceHtml: 'Air ticket approx &#2547;46,300',
      airTicketHtml: 'Air ticket approx &#2547;46,300',
      minPax: 'Group tour pricing available',
      highlights: ['Window of the World', 'Splendid China Folk Village', 'Shenzhen Bay Park', 'Canton Tower', 'Pearl River Night Cruise optional'],
      itinerary: [
        { day: 'Day 1', title: 'Arrival in Shenzhen', items: ['Airport support', 'Hotel check-in', 'Evening leisure'] },
        { day: 'Day 2', title: 'Shenzhen Highlights', items: ['Window of the World', 'Splendid China Folk Village', 'Shenzhen Bay Park'] },
        { day: 'Day 3', title: 'Transfer to Guangzhou', items: ['Transfer support', 'Guangzhou city orientation', 'Overnight in Guangzhou'] },
        { day: 'Day 4', title: 'Guangzhou Experience', items: ['Canton Tower', 'Optional Pearl River Night Cruise', 'Group shopping/leisure time'] },
        { day: 'Day 5', title: 'Departure', items: ['Breakfast', 'Airport transfer support', 'Return flight assistance'] }
      ],
      includes: ['Shenzhen 2N + Guangzhou 2N route planning', 'City tour coordination', 'Group support', 'Travel consultation'],
      exclusions: ['Air ticket unless added separately', 'China visa fee', 'Optional Pearl River Night Cruise', 'Entry fees and personal expenses'],
      whatsappText: 'I need details for China Group Tour.'
    },
    srilanka: {
      title: 'Sri Lanka Land Package',
      destination: 'Sri Lanka',
      duration: 'Land Package',
      priceHtml: '&#2547;13,500',
      airTicketHtml: 'Air ticket approx &#2547;71,865',
      minPax: '',
      highlights: ['Colombo', 'Lotus Tower', 'Bentota', 'Mirissa', 'Galle Fort', 'Visa fee approx &#2547;3,000'],
      itinerary: [
        { day: 'Day 1', title: 'Arrival + Colombo', items: ['Airport transfer support', 'Colombo city experience', 'Lotus Tower visit by plan'] },
        { day: 'Day 2', title: 'Bentota + Mirissa', items: ['Breakfast', 'Bentota beach time', 'Mirissa coastal experience'] },
        { day: 'Day 3', title: 'Galle Fort + Departure Support', items: ['Galle Fort visit', 'Shopping/leisure time', 'Airport transfer support'] }
      ],
      includes: ['Sri Lanka land package support', 'Colombo plan', 'Bentota + Mirissa route', 'Galle Fort visit plan', 'Travel consultation'],
      exclusions: ['Air ticket approx &#2547;71,865', 'Visa fee approx &#2547;3,000', 'Entry fees if not mentioned', 'Personal expenses'],
      whatsappText: 'I need details for Sri Lanka Land Package.'
    }
  };

  function initPackageDetailsModal() {
    const overlay = ensurePackageDetailsModal();
    if (!overlay || overlay.dataset.detailsBound === 'true') return;

    overlay.dataset.detailsBound = 'true';

    const modal = $('.pkg-details-modal', overlay);
    const closeBtn = $('#pkgDetailsClose', overlay);
    const body = $('#pkgDetailsBody', overlay);

    if (!modal || !body) return;

    let lastFocused = null;
    let previousOverflow = '';

    const closeDetails = () => {
      if (!overlay.classList.contains('show')) return;

      overlay.classList.remove('show');
      overlay.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = previousOverflow;

      if (lastFocused && typeof lastFocused.focus === 'function') {
        lastFocused.focus();
      }
    };

    const openDetails = key => {
      const detail = PACKAGE_DETAILS[key];
      if (!detail) return;

      lastFocused = document.activeElement;
      previousOverflow = document.body.style.overflow;

      body.innerHTML = getPackageDetailsHTML(key, detail);
      overlay.classList.add('show');
      overlay.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';

      window.setTimeout(() => closeBtn?.focus(), 80);
    };

    document.addEventListener('click', event => {
      const button = event.target.closest('.pkg-details-btn');
      if (!button) return;

      event.preventDefault();
      openDetails(button.dataset.pkgKey || '');
    });

    closeBtn?.addEventListener('click', closeDetails);

    overlay.addEventListener('click', event => {
      if (event.target === overlay) closeDetails();
      if (event.target.closest('.pkg-detail-inquiry')) closeDetails();
    });

    document.addEventListener('keydown', event => {
      if (!overlay.classList.contains('show')) return;

      if (event.key === 'Escape') {
        closeDetails();
        return;
      }

      if (event.key === 'Tab') trapFocus(event, modal);
    });
  }

  function ensurePackageDetailsModal() {
    const overlays = $$("#pkgDetailsOverlay");

    if (overlays.length > 1) {
      overlays.slice(1).forEach(overlay => overlay.remove());
    }

    if (overlays[0]) return overlays[0];

    document.body.insertAdjacentHTML('beforeend', getPackageDetailsModalHTML());
    return $('#pkgDetailsOverlay');
  }

  function getPackageDetailsModalHTML() {
    return `
      <div class="pkg-details-overlay" id="pkgDetailsOverlay" aria-hidden="true">
        <div class="pkg-details-modal" role="dialog" aria-modal="true" aria-labelledby="pkgDetailsTitle">
          <button class="pkg-details-close" id="pkgDetailsClose" aria-label="Close package details" type="button">
            <i class="fas fa-times" aria-hidden="true"></i>
          </button>
          <div class="pkg-details-body" id="pkgDetailsBody"></div>
        </div>
      </div>`;
  }

  function getPackageDetailsHTML(key, detail) {
    const highlights = renderDetailList(detail.highlights);
    const itinerary = detail.itinerary
      .map(day => `
        <article class="pkg-day">
          <span>${escapeHtml(day.day)}</span>
          <h4>${escapeHtml(day.title)}</h4>
          ${renderDetailList(day.items)}
        </article>`)
      .join('');
    const includes = renderDetailList(detail.includes);
    const exclusions = renderDetailList(detail.exclusions);
    const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(detail.whatsappText)}`;

    return `
      <div class="pkg-details-head">
        <span class="pkg-details-kicker"><i class="fas fa-suitcase-rolling" aria-hidden="true"></i> Package Details</span>
        <h3 id="pkgDetailsTitle">${escapeHtml(detail.title)}</h3>
        <p>${escapeHtml(detail.destination)} &bull; ${escapeHtml(detail.duration)} &bull; Starting From <strong>${detail.priceHtml}</strong></p>
      </div>

      <div class="pkg-details-meta">
        <div><i class="fas fa-location-dot" aria-hidden="true"></i><span>Destination</span><strong>${escapeHtml(detail.destination)}</strong></div>
        <div><i class="fas fa-calendar-days" aria-hidden="true"></i><span>Duration</span><strong>${escapeHtml(detail.duration)}</strong></div>
        <div><i class="fas fa-tag" aria-hidden="true"></i><span>Starting Price</span><strong>${detail.priceHtml}</strong></div>
        <div><i class="fas fa-plane" aria-hidden="true"></i><span>Air Ticket</span><strong>${detail.airTicketHtml}</strong></div>
        ${detail.minPax ? `<div><i class="fas fa-users" aria-hidden="true"></i><span>Minimum Pax</span><strong>${escapeHtml(detail.minPax)}</strong></div>` : ''}
      </div>

      <div class="pkg-details-section">
        <h4><i class="fas fa-star" aria-hidden="true"></i> Highlights</h4>
        ${highlights}
      </div>

      <div class="pkg-details-section">
        <h4><i class="fas fa-route" aria-hidden="true"></i> Day-wise Itinerary</h4>
        <div class="pkg-itinerary">${itinerary}</div>
      </div>

      <div class="pkg-details-split">
        <div class="pkg-details-section">
          <h4><i class="fas fa-circle-check" aria-hidden="true"></i> Tour Includes</h4>
          ${includes}
        </div>
        <div class="pkg-details-section">
          <h4><i class="fas fa-circle-xmark" aria-hidden="true"></i> Exclusions</h4>
          ${exclusions}
        </div>
      </div>

      <div class="pkg-details-actions">
        <button type="button" class="btn btn-gold pkg-inquiry-btn pkg-detail-inquiry"
                data-package="${escapeHtml(detail.title)}"
                data-destination="${escapeHtml(detail.destination)}">
          <i class="fas fa-paper-plane" aria-hidden="true"></i> Submit Inquiry
        </button>
        <a href="${whatsappHref}" target="_blank" rel="noopener" class="btn btn-outline">
          <i class="fab fa-whatsapp" aria-hidden="true"></i> WhatsApp Expert
        </a>
      </div>`;
  }

  function renderDetailList(items = []) {
    return `
      <ul class="pkg-detail-list">
        ${items.map(item => `<li><i class="fas fa-check" aria-hidden="true"></i><span>${escapeHtml(item)}</span></li>`).join('')}
      </ul>`;
  }

  function ensurePackageModal() {
    const overlays = $$('#pkgModalOverlay');

    if (overlays.length > 1) {
      overlays.slice(1).forEach(overlay => overlay.remove());
    }

    if (overlays[0]) return overlays[0];

    document.body.insertAdjacentHTML('beforeend', getPackageModalHTML());
    return $('#pkgModalOverlay');
  }

  function patchPackageModal(overlay) {
    const form = $('#pkgInquiryForm', overlay);
    if (!form) return;

    const closeBtn = $('#pkgModalClose', overlay);
    if (closeBtn && !closeBtn.getAttribute('type')) closeBtn.setAttribute('type', 'button');

    if (!$('#pkgDestination', overlay)) {
      const destination = document.createElement('input');
      destination.type = 'hidden';
      destination.id = 'pkgDestination';
      destination.name = 'destination';
      form.appendChild(destination);
    }
  }

  function getPackageModalHTML() {
    return `
      <div class="pkg-modal-overlay" id="pkgModalOverlay" aria-hidden="true">
        <div class="pkg-modal" role="dialog" aria-modal="true" aria-labelledby="pkgModalTitle">
          <button class="pkg-modal-close" id="pkgModalClose" aria-label="Close inquiry" type="button">
            <i class="fas fa-times" aria-hidden="true"></i>
          </button>

          <div class="pkg-modal-head">
            <div class="pkg-modal-icon"><i class="fas fa-paper-plane" aria-hidden="true"></i></div>
            <span class="ef-eyebrow"><i class="fas fa-envelope" aria-hidden="true"></i> Package Inquiry</span>
            <h3 id="pkgModalTitle">Book Inquiry</h3>
            <p>Your inquiry will be saved and our expert will get back to you within minutes.</p>
          </div>

          <form class="pkg-modal-form" id="pkgInquiryForm" novalidate autocomplete="off">
            <input type="text" id="pkgHoneypot" name="website" class="ex-honeypot" tabindex="-1" autocomplete="off"/>
            <input type="hidden" id="pkgDestination" name="destination"/>

            <div class="ef-row">
              <div class="ef-field">
                <label for="pkgName">Full Name <span class="ef-req">*</span></label>
                <div class="ef-input-wrap">
                  <i class="fas fa-user" aria-hidden="true"></i>
                  <input type="text" id="pkgName" placeholder="Your full name" required/>
                </div>
              </div>
              <div class="ef-field">
                <label for="pkgPhone">WhatsApp Number <span class="ef-req">*</span></label>
                <div class="ef-input-wrap">
                  <i class="fab fa-whatsapp" aria-hidden="true"></i>
                  <input type="tel" id="pkgPhone" placeholder="+880 1XXXXXXXXX" required/>
                </div>
              </div>
            </div>

            <div class="ef-row">
              <div class="ef-field">
                <label for="pkgPackage">Package</label>
                <div class="ef-input-wrap">
                  <i class="fas fa-suitcase" aria-hidden="true"></i>
                  <input type="text" id="pkgPackage" readonly/>
                </div>
              </div>
              <div class="ef-field">
                <label for="pkgDate">Travel Month (Optional)</label>
                <div class="ef-input-wrap">
                  <i class="fas fa-calendar-alt" aria-hidden="true"></i>
                  <select id="pkgDate">
                    <option value="" disabled selected>Select month</option>
                    <option>This Month</option>
                    <option>Next Month</option>
                    <option>Within 3 Months</option>
                    <option>Within 6 Months</option>
                    <option>Flexible / Just Exploring</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="ef-field">
              <label for="pkgMessage">Message (Optional)</label>
              <div class="ef-input-wrap ef-textarea-wrap">
                <i class="fas fa-comment-alt" aria-hidden="true"></i>
                <textarea id="pkgMessage" rows="3" placeholder="Travelers count, special preferences, questions..."></textarea>
              </div>
            </div>

            <div class="ef-status" id="pkgStatus" role="alert"></div>

            <button type="submit" class="ef-submit" id="pkgSubmit">
              <span class="ef-spinner" aria-hidden="true"></span>
              <span class="ef-submit-text"><i class="fas fa-paper-plane" aria-hidden="true"></i> Send Inquiry</span>
            </button>

            <a href="#" id="pkgWAFollowup" target="_blank" rel="noopener" class="ef-wa-followup" style="display:none;">
              <i class="fab fa-whatsapp" aria-hidden="true"></i> Continue on WhatsApp
            </a>

            <div class="ef-privacy">
              <i class="fas fa-lock" aria-hidden="true"></i> Your information is safe. We never share or spam.
            </div>
          </form>
        </div>
      </div>
    `;
  }

  async function submitToGoogleSheets(payload) {
    const body = {
      sheet: payload.form_type === 'Package Inquiry' ? 'Package Inquiries' : 'Expert Consultations',
      timestamp: new Date().toLocaleString('en-BD', { timeZone: 'Asia/Dhaka' }),
      phone: payload.whatsapp || '',
      ...payload
    };

    try {
      const response = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain'
        },
        body: JSON.stringify(body)
      });

      if (!response.ok) throw new Error('Request failed');

      const text = await response.text();
      const data = text ? safeJsonParse(text) : null;

      if (data?.status && data.status !== 'success') {
        throw new Error(data.message || 'Submission failed');
      }

      return { ok: true };
    } catch (error) {
      return {
        ok: false,
        message: 'Could not save your request right now.'
      };
    }
  }

  function buildWhatsAppUrl(payload) {
    const lines = [
      'Hello Trip Fly BD!',
      `I need help with: ${payload.package || payload.form_type || 'Travel Consultation'}`,
      payload.destination ? `Destination: ${payload.destination}` : '',
      payload.name ? `Name: ${payload.name}` : '',
      payload.whatsapp ? `WhatsApp: ${payload.whatsapp}` : '',
      payload.travel_date ? `Travel Date: ${payload.travel_date}` : '',
      payload.budget ? `Budget: ${payload.budget}` : '',
      payload.adults ? `Adults: ${payload.adults}` : '',
      payload.message ? `Message: ${payload.message}` : ''
    ].filter(Boolean);

    return `https://wa.me/8801898801939?text=${encodeURIComponent(lines.join('\n'))}`;
  }

  function validateLead(payload) {
    if (!payload.name || !payload.whatsapp) {
      return 'Please enter your name and WhatsApp number.';
    }

    if (!isValidPhone(payload.whatsapp)) {
      return 'Please enter a valid WhatsApp number.';
    }

    return '';
  }

  function isValidPhone(value) {
    return /^[+\d][\d\s-]{7,18}$/.test(String(value || '').trim());
  }

  function getPackageNameFromCard(button) {
    return $('.pkg-name', button.closest('.pkg-card'))?.textContent?.trim() || '';
  }

  function getValue(selector, root = document) {
    return ($(selector, root)?.value || '').trim();
  }

  function setValue(selector, value, root = document) {
    const el = $(selector, root);
    if (el) el.value = value || '';
  }

  function setText(selector, value, root = document) {
    const el = $(selector, root);
    if (el) el.textContent = value || '';
  }

  function setLoading(button, loading) {
    if (!button) return;

    button.disabled = loading;
    button.classList.toggle('loading', loading);
  }

  function showStatus(el, type, message) {
    if (!el) return;

    el.className = `ef-status show ${type}`;
    el.innerHTML = `
      <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}" aria-hidden="true"></i>
      <span>${escapeHtml(message)}</span>
    `;
  }

  function clearStatus(el) {
    if (!el) return;

    el.className = 'ef-status';
    el.textContent = '';
  }

  function showFollowup(link, url) {
    if (!link) return;

    link.href = url;
    link.style.display = 'flex';
  }

  function hideFollowup(link) {
    if (!link) return;

    link.style.display = 'none';
    link.removeAttribute('href');
  }

  function trapFocus(event, container) {
    const focusable = $$(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      container
    ).filter(el => el.offsetParent !== null);

    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function debounce(fn, wait = 100) {
    let timer = null;

    return (...args) => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => fn(...args), wait);
    };
  }

  function isReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function safeJsonParse(value) {
    try {
      return JSON.parse(value);
    } catch (error) {
      return null;
    }
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, char => {
      const entities = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
      };

      return entities[char];
    });
  }
})();
