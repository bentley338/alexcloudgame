// Loading Screen
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loading').style.opacity = '0';
    setTimeout(() => {
      document.getElementById('loading').style.display = 'none';
    }, 600);
  }, 1800);
});

// Background Music
const music = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');
let isPlaying = true;

music.volume = 0.15;
music.play().catch(() => {});

musicBtn.addEventListener('click', () => {
  if (isPlaying) {
    music.pause();
    musicBtn.textContent = '♪ Music OFF';
  } else {
    music.play();
    musicBtn.textContent = '♪ Music ON';
  }
  isPlaying = !isPlaying;
});

// Beli Paket → WhatsApp
function beliPaket(paket) {
  const nomor = "6281234567890"; // GANTI DENGAN NOMOR WA KAMU
  const pesan = encodeURIComponent(`Halo admin, saya ingin membeli paket ${paket} di Alex Cloud Game`);
  window.open(`https://wa.me/${nomor}?text=${pesan}`, '_blank');
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    if (this.getAttribute('href').length > 1) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});
