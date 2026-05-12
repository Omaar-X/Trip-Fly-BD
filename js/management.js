<<<<<<< HEAD
/* ============================================================
   TRIP FLY BD — MANAGEMENT.JS
   Premium Executive Management Interactions
============================================================ */
'use strict';

document.addEventListener('DOMContentLoaded', () => {
  initManagementSpotlight();
  initCardTilt();
  initProfileModal();
  initCounters();
  initRevealAnimations();
});

/* ============================================================
   TEAM DATA
============================================================ */
const TEAM_DATA = {
  chairman: {
    name: 'Thamina Bashar Nishat',
    role: 'Chairman — Trip Fly BD',
    icon: 'fas fa-crown',
    tag: 'Founder & Chairperson',
    bio: 'Founder and Chairperson of Trip Fly BD. She leads the company with vision, trust, transparent service and customer-first support since February 2023. Her leadership focuses on premium travel experiences, visa consultancy and trusted customer relationships.'
  },

  md: {
    name: 'Samshuddin Razib',
    role: 'Managing Director — Trip Fly BD',
    icon: 'fas fa-user-tie',
    tag: 'Operations Leadership',
    bio: 'Responsible for company operations, client communication, ticketing support, visa processing coordination and business development. He ensures fast, professional and reliable service for every client.'
  },

  nijhu: {
    name: 'Nijhu Dey',
    role: 'Accounting Manager',
    icon: 'fas fa-calculator',
    tag: 'Accounts Department',
    bio: 'Handles payment records, billing management, financial tracking and accounting documentation with transparency and accuracy.'
  },

  nazmul: {
    name: 'Nazmul Hasan',
    role: 'Marketing Coordinator',
    icon: 'fas fa-bullhorn',
    tag: 'Marketing Department',
    bio: 'Coordinates customer outreach, package promotions, digital communication and social engagement campaigns for Trip Fly BD.'
  },

  boorhan: {
    name: 'Md Boorhan Uddin',
    role: 'Travel & Visa Consultant',
    icon: 'fas fa-passport',
    tag: 'Visa Consultation',
    bio: 'Provides tourist visa guidance, travel consultation, destination support and travel planning assistance for clients.'
  },

  omar: {
    name: 'Omar Farque',
    role: 'Digital Marketing & Web Developer',
    icon: 'fas fa-laptop-code',
    tag: 'Digital & Web',
    bio: 'Manages website development, online branding, digital marketing strategy, customer acquisition and social media growth for Trip Fly BD.'
  }
};

/* ============================================================
   HERO SPOTLIGHT EFFECT
============================================================ */
function initManagementSpotlight() {

  const hero = document.querySelector('.mgmt-hero');

  if (!hero) return;

  const glow = document.createElement('div');

  glow.className = 'mgmt-cursor-glow';

  hero.appendChild(glow);

  hero.addEventListener('mousemove', (event) => {

    if (window.innerWidth < 768) return;

    const rect = hero.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    glow.style.left = `${x}px`;
    glow.style.top = `${y}px`;

    glow.style.opacity = '1';
  });

  hero.addEventListener('mouseleave', () => {
    glow.style.opacity = '0';
  });
}

