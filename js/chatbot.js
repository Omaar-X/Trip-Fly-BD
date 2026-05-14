/* ============================================================
   TRIP FLY BD — CHATBOT.JS
   Premium Smart Travel Assistant | Frontend-only
   index.html only | Pure HTML/CSS/JS | No frameworks
============================================================ */
(function () {
  'use strict';

  /* ══════════════════════════════════════
     CONFIG — update WhatsApp number here
  ══════════════════════════════════════ */
  const WA_NUMBER = '8801630840405'; // ← Update with real number
  const WA_URL    = `https://wa.me/${WA_NUMBER}?text=`;
  const CONTACT   = 'contact.html';

  /* ══════════════════════════════════════
     RESPONSE DATA
  ══════════════════════════════════════ */
  const RESPONSES = {
    'tourist-visa': {
      label: '🛂 Tourist Visa',
      icon:  'fas fa-passport',
      text: `We process <strong>Tourist Visas</strong> for the most popular destinations:`,
      list: [
        'Thailand 🇹🇭', 'Malaysia 🇲🇾', 'Singapore 🇸🇬',
        'Dubai / UAE 🇦🇪', 'India 🇮🇳', 'Sri Lanka 🇱🇰',
        'Maldives 🇲🇻', 'China 🇨🇳', 'Japan 🇯🇵', 'Turkey 🇹🇷',
      ],
      extra: `<br/><strong>Documents required:</strong> Valid passport (6+ months), passport-size photo, 3–6 months bank statement, NID/birth certificate, hotel booking & return air ticket.<br/><br/>We prepare your full application and submit to the embassy. <strong>99% approval rate.</strong>`,
    },
    'air-ticketing': {
      label: '✈ Air Ticketing',
      icon:  'fas fa-plane-departure',
      text:  `We book <strong>International Air Tickets</strong> at the most competitive prices:`,
      list:  [
        'All major international airlines', 'Economy, Business & First Class',
        'Group booking discounts', 'Best-price guarantee',
        'E-ticket delivered instantly',
      ],
      extra: `<br/>WhatsApp us your travel dates and destination — we\'ll find you the best available fare immediately.`,
    },
    'domestic-ticketing': {
      label: '🏴 Domestic Ticketing',
      icon:  'fas fa-flag',
      text:  `We book <strong>Domestic Air Tickets</strong> for all Bangladesh routes:`,
      list:  [
        'Dhaka ↔ Cox\'s Bazar', 'Dhaka ↔ Sylhet',
        'Dhaka ↔ Chittagong', 'Dhaka ↔ Rajshahi',
        'Dhaka ↔ Saidpur', 'Dhaka ↔ Barishal',
        'Dhaka ↔ Jashore', '+ All other domestic routes',
      ],
      extra: `<br/>Fast booking, competitive fares, e-ticket on WhatsApp. <strong>All BD airlines supported.</strong>`,
    },
    'date-change': {
      label: '📅 Ticket Date Change',
      icon:  'fas fa-calendar-alt',
      text:  `Need to <strong>reschedule your flight?</strong> We handle it for you:`,
      list:  [
        'International & domestic flights', 'All major airlines',
        'Fast processing via WhatsApp', 'Fare difference calculation',
        '24/7 urgent support',
      ],
      extra: `<br/>Just send us your ticket details on WhatsApp and we\'ll coordinate with the airline immediately.`,
    },
    'student-visa': {
      label: '🎓 Student Visa',
      icon:  'fas fa-graduation-cap',
      text:  `We assist with <strong>Student Visa</strong> applications for studying abroad:`,
      list:  [
        'Admission letter assistance', 'Financial document preparation',
        'Interview preparation support', 'Malaysia, China, India, Turkey & more',
        'University enrollment guidance',
      ],
      extra: `<br/>Our consultants guide you through every step — from document checklist to visa approval.`,
    },
    'medical-visa': {
      label: '🏥 Medical Visa',
      icon:  'fas fa-hospital',
      text:  `Compassionate <strong>Medical Visa</strong> support for treatment abroad:`,
      list:  [
        'Hospital referral letter assistance', 'Appointment scheduling support',
        'Attendant visa included', 'Urgent processing available',
        'India, Thailand, Malaysia, Singapore',
      ],
      extra: `<br/>We understand the urgency. Contact us immediately for fast, caring medical visa assistance.`,
    },
    'group-visa': {
      label: '👥 Group Visa',
      icon:  'fas fa-users',
      text:  `Special <strong>Group Visa</strong> packages for 5+ travellers:`,
      list:  [
        'Family tours & group holidays', 'Corporate travel packages',
        'Group discounts on visa & tickets', 'Single-point coordination',
        'Hotel & transport arrangements',
      ],
      extra: `<br/>We manage everything — from document collection to visa approval — for the whole group.`,
    },
    'couple-package': {
      label: '💑 Couple Package',
      icon:  'fas fa-heart',
      text:  `Premium <strong>Couple & Honeymoon Packages</strong> for romantic escapes:`,
      list:  [
        'Maldives water villas 🇲🇻', 'Thailand — Phuket & Krabi 🇹🇭',
        'Dubai luxury experiences 🇦🇪', 'Bali, Indonesia 🇮🇩',
        'Candlelight dinners & spa', 'Visa + flights + hotel included',
      ],
      extra: `<br/>We create unforgettable honeymoon and anniversary experiences, handled completely for you.`,
    },
    'hotel-booking': {
      label: '🏨 Hotel Booking',
      icon:  'fas fa-hotel',
      text:  `We book <strong>Hotels worldwide</strong> for every budget:`,
      list:  [
        'Budget guesthouses to 5-star resorts', '30+ countries covered',
        'Best available rates', 'Instant confirmation',
        'Couple, family & group rooms',
      ],
      extra: `<br/>Tell us your destination, dates and budget — we\'ll find the perfect hotel for you.`,
    },
    'tour-package': {
      label: '🗺 Tour Package',
      icon:  'fas fa-map-marked-alt',
      text:  `<strong>All-inclusive Tour Packages</strong> — everything handled:`,
      list:  [
        'Return flights booked', 'Visa processing included',
        'Hotel accommodation', 'Airport transfers',
        'Guided tours & activities', '24/7 in-trip WhatsApp support',
      ],
      extra: `<br/>Individual, couple and group packages available. <strong>Just pack your bags — we handle the rest.</strong>`,
    },
    'contact-agent': {
      label: '📞 Contact Agent',
      icon:  'fas fa-headset',
      text:  `Connect directly with our <strong>expert travel consultants</strong>:`,
      list:  [
        'Available Sat–Thu, 9AM–9PM', 'WhatsApp support 24/7',
        'Fast response guaranteed', 'Free consultation',
      ],
      extra: `<br/>Our team is ready to answer all your questions about visa, tickets, hotels and packages — right now.`,
    },
  };

  /* ══════════════════════════════════════
     QUICK REPLY BUTTONS CONFIG
  ══════════════════════════════════════ */
  const QUICK_BUTTONS = [
    { key: 'tourist-visa',       label: '🛂 Tourist Visa'        },
    { key: 'air-ticketing',      label: '✈ Air Ticketing'        },
    { key: 'domestic-ticketing', label: '🏴 Domestic Flights'    },
    { key: 'date-change',        label: '📅 Date Change'         },
    { key: 'student-visa',       label: '🎓 Student Visa'        },
    { key: 'medical-visa',       label: '🏥 Medical Visa'        },
    { key: 'group-visa',         label: '👥 Group Visa'          },
    { key: 'couple-package',     label: '💑 Couple Package'      },
    { key: 'hotel-booking',      label: '🏨 Hotel Booking'       },
    { key: 'tour-package',       label: '🗺 Tour Package'        },
    { key: 'contact-agent',      label: '📞 Contact Agent'       },
  ];

  /* ══════════════════════════════════════
     BUILD DOM
  ══════════════════════════════════════ */
  function buildChatbot() {
    // Backdrop
    const backdrop = document.createElement('div');
    backdrop.id = 'chatbotBackdrop';

    // Window
    const win = document.createElement('div');
    win.id = 'chatbotWindow';
    win.setAttribute('role', 'dialog');
    win.setAttribute('aria-label', 'Trip Fly Assistant');

    // Header
    win.innerHTML = `
      <div class="cb-header">
        <div class="cb-avatar"><i class="fas fa-robot"></i></div>
        <div class="cb-header-text">
          <div class="cb-name">Trip Fly Assistant</div>
          <div class="cb-status">
            <span class="cb-status-dot"></span> Online &nbsp;&bull;&nbsp; Trip Fly BD
          </div>
        </div>
        <button class="cb-header-close" id="cbHeaderClose" aria-label="Close chatbot">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="cb-messages" id="cbMessages" role="log" aria-live="polite" aria-label="Chat messages"></div>
      <div class="cb-quick-wrap" id="cbQuickWrap" aria-label="Quick reply options"></div>
      <div class="cb-input-row">
        <input class="cb-input" id="cbInput" type="text" placeholder="Type your question..." autocomplete="off" maxlength="200"/>
        <button class="cb-send-btn" id="cbSendBtn" aria-label="Send message"><i class="fas fa-paper-plane"></i></button>
      </div>`;

    // Launcher
    const launcher = document.createElement('button');
    launcher.id = 'chatbotLauncher';
    launcher.setAttribute('aria-label', 'Open Trip Fly Assistant');
    launcher.setAttribute('aria-expanded', 'false');
    launcher.innerHTML = `
      <i class="fas fa-robot cb-icon-open"></i>
      <i class="fas fa-times cb-icon-close"></i>
      <span id="chatbotDot" aria-label="New message"></span>
      <span class="cb-tooltip">Trip Fly Assistant</span>`;

    document.body.appendChild(backdrop);
    document.body.appendChild(win);
    document.body.appendChild(launcher);
  }

  /* ══════════════════════════════════════
     BUILD QUICK BUTTONS
  ══════════════════════════════════════ */
  function buildQuickButtons() {
    const wrap = document.getElementById('cbQuickWrap');
    if (!wrap) return;
    wrap.innerHTML = '';
    QUICK_BUTTONS.forEach(btn => {
      const el = document.createElement('button');
      el.className = 'cb-quick-btn';
      el.textContent = btn.label;
      el.dataset.key = btn.key;
      el.setAttribute('aria-label', btn.label);
      wrap.appendChild(el);
    });
  }

  /* ══════════════════════════════════════
     CTA BUTTONS HTML
  ══════════════════════════════════════ */
  function ctaHTML(waText) {
    const encodedText = encodeURIComponent(waText);
    return `<div class="cb-cta-row">
      <a href="${WA_URL}${encodedText}" target="_blank" rel="noopener" class="cb-cta-btn wa">
        <i class="fab fa-whatsapp"></i> WhatsApp Us
      </a>
      <a href="${CONTACT}" class="cb-cta-btn contact">
        <i class="fas fa-envelope"></i> Contact Page
      </a>
    </div>`;
  }

  /* ══════════════════════════════════════
     GET TIME STRING
  ══════════════════════════════════════ */
  function getTime() {
    return new Date().toLocaleTimeString('en-BD', { hour: '2-digit', minute: '2-digit', hour12: true });
  }

  /* ══════════════════════════════════════
     ADD BOT MESSAGE
  ══════════════════════════════════════ */
  function addBotMsg(htmlContent) {
    const msgs = document.getElementById('cbMessages');
    if (!msgs) return;

    const wrap = document.createElement('div');
    wrap.className = 'cb-msg bot';
    wrap.innerHTML = `
      <div class="cb-bubble">${htmlContent}</div>
      <span class="cb-time">${getTime()}</span>`;
    msgs.appendChild(wrap);
    scrollMessages();
  }

  /* ══════════════════════════════════════
     ADD USER MESSAGE
  ══════════════════════════════════════ */
  function addUserMsg(text) {
    const msgs = document.getElementById('cbMessages');
    if (!msgs) return;

    const wrap = document.createElement('div');
    wrap.className = 'cb-msg user';
    wrap.innerHTML = `
      <div class="cb-bubble">${escapeHtml(text)}</div>
      <span class="cb-time">${getTime()}</span>`;
    msgs.appendChild(wrap);
    scrollMessages();
  }

  /* ══════════════════════════════════════
     TYPING INDICATOR
  ══════════════════════════════════════ */
  function showTyping() {
    const msgs = document.getElementById('cbMessages');
    if (!msgs) return;
    const el = document.createElement('div');
    el.id = 'cbTyping';
    el.className = 'cb-typing-wrap';
    el.innerHTML = `<div class="cb-typing-bubble">
      <span class="cb-dot"></span>
      <span class="cb-dot"></span>
      <span class="cb-dot"></span>
    </div>`;
    msgs.appendChild(el);
    scrollMessages();
  }

  function hideTyping() {
    document.getElementById('cbTyping')?.remove();
  }

  /* ══════════════════════════════════════
     SCROLL TO BOTTOM
  ══════════════════════════════════════ */
  function scrollMessages() {
    const msgs = document.getElementById('cbMessages');
    if (msgs) msgs.scrollTop = msgs.scrollHeight;
  }

  /* ══════════════════════════════════════
     BUILD RESPONSE HTML
  ══════════════════════════════════════ */
  function buildResponse(key) {
    const r = RESPONSES[key];
    if (!r) return null;

    const listHTML = r.list.map(item => `<li>${item}</li>`).join('');
    const waMsg = `Hello Trip Fly BD! I need information about ${r.label.replace(/[^\w\s]/gi, '').trim()}.`;

    return `${r.text}
<ul class="cb-list">${listHTML}</ul>
${r.extra || ''}
${ctaHTML(waMsg)}`;
  }

  /* ══════════════════════════════════════
     PROCESS QUICK REPLY / INPUT
  ══════════════════════════════════════ */
  function processInput(rawText) {
    const text  = rawText.trim();
    const lower = text.toLowerCase();
    if (!text) return;

    addUserMsg(text);

    // Match to a key
    let matchedKey = null;
    const KEYWORDS = {
      'tourist-visa':       ['tourist visa','tourist','visa','thailand','malaysia','singapore','dubai','india','maldives'],
      'air-ticketing':      ['air ticket','international ticket','international flight','flight','airline','ticket'],
      'domestic-ticketing': ['domestic','cox','sylhet','chittagong','rajshahi','saidpur','barishal','jashore','bd flight'],
      'date-change':        ['date change','reschedule','change date','change ticket','change flight'],
      'student-visa':       ['student visa','student','study abroad','study'],
      'medical-visa':       ['medical visa','medical','hospital','treatment'],
      'group-visa':         ['group visa','group','family tour','corporate'],
      'couple-package':     ['couple','honeymoon','anniversary','romantic'],
      'hotel-booking':      ['hotel','accommodation','stay'],
      'tour-package':       ['tour','package','all inclusive','holiday'],
      'contact-agent':      ['contact','agent','call','phone','speak','human','help'],
    };

    for (const [key, keywords] of Object.entries(KEYWORDS)) {
      if (keywords.some(kw => lower.includes(kw))) {
        matchedKey = key;
        break;
      }
    }

    showTyping();
    const delay = 900 + Math.random() * 400;

    setTimeout(() => {
      hideTyping();
      if (matchedKey) {
        addBotMsg(buildResponse(matchedKey));
      } else {
        // Fallback
        const waMsg = encodeURIComponent(`Hello Trip Fly BD! I have a question: ${text}`);
        addBotMsg(`I\'d be happy to help with that! 😊<br/><br/>
For the best assistance, please contact our expert team directly:<br/>
${ctaHTML(`Hello Trip Fly BD! I have a question: ${text}`)}`);
      }
      scrollMessages();
    }, delay);
  }

  /* ══════════════════════════════════════
     OPEN / CLOSE
  ══════════════════════════════════════ */
  let isOpen = false;
  let welcomed = false;

  function openChat() {
    const win      = document.getElementById('chatbotWindow');
    const launcher = document.getElementById('chatbotLauncher');
    const backdrop = document.getElementById('chatbotBackdrop');
    const dot      = document.getElementById('chatbotDot');

    isOpen = true;
    win?.classList.add('open');
    launcher?.classList.add('open');
    backdrop?.classList.add('show');
    launcher?.setAttribute('aria-expanded', 'true');
    if (dot) dot.classList.add('hidden');

    // Welcome message (first time only)
    if (!welcomed) {
      welcomed = true;
      buildQuickButtons();
      showTyping();
      setTimeout(() => {
        hideTyping();
        addBotMsg(`Hello 👋 <strong>Welcome to Trip Fly BD!</strong><br/><br/>
I&rsquo;m your personal <strong>Trip Fly Assistant</strong>. I can help you with:<br/>
✈ Visa processing &nbsp;&bull;&nbsp; Air ticketing &nbsp;&bull;&nbsp; Tour packages<br/>
🏨 Hotel booking &nbsp;&bull;&nbsp; Couple packages &nbsp;&bull;&nbsp; And more!<br/><br/>
<strong>Choose a topic below or type your question.</strong>`);
      }, 900);
    }

    // Focus input
    setTimeout(() => { document.getElementById('cbInput')?.focus(); }, 450);
  }

  function closeChat() {
    const win      = document.getElementById('chatbotWindow');
    const launcher = document.getElementById('chatbotLauncher');
    const backdrop = document.getElementById('chatbotBackdrop');

    isOpen = false;
    win?.classList.remove('open');
    launcher?.classList.remove('open');
    backdrop?.classList.remove('show');
    launcher?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  /* ══════════════════════════════════════
     UTILITY
  ══════════════════════════════════════ */
  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* ══════════════════════════════════════
     INIT & EVENT LISTENERS
  ══════════════════════════════════════ */
  function init() {
    buildChatbot();

    const launcher = document.getElementById('chatbotLauncher');
    const closeBtn = document.getElementById('cbHeaderClose');
    const backdrop = document.getElementById('chatbotBackdrop');
    const sendBtn  = document.getElementById('cbSendBtn');
    const input    = document.getElementById('cbInput');
    const quickWrap = document.getElementById('cbQuickWrap');

    // Launcher toggle
    launcher?.addEventListener('click', () => { isOpen ? closeChat() : openChat(); });

    // Header close
    closeBtn?.addEventListener('click', closeChat);

    // Backdrop close
    backdrop?.addEventListener('click', closeChat);

    // Send button
    sendBtn?.addEventListener('click', () => {
      const val = input?.value.trim();
      if (val) { processInput(val); if (input) input.value = ''; }
    });

    // Enter key
    input?.addEventListener('keydown', e => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        const val = input.value.trim();
        if (val) { processInput(val); input.value = ''; }
      }
    });

    // Quick reply buttons (delegated)
    quickWrap?.addEventListener('click', e => {
      const btn = e.target.closest('.cb-quick-btn');
      if (!btn) return;
      const key = btn.dataset.key;
      const label = btn.textContent.trim();
      addUserMsg(label);
      showTyping();
      const delay = 900 + Math.random() * 400;
      setTimeout(() => {
        hideTyping();
        const html = buildResponse(key);
        if (html) addBotMsg(html);
        scrollMessages();
      }, delay);
    });

    // Keyboard close
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && isOpen) closeChat();
    });

    // Show dot after 3s (draw attention)
    setTimeout(() => {
      const dot = document.getElementById('chatbotDot');
      if (dot && !isOpen) dot.classList.remove('hidden');
    }, 3000);
  }

  /* Wait for DOM */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();