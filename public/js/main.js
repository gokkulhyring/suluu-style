/* ============================================
   SULUU STYLE — main.js
   ============================================ */

// ── Mobile nav ──────────────────────────────
const burgerBtn    = document.getElementById('burgerBtn');
const mobileDrawer = document.getElementById('mobileDrawer');

if (burgerBtn) {
  burgerBtn.addEventListener('click', () => {
    const open = mobileDrawer.classList.toggle('open');
    burgerBtn.classList.toggle('open', open);
  });
}

function closeMobileMenu() {
  mobileDrawer.classList.remove('open');
  burgerBtn.classList.remove('open');
}

// ── Swiper: Hot Offers (external nav buttons) ─
const offersSwiper = new Swiper('.offersSwiper', {
  slidesPerView: 'auto',
  spaceBetween: 28,
  grabCursor: true,
  loop: true,
  navigation: {
    prevEl: '.offers-prev-ext',
    nextEl: '.offers-next-ext',
  },
  breakpoints: {
    0:   { spaceBetween: 16 },
    640: { spaceBetween: 28 },
  },
});

// ── Swiper: Services (external nav buttons) ──
const servicesSwiper = new Swiper('.servicesSwiper', {
  slidesPerView: 'auto',
  spaceBetween: 32,
  grabCursor: true,
  loop: true,
  navigation: {
    prevEl: '.services-prev-ext',
    nextEl: '.services-next-ext',
  },
  breakpoints: {
    0:   { spaceBetween: 16 },
    640: { spaceBetween: 32 },
  },
});

// ── Swiper: Team (side arrows) ───────────────
new Swiper('.teamSwiper', {
  slidesPerView: 1,
  spaceBetween: 28,
  grabCursor: true,
  navigation: {
    prevEl: '.team-prev',
    nextEl: '.team-next',
  },
  breakpoints: {
    540:  { slidesPerView: 2, spaceBetween: 24 },
    900:  { slidesPerView: 3, spaceBetween: 28 },
  },
});

// ── Swiper: Reviews (side arrows) ───────────
new Swiper('.reviewsSwiper', {
  slidesPerView: 1,
  spaceBetween: 24,
  grabCursor: true,
  navigation: {
    prevEl: '.reviews-prev',
    nextEl: '.reviews-next',
  },
  breakpoints: {
    640:  { slidesPerView: 1.15, spaceBetween: 28 },
    960:  { slidesPerView: 1.4, spaceBetween: 32 },
    1200: { slidesPerView: 1.6, spaceBetween: 36 },
  },
});

// ── Modal system ─────────────────────────────
function openModal(id) {
  const el = document.getElementById('modal-' + id);
  if (!el) return;
  el.classList.add('active');
  document.body.classList.add('modal-open');
}

function closeModal(id) {
  const el = document.getElementById('modal-' + id);
  if (!el) return;
  el.classList.remove('active');
  if (!document.querySelector('.modal-overlay.active')) {
    document.body.classList.remove('modal-open');
  }
}

function openBooking() {
  document.querySelectorAll('.modal-overlay.active').forEach(el => el.classList.remove('active'));
  openModal('booking');
}

function closeBooking() {
  closeModal('booking');
  setTimeout(() => {
    const form    = document.getElementById('bookingForm');
    const success = document.getElementById('bookingSuccess');
    form.classList.remove('hidden');
    success.classList.add('hidden');
    form.reset();
  }, 300);
}

// Close on backdrop click
document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', e => {
    if (e.target !== overlay) return;
    const id = overlay.id.replace('modal-', '');
    if (id === 'booking') closeBooking();
    else closeModal(id);
  });
});

// Close on Escape
document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  document.querySelectorAll('.modal-overlay.active').forEach(overlay => {
    const id = overlay.id.replace('modal-', '');
    if (id === 'booking') closeBooking();
    else closeModal(id);
  });
});

// ── Booking form submit ──────────────────────
function submitBooking(e) {
  e.preventDefault();
  const data    = new FormData(e.target);
  const name    = data.get('name') || '';
  const phone   = data.get('phone') || '';
  const date    = data.get('date') || '';
  const service = data.get('service') || 'Not specified';

  const msg = encodeURIComponent(
    `Hello! I want to book a service.\nName: ${name}\nPhone: ${phone}\nDate: ${date}\nService: ${service}`
  );

  document.getElementById('bookingForm').classList.add('hidden');
  document.getElementById('bookingSuccess').classList.remove('hidden');

  setTimeout(() => window.open(`https://wa.me/971585655089?text=${msg}`, '_blank'), 900);
}

// ── Phone input hint ─────────────────────────
const phoneInput = document.getElementById('phoneInput');
if (phoneInput) {
  phoneInput.addEventListener('focus', function () {
    if (!this.value) this.value = '+971 ';
  });
  phoneInput.addEventListener('blur', function () {
    if (this.value === '+971 ') this.value = '';
  });
}

// ── Date auto-format ─────────────────────────
const dateInput = document.getElementById('dateInput');
if (dateInput) {
  dateInput.addEventListener('input', function () {
    let v = this.value.replace(/[^\d]/g, '');
    if (v.length > 2) v = v.slice(0, 2) + '-' + v.slice(2);
    if (v.length > 5) v = v.slice(0, 5) + '-' + v.slice(5, 9);
    this.value = v;
  });
}

// ── Intersection Observer: fade-in ───────────
const fadeEls = document.querySelectorAll('.fade-in-up, .fade-in-left');

const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const siblings = Array.from(entry.target.parentElement.children)
      .filter(c => c.classList.contains('fade-in-up') || c.classList.contains('fade-in-left'));
    const idx = siblings.indexOf(entry.target);
    entry.target.style.transitionDelay = `${Math.min(idx * 80, 320)}ms`;
    entry.target.classList.add('visible');
    io.unobserve(entry.target);
  });
}, { threshold: 0.1 });

fadeEls.forEach(el => io.observe(el));
