<<<<<<< HEAD
/* ============================================================
   TRIP FLY BD — DESTINATIONS.JS
   Premium Visa Modal | Filter | Broken Image Fallback
   Apply Now → Google Sheets
============================================================ */
'use strict';

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxNNt8_3RtKAAHf2X4QjCrlfgSqPJCX1UmDNmT_u0ltneXI4sRhirNRzq9j2k4l4gwinQ/exec';

/* CHANGE THIS TO YOUR REAL WHATSAPP NUMBER */
const WHATSAPP_NUMBER = '88017XXXXXXXX';

const DEFAULT_IMAGE =
  'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80&fit=crop';

/* ── Broken image fallback ── */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.dest-card-img img').forEach((img) => {
    img.addEventListener('error', () => {
      img.src = DEFAULT_IMAGE;
      img.alt = 'Trip Fly BD Travel Destination';
    });
  });
});

/* ── Visa Data ── */
const VISA_DATA = {
  bangladesh: {
    country: 'Bangladesh',
    flag: '🇧🇩',
    region: 'South Asia',
    processingTime: 'Domestic travel',
    validity: 'N/A',
    price: 'Domestic Ticket',
    requirements: [
      req('fas fa-id-card', 'NID / Passport', 'Valid NID or passport may be required for domestic ticketing and hotel booking.'),
      req('fas fa-plane', 'Domestic Air Ticket', 'We arrange tickets for all available domestic routes in Bangladesh.'),
      req('fas fa-hotel', 'Hotel Booking', 'Hotel booking support is available for Cox’s Bazar, Sylhet, Chittagong and more.')
    ],
    tips: [
      'Popular domestic routes: Dhaka ↔ Cox’s Bazar, Sylhet, Chittagong, Saidpur, Rajshahi, Barishal, Jashore.',
      'Book early during Eid, public holidays and peak travel seasons.'
    ]
  },

  india: visa('India', '🇮🇳', 'South Asia', '3–7 business days', '30–180 days', [
    'Valid passport minimum 6 months',
    'Recent passport-size photo',
    '3–6 months bank statement',
    'NID / Birth certificate',
    'Hotel booking or invitation letter',
    'Return air ticket'
  ], ['Delhi, Kolkata, Kashmir, Darjeeling and Goa are popular routes.', 'Apply early for smooth processing.']),

  pakistan: visa('Pakistan', '🇵🇰', 'South Asia', '7–14 business days', '30–90 days', [
    'Valid passport minimum 6 months',
    'Recent passport-size photo',
    'Bank statement',
    'NID copy',
    'Hotel booking or invitation letter',
    'Return air ticket'
  ], ['Lahore, Islamabad and Hunza are popular destinations.', 'Document accuracy is very important.']),

  nepal: visa('Nepal', '🇳🇵', 'South Asia', 'On arrival / quick processing', '15, 30 or 90 days', [
    'Valid passport',
    'Passport-size photo',
    'Return ticket',
    'Travel fund',
    'Hotel booking'
  ], ['Carry USD cash for visa fee.', 'Kathmandu, Pokhara and Nagarkot are popular places.']),

  bhutan: visa('Bhutan', '🇧🇹', 'South Asia', '5–7 business days', 'Based on itinerary', [
    'Valid passport',
    'Recent passport-size photos',
    'Travel itinerary',
    'Hotel booking',
    'Return air ticket'
  ], ['Bhutan is best for peaceful nature travel.', 'Tour package planning is recommended.']),

  srilanka: visa('Sri Lanka', '🇱🇰', 'South Asia', '1–3 business days', '30 days', [
    'Valid passport',
    'Recent passport-size photo',
    'Bank statement',
    'Hotel booking',
    'Return air ticket'
  ], ['Colombo, Kandy, Bentota and Ella are popular.', 'Carry printed visa approval while travelling.']),

  maldives: visa('Maldives', '🇲🇻', 'South Asia', 'On arrival', '30 days', [
    'Valid passport',
    'Confirmed resort/hotel booking',
    'Return air ticket',
    'Proof of funds'
  ], ['Best for honeymoon and luxury travel.', 'Confirmed hotel booking is very important.']),

  afghanistan: visa('Afghanistan', '🇦🇫', 'South Asia', 'Contact us', 'Varies', [
    'Valid passport',
    'Purpose of visit',
    'Invitation/supporting documents',
    'Latest travel advisory check'
  ], ['Contact Trip Fly BD for updated guidance.', 'Check safety advisory before planning.']),

  thailand: visa('Thailand', '🇹🇭', 'Southeast Asia', '3–5 business days', '60 days', [
    'Valid passport minimum 6 months',
    'Recent passport-size photo',
    'Bank statement',
    'NID copy',
    'Hotel booking',
    'Return ticket'
  ], ['Bangkok, Pattaya, Phuket and Krabi are popular.', 'Thailand is ideal for family and couple tours.']),

  malaysia: visa('Malaysia', '🇲🇾', 'Southeast Asia', '3–5 business days', '30 days', [
    'Valid passport',
    'Photo',
    'Bank statement',
    'Hotel booking',
    'Return ticket'
  ], ['Kuala Lumpur, Langkawi and Penang are popular.', 'Good for family and group travel.']),

  singapore: visa('Singapore', '🇸🇬', 'Southeast Asia', '5–7 business days', '30 days', [
    'Valid passport',
    'Photo',
    'Bank statement',
    'Profession proof',
    'Hotel booking',
    'Return ticket'
  ], ['Singapore is perfect for premium city travel.', 'Documents must be clean and accurate.']),

  indonesia: visa('Indonesia', '🇮🇩', 'Southeast Asia', 'On arrival / e-Visa', '30 days', [
    'Valid passport',
    'Photo',
    'Hotel booking',
    'Return ticket',
    'Travel fund'
  ], ['Bali is the most popular destination.', 'Good for honeymoon and beach trips.']),

  philippines: visa('Philippines', '🇵🇭', 'Southeast Asia', '5–7 business days', '30 days', [
    'Valid passport',
    'Photo',
    'Bank statement',
    'Hotel booking',
    'Return ticket'
  ], ['Boracay, Palawan and Cebu are popular.', 'Best travel time is dry season.']),

  china: visa('China', '🇨🇳', 'East Asia', '4–7 business days', '30–90 days', [
    'Valid passport',
    'Photo',
    'Bank statement',
    'NID copy',
    'Visa application form',
    'Hotel booking or invitation letter',
    'Return ticket'
  ], ['Beijing, Shanghai and Guangzhou are popular.', 'Application form must be filled carefully.']),

  japan: visa('Japan', '🇯🇵', 'East Asia', '5–10 business days', '15–30 days', [
    'Valid passport',
    'Japan visa photo',
    '6 months bank statement',
    'NID copy',
    'Job/business/student proof',
    'Day-by-day itinerary',
    'Hotel booking',
    'Return ticket'
  ], ['Japan requires detailed itinerary.', 'Tokyo, Kyoto and Osaka are popular.']),

  dubai: visa('Dubai / UAE', '🇦🇪', 'Middle East', '3–5 business days', '30 or 60 days', [
    'Valid passport',
    'Photo',
    'NID copy',
    'Hotel booking',
    'Return air ticket'
  ], ['Dubai is popular for shopping, family tours and luxury travel.', '30-day and 60-day visa options may be available.']),

  turkey: visa('Turkey', '🇹🇷', 'Middle East / Europe', '3–7 business days', '30 days', [
    'Valid passport',
    'Photo',
    'Bank statement',
    'Hotel booking',
    'Return ticket',
    'Travel insurance'
  ], ['Istanbul and Cappadocia are popular.', 'Turkey is excellent for couple and family packages.']),

  saudiarabia: visa('Saudi Arabia', '🇸🇦', 'Middle East', '3–7 business days', '30–90 days', [
    'Valid passport',
    'Photo',
    'Bank statement',
    'Hotel booking',
    'Return ticket'
  ], ['Riyadh, Jeddah, AlUla, Makkah and Madinah are popular.', 'Umrah visa process is separate.']),

  qatar: visa('Qatar', '🇶🇦', 'Middle East', '3–5 business days', '30 days', [
    'Valid passport',
    'Photo',
    'Hotel booking',
    'Return ticket',
    'Travel fund'
  ], ['Doha, The Pearl and Souq Waqif are popular.', 'Qatar is great for short premium trips.']),

  uk: visa('United Kingdom', '🇬🇧', 'Europe', '15–25 business days', '6 months', [
    'Valid passport',
    'Previous passports',
    'UK standard photo',
    '6 months bank statement',
    'Job/business proof',
    'Tax documents',
    'Hotel booking or invitation',
    'Travel itinerary'
  ], ['Strong home ties are very important.', 'Biometrics appointment is required.']),

  portugal: visa('Portugal', '🇵🇹', 'Europe', '15–30 business days', '90 days Schengen', [
    'Valid passport',
    'Schengen photo',
    'Bank statement',
    'Job/business proof',
    'Travel insurance',
    'Hotel booking',
    'Return ticket'
  ], ['Portugal visa is Schengen visa.', 'Travel insurance is mandatory.']),

  canada: visa('Canada', '🇨🇦', 'North America', '20–60 business days', 'Usually up to passport validity', [
    'Valid passport',
    'Photo',
    'Bank statement',
    'Employment/business proof',
    'Purpose of visit',
    'Invitation letter if applicable',
    'Biometrics'
  ], ['Strong financial profile helps.', 'Apply early because processing can take time.']),

  usa: visa('United States', '🇺🇸', 'North America', 'Appointment based', 'Usually multiple years if approved', [
    'Valid passport',
    'DS-160 confirmation',
    'Photo',
    'Bank statement',
    'Job/business/student proof',
    'Strong home ties',
    'Interview preparation'
  ], ['US visa requires interview.', 'Strong ties to Bangladesh are important.']),

  australia: visa('Australia', '🇦🇺', 'Oceania', '20–40 business days', '3 months to 1 year', [
    'Valid passport',
    'Photo',
    'Bank statement',
    'Job/business proof',
    'Travel insurance',
    'Hotel booking',
    'Return ticket'
  ], ['Sydney, Melbourne and Gold Coast are popular.', 'Strong financial documents are important.']),

  southafrica: visa('South Africa', '🇿🇦', 'Africa', '10–15 business days', '30 days', [
    'Valid passport',
    'Photo',
    'Bank statement',
    'NID copy',
    'Job/business proof',
    'Travel insurance',
    'Hotel booking',
    'Return ticket'
  ], ['Cape Town and Kruger safari are popular.', 'Travel insurance is recommended.'])
};

