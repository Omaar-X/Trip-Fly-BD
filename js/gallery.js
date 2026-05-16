/* ============================================================
   TRIP FLY BD - SUCCESS STORY GALLERY.JS
   Filter | Lightbox | Defensive UI
============================================================ */
'use strict';

(() => {
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
    initSuccessFilters();
    initSuccessLightbox();
    initImageFallbacks();
  });

  function initSuccessFilters() {
    const buttons = $$('.gf-btn');
    const items = $$('.gallery-item');
    const countEl = $('#galleryCount');
    const filterBar = $('.gallery-filter');

    if (!buttons.length || !items.length) return;

    const updateCount = () => {
      const visible = items.filter(item => !item.classList.contains('hide')).length;
      if (countEl) countEl.textContent = String(visible);
    };

    const applyFilter = activeButton => {
      const filter = activeButton?.dataset.filter || 'all';

      buttons.forEach(button => {
        const isActive = button === activeButton;
        button.classList.toggle('active', isActive);
        button.setAttribute('aria-selected', String(isActive));
      });

      items.forEach((item, index) => {
        const categories = (item.dataset.cat || '').split(/\s+/).filter(Boolean);
        const match = filter === 'all' || categories.includes(filter);

        item.style.transitionDelay = match ? `${Math.min(index * 24, 180)}ms` : '0ms';
        item.classList.toggle('hide', !match);
        item.setAttribute('aria-hidden', String(!match));
      });

      if (activeButton && filterBar && typeof activeButton.scrollIntoView === 'function') {
        activeButton.scrollIntoView({
          behavior: 'smooth',
          inline: 'center',
          block: 'nearest'
        });
      }

      updateCount();
    };

    buttons.forEach(button => {
      if (button.dataset.filterBound === 'true') return;
      button.dataset.filterBound = 'true';

      button.addEventListener('click', () => {
        applyFilter(button);
      });
    });

    applyFilter(buttons.find(button => button.classList.contains('active')) || buttons[0]);
  }

  function initSuccessLightbox() {
    const items = $$('.gallery-item');
    const lightbox = $('#lightbox');
    const image = $('#lbImg');
    const title = $('#lbTitle');
    const caption = $('#lbCaption');
    const counter = $('#lbCounter');
    const backdrop = $('#lbBackdrop');
    const closeButton = $('#lbClose');
    const prevButton = $('#lbPrev');
    const nextButton = $('#lbNext');

    if (!items.length || !lightbox || !image) return;

    let currentIndex = 0;
    let previousOverflow = '';
    let touchStartX = 0;

    const visibleItems = () => items.filter(item => !item.classList.contains('hide'));

    const render = index => {
      const visible = visibleItems();
      const item = visible[index];
      if (!item) return;

      currentIndex = index;
      image.src = item.dataset.src || item.querySelector('img')?.src || '';
      image.alt = item.querySelector('img')?.alt || 'Trip Fly BD success story photo';
      if (title) title.textContent = item.dataset.title || 'Trip Fly BD Success Story';
      if (caption) caption.textContent = item.dataset.caption || '';
      if (counter) counter.textContent = `${index + 1} / ${visible.length}`;
    };

    const open = item => {
      const visible = visibleItems();
      const index = visible.indexOf(item);
      if (index < 0) return;

      previousOverflow = document.body.style.overflow || '';
      render(index);
      lightbox.classList.add('active');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      closeButton?.focus();
    };

    const close = () => {
      if (!lightbox.classList.contains('active')) return;

      lightbox.classList.remove('active');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = previousOverflow;

      window.setTimeout(() => {
        if (!lightbox.classList.contains('active')) image.src = '';
      }, 250);
    };

    const prev = () => {
      const visible = visibleItems();
      if (!visible.length) return;
      render((currentIndex - 1 + visible.length) % visible.length);
    };

    const next = () => {
      const visible = visibleItems();
      if (!visible.length) return;
      render((currentIndex + 1) % visible.length);
    };

    items.forEach(item => {
      if (item.dataset.lightboxBound === 'true') return;
      item.dataset.lightboxBound = 'true';
      item.setAttribute('tabindex', '0');

      item.addEventListener('click', () => open(item));
      item.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          open(item);
        }
      });
    });

    backdrop?.addEventListener('click', close);
    closeButton?.addEventListener('click', close);
    prevButton?.addEventListener('click', prev);
    nextButton?.addEventListener('click', next);

    document.addEventListener('keydown', event => {
      if (!lightbox.classList.contains('active')) return;

      if (event.key === 'Escape') close();
      if (event.key === 'ArrowLeft') prev();
      if (event.key === 'ArrowRight') next();
    });

    lightbox.addEventListener('touchstart', event => {
      touchStartX = event.touches[0]?.clientX || 0;
    }, { passive: true });

    lightbox.addEventListener('touchend', event => {
      const touchEndX = event.changedTouches[0]?.clientX || 0;
      const delta = touchEndX - touchStartX;

      if (Math.abs(delta) > 50) {
        delta < 0 ? next() : prev();
      }
    }, { passive: true });
  }

  function initImageFallbacks() {
    const fallback = 'images/logo.png';

    $$('.gallery-item img').forEach(image => {
      if (image.dataset.fallbackBound === 'true') return;
      image.dataset.fallbackBound = 'true';

      image.addEventListener('error', () => {
        image.src = fallback;
        image.alt = 'Trip Fly BD success story';
      });
    });
  }
})();
