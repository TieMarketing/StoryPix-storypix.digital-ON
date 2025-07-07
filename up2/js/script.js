const influenciadores = [
  {
    nome: "Virginia Fonseca",
    foto: "src/virginia-fonseca.webp",
    story: "src/virginia-story.webp",
    recompensa: 60.0,
  },
  {
    nome: "Boca de 09",
    foto: "src/bocade09.webp",
    story: "src/bocade09-story.webp",
    recompensa: 115.0,
  },
  {
    nome: "Carlinhos",
    foto: "src/carlinhosmaia.webp",
    story: "src/Carlinhos-story.webp",
    recompensa: 87.5,
  },
  {
    nome: "Anitta",
    foto: "src/Anitta.webp",
    story: "src/Anitta-story.webp",
    recompensa: 112.5,
  },
  {
    nome: "Neymar Jr",
    foto: "src/Neymar.webp",
    story: "src/Neymar-story.webp",
    recompensa: 75.0,
  },
];

let currentPhotoIndex = 0;
let totalReward = 50.0;
let currentEvaluation = null;

// --- 1) Função que cria/injeta o container de vídeo ---
function loadVSL() {
  // esconde o app
  const appElement = document.querySelector("#app");
  appElement.style.display = "none";

  // remove seção anterior, se existir
  const existing = document.querySelector(".video-section");
  if (existing) existing.remove();

  // monta o novo container
  const newVideoContainer = document.createElement("div");
  newVideoContainer.className = "video-section";
  newVideoContainer.innerHTML = `
    <div class="container-video">
      <div class="headline-video">
        Seja pago para avaliar stories de famosos com o
        <span class="gradient-text">StoryPix</span>
      </div>
      <div id="vid_6848540a7d01555f1f0330e4"
        style="position: relative; width: 100%; padding: 56.25% 0 0;">
        <img id="thumb_6848540a7d01555f1f0330e4"
          src="https://images.converteai.net/9581cd38-0dee-4366-bfd7-eeb983591eda/players/6848540a7d01555f1f0330e4/thumbnail.jpg"
          style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover;"
          alt="thumbnail">
        <div id="backdrop_6848540a7d01555f1f0330e4"
          style="-webkit-backdrop-filter: blur(5px); backdrop-filter: blur(5px);
                 position: absolute; top: 0; height: 100%; width: 100%;">
        </div>
      </div>
    </div>
  `;

  // insere logo após o #app no DOM
  appElement.parentNode.insertBefore(newVideoContainer, appElement.nextSibling);

  // carrega script do player
  const script = document.createElement("script");
  script.src = "https://scripts.converteai.net/9581cd38-0dee-4366-bfd7-eeb983591eda/players/6848540a7d01555f1f0330e4/player.js";
  script.async = true;
  document.head.appendChild(script);

  // rola para o topo
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function setupPhotoEvaluation() {
  const btnLike = document.querySelector(".btn-like");
  const btnDislike = document.querySelector(".btn-dislike");
  const btnSubmit = document.querySelector(".btn-submit");
  const rewardElement = document.querySelector(".reward");
  const photoElement = document.querySelector(".photo");
  const storyElement = document.querySelector(".story-photo");
  const influencerName = document.querySelector(".influencer-name");
  const modal = document.querySelector("#rewardModal");
  const modalReward = modal.querySelector(".modal-reward");
  const modalClose = modal.querySelector(".modal-close");

  function updateReward() {
    rewardElement.textContent = `R$ ${totalReward.toFixed(2)}`;
  }

  function updatePhoto() {
    const currentInfluencer = influenciadores[currentPhotoIndex];
    photoElement.style.backgroundImage = `url(${currentInfluencer.foto})`;
    storyElement.style.backgroundImage = `url(${currentInfluencer.story})`;
    influencerName.innerHTML = `<span class="name-text">${currentInfluencer.nome}</span>
      <svg aria-label="Verificado" class="verified-icon" fill="rgb(0, 149, 246)" height="18" role="img" viewBox="0 0 40 40" width="18">
        <title>Verificado</title>
        <path d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Zm7.415 11.225 2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18Z" fill-rule="evenodd"></path>
      </svg>`;
  }

  function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = timestamp - startTimestamp;
      const value = Math.min(
        start + (end - start) * (progress / duration),
        end
      );
      element.textContent = `R$ ${value.toFixed(2)}`;
      if (progress < duration) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }

  function showRewardModal(reward) {
    modalReward.textContent = `R$ 0.00`;
    modal.classList.add("active");
    const audio = new Audio("src/reward.mp3");
    audio.play();
    animateValue(modalReward, 0, reward, 1500);
  }

  function hideRewardModal() {
    modal.classList.remove("active");
  }

  function showAttentionScreen() {
    const appElement = document.querySelector("#app");
    appElement.innerHTML = `
      <div class="attention-screen">
        <h2 class="attention-title">Atenção!</h2>
        <h3 class="attention-subtitle">Confirme seu saque agora</h3>

        <div class="attention-content">
          <p>Assista ao vídeo a seguir para confirmar o seu saque!</p>
          <p>Preste atenção às instruções apresentadas no vídeo para garantir que o processo seja realizado corretamente.</p>
          <p>Se você optar por não assistir, o valor do saque será automaticamente redistribuído entre os demais usuários do StoryPix.</p>
          <p><strong>Importante:</strong> Essa medida foi adotada para aumentar a segurança e garantir a transparência nas transações.</p>
        </div>

        <button class="btn-proceed">Prosseguir para validação</button>
      </div>
    `;

    window.scrollTo({ top: 0, behavior: "smooth" });

    const btnProceed = document.querySelector(".btn-proceed");
    btnProceed.addEventListener("click", () => {
      // Usa a função loadVSL() existente
      loadVSL();
    });
  }

  function nextPhoto() {
    currentPhotoIndex++;
    if (currentPhotoIndex >= influenciadores.length) {
      const appElement = document.querySelector("#app");
      appElement.innerHTML = `
        <div class="final-message">
          <h2>Parabéns!</h2>
          <p>Você acaba de completar todas as avaliações e seu cadastro foi realizado com sucesso! 👏</p>
          <p>Como recompensa pelo seu esforço, você acaba de ganhar R$ ${(
          totalReward - 50
        ).toFixed(2)} pelas últimas 5 avaliações realizadas.</p>
          <p class="final-message-saldo">💰 Seu saldo total agora é: <br>
            <span class="valor-total">R$ ${totalReward.toFixed(2)}</span>
          </p>
          <button class="btn-pix">Cadastrar chave Pix</button>
        </div>
      `;
      const btnPix = document.querySelector(".btn-pix");
      btnPix.addEventListener("click", () => {
        btnPix.classList.add("processing");
        btnPix.innerHTML = '<span class="spinner"></span> Processando...';
        setTimeout(() => {
          appElement.innerHTML = `
            <div class="pix-screen">
              <h2>Cadastro e Validação da sua <span class="gradient-text">Chave Pix</span></h2>
              <div class="pix-content">
                <p>Realize o Cadastro de Sua Chave Pix<br>de Preferência Abaixo!</p>
                <div class="pix-info">
                  <p>Após realizar o preenchimento, sua chave pix será cadastrada de acordo com as diretrizes do Banco Central.</p>
                  <p>Após a Validação você poderá continuar utilizando o aplicativo e realizar o saque dos valores obtidos através de suas avaliações.</p>
                </div>
                <div class="pix-form">
                  <h1>CADASTRE SUA CHAVE PIX ABAIXO</h1>
                  <div class="pix-options">
                    <button class="pix-type active">CPF</button>
                    <button class="pix-type">TELEFONE</button>
                  </div>
                  <input type="text" class="pix-input" placeholder="000.000.000-00" />
                  <button class="btn-validar" disabled>validar chave pix</button>
                </div>
              </div>
            </div>
          `;
          let activePix = "CPF";
          const pixTypeButtons = document.querySelectorAll(".pix-type");
          const pixInput = document.querySelector(".pix-input");
          const btnValidar = document.querySelector(".btn-validar");

          btnValidar.addEventListener("click", () => {
            if (!btnValidar.disabled) {
              const originalText = btnValidar.innerHTML;
              btnValidar.innerHTML =
                '<span class="spinner"></span> Validando...';
              btnValidar.disabled = true;

              setTimeout(() => {
                const validationModal = document.createElement("div");
                validationModal.className = "modal-pix-validation";
                validationModal.id = "validationModal";
                validationModal.innerHTML = `
                  <div class="modal-backdrop"></div>
                  <div class="validation-content">
                    <div class="validation-icon">
                      <svg viewBox="0 0 24 24" class="checkmark">
                        <path d="M4 12l6 6L20 6"></path>
                      </svg>
                      <div class="success-ring"></div>
                    </div>
                    <h2>Chave Pix Validada<br><span class="gradient-text">com Sucesso!</span></h2>
                    <div class="liberando-acesso">
                      <span class="spinner-validation small"></span>
                      <span class="text-animated">Liberando acesso...</span>
                    </div>
                  </div>
                `;
                document.body.appendChild(validationModal);

                setTimeout(() => {
                  validationModal.classList.add("active");
                }, 100);

                setTimeout(() => {
                  validationModal.classList.remove("active");
                  setTimeout(() => {
                    validationModal.remove();
                    showAttentionScreen();
                  }, 300);
                }, 2000);

                btnValidar.innerHTML = originalText;
                btnValidar.disabled = false;
              }, 2000);
            }
          });

          function updateBtnValidar() {
            if (
              (activePix === "CPF" && pixInput.value.length === 14) ||
              (activePix === "TELEFONE" && pixInput.value.length >= 14)
            ) {
              btnValidar.disabled = false;
              btnValidar.classList.add("active");
            } else {
              btnValidar.disabled = true;
              btnValidar.classList.remove("active");
            }
          }

          pixTypeButtons.forEach((btn) => {
            btn.addEventListener("click", () => {
              pixTypeButtons.forEach((b) => b.classList.remove("active"));
              btn.classList.add("active");
              activePix = btn.textContent.trim();
              pixInput.value = "";
              if (activePix === "CPF") {
                pixInput.placeholder = "000.000.000-00";
              } else {
                pixInput.placeholder = "(00) 00000-0000";
              }
              updateBtnValidar();
            });
          });

          pixInput.setAttribute("inputmode", "numeric");
          pixInput.addEventListener("input", () => {
            let digits = pixInput.value.replace(/\D/g, "");
            if (activePix === "CPF") {
              pixInput.value = formatCPF(digits);
            } else {
              pixInput.value = formatPhone(digits);
            }
            updateBtnValidar();
          });

          function formatCPF(value) {
            value = value.slice(0, 11);
            return value
              .replace(/(\d{3})(\d)/, "$1.$2")
              .replace(/(\d{3})(\d)/, "$1.$2")
              .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
          }

          function formatPhone(value) {
            if (value.length > 10) {
              value = value.slice(0, 11);
              return value
                .replace(/(\d{2})(\d)/, "($1) $2")
                .replace(/(\d{5})(\d)/, "$1-$2");
            } else {
              value = value.slice(0, 10);
              return value
                .replace(/(\d{2})(\d)/, "($1) $2")
                .replace(/(\d{4})(\d)/, "$1-$2");
            }
          }
        }, 2000);
      });
      return;
    }
    updatePhoto();
    currentEvaluation = null;
    btnSubmit.classList.remove("active");
    btnLike.classList.remove("selected");
    btnDislike.classList.remove("selected");
  }

  function handleEvaluation(type, button) {
    currentEvaluation = type;
    btnSubmit.classList.add("active");
    btnLike.classList.remove("selected");
    btnDislike.classList.remove("selected");
    button.classList.add("selected");
  }

  btnLike.addEventListener("click", () => {
    handleEvaluation("like", btnLike);
  });

  btnDislike.addEventListener("click", () => {
    handleEvaluation("dislike", btnDislike);
  });

  btnSubmit.addEventListener("click", () => {
    if (currentEvaluation) {
      const reward = influenciadores[currentPhotoIndex].recompensa;
      totalReward += reward;
      updateReward();
      showRewardModal(reward);
    }
  });

  modalClose.addEventListener("click", () => {
    hideRewardModal();
    nextPhoto();
  });

  updatePhoto();
  updateReward();
}

setupPhotoEvaluation();

window.addEventListener('DOMContentLoaded', () => {
  const welcomeModal = document.getElementById('welcome-modal');
  const closeButton = welcomeModal.querySelector('.modal-close');

  setTimeout(() => {
    welcomeModal.classList.add('active');
  });

  closeButton.addEventListener('click', () => {
    welcomeModal.classList.remove('active');
  });
});