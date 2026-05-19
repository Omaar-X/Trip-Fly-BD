/* ============================================================
   TRIP FLY BD — DESTINATIONS.JS
   Premium Visa Modal | Filter | Broken Image Fallback
   Start Inquiry -> Google Sheets | Official Visa Portals
   Updated with ZIP checklist data from Trip Fly BD docs
============================================================ */
'use strict';

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxNNt8_3RtKAAHf2X4QjCrlfgSqPJCX1UmDNmT_u0ltneXI4sRhirNRzq9j2k4l4gwinQ/exec';
const WHATSAPP_NUMBER = '8801898801939';
const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80&fit=crop';

/* ── Broken image fallback ── */
const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

function onReady(callback) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', callback, { once: true });
  } else {
    callback();
  }
}

onReady(() => {
  $$('.dest-card-img img').forEach((img) => {
    if (img.dataset.fallbackBound === 'true') return;
    img.dataset.fallbackBound = 'true';

    img.addEventListener('error', () => {
      img.src = DEFAULT_IMAGE;
      img.alt = 'Trip Fly BD Travel Destination';
    });
  });

  addPremiumCardBadges();
  normalizeDestinationCtas();
  initDestinationPackageModals();
});

/* ── Helpers ── */
function req(icon, label, detail) {
  return { icon, label, detail };
}

function link(label, url, note) {
  return { label, url, note };
}

