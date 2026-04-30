// Window Load: Remove Loader
window.onload = function() {
    const loader = document.getElementById('loader');
    loader.classList.add('hidden');
    
    // Auto-scroll reveal initialization (manual)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
};

// Background Music Control
const musicBtn = document.getElementById('musicToggle');
const musicIcon = document.getElementById('musicIcon');
const bgMusic = document.getElementById('bgMusic');
let isPlaying = false;

musicBtn.addEventListener('click', () => {
    if (isPlaying) {
        bgMusic.pause();
        musicIcon.classList.remove('fa-volume-up');
        musicIcon.classList.add('fa-volume-mute');
    } else {
        bgMusic.play();
        bgMusic.volume = 0.2; // Low volume
        musicIcon.classList.remove('fa-volume-mute');
        musicIcon.classList.add('fa-volume-up');
    }
    isPlaying = !isPlaying;
});

// WhatsApp Redirect Function
function orderWA(paket) {
    const phone = "6281234567890"; // Ganti dengan nomor WhatsApp Anda
    const message = `Halo Alex Cloud Game, saya ingin membeli paket ${paket}. Mohon info pembayarannya.`;
    const url = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// Login Simulation (For login.html & dashboard.html)
function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const pass = document.getElementById('password').value;

    if(email && pass) {
        // Simpan data di localStorage
        localStorage.setItem('userEmail', email);
        localStorage.setItem('isLoggedIn', 'true');
        
        // Redirect ke dashboard
        window.location.href = 'dashboard.html';
    } else {
        showToast('Mohon isi email dan password!');
    }
}

// Toast Notification
function showToast(msg) {
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-10 left-1/2 -translate-x-1/2 bg-white text-black px-6 py-3 rounded-full font-bold z-50 shadow-2xl';
    toast.innerText = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}
