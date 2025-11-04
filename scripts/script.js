
let currentIndex = 1; 
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

function updateSlides() {
    slides.forEach((slide, index) => {
        slide.classList.remove('prev', 'current', 'next');
        
        if (index === currentIndex) {
            slide.classList.add('current');
        } else if (index === (currentIndex - 1 + totalSlides) % totalSlides) {
            slide.classList.add('prev');
        } else if (index === (currentIndex + 1) % totalSlides) {
            slide.classList.add('next');
        }
    });
}


function moveCarousel(direction) {
    currentIndex = (currentIndex + direction + totalSlides) % totalSlides;
    updateSlides();
}


function toggleMenu() {
    const navItens = document.getElementById('navItens');
    navItens.classList.toggle('active');

    navItens.style.transition = "1s ease-in-out"
}

function enviarFormulario(event) {
    event.preventDefault();
    
    const nome = document.getElementById('nome').value;
    const telefone = document.getElementById('telefone').value;
    const duvida = document.getElementById('duvida').value;
    
    const mensagem = `Olá! Meu nome é ${nome}%0A` +
                    `Telefone: ${telefone}%0A` +
                    `Dúvida: ${duvida}`;
    
    window.open(`https://api.whatsapp.com/send?phone=5585985393338&text=${mensagem}`, '_blank');
    
    event.target.reset();
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        moveCarousel(-1);
    } else if (e.key === 'ArrowRight') {
        moveCarousel(1);
    }
});

document.querySelectorAll('.itens_nav a').forEach(link => {
    link.addEventListener('click', () => {
        const navItens = document.getElementById('navItens');
        navItens.classList.remove('active');
    });
});


document.querySelectorAll('.nav-arrow').forEach(btn => {
    btn.addEventListener('click', () => {
        stopAutoplay();
        setTimeout(startAutoplay, 10000);
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    updateSlides();
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.infos_dentista, .dentista, #clinica, .profile').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
});

let touchStartX = 0;
let touchEndX = 0;

const carouselWrapper = document.querySelector('.carousel-wrapper');

carouselWrapper.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, false);

carouselWrapper.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, false);

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            moveCarousel(1);
        } else {
            moveCarousel(-1);
        }
        stopAutoplay();
        setTimeout(startAutoplay, 10000);
    }
}

