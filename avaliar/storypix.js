import { profiles } from './profiles.js';

document.addEventListener('DOMContentLoaded', () => {
  let currentProfile = 0;
  let currentStory = 0;
  let imageTimeoutId = null;
  let progressInterval = null;

  // Elementos do DOM
  const balanceEl     = document.getElementById('balance');
  const picEl         = document.getElementById('profile-pic');
  const watchBtn      = document.getElementById('watch-button');
  const usernameEl    = document.getElementById('username');
  const storyOverlay  = document.getElementById('story-overlay');
  const storyContent  = document.getElementById('story-content');
  const storyClose    = document.getElementById('story-close');
  const questionBox   = document.getElementById('question');
  const btnYes        = document.getElementById('btn-yes');
  const btnNo         = document.getElementById('btn-no');
  const feedbackPopup = document.getElementById('feedback-popup');
  const modalText     = document.getElementById('modal-text');
  const progressContainer = document.getElementById('story-progress-container');
  
  // Novos elementos do story header
  const storyProfilePic = document.getElementById('story-profile-pic');
  const storyUsernameOverlay = document.getElementById('story-username-overlay');

  // Promo modal
  const promoModal     = document.getElementById('promo-modal');
  const promoCurrentEl = document.getElementById('promo-current');
  const promoFutureEl  = document.getElementById('promo-future');
  const promoDoubleBtn = document.getElementById('promo-double-btn');

  // Modal do quinto perfil
  const fifthProfileModal = document.getElementById('fifth-profile-modal');
  const fifthProfileCloseBtn = document.getElementById('fifth-profile-close-btn');

  // Helpers de moeda
  function parseCurrency(str) {
    return parseFloat(str.replace(/[R$\s\.]/g, '').replace(',', '.'));
  }
  function formatCurrency(val) {
    return 'R$ ' + val.toFixed(2).replace('.', ',');
  }

  // Valor inicial (promo current) e saldo
  const initialValue = parseCurrency(balanceEl.textContent);
  let promoValue = initialValue;

  // Atualiza displays: topo, promo current e future
  function updateDisplays() {
    balanceEl.textContent     = formatCurrency(promoValue);
    promoCurrentEl.textContent = formatCurrency(promoValue);
    promoFutureEl.textContent  = formatCurrency(initialValue + 373.71);
  }

  // Exibe modal ao carregar, sem alterar valores
  updateDisplays();
  promoModal.style.display = 'flex';

  // Fecha modal promocional sem alterar promoValue
  promoDoubleBtn.addEventListener('click', () => {
    promoModal.style.display = 'none';
  });

  // Função para mostrar o modal do quinto perfil
  function showFifthProfileModal() {
    if (fifthProfileModal) {
      fifthProfileModal.style.display = 'flex';
    }
  }

  // Função para fechar o modal do quinto perfil
  function closeFifthProfileModal() {
    if (fifthProfileModal) {
      fifthProfileModal.style.display = 'none';
    }
  }

  // Event listener para fechar o modal do quinto perfil
  if (fifthProfileCloseBtn) {
    fifthProfileCloseBtn.addEventListener('click', closeFifthProfileModal);
  }

  // Função para mostrar popup temporário
  function showTemporaryPopup(message, duration = 3000) {
    modalText.textContent = message;
    
    // Mostra a barra no topo
    feedbackPopup.classList.add('show');
    
    // Remove a barra após a duração especificada
    setTimeout(() => {
      feedbackPopup.classList.remove('show');
      setTimeout(() => {
        nextProfile();
      }, 300); // Aguarda a animação de saída
    }, duration);
  }

  // Funções do indicador de progresso
  function createProgressBars() {
    const pf = profiles[currentProfile];
    progressContainer.innerHTML = '';
    
    pf.items.forEach((item, index) => {
      const progressBar = document.createElement('div');
      progressBar.className = 'story-progress-bar';
      progressBar.innerHTML = '<div class="story-progress-fill"></div>';
      progressContainer.appendChild(progressBar);
    });
  }

  function updateProgressBars() {
    const progressBars = progressContainer.querySelectorAll('.story-progress-bar');
    
    progressBars.forEach((bar, index) => {
      const fill = bar.querySelector('.story-progress-fill');
      if (index < currentStory) {
        // Stories já visualizados - 100%
        fill.style.width = '100%';
      } else if (index === currentStory) {
        // Story atual - progresso dinâmico
        fill.style.width = '0%';
      } else {
        // Stories futuros - 0%
        fill.style.width = '0%';
      }
    });
  }

  function startProgress() {
    const pf = profiles[currentProfile];
    const item = pf.items[currentStory];
    const progressBar = progressContainer.querySelectorAll('.story-progress-bar')[currentStory];
    const fill = progressBar.querySelector('.story-progress-fill');
    
    let duration;
    if (item.type === 'video') {
      // Para vídeos, vamos usar uma duração padrão ou tentar obter do elemento de vídeo
      const videoEl = storyContent.querySelector('video');
      if (videoEl && videoEl.duration && !isNaN(videoEl.duration)) {
        duration = videoEl.duration * 1000; // converter para ms
      } else {
        duration = (item.length || 15) * 1000; // fallback
      }
    } else {
      // Para imagens
      duration = (item.length || 3) * 1000;
    }

    let startTime = Date.now();
    
    function updateProgress() {
      const elapsed = Date.now() - startTime;
      const progress = Math.min((elapsed / duration) * 100, 100);
      fill.style.width = progress + '%';
      
      if (progress < 100) {
        progressInterval = requestAnimationFrame(updateProgress);
      }
    }
    
    progressInterval = requestAnimationFrame(updateProgress);
  }

  function stopProgress() {
    if (progressInterval) {
      cancelAnimationFrame(progressInterval);
      progressInterval = null;
    }
  }

  function updateStoryHeader() {
    const pf = profiles[currentProfile];
    storyProfilePic.src = pf.photo;
    storyUsernameOverlay.textContent = pf.name.startsWith('@') ? pf.name : `@${pf.name}`;
  }

  function loadProfile() {
    const pf = profiles[currentProfile];
    usernameEl.textContent = pf.name.startsWith('@') ? pf.name : `@${pf.name}`;
    picEl.querySelector('img').src = pf.photo;
    questionBox.style.display = 'none';

    // Verifica se é o quinto perfil (índice 4)
    if (currentProfile === 4) {
      showFifthProfileModal();
    }
  }

  function openStory() {
    storyOverlay.style.display = 'flex';
    currentStory = 0;
    createProgressBars();
    updateProgressBars();
    updateStoryHeader();
    showStory();
  }

  function showStory() {
    const pf = profiles[currentProfile];
    const item = pf.items[currentStory];
    clearImageTimeout();
    stopVideoPlayback();
    stopProgress();
    storyContent.innerHTML = '';
    updateProgressBars();

    let el;
    if (item.type === 'video') {
      el = document.createElement('video');
      el.src = item.src;
      el.autoplay = true;
      el.controls = false;
      el.onloadedmetadata = () => {
        startProgress();
      };
      el.onended = nextStory;
      el.onerror = nextStory;
    } else {
      el = document.createElement('img');
      el.src = item.src;
      el.onload = () => {
        startProgress();
        imageTimeoutId = setTimeout(nextStory, (item.length || 3) * 1000);
      };
      el.onerror = nextStory;
    }
    el.className = 'story-media';
    storyContent.appendChild(el);
  }

  function clearImageTimeout() {
    if (imageTimeoutId) {
      clearTimeout(imageTimeoutId);
      imageTimeoutId = null;
    }
  }

  function stopVideoPlayback() {
    storyContent.querySelectorAll('video').forEach(v => {
      v.pause();
      v.currentTime = 0;
    });
  }

  function nextStory() {
    const pf = profiles[currentProfile];
    
    // Completa a barra do story atual
    const currentProgressBar = progressContainer.querySelectorAll('.story-progress-bar')[currentStory];
    if (currentProgressBar) {
      const fill = currentProgressBar.querySelector('.story-progress-fill');
      fill.style.width = '100%';
    }
    
    if (++currentStory < pf.items.length) {
      showStory();
    } else {
      closeStory();
      questionBox.style.display = 'block';
    }
  }

  function closeStory() {
    clearImageTimeout();
    stopVideoPlayback();
    stopProgress();
    storyOverlay.style.display = 'none';
    storyContent.innerHTML = '';
    progressContainer.innerHTML = '';
  }

  function answerChoice(choice) {
    const pf = profiles[currentProfile];
    promoValue += pf.gain;
    updateDisplays();
    showTemporaryPopup(`Você ganhou ${formatCurrency(pf.gain)}`);
  }

  function nextProfile() {
    currentProfile++;
    if (currentProfile < profiles.length) {
      loadProfile();
    } else {
      alert('Todos os perfis avaliados!');
    }
  }

  // Listeners
  picEl.addEventListener('click', openStory);
  watchBtn.addEventListener('click', openStory);
  storyOverlay.addEventListener('click', e => { if (e.target === storyOverlay) nextStory(); });
  storyClose.addEventListener('click', closeStory);
  btnYes.addEventListener('click', () => answerChoice('yes'));
  btnNo.addEventListener('click', () => answerChoice('no'));

  // Inicializa
  loadProfile();
});

