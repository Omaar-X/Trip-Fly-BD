/* ============================================================
   TRIP FLY BD â€” CONTACT.JS
   Google Sheets lead collection | Contact form handler
============================================================ */
'use strict';

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// GOOGLE APPS SCRIPT WEB APP URL
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxNNt8_3RtKAAHf2X4QjCrlfgSqPJCX1UmDNmT_u0ltneXI4sRhirNRzq9j2k4l4gwinQ/exec';

/* â”€â”€ CONTACT FORM SUBMISSION â”€â”€ */
(function initContactForm() {

  const form      = document.getElementById('contactForm');
  const submitBtn = document.getElementById('cfSubmit');
  const status    = document.getElementById('cfStatus');

  if (!form || !submitBtn) return;

  // Honeypot spam prevention
  const honeypot = document.getElementById('cfHoneypot');

  form.addEventListener('submit', async (e) => {

    e.preventDefault();

    // Honeypot spam check
    if (honeypot && honeypot.value) return;

    // Form Values
    const name        = document.getElementById('cfName')?.value.trim();
    const email       = document.getElementById('cfEmail')?.value.trim();
    const phone       = document.getElementById('cfPhone')?.value.trim();
    const destination = document.getElementById('cfDest')?.value;
    const service     = document.getElementById('cfService')?.value;
    const message     = document.getElementById('cfMsg')?.value.trim();

    // Validation
    if (!name || !phone) {

      showStatus(
        'error',
        '<i class="fas fa-exclamation-circle"></i> Please fill in your Name and Phone number.'
      );

      return;
    }

    setLoading(true);
    clearStatus();

    // Payload
    const payload = {

      sheet: 'Contact Leads',

      timestamp: new Date().toLocaleString('en-BD', {
        timeZone: 'Asia/Dhaka'
      }),

      name,
      email,
      phone,
      destination,
      service,
      message,

      source: 'Trip Fly BD Website Contact Form'
    };

    try {

      const response = await fetch(APPS_SCRIPT_URL, {

        method: 'POST',

        headers: {
          'Content-Type': 'text/plain'
        },

        body: JSON.stringify(payload)
      });

      const data = await response.json();

      // Success
      if (data.status === 'success') {

        showStatus(
          'success',
          '<i class="fas fa-check-circle"></i> Your message was sent successfully! We will contact you shortly via WhatsApp.'
        );

        form.reset();

        // WhatsApp follow-up button
        setTimeout(() => {

          const whatsappMessage = encodeURIComponent(
`Hello Trip Fly BD!
I just submitted a contact form.

Name: ${name}
Phone: ${phone}
Service: ${service || 'General Enquiry'}
Destination: ${destination || 'Not Selected'}`
          );

          const waEl = document.getElementById('cfWAFollowup');

          if (waEl) {

            waEl.href =
              `https://wa.me/8801898801939?text=${whatsappMessage}`;

            waEl.style.display = 'inline-flex';
          }

        }, 1000);

      } else {

        throw new Error(data.message || 'Unknown error occurred');
      }

    } catch (error) {

      console.error('Form Submit Error:', error);

      showStatus(
        'error',
        '<i class="fas fa-times-circle"></i> Something went wrong. Please contact us directly via WhatsApp.'
      );

    } finally {

      setLoading(false);
    }

  });

  /* â”€â”€ BUTTON LOADING STATE â”€â”€ */
  function setLoading(isLoading) {

    submitBtn.disabled = isLoading;

    submitBtn.classList.toggle('loading', isLoading);

    if (isLoading) {

      submitBtn.innerHTML =
        '<i class="fas fa-spinner fa-spin"></i> Sending...';

    } else {

      submitBtn.innerHTML =
        '<i class="fas fa-paper-plane"></i> Send Message';
    }
  }

  /* â”€â”€ STATUS MESSAGE â”€â”€ */
  function showStatus(type, html) {

    status.className = `cf-status show ${type}`;

    status.innerHTML = html;
  }

  /* â”€â”€ CLEAR STATUS â”€â”€ */
  function clearStatus() {

    status.className = 'cf-status';

    status.innerHTML = '';
  }

})();

/* â”€â”€ INPUT ICON ANIMATION â”€â”€ */
document.querySelectorAll(
  '.cf-input, .cf-select, .cf-textarea'
).forEach((element) => {

  const icon =
    element.parentElement?.querySelector('.cf-input-icon');

  if (!icon) return;

  element.addEventListener('focus', () => {

    icon.style.color = 'var(--gold-lt)';
  });

  element.addEventListener('blur', () => {

    icon.style.color = 'var(--gold)';
  });

});