/* ── VISA DATA — Enriched from Trip Fly BD official checklist ZIP ── */
const VISA_DATA = {

  bangladesh: {
    country: 'Bangladesh',
    flag: '🇧🇩',
    region: 'South Asia',
    processingTime: 'Domestic travel',
    validity: 'N/A',
    price: 'Domestic Ticket',
    requirements: [
      req('fas fa-id-card',   'NID / Passport',    'Valid NID or passport required for domestic ticketing and hotel booking.'),
      req('fas fa-plane',     'Domestic Ticket',   'We arrange tickets for all available domestic routes in Bangladesh.'),
      req('fas fa-hotel',     'Hotel Booking',     'Hotel booking support for Cox\'s Bazar, Sylhet, Chittagong and more.')
    ],
    tips: [
      'Popular domestic routes: Dhaka ↔ Cox\'s Bazar, Sylhet, Chittagong, Saidpur, Rajshahi, Barishal, Jashore.',
      'Book early during Eid, public holidays and peak travel seasons.'
    ],
    officialLinks: [
      link('Civil Aviation Authority of Bangladesh', 'https://www.caab.gov.bd', 'Official aviation authority for domestic flights.'),
      link('Biman Bangladesh Airlines', 'https://www.biman-airlines.com', 'National carrier for domestic and international routes.')
    ]
  },

  india: {
    country: 'India',
    flag: '🇮🇳',
    region: 'South Asia',
    processingTime: '3–7 business days',
    validity: '30–180 days',
    price: 'Contact for Package',
    requirements: [
      req('fas fa-passport',    'Valid Passport (min. 6 months)', 'Passport must be valid for at least 6 months from travel date with old passports.'),
      req('fas fa-camera',      'Recent Passport-size Photo',     'White background, recent photograph as per Indian visa specifications.'),
      req('fas fa-university',  'Bank Statement (3–6 months)',    'Personal bank statement showing sufficient travel funds.'),
      req('fas fa-id-card',     'NID / Birth Certificate',       'National ID card or birth certificate copy required.'),
      req('fas fa-hotel',       'Hotel Booking or Invitation',   'Confirmed hotel reservation or host invitation letter.'),
      req('fas fa-plane',       'Return Air Ticket',              'Confirmed return air ticket booking copy.')
    ],
    tips: [
      'Delhi, Kolkata, Kashmir, Darjeeling and Goa are popular routes from Bangladesh.',
      'Apply early — peak season processing may take longer.',
      'E-visa is available for some travel categories via the official portal.'
    ],
    officialLinks: [
      link('India e-Visa Portal', 'https://indianvisaonline.gov.in/evisa/', 'Apply for Indian e-Visa online — official government portal.'),
      link('Indian High Commission Dhaka', 'https://www.hcidhaka.gov.in', 'Official Indian High Commission in Bangladesh.'),
      link('India Visa Information', 'https://www.mha.gov.in', 'Ministry of Home Affairs — visa policy and updates.')
    ]
  },

  pakistan: {
    country: 'Pakistan',
    flag: '🇵🇰',
    region: 'South Asia',
    processingTime: '7–14 business days',
    validity: '30–90 days',
    price: 'Contact for Package',
    requirements: [
      req('fas fa-passport',   'Valid Passport (min. 6 months)', 'Passport with minimum 6 months validity including old passports.'),
      req('fas fa-camera',     'Passport-size Photo',           'Recent white background photograph.'),
      req('fas fa-university', 'Bank Statement',                 'Personal bank statement for last 3–6 months.'),
      req('fas fa-id-card',    'NID Card Copy',                  'National Identity Card copy required.'),
      req('fas fa-hotel',      'Hotel Booking / Invitation',    'Confirmed hotel or host invitation letter.'),
      req('fas fa-plane',      'Return Air Ticket',              'Return air ticket booking copy.')
    ],
    tips: [
      'Lahore, Islamabad and Hunza are popular destinations.',
      'Document accuracy is very important for Pakistan visa approval.'
    ],
    officialLinks: [
      link('Pakistan Online Visa System', 'https://visa.nadra.gov.pk', 'Official Pakistan e-Visa portal — apply and track online.'),
      link('Pakistan High Commission Dhaka', 'http://www.mofa.gov.pk/bangladesh/', 'Official Pakistan High Commission in Bangladesh.')
    ]
  },

  nepal: {
    country: 'Nepal',
    flag: '🇳🇵',
    region: 'South Asia',
    processingTime: 'On arrival / quick processing',
    validity: '15, 30 or 90 days',
    price: 'Contact for Package',
    requirements: [
      req('fas fa-passport', 'Valid Passport',      'Any valid passport accepted for Nepal visa.'),
      req('fas fa-camera',   'Passport-size Photo', 'Recent photograph for visa sticker.'),
      req('fas fa-plane',    'Return Ticket',        'Confirmed return or onward ticket.'),
      req('fas fa-wallet',   'Travel Funds',         'Proof of sufficient funds for stay.'),
      req('fas fa-hotel',    'Hotel Booking',        'Hotel or accommodation booking copy.')
    ],
    tips: [
      'Carry USD cash for visa fee — available on arrival at Tribhuvan International Airport.',
      'Kathmandu, Pokhara and Nagarkot are must-visit places.'
    ],
    officialLinks: [
      link('Nepal Department of Immigration', 'https://www.immigration.gov.np', 'Official Nepal immigration and visa portal.'),
      link('Nepal Tourism Board', 'https://www.welcomenepal.com', 'Official Nepal Tourism information.')
    ]
  },

  bhutan: {
    country: 'Bhutan',
    flag: '🇧🇹',
    region: 'South Asia',
    processingTime: '5–7 business days',
    validity: 'Based on itinerary',
    price: 'Contact for Package',
    requirements: [
      req('fas fa-passport', 'Valid Passport',         'Valid passport required — Bhutan visa attached to approved tour.'),
      req('fas fa-camera',   'Recent Photos',          'Passport-size photographs.'),
      req('fas fa-map',      'Travel Itinerary',       'Complete day-by-day itinerary required.'),
      req('fas fa-hotel',    'Hotel Booking',          'All accommodation must be pre-booked via licensed Bhutan tour operator.'),
      req('fas fa-plane',    'Return Air Ticket',      'Return air ticket required.')
    ],
    tips: [
      'Bhutan is best for peaceful nature travel — individual tour packages required.',
      'All visits must be arranged through a licensed Bhutanese tour operator.'
    ],
    officialLinks: [
      link('Department of Immigration Bhutan', 'https://www.doi.gov.bt', 'Official Bhutan Department of Immigration.'),
      link('Tourism Council of Bhutan', 'https://www.tourism.gov.bt', 'Official Bhutan tourism and visa entry rules.')
    ]
  },

  srilanka: {
    country: 'Sri Lanka',
    flag: '🇱🇰',
    region: 'South Asia',
    processingTime: '1–3 business days',
    validity: '30 days',
    price: 'Contact for Package',
    requirements: [
      req('fas fa-passport',   'Valid Passport',       'Valid passport with at least 6 months validity.'),
      req('fas fa-camera',     'Passport-size Photo',  'Recent photograph.'),
      req('fas fa-university', 'Bank Statement',       '3–6 months personal bank statement.'),
      req('fas fa-hotel',      'Hotel Booking',        'Confirmed hotel reservation.'),
      req('fas fa-plane',      'Return Air Ticket',    'Return ticket booking copy.')
    ],
    tips: [
      'Colombo, Kandy, Bentota and Ella are popular destinations.',
      'Carry printed ETA approval while travelling — available via official portal.'
    ],
    officialLinks: [
      link('Sri Lanka ETA (e-Visa)', 'https://www.eta.gov.lk', 'Official Sri Lanka Electronic Travel Authorization portal.'),
      link('Sri Lanka Department of Immigration', 'http://www.immigration.gov.lk', 'Official immigration and visa information.')
    ]
  },

  maldives: {
    country: 'Maldives',
    flag: '🇲🇻',
    region: 'South Asia',
    processingTime: 'On arrival (30 days free)',
    validity: '30 days (extendable)',
    price: 'Contact for Package',
    requirements: [
      req('fas fa-passport', 'Valid Passport',          'Valid passport with at least 6 months validity.'),
      req('fas fa-hotel',    'Confirmed Resort Booking', 'Resort or hotel booking confirmation mandatory.'),
      req('fas fa-plane',    'Return Air Ticket',        'Confirmed return air ticket.'),
      req('fas fa-wallet',   'Proof of Funds',           'Proof of sufficient travel funds for stay.')
    ],
    tips: [
      'Best for honeymoon and luxury travel — Maldives grants 30-day free visa on arrival.',
      'Confirmed hotel / resort booking is mandatory at immigration.'
    ],
    officialLinks: [
      link('Maldives Immigration', 'https://immigration.gov.mv', 'Official Maldives immigration — visa on arrival info.'),
      link('Visit Maldives', 'https://visitmaldives.com', 'Official Maldives tourism portal.')
    ]
  },

  afghanistan: {
    country: 'Afghanistan',
    flag: '🇦🇫',
    region: 'South Asia',
    processingTime: 'Contact us',
    validity: 'Varies',
    price: 'Contact for Package',
    requirements: [
      req('fas fa-passport',     'Valid Passport',                'Valid passport required.'),
      req('fas fa-file-alt',     'Purpose of Visit Letter',      'Clear purpose of visit documentation.'),
      req('fas fa-envelope',     'Invitation / Supporting Docs', 'Host invitation or supporting documents.'),
      req('fas fa-exclamation-triangle', 'Travel Advisory Check', 'Check official government travel advisory before planning.')
    ],
    tips: [
      'Contact Trip Fly BD for the most current guidance.',
      'Check your government\'s travel safety advisory before planning.'
    ],
    officialLinks: [
      link('Bangladesh MOFA Travel Advisories', 'https://mofa.gov.bd', 'Check Bangladesh Ministry of Foreign Affairs for safety advisories.'),
      link('Afghan e-Visa Portal', 'https://evisa.moi.gov.af', 'Official Afghanistan Ministry of Interior e-visa portal.')
    ]
  },

  thailand: {
    country: 'Thailand',
    flag: '🇹🇭',
    region: 'Southeast Asia',
    processingTime: '3–5 business days',
    validity: '60 days (tourist visa)',
    price: 'Contact for Package',
    requirements: [
      req('fas fa-passport',    'Valid Passport (min. 6 months) + Old Passports', 'All old passports must be submitted along with current passport.'),
      req('fas fa-camera',      'Passport-size Photos (white background)',         'Standard passport-size photographs with white background.'),
      req('fas fa-university',  'Bank Statement (last 6 months)',                  'Personal bank statement showing sufficient travel funds.'),
      req('fas fa-id-card',     'NID Card Copy',                                  'National ID card copy required.'),
      req('fas fa-file-invoice','TIN Certificate + Acknowledgement Slip',         'TIN certificate with latest acknowledgement slip.'),
      req('fas fa-ring',        'Marriage Certificate (for family travel)',       'Marriage certificate required for couple/family travel.'),
      req('fas fa-baby',        'Child Birth Certificate',                        'Child birth certificate required for family travel.'),
      req('fas fa-hotel',       'Hotel Booking',                                  'Confirmed hotel booking for the duration of stay.'),
      req('fas fa-plane',       'Return Air Ticket',                              'Confirmed return air ticket booking.'),
      req('fas fa-briefcase',   'Visiting Card',                                  'Personal or professional visiting card.'),
      req('fas fa-scroll',      'Blank Office Pad (for professionals)',            'Blank company letterhead pad for business persons.'),
      req('fas fa-user-md',     'BMDC Certificate (for doctors)',                  'Bangladesh Medical & Dental Council certificate for doctors.')
    ],
    tips: [
      'Bangkok, Pattaya, Phuket and Krabi are most popular destinations from Bangladesh.',
      'Thailand is ideal for family, couple and group tours — apply at least 2 weeks before travel.',
      'Thailand tourist visa is typically valid for 60 days with a 30-day extension possible.',
      'NOC required for job holders; notarized trade license required for businesspersons.'
    ],
    officialLinks: [
      link('Thai e-Visa Portal', 'https://www.thaievisa.go.th', 'Official Thailand e-Visa online application portal.'),
      link('Royal Thai Embassy Dhaka', 'https://dhaka.thaiembassy.org', 'Official Royal Thai Embassy in Dhaka, Bangladesh.'),
      link('Thailand Immigration Bureau', 'https://www.immigration.go.th', 'Official Thailand Immigration Bureau — visa rules and extensions.')
    ]
  },

  malaysia: {
    country: 'Malaysia',
    flag: '🇲🇾',
    region: 'Southeast Asia',
    processingTime: '5–7 business days',
    validity: '30 days',
    price: 'Contact for Package',
    requirements: [
      req('fas fa-passport',   'Valid Passport (min. 6 months) + Old Passport', 'Valid passport with all old passports.'),
      req('fas fa-camera',     'Passport-size Photo',                            'Standard passport-size photograph.'),
      req('fas fa-briefcase',  'Visiting Card',                                  'Personal or professional visiting card.'),
      req('fas fa-university', 'Bank Statement (last 6 months)',                 'Personal or salary bank statement for last 6 months.'),
      req('fas fa-piggy-bank', 'Bank Solvency Certificate',                     'Bank solvency certificate from your bank.'),
      req('fas fa-file-alt',   'NOC (for employees)',                            'No Objection Certificate on company letterhead.'),
      req('fas fa-store',      'Notarized Trade License (for businesspersons)', 'Trade license copy notarized in English.'),
      req('fas fa-graduation-cap', 'Student ID Card (for students)',            'Valid student ID card from institution.')
    ],
    tips: [
      'Kuala Lumpur, Langkawi, Penang and Genting are popular destinations.',
      'Good for family and group travel — visa fee approx ৳6,000.',
      'Salary statement accepted in place of bank statement for job holders.'
    ],
    officialLinks: [
      link('Malaysia eNTRI / eVISA', 'https://windowmalaysia.my', 'Official Malaysia online visa application portal.'),
      link('Malaysian High Commission Dhaka', 'https://www.kln.gov.my/web/bgd_dhaka/', 'Official Malaysian High Commission in Bangladesh.'),
      link('Malaysia Immigration Department', 'https://www.imi.gov.my', 'Official Malaysia Immigration Department — visa rules.')
    ]
  },

  singapore: {
    country: 'Singapore',
    flag: '🇸🇬',
    region: 'Southeast Asia',
    processingTime: '5–7 business days',
    validity: '30 days',
    price: 'Contact for Package',
    requirements: [
      req('fas fa-passport',    'Valid Passport (min. 6 months) + Old Passport', 'Valid passport with old passports.'),
      req('fas fa-camera',      'Photos 35×45mm — Matt Paper',                   'Matt paper photographs sized 35×45mm as per Singapore specs.'),
      req('fas fa-briefcase',   'Visiting Card',                                  'Personal or professional visiting card.'),
      req('fas fa-university',  'Bank Statement (last 6 months)',                 'Personal or salary statement for last 6 months.'),
      req('fas fa-piggy-bank',  'Bank Solvency Certificate',                     'Bank solvency certificate.'),
      req('fas fa-file-alt',    'NOC (for employees)',                            'No Objection Certificate required.'),
      req('fas fa-store',       'Notarized Trade License (for businesspersons)', 'Trade license notarized in English.'),
      req('fas fa-plane',       'Air Ticket Booking',                             'Confirmed return air ticket booking.'),
      req('fas fa-hotel',       'Hotel Voucher',                                  'Confirmed hotel booking voucher.'),
      req('fas fa-envelope',    'LOI — Letter of Invitation from Singapore',     'Letter of invitation from a Singapore-based host (if applicable).'),
      req('fas fa-user-md',     'BMDC Certificate (for doctors)',                 'BMDC certificate for doctors.')
    ],
    tips: [
      'Singapore is perfect for premium city travel — visa fee approx ৳6,500.',
      'LOI (Letter of Invitation) from a Singapore contact significantly improves approval chances.',
      'Documents must be clean, accurate and complete — Singapore has strict scrutiny.',
      'Student ID accepted for students in place of job-related documents.'
    ],
    officialLinks: [
      link('Singapore SAVE Portal (e-Visa)', 'https://eservices.ica.gov.sg/esvclandingpage/save', 'Official Singapore e-Visa (SAVE) application portal.'),
      link('Singapore High Commission Dhaka', 'https://www.mfa.gov.sg/dhaka', 'Official Singapore High Commission in Bangladesh.'),
      link('Singapore ICA (Immigration)', 'https://www.ica.gov.sg', 'Official Singapore Immigration and Checkpoints Authority.')
    ]
  },

  indonesia: {
    country: 'Indonesia',
    flag: '🇮🇩',
    region: 'Southeast Asia',
    processingTime: 'On arrival / e-Visa',
    validity: '30 days',
    price: 'Contact for Package',
    requirements: [
      req('fas fa-passport', 'Valid Passport',        'Passport with at least 6 months validity.'),
      req('fas fa-camera',   'Passport-size Photo',   'Recent photograph.'),
      req('fas fa-hotel',    'Hotel Booking',         'Confirmed hotel or resort booking.'),
      req('fas fa-plane',    'Return Air Ticket',     'Return flight booking.'),
      req('fas fa-wallet',   'Travel Funds',          'Proof of sufficient funds for duration of stay.')
    ],
    tips: [
      'Bali is the most popular destination — ideal for honeymoon and beach holidays.',
      'Indonesia visa on arrival available — or apply e-Visa in advance online.',
      'Good for honeymoon and beach trips.'
    ],
    officialLinks: [
      link('Indonesia e-Visa Portal', 'https://molina.imigrasi.go.id', 'Official Indonesia Ministry of Law & Human Rights — e-Visa application.'),
      link('Indonesian Embassy Dhaka', 'https://kemlu.go.id/dhaka', 'Official Indonesian Embassy in Bangladesh.'),
      link('Indonesia Immigration', 'https://www.imigrasi.go.id', 'Official Indonesia Directorate General of Immigration.')
    ]
  },

  philippines: {
    country: 'Philippines',
    flag: '🇵🇭',
    region: 'Southeast Asia',
    processingTime: '5–7 business days (Embassy: ~1.5 months)',
    validity: '30 days',
    price: 'Contact for Package',
    requirements: [
      req('fas fa-camera',     'Recent Photos — White Background (2.2×2.2 cm)',  'Two copies of recent white-background photo sized 2.2×2.2 cm.'),
      req('fas fa-university', 'Bank Statement (last 6 months)',                  'Minimum balance: ৳2,00,000 per person; family travel: ৳5,00,000+.'),
      req('fas fa-piggy-bank', 'Bank Solvency Certificate',                       'Bank solvency certificate from your bank.'),
      req('fas fa-file-alt',   'NOC (for employees)',                             'No Objection Certificate on company letterhead.'),
      req('fas fa-store',      'Notarized Trade License (for businesspersons)',   'Trade license photocopy, notarized.'),
      req('fas fa-id-badge',   'Pay Slip / Salary Statement + ID Card',          'Recent pay slip or salary statement with employee ID.'),
      req('fas fa-id-card',    'National ID Card Copy',                           'National ID card copy.'),
      req('fas fa-scroll',     'Company Pad + Visiting Card',                    'Company letterhead pad and visiting card.')
    ],
    tips: [
      'Boracay, Palawan and Cebu are the most popular Philippine destinations.',
      'Embassy processing takes approximately 1.5 months — plan well ahead.',
      'Minimum bank balance of ৳2,00,000 per person is required.',
      'Visa fee + service charge approx ৳8,500 per person.'
    ],
    officialLinks: [
      link('Philippine Bureau of Immigration', 'https://immigration.gov.ph', 'Official Philippines Bureau of Immigration — visa information.'),
      link('Philippine Embassy Dhaka', 'https://dhakaembassy.dfa.gov.ph', 'Official Philippine Embassy in Bangladesh.'),
      link('Philippine e-Visa', 'https://evisa.gov.ph', 'Official Philippine e-Visa application portal.')
    ]
  },

  china: {
    country: 'China',
    flag: '🇨🇳',
    region: 'East Asia',
    processingTime: '4–7 business days',
    validity: '30–90 days',
    price: 'Contact for Package',
    requirements: [
      req('fas fa-passport',    'Passport — 8 Months Valid + Old Passports',     'Passport must have at least 8 months validity before expiry.'),
      req('fas fa-camera',      'Photo — 48mm × 33mm (Height × Width)',          'Strictly 48×33mm photo — different from standard passport size.'),
      req('fas fa-file-alt',    'Completed Visa Application Form',               'Chinese visa application form filled accurately and signed.'),
      req('fas fa-id-card',     'NID Card Copy',                                  'National ID card copy.'),
      req('fas fa-university',  'Bank Statement (last 6 months)',                 'Personal bank statement.'),
      req('fas fa-piggy-bank',  'Bank Solvency Certificate',                     'Bank solvency certificate.'),
      req('fas fa-plane',       'Return Air Ticket',                              'Return flight booking.'),
      req('fas fa-hotel',       'Hotel Booking Confirmation',                    'Confirmed hotel booking for entire stay.')
    ],
    tips: [
      'Beijing, Shanghai, Guangzhou and Chengdu are popular destinations.',
      'Photo size is strictly 48×33mm — not the standard passport size. This is strictly checked.',
      'Passport must have 8 months validity — more than the usual 6 months requirement.',
      'Application form must be filled very carefully — errors cause rejection.'
    ],
    officialLinks: [
      link('Chinese Visa Application Service Center', 'https://www.visaforchina.cn', 'Official China visa application center — check requirements and book appointments.'),
      link('Chinese Embassy Dhaka', 'http://bd.china-embassy.gov.cn', 'Official Chinese Embassy in Bangladesh.'),
      link('China National Immigration Administration', 'https://www.nia.gov.cn', 'Official China immigration authority.')
    ]
  },

  japan: {
    country: 'Japan',
    flag: '🇯🇵',
    region: 'East Asia',
    processingTime: '5–10 business days',
    validity: '15–30 days',
    price: 'Contact for Package',
    requirements: [
      req('fas fa-passport',    'Valid Passport (min. 6 months, 2 blank pages)',  'Valid passport with at least 2 blank pages and 6 months validity.'),
      req('fas fa-camera',      'Japan-spec Passport Photo',                      'Passport-size photo meeting Japan visa photo specifications.'),
      req('fas fa-university',  'Bank Statement (last 6 months)',                 'Personal bank statement showing strong financial history.'),
      req('fas fa-id-card',     'NID Card Copy',                                  'National ID card copy.'),
      req('fas fa-piggy-bank',  'Bank Solvency Certificate',                     'Bank solvency certificate.'),
      req('fas fa-file-invoice','TIN Certificate + Acknowledgement (3 years)',   'TIN certificate with last 3 years income tax acknowledgements.'),
      req('fas fa-briefcase',   'Job / Business / Student Proof',                'NOC + Salary certificate, notarized trade license, or student ID.'),
      req('fas fa-map',         'Day-by-day Travel Itinerary',                   'Detailed day-by-day itinerary for entire Japan trip.'),
      req('fas fa-hotel',       'Hotel Booking (all nights)',                    'Confirmed hotel booking for the complete stay duration.'),
      req('fas fa-plane',       'Return Air Ticket',                              'Return flight booking confirmed.')
    ],
    tips: [
      'Japan is a high-scrutiny country — submit strong bank history and clear itinerary.',
      'Tokyo, Kyoto, Osaka and Hiroshima are must-visit destinations.',
      'Detailed day-by-day itinerary significantly improves approval chances.',
      'Strong bank balance with regular transactions is very important.'
    ],
    officialLinks: [
      link('Japan Visa Information (Ministry of Foreign Affairs)', 'https://www.mofa.go.jp/j_info/visit/visa/', 'Official Japan Ministry of Foreign Affairs — visa requirements.'),
      link('Embassy of Japan in Bangladesh', 'https://www.bd.emb-japan.go.jp', 'Official Embassy of Japan in Bangladesh.'),
      link('Japan Tourism Agency', 'https://www.mlit.go.jp/kankocho/en/', 'Official Japan Tourism Agency information.')
    ]
  },

  dubai: {
    country: 'Dubai / UAE',
    flag: '🇦🇪',
    region: 'Middle East',
    processingTime: '3–5 business days',
    validity: '30 or 60 days',
    price: 'Contact for Package',
    requirements: [
      req('fas fa-passport',   'Valid Passport (min. 6 months)',      'Valid passport with at least 6 months remaining validity.'),
      req('fas fa-camera',     'Passport-size Photo',                 'Recent passport-size photograph with white background.'),
      req('fas fa-id-card',    'NID Card Copy',                       'National ID card copy.'),
      req('fas fa-hotel',      'Hotel Booking',                       'Confirmed hotel reservation for entire duration.'),
      req('fas fa-plane',      'Return Air Ticket',                   'Return flight booking.')
    ],
    tips: [
      'Dubai is popular for shopping, family tours and luxury travel.',
      '30-day and 60-day visa options available — choose based on travel plan.',
      'Apply through authorized travel agencies or airline-sponsored visa channels.'
    ],
    officialLinks: [
      link('UAE Official e-Visa Portal', 'https://www.icp.gov.ae', 'Official UAE Federal Authority — visa information and e-services.'),
      link('UAE Embassy / Consulate Bangladesh', 'https://www.mofaic.gov.ae', 'Official UAE Ministry of Foreign Affairs.'),
      link('Dubai Tourism', 'https://www.visitdubai.com', 'Official Dubai tourism and travel guide.')
    ]
  },

  turkey: {
    country: 'Turkey',
    flag: '🇹🇷',
    region: 'Middle East / Europe',
    processingTime: '7–10 business days',
    validity: '30 days',
    price: 'Contact for Package',
    requirements: [
      req('fas fa-passport',    'Passport — 8 Months Valid + Old Passports',             'Passport must have 8 months validity — include all old passports.'),
      req('fas fa-camera',      '2 Passport-size Photos (5×5 cm)',                       'Two passport photos sized 5×5 cm as per Turkey specification.'),
      req('fas fa-file-alt',    'Cover Letter',                                           'Personal cover letter stating purpose of visit.'),
      req('fas fa-university',  'Bank Statement (last 6 months)',                         'Personal bank statement — minimum ৳4–5 lac balance recommended.'),
      req('fas fa-piggy-bank',  'Bank Solvency Certificate (Balance: ৳4–5 lac)',         'Bank solvency certificate with adequate balance.'),
      req('fas fa-file-invoice','TIN Certificate + Acknowledgement (3 years)',           'TIN certificate with last 3 years acknowledgement slips.'),
      req('fas fa-id-card',     'National ID Card Copy',                                  'National ID card copy.'),
      req('fas fa-plane',       'Return Air Ticket Booking',                              'Confirmed return air ticket booking.'),
      req('fas fa-hotel',       'Hotel Voucher',                                          'Confirmed hotel booking for entire stay.'),
      req('fas fa-map',         'Travel Itinerary',                                       'Detailed travel itinerary.'),
      req('fas fa-briefcase',   'Visiting Card',                                          'Personal or professional visiting card.'),
      req('fas fa-ring',        'Marriage Certificate (Notarized, English)',              'Marriage certificate notarized and translated into English.'),
      req('fas fa-baby',        'Child Birth Certificates',                               'Birth certificates for children traveling.'),
      req('fas fa-file-alt',    'NOC + Office ID Card (for employees)',                  'No Objection Certificate and Office ID for job holders.'),
      req('fas fa-scroll',      'Salary Certificate + Salary Slips (last 3–6 months)',  'Salary certificate and pay slips for employees.'),
      req('fas fa-store',       'Notarized Trade License (for businesspersons)',         'Notarized English-translated trade license for businesspersons.'),
      req('fas fa-user-md',     'BMDC Certificate — Notarized (for doctors)',            'BMDC certificate notarized for doctors.'),
      req('fas fa-graduation-cap', 'Student ID Card',                                   'Valid student ID for students.')
    ],
    tips: [
      'Istanbul and Cappadocia are most popular from Bangladesh — excellent for couple packages.',
      'Turkey requires 8 months passport validity — check this carefully.',
      'Bank balance minimum ৳4–5 lac per person recommended for approval.',
      'All Bangla documents must be notarized and translated into English.'
    ],
    officialLinks: [
      link('Turkey e-Visa Official Portal', 'https://www.evisa.gov.tr', 'Official Turkey e-Visa application portal — fastest and safest option.'),
      link('Embassy of Turkey in Bangladesh', 'https://dhaka.emb.mfa.gov.tr', 'Official Turkish Embassy in Dhaka.'),
      link('Turkish Consulate General', 'https://dhaka.cg.mfa.gov.tr', 'Official Turkish Consulate General in Bangladesh.')
    ]
  },

  saudiarabia: {
    country: 'Saudi Arabia',
    flag: '🇸🇦',
    region: 'Middle East',
    processingTime: '3–7 business days',
    validity: '30–90 days',
    price: 'Contact for Package',
    requirements: [
      req('fas fa-passport',   'Valid Passport (min. 6 months)',  'Passport with at least 6 months validity.'),
      req('fas fa-camera',     'Passport-size Photo',             'Recent photograph.'),
      req('fas fa-university', 'Bank Statement',                  'Bank statement showing sufficient funds.'),
      req('fas fa-hotel',      'Hotel Booking',                   'Confirmed hotel or accommodation booking.'),
      req('fas fa-plane',      'Return Air Ticket',               'Return flight booking.')
    ],
    tips: [
      'Riyadh, Jeddah, AlUla, Makkah and Madinah are popular destinations.',
      'Umrah visa process is separate from tourist visa — contact Trip Fly BD for Umrah guidance.',
      'Tourist e-Visa now available for Saudi Arabia — apply online.'
    ],
    officialLinks: [
      link('Saudi Arabia e-Visa Portal', 'https://visa.visitsaudi.com', 'Official Saudi Arabia e-Visa portal for tourist visa applications.'),
      link('Saudi Embassy Dhaka', 'https://www.mofa.gov.sa', 'Saudi Ministry of Foreign Affairs — embassy contacts.'),
      link('Visit Saudi Tourism', 'https://www.visitsaudi.com', 'Official Saudi Arabia tourism portal.')
    ]
  },

  qatar: {
    country: 'Qatar',
    flag: '🇶🇦',
    region: 'Middle East',
    processingTime: '3–5 business days',
    validity: '30 days',
    price: 'Contact for Package',
    requirements: [
      req('fas fa-passport', 'Valid Passport',         'Passport with at least 6 months validity.'),
      req('fas fa-camera',   'Passport-size Photo',    'Recent photograph.'),
      req('fas fa-hotel',    'Hotel Booking',          'Confirmed hotel reservation.'),
      req('fas fa-plane',    'Return Air Ticket',      'Return flight booking.'),
      req('fas fa-wallet',   'Travel Funds',           'Proof of sufficient funds for stay.')
    ],
    tips: [
      'Doha, The Pearl and Souq Waqif are popular destinations.',
      'Qatar is great for short premium trips — visa on arrival available for some nationalities.',
      'Hayya visa (event-linked) may be available through official channels.'
    ],
    officialLinks: [
      link('Qatar e-Visa Portal', 'https://portal.moi.gov.qa', 'Official Qatar Ministry of Interior — e-Visa portal.'),
      link('Qatar Embassy / Consulate Bangladesh', 'https://www.mofa.gov.qa', 'Qatar Ministry of Foreign Affairs — embassy contacts.'),
      link('Visit Qatar Tourism', 'https://www.visitqatar.qa', 'Official Qatar tourism portal.')
    ]
  },

  uk: {
    country: 'United Kingdom',
    flag: '🇬🇧',
    region: 'Europe',
    processingTime: '21–30 working days',
    validity: '6 months (Sticker Visa)',
    price: 'Visa Fee ~৳18,576 + Service Charge ৳11,000',
    requirements: [
      req('fas fa-passport',    'Current + All Old Passports',                             'Current passport with minimum 6 months validity plus all old passports. If previous passport is lost, GD (English) copy required.'),
      req('fas fa-camera',      'Recent Photographs (2 copies — white background, PP size)', 'Two recent white-background passport-size photographs.'),
      req('fas fa-id-card',     'National ID Card Copy',                                    'National ID card (both sides).'),
      req('fas fa-map',         'Tour Itinerary',                                           'Detailed tour itinerary with estimated departure date and staying time.'),
      req('fas fa-graduation-cap', 'Educational Qualification Details',                   'SSC, HSC, graduation and post-graduation — institution name and passing date only.'),
      req('fas fa-users',       'Family Information',                                       'Father, Mother, Children — full name, date of birth, place of birth, passport number.'),
      req('fas fa-university',  'Bank Statement (last 6 months)',                           'Personal bank statement with solvency certificate.'),
      req('fas fa-file-invoice','TIN Certificate + Income Tax Certificate',                'TIN certificate and last 3 years income tax certificates.'),
      req('fas fa-piggy-bank',  'FDR, Share Certificate, Provident Fund',                 'Fixed deposit receipts, share certificates or provident fund documents if available.'),
      req('fas fa-briefcase',   'NOC + Employee ID + Salary Certificate (for employees)',  'No Objection Certificate, employee ID, original salary certificate. For govt. passport holders: GO and note verbal.'),
      req('fas fa-store',       'Trade License + Memorandum (for businesspersons)',        'Notarized trade license, memorandum for limited company, blank office pad, import-export certificate if applicable.'),
      req('fas fa-ring',        'Marriage Certificate (if spouse not in passport)',        'Marriage certificate copy if spouse name is not mentioned in passport.'),
      req('fas fa-credit-card', 'Credit Card Statement Copy',                              'Credit card statement copy if available.'),
      req('fas fa-envelope',    'Invitation Letter (if invited)',                          'Invitation letter from UK host, copy of host passport, home/office address, bank statement.')
    ],
    tips: [
      'Strong home ties to Bangladesh are the most important factor for UK visa approval.',
      'Biometrics appointment is required — book early to get desired slot.',
      'All documents in Bangla must be translated into English and certified by a notary public.',
      'Visa fee approx ৳18,576 (rate varies by USD conversion) + service charge ৳11,000 per person.',
      'Processing time: 7–8 working days after biometrics (priority service), 21–30 days for standard.',
      'Visa fee is non-refundable — visa issuance rights are reserved by the Embassy.'
    ],
    officialLinks: [
      link('UK Visa Application (Official)', 'https://www.gov.uk/apply-uk-visa', 'Official UK government visa application portal — apply here.'),
      link('UK Visas and Immigration (UKVI)', 'https://www.gov.uk/government/organisations/uk-visas-and-immigration', 'Official UKVI — check visa types, rules, and fees.'),
      link('British High Commission Dhaka', 'https://www.gov.uk/world/organisations/british-high-commission-dhaka', 'Official British High Commission in Bangladesh.')
    ]
  },

  portugal: {
    country: 'Portugal',
    flag: '🇵🇹',
    region: 'Europe',
    processingTime: '15–30 business days',
    validity: '90 days (Schengen)',
    price: 'Contact for Package',
    requirements: [
      req('fas fa-passport',    'Current Passport (min. 6 months, 2 blank pages) + All Old Passports', 'All previous passports must be submitted.'),
      req('fas fa-camera',      'Two Recent Photos — Matt Paper (35×45 mm)',                              'White background, matt paper printed photos.'),
      req('fas fa-id-card',     'NID — Both Sides (adults); Birth Registration for children',           'National ID card both sides for adults.'),
      req('fas fa-shield-alt',  'Medical Insurance (min. €30,000 + repatriation)',                       'Travel insurance covering minimum €30,000 and repatriation.'),
      req('fas fa-file-alt',    'Cover Letter (purpose of visit)',                                        'Well-written cover letter stating purpose and travel plan.'),
      req('fas fa-map',         'Day-by-day Travel Itinerary in Portugal',                               'Complete daily itinerary for Portugal visit.'),
      req('fas fa-university',  'Bank Statement (last 6 months) + Solvency Certificate',                'Bank statement with solvency certificate.'),
      req('fas fa-piggy-bank',  'DPS, FDR, Credit Card, Holding Tax Receipt',                           'Additional financial documents as available.'),
      req('fas fa-file-invoice','E-TIN Certificate + Income Tax Returns (last 3 years)',                'TIN certificate and last 3 years tax returns.'),
      req('fas fa-ring',        'Marriage Certificate (for married persons)',                            'Marriage certificate copy.'),
      req('fas fa-hotel',       'Hotel Booking (all nights)',                                            'Confirmed hotel booking for entire stay if not invited.'),
      req('fas fa-briefcase',   'NOC + Office ID + Salary Certificate (for employees)',                 'No Objection Certificate and supporting employment documents.'),
      req('fas fa-store',       'Trade License + Incorporation + Memorandum (for businesspersons)',     'Updated notarized trade license with translation, incorporation certificate and memorandum.'),
      req('fas fa-graduation-cap', 'Student ID + NOC/Leave Letter (for students)',                     'Student ID and leave letter from institution.'),
      req('fas fa-scroll',      'Retirement Certificate + LPR + Pension Book (for retired)',            'Retirement documents for retired applicants.'),
      req('fas fa-user-md',     'BMDC Certificate (for doctors)',                                       'BMDC certificate for doctors.'),
      req('fas fa-balance-scale', 'Bar Council Certificate (for advocates)',                            'Bar Council certificate for lawyers.')
    ],
    tips: [
      'Portugal Schengen visa allows travel to all 27 Schengen countries.',
      'All Bangla documents must be notarized and translated into English or Portuguese.',
      'Travel insurance of minimum €30,000 is mandatory — not optional.',
      'Previous Schengen, US, Canada or UK visa copies are a strong positive factor.'
    ],
    officialLinks: [
      link('VFS Global Portugal Visa (Bangladesh)', 'https://www.vfsglobal.com/portugal/bangladesh/', 'Official VFS Global — Portugal visa application center in Bangladesh.'),
      link('Portugal SEF (Immigration)', 'https://www.sef.pt', 'Official Portugal Immigration and Borders Service.'),
      link('Portuguese Embassy (New Delhi for Dhaka applicants)', 'https://www.embassyportugal-newdelhi.com', 'Portuguese Embassy handling Bangladesh applications.')
    ]
  },

  canada: {
    country: 'Canada',
    flag: '🇨🇦',
    region: 'North America',
    processingTime: '20–60 business days',
    validity: 'Usually up to passport validity',
    price: 'Contact for Package',
    requirements: [
      req('fas fa-passport',   'Valid Passport',              'Valid passport with sufficient validity.'),
      req('fas fa-camera',     'Passport-size Photo',         'Recent photograph meeting Canadian specs.'),
      req('fas fa-university', 'Bank Statement',              'Strong bank statement showing consistent funds.'),
      req('fas fa-briefcase',  'Employment / Business Proof', 'Employment letter or business documents.'),
      req('fas fa-file-alt',   'Purpose of Visit',            'Clear statement of purpose and intention to return.'),
      req('fas fa-envelope',   'Invitation Letter (if any)',  'Invitation letter from Canadian host if applicable.'),
      req('fas fa-fingerprint','Biometrics',                  'Biometric data required — book appointment early.')
    ],
    tips: [
      'Strong financial profile significantly improves approval chances.',
      'Apply early — processing can take 20–60+ working days.',
      'Biometrics appointment must be booked — check VFS Global for available slots.'
    ],
    officialLinks: [
      link('Canada Visa Application (IRCC)', 'https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada.html', 'Official Canada immigration, refugees and citizenship — visitor visa.'),
      link('Canada eTA / Visitor Visa', 'https://www.cic.gc.ca', 'Official Canada immigration portal for all visa types.'),
      link('VFS Global Canada Visa Bangladesh', 'https://www.vfsglobal.ca/Canada/Bangladesh/', 'Official VFS Global — Canada visa application center in Bangladesh.')
    ]
  },

  usa: {
    country: 'United States',
    flag: '🇺🇸',
    region: 'North America',
    processingTime: 'Appointment based (varies)',
    validity: 'Usually multiple years (B1/B2)',
    price: 'Contact for Package',
    requirements: [
      req('fas fa-passport',   'Valid Passport',           'Valid passport required with all old passports.'),
      req('fas fa-file-alt',   'DS-160 Confirmation',      'Completed DS-160 online application with confirmation barcode.'),
      req('fas fa-camera',     'Photo (US visa spec)',      'Recent photograph meeting strict US visa photo specifications.'),
      req('fas fa-university', 'Bank Statement',           'Strong bank statement with consistent transactions.'),
      req('fas fa-briefcase',  'Job / Business / Student Proof', 'Employment letter, business documents, or student ID.'),
      req('fas fa-home',       'Strong Home Ties',         'Evidence of strong ties to Bangladesh: family, property, employment.'),
      req('fas fa-comments',   'Interview Preparation',    'Visa interview at the US Embassy — strong home ties are essential.')
    ],
    tips: [
      'US visa requires a personal interview at the US Embassy in Dhaka.',
      'Strong ties to Bangladesh (family, property, job) are the most important factor.',
      'Prepare clear, honest answers about your travel purpose and return plans.',
      'Appointment wait times can be long — apply well in advance.'
    ],
    officialLinks: [
      link('US Visa Application (CEAC)', 'https://ceac.state.gov/genniv/', 'Official US State Department — DS-160 application and visa portal.'),
      link('US Embassy Dhaka', 'https://bd.usembassy.gov/visas/', 'Official US Embassy in Bangladesh — visa appointment and info.'),
      link('US Travel.State.Gov', 'https://travel.state.gov', 'Official US government travel and visa information.')
    ]
  },

  australia: {
    country: 'Australia',
    flag: '🇦🇺',
    region: 'Oceania',
    processingTime: '15–30 business days',
    validity: '3 months to 1 year',
    price: 'Contact for Package',
    requirements: [
      req('fas fa-passport',    'All Passports (current + old)',                              'Current and all previous passports.'),
      req('fas fa-camera',      'Photos — 35×45mm (white background)',                        'Two recent white-background photographs sized 35×45mm.'),
      req('fas fa-id-card',     'NID Card Copy',                                              'National ID card copy.'),
      req('fas fa-certificate', 'Birth Certificate Copy',                                     'Birth certificate copy.'),
      req('fas fa-file-invoice','TIN Certificate + Income Tax Acknowledgements (3 years)',   'TIN certificate with acknowledgement slips for 23-24, 24-25, 25-26.'),
      req('fas fa-ring',        'Marriage Certificate + Spouse NID',                         'Marriage certificate and spouse NID card copy.'),
      req('fas fa-baby',        'Child NID / Birth Certificate',                             'Child NID or birth certificate for children.'),
      req('fas fa-university',  'Bank Statement (last 6 months) + Solvency Certificate',    'Personal bank statement with solvency certificate.'),
      req('fas fa-briefcase',   'Visiting Card',                                             'Personal or professional visiting card.'),
      req('fas fa-chart-bar',   'FDR / Sanchaypatra Copy',                                   'Fixed deposit or savings bond copies.'),
      req('fas fa-home',        'Asset Valuation + Asset Summary',                           'Valuation and summary of all owned assets.'),
      req('fas fa-users',       'Family Details',                                             'Father, Mother, Siblings — date of birth, address, profession.'),
      req('fas fa-file-alt',    'NOC + Office ID + Salary Certificate (for employees)',     'No Objection Certificate and employment documents.'),
      req('fas fa-scroll',      'Salary Pay Slips (last 6 months)',                         'Last 6 months salary pay slips for employees.'),
      req('fas fa-store',       'Trade License + Memorandum + Incorporation (for businesspersons)', 'Business documents with English notarized trade license.'),
      req('fas fa-graduation-cap', 'School ID Card (for students)',                         'School or university ID card for students.')
    ],
    tips: [
      'Sydney, Melbourne, Gold Coast and Brisbane are popular Australian destinations.',
      'Strong financial documents are the most critical factor for Australia visa.',
      'For business purpose, invitation letter from Australian company is mandatory.',
      'Australia visa fee approx ৳12,000 — processing 15–30 business days.',
      'If invited by a person or company: provide passport copy, trade license, PR card, bank statement and home rent deed of inviter.'
    ],
    officialLinks: [
      link('ImmiAccount — Australia Visa Portal', 'https://immi.homeaffairs.gov.au', 'Official Australian Government immigration and visa portal — apply here.'),
      link('Australian High Commission Dhaka', 'https://bangladesh.embassy.gov.au', 'Official Australian High Commission in Bangladesh.'),
      link('Department of Home Affairs Australia', 'https://www.homeaffairs.gov.au', 'Official Australian Department of Home Affairs — visa policy.')
    ]
  },

  southafrica: {
    country: 'South Africa',
    flag: '🇿🇦',
    region: 'Africa',
    processingTime: '10–15 business days',
    validity: '30 days',
    price: 'Contact for Package',
    requirements: [
      req('fas fa-passport',   'Valid Passport',           'Valid passport with at least 6 months validity.'),
      req('fas fa-camera',     'Passport-size Photo',      'Recent photograph.'),
      req('fas fa-university', 'Bank Statement',           'Personal bank statement showing sufficient funds.'),
      req('fas fa-id-card',    'NID Copy',                 'National ID card copy.'),
      req('fas fa-briefcase',  'Job / Business Proof',     'Employment or business documentation.'),
      req('fas fa-shield-alt', 'Travel Insurance',        'Travel insurance is strongly recommended.'),
      req('fas fa-hotel',      'Hotel Booking',            'Confirmed hotel or accommodation booking.'),
      req('fas fa-plane',      'Return Air Ticket',        'Return air ticket booking.')
    ],
    tips: [
      'Cape Town, Kruger National Park safari and Johannesburg are most popular.',
      'Travel insurance is strongly recommended for South Africa.',
      'Apply through VFS Global for South Africa visas from Bangladesh.'
    ],
    officialLinks: [
      link('VFS Global South Africa Visa (Bangladesh)', 'https://www.vfsglobal.com/southafrica/bangladesh/', 'Official VFS Global — South Africa visa applications from Bangladesh.'),
      link('South Africa Department of Home Affairs', 'https://www.dha.gov.za', 'Official South Africa immigration and visa information.'),
      link('South Africa High Commission', 'https://www.dirco.gov.za', 'Official South Africa Department of International Relations.')
    ]
  },
  spain: {
    country: 'Spain',
    flag: '',
    region: 'Europe',
    processingTime: '15-30 business days',
    validity: 'Schengen short stay',
    price: 'Contact for Package',
    requirements: [
      req('fas fa-passport', 'Valid Passport', 'Passport with at least 6 months validity and blank pages.'),
      req('fas fa-camera', 'Recent Photo', 'Recent passport-size photo as per Schengen specification.'),
      req('fas fa-university', 'Bank Statement', 'Personal bank statement and solvency proof.'),
      req('fas fa-briefcase', 'Job / Business Proof', 'NOC, salary certificate, trade license or business documents.'),
      req('fas fa-plane', 'Travel Booking', 'Tentative flight booking and travel itinerary.'),
      req('fas fa-shield-alt', 'Travel Insurance', 'Schengen travel insurance covering the full stay.')
    ],
    tips: ['Spain is best planned with a clear day-wise itinerary.', 'Previous Schengen/UK/US travel history helps strengthen the profile.', 'Visa rules can change, so final document checking is recommended.'],
    officialLinks: []
  },

  france: {
    country: 'France',
    flag: '',
    region: 'Europe',
    processingTime: '15-30 business days',
    validity: 'Schengen short stay',
    price: 'Contact for Package',
    requirements: [
      req('fas fa-passport', 'Valid Passport', 'Passport with at least 6 months validity and blank pages.'),
      req('fas fa-camera', 'Recent Photo', 'Recent passport-size photo as per Schengen specification.'),
      req('fas fa-university', 'Bank Statement', 'Personal bank statement and solvency proof.'),
      req('fas fa-briefcase', 'Occupation Proof', 'Job, business or student documents according to profile.'),
      req('fas fa-hotel', 'Hotel Booking', 'Hotel booking matching the travel plan.'),
      req('fas fa-shield-alt', 'Travel Insurance', 'Schengen travel insurance covering the full stay.')
    ],
    tips: ['Paris and nearby Europe routes need a strong itinerary.', 'Financial consistency is important for Schengen applications.', 'Trip Fly BD reviews documents before submission guidance.'],
    officialLinks: []
  },

  italy: {
    country: 'Italy',
    flag: '',
    region: 'Europe',
    processingTime: '15-30 business days',
    validity: 'Schengen short stay',
    price: 'Contact for Package',
    requirements: [
      req('fas fa-passport', 'Valid Passport', 'Passport with at least 6 months validity and blank pages.'),
      req('fas fa-camera', 'Recent Photo', 'Recent passport-size photo.'),
      req('fas fa-university', 'Bank Statement', 'Bank statement and solvency certificate.'),
      req('fas fa-file-invoice', 'Tax / Income Proof', 'TIN, tax return or income documents if applicable.'),
      req('fas fa-route', 'Travel Itinerary', 'Clear travel itinerary and hotel plan.'),
      req('fas fa-shield-alt', 'Travel Insurance', 'Schengen travel insurance.')
    ],
    tips: ['Italy is ideal for Rome, Venice and Milan routes.', 'Keep hotel and itinerary consistent with the travel dates.', 'Apply early during peak travel season.'],
    officialLinks: []
  },

  netherlands: {
    country: 'Netherlands',
    flag: '',
    region: 'Europe',
    processingTime: '15-30 business days',
    validity: 'Schengen short stay',
    price: 'Contact for Package',
    requirements: [
      req('fas fa-passport', 'Valid Passport', 'Passport with at least 6 months validity.'),
      req('fas fa-camera', 'Recent Photo', 'Recent passport-size photo.'),
      req('fas fa-university', 'Bank Statement', 'Personal bank statement and solvency proof.'),
      req('fas fa-briefcase', 'Occupation Proof', 'Job, business or student documents.'),
      req('fas fa-plane', 'Flight Booking', 'Tentative return flight booking.'),
      req('fas fa-shield-alt', 'Travel Insurance', 'Schengen travel insurance.')
    ],
    tips: ['Amsterdam trips should include a clean itinerary and accommodation plan.', 'Sponsor documents may be needed if someone is hosting you.', 'Document consistency is very important.'],
    officialLinks: []
  },

  switzerland: {
    country: 'Switzerland',
    flag: '',
    region: 'Europe',
    processingTime: '15-30 business days',
    validity: 'Schengen short stay',
    price: 'Contact for Package',
    requirements: [
      req('fas fa-passport', 'Valid Passport', 'Passport with at least 6 months validity.'),
      req('fas fa-camera', 'Recent Photo', 'Recent passport-size photo.'),
      req('fas fa-university', 'Bank Statement', 'Strong bank statement and solvency proof.'),
      req('fas fa-briefcase', 'Occupation Proof', 'Job, business or student documents.'),
      req('fas fa-hotel', 'Hotel Booking', 'Hotel booking matching travel itinerary.'),
      req('fas fa-shield-alt', 'Travel Insurance', 'Schengen travel insurance.')
    ],
    tips: ['Switzerland requires a premium, well-budgeted travel plan.', 'Zurich, Interlaken and Lucerne are popular routes.', 'Strong financial documents improve application quality.'],
    officialLinks: []
  },

  hongkong: {
    country: 'Hong Kong',
    flag: '',
    region: 'East Asia',
    processingTime: 'Contact for latest timeline',
    validity: 'Tourist entry depends on profile',
    price: 'Contact for Package',
    requirements: [
      req('fas fa-passport', 'Valid Passport', 'Passport with at least 6 months validity.'),
      req('fas fa-camera', 'Recent Photo', 'Recent passport-size photo.'),
      req('fas fa-university', 'Bank Statement', 'Bank statement showing travel affordability.'),
      req('fas fa-briefcase', 'Occupation Proof', 'Job, business or student documents.'),
      req('fas fa-plane', 'Return Air Ticket', 'Return air ticket booking or itinerary.'),
      req('fas fa-hotel', 'Hotel Booking', 'Hotel or accommodation details.')
    ],
    tips: ['Hong Kong is a strong short city-trip option.', 'Requirements can depend on passport/profile, so consult before booking.', 'Combine with Macau if travel plan allows.'],
    officialLinks: []
  },

  macau: {
    country: 'Macau',
    flag: '',
    region: 'East Asia',
    processingTime: 'Contact for latest timeline',
    validity: 'Tourist entry depends on profile',
    price: 'Contact for Package',
    requirements: [
      req('fas fa-passport', 'Valid Passport', 'Passport with at least 6 months validity.'),
      req('fas fa-camera', 'Recent Photo', 'Recent passport-size photo.'),
      req('fas fa-university', 'Bank Statement', 'Bank statement showing travel affordability.'),
      req('fas fa-briefcase', 'Occupation Proof', 'Job, business or student documents.'),
      req('fas fa-plane', 'Return Air Ticket', 'Return air ticket booking or itinerary.'),
      req('fas fa-hotel', 'Hotel Booking', 'Hotel or accommodation details.')
    ],
    tips: ['Macau works well as a short premium city break.', 'Combine with Hong Kong for a compact route.', 'Carry hotel and return ticket details.'],
    officialLinks: []
  },

  egypt: {
    country: 'Egypt',
    flag: '',
    region: 'Africa',
    processingTime: 'Contact for latest timeline',
    validity: 'Tourist visa',
    price: 'Contact for Package',
    requirements: [
      req('fas fa-passport', 'Valid Passport', 'Passport with at least 6 months validity.'),
      req('fas fa-camera', 'Recent Photo', 'Recent passport-size photo.'),
      req('fas fa-university', 'Bank Statement', 'Bank statement and solvency proof.'),
      req('fas fa-briefcase', 'Occupation Proof', 'Job, business or student documents.'),
      req('fas fa-plane', 'Return Air Ticket', 'Return ticket booking or itinerary.'),
      req('fas fa-hotel', 'Hotel Booking', 'Hotel or tour booking details.')
    ],
    tips: ['Cairo, Giza and Nile route plans should be documented clearly.', 'Travel insurance is recommended.', 'Book with enough processing time.'],
    officialLinks: []
  },

  cyprus: {
    country: 'Cyprus',
    flag: '',
    region: 'Europe',
    processingTime: 'Contact for latest timeline',
    validity: 'Tourist visa',
    price: 'Contact for Package',
    requirements: [
      req('fas fa-passport', 'Valid Passport', 'Passport with at least 6 months validity.'),
      req('fas fa-camera', 'Recent Photo', 'Recent passport-size photo.'),
      req('fas fa-university', 'Bank Statement', 'Bank statement and solvency proof.'),
      req('fas fa-briefcase', 'Occupation Proof', 'Job, business or student documents.'),
      req('fas fa-plane', 'Return Air Ticket', 'Return ticket booking or itinerary.'),
      req('fas fa-shield-alt', 'Travel Insurance', 'Travel insurance is recommended.')
    ],
    tips: ['Cyprus is good for island holidays and student routes.', 'Profile-based document checking is recommended.', 'Keep accommodation and travel dates consistent.'],
    officialLinks: []
  }
};

