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