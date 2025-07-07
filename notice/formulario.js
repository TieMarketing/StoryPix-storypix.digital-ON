// Variáveis globais
let candidatesCount = 127;
let vacancyPercentage = 73;
let countdownTime = 23 * 3600 + 45 * 60 + 12; // 23:45:12 em segundos

// Função para formatar telefone brasileiro
function formatPhone(value) {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
        return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    return value;
}

// Função para validar email
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Função para validar nome
function validateName(name) {
    return name.trim().length >= 2 && /^[a-zA-ZÀ-ÿ\s]+$/.test(name.trim());
}

// Função para mostrar erro
function showError(fieldId, message) {
    const errorElement = document.getElementById(fieldId + '-error');
    const inputElement = document.getElementById(fieldId);
    
    if (errorElement && inputElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        inputElement.style.borderColor = '#f44336';
        inputElement.style.boxShadow = '0 0 0 3px rgba(244, 67, 54, 0.1)';
    }
}

// Função para limpar erro
function clearError(fieldId) {
    const errorElement = document.getElementById(fieldId + '-error');
    const inputElement = document.getElementById(fieldId);
    
    if (errorElement && inputElement) {
        errorElement.style.display = 'none';
        inputElement.style.borderColor = '#e0e0e0';
        inputElement.style.boxShadow = 'none';
    }
}

// Função para validar formulário
function validateForm() {
    let isValid = true;
    
    // Validar nome
    const fullName = document.getElementById('fullName').value;
    if (!validateName(fullName)) {
        showError('fullName', 'Por favor, digite um nome válido (apenas letras e espaços)');
        isValid = false;
    } else {
        clearError('fullName');
    }
    
    // Validar email
    const email = document.getElementById('email').value;
    if (!validateEmail(email)) {
        showError('email', 'Por favor, digite um e-mail válido');
        isValid = false;
    } else {
        clearError('email');
    }
    
    return isValid;
}

// Função para atualizar contador de candidatos
function updateCandidatesCount() {
    const element = document.getElementById('candidates-count');
    if (element) {
        // Simula aumento gradual de candidatos
        candidatesCount += Math.floor(Math.random() * 3) + 1;
        element.textContent = candidatesCount;
        
        // Atualiza porcentagem de vagas (diminui conforme aumentam candidatos)
        if (vacancyPercentage > 45) {
            vacancyPercentage -= Math.floor(Math.random() * 2) + 1;
            const percentageElement = document.getElementById('vacancy-percentage');
            const fillElement = document.getElementById('vacancy-fill');
            
            if (percentageElement && fillElement) {
                percentageElement.textContent = vacancyPercentage + '%';
                fillElement.style.width = vacancyPercentage + '%';
            }
        }
    }
}

// Função para atualizar countdown
function updateCountdown() {
    const element = document.getElementById('countdown-timer');
    if (element && countdownTime > 0) {
        const hours = Math.floor(countdownTime / 3600);
        const minutes = Math.floor((countdownTime % 3600) / 60);
        const seconds = countdownTime % 60;
        
        element.textContent = 
            `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        countdownTime--;
        
        // Adiciona urgência quando restam menos de 5 minutos
        if (countdownTime < 300) {
            element.style.color = '#f44336';
            element.style.fontWeight = 'bold';
        }
    } else if (countdownTime <= 0) {
        // Reinicia o contador
        countdownTime = 23 * 3600 + 45 * 60 + 12;
    }
}

// Função para animar progresso
function animateProgress() {
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');
    
    if (progressFill && progressText) {
        setTimeout(() => {
            progressFill.style.width = '100%';
            progressText.textContent = 'Etapa 2 de 2';
        }, 2000);
    }
}

// Função para mostrar modal de sucesso
function showSuccessModal() {
    const modal = document.getElementById('success-modal');
    if (modal) {
        modal.classList.add('show');
        
        // Inicia countdown de redirecionamento
        let redirectTime = 5;
        const countdownElement = document.getElementById('redirect-countdown');
        
        const redirectTimer = setInterval(() => {
            redirectTime--;
            if (countdownElement) {
                countdownElement.textContent = redirectTime;
            }
            
            if (redirectTime <= 0) {
                clearInterval(redirectTimer);
                redirectToStorypix();
            }
        }, 1000);
    }
}

// Função para redirecionar para o Storypix
function redirectToStorypix() {
    // Adiciona parâmetros UTM para tracking
    const utmParams = new URLSearchParams({
        utm_source: 'technews',
        utm_medium: 'presell',
        utm_campaign: 'form_conversion',
        utm_content: 'candidatura_completa'
    });
    
    const targetUrl = `https://storypix.digital/app/?${utmParams.toString()}`;
    
    // Simula delay de processamento
    setTimeout(() => {
        window.location.href = targetUrl;
    }, 500);
}

// Função para processar envio do formulário
function handleFormSubmit(event) {
    event.preventDefault();
    
    if (!validateForm()) {
        return;
    }
    
    const submitButton = document.getElementById('submit-button');
    const buttonText = submitButton.querySelector('.button-text');
    const buttonIcon = submitButton.querySelector('.button-icon');
    
    // Desabilita botão e mostra loading
    submitButton.disabled = true;
    submitButton.classList.add('loading');
    buttonText.textContent = 'PROCESSANDO CANDIDATURA...';
    buttonIcon.textContent = '⏳';
    
    // Simula processamento
    setTimeout(() => {
        // Coleta dados do formulário
        const formData = {
            fullName: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            newsletter: document.getElementById('newsletter').checked,
            timestamp: new Date().toISOString(),
            source: 'technews_presell'
        };
        
        // Simula envio para servidor (aqui você adicionaria a integração real)
        console.log('Dados do formulário:', formData);
        
        // Mostra modal de sucesso
        showSuccessModal();
        
        // Anima progresso
        animateProgress();
        
    }, 2000);
}

// Função para adicionar máscaras e validações em tempo real
function setupFormValidation() {
    const fullNameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    
    // Máscara de telefone
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            e.target.value = formatPhone(e.target.value);
        });
    }
    
    // Validação em tempo real
    if (fullNameInput) {
        fullNameInput.addEventListener('blur', function() {
            if (this.value && !validateName(this.value)) {
                showError('fullName', 'Nome deve conter apenas letras e espaços');
            } else if (this.value) {
                clearError('fullName');
            }
        });
    }
    
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            if (this.value && !validateEmail(this.value)) {
                showError('email', 'Por favor, digite um e-mail válido');
            } else if (this.value) {
                clearError('email');
            }
        });
    }
    
    // Limpa erros quando usuário começa a digitar
    [fullNameInput, emailInput, phoneInput].forEach(input => {
        if (input) {
            input.addEventListener('input', function() {
                clearError(this.id);
            });
        }
    });
}

