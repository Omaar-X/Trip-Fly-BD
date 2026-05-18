/* ============================================================
   TRIP FLY BD — CHATBOT.JS  (v3 — Premium Smart Bilingual)
   Travel Consultant · Tourism Sales · Visa Advisor
   Bangla + Banglish + English | No external API | Pure JS
   WhatsApp: +880 18 9880 1939 | wa.me/8801898801939
============================================================ */
(function () {
  'use strict';

  /* ══════════════════════════════════════
     CONFIG
  ══════════════════════════════════════ */
  const WA_NUMBER = '8801898801939';
  const WA_URL    = `https://wa.me/${WA_NUMBER}?text=`;
  const DEST_PAGE = 'destinations.html';
  const CONTACT   = 'contact.html';

  /* ══════════════════════════════════════
     COUNTRY / DESTINATION DATA
     Each entry: flag, emoji, slug (matches destinations.html data-visa-key),
     summary, price, highlights, visa type
  ══════════════════════════════════════ */
  const DESTINATIONS = {
    maldives: {
      name: 'Maldives',
      flag: '🇲🇻',
      slug: 'maldives',
      visa: 'Visa on Arrival ✅ (Free)',
      price: 'BDT 55,000',
      duration: '5N/6D',
      highlight: 'Water villas · Overwater bungalows · Crystal lagoons',
      includes: 'Visa + Return Flight + Resort + Transfers',
      type: 'Honeymoon · Luxury · Beach',
      waText: 'আমি Maldives প্যাকেজ সম্পর্কে জানতে চাই।',
      intro: `🏝️ <strong>Maldives</strong> — স্বপ্নের overwater paradise!<br><br>
বিশ্বের সবচেয়ে সুন্দর lagoon আর water villa এর দেশ। Honeymoon বা luxury vacation এর জন্য perfect choice।`,
    },
    thailand: {
      name: 'Thailand',
      flag: '🇹🇭',
      slug: 'thailand',
      visa: 'Tourist Visa (Embassy)',
      price: 'BDT 28,000',
      duration: '5N/6D',
      highlight: 'Phuket · Bangkok · Pattaya · Chiang Mai',
      includes: 'Visa + Return Flight + Hotel + Transfers',
      type: 'Beach · City · Adventure',
      waText: 'আমি Thailand প্যাকেজ সম্পর্কে জানতে চাই।',
      intro: `🇹🇭 <strong>Thailand</strong> — Southeast Asia এর সেরা গন্তব্য!<br><br>
Phuket এর সমুদ্র সৈকত থেকে Bangkok এর city life — সব কিছুর এক অপূর্ব মিশ্রণ।`,
    },
    malaysia: {
      name: 'Malaysia',
      flag: '🇲🇾',
      slug: 'malaysia',
      visa: 'eVisa / Visa on Arrival ✅',
      price: 'BDT 22,000',
      duration: '4N/5D',
      highlight: 'KL · Genting · Langkawi · Penang',
      includes: 'Visa + Return Flight + Hotel + City Tour',
      type: 'Family · City · Nature',
      waText: 'আমি Malaysia প্যাকেজ সম্পর্কে জানতে চাই।',
      intro: `🇲🇾 <strong>Malaysia</strong> — Family travel এর জন্য অসাধারণ!<br><br>
Kuala Lumpur এর iconic Petronas Twin Towers, Langkawi দ্বীপ, আর Genting Highlands — সব এক দেশে!`,
    },
    singapore: {
      name: 'Singapore',
      flag: '🇸🇬',
      slug: 'singapore',
      visa: 'Tourist Visa (Embassy)',
      price: 'BDT 38,000',
      duration: '4N/5D',
      highlight: 'Marina Bay · Sentosa · Universal Studios',
      includes: 'Visa + Return Flight + Hotel + SIM',
      type: 'City · Shopping · Family',
      waText: 'আমি Singapore প্যাকেজ সম্পর্কে জানতে চাই।',
      intro: `🇸🇬 <strong>Singapore</strong> — Asia এর সবচেয়ে আধুনিক শহর!<br><br>
Marina Bay Sands, Gardens by the Bay, Universal Studios — world-class experience মাত্র কয়েক ঘণ্টার দূরত্বে।`,
    },
    dubai: {
      name: 'Dubai',
      flag: '🇦🇪',
      slug: 'dubai',
      visa: 'UAE Tourist Visa',
      price: 'BDT 42,000',
      duration: '4N/5D',
      highlight: 'Burj Khalifa · Desert Safari · Palm Jumeirah',
      includes: 'Visa + Return Flight + Hotel + Desert Safari',
      type: 'Luxury · Shopping · Adventure',
      waText: 'আমি Dubai প্যাকেজ সম্পর্কে জানতে চাই।',
      intro: `🇦🇪 <strong>Dubai / UAE</strong> — বিলাসিতা আর আধুনিকতার শহর!<br><br>
Burj Khalifa থেকে সূর্যাস্ত, desert safari তে উত্তেজনা, Dubai Mall এ shopping — luxury ভ্রমণের সংজ্ঞাই বদলে দেবে!`,
    },
    srilanka: {
      name: 'Sri Lanka',
      flag: '🇱🇰',
      slug: 'srilanka',
      visa: 'eVisa ✅ (Online)',
      price: 'BDT 24,000',
      duration: '5N/6D',
      highlight: 'Sigiriya · Ella · Colombo · Tea Hills',
      includes: 'Visa + Return Flight + Hotel + Train Pass',
      type: 'Nature · Heritage · Budget',
      waText: 'আমি Sri Lanka প্যাকেজ সম্পর্কে জানতে চাই।',
      intro: `🇱🇰 <strong>Sri Lanka</strong> — প্রকৃতির এক অনন্য রত্ন!<br><br>
চা বাগানের সবুজ পাহাড়, প্রাচীন স্থাপত্য আর অপূর্ব সমুদ্র সৈকত — অল্প খরচে অসাধারণ অভিজ্ঞতা।`,
    },
    india: {
      name: 'India',
      flag: '🇮🇳',
      slug: 'india',
      visa: 'e-Visa ✅ (Online) / Embassy Visa',
      price: 'BDT 15,000',
      duration: '4N/5D',
      highlight: 'Kolkata · Delhi · Darjeeling · Agra · Mumbai',
      includes: 'Visa + Return Flight + Hotel',
      type: 'Culture · Medical · Family',
      waText: 'আমি India প্যাকেজ সম্পর্কে জানতে চাই।',
      intro: `🇮🇳 <strong>India</strong> — কাছের প্রতিবেশী, অফুরন্ত বৈচিত্র্য!<br><br>
Kolkata, Darjeeling, Agra এর Taj Mahal বা Kerala এর backwaters — সব ধরনের ভ্রমণকারীর জন্য আদর্শ।`,
    },
    turkey: {
      name: 'Turkey',
      flag: '🇹🇷',
      slug: 'turkey',
      visa: 'e-Visa ✅ (Online)',
      price: 'BDT 52,000',
      duration: '6N/7D',
      highlight: 'Istanbul · Cappadocia · Antalya · Ephesus',
      includes: 'Visa + Return Flight + Hotel + Hot Air Balloon',
      type: 'History · Romance · Adventure',
      waText: 'আমি Turkey প্যাকেজ সম্পর্কে জানতে চাই।',
      intro: `🇹🇷 <strong>Turkey</strong> — ইতিহাস আর প্রকৃতির অপূর্ব মিলন!<br><br>
Istanbul এর Blue Mosque, Cappadocia তে hot air balloon ride, Antalya এর Mediterranean সৈকত — এক trip এ তিন অভিজ্ঞতা!`,
    },
    usa: {
      name: 'USA',
      flag: '🇺🇸',
      slug: 'usa',
      visa: 'B1/B2 Tourist Visa (Embassy)',
      price: 'BDT 1,80,000',
      duration: '10N/12D',
      highlight: 'New York · Los Angeles · Miami · Las Vegas',
      includes: 'Visa Assistance + Flight + Hotel Guidance',
      type: 'Luxury · City · Adventure',
      waText: 'আমি USA ভিসা ও ট্যুর সম্পর্কে জানতে চাই।',
      intro: `🇺🇸 <strong>USA</strong> — স্বপ্নের American journey!<br><br>
New York এর Times Square, LA এর Hollywood, Vegas এর glam — America এর অভিজ্ঞতা অতুলনীয়। Visa processing সহ আমরা পুরো সাপোর্ট দিই।`,
    },
    switzerland: {
      name: 'Switzerland',
      flag: '🇨🇭',
      slug: 'switzerland',
      visa: 'Schengen Visa (Embassy)',
      price: 'BDT 1,20,000',
      duration: '7N/8D',
      highlight: 'Interlaken · Zurich · Jungfrau · Geneva',
      includes: 'Visa Assistance + Flight + Hotel + Swiss Pass',
      type: 'Luxury · Nature · Honeymoon',
      waText: 'আমি Switzerland প্যাকেজ সম্পর্কে জানতে চাই।',
      intro: `🇨🇭 <strong>Switzerland</strong> — ইউরোপের সবচেয়ে সুন্দর দেশ!<br><br>
তুষারঢাকা Jungfrau, নীল হ্রদ, চকোলেট আর Alpine villages — Schengen visa সহ আমরা dream trip সাজিয়ে দিই।`,
    },
    indonesia: {
      name: 'Indonesia / Bali',
      flag: '🇮🇩',
      slug: 'indonesia',
      visa: 'Visa on Arrival ✅',
      price: 'BDT 32,000',
      duration: '5N/6D',
      highlight: 'Bali · Ubud · Seminyak · Lombok',
      includes: 'Visa + Return Flight + Villa + Transfers',
      type: 'Romance · Beach · Nature',
      waText: 'আমি Bali / Indonesia প্যাকেজ সম্পর্কে জানতে চাই।',
      intro: `🇮🇩 <strong>Bali / Indonesia</strong> — Honeymoon এর paradise!<br><br>
Ubud এর rice terraces, Seminyak এর sunset beaches আর private villa — romantic getaway এর জন্য Bali এর জুড়ি নেই।`,
    },
  };

  /* ══════════════════════════════════════
     GENERAL SERVICE RESPONSES
  ══════════════════════════════════════ */
  const RESPONSES = {
    'tourist-visa': {
      label: '🛂 Tourist Visa',
      reply: `আমরা <strong>25+ দেশের Tourist Visa</strong> process করি:<br><br>
🟢 <strong>On Arrival / eVisa:</strong> Maldives, Malaysia, Sri Lanka, Turkey, Indonesia, Nepal<br>
🔵 <strong>Embassy Visa:</strong> Thailand, Singapore, Dubai, India, China, Japan, UK, USA<br><br>
📋 <strong>Common Documents:</strong><br>
✅ Valid Passport (6+ months) · ✅ Photo · ✅ Bank Statement (3-6 months)<br>
✅ NID/Birth Certificate · ✅ Job Proof/Trade License<br><br>
⏱ Processing: <strong>3–15 working days</strong> | Urgent: <strong>1–3 days</strong><br>
🏆 আমাদের <strong>99% visa approval rate!</strong>`,
      waMsg: 'Tourist Visa সম্পর্কে বিস্তারিত জানতে চাই।',
      dest: null,
    },
    'student-visa': {
      label: '🎓 Student Visa',
      reply: `<strong>Student / Study Visa</strong> — বিদেশে পড়ার স্বপ্ন পূরণ করুন!<br><br>
📚 <strong>আমরা যেসব দেশে প্রসেস করি:</strong><br>
🇲🇾 Malaysia · 🇨🇳 China · 🇮🇳 India · 🇹🇷 Turkey · 🇹🇭 Thailand<br><br>
📋 <strong>Documents:</strong><br>
✅ University Admission Letter<br>
✅ Academic Certificates (SSC, HSC, Degree)<br>
✅ Bank Statement (family/sponsor)<br>
✅ IELTS/Language Certificate (if required)<br>
✅ Valid Passport + Photo + NID<br><br>
👨‍💼 আমাদের consultants প্রতিটি step এ guide করবে — document থেকে visa approval পর্যন্ত।`,
      waMsg: 'Student Visa সম্পর্কে জানতে চাই। আমার destination হলো: ',
      dest: null,
    },
    'medical-visa': {
      label: '🏥 Medical Visa',
      reply: `<strong>Medical Visa</strong> — বিদেশে চিকিৎসায় দ্রুত সহায়তা!<br><br>
🏥 <strong>Popular Destinations:</strong><br>
🇮🇳 India — Apollo, Fortis, CMC Vellore<br>
🇹🇭 Thailand — Bumrungrad, Bangkok Hospital<br>
🇲🇾 Malaysia — Gleneagles, KPJ<br>
🇸🇬 Singapore — Mount Elizabeth, Raffles<br><br>
📋 <strong>Documents:</strong><br>
✅ Hospital Appointment Letter · ✅ Doctor's Report<br>
✅ Valid Passport + Photo + NID + Bank Statement<br>
✅ Attendant Visa (for companion)<br><br>
⚡ <strong>Urgent medical visa — priority handling available!</strong><br>
রোগীর জন্য আমরা সর্বোচ্চ দ্রুততায় কাজ করি।`,
      waMsg: 'Medical Visa সম্পর্কে জরুরিভাবে জানতে চাই।',
      dest: null,
    },
    'honeymoon': {
      label: '💑 Honeymoon Package',
      reply: `💍 <strong>Romantic Honeymoon Packages</strong> — স্বপ্নের শুরু হোক অসাধারণভাবে!<br><br>
🏝️ <strong>Top Honeymoon Destinations:</strong><br>
🇲🇻 Maldives — Water Villa, Sunset Cruise (from BDT 55,000)<br>
🇹🇭 Thailand — Phuket, Krabi (from BDT 28,000)<br>
🇦🇪 Dubai — Luxury Desert & City (from BDT 42,000)<br>
🇮🇩 Bali — Private Villa, Rice Terraces (from BDT 32,000)<br>
🇱🇰 Sri Lanka — Tea Hills & Beaches (from BDT 24,000)<br>
🇨🇭 Switzerland — Alpine Romance (from BDT 1,20,000)<br><br>
💐 Package includes: Visa + Flights + Hotel/Villa + Transfers<br>
🕯️ Special arrangements: Candlelight dinner, Spa, Couple photoshoot`,
      waMsg: 'আমাদের Honeymoon Package সম্পর্কে বিস্তারিত জানতে চাই।',
      dest: null,
    },
    'air-ticketing': {
      label: '✈ Air Ticket',
      reply: `✈️ <strong>International Air Tickets</strong> — সেরা দামে, সেরা সার্ভিসে!<br><br>
✅ সব major airlines — Economy, Business & First Class<br>
✅ <strong>Best-price guarantee</strong> — সবচেয়ে কম দামে ticket<br>
✅ E-ticket instantly on WhatsApp<br>
✅ Group booking discounts<br>
✅ Open-jaw & multi-city tickets<br>
✅ Ticket date change / reissue service<br><br>
📍 Travel dates ও destination বলুন — সাথে সাথে <strong>best fare</strong> পাবেন!`,
      waMsg: 'Air Ticket price জানতে চাই। Destination: ',
      dest: null,
    },
    'group-package': {
      label: '👥 Group Package',
      reply: `👥 <strong>Group Tour Package</strong> — 5+ জনের জন্য বিশেষ সুবিধা!<br><br>
✅ Family tours & group holidays<br>
✅ Corporate & office trips<br>
✅ Group discounts on visa, tickets & hotels<br>
✅ Single-point coordination<br>
✅ Hotel + transport + guided tour arrangements<br><br>
🎯 Group size ও destination জানালে আমরা <strong>special package quote</strong> দেবো!`,
      waMsg: 'Group Tour Package সম্পর্কে জানতে চাই। আমাদের group size: ',
      dest: null,
    },
    'urgent-visa': {
      label: '⚡ Urgent Visa',
      reply: `🔴 <strong>Urgent / Emergency Visa Processing</strong> — দ্রুততম সেবা!<br><br>
⚡ Same-day / Next-day processing (select countries)<br>
🏥 Emergency medical visa — priority handling<br>
💼 Urgent business travel support<br>
✈️ Emergency air ticket booking<br>
📞 24/7 WhatsApp support<br><br>
<strong>এখনই WhatsApp করুন</strong> — urgent cases এ আমরা সর্বোচ্চ অগ্রাধিকার দিই।<br>
⚠️ Express fee প্রযোজ্য।`,
      waMsg: '🔴 URGENT VISA দরকার। দেশ: ',
      dest: null,
    },
    'visa-cost': {
      label: '💰 Visa Cost',
      reply: `💰 <strong>Approximate Visa Fees (Embassy fee + Service charge):</strong><br><br>
🇹🇭 Thailand — BDT 5,000–8,000<br>
🇲🇾 Malaysia — BDT 3,000–6,000<br>
🇦🇪 Dubai/UAE — BDT 10,000–18,000<br>
🇮🇳 India — BDT 3,500–6,000<br>
🇸🇬 Singapore — BDT 7,000–12,000<br>
🇹🇷 Turkey — BDT 5,000–9,000<br>
🇲🇻 Maldives — <strong>FREE</strong> (Visa on Arrival)<br>
🇱🇰 Sri Lanka — BDT 2,500–4,000<br>
🇮🇩 Indonesia — BDT 2,500–4,000<br><br>
💡 Exact cost জানতে WhatsApp করুন — আমরা সাথে সাথে জানাবো।`,
      waMsg: 'Visa cost সম্পর্কে বিস্তারিত জানতে চাই। দেশ: ',
      dest: null,
    },
    'processing-time': {
      label: '⏱ Processing Time',
      reply: `⏱ <strong>Visa Processing Time:</strong><br><br>
🇮🇳 India — 2–4 days (eVisa)<br>
🇹🇷 Turkey — 2–3 days (eVisa)<br>
🇲🇾 Malaysia — 2–5 days<br>
🇹🇭 Thailand — 3–7 days<br>
🇦🇪 Dubai — 3–7 days<br>
🇸🇬 Singapore — 5–10 days<br>
🇨🇳 China — 7–15 days<br>
🇬🇧 UK / 🇺🇸 USA — 30–60 days<br><br>
🚀 <strong>Urgent processing:</strong> 1–3 days (extra fee applies)<br>
Emergency ticket বা urgent visa হলে এখনই WhatsApp করুন!`,
      waMsg: 'Visa processing time সম্পর্কে জানতে চাই।',
      dest: null,
    },
    'payment': {
      label: '💳 Payment',
      reply: `💳 <strong>Payment Methods আমরা গ্রহণ করি:</strong><br><br>
💵 Cash (office visit)<br>
📱 <strong>bKash / Nagad / Rocket</strong><br>
🏦 Bank Transfer (DBBL, BRAC, Islami Bank, Dutch-Bangla)<br>
💳 Debit / Credit Card (select cases)<br><br>
📨 Payment করার পর screenshot WhatsApp এ পাঠান — confirm হয়ে যাবে।`,
      waMsg: 'Payment method সম্পর্কে জানতে চাই।',
      dest: null,
    },
    'office-location': {
      label: '📍 Office Location',
      reply: `📍 <strong>Trip Fly BD — Office:</strong><br><br>
🏢 Location: Dhaka, Bangladesh<br>
🕐 Sat–Thu: <strong>9:00 AM – 9:00 PM</strong><br>
🕐 Friday: <strong>12:00 PM – 8:00 PM</strong><br>
📞 WhatsApp: <strong>+880 18 9880 1939</strong><br>
🌐 www.tripflybd.com<br><br>
📌 Exact address ও Google Maps link এর জন্য WhatsApp করুন!`,
      waMsg: 'Office address ও location জানতে চাই।',
      dest: null,
    },
    'trusted': {
      label: '🏆 Why Trust Us?',
      reply: `🏆 <strong>কেন Trip Fly BD বিশ্বস্ত?</strong><br><br>
✅ <strong>99% Visa Approval Rate</strong> — industry সেরা<br>
✅ <strong>10,000+ Happy Travelers</strong> served<br>
✅ <strong>8+ Years Experience</strong> in travel industry<br>
✅ ATAB & TOAB সদস্য<br>
✅ 24/7 WhatsApp support<br>
✅ Transparent pricing — কোনো hidden charge নেই<br>
✅ Free consultation — কোনো fee নেই<br><br>
আমাদের <strong>Google Reviews</strong> দেখুন — হাজারো satisfied customer এর experience!`,
      waMsg: 'Trip Fly BD সম্পর্কে আরো জানতে চাই।',
      dest: null,
    },
    'hotel': {
      label: '🏨 Hotel Included?',
      reply: `🏨 <strong>Hotel Booking — হ্যাঁ, আমরা করি!</strong><br><br>
✅ Package গুলোতে <strong>hotel সাধারণত included</strong><br>
✅ 3⭐ Budget থেকে 5⭐ Luxury — সব options আছে<br>
✅ Resort · City Hotel · Villa · Boutique Hotel<br>
✅ Breakfast included option আছে<br>
✅ Private room বা shared — আপনার choice<br><br>
🏝️ Honeymoon/Couple packages এ <strong>premium room upgrade</strong> option আছে!<br><br>
Destination ও budget বলুন — আমরা best hotel suggest করবো।`,
      waMsg: 'Hotel booking ও package সম্পর্কে জানতে চাই। Destination: ',
      dest: null,
    },
    'package-start': {
      label: '📦 Package Price Range',
      reply: `📦 <strong>Trip Fly BD Package Starting Price:</strong><br><br>
🇮🇳 India — from <strong>BDT 15,000</strong>/person<br>
🇱🇰 Sri Lanka — from <strong>BDT 24,000</strong>/person<br>
🇲🇾 Malaysia — from <strong>BDT 22,000</strong>/person<br>
🇹🇭 Thailand — from <strong>BDT 28,000</strong>/person<br>
🇮🇩 Bali/Indonesia — from <strong>BDT 32,000</strong>/person<br>
🇸🇬 Singapore — from <strong>BDT 38,000</strong>/person<br>
🇦🇪 Dubai — from <strong>BDT 42,000</strong>/person<br>
🇲🇻 Maldives — from <strong>BDT 55,000</strong>/person<br>
🇨🇭 Switzerland — from <strong>BDT 1,20,000</strong>/person<br><br>
💡 Price includes Visa + Flight + Hotel + Transfer (varies by package).`,
      waMsg: 'Package price ও details জানতে চাই। আমার destination: ',
      dest: null,
    },
    'whatsapp': {
      label: '💬 WhatsApp',
      reply: `💬 <strong>WhatsApp এ সরাসরি কথা বলুন:</strong><br><br>
📞 <strong>+880 18 9880 1939</strong><br>
⏰ 24/7 WhatsApp support<br>
🕐 Office: Sat–Thu 9AM–9PM<br>
⚡ Emergency support anytime<br>
🆓 Free consultation — কোনো charge নেই!<br><br>
নিচের button এ click করে এখনই connect করুন 👇`,
      waMsg: 'Hello Trip Fly BD! আমি travel assistance চাই।',
      dest: null,
    },
    'contact-agent': {
      label: '🧑‍💼 Talk to Expert',
      reply: `🧑‍💼 <strong>আমাদের Expert Travel Consultant</strong> এর সাথে কথা বলুন!<br><br>
📞 WhatsApp: <strong>+880 18 9880 1939</strong><br>
🕐 Sat–Thu: 9AM–9PM<br>
🌙 Emergency: 24/7 WhatsApp<br>
🆓 Free consultation guaranteed<br>
🗣️ Bangla, Banglish & English — সব ভাষায় কথা বলতে পারবেন<br><br>
আমাদের team সবসময় আপনাকে সাহায্য করতে প্রস্তুত। 😊`,
      waMsg: 'Hello! আমি একজন expert travel consultant এর সাথে কথা বলতে চাই।',
      dest: null,
    },
    'bank-statement': {
      label: '🏦 Bank Statement',
      reply: `🏦 <strong>Visa এর জন্য Bank Statement:</strong><br><br>
📅 3–6 months এর statement লাগে<br>
💰 Minimum balance: BDT 50,000–2,00,000 (দেশভেদে ভিন্ন)<br>
✅ Regular transaction থাকলে ভালো<br>
✅ Salary certificate / income proof সহ দিলে strength বাড়ে<br>
✅ Bank থেকে signed & sealed statement আনুন<br><br>
💡 Balance কম থাকলেও সমাধান আছে — WhatsApp করে জিজ্ঞেস করুন!`,
      waMsg: 'Bank statement requirement সম্পর্কে জানতে চাই। Destination: ',
      dest: null,
    },
    'refund': {
      label: '↩ Refund Policy',
      reply: `↩ <strong>Refund & Cancellation Policy:</strong><br><br>
⚠️ Visa embassy fee — <strong>non-refundable</strong> (reject হলেও)<br>
💚 Service charge — partially/fully refundable (case by case)<br>
✈️ Air ticket — airline policy অনুযায়ী<br>
🏨 Hotel — hotel cancellation policy অনুযায়ী<br>
📦 Tour package — cancellation timeline অনুযায়ী charges<br><br>
📞 Refund request এর জন্য WhatsApp করুন — আমরা customer-friendly সমাধান দেওয়ার চেষ্টা করি।`,
      waMsg: 'Refund / cancellation policy সম্পর্কে জানতে চাই।',
      dest: null,
    },
  };

  /* ══════════════════════════════════════
     QUICK REPLY BUTTONS CONFIG
  ══════════════════════════════════════ */
  const QUICK_BUTTONS_ROW1 = [
    { type: 'dest', key: 'maldives',     label: 'Maldives Package' },
    { type: 'dest', key: 'thailand',     label: 'Thailand Visa' },
    { type: 'resp', key: 'air-ticketing', label: 'Air Ticket' },
    { type: 'resp', key: 'contact-agent', label: 'Talk To Expert' },
    { type: 'resp', key: 'tourist-visa',  label: 'Visa Checklist' },
  ];

  const QUICK_BUTTONS_ROW2 = [];

  /* ══════════════════════════════════════
     KEYWORD MAP — Bangla + Banglish + English
  ══════════════════════════════════════ */
  const DEST_KEYWORDS = [
    { key: 'maldives',    words: ['maldives','maldive','maldibh','মালদ্বীপ','মালদিভস','maldib'] },
    { key: 'thailand',    words: ['thailand','tailand','thai','থাইল্যান্ড','thai land','phuket','bangkok','pattaya','krabi'] },
    { key: 'malaysia',    words: ['malaysia','malaesia','মালয়েশিয়া','kuala lumpur','kl','genting','langkawi','penang'] },
    { key: 'singapore',   words: ['singapore','singapur','সিঙ্গাপুর','marina bay','sentosa','universal studio'] },
    { key: 'dubai',       words: ['dubai','dubay','দুবাই','uae','abu dhabi','burj','emirates','আমিরাত'] },
    { key: 'srilanka',    words: ['sri lanka','srilanka','shrilanka','শ্রীলঙ্কা','colombo','ella','sigiriya','ceylon'] },
    { key: 'india',       words: ['india','ইন্ডিয়া','ভারত','kolkata','delhi','darjeeling','agra','mumbai','bengaluru','chennai'] },
    { key: 'turkey',      words: ['turkey','turki','তুরস্ক','istanbul','cappadocia','ankara','antalya','ephesus'] },
    { key: 'usa',         words: ['usa','america','আমেরিকা','new york','los angeles','miami','vegas','washington','us visa'] },
    { key: 'switzerland', words: ['switzerland','swiss','সুইজারল্যান্ড','interlaken','zurich','geneva','jungfrau','alps','schengen'] },
    { key: 'indonesia',   words: ['indonesia','bali','বালি','ইন্দোনেশিয়া','ubud','lombok','seminyak','kuta'] },
  ];

  const INTENT_KEYWORDS = [
    { key: 'visa-cost',       words: ['fee','fees','charge','cost','price','taka','koto taka','koto tk','koto','কত টাকা','কত','দাম','visa fee','visa cost','how much','কত লাগবে','কত টাকা লাগবে'] },
    { key: 'processing-time', words: ['time','din','koto din','processing time','how long','how many days','koto somoy','duration','কত দিন','কতদিন','সময়'] },
    { key: 'urgent-visa',     words: ['urgent','emergency','asap','express','same day','next day','জরুরি','আর্জেন্ট','ইমার্জেন্সি','urgent visa','urgent possible'] },
    { key: 'tourist-visa',    words: ['tourist visa','tourist','visa','ভিসা','visha','bisha','visa lagbe','visa ache','visa dorkar','ভিসা লাগবে'] },
    { key: 'student-visa',    words: ['student visa','student','study','study abroad','পড়াশোনা','স্টুডেন্ট ভিসা','বিদেশে পড়তে','study visa','education visa','university','college'] },
    { key: 'medical-visa',    words: ['medical visa','medical','hospital','treatment','doctor','chikitsha','haspatale','apollo','fortis','bumrungrad','মেডিকেল','চিকিৎসা','হাসপাতাল'] },
    { key: 'honeymoon',       words: ['honeymoon','couple','হানিমুন','কাপল','romantic','anniversary','newly wed','bou niye','wife niye','নবদম্পতি'] },
    { key: 'air-ticketing',   words: ['air ticket','ticket','tiket','flight','airline','plane','book ticket','টিকেট','এয়ার টিকেট','ফ্লাইট','fare','biman'] },
    { key: 'group-package',   words: ['group','family tour','corporate','company tour','group package','গ্রুপ','পারিবারিক','family trip'] },
    { key: 'hotel',           words: ['hotel','hotel included','hotel ache','accommodation','stay','lodge','villa','resort','হোটেল','থাকার ব্যবস্থা'] },
    { key: 'package-start',   words: ['package','pkg','tour package','holiday package','trip package','প্যাকেজ','tour','koto theke start','starting price','from'] },
    { key: 'trusted',         words: ['trusted','trustworthy','reliable','apnara ki','apnara thik ache','legit','real','fake','scam','বিশ্বস্ত','নির্ভরযোগ্য','আপনারা কি সঠিক'] },
    { key: 'bank-statement',  words: ['bank statement','bank','statement','bank er kagoj','ব্যাংক','balance','account statement'] },
    { key: 'payment',         words: ['payment','pay','bkash','nagad','rocket','bank transfer','পেমেন্ট','কিভাবে পেমেন্ট'] },
    { key: 'office-location', words: ['office','location','address','kothay','where','office koi','ঠিকানা','অফিস','কোথায়','thikana'] },
    { key: 'refund',          words: ['refund','cancel','cancellation','money back','taka ferat','ফেরত','টাকা ফেরত','ক্যান্সেল'] },
    { key: 'whatsapp',        words: ['whatsapp','number','contact number','phone number','phone','kon number','হোয়াটসঅ্যাপ','নম্বর','ফোন'] },
    { key: 'contact-agent',   words: ['agent','consultant','human','speak to','talk to','help lagbe','সাহায্য','কথা বলতে চাই','expert','kotha bolbo'] },
  ];

  /* ══════════════════════════════════════
     SMART MATCH ENGINE
  ══════════════════════════════════════ */
  function findDestination(lower) {
    for (const entry of DEST_KEYWORDS) {
      if (entry.words.some(kw => lower.includes(kw))) return entry.key;
    }
    return null;
  }

  function findIntent(lower) {
    for (const entry of INTENT_KEYWORDS) {
      if (entry.words.some(kw => lower.includes(kw))) return entry.key;
    }
    return null;
  }

  /* ══════════════════════════════════════
     BUILD CTA BUTTONS
  ══════════════════════════════════════ */
  function buildCTA(waText, destSlug) {
    const encoded = encodeURIComponent(waText);
    const destLink = destSlug ? `${DEST_PAGE}?dest=${destSlug}` : DEST_PAGE;

    return `<div class="cb-cta-row">
      ${destSlug ? `<a href="${destLink}" class="cb-cta-btn pkg" target="_blank">
        <i class="fas fa-compass"></i> View Package
      </a>` : ''}
      ${destSlug ? `<a href="${DEST_PAGE}?visa=${destSlug}" class="cb-cta-btn visa-chk" target="_blank">
        <i class="fas fa-passport"></i> Visa Checklist
      </a>` : ''}
      <a href="${WA_URL}${encoded}" target="_blank" rel="noopener" class="cb-cta-btn wa">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        WhatsApp
      </a>
      <a href="${CONTACT}" class="cb-cta-btn expert">
        <i class="fas fa-headset"></i> Talk to Expert
      </a>
    </div>`;
  }

  /* ══════════════════════════════════════
     BUILD DESTINATION RESPONSE
  ══════════════════════════════════════ */
  function buildDestResponse(destKey, intentKey) {
    const d = DESTINATIONS[destKey];
    if (!d) return null;

    let contextNote = '';
    if (intentKey === 'visa-cost') {
      contextNote = `<br>💰 <strong>Visa Type:</strong> ${d.visa}`;
    } else if (intentKey === 'honeymoon') {
      contextNote = `<br>💑 Perfect for honeymoon & couple trips!`;
    } else if (intentKey === 'processing-time') {
      contextNote = `<br>⏱ Processing কত দিন লাগবে — WhatsApp করলে exact বলতে পারবো।`;
    } else if (intentKey === 'hotel') {
      contextNote = `<br>🏨 Hotel package এ included আছে।`;
    }

    const html = `${d.intro}${contextNote}

<div class="cb-dest-card">
  <div class="cb-dest-row"><span class="cb-dest-lbl">🛂 Visa</span><span class="cb-dest-val">${d.visa}</span></div>
  <div class="cb-dest-row"><span class="cb-dest-lbl">💰 Starting</span><span class="cb-dest-val highlight">${d.price} / person</span></div>
  <div class="cb-dest-row"><span class="cb-dest-lbl">📅 Duration</span><span class="cb-dest-val">${d.duration}</span></div>
  <div class="cb-dest-row"><span class="cb-dest-lbl">✈️ Includes</span><span class="cb-dest-val">${d.includes}</span></div>
  <div class="cb-dest-row"><span class="cb-dest-lbl">🌟 Highlights</span><span class="cb-dest-val">${d.highlight}</span></div>
  <div class="cb-dest-row"><span class="cb-dest-lbl">🎯 Best for</span><span class="cb-dest-val">${d.type}</span></div>
</div>`;

    return { html, cta: buildCTA(d.waText, d.slug) };
  }

  /* ══════════════════════════════════════
     BUILD GENERAL RESPONSE
  ══════════════════════════════════════ */
  function buildRespResponse(intentKey) {
    const r = RESPONSES[intentKey];
    if (!r) return null;
    return {
      html: r.reply,
      cta: buildCTA(r.waMsg, null),
    };
  }

  /* ══════════════════════════════════════
     TIME HELPER
  ══════════════════════════════════════ */
  function getTime() {
    return new Date().toLocaleTimeString('en-BD', { hour: '2-digit', minute: '2-digit', hour12: true });
  }

  function escapeHtml(str) {
    return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
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
    win.setAttribute('aria-label', 'Trip Fly Travel Assistant');

    win.innerHTML = `
      <div class="cb-header">
        <div class="cb-avatar">
          <i class="fas fa-globe-asia"></i>
        </div>
        <div class="cb-header-text">
          <div class="cb-name">Trip Fly Assistant</div>
          <div class="cb-status">
            <span class="cb-status-dot"></span>
            <span class="cb-status-label">Online &bull; Replies within minutes</span>
          </div>
        </div>
        <button class="cb-header-close" id="cbHeaderClose" aria-label="Close chatbot">
          <i class="fas fa-times"></i>
        </button>
      </div>

      <div class="cb-messages" id="cbMessages" role="log" aria-live="polite"></div>

      <div class="cb-quick-section" id="cbQuickSection">
        <div class="cb-quick-label">Quick replies</div>
        <div class="cb-quick-wrap" id="cbQuickRow1" aria-label="Quick chatbot suggestions"></div>
      </div>

      <div class="cb-input-row">
        <input class="cb-input" id="cbInput" type="text"
          placeholder="Ask about visa, tickets or packages..." autocomplete="off" maxlength="300"/>
        <button class="cb-send-btn" id="cbSendBtn" aria-label="Send message">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        </button>
      </div>`;

    const launcher = document.createElement('button');
    launcher.id = 'chatbotLauncher';
    launcher.setAttribute('aria-label', 'Open Trip Fly Assistant');
    launcher.setAttribute('aria-expanded', 'false');
    launcher.innerHTML = `
      <div class="cb-launcher-inner">
        <i class="fas fa-comments cb-icon-open"></i>
        <i class="fas fa-times cb-icon-close"></i>
      </div>
      <span id="chatbotDot" class="hidden" aria-label="New message"></span>
      <span class="cb-tooltip">Travel assistant</span>`;

    document.body.appendChild(backdrop);
    document.body.appendChild(win);
    document.body.appendChild(launcher);
  }

  /* ══════════════════════════════════════
     BUILD QUICK BUTTONS
  ══════════════════════════════════════ */
  function buildQuickButtons() {
    const row = document.getElementById('cbQuickRow1');
    if (!row || row.dataset.quickBuilt === 'true') return;

    row.dataset.quickBuilt = 'true';
    QUICK_BUTTONS_ROW1.forEach(btn => {
      const el = document.createElement('button');
      el.className = `cb-quick-btn ${btn.type === 'dest' ? 'dest-btn' : 'service-btn'}`;
      el.textContent = btn.label;
      el.dataset.type = btn.type;
      el.dataset.key = btn.key;
      row.appendChild(el);
    });
  }
  /* ══════════════════════════════════════
     ADD MESSAGES
  ══════════════════════════════════════ */
  function addBotMsg(htmlContent, ctaHTML) {
    const msgs = document.getElementById('cbMessages');
    if (!msgs) return;

    const wrap = document.createElement('div');
    wrap.className = 'cb-msg bot';
    wrap.innerHTML = `
      <div class="cb-avatar-sm"><i class="fas fa-globe-asia"></i></div>
      <div class="cb-msg-body">
        <div class="cb-bubble">${htmlContent}${ctaHTML ? ctaHTML : ''}</div>
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
      <div class="cb-avatar-sm"><i class="fas fa-globe-asia"></i></div>
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

  function scrollMessages() {
    const msgs = document.getElementById('cbMessages');
    if (msgs) msgs.scrollTop = msgs.scrollHeight;
  }

  /* ══════════════════════════════════════
     PROCESS INPUT
  ══════════════════════════════════════ */
  function processInput(rawText) {
    const text = rawText.trim();
    const lower = text.toLowerCase();
    if (!text) return;

    addUserMsg(text);

    const destKey = findDestination(lower);
    const intentKey = findIntent(lower);
    const delay = 650 + Math.random() * 450;

    showTyping();

    setTimeout(() => {
      hideTyping();

      if (destKey && intentKey) {
        const result = buildDestResponse(destKey, intentKey);
        if (result) { addBotMsg(result.html, result.cta); return; }
      }

      if (destKey) {
        const result = buildDestResponse(destKey, null);
        if (result) { addBotMsg(result.html, result.cta); return; }
      }

      if (intentKey) {
        const result = buildRespResponse(intentKey);
        if (result) { addBotMsg(result.html, result.cta); return; }
      }

      if (/^(hi|hello|assalam|salam|hy|hey|hei)\b/.test(lower)) {
        addBotMsg(`&#128075; Welcome to <strong>Trip Fly BD!</strong><br><br>
Ask about:<br>
&bull; Visa<br>
&bull; Packages<br>
&bull; Air Tickets<br>
&bull; Honeymoon Tours`);
        return;
      }

      addBotMsg(`I can help with <strong>visa, packages, air tickets</strong> or honeymoon tours.<br><br>Choose a quick reply or type your destination.`, buildCTA(`Hello Trip Fly BD! I have a question: ${text}`, null));
    }, delay);
  }

  function handleQuickBtn(type, key) {
    const d = DESTINATIONS[key];
    const label = d ? (type === 'dest' && key === 'maldives' ? 'Maldives Package' : d.name) : (RESPONSES[key]?.label || key);

    addUserMsg(label);
    showTyping();

    setTimeout(() => {
      hideTyping();
      const result = type === 'dest' ? buildDestResponse(key, null) : buildRespResponse(key);
      if (result) addBotMsg(result.html, result.cta);
      scrollMessages();
    }, 600 + Math.random() * 350);
  }

  let isOpen = false;
  let welcomed = false;

  function openChat() {
    const win = document.getElementById('chatbotWindow');
    const launcher = document.getElementById('chatbotLauncher');
    const backdrop = document.getElementById('chatbotBackdrop');
    const dot = document.getElementById('chatbotDot');

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
        addBotMsg(`&#128075; Welcome to <strong>Trip Fly BD!</strong><br><br>
Ask about:<br>
&bull; Visa<br>
&bull; Packages<br>
&bull; Air Tickets<br>
&bull; Honeymoon Tours`);
      }, 650);
    }

    setTimeout(() => document.getElementById('cbInput')?.focus(), 450);
  }

  function closeChat() {
    const win = document.getElementById('chatbotWindow');
    const launcher = document.getElementById('chatbotLauncher');
    const backdrop = document.getElementById('chatbotBackdrop');

    isOpen = false;
    win?.classList.remove('open');
    launcher?.classList.remove('open');
    backdrop?.classList.remove('show');
    launcher?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
  /* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
     INIT
  ══════════════════════════════════════ */
  function init() {
    buildChatbot();

    const launcher  = document.getElementById('chatbotLauncher');
    const closeBtn  = document.getElementById('cbHeaderClose');
    const backdrop  = document.getElementById('chatbotBackdrop');
    const sendBtn   = document.getElementById('cbSendBtn');
    const input     = document.getElementById('cbInput');

    launcher?.addEventListener('click', () => isOpen ? closeChat() : openChat());
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

    // Event delegation for quick buttons (both rows)
    document.getElementById('chatbotWindow')?.addEventListener('click', e => {
      const btn = e.target.closest('.cb-quick-btn');
      if (!btn) return;
      handleQuickBtn(btn.dataset.type, btn.dataset.key);
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && isOpen) closeChat();
    });

    // Notification dot after delay
    setTimeout(() => {
      const dot = document.getElementById('chatbotDot');
      if (dot && !isOpen) dot.classList.remove('hidden');
    }, 3500);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();