const DESTINATION_PACKAGE_DETAILS = {
  thailand: {
    title: 'Bangkok + Pattaya Tour', destination: 'Thailand', duration: '4N/5D', priceHtml: '&#2547;16,490 / &#2547;16,500', airTicketHtml: 'Dhaka to Bangkok return approx &#2547;40,000', minPax: 'Minimum 8 Pax / group pricing available',
    highlights: ['Coral Island Tour', 'Chao Phraya Dinner Cruise', 'Bangkok + Pattaya', 'Hotel with Breakfast', 'Airport Pick & Drop'],
    itinerary: [{ day: 'Day 1', title: 'Arrival + Pattaya Transfer', items: ['Airport pick-up', 'Transfer to Pattaya', 'Hotel check-in'] }, { day: 'Day 2', title: 'Coral Island Tour', items: ['Coral Island experience', 'Beach time', 'Return to Pattaya'] }, { day: 'Day 3', title: 'Bangkok + Dinner Cruise', items: ['Bangkok transfer', 'Chao Phraya Dinner Cruise', 'Overnight in Bangkok'] }, { day: 'Day 4', title: 'Bangkok Leisure', items: ['Breakfast', 'Shopping or optional city experience', 'Overnight in Bangkok'] }, { day: 'Day 5', title: 'Departure', items: ['Breakfast', 'Airport drop-off', 'Return support'] }],
    includes: ['Hotel with breakfast', 'Coral Island Tour', 'Dinner Cruise', 'Airport Pick & Drop', 'Bangkok + Pattaya transfer'], exclusions: ['Air ticket unless added separately', 'Personal expenses', 'Optional activities', 'Any item not mentioned'], whatsappText: 'I need details for Thailand Bangkok + Pattaya Tour.'
  },
  malaysia: {
    title: 'Malaysia Mid Premium Package', destination: 'Malaysia', duration: '5N/6D', priceHtml: '&#2547;24,300', airTicketHtml: 'Air ticket approx &#2547;45,300', minPax: '',
    highlights: ['Langkawi', 'Kuala Lumpur', 'Island Hopping', 'Genting Highlands', 'Batu Caves', 'Cable Car'],
    itinerary: [{ day: 'Day 1', title: 'Arrival in Langkawi', items: ['Airport pick-up', 'Hotel check-in', 'Leisure time'] }, { day: 'Day 2', title: 'Island Hopping', items: ['Breakfast', 'Island Hopping Tour', 'Return to hotel'] }, { day: 'Day 3', title: 'Kuala Lumpur Transfer', items: ['Breakfast', 'Transfer support', 'KL hotel check-in'] }, { day: 'Day 4', title: 'Genting + Batu Caves', items: ['Batu Caves', 'Genting Highlands', 'Cable Car'] }, { day: 'Day 5', title: 'KL Leisure', items: ['Breakfast', 'Shopping or optional city tour', 'Overnight'] }, { day: 'Day 6', title: 'Departure', items: ['Breakfast', 'Airport drop-off', 'Return support'] }],
    includes: ['Hotel with breakfast', 'Island Hopping Tour', 'Genting Highlands + Batu Caves with Cable Car', 'Airport Pick & Drop'], exclusions: ['Visa fee excluded', 'Entry fees excluded', 'Personal expenses excluded', 'Air ticket unless added separately'], whatsappText: 'I need details for Malaysia Mid Premium Package.'
  },
  indonesia: {
    title: 'Indonesia Bali Package', destination: 'Indonesia', duration: 'Bali Full Package', priceHtml: '&#2547;55,000', airTicketHtml: 'Air ticket approx &#2547;80,000', minPax: '',
    highlights: ['Nusa Penida', 'Nusa Dua', 'Uluwatu Temple', 'Visa fee approx &#2547;12,000 including insurance'],
    itinerary: [{ day: 'Day 1', title: 'Arrival in Bali', items: ['Airport meet and transfer', 'Hotel check-in', 'Leisure evening'] }, { day: 'Day 2', title: 'Nusa Penida', items: ['Breakfast', 'Nusa Penida tour support', 'Beach/photo stops'] }, { day: 'Day 3', title: 'Nusa Dua + Uluwatu', items: ['Breakfast', 'Nusa Dua visit', 'Uluwatu Temple'] }, { day: 'Day 4', title: 'Leisure + Departure', items: ['Breakfast', 'Shopping or optional activity', 'Airport transfer support'] }],
    includes: ['Bali land package support', 'Nusa Penida plan', 'Nusa Dua visit', 'Uluwatu Temple plan', 'Travel consultation'], exclusions: ['Air ticket approx &#2547;80,000', 'Visa fee approx &#2547;12,000 including insurance', 'Entry fees if not mentioned', 'Personal expenses'], whatsappText: 'I need details for Indonesia Bali Package.'
  },
  maldives: {
    title: 'Maldives Package', destination: 'Maldives', duration: 'Island + Honeymoon Support', priceHtml: '&#2547;99,600', airTicketHtml: 'Air ticket approx &#2547;50,000 per pax', minPax: '',
    highlights: ['Private Island', 'Beach Villa', 'Maafushi', 'Hulhumale', 'Shared Speedboat Transfer'],
    itinerary: [{ day: 'Day 1', title: 'Arrival in Maldives', items: ['Airport meet and greet', 'Transfer to Hulhumale or Maafushi', 'Hotel check-in'] }, { day: 'Day 2', title: 'Island Experience', items: ['Meal plan as per hotel', 'Beach time', 'Optional couple activities'] }, { day: 'Day 3', title: 'Private Island / Beach Villa', items: ['Shared speedboat transfer', 'Private island or beach villa', 'Honeymoon support'] }, { day: 'Day 4', title: 'Departure', items: ['Breakfast', 'Free time', 'Transfer support'] }],
    includes: ['Private Island + Maafushi + Hulhumale plan', 'Beach Villa option', 'Shared Speedboat Transfer', 'Meal plan depending on hotel', 'Luxury honeymoon support'], exclusions: ['Air ticket unless added separately', 'Personal expenses excluded', 'Optional activities', 'Any item not mentioned'], whatsappText: 'I need details for Maldives Package.'
  },
  singapore: {
    title: 'Singapore Tour', destination: 'Singapore', duration: '2N/3D', priceHtml: '&#2547;16,000', airTicketHtml: 'Air ticket approx &#2547;40,000', minPax: '',
    highlights: ['Singapore City Tour', 'Merlion', 'Sentosa', 'Chinatown', 'Private Airport Transfer'],
    itinerary: [{ day: 'Day 1', title: 'Arrival + Private Transfer', items: ['Airport pick-up', 'Private transfer to hotel', 'Check-in'] }, { day: 'Day 2', title: 'Singapore City Tour', items: ['Breakfast', 'Merlion visit', 'Sentosa and Chinatown', 'Driver/guide support'] }, { day: 'Day 3', title: 'Departure', items: ['Breakfast', 'Check-out', 'Private airport transfer'] }],
    includes: ['2 Nights Singapore hotel', 'Breakfast', 'Singapore City Tour', 'Private Airport Transfer', 'English speaking driver/guide'], exclusions: ['Air ticket unless added separately', 'Visa fee if applicable', 'Entry fees not mentioned', 'Personal expenses'], whatsappText: 'I need details for Singapore Tour.'
  },
  china: {
    title: 'China Group Tour', destination: 'China', duration: 'Shenzhen 2N + Guangzhou 2N', priceHtml: 'Air ticket approx &#2547;46,300', airTicketHtml: 'Air ticket approx &#2547;46,300', minPax: 'Group tour pricing available',
    highlights: ['Window of the World', 'Splendid China Folk Village', 'Shenzhen Bay Park', 'Canton Tower', 'Pearl River Night Cruise optional'],
    itinerary: [{ day: 'Day 1', title: 'Arrival in Shenzhen', items: ['Airport support', 'Hotel check-in', 'Evening leisure'] }, { day: 'Day 2', title: 'Shenzhen Highlights', items: ['Window of the World', 'Splendid China Folk Village', 'Shenzhen Bay Park'] }, { day: 'Day 3', title: 'Transfer to Guangzhou', items: ['Transfer support', 'City orientation', 'Overnight in Guangzhou'] }, { day: 'Day 4', title: 'Guangzhou Experience', items: ['Canton Tower', 'Optional Pearl River Night Cruise', 'Group leisure time'] }, { day: 'Day 5', title: 'Departure', items: ['Breakfast', 'Airport transfer support', 'Return flight assistance'] }],
    includes: ['Shenzhen 2N + Guangzhou 2N route planning', 'City tour coordination', 'Group support', 'Travel consultation'], exclusions: ['Air ticket unless added separately', 'China visa fee', 'Optional Pearl River Night Cruise', 'Entry fees and personal expenses'], whatsappText: 'I need details for China Group Tour.'
  },
  srilanka: {
    title: 'Sri Lanka Land Package', destination: 'Sri Lanka', duration: 'Land Package', priceHtml: '&#2547;13,500', airTicketHtml: 'Air ticket approx &#2547;71,865', minPax: '',
    highlights: ['Colombo', 'Lotus Tower', 'Bentota', 'Mirissa', 'Galle Fort', 'Visa fee approx &#2547;3,000'],
    itinerary: [{ day: 'Day 1', title: 'Arrival + Colombo', items: ['Airport transfer support', 'Colombo city experience', 'Lotus Tower visit by plan'] }, { day: 'Day 2', title: 'Bentota + Mirissa', items: ['Breakfast', 'Bentota beach time', 'Mirissa coastal experience'] }, { day: 'Day 3', title: 'Galle Fort + Departure', items: ['Galle Fort visit', 'Shopping/leisure time', 'Airport transfer support'] }],
    includes: ['Sri Lanka land package support', 'Colombo plan', 'Bentota + Mirissa route', 'Galle Fort visit plan', 'Travel consultation'], exclusions: ['Air ticket approx &#2547;71,865', 'Visa fee approx &#2547;3,000', 'Entry fees if not mentioned', 'Personal expenses'], whatsappText: 'I need details for Sri Lanka Land Package.'
  }
};
function initDestinationPackageModals() {
  const detailOverlay = ensureDestPackageDetailsModal();
  const inquiryOverlay = ensureDestPackageInquiryModal();
  if (!detailOverlay || !inquiryOverlay) return;

  const detailBody = document.getElementById('destPkgDetailsBody');
  const inquiryForm = document.getElementById('destPkgInquiryForm');
  const inquiryTitle = document.getElementById('destPkgInquiryTitle');
  const packageInput = document.getElementById('destPkgInquiryPackage');
  const destinationInput = document.getElementById('destPkgInquiryDestination');
  const status = document.getElementById('destPkgInquiryStatus');
  const waFollow = document.getElementById('destPkgInquiryWA');
  let previousOverflow = '';

  const openOverlay = overlay => {
    previousOverflow = document.body.style.overflow || '';
    overlay.classList.add('show');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeOverlay = overlay => {
    if (!overlay.classList.contains('show')) return;
    overlay.classList.remove('show');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = previousOverflow;
  };

  const openInquiry = key => {
    const detail = DESTINATION_PACKAGE_DETAILS[key];
    if (!detail) return;
    closeOverlay(detailOverlay);
    if (inquiryTitle) inquiryTitle.textContent = `${detail.title} Inquiry`;
    if (packageInput) packageInput.value = detail.title;
    if (destinationInput) destinationInput.value = detail.destination;
    if (status) {
      status.className = 'dest-pkg-status';
      status.textContent = '';
    }
    if (waFollow) {
      waFollow.style.display = 'none';
      waFollow.href = buildWhatsAppUrl(`Hello Trip Fly BD! I need ${detail.title} package support.`);
    }
    openOverlay(inquiryOverlay);
    document.getElementById('destPkgName')?.focus();
  };

  document.addEventListener('click', event => {
    const detailsBtn = event.target.closest('.dest-pkg-details-btn');
    if (detailsBtn) {
      event.preventDefault();
      const key = detailsBtn.dataset.pkgKey;
      const detail = DESTINATION_PACKAGE_DETAILS[key];
      if (!detail || !detailBody) return;
      detailBody.innerHTML = renderDestPackageDetails(key, detail);
      openOverlay(detailOverlay);
      document.getElementById('destPkgDetailsClose')?.focus();
      return;
    }

    const inquiryBtn = event.target.closest('.dest-pkg-inquiry-btn');
    if (inquiryBtn) {
      event.preventDefault();
      openInquiry(inquiryBtn.dataset.pkgKey);
    }
  });

  document.querySelectorAll('[data-dest-pkg-close]').forEach(btn => {
    if (btn.dataset.bound === 'true') return;
    btn.dataset.bound = 'true';
    btn.addEventListener('click', () => {
      closeOverlay(detailOverlay);
      closeOverlay(inquiryOverlay);
    });
  });

  [detailOverlay, inquiryOverlay].forEach(overlay => {
    overlay.addEventListener('click', event => {
      if (event.target === overlay) closeOverlay(overlay);
    });
  });

  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    closeOverlay(detailOverlay);
    closeOverlay(inquiryOverlay);
  });

  inquiryForm?.addEventListener('submit', async event => {
    event.preventDefault();
    const name = document.getElementById('destPkgName')?.value.trim();
    const phone = document.getElementById('destPkgPhone')?.value.trim();
    const email = document.getElementById('destPkgEmail')?.value.trim();
    const message = document.getElementById('destPkgMessage')?.value.trim();
    const packageName = packageInput?.value || 'Travel Package';
    const destination = destinationInput?.value || '';

    if (!name || !phone) {
      setDestPkgStatus(status, 'error', 'Please enter your name and phone number.');
      return;
    }

    const submitBtn = inquiryForm.querySelector('[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="btn-spinner"></span> Sending...';
    }

    const followUrl = buildWhatsAppUrl(`Hello Trip Fly BD! I submitted an inquiry for ${packageName}.\nName: ${name}\nPhone: ${phone}`);
    const payload = {
      sheet: 'Package Inquiries',
      timestamp: new Date().toLocaleString('en-BD', { timeZone: 'Asia/Dhaka' }),
      name,
      phone,
      email,
      package: packageName,
      destination,
      message,
      source: 'Destinations Package Section'
    };

    try {
      const response = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(payload)
      });
      const text = await response.text();
      const result = safeJsonParse(text);
      if (!response.ok || (result && result.status && result.status !== 'success')) {
        throw new Error(result?.message || 'Submission failed');
      }
      setDestPkgStatus(status, 'success', 'Inquiry saved. Our package team will contact you soon.');
      if (waFollow) {
        waFollow.href = followUrl;
        waFollow.style.display = 'inline-flex';
      }
      inquiryForm.reset();
      if (packageInput) packageInput.value = packageName;
      if (destinationInput) destinationInput.value = destination;
    } catch (error) {
      console.error('Package inquiry error:', error);
      setDestPkgStatus(status, 'error', 'Could not save right now. You can continue on WhatsApp.');
      if (waFollow) {
        waFollow.href = followUrl;
        waFollow.style.display = 'inline-flex';
      }
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Submit Inquiry';
      }
    }
  });
}

