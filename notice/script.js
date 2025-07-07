// Função para formatar data
function formatDate() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return now.toLocaleDateString('pt-BR', options);
}

// Função para definir data do artigo (algumas horas atrás)
function getArticleDate() {
    const now = new Date();
    now.setHours(now.getHours() - 2); // 2 horas atrás
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return now.toLocaleDateString('pt-BR', options);
}

// Função para redirecionar para o formulário
function redirectToForm() {
    // Adiciona um pequeno delay para dar feedback visual
    const button = event.target;
    const originalText = button.textContent;
    
    button.textContent = 'Redirecionando...';
    button.style.opacity = '0.7';
    
    setTimeout(() => {
        window.location.href = 'formulario.html';
    }, 1000);
}

// Função para animar números das estatísticas
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const target = parseInt(stat.textContent.replace(/[^\d]/g, ''));
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            if (stat.textContent.includes('R$')) {
                stat.textContent = 'R$ ' + current.toFixed(1) + 'M';
            } else if (stat.textContent.includes('.')) {
                stat.textContent = current.toFixed(1);
            } else {
                stat.textContent = Math.floor(current).toLocaleString('pt-BR');
            }
        }, 20);
    });
}

// Função para adicionar efeito de hover nos botões
function addButtonEffects() {
    const buttons = document.querySelectorAll('.cta-button, .cta-button-large, .promo-button');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Função para scroll suave nos links internos
function addSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
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
}

// Função para adicionar contador de usuários online (simulado)
function addOnlineCounter() {
    const breakingText = document.querySelector('.breaking-text');
    if (breakingText) {
        const baseUsers = 847;
        const randomUsers = Math.floor(Math.random() * 50) + baseUsers;
        
        setInterval(() => {
            const currentUsers = randomUsers + Math.floor(Math.random() * 10) - 5;
            breakingText.textContent = `${currentUsers} pessoas estão se candidatando agora - Vagas limitadas`;
        }, 5000);
    }
}

// Função para adicionar efeito de urgência
function addUrgencyEffect() {
    const ctaButtons = document.querySelectorAll('.cta-button, .cta-button-large');
    
    setInterval(() => {
        ctaButtons.forEach(button => {
            button.style.animation = 'pulse 0.5s';
            setTimeout(() => {
                button.style.animation = '';
            }, 500);
        });
    }, 10000); // A cada 10 segundos
}

// Função para tracking de cliques (simulado)
function trackClicks() {
    const ctaButtons = document.querySelectorAll('.cta-button, .cta-button-large');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Simula envio de evento para analytics
            console.log('CTA clicked:', this.textContent);
            
            // Adiciona feedback visual
            this.style.background = 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)';
            this.textContent = '✓ Redirecionando...';
            
            setTimeout(() => {
                this.style.background = '';
            }, 2000);
        });
    });
}

// Função para lazy loading de imagens
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Função para adicionar efeito de digitação no título
function typewriterEffect() {
    const title = document.querySelector('.article-title');
    if (title) {
        const text = title.textContent;
        title.textContent = '';
        title.style.borderRight = '2px solid #1565C0';
        
        let i = 0;
        const timer = setInterval(() => {
            title.textContent += text.charAt(i);
            i++;
            if (i >= text.length) {
                clearInterval(timer);
                setTimeout(() => {
                    title.style.borderRight = 'none';
                }, 1000);
            }
        }, 50);
    }
}

// Função para adicionar parallax suave
function addParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.article-image img');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Função para adicionar contador regressivo (simulado)
function addCountdown() {
    const countdownElements = document.querySelectorAll('.countdown');
    
    countdownElements.forEach(element => {
        let timeLeft = 3600; // 1 hora em segundos
        
        const timer = setInterval(() => {
            const hours = Math.floor(timeLeft / 3600);
            const minutes = Math.floor((timeLeft % 3600) / 60);
            const seconds = timeLeft % 60;
            
            element.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            
            timeLeft--;
            
            if (timeLeft < 0) {
                timeLeft = 3600; // Reinicia o contador
            }
        }, 1000);
    });
}

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // Definir datas
    const currentDateElement = document.getElementById('current-date');
    const articleDateElement = document.getElementById('article-date');
    
    if (currentDateElement) {
        currentDateElement.textContent = formatDate();
    }
    
    if (articleDateElement) {
        articleDateElement.textContent = getArticleDate();
    }
    
    // Inicializar funcionalidades
    setTimeout(animateStats, 1000); // Anima estatísticas após 1 segundo
    addButtonEffects();
    addSmoothScroll();
    addOnlineCounter();
    addUrgencyEffect();
    trackClicks();
    lazyLoadImages();
    addCountdown();
    
    // Efeitos visuais opcionais (descomente se desejar)
    // typewriterEffect();
    // addParallax();
    
    // Adiciona classe para animações CSS
    document.body.classList.add('loaded');
});

// Função para detectar dispositivo móvel
function isMobile() {
    return window.innerWidth <= 768;
}

// Ajustes específicos para mobile
if (isMobile()) {
    document.addEventListener('DOMContentLoaded', function() {
        // Remove parallax em dispositivos móveis para melhor performance
        const parallaxElements = document.querySelectorAll('.parallax');
        parallaxElements.forEach(element => {
            element.style.transform = 'none';
        });
        
        // Ajusta velocidade de animações em mobile
        const style = document.createElement('style');
        style.textContent = `
            * {
                animation-duration: 0.3s !important;
                transition-duration: 0.3s !important;
            }
        `;
        document.head.appendChild(style);
    });
}

// Prevenção de spam de cliques
let clickTimeout = false;
function preventSpamClicks(callback) {
    if (!clickTimeout) {
        clickTimeout = true;
        callback();
        setTimeout(() => {
            clickTimeout = false;
        }, 2000);
    }
}

// Aplicar prevenção de spam aos botões CTA
document.addEventListener('DOMContentLoaded', function() {
    const ctaButtons = document.querySelectorAll('.cta-button, .cta-button-large');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            preventSpamClicks(() => {
                redirectToForm();
            });
        });
    });
});

