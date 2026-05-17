/* ============================================================
   TRIP FLY BD - SERVICES.JS
   Tabs | Modal | Google Sheets | WhatsApp follow-up
============================================================ */
'use strict';

(() => {
  const APPS_SCRIPT_URL =
    'https://script.google.com/macros/s/AKfycbxNNt8_3RtKAAHf2X4QjCrlfgSqPJCX1UmDNmT_u0ltneXI4sRhirNRzq9j2k4l4gwinQ/exec';
  const WHATSAPP_NUMBER = '8801898801939';
  const SERVICE_NAME_MAP = {
    'Air Ticketing': 'International Air Ticketing',
    'Domestic Ticketing': 'Domestic Air Ticketing',
    'Visa Processing': 'Tourist Visa',
    'Free Visa Eligibility Check': 'Tourist Visa',
    'Need Help Choosing Service': 'General Travel Consultation',
    'General Service Inquiry': 'General Travel Consultation',
    'General Service': 'General Travel Consultation'
  };

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
    initServiceTabs();
    initServiceModal();
    initRevealAnimations();
    initBrokenImageFallback();
  });

  function initServiceTabs() {
    const tabs = $$('.svc-tab');
    if (!tabs.length) return;

    const sections = tabs
      .map(tab => {
        const id = tab.dataset.target;
        return id ? document.getElementById(id) : null;
      })
      .filter(Boolean);

    tabs.forEach(tab => {
      if (tab.dataset.bound === 'true') return;
      tab.dataset.bound = 'true';

      tab.addEventListener('click', () => {
        const target = document.getElementById(tab.dataset.target || '');
        if (!target) return;

        activateTab(tab, tabs);
        scrollToSection(target);
        centerActiveTab(tab);
      });
    });

    if ('IntersectionObserver' in window && sections.length) {
      const observer = new IntersectionObserver(
        entries => {
          const visible = entries
            .filter(entry => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

          if (!visible) return;

          const active = tabs.find(tab => tab.dataset.target === visible.target.id);
          if (active) activateTab(active, tabs);
        },
        {
          threshold: [0.18, 0.35, 0.55],
          rootMargin: '-25% 0px -55% 0px'
        }
      );

      sections.forEach(section => observer.observe(section));
    }
  }

  function activateTab(activeTab, tabs) {
    tabs.forEach(tab => {
      const isActive = tab === activeTab;
      tab.classList.toggle('active', isActive);
      tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
  }

  function scrollToSection(target) {
    const navHeight = getNavHeight();
    const extraOffset = 76;
    const top = target.getBoundingClientRect().top + window.pageYOffset - navHeight - extraOffset;

    window.scrollTo({
      top: Math.max(0, top),
      behavior: 'smooth'
    });
  }

  function centerActiveTab(tab) {
    const nav = tab.closest('.services-nav');
    if (!nav) return;

    const tabRect = tab.getBoundingClientRect();
    const navRect = nav.getBoundingClientRect();
    const offset = tabRect.left - navRect.left - (navRect.width - tabRect.width) / 2;

    nav.scrollBy({
      left: offset,
      behavior: 'smooth'
    });
  }

  function initServiceModal() {
    const overlay = ensureServiceModal();
    if (!overlay || overlay.dataset.bound === 'true') return;

    overlay.dataset.bound = 'true';

    const modal = $('.svc-modal', overlay);
    const closeBtn = $('#svcModalClose', overlay);
    const form = $('#serviceInquiryForm', overlay);
    const status = $('#svcStatus', overlay);
    const submitBtn = $('#svcSubmitBtn', overlay);
    const followupBtn = $('#svcModalWhatsApp', overlay);

    if (!modal || !form) return;

    bindSmartFormControls(overlay);

    let lastFocused = null;
    let previousOverflow = '';

    const openModal = serviceName => {
      lastFocused = document.activeElement;
      previousOverflow = document.body.style.overflow;

      form.reset();
      clearStatus(status);
      hideFollowup(followupBtn);
      setLoading(submitBtn, false);

      const service = normalizeServiceName(serviceName);
      setText('#svcModalTitle', `${service} Inquiry`, overlay);
      setValue('#svcService', service, overlay);
      setValue('#svcTravelType', getSuggestedTravelType(service), overlay);
      setValue('#svcAdults', '1', overlay);
      setValue('#svcChildren', '0', overlay);
      toggleCustomDestination(overlay);

      overlay.classList.add('show');
      overlay.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';

      window.setTimeout(() => {
        $('#svcName', overlay)?.focus();
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
      const button = event.target.closest('.svc-inquiry-btn, [data-service-action="inquiry"]');
      if (!button) return;

      event.preventDefault();
      openModal(getServiceName(button));
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

      if (($('#svcHoneypot', overlay)?.value || '').trim()) return;

      const payload = {
        sheet: 'Service Inquiries',
        timestamp: new Date().toLocaleString('en-BD', { timeZone: 'Asia/Dhaka' }),
        name: getValue('#svcName', overlay),
        phone: getValue('#svcPhone', overlay),
        whatsapp: getValue('#svcPhone', overlay),
        email: getValue('#svcEmail', overlay),
        selectedService: getValue('#svcService', overlay) || 'General Travel Consultation',
        service: getValue('#svcService', overlay) || 'General Travel Consultation',
        destinationRoute: getValue('#svcDestination', overlay),
        destination: getValue('#svcDestination', overlay),
        customDestination: getValue('#svcCustomDestination', overlay),
        travelDate: getValue('#svcTravelDate', overlay),
        travelTime: getValue('#svcTravelTime', overlay),
        travelType: getValue('#svcTravelType', overlay),
        urgency: getValue('#svcUrgency', overlay),
        adults: getValue('#svcAdults', overlay) || '1',
        children: getValue('#svcChildren', overlay) || '0',
        budgetRange: getValue('#svcBudget', overlay),
        message: getValue('#svcMessage', overlay),
        source: 'Services Page - Trip Fly BD Website'
      };

      if (payload.destinationRoute === 'Other' && payload.customDestination) {
        payload.destination = payload.customDestination;
      }

      clearStatus(status);
      hideFollowup(followupBtn);

      const validationError = validatePayload(payload);
      if (validationError) {
        showStatus(status, 'error', validationError);
        return;
      }

      setLoading(submitBtn, true);
      const result = await submitToGoogleSheet(payload);
      setLoading(submitBtn, false);

      const whatsappUrl = buildWhatsAppUrl(payload);

      if (!result.ok) {
        showStatus(
          status,
          'error',
          result.message || 'Something went wrong. Please continue on WhatsApp.'
        );
        showFollowup(followupBtn, whatsappUrl);
        return;
      }

      showStatus(
        status,
        'success',
        'Inquiry sent successfully! Our travel expert will contact you shortly.'
      );
      showFollowup(followupBtn, whatsappUrl);

      form.reset();
      setValue('#svcService', payload.selectedService, overlay);
      setValue('#svcTravelType', getSuggestedTravelType(payload.selectedService), overlay);
      setValue('#svcAdults', '1', overlay);
      setValue('#svcChildren', '0', overlay);
      toggleCustomDestination(overlay);
    });
  }

  function ensureServiceModal() {
    const overlays = $$('#serviceModalOverlay');

    if (overlays.length > 1) {
      overlays.slice(1).forEach(overlay => overlay.remove());
    }

    if (overlays[0]) {
      patchServiceModal(overlays[0]);
      return overlays[0];
    }

    document.body.insertAdjacentHTML('beforeend', getServiceModalHTML());
    return $('#serviceModalOverlay');
  }

  function patchServiceModal(overlay) {
    overlay.setAttribute('aria-hidden', overlay.classList.contains('show') ? 'false' : 'true');

    const closeBtn = $('#svcModalClose', overlay);
    if (closeBtn && !closeBtn.getAttribute('type')) closeBtn.setAttribute('type', 'button');

    const form = $('#serviceInquiryForm', overlay);
    if (form && !form.getAttribute('novalidate')) form.setAttribute('novalidate', '');
  }

  function getServiceModalHTML() {
    return `
      <div class="svc-modal-overlay" id="serviceModalOverlay" aria-hidden="true">
        <div class="svc-modal" role="dialog" aria-modal="true" aria-labelledby="svcModalTitle">
          <button type="button" class="svc-modal-close" id="svcModalClose" aria-label="Close inquiry form">
            <i class="fas fa-times" aria-hidden="true"></i>
          </button>
          <div class="svc-modal-head">
            <div class="svc-modal-icon"><i class="fas fa-paper-plane" aria-hidden="true"></i></div>
            <span class="section-tag"><i class="fas fa-envelope" aria-hidden="true"></i> Service Inquiry</span>
            <h2 id="svcModalTitle">Send Service Inquiry</h2>
            <p>Your inquiry will be saved securely. Our team will contact you shortly.</p>
          </div>
          <form class="svc-inquiry-form" id="serviceInquiryForm" novalidate autocomplete="off">
            <input type="text" id="svcHoneypot" name="website" class="svc-honeypot" autocomplete="off" tabindex="-1"/>
            ${getSmartServiceFormFieldsHTML()}
            <div class="svc-status" id="svcStatus" role="alert"></div>
            <div class="svc-modal-actions">
              <button type="submit" class="svc-submit-btn" id="svcSubmitBtn">
                <span class="svc-spinner" aria-hidden="true"></span>
                <span class="svc-submit-text"><i class="fas fa-paper-plane" aria-hidden="true"></i> Submit Inquiry</span>
              </button>
              <a href="#" target="_blank" rel="noopener" class="svc-modal-wa" id="svcModalWhatsApp" style="display:none;">
                <i class="fab fa-whatsapp" aria-hidden="true"></i> Continue on WhatsApp
              </a>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  function getSmartServiceFormFieldsHTML() {
    return `
      <div class="svc-form-grid">
        <div class="svc-field">
          <label for="svcName">Full Name <span>*</span></label>
          <input type="text" id="svcName" name="name" placeholder="Your full name" required/>
        </div>
        <div class="svc-field">
          <label for="svcPhone">WhatsApp Number <span>*</span></label>
          <input type="tel" id="svcPhone" name="phone" placeholder="+880 1XXXXXXXXX" required/>
        </div>
        <div class="svc-field">
          <label for="svcEmail">Email</label>
          <input type="email" id="svcEmail" name="email" placeholder="your@email.com"/>
        </div>
        <div class="svc-field">
          <label for="svcService">Selected Service</label>
          <div class="svc-control-wrap">
            <select id="svcService" name="selectedService">
              <option value="International Air Ticketing">International Air Ticketing</option>
              <option value="Domestic Air Ticketing">Domestic Air Ticketing</option>
              <option value="Ticket Date Changing">Ticket Date Changing</option>
              <option value="Tourist Visa">Tourist Visa</option>
              <option value="Student Visa">Student Visa</option>
              <option value="Medical Visa">Medical Visa</option>
              <option value="Group Visa">Group Visa</option>
              <option value="Couple Package">Couple Package</option>
              <option value="Hotel Booking">Hotel Booking</option>
              <option value="Tour Package">Tour Package</option>
              <option value="General Travel Consultation">General Travel Consultation</option>
            </select>
            <i class="fas fa-chevron-down" aria-hidden="true"></i>
          </div>
        </div>
        <div class="svc-field">
          <label for="svcDestination">Destination / Route</label>
          <div class="svc-control-wrap">
            <input type="text" id="svcDestination" name="destinationRoute" list="svcDestinationOptions" placeholder="Search destination or route"/>
            <i class="fas fa-search" aria-hidden="true"></i>
          </div>
          <datalist id="svcDestinationOptions">
            <option value="Thailand"></option><option value="Malaysia"></option><option value="Singapore"></option>
            <option value="Dubai / UAE"></option><option value="India"></option><option value="Sri Lanka"></option>
            <option value="Maldives"></option><option value="Indonesia"></option><option value="Nepal"></option>
            <option value="China"></option><option value="Japan"></option><option value="Turkey"></option>
            <option value="Australia"></option><option value="Portugal"></option><option value="South Africa"></option>
            <option value="Philippines"></option><option value="Qatar"></option><option value="Saudi Arabia"></option>
            <option value="United Kingdom"></option><option value="France"></option><option value="Italy"></option>
            <option value="Spain"></option><option value="Netherlands"></option><option value="Bangladesh Domestic"></option>
            <option value="Dhaka to Cox's Bazar"></option><option value="Dhaka to Sylhet"></option>
            <option value="Dhaka to Chittagong"></option><option value="Dhaka to Saidpur"></option>
            <option value="Dhaka to Rajshahi"></option><option value="Dhaka to Barishal"></option>
            <option value="Dhaka to Jashore"></option><option value="Other"></option>
          </datalist>
        </div>
        <div class="svc-field svc-custom-destination" id="svcCustomDestinationWrap" hidden>
          <label for="svcCustomDestination">Write destination / route</label>
          <input type="text" id="svcCustomDestination" name="customDestination" placeholder="Write destination / route"/>
        </div>
        <div class="svc-field">
          <label for="svcTravelDate">Travel Date</label>
          <input type="date" id="svcTravelDate" name="travelDate"/>
        </div>
        <div class="svc-field">
          <label for="svcTravelTime">Travel Time</label>
          <input type="time" id="svcTravelTime" name="travelTime"/>
        </div>
        <div class="svc-field">
          <label for="svcTravelType">Travel Type</label>
          <div class="svc-control-wrap">
            <select id="svcTravelType" name="travelType">
              <option value="">Select travel type</option>
              <option value="Tourist">Tourist</option>
              <option value="Student">Student</option>
              <option value="Medical">Medical</option>
              <option value="Group">Group</option>
            </select>
            <i class="fas fa-chevron-down" aria-hidden="true"></i>
          </div>
        </div>
        <div class="svc-field">
          <label for="svcUrgency">Travel Urgency</label>
          <div class="svc-control-wrap">
            <select id="svcUrgency" name="urgency">
              <option value="">Select urgency</option>
              <option value="Urgent">Urgent</option>
              <option value="Within 7 Days">Within 7 Days</option>
              <option value="Within 15 Days">Within 15 Days</option>
              <option value="Flexible">Flexible</option>
            </select>
            <i class="fas fa-chevron-down" aria-hidden="true"></i>
          </div>
        </div>
        <div class="svc-field">
          <label for="svcAdults">Adults</label>
          <input type="number" id="svcAdults" name="adults" min="1" value="1" inputmode="numeric"/>
        </div>
        <div class="svc-field">
          <label for="svcChildren">Children</label>
          <input type="number" id="svcChildren" name="children" min="0" value="0" inputmode="numeric"/>
        </div>
        <div class="svc-field">
          <label for="svcBudget">Budget Range</label>
          <div class="svc-control-wrap">
            <select id="svcBudget" name="budgetRange">
              <option value="">Select budget range</option>
              <option value="Below ৳30,000">Below ৳30,000</option>
              <option value="৳30,000 - ৳60,000">৳30,000 - ৳60,000</option>
              <option value="৳60,000 - ৳1,00,000">৳60,000 - ৳1,00,000</option>
              <option value="৳1,00,000+">৳1,00,000+</option>
              <option value="Not Sure">Not Sure</option>
            </select>
            <i class="fas fa-chevron-down" aria-hidden="true"></i>
          </div>
        </div>
      </div>
      <div class="svc-field">
        <label for="svcMessage">Message</label>
        <textarea id="svcMessage" name="message" rows="4" placeholder="Tell us passenger details, visa status, preferred airline or urgent request..."></textarea>
      </div>
    `;
  }

  async function submitToGoogleSheet(payload) {
    try {
      const response = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain'
        },
        body: JSON.stringify(payload)
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
        message: 'Could not save your inquiry right now.'
      };
    }
  }

  function buildWhatsAppUrl(payload) {
    const route = payload.destinationRoute === 'Other'
      ? payload.customDestination
      : payload.destinationRoute;

    const lines = [
      'Hello Trip Fly BD!',
      'I submitted a service inquiry.',
      payload.selectedService ? `Service: ${payload.selectedService}` : '',
      payload.name ? `Name: ${payload.name}` : '',
      payload.phone ? `WhatsApp: ${payload.phone}` : '',
      route ? `Destination / Route: ${route}` : '',
      payload.travelDate ? `Travel Date: ${payload.travelDate}` : '',
      payload.travelTime ? `Travel Time: ${payload.travelTime}` : '',
      payload.travelType ? `Travel Type: ${payload.travelType}` : '',
      payload.urgency ? `Urgency: ${payload.urgency}` : '',
      payload.adults ? `Adults: ${payload.adults}` : '',
      payload.children ? `Children: ${payload.children}` : '',
      payload.budgetRange ? `Budget: ${payload.budgetRange}` : '',
      payload.message ? `Message: ${payload.message}` : ''
    ].filter(Boolean);

    return `https://wa.me/8801898801939?text=${encodeURIComponent(lines.join('\n'))}`;
  }

  function validatePayload(payload) {
    if (!payload.name || !payload.phone) {
      return 'Please enter your name and WhatsApp number.';
    }

    if (!isValidPhone(payload.phone)) {
      return 'Please enter a valid WhatsApp number.';
    }

    if (payload.destinationRoute === 'Other' && !payload.customDestination) {
      return 'Please write your destination or route.';
    }

    return '';
  }

  function bindSmartFormControls(overlay) {
    const destination = $('#svcDestination', overlay);
    if (destination && destination.dataset.smartBound !== 'true') {
      destination.dataset.smartBound = 'true';
      destination.addEventListener('input', () => toggleCustomDestination(overlay));
      destination.addEventListener('change', () => toggleCustomDestination(overlay));
    }

    const service = $('#svcService', overlay);
    if (service && service.dataset.smartBound !== 'true') {
      service.dataset.smartBound = 'true';
      service.addEventListener('change', () => {
        const suggestedType = getSuggestedTravelType(service.value);
        if (suggestedType) setValue('#svcTravelType', suggestedType, overlay);
      });
    }
  }

  function toggleCustomDestination(overlay) {
    const destination = getValue('#svcDestination', overlay);
    const wrapper = $('#svcCustomDestinationWrap', overlay);
    const custom = $('#svcCustomDestination', overlay);
    const shouldShow = destination.toLowerCase() === 'other';

    if (wrapper) wrapper.hidden = !shouldShow;

    if (custom) {
      custom.required = shouldShow;
      if (!shouldShow) custom.value = '';
    }
  }

  function normalizeServiceName(value) {
    const service = (value || 'General Travel Consultation').trim();
    return SERVICE_NAME_MAP[service] || service;
  }

  function getSuggestedTravelType(service) {
    const value = String(service || '').toLowerCase();

    if (value.includes('student')) return 'Student';
    if (value.includes('medical')) return 'Medical';
    if (value.includes('group')) return 'Group';
    if (value.includes('visa') || value.includes('package') || value.includes('tour')) return 'Tourist';

    return '';
  }

  function getServiceName(button) {
    const direct = button.dataset.service || button.getAttribute('data-service');
    if (direct) return direct.trim();

    const card = button.closest('[data-service]');
    const fromCard = card?.dataset.service;
    if (fromCard) return fromCard.trim();

    const title = button.closest('.svc-card')?.querySelector('h3')?.textContent;
    return (title || 'General Service Inquiry').trim();
  }

  function initRevealAnimations() {
    const revealItems = $$('.reveal-up, .reveal-left, .reveal-right').filter(
      item => item.dataset.svcRevealBound !== 'true'
    );

    if (!revealItems.length) return;

    revealItems.forEach(item => {
      item.dataset.svcRevealBound = 'true';
    });

    if (!('IntersectionObserver' in window)) {
      revealItems.forEach(item => {
        item.classList.add('visible', 'active-reveal');
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
        threshold: 0.12,
        rootMargin: '0px 0px -35px 0px'
      }
    );

    revealItems.forEach(item => observer.observe(item));
  }

  function initBrokenImageFallback() {
    const fallback =
      'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=900&q=80&fit=crop';

    $$('.svc-card-img img').forEach(img => {
      if (img.dataset.fallbackBound === 'true') return;
      img.dataset.fallbackBound = 'true';

      img.addEventListener('error', () => {
        img.src = fallback;
        img.alt = 'Trip Fly BD service';
      });
    });
  }

  function setLoading(button, isLoading) {
    if (!button) return;

    button.disabled = isLoading;
    button.classList.toggle('loading', isLoading);
  }

  function showStatus(el, type, message) {
    if (!el) return;

    el.className = `svc-status show ${type}`;
    el.innerHTML = `
      <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}" aria-hidden="true"></i>
      <span>${escapeHtml(message)}</span>
    `;
  }

  function clearStatus(el) {
    if (!el) return;

    el.className = 'svc-status';
    el.textContent = '';
  }

  function showFollowup(link, url) {
    if (!link) return;

    link.href = url;
    link.style.display = 'inline-flex';
  }

  function hideFollowup(link) {
    if (!link) return;

    link.style.display = 'none';
    link.removeAttribute('href');
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

  function isValidPhone(value) {
    return /^[+\d][\d\s-]{7,18}$/.test(String(value || '').trim());
  }

  function safeJsonParse(value) {
    try {
      return JSON.parse(value);
    } catch (error) {
      return null;
    }
  }

  function getNavHeight() {
    const value = getComputedStyle(document.documentElement).getPropertyValue('--nav-h');
    return parseInt(value || '70', 10) || 70;
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