function ensureDestPackageDetailsModal() {
  let overlay = document.getElementById('destPkgDetailsOverlay');
  if (overlay) return overlay;
  document.body.insertAdjacentHTML('beforeend', `
    <div class="dest-pkg-modal-overlay" id="destPkgDetailsOverlay" aria-hidden="true">
      <div class="dest-pkg-modal" role="dialog" aria-modal="true" aria-labelledby="destPkgDetailsTitle">
        <button type="button" class="dest-pkg-modal-close" data-dest-pkg-close aria-label="Close package details"><i class="fas fa-times"></i></button>
        <div class="dest-pkg-modal-body" id="destPkgDetailsBody"></div>
      </div>
    </div>`);
  return document.getElementById('destPkgDetailsOverlay');
}

function ensureDestPackageInquiryModal() {
  let overlay = document.getElementById('destPkgInquiryOverlay');
  if (overlay) return overlay;
  document.body.insertAdjacentHTML('beforeend', `
    <div class="dest-pkg-modal-overlay" id="destPkgInquiryOverlay" aria-hidden="true">
      <div class="dest-pkg-modal" role="dialog" aria-modal="true" aria-labelledby="destPkgInquiryTitle">
        <button type="button" class="dest-pkg-modal-close" data-dest-pkg-close aria-label="Close package inquiry"><i class="fas fa-times"></i></button>
        <div class="dest-pkg-modal-body">
          <div class="dest-pkg-detail-head">
            <span>Package Inquiry</span>
            <h3 id="destPkgInquiryTitle">Package Inquiry</h3>
            <p>Share your details and Trip Fly BD will follow up with package guidance.</p>
          </div>
          <form class="dest-pkg-inquiry-form" id="destPkgInquiryForm" novalidate>
            <input type="hidden" id="destPkgInquiryPackage"/>
            <input type="hidden" id="destPkgInquiryDestination"/>
            <label for="destPkgName">Your Name *</label>
            <input type="text" id="destPkgName" required placeholder="Full name"/>
            <label for="destPkgPhone">Phone / WhatsApp *</label>
            <input type="tel" id="destPkgPhone" required placeholder="+880..."/>
            <label for="destPkgEmail">Email</label>
            <input type="email" id="destPkgEmail" placeholder="you@example.com"/>
            <label for="destPkgMessage">Message</label>
            <textarea id="destPkgMessage" rows="4" placeholder="Preferred date, travelers, budget or special request"></textarea>
            <div class="dest-pkg-status" id="destPkgInquiryStatus"></div>
            <div class="dest-pkg-inquiry-actions">
              <button type="submit" class="btn btn-gold"><i class="fas fa-paper-plane"></i> Submit Inquiry</button>
              <a href="#" target="_blank" rel="noopener" class="btn btn-outline" id="destPkgInquiryWA" style="display:none;"><i class="fab fa-whatsapp"></i> WhatsApp Follow-up</a>
            </div>
          </form>
        </div>
      </div>
    </div>`);
  return document.getElementById('destPkgInquiryOverlay');
}