function req(icon, label, detail) {
  return { icon, label, detail };
}

function visa(country, flag, region, processingTime, validity, docs, tips) {
  const iconMap = [
    'fas fa-passport',
    'fas fa-camera',
    'fas fa-university',
    'fas fa-id-card',
    'fas fa-briefcase',
    'fas fa-hotel',
    'fas fa-plane',
    'fas fa-shield-alt'
  ];

  return {
    country,
    flag,
    region,
    processingTime,
    validity,
    price: 'Contact for Package',
    requirements: docs.map((doc, index) =>
      req(iconMap[index] || 'fas fa-file-alt', doc, doc)
    ),
    tips
  };
}

/* ── Filter System ── */
(function initFilter() {
  const btns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.dest-card');
  const countEl = document.getElementById('destCount');

  if (!btns.length || !cards.length) return;

  const updateCount = () => {
    const visible = document.querySelectorAll('.dest-card:not(.hide)').length;
    if (countEl) countEl.textContent = visible;
  };

  btns.forEach((btn) => {
    btn.addEventListener('click', () => {
      btns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      cards.forEach((card) => {
        const match = filter === 'all' || card.dataset.region === filter;
        card.classList.toggle('hide', !match);
      });

      updateCount();
    });
  });

  updateCount();
})();

/* ── Visa Modal ── */
(function initVisaModal() {
  const overlay = document.getElementById('visaModalOverlay');
  const modal = document.getElementById('visaModal');

  if (!overlay || !modal) return;

  const elFlag = document.getElementById('vm-flag');
  const elCountry = document.getElementById('vm-country');
  const elSub = document.getElementById('vm-subtitle');
  const elStats = document.getElementById('vm-stats');
  const elReqs = document.getElementById('vm-reqs');
  const elTips = document.getElementById('vm-tips');
  const elWABtn = document.getElementById('vm-wa-btn');

  function openModal(key) {
    const data = VISA_DATA[key];

    if (!data) {
      alert('Visa information is updating. Please contact Trip Fly BD on WhatsApp.');
      return;
    }

    elFlag.textContent = data.flag;
    elCountry.textContent = data.country;
    elSub.textContent = `Tourist Visa Requirements — ${data.region}`;

    elStats.innerHTML = `
      <div class="vm-stat">
        <i class="fas fa-clock"></i>
        <div>
          <div class="vm-stat-label">Processing</div>
          <div class="vm-stat-value">${data.processingTime}</div>
        </div>
      </div>
      <div class="vm-stat">
        <i class="fas fa-calendar-check"></i>
        <div>
          <div class="vm-stat-label">Validity</div>
          <div class="vm-stat-value">${data.validity}</div>
        </div>
      </div>
      <div class="vm-stat">
        <i class="fas fa-tag"></i>
        <div>
          <div class="vm-stat-label">Package</div>
          <div class="vm-stat-value">${data.price}</div>
        </div>
      </div>
    `;

    elReqs.innerHTML = `
      <div class="vm-section-title">
        <i class="fas fa-clipboard-list"></i> Required Documents
      </div>
      <div class="vm-req-list">
        ${data.requirements.map(item => `
          <div class="vm-req-item">
            <div class="vm-req-icon"><i class="${item.icon}"></i></div>
            <div class="vm-req-text">
              <div class="vm-req-label">${item.label}</div>
              <div class="vm-req-detail">${item.detail}</div>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    elTips.innerHTML = `
      <div class="vm-tips">
        <div class="vm-tips-title">
          <i class="fas fa-lightbulb"></i> Travel Tips
        </div>
        ${data.tips.map(tip => `
          <div class="vm-tip">
            <i class="fas fa-star"></i>
            <span>${tip}</span>
          </div>
        `).join('')}
      </div>
    `;

    if (elWABtn) {
      const msg = encodeURIComponent(
        `Hello Trip Fly BD! I need ${data.flag} ${data.country} tourist visa assistance.`
      );
      elWABtn.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
    }

    const applyBtn = document.getElementById('vmApplyBtn');

    if (applyBtn) {
      applyBtn.disabled = false;
      applyBtn.innerHTML = '<i class="fab fa-whatsapp"></i> Apply Now';
      applyBtn.style.background = '';

      const vmStatus = document.getElementById('vmStatus');
      if (vmStatus) {
        vmStatus.className = 'vm-submit-status';
        vmStatus.innerHTML = '';
      }

      const vmName = document.getElementById('vmName');
      const vmPhone = document.getElementById('vmPhone');

      if (vmName) vmName.value = '';
      if (vmPhone) vmPhone.value = '';

      applyBtn.onclick = () =>
        submitVisaInquiry(data.country, data.flag, data.region);
    }

    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    modal.scrollTop = 0;
  }

  function closeModal() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';

    document.querySelectorAll('.dest-card').forEach(card => {
      card.classList.remove('active-card');
    });
  }

  document.querySelectorAll('.dest-card').forEach((card) => {
    const key = card.dataset.visaKey;

    card.addEventListener('click', () => {
      document.querySelectorAll('.dest-card').forEach(c =>
        c.classList.remove('active-card')
      );

      card.classList.add('active-card');

      if (key) openModal(key);
    });
  });

  document.querySelectorAll('.dest-visa-btn').forEach((btn) => {
    btn.addEventListener('click', (event) => {
      event.stopPropagation();

      const card = btn.closest('.dest-card');
      const key = card?.dataset.visaKey;

      document.querySelectorAll('.dest-card').forEach(c =>
        c.classList.remove('active-card')
      );

      card?.classList.add('active-card');

      if (key) openModal(key);
    });
  });

  document.getElementById('vmCloseBtn')?.addEventListener('click', closeModal);

  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) closeModal();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeModal();
  });
})();