// Função para adicionar efeitos visuais
function addVisualEffects() {
    // Efeito de hover nos campos
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.transform = 'translateY(-1px)';
        });
        
        input.addEventListener('blur', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Efeito de digitação no título
    const title = document.querySelector('.title-section h1');
    if (title) {
        const text = title.textContent;
        title.textContent = '';
        
        let i = 0;
        const typeTimer = setInterval(() => {
            title.textContent += text.charAt(i);
            i++;
            if (i >= text.length) {
                clearInterval(typeTimer);
            }
        }, 100);
    }
}

// Função para tracking de eventos (simulado)
function trackEvent(eventName, data = {}) {
    console.log('Event tracked:', eventName, data);
    
    // Aqui você adicionaria integração com Google Analytics, Facebook Pixel, etc.
    // gtag('event', eventName, data);
    // fbq('track', eventName, data);
}

// Função para detectar abandono de formulário
function setupAbandonmentTracking() {
    let formStarted = false;
    let formCompleted = false;
    
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            if (!formStarted) {
                formStarted = true;
                trackEvent('form_started', {
                    page: 'candidatura',
                    field: this.id
                });
            }
        });
    });
    
    // Detecta tentativa de sair da página
    window.addEventListener('beforeunload', function(e) {
        if (formStarted && !formCompleted) {
            trackEvent('form_abandoned', {
                page: 'candidatura'
            });
            
            // Mostra aviso de abandono (opcional)
            e.preventDefault();
            e.returnValue = 'Tem certeza que deseja sair? Sua candidatura não foi finalizada.';
            return e.returnValue;
        }
    });
}

// Função para otimização de performance
function optimizePerformance() {
    // Lazy loading de imagens (se houver)
    const images = document.querySelectorAll('img[data-src]');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    // Preload da próxima página
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = 'https://storypix.digital/app/';
    document.head.appendChild(link);
}

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // Configurar formulário
    const form = document.getElementById('application-form');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
    
    // Configurar validações
    setupFormValidation();
    
    // Iniciar timers
    setInterval(updateCandidatesCount, 15000); // A cada 15 segundos
    setInterval(updateCountdown, 1000); // A cada segundo
    
    // Efeitos visuais
    addVisualEffects();
    
    // Tracking
    setupAbandonmentTracking();
    trackEvent('page_view', {
        page: 'candidatura',
        source: 'technews_presell'
    });
    
    // Otimizações
    optimizePerformance();
    
    // Foco automático no primeiro campo
    setTimeout(() => {
        const firstInput = document.getElementById('fullName');
        if (firstInput) {
            firstInput.focus();
        }
    }, 500);
});

// Função para fechar modal (se necessário)
function closeModal() {
    const modal = document.getElementById('success-modal');
    if (modal) {
        modal.classList.remove('show');
    }
}

// Função para reenviar formulário (se necessário)
function retrySubmission() {
    const submitButton = document.getElementById('submit-button');
    const buttonText = submitButton.querySelector('.button-text');
    const buttonIcon = submitButton.querySelector('.button-icon');
    
    submitButton.disabled = false;
    submitButton.classList.remove('loading');
    buttonText.textContent = 'FINALIZAR CANDIDATURA E ACESSAR PLATAFORMA';
    buttonIcon.textContent = '🚀';
}

// Função para salvar dados localmente (backup)
function saveFormData() {
    const formData = {
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        newsletter: document.getElementById('newsletter').checked,
        timestamp: new Date().toISOString()
    };
    
    try {
        localStorage.setItem('storypix_form_data', JSON.stringify(formData));
    } catch (e) {
        console.log('Não foi possível salvar dados localmente');
    }
}

// Função para recuperar dados salvos
function loadSavedData() {
    try {
        const savedData = localStorage.getItem('storypix_form_data');
        if (savedData) {
            const data = JSON.parse(savedData);
            
            // Verifica se os dados são recentes (menos de 1 hora)
            const savedTime = new Date(data.timestamp);
            const now = new Date();
            const hoursDiff = (now - savedTime) / (1000 * 60 * 60);
            
            if (hoursDiff < 1) {
                document.getElementById('fullName').value = data.fullName || '';
                document.getElementById('email').value = data.email || '';
                document.getElementById('phone').value = data.phone || '';
                document.getElementById('newsletter').checked = data.newsletter !== false;
            } else {
                // Remove dados antigos
                localStorage.removeItem('storypix_form_data');
            }
        }
    } catch (e) {
        console.log('Não foi possível carregar dados salvos');
    }
}

// Salvar dados automaticamente
document.addEventListener('DOMContentLoaded', function() {
    loadSavedData();
    
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('input', saveFormData);
    });
});