function renderDestPackageDetails(key, detail) {
  const whatsappHref = buildWhatsAppUrl(detail.whatsappText || `I need ${detail.title} package details.`);
  return `
    <div class="dest-pkg-detail-head">
      <span>Package Details</span>
      <h3 id="destPkgDetailsTitle">${escapeHtml(detail.title)}</h3>
      <p>${escapeHtml(detail.destination)} - ${escapeHtml(detail.duration)} - Starting from <strong>${detail.priceHtml}</strong></p>
    </div>
    <div class="dest-pkg-detail-meta">
      <div><span>Destination</span><strong>${escapeHtml(detail.destination)}</strong></div>
      <div><span>Duration</span><strong>${escapeHtml(detail.duration)}</strong></div>
      <div><span>Price</span><strong>${detail.priceHtml}</strong></div>
      <div><span>Air Ticket</span><strong>${detail.airTicketHtml}</strong></div>
      ${detail.minPax ? `<div><span>Minimum Pax</span><strong>${escapeHtml(detail.minPax)}</strong></div>` : ''}
    </div>
    <div class="dest-pkg-detail-section"><h4>Highlights</h4>${renderDestPkgList(detail.highlights)}</div>
    <div class="dest-pkg-detail-section"><h4>Day-wise Itinerary</h4><div class="dest-pkg-itinerary">${detail.itinerary.map(day => `<article class="dest-pkg-day"><span>${escapeHtml(day.day)}</span><h4>${escapeHtml(day.title)}</h4>${renderDestPkgList(day.items)}</article>`).join('')}</div></div>
    <div class="dest-pkg-detail-split">
      <div class="dest-pkg-detail-section"><h4>Tour Includes</h4>${renderDestPkgList(detail.includes)}</div>
      <div class="dest-pkg-detail-section"><h4>Exclusions</h4>${renderDestPkgList(detail.exclusions)}</div>
    </div>
    <div class="dest-pkg-detail-actions">
      <button type="button" class="btn btn-gold dest-pkg-inquiry-btn" data-pkg-key="${escapeHtml(key)}"><i class="fas fa-paper-plane"></i> Submit Inquiry</button>
      <a href="${whatsappHref}" target="_blank" rel="noopener" class="btn btn-outline"><i class="fab fa-whatsapp"></i> WhatsApp Expert</a>
    </div>`;
}

