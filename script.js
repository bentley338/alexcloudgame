"/* ============================================
   ALEX CLOUD GAME — script.js
   Loading, navbar, reveal, music, purchase, etc.
   ============================================ */

// ====== CONFIG — Edit sesuai bisnis Anda ======
const CONFIG = {
  WHATSAPP_NUMBER: '6281234567890', // <-- GANTI nomor WA admin (format internasional tanpa +)
  BRAND: 'Alex Cloud Game',
};

// ====== Loader ======
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  if (!loader) return;
  setTimeout(() => loader.classList.add('hide'), 900);
});

// ====== Year in footer ======
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ====== Navbar scroll effect ======
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  });
}

// ====== Mobile menu toggle ======
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
if (menuBtn && navLinks) {
  menuBtn.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => navLinks.classList.remove('open'))
  );
}

// ====== Reveal on scroll ======
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && revealEls.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 60);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach(el => io.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('visible'));
}

// ====== Background music toggle ======
const bgMusic = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
const musicIcon = document.getElementById('musicIcon');

function setMusicIcon(on) {
  if (!musicIcon) return;
  musicIcon.className = on
    ? 'fa-solid fa-volume-high'
    : 'fa-solid fa-volume-xmark';
}

if (bgMusic && musicToggle) {
  bgMusic.volume = 0.25;
  let isPlaying = false;

  // Try autoplay on first user interaction (browsers block autoplay without it)
  const tryAutoplay = () => {
    bgMusic.play().then(() => {
      isPlaying = true;
      setMusicIcon(true);
    }).catch(() => {
      isPlaying = false;
      setMusicIcon(false);
    });
    document.removeEventListener('click', tryAutoplay);
    document.removeEventListener('scroll', tryAutoplay);
  };
  document.addEventListener('click', tryAutoplay, { once: true });
  document.addEventListener('scroll', tryAutoplay, { once: true });

  musicToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    if (isPlaying) {
      bgMusic.pause();
      isPlaying = false;
      setMusicIcon(false);
    } else {
      bgMusic.play().then(() => {
        isPlaying = true;
        setMusicIcon(true);
      }).catch(() => {});
    }
  });
}

// ====== Purchase → WhatsApp redirect ======
function buildWhatsappLink(plan) {
  const msg = `Halo Admin, saya ingin membeli paket *${plan}* ${CONFIG.BRAND}. Mohon info pembayarannya. Terima kasih!`;
  return `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

document.querySelectorAll('.buy-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const plan = btn.getAttribute('data-plan') || 'Reguler';
    window.open(buildWhatsappLink(plan), '_blank', 'noopener');
  });
});

// ====== Expose for other pages ======
window.AlexCloud = { CONFIG, buildWhatsappLink };
"