/* ── Apply Now → Google Sheet ── */
async function submitVisaInquiry(country, flag, region) {
  const btn = document.getElementById('vmApplyBtn');
  const status = document.getElementById('vmStatus');

  if (!btn) return;

  const name = document.getElementById('vmName')?.value.trim();
  const phone = document.getElementById('vmPhone')?.value.trim();

  if (!name || !phone) {
    if (status) {
      status.className = 'vm-submit-status error show';
      status.innerHTML =
        '<i class="fas fa-exclamation-circle"></i> Please enter your Name and Phone.';
    }
    return;
  }

  btn.disabled = true;
  btn.innerHTML = '<span class="btn-spinner"></span> Sending...';

  if (status) {
    status.className = 'vm-submit-status';
    status.innerHTML = '';
  }

  const payload = {
    sheet: 'Visa Inquiries',
    timestamp: new Date().toLocaleString('en-BD', {
      timeZone: 'Asia/Dhaka'
    }),
    name,
    phone,
    country: `${flag} ${country}`,
    region,
    source: 'Visa Modal — Trip Fly BD Website'
  };

  try {
    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (result.status === 'success') {
      btn.innerHTML = '<i class="fas fa-check"></i> Inquiry Sent!';

      if (status) {
        status.className = 'vm-submit-status success show';
        status.innerHTML =
          '<i class="fas fa-check-circle"></i> Inquiry saved! We will contact you soon.';
      }

      setTimeout(() => {
        const msg = encodeURIComponent(
          `Hello Trip Fly BD! I applied for ${flag} ${country} tourist visa.\nName: ${name}\nPhone: ${phone}`
        );
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
      }, 1000);
    } else {
      throw new Error(result.message || 'Submission failed');
    }
  } catch (error) {
    console.error('Visa inquiry error:', error);

    btn.disabled = false;
    btn.innerHTML = '<i class="fab fa-whatsapp"></i> Apply via WhatsApp';

    if (status) {
      status.className = 'vm-submit-status error show';
      status.innerHTML =
        '<i class="fas fa-times-circle"></i> Error saving. Opening WhatsApp...';
    }

    setTimeout(() => {
      const msg = encodeURIComponent(
        `Hello Trip Fly BD! I need ${flag} ${country} tourist visa assistance.\nName: ${name}\nPhone: ${phone}`
      );
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
    }, 1000);
  }
}
=======
/* DESTINATIONS JS */
document.querySelectorAll('.ftab').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.ftab').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const f=btn.dataset.f;
    document.querySelectorAll('.dest-full-card').forEach(card=>{
      if(f==='all'||card.dataset.cat===f){
        card.classList.remove('hidden');
        card.style.animation='none'; card.offsetHeight; card.style.animation='';
      } else { card.classList.add('hidden'); }
    });
  });
});
>>>>>>> ef590147a10e3748a2fc0bbd04a8c0ec28f26565