function renderDestPkgList(items = []) {
  return `<ul class="dest-pkg-detail-list">${items.map(item => `<li><i class="fas fa-check"></i><span>${escapeHtml(item)}</span></li>`).join('')}</ul>`;
}

function setDestPkgStatus(status, type, message) {
  if (!status) return;
  status.className = `dest-pkg-status ${type} show`;
  status.textContent = message;
}
/* ── Filter System ── */
(function initFilter() {
  const btns = $$('.filter-btn');
  const cards = $$('.dest-card');
  const countEl = document.getElementById('destCount');
  const navScroller = document.querySelector('.filter-bar');
  const filterTimers = new WeakMap();

  if (!btns.length || !cards.length) return;

  const updateCount = () => {
    const visible = $$('.dest-card:not(.hide)').length;
    if (countEl) countEl.textContent = visible;
  };

  const applyFilter = (activeBtn) => {
    const filter = activeBtn?.dataset.filter || 'all';

    btns.forEach((btn) => {
      const isActive = btn === activeBtn;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-selected', String(isActive));
    });

    cards.forEach((card, index) => {
      const match = filter === 'all' || card.dataset.region === filter;
      card.style.transitionDelay = match ? `${Math.min(index * 25, 220)}ms` : '0ms';
      card.setAttribute('aria-hidden', String(!match));

      const existingTimer = filterTimers.get(card);
      if (existingTimer) window.clearTimeout(existingTimer);

      if (match) {
        card.classList.remove('hide');
      }

      window.requestAnimationFrame(() => {
        card.style.opacity = match ? '' : '0';
        card.style.transform = match ? '' : 'translateY(14px) scale(.98)';
      });

      const timer = window.setTimeout(() => {
        card.classList.toggle('hide', !match);
        if (match) {
          card.style.opacity = '';
          card.style.transform = '';
        }
        updateCount();
      }, 180);

      filterTimers.set(card, timer);
    });

    if (activeBtn && navScroller && typeof activeBtn.scrollIntoView === 'function') {
      activeBtn.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest'
      });
    }

    window.setTimeout(updateCount, 190);
  };

  btns.forEach((btn) => {
    if (btn.dataset.filterBound === 'true') return;
    btn.dataset.filterBound = 'true';

    btn.addEventListener('click', () => {
      applyFilter(btn);
    });
  });

  applyFilter(btns.find((btn) => btn.classList.contains('active')) || btns[0]);
})();