/* ============================================================
   PREMIUM CARD TILT EFFECT
============================================================ */
function initCardTilt() {

  const cards = document.querySelectorAll(
    '.leader-card, .team-card, .process-card'
  );

  cards.forEach((card) => {

    card.addEventListener('mousemove', (event) => {

      if (window.innerWidth < 900) return;

      const rect = card.getBoundingClientRect();

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const rotateX = ((y / rect.height) - 0.5) * -8;
      const rotateY = ((x / rect.width) - 0.5) * 8;

      card.style.transform =
        `translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

      card.style.transition = 'transform .08s ease';
    });

    card.addEventListener('mouseleave', () => {

      card.style.transform = '';
      card.style.transition = '';
    });
  });
}

/* ============================================================
   PROFILE MODAL
============================================================ */
function initProfileModal() {

  createProfileModal();

  const profileCards = document.querySelectorAll('[data-person]');

  profileCards.forEach((card) => {

    const personKey = card.dataset.person;
    const person = TEAM_DATA[personKey];

    if (!person) return;

    card.addEventListener('click', (event) => {

      if (event.target.closest('a')) return;

      openProfileModal(person);
    });

    const btn = card.querySelector('.profile-btn');

    if (btn) {

      btn.addEventListener('click', (event) => {

        event.stopPropagation();

        openProfileModal(person);
      });
    }
  });
}

/* ============================================================
   CREATE MODAL
============================================================ */
function createProfileModal() {

  if (document.getElementById('mgmtProfileModal')) return;

  const modal = document.createElement('div');

  modal.id = 'mgmtProfileModal';
  modal.className = 'mgmt-profile-modal';

  modal.innerHTML = `
    <div class="mgmt-profile-overlay"></div>

    <div class="mgmt-profile-box" role="dialog" aria-modal="true">

      <button class="mgmt-profile-close" type="button" aria-label="Close profile">
        <i class="fas fa-times"></i>
      </button>

      <div class="mgmt-profile-icon">
        <i id="mgmtProfileIcon" class="fas fa-user"></i>
      </div>

      <span id="mgmtProfileTag" class="mgmt-profile-tag">
        Team Member
      </span>

      <h3 id="mgmtProfileName">
        Team Member
      </h3>

      <span id="mgmtProfileRole">
        Role
      </span>

      <p id="mgmtProfileBio">
        Bio
      </p>

      <div class="mgmt-profile-actions">

        <a href="contact.html" class="mgmt-profile-btn">
          <i class="fas fa-envelope"></i>
          Contact Team
        </a>

        <a
          href="https://wa.me/88017XXXXXXXX?text=Hello%20Trip%20Fly%20BD!%20I%20want%20to%20talk%20with%20your%20team."
          target="_blank"
          class="mgmt-profile-btn outline"
        >
          <i class="fab fa-whatsapp"></i>
          WhatsApp
        </a>

      </div>

    </div>
  `;

  document.body.appendChild(modal);

  const closeBtn = modal.querySelector('.mgmt-profile-close');

  const overlay = modal.querySelector('.mgmt-profile-overlay');

  closeBtn.addEventListener('click', closeProfileModal);

  overlay.addEventListener('click', closeProfileModal);

  document.addEventListener('keydown', (event) => {

    if (event.key === 'Escape') {
      closeProfileModal();
    }
  });
}

/* ============================================================
   OPEN MODAL
============================================================ */
function openProfileModal(person) {

  const modal = document.getElementById('mgmtProfileModal');

  if (!modal) return;

  document.getElementById('mgmtProfileIcon').className = person.icon;

  document.getElementById('mgmtProfileTag').textContent =
    person.tag;

  document.getElementById('mgmtProfileName').textContent =
    person.name;

  document.getElementById('mgmtProfileRole').textContent =
    person.role;

  document.getElementById('mgmtProfileBio').textContent =
    person.bio;

  modal.classList.add('show');

  document.body.style.overflow = 'hidden';
}

/* ============================================================
   CLOSE MODAL
============================================================ */
function closeProfileModal() {

  const modal = document.getElementById('mgmtProfileModal');

  if (!modal) return;

  modal.classList.remove('show');

  document.body.style.overflow = '';
}

/* ============================================================
   COUNTER ANIMATION
============================================================ */
function initCounters() {

  const counters = document.querySelectorAll(
    '.mgmt-stat-num[data-count]'
  );

  if (!counters.length) return;

  const startCounter = (counter) => {

    if (counter.dataset.done === 'true') return;

    const target =
      Number(counter.dataset.count || 0);

    const suffix =
      counter.dataset.suffix || '';

    const duration = 1500;

    const startTime = performance.now();

    counter.dataset.done = 'true';

    function updateCounter(now) {

      const progress =
        Math.min((now - startTime) / duration, 1);

      const value =
        Math.floor(progress * target);

      counter.textContent =
        value + suffix;

      if (progress < 1) {

        requestAnimationFrame(updateCounter);

      } else {

        counter.textContent =
          target + suffix;
      }
    }

    requestAnimationFrame(updateCounter);
  };

  const observer = new IntersectionObserver(

    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          startCounter(entry.target);
        }
      });
    },

    {
      threshold: 0.45
    }
  );

  counters.forEach((counter) =>
    observer.observe(counter)
  );
}

/* ============================================================
   REVEAL ANIMATION
============================================================ */
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

  revealItems.forEach((item) => {
    observer.observe(item);
  });
}
=======
/* MANAGEMENT JS */

const cards = document.querySelectorAll(".team-card");
const leaders = document.querySelectorAll(".mgmt-featured");

cards.forEach((card, index) => {
  card.style.transitionDelay = `${index * 0.08}s`;
});

leaders.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    if (window.innerWidth <= 900) return;

    const rect = card.getBoundingClientRect();
    const rotateX = ((e.clientY - rect.top - rect.height / 2) / rect.height) * -6;
    const rotateY = ((e.clientX - rect.left - rect.width / 2) / rect.width) * 6;

    card.style.transform = `translateY(-7px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
    card.style.transition = "transform .5s ease";

    setTimeout(() => {
      card.style.transition = "";
    }, 500);
  });
});

cards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    if (window.innerWidth <= 768) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  });
});

const revealItems = document.querySelectorAll(
  ".reveal-up, .reveal-left, .reveal-right, .mgmt-featured, .team-card, .stat-item"
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  {
    threshold: 0.16,
  }
);

revealItems.forEach((item) => {
  revealObserver.observe(item);
});

const statNumbers = document.querySelectorAll(".stat-item h3");

const animateNumber = (el) => {
  const text = el.innerText;
  const target = parseInt(text.replace(/\D/g, ""), 10);
  const suffix = text.replace(/[0-9]/g, "");

  if (!target) return;

  let current = 0;
  const speed = Math.max(18, Math.floor(900 / target));

  const counter = setInterval(() => {
    current++;
    el.innerText = current + suffix;

    if (current >= target) {
      el.innerText = text;
      clearInterval(counter);
    }
  }, speed);
};

const statObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.dataset.done) {
        entry.target.dataset.done = "true";
        animateNumber(entry.target);
      }
    });
  },
  {
    threshold: 0.5,
  }
);

statNumbers.forEach((num) => {
  statObserver.observe(num);
});
>>>>>>> ef590147a10e3748a2fc0bbd04a8c0ec28f26565
