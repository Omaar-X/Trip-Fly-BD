/* ============================================================
   TRIP FLY BD — SERVICES.JS
   Service Inquiry Modal | Google Sheet Submit | WhatsApp
============================================================ */
'use strict';

const APPS_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbxNNt8_3RtKAAHf2X4QjCrlfgSqPJCX1UmDNmT_u0ltneXI4sRhirNRzq9j2k4l4gwinQ/exec';

const WHATSAPP_NUMBER = '88017XXXXXXXX';

document.addEventListener('DOMContentLoaded', () => {
  initServiceTabs();
  initServiceModal();
  initRevealAnimations();
  initBrokenImageFallback();
});

/* =========================
   Sticky tabs smooth scroll
========================= */
function initServiceTabs() {
  const tabs = document.querySelectorAll('.svc-tab');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const targetId = tab.dataset.target;
      const target = document.getElementById(targetId);

      if (!target) return;

      tabs.forEach((item) => item.classList.remove('active'));
      tab.classList.add('active');

      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  });
}

/* =========================
   Modal open/close
========================= */
function initServiceModal() {
  const overlay = document.getElementById('serviceModalOverlay');
  const closeBtn = document.getElementById('svcModalClose');
  const form = document.getElementById('serviceInquiryForm');

  if (!overlay || !form) return;

  document.querySelectorAll('.svc-inquiry-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const service = btn.dataset.service || 'General Service Inquiry';
      openServiceModal(service);
    });
  });

  closeBtn?.addEventListener('click', closeServiceModal);

  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) closeServiceModal();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeServiceModal();
  });

  form.addEventListener('submit', handleServiceSubmit);
}

function openServiceModal(serviceName) {
  const overlay = document.getElementById('serviceModalOverlay');
  const serviceInput = document.getElementById('svcService');
  const title = document.getElementById('svcModalTitle');
  const whatsappBtn = document.getElementById('svcModalWhatsApp');
  const status = document.getElementById('svcStatus');

  if (!overlay) return;

  if (serviceInput) serviceInput.value = serviceName;
  if (title) title.textContent = `${serviceName} Inquiry`;

  if (status) {
    status.className = 'svc-status';
    status.innerHTML = '';
  }

  if (whatsappBtn) {
    const msg = encodeURIComponent(
      `Hello Trip Fly BD! I need help with ${serviceName}.`
    );

    whatsappBtn.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
  }

  overlay.classList.add('show');
  document.body.style.overflow = 'hidden';

  setTimeout(() => {
    document.getElementById('svcName')?.focus();
  }, 250);
}

function closeServiceModal() {
  const overlay = document.getElementById('serviceModalOverlay');

  if (!overlay) return;

  overlay.classList.remove('show');
  document.body.style.overflow = '';
}

/* =========================
   Submit to Google Sheet
========================= */
async function handleServiceSubmit(event) {
  event.preventDefault();

  const honeypot = document.getElementById('svcHoneypot');
  if (honeypot && honeypot.value) return;

  const submitBtn = document.getElementById('svcSubmitBtn');
  const status = document.getElementById('svcStatus');

  const name = document.getElementById('svcName')?.value.trim();
  const phone = document.getElementById('svcPhone')?.value.trim();
  const email = document.getElementById('svcEmail')?.value.trim();
  const service = document.getElementById('svcService')?.value.trim();
  const destination = document.getElementById('svcDestination')?.value.trim();
  const travelDate = document.getElementById('svcTravelDate')?.value;
  const message = document.getElementById('svcMessage')?.value.trim();

  if (!name || !phone) {
    showServiceStatus(
      'error',
      '<i class="fas fa-exclamation-circle"></i> Please enter your name and phone number.'
    );
    return;
  }

  setSubmitLoading(true);

  const payload = {
    sheet: 'Service Inquiries',
    timestamp: new Date().toLocaleString('en-BD', {
      timeZone: 'Asia/Dhaka'
    }),
    name,
    phone,
    email,
    service,
    destination,
    travelDate,
    message,
    source: 'Services Page — Trip Fly BD Website'
  };

  try {
    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain'
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (result.status === 'success') {
      showServiceStatus(
        'success',
        '<i class="fas fa-check-circle"></i> Inquiry sent successfully! Our team will contact you shortly.'
      );

      const form = document.getElementById('serviceInquiryForm');
      form?.reset();

      if (document.getElementById('svcService')) {
        document.getElementById('svcService').value = service;
      }

      setTimeout(() => {
        const msg = encodeURIComponent(
          `Hello Trip Fly BD! I submitted a service inquiry.\nName: ${name}\nPhone: ${phone}\nService: ${service || 'General Inquiry'}\nDestination/Route: ${destination || 'Not mentioned'}`
        );

        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
      }, 900);
    } else {
      throw new Error(result.message || 'Submission failed');
    }
  } catch (error) {
    console.error('Service inquiry error:', error);

    showServiceStatus(
      'error',
      '<i class="fas fa-times-circle"></i> Something went wrong. Please contact us on WhatsApp.'
    );

    setTimeout(() => {
      const msg = encodeURIComponent(
        `Hello Trip Fly BD! I need help with ${service || 'a service'}.\nName: ${name}\nPhone: ${phone}`
      );

      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
    }, 1000);
  } finally {
    setSubmitLoading(false);
  }

  function setSubmitLoading(isLoading) {
    if (!submitBtn) return;

    submitBtn.disabled = isLoading;

    if (isLoading) {
      submitBtn.innerHTML =
        '<span class="svc-spinner"></span> Sending...';
    } else {
      submitBtn.innerHTML =
        '<i class="fas fa-paper-plane"></i> Submit Inquiry';
    }
  }

  function showServiceStatus(type, html) {
    if (!status) return;

    status.className = `svc-status show ${type}`;
    status.innerHTML = html;
  }
}

/* =========================
   Status helper
========================= */
function showServiceStatus(type, html) {
  const status = document.getElementById('svcStatus');

  if (!status) return;

  status.className = `svc-status show ${type}`;
  status.innerHTML = html;
}

/* =========================
   Reveal animation fallback
========================= */
function initRevealAnimations() {
  const revealItems = document.querySelectorAll(
    '.reveal-up, .reveal-left, .reveal-right'
  );

  if (!revealItems.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active-reveal');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15
    }
  );

  revealItems.forEach((item) => observer.observe(item));
}

/* =========================
   Broken image fallback
========================= */
function initBrokenImageFallback() {
  const fallback =
    'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=900&q=80&fit=crop';

  document.querySelectorAll('.svc-card-img img').forEach((img) => {
    img.addEventListener('error', () => {
      img.src = fallback;
      img.alt = 'Trip Fly BD Service';
    });
  });
}