/* ── Visa Modal ── */
(function initVisaModal() {
  const overlay = document.getElementById('visaModalOverlay');
  const modal   = document.getElementById('visaModal');

  if (!overlay || !modal) return;

  const elFlag    = document.getElementById('vm-flag');
  const elCountry = document.getElementById('vm-country');
  const elSub     = document.getElementById('vm-subtitle');
  const elStats   = document.getElementById('vm-stats');
  const elReqs    = document.getElementById('vm-reqs');
  const elTips    = document.getElementById('vm-tips');
  const elLinks   = document.getElementById('vm-official-links');
  const elWABtn   = document.getElementById('vm-wa-btn');
  let previousBodyOverflow = '';

  function openModal(key) {
    const data = VISA_DATA[key];

    if (!data) {
      alert('Visa information is updating. Please contact Trip Fly BD on WhatsApp.');
      return;
    }

    if (!elStats || !elReqs || !elTips) return;

    if (elFlag) elFlag.textContent = data.flag;
    if (elCountry) elCountry.textContent = data.country;
    if (elSub) elSub.textContent = `Tourist Visa Requirements - ${data.region}`;

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

    /* Official Visa Portals */
    if (elLinks) {
      const linksArr = data.officialLinks || [];
      if (linksArr.length > 0) {
        elLinks.innerHTML = `
          <div class="vm-section-title">
            <i class="fas fa-external-link-alt"></i> Official Visa Portals
          </div>
          <div class="vm-official-links-list">
            ${linksArr.map(lnk => `
              <a href="${lnk.url}" target="_blank" rel="noopener noreferrer" class="vm-official-link-card">
                <div class="vm-official-link-left">
                  <div class="vm-official-link-icon"><i class="fas fa-globe"></i></div>
                  <div>
                    <div class="vm-official-link-label">${lnk.label}</div>
                    <div class="vm-official-link-note">${lnk.note}</div>
                  </div>
                </div>
                <div class="vm-official-link-arrow"><i class="fas fa-external-link-alt"></i></div>
              </a>
            `).join('')}
          </div>
          <div class="vm-official-disclaimer">
            <i class="fas fa-info-circle"></i>
            Visa rules can change anytime. Please verify the latest requirements from the official portal before applying.
          </div>
        `;
        elLinks.style.display = 'block';
      } else {
        elLinks.innerHTML = '';
        elLinks.style.display = 'none';
      }
    }

    if (elWABtn) {
      const msg = encodeURIComponent(
        `Hello Trip Fly BD! I need ${data.flag} ${data.country} tourist visa assistance.`
      );
      elWABtn.href = `https://wa.me/8801898801939?text=${msg}`;
      elWABtn.setAttribute('aria-label', `Talk to Trip Fly BD about ${data.country}`);
      elWABtn.classList.remove('show');
      elWABtn.innerHTML = '<i class="fab fa-whatsapp"></i> Talk To Expert';
    }

    const applyBtn = document.getElementById('vmApplyBtn');

    if (applyBtn) {
      applyBtn.disabled = false;
      applyBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Start Inquiry';
      applyBtn.style.background = '';

      const vmStatus = document.getElementById('vmStatus');
      if (vmStatus) {
        vmStatus.className = 'vm-submit-status';
        vmStatus.innerHTML = '';
      }

      const vmName  = document.getElementById('vmName');
      const vmPhone = document.getElementById('vmPhone');

      if (vmName)  vmName.value  = '';
      if (vmPhone) vmPhone.value = '';

      applyBtn.onclick = () =>
        submitVisaInquiry(data.country, data.flag, data.region);
    }

    previousBodyOverflow = document.body.style.overflow || '';
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    modal.scrollTop = 0;
  }

  function closeModal() {
    if (!overlay.classList.contains('open')) return;

    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = previousBodyOverflow;

    $$('.dest-card').forEach(card => {
      card.classList.remove('active-card');
    });
  }

  /* Destination cards */
  $$('.dest-card').forEach((card) => {
    const key = card.dataset.visaKey;
    if (card.dataset.modalBound === 'true') return;
    card.dataset.modalBound = 'true';

    card.addEventListener('click', () => {
      $$('.dest-card').forEach(c =>
        c.classList.remove('active-card')
      );
      card.classList.add('active-card');
      if (key) openModal(key);
    });
  });

  $$('.dest-visa-btn').forEach((btn) => {
    if (btn.dataset.modalBound === 'true') return;
    btn.dataset.modalBound = 'true';

    btn.addEventListener('click', (event) => {
      event.stopPropagation();

      const card = btn.closest('.dest-card');
      const key  = card?.dataset.visaKey;

      $$('.dest-card').forEach(c =>
        c.classList.remove('active-card')
      );
      card?.classList.add('active-card');

      if (key) openModal(key);
    });
  });

  /* Checklist cards on services page trigger same modal */
  $$('.vcl-open-modal').forEach((btn) => {
    if (btn.dataset.modalBound === 'true') return;
    btn.dataset.modalBound = 'true';

    btn.addEventListener('click', () => {
      const key = btn.dataset.visaKey;
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

  /* Expose for services page cross-page use */
  window.__tfbOpenVisaModal = openModal;
})();

/* ── Start Inquiry -> Google Sheet ── */
async function submitVisaInquiry(country, flag, region) {
  const btn    = document.getElementById('vmApplyBtn');
  const status = document.getElementById('vmStatus');

  if (!btn) return;

  const name  = document.getElementById('vmName')?.value.trim();
  const phone = document.getElementById('vmPhone')?.value.trim();

  if (!name || !phone) {
    if (status) {
      status.className = 'vm-submit-status error show';
      status.innerHTML =
        '<i class="fas fa-exclamation-circle"></i> Please enter your Name and Phone.';
    }
    return;
  }

  btn.disabled    = true;
  btn.innerHTML   = '<span class="btn-spinner"></span> Sending...';

  if (status) {
    status.className = 'vm-submit-status';
    status.innerHTML = '';
  }

  const payload = {
    sheet:     'Visa Inquiries',
    timestamp: new Date().toLocaleString('en-BD', { timeZone: 'Asia/Dhaka' }),
    name,
    phone,
    country:   `${flag} ${country}`,
    region,
    source:    'Visa Modal — Trip Fly BD Website'
  };

  try {
    const response = await fetch(APPS_SCRIPT_URL, {
      method:  'POST',
      headers: { 'Content-Type': 'text/plain' },
      body:    JSON.stringify(payload)
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
        window.open(`https://wa.me/8801898801939?text=${msg}`, '_blank');
      }, 1000);

    } else {
      throw new Error(result.message || 'Submission failed');
    }

  } catch (error) {
    console.error('Visa inquiry error:', error);

    btn.disabled  = false;
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
      window.open(`https://wa.me/8801898801939?text=${msg}`, '_blank');
    }, 1000);
  }
}

/* Modernized modal submission keeps the user on-page and exposes WhatsApp as a follow-up action. */
async function submitVisaInquiry(country, flag, region) {
  const btn = document.getElementById('vmApplyBtn');
  const status = document.getElementById('vmStatus');
  const waBtn = document.getElementById('vm-wa-btn');

  if (!btn) return;

  const name = document.getElementById('vmName')?.value.trim();
  const phone = document.getElementById('vmPhone')?.value.trim();

  if (!name || !phone) {
    setModalStatus(status, 'error', 'Please enter your name and phone number.');
    return;
  }

  btn.disabled = true;
  btn.innerHTML = '<span class="btn-spinner"></span> Sending...';
  setModalStatus(status);

  const payload = {
    sheet: 'Visa Inquiries',
    timestamp: new Date().toLocaleString('en-BD', { timeZone: 'Asia/Dhaka' }),
    name,
    phone,
    country: `${flag || ''} ${country}`.trim(),
    region,
    source: 'Visa Modal - Trip Fly BD Website'
  };

  const followUpUrl = buildWhatsAppUrl(
    `Hello Trip Fly BD! I submitted an inquiry for ${flag || ''} ${country} visa support.\nName: ${name}\nPhone: ${phone}`
  );

  try {
    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify(payload)
    });

    const text = await response.text();
    const result = safeJsonParse(text);

    if (!response.ok || (result && result.status && result.status !== 'success')) {
      throw new Error(result?.message || `Submission failed (${response.status})`);
    }

    btn.disabled = false;
    btn.innerHTML = '<i class="fab fa-whatsapp"></i> Talk To Expert';
    btn.onclick = () => window.open(followUpUrl, '_blank', 'noopener,noreferrer');
    setModalStatus(status, 'success', 'Inquiry saved. Our visa team will contact you soon.');

    if (waBtn) {
      waBtn.href = followUpUrl;
      waBtn.classList.add('show');
      waBtn.innerHTML = '<i class="fab fa-whatsapp"></i> WhatsApp Follow-up';
    }
  } catch (error) {
    console.error('Visa inquiry error:', error);

    btn.disabled = false;
    btn.innerHTML = '<i class="fab fa-whatsapp"></i> Talk To Expert';
    btn.onclick = () => window.open(followUpUrl, '_blank', 'noopener,noreferrer');
    setModalStatus(status, 'error', 'Could not save right now. You can continue on WhatsApp.');

    if (waBtn) {
      waBtn.href = followUpUrl;
      waBtn.classList.add('show');
      waBtn.innerHTML = '<i class="fab fa-whatsapp"></i> WhatsApp Follow-up';
    }
  }
}

