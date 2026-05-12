/* ABOUT JS */
const nums = document.querySelectorAll('.astat-num');
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const el  = e.target;
      const target = parseInt(el.dataset.t);
      const suffix  = el.dataset.s;
      let c = 0;
      const step = Math.ceil(target / 70);
      const t = setInterval(() => {
        c = Math.min(c + step, target);
        el.textContent = c.toLocaleString() + suffix;
        if (c >= target) clearInterval(t);
      }, 18);
      obs.unobserve(el);
    }
  });
}, { threshold: 0.5 });
nums.forEach(n => obs.observe(n));