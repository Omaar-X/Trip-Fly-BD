/* ============================================================
   TRIP FLY BD — CHATBOT.JS  (v2 — Advanced Smart Edition)
   Premium Travel Assistant | Bangla + Banglish + English
   Frontend-only | Pure HTML/CSS/JS | No frameworks
============================================================ */
(function () {
  'use strict';

  /* ══════════════════════════════════════
     CONFIG
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
      text: `আমরা নিচের দেশগুলোতে <strong>Tourist Visa</strong> প্রসেস করি:`,
      list: [
        'Thailand 🇹🇭', 'Malaysia 🇲🇾', 'Singapore 🇸🇬',
        'Dubai / UAE 🇦🇪', 'India 🇮🇳', 'Sri Lanka 🇱🇰',
        'Maldives 🇲🇻', 'China 🇨🇳', 'Japan 🇯🇵', 'Turkey 🇹🇷',
        'Indonesia 🇮🇩', 'Vietnam 🇻🇳', 'Nepal 🇳🇵',
      ],
      extra: `<br/><strong>Documents Required:</strong><ul class="cb-list">
        <li>Valid Passport (6+ months validity)</li>
        <li>Passport-size Photo (white background)</li>
        <li>NID / Birth Certificate (copy)</li>
        <li>3–6 months Bank Statement</li>
        <li>Profession Proof (job card / trade license / student ID)</li>
        <li>Hotel Booking Confirmation</li>
        <li>Return Air Ticket Copy</li>
        <li>Travel History (if available)</li>
      </ul><br/>⏱ <strong>Processing Time:</strong> 3–15 working days depending on destination.<br/>
      💰 <strong>Fee:</strong> Varies by country — WhatsApp করুন exact cost জানতে।<br/><br/>
      আমাদের <strong>99% approval rate</strong> আছে! আজই আবেদন করুন। 🎯`,
    },

    'visa-requirements': {
      label: '📋 Visa Requirements',
      text: `<strong>সব দেশের Visa এর জন্য সাধারণ Documents:</strong>`,
      list: [
        '✅ Valid Passport (minimum 6 months validity)',
        '✅ Passport-size Photo (white background, 35×45mm)',
        '✅ NID / Birth Certificate (photocopy)',
        '✅ Bank Statement (3–6 months, minimum balance varies)',
        '✅ Profession Proof (job letter / business certificate / student ID)',
        '✅ Travel History (previous visas — if available)',
        '✅ Hotel Booking / Invitation Letter (country-specific)',
        '✅ Return Air Ticket Copy (some countries)',
      ],
      extra: `<br/>⚠️ <strong>Note:</strong> Country-specific requirements আলাদা হতে পারে। Exact checklist পেতে আমাদের WhatsApp করুন।`,
    },

    'visa-cost': {
      label: '💰 Visa Cost & Fees',
      text: `<strong>Popular Destinations — Approximate Visa Fees:</strong>`,
      list: [
        'Thailand 🇹🇭 — Tourist Visa: ~BDT 5,000–8,000',
        'Malaysia 🇲🇾 — eVisa / On Arrival: ~BDT 3,000–6,000',
        'Dubai / UAE 🇦🇪 — Tourist Visa: ~BDT 10,000–18,000',
        'India 🇮🇳 — e-Visa: ~BDT 3,500–6,000',
        'Singapore 🇸🇬 — Tourist Visa: ~BDT 7,000–12,000',
        'China 🇨🇳 — Tourist Visa: ~BDT 8,000–14,000',
        'Turkey 🇹🇷 — e-Visa: ~BDT 5,000–9,000',
      ],
      extra: `<br/>💡 উপরের fees approximate। Embassy fee + service charge সহ actual cost জানতে WhatsApp করুন।<br/>
      <strong>Urgent processing available</strong> at extra cost.`,
    },

    'processing-time': {
      label: '⏱ Processing Time',
      text: `<strong>Visa Processing Time by Destination:</strong>`,
      list: [
        'Thailand 🇹🇭 — 3–7 working days',
        'Malaysia 🇲🇾 — 2–5 working days',
        'Dubai / UAE 🇦🇪 — 3–7 working days',
        'India 🇮🇳 — 2–4 working days (e-Visa)',
        'Singapore 🇸🇬 — 5–10 working days',
        'China 🇨🇳 — 7–15 working days',
        'Turkey 🇹🇷 — 2–3 working days (e-Visa)',
        'Japan 🇯🇵 — 5–10 working days',
      ],
      extra: `<br/>🚀 <strong>Urgent / Express Processing</strong> available for most destinations!<br/>
      Urgent processing time: <strong>1–3 working days</strong> (extra fee applies).<br/>
      Emergency ticket বা urgent visa হলে এখনই WhatsApp করুন।`,
    },

    'air-ticketing': {
      label: '✈ Air Ticketing',
      text: `আমরা সেরা দামে <strong>International Air Tickets</strong> বুক করি:`,
      list: [
        'All major international airlines',
        'Economy, Business & First Class',
        'Best-price guarantee — সেরা দাম নিশ্চিত',
        'E-ticket instantly on WhatsApp',
        'Group booking discounts available',
        'Open-jaw & multi-city tickets',
      ],
      extra: `<br/>✈ <strong>Ticket Date Change / Reissue</strong> সার্ভিসও আমরা দিই।<br/>
      Travel dates ও destination WhatsApp করুন — সাথে সাথে best fare পাবেন।`,
    },

    'date-change': {
      label: '📅 Ticket Date Change',
      text: `<strong>Ticket Reschedule / Date Change</strong> সার্ভিস:`,
      list: [
        'International & domestic flights',
        'All major airlines supported',
        'Fast processing via WhatsApp',
        'Fare difference calculation done for you',
        '24/7 urgent support available',
        'Penalty & fee guidance provided',
      ],
      extra: `<br/>📨 Ticket copy ও new dates WhatsApp এ পাঠান — বাকি আমরা সামলাবো।`,
    },

    'student-visa': {
      label: '🎓 Student Visa',
      text: `আমরা <strong>Student Visa</strong> process করি এই দেশগুলোর জন্য:`,
      list: [
        'Malaysia 🇲🇾', 'China 🇨🇳', 'India 🇮🇳',
        'Turkey 🇹🇷', 'Thailand 🇹🇭', 'UK 🇬🇧 (consultation)',
      ],
      extra: `<br/><strong>Documents Required:</strong><ul class="cb-list">
        <li>University / College Admission Letter</li>
        <li>Valid Passport + Photo</li>
        <li>Academic Certificates (SSC, HSC, Degree)</li>
        <li>Bank Statement (family's / sponsor's)</li>
        <li>NID / Birth Certificate</li>
        <li>IELTS / Language Certificate (if required)</li>
      </ul><br/>আমাদের consultants প্রতিটা step এ guide করবে — document থেকে visa approval পর্যন্ত।`,
    },

    'medical-visa': {
      label: '🏥 Medical Visa',
      text: `<strong>Medical Visa</strong> — বিদেশে চিকিৎসার জন্য দ্রুত সহায়তা:`,
      list: [
        'India 🇮🇳 — CMC Vellore, Apollo, Fortis',
        'Thailand 🇹🇭 — Bumrungrad, Bangkok Hospital',
        'Malaysia 🇲🇾 — Gleneagles, KPJ',
        'Singapore 🇸🇬 — Mount Elizabeth, Raffles',
      ],
      extra: `<br/><strong>Documents Required:</strong><ul class="cb-list">
        <li>Hospital Referral / Appointment Letter</li>
        <li>Doctor's Prescription / Medical Report</li>
        <li>Valid Passport + Photo</li>
        <li>NID / Birth Certificate</li>
        <li>Bank Statement</li>
        <li>Attendant visa (for accompanying person)</li>
      </ul><br/>⚡ <strong>Urgent medical visa processing available.</strong> রোগীর জন্য আমরা সর্বোচ্চ দ্রুততায় কাজ করি।`,
    },

    'group-visa': {
      label: '👥 Group Visa / Package',
      text: `<strong>Group Tour</strong> এর জন্য বিশেষ ব্যবস্থা (5+ জন):`,
      list: [
        'Family tours & group holidays',
        'Corporate & office trips',
        'Group discounts on visa & tickets',
        'Single-point coordination — একজনই যোগাযোগ করুন',
        'Hotel & transport arrangements',
        'Guided tour & activities optional',
      ],
      extra: `<br/>Group size ও destination WhatsApp করুন — আমরা full package quote দেবো।`,
    },

    'couple-package': {
      label: '💑 Couple / Honeymoon Package',
      text: `<strong>Romantic Couple & Honeymoon Packages</strong> — স্বপ্নের গন্তব্য:`,
      list: [
        'Maldives — Water Villa & sunset cruise 🇲🇻',
        'Thailand — Phuket, Krabi, Koh Samui 🇹🇭',
        'Dubai — Luxury desert & city experience 🇦🇪',
        'Bali, Indonesia — Rice fields & temples 🇮🇩',
        'Sri Lanka — Tea hills & beaches 🇱🇰',
        'Visa + flights + hotel + transfers সব included',
        'Candlelight dinner & spa arrangements',
      ],
      extra: `<br/>💍 Anniversary, honeymoon বা যেকোনো special trip এর জন্য আমরা unforgettable experience তৈরি করি।`,
    },

    'urgent-visa': {
      label: '⚡ Urgent / Emergency Visa',
      text: `<strong>Urgent & Emergency Visa Processing</strong> — দ্রুত সেবা:`,
      list: [
        'Same-day / next-day processing (select countries)',
        'Emergency medical visa — priority handling',
        'Urgent business travel support',
        'Emergency air ticket booking',
        '24/7 WhatsApp support for emergencies',
      ],
      extra: `<br/>🔴 <strong>এখনই WhatsApp করুন</strong> — urgent cases এ আমরা সর্বোচ্চ অগ্রাধিকার দিই।<br/>
      Extra express fee প্রযোজ্য।`,
    },

    'passport': {
      label: '📘 Passport Requirements',
      text: `Visa আবেদনের জন্য <strong>Passport</strong> সংক্রান্ত তথ্য:`,
      list: [
        'Passport minimum 6 months valid থাকতে হবে',
        'কমপক্ষে 2টি blank pages থাকতে হবে',
        'পুরনো / expire passport থাকলে সেটাও সাথে রাখুন',
        'Passport নষ্ট বা হারালে নতুন করুন আগে',
        'Machine Readable Passport (MRP) বা e-Passport দুটোই চলে',
      ],
      extra: `<br/>⚠️ Passport নতুন হলে (6 months এর কম) কিছু দেশে ভিসা পেতে সমস্যা হতে পারে।<br/>
      Passport নিয়ে কোনো প্রশ্ন থাকলে WhatsApp করুন।`,
    },

    'bank-statement': {
      label: '🏦 Bank Statement',
      text: `Visa আবেদনে <strong>Bank Statement</strong> কেন ও কতটুকু লাগে:`,
      list: [
        '3–6 months এর bank statement লাগে',
        'Minimum balance: ভ্রমণ অনুযায়ী ভিন্ন (সাধারণত BDT 50,000–2,00,000)',
        'Statement এ নিয়মিত transaction থাকলে ভালো',
        'Salary certificate / income proof সহ দিলে আরো ভালো',
        'Bank থেকে signed & sealed statement আনতে হবে',
        'Savings ও Current account দুটোই গ্রহণযোগ্য',
      ],
      extra: `<br/>💡 Bank balance কম হলে চিন্তা নেই — আমাদের সাথে কথা বলুন, সমাধান আছে।`,
    },

    'refund': {
      label: '↩ Refund / Cancellation',
      text: `<strong>Refund ও Cancellation Policy:</strong>`,
      list: [
        'Visa refund: Embassy fee non-refundable (visa reject হলেও)',
        'Service charge partially/fully refundable — case by case',
        'Air ticket refund: Airline policy অনুযায়ী',
        'Tour package: Cancellation charges প্রযোজ্য',
        'Hotel booking: Hotel policy অনুযায়ী',
      ],
      extra: `<br/>📞 Refund বা cancellation request এর জন্য আমাদের সাথে WhatsApp এ যোগাযোগ করুন।<br/>
      আমরা সবসময় customer-friendly সমাধান দেওয়ার চেষ্টা করি।`,
    },

    'payment': {
      label: '💳 Payment Methods',
      text: `আমরা নিচের <strong>Payment Methods</strong> গ্রহণ করি:`,
      list: [
        '💵 Cash (office visit)',
        '📱 bKash / Nagad / Rocket',
        '🏦 Bank Transfer (DBBL, Dutch-Bangla, BRAC, Islami Bank)',
        '💳 Debit / Credit Card (select cases)',
      ],
      extra: `<br/>Payment method নিয়ে বিস্তারিত জানতে WhatsApp করুন।`,
    },

    'office-location': {
      label: '📍 Office Location',
      text: `<strong>Trip Fly BD — Office Address:</strong>`,
      list: [
        '📍 Dhaka, Bangladesh',
        '🕐 Sat–Thu: 9:00 AM – 9:00 PM',
        '🕐 Friday: 12:00 PM – 8:00 PM',
        '📞 WhatsApp: +880 163-0840405',
        '🌐 www.tripflybd.com',
      ],
      extra: `<br/>📌 Exact address ও direction এর জন্য WhatsApp করুন — আমরা Google Maps link পাঠিয়ে দেবো।`,
    },

    'whatsapp': {
      label: '💬 WhatsApp Support',
      text: `<strong>WhatsApp এ সরাসরি কথা বলুন আমাদের expert team এর সাথে:</strong>`,
      list: [
        '📞 +880 163-0840405',
        '⏰ 24/7 WhatsApp support',
        '🕐 Office hours: Sat–Thu 9AM–9PM',
        '⚡ Emergency support available anytime',
        '🆓 Free consultation — কোনো charge নেই',
      ],
      extra: `<br/>নিচের button এ click করে এখনই WhatsApp করুন 👇`,
    },

    'appointment': {
      label: '📅 Book Appointment',
      text: `<strong>Appointment Book করুন</strong> — ব্যক্তিগত পরামর্শের জন্য:`,
      list: [
        'Office visit appointment',
        'Video call consultation available',
        'Free 15-minute consultation',
        'Document review session',
        'Visa strategy planning session',
      ],
      extra: `<br/>Appointment নিতে WhatsApp করুন — আমরা আপনার সুবিধামতো সময় নির্ধারণ করবো।`,
    },

    'contact-agent': {
      label: '📞 Contact Agent',
      text: `<strong>Expert Travel Consultant</strong> এর সাথে কথা বলুন:`,
      list: [
        'Sat–Thu, 9AM–9PM',
        '24/7 WhatsApp support',
        'Fast response guaranteed',
        'Free consultation',
        'Bangla ও English দুটোতেই কথা বলতে পারবেন',
      ],
      extra: `<br/>আমাদের team সবসময় আপনাকে সাহায্য করতে প্রস্তুত।`,
    },

  };

  /* ══════════════════════════════════════
     QUICK REPLY BUTTONS CONFIG
  ══════════════════════════════════════ */
  const QUICK_BUTTONS = [
    { key: 'tourist-visa',      label: '🛂 Tourist Visa'        },
    { key: 'air-ticketing',     label: '✈ Air Ticket'           },
    { key: 'visa-requirements', label: '📋 Visa Requirements'   },
    { key: 'processing-time',   label: '⏱ Processing Time'      },
    { key: 'visa-cost',         label: '💰 Visa Cost'           },
    { key: 'student-visa',      label: '🎓 Student Visa'        },
    { key: 'medical-visa',      label: '🏥 Medical Visa'        },
    { key: 'group-visa',        label: '👥 Group Package'       },
    { key: 'couple-package',    label: '💑 Couple Package'      },
    { key: 'urgent-visa',       label: '⚡ Urgent Visa'         },
    { key: 'bank-statement',    label: '🏦 Bank Statement'      },
    { key: 'payment',           label: '💳 Payment Methods'     },
    { key: 'refund',            label: '↩ Refund Policy'        },
    { key: 'office-location',   label: '📍 Office Location'     },
    { key: 'whatsapp',          label: '💬 WhatsApp Support'    },
  ];

  /* ══════════════════════════════════════
     SMART KEYWORD MAP (Bangla + Banglish + English)
  ══════════════════════════════════════ */
  const KEYWORD_MAP = [
    {
      key: 'visa-requirements',
      words: [
        'ki lage','ki ki lage','requirements','documents required','ki document',
        'ki kagoj','kagoj','কি লাগে','কি কি লাগে','ডকুমেন্ট',
        'document','docs','papers','requirements','what do i need',
      ],
    },
    {
      key: 'visa-cost',
      words: [
        'fee','fees','charge','cost','price','taka','koto taka','koto tk','koto',
        'cost koto','fee koto','visa fee','visa cost','visa price',
        'কত টাকা','কত','fee কত','দাম','charge কত',
      ],
    },
    {
      key: 'processing-time',
      words: [
        'time','din','koto din','processing time','how long','how many days',
        'koto somoy','somoy','duration','ketodine','কত দিন','কতদিন',
        'processing','লাগে','সময়','দিন',
      ],
    },
    {
      key: 'urgent-visa',
      words: [
        'urgent','emergency','asap','express','jodi urgent','urgent visa',
        'urgent hobe','urgent possible','same day','next day',
        'জরুরি','আর্জেন্ট','urgent ki hobe','ইমার্জেন্সি',
      ],
    },
    {
      key: 'tourist-visa',
      words: [
        'tourist visa','tourist','visa','visha','bisha','visaa',
        'thailand visa','malaysia visa','dubai visa','india visa',
        'singapore visa','maldives visa','china visa','japan visa',
        'turkey visa','sri lanka visa','vietnam visa','nepal visa',
        'ভিসা','বিসা','tourist','ট্যুরিস্ট ভিসা',
        'kon kon desher','ki ki desh','which country',
      ],
    },
    {
      key: 'air-ticketing',
      words: [
        'air ticket','ticket','tiket','flight','airline','plane','book ticket',
        'ticket booking','international ticket','ticket dorkar',
        'টিকেট','এয়ার টিকেট','ফ্লাইট','ticket koren','book flight',
        'biman','booking','air fare','fare',
      ],
    },
    {
      key: 'date-change',
      words: [
        'date change','reschedule','change date','change ticket','change flight',
        'ticket change','reissue','tarikh change','date bodlate chai',
        'ticket reschedule','তারিখ বদলাতে','রিশিডিউল',
      ],
    },
    {
      key: 'student-visa',
      words: [
        'student visa','student','study','study abroad','padha','porashona',
        'university','college','admission','পড়াশোনা','স্টুডেন্ট ভিসা',
        'বিদেশে পড়তে','study visa','education visa',
      ],
    },
    {
      key: 'medical-visa',
      words: [
        'medical visa','medical','hospital','treatment','doctor','chikitsha',
        'haspatale','india treatment','bangkok hospital','apollo','fortis',
        'মেডিকেল ভিসা','চিকিৎসা','হাসপাতাল','treatment visa',
      ],
    },
    {
      key: 'group-visa',
      words: [
        'group visa','group','family tour','corporate','company tour',
        'group package','group travel','multiple persons','multiple people',
        'গ্রুপ ভিসা','গ্রুপ','পারিবারিক ট্যুর','family trip',
      ],
    },
    {
      key: 'couple-package',
      words: [
        'couple','honeymoon','anniversary','romantic','couple package',
        'husband wife','newly wed','bou niye','wife niye',
        'কাপল প্যাকেজ','হানিমুন','রোমান্টিক','দুজন','couple trip',
      ],
    },
    {
      key: 'passport',
      words: [
        'passport','passport copy','passport nai','passport ache','passport validity',
        'পাসপোর্ট','passport lagbe','new passport','passport expire',
        'passport renew','passport problem',
      ],
    },
    {
      key: 'bank-statement',
      words: [
        'bank statement','bank','statement','bank er kagoj','ব্যাংক স্টেটমেন্ট',
        'ব্যাংক','account statement','bank document','bank balance',
        'how much balance','koto balance lagbe','balance',
      ],
    },
    {
      key: 'refund',
      words: [
        'refund','cancel','cancellation','money back','taka ferat',
        'ফেরত','টাকা ফেরত','ক্যান্সেল','cancel korte chai','refund policy',
      ],
    },
    {
      key: 'payment',
      words: [
        'payment','pay','bkash','nagad','rocket','bank transfer','how to pay',
        'payment method','ki diye pay','পেমেন্ট','কিভাবে পেমেন্ট',
        'পেমেন্ট করবো','bkash dibo','nagad dibo',
      ],
    },
    {
      key: 'office-location',
      words: [
        'office','location','address','kothay','where','office koi',
        'office address','office kothay ache','kothay office',
        'ঠিকানা','অফিস','কোথায়','office thikana','find office',
      ],
    },
    {
      key: 'whatsapp',
      words: [
        'whatsapp','whatsapp number','number','contact number','phone number',
        'call','phone','kon number','kono number','wa number',
        'হোয়াটসঅ্যাপ','নম্বর','ফোন নম্বর','contact','reach you',
      ],
    },
    {
      key: 'appointment',
      words: [
        'appointment','meeting','visit','office visit','come to office',
        'আসতে চাই','দেখা করতে চাই','appointment nite chai','book appointment',
      ],
    },
    {
      key: 'contact-agent',
      words: [
        'agent','consultant','human','speak to','talk to','help',
        'support','customer care','agent er sathe','কথা বলতে চাই',
        'সাহায্য','help lagbe','kotha bolbo',
      ],
    },
  ];

  /* ══════════════════════════════════════
     SMART MATCH FUNCTION
  ══════════════════════════════════════ */
  function findMatch(lower) {
    for (const entry of KEYWORD_MAP) {
      if (entry.words.some(kw => lower.includes(kw))) {
        return entry.key;
      }
    }
    return null;
  }

  /* ══════════════════════════════════════
     BUILD DOM
  ══════════════════════════════════════ */
  function buildChatbot() {
    const backdrop = document.createElement('div');
    backdrop.id = 'chatbotBackdrop';

    const win = document.createElement('div');
    win.id = 'chatbotWindow';
    win.setAttribute('role', 'dialog');
    win.setAttribute('aria-label', 'Trip Fly Assistant');

    win.innerHTML = `
      <div class="cb-header">
        <div class="cb-avatar"><i class="fas fa-robot"></i></div>
        <div class="cb-header-text">
          <div class="cb-name">Trip Fly Assistant</div>
          <div class="cb-status">
            <span class="cb-status-dot"></span> Online &nbsp;·&nbsp; Trip Fly BD
          </div>
        </div>
        <button class="cb-header-close" id="cbHeaderClose" aria-label="Close chatbot"><i class="fas fa-times"></i></button>
      </div>
      <div class="cb-messages" id="cbMessages" role="log" aria-live="polite"></div>
      <div class="cb-quick-wrap" id="cbQuickWrap" aria-label="Quick replies"></div>
      <div class="cb-input-row">
        <input class="cb-input" id="cbInput" type="text"
          placeholder="Bangla / Banglish / English — যেকোনো ভাষায় লিখুন…"
          autocomplete="off" maxlength="300"/>
        <button class="cb-send-btn" id="cbSendBtn" aria-label="Send">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        </button>
      </div>`;

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
    const encoded = encodeURIComponent(waText);
    return `<div class="cb-cta-row">
      <a href="${WA_URL}${encoded}" target="_blank" rel="noopener" class="cb-cta-btn wa">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        WhatsApp করুন
      </a>
      <a href="${CONTACT}" class="cb-cta-btn contact">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
        Contact Page
      </a>
    </div>`;
  }

  /* ══════════════════════════════════════
     TIME STRING
  ══════════════════════════════════════ */
  function getTime() {
    return new Date().toLocaleTimeString('en-BD', { hour: '2-digit', minute: '2-digit', hour12: true });
  }

  /* ══════════════════════════════════════
     ADD MESSAGES
  ══════════════════════════════════════ */
  function addBotMsg(htmlContent) {
    const msgs = document.getElementById('cbMessages');
    if (!msgs) return;
    const wrap = document.createElement('div');
    wrap.className = 'cb-msg bot';
    wrap.innerHTML = `
      <div class="cb-avatar-sm"><i class="fas fa-robot"></i></div>
      <div class="cb-msg-body">
        <div class="cb-bubble">${htmlContent}</div>
        <span class="cb-time">${getTime()}</span>
      </div>`;
    msgs.appendChild(wrap);
    scrollMessages();
  }

  function addUserMsg(text) {
    const msgs = document.getElementById('cbMessages');
    if (!msgs) return;
    const wrap = document.createElement('div');
    wrap.className = 'cb-msg user';
    wrap.innerHTML = `
      <div class="cb-msg-body">
        <div class="cb-bubble">${escapeHtml(text)}</div>
        <span class="cb-time">${getTime()}</span>
      </div>`;
    msgs.appendChild(wrap);
    scrollMessages();
  }

  /* ══════════════════════════════════════
     TYPING INDICATOR
  ══════════════════════════════════════ */
  function showTyping() {
    const msgs = document.getElementById('cbMessages');
    if (!msgs || document.getElementById('cbTyping')) return;
    const el = document.createElement('div');
    el.id = 'cbTyping';
    el.className = 'cb-typing-wrap';
    el.innerHTML = `
      <div class="cb-avatar-sm"><i class="fas fa-robot"></i></div>
      <div class="cb-typing-bubble">
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
     PROCESS INPUT
  ══════════════════════════════════════ */
  function processInput(rawText) {
    const text  = rawText.trim();
    const lower = text.toLowerCase();
    if (!text) return;

    addUserMsg(text);

    const matchedKey = findMatch(lower);

    showTyping();
    const delay = 800 + Math.random() * 500;

    setTimeout(() => {
      hideTyping();
      if (matchedKey) {
        addBotMsg(buildResponse(matchedKey));
      } else {
        // Natural fallback
        addBotMsg(`আপনার প্রশ্নটি বুঝতে পারিনি — কিন্তু আমাদের expert team সাহায্য করতে প্রস্তুত! 😊<br/><br/>
নিচে <strong>Quick Reply</strong> বাটন থেকে বেছে নিন, অথবা সরাসরি WhatsApp করুন:<br/>
${ctaHTML(`Hello Trip Fly BD! I have a question: ${text}`)}`);
      }
      scrollMessages();
    }, delay);
  }

  /* ══════════════════════════════════════
     OPEN / CLOSE
  ══════════════════════════════════════ */
  let isOpen   = false;
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

    if (!welcomed) {
      welcomed = true;
      buildQuickButtons();
      showTyping();
      setTimeout(() => {
        hideTyping();
        addBotMsg(`আস্সালামু আলাইকুম! 👋 <strong>Trip Fly BD</strong> তে স্বাগতম!<br/><br/>
আমি আপনার <strong>Personal Travel Assistant</strong> — Visa, Air Ticket, Tour Package সহ যেকোনো travel বিষয়ে সাহায্য করতে পারবো।<br/><br/>
🌍 Bangla, Banglish বা English — <strong>যেকোনো ভাষায়</strong> প্রশ্ন করুন।<br/><br/>
<strong>নিচের Quick Reply বাটন থেকে বেছে নিন বা সরাসরি টাইপ করুন:</strong>`);
      }, 900);
    }

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
     INIT
  ══════════════════════════════════════ */
  function init() {
    buildChatbot();

    const launcher  = document.getElementById('chatbotLauncher');
    const closeBtn  = document.getElementById('cbHeaderClose');
    const backdrop  = document.getElementById('chatbotBackdrop');
    const sendBtn   = document.getElementById('cbSendBtn');
    const input     = document.getElementById('cbInput');
    const quickWrap = document.getElementById('cbQuickWrap');

    launcher?.addEventListener('click', () => { isOpen ? closeChat() : openChat(); });
    closeBtn?.addEventListener('click', closeChat);
    backdrop?.addEventListener('click', closeChat);

    sendBtn?.addEventListener('click', () => {
      const val = input?.value.trim();
      if (val) { processInput(val); if (input) input.value = ''; }
    });

    input?.addEventListener('keydown', e => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        const val = input.value.trim();
        if (val) { processInput(val); input.value = ''; }
      }
    });

    quickWrap?.addEventListener('click', e => {
      const btn = e.target.closest('.cb-quick-btn');
      if (!btn) return;
      const key   = btn.dataset.key;
      const label = btn.textContent.trim();
      addUserMsg(label);
      showTyping();
      setTimeout(() => {
        hideTyping();
        const html = buildResponse(key);
        if (html) addBotMsg(html);
        scrollMessages();
      }, 800 + Math.random() * 400);
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && isOpen) closeChat();
    });

    // Show notification dot after 3s
    setTimeout(() => {
      const dot = document.getElementById('chatbotDot');
      if (dot && !isOpen) dot.classList.remove('hidden');
    }, 3000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();