function addPremiumCardBadges() {
  const badgeMap = {
    bangladesh: 'Domestic Support',
    india: 'Medical Visa Support',
    thailand: 'Popular Destination',
    malaysia: 'Tourist Friendly',
    singapore: 'Premium City Trip',
    maldives: 'Trending',
    dubai: 'Fast Processing',
    turkey: 'Visa Support Available',
    uk: 'Consultation Required',
    canada: 'Biometrics Support',
    usa: 'Interview Prep',
    australia: 'Tour Plan Support'
  };

  $$('.dest-card').forEach((card) => {
    const imgWrap = card.querySelector('.dest-card-img');
    if (!imgWrap || imgWrap.querySelector('.dest-premium-badge')) return;

    const key = card.dataset.visaKey || '';
    const label = badgeMap[key] || 'Visa Support Available';
    const badge = document.createElement('div');
    badge.className = 'dest-premium-badge';
    badge.innerHTML = `<i class="fas fa-shield-alt"></i> ${escapeHtml(label)}`;
    imgWrap.appendChild(badge);
  });
}

function normalizeDestinationCtas() {
  $$('.dest-visa-btn').forEach((btn) => {
    btn.setAttribute('type', 'button');
    btn.innerHTML = '<i class="fas fa-passport"></i> View Checklist';
  });

  const applyBtn = document.getElementById('vmApplyBtn');
  if (applyBtn) {
    applyBtn.setAttribute('type', 'button');
    applyBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Start Inquiry';
  }
}

function setModalStatus(status, type = '', message = '') {
  if (!status) return;

  status.className = type ? `vm-submit-status ${type} show` : 'vm-submit-status';
  status.innerHTML = message
    ? `<i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i> ${escapeHtml(message)}`
    : '';
}

function buildWhatsAppUrl(message) {
  return `https://wa.me/8801898801939?text=${encodeURIComponent(message)}`;
}

function safeJsonParse(text) {
  try {
    return text ? JSON.parse(text) : null;
  } catch (error) {
    return null;
  }
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
