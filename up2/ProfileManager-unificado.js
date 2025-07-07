// ========================================================
// SOLUÇÃO UNIFICADA - ProfileManager Definitivo
// Remove conflitos e garante que a pergunta SIM/NÃO apareça
// ========================================================

class ProfileManager {
    constructor(onComplete = () => {}) {
        this.profiles = [];
        this.currentIndex = 0;
        this.onComplete = onComplete;
        this.storiesPool = null;
        this.isTransitioning = false;
        this.isInitialized = false;
        
        console.log('🚀 ProfileManager UNIFICADO iniciado');
        
        // Limpar outros sistemas conflitantes
        this.limparSistemasConflitantes();
    }
    
    /**
     * Remove sistemas conflitantes
     */
    limparSistemasConflitantes() {
        // Remover SimpleProfileManager se existir
        if (window.SimpleProfileManager) {
            delete window.SimpleProfileManager;
            console.log('🧹 SimpleProfileManager removido');
        }
        
        // Limpar outros profileManagers
        if (window.profileManager && window.profileManager !== this) {
            console.log('🧹 ProfileManager anterior removido');
        }
        
        // Definir este como o único ProfileManager
        window.profileManager = this;
    }

    addProfiles(profiles) {
        this.profiles.push(...profiles);
        console.log(`📁 ${profiles.length} perfis adicionados`);
    }

    initialize() {
        if (this.profiles.length === 0) {
            console.warn('⚠️ Nenhum perfil adicionado');
            return;
        }

        console.log('🔧 Inicializando sistema unificado...');

        this.aguardarElementoStories(() => {
            this.storiesPool = new StoriesPool(() => {
                this.handleProfileComplete();
            });

            this.loadCurrentProfile();
            this.isInitialized = true;
            
            console.log('✅ Sistema unificado inicializado');
            
            // Dispara evento
            window.dispatchEvent(new CustomEvent('profileManagerReady', {
                detail: { profileManager: this }
            }));
        });
    }
    
    aguardarElementoStories(callback) {
        const verificar = () => {
            const storiesElement = document.getElementById('stories');
            if (storiesElement) {
                console.log('✅ Elemento #stories encontrado');
                callback();
            } else {
                console.log('⏳ Aguardando elemento #stories...');
                setTimeout(verificar, 100);
            }
        };
        verificar();
    }

    loadCurrentProfile() {
        if (this.currentIndex >= this.profiles.length) {
            console.log('🎉 Todos os perfis completados');
            this.onComplete();
            return;
        }

        const currentProfile = this.profiles[this.currentIndex];
        
        if (this.storiesPool) {
            this.storiesPool.clearStories();
            this.storiesPool.addStory(currentProfile);
        }
        
        console.log(`📱 Perfil carregado: ${currentProfile.name} (${this.currentIndex + 1}/${this.profiles.length})`);
    }

    handleProfileComplete() {
        if (this.isTransitioning) return;
        this.isTransitioning = true;

        console.log('🔄 Completando perfil...');
        this.currentIndex++;
        
        if (this.currentIndex >= this.profiles.length) {
            console.log('🎉 Todos os perfis completados!');
            this.onComplete();
            return;
        }

        setTimeout(() => {
            this.loadCurrentProfile();
            this.isTransitioning = false;
            
            const watchButton = document.getElementById('watch');
            if (watchButton) {
                watchButton.style.display = 'block';
            }
            
            console.log('✅ Próximo perfil carregado');
        }, 1000);
    }

    nextProfile() {
        console.log('🔄 nextProfile chamado');
        
        if (!this.isInitialized) {
            console.warn('⚠️ Sistema não inicializado');
            return;
        }
        
        // Ocultar elementos
        const congratsModal = document.getElementById('congratsModal');
        const questionElement = document.getElementById('question');
        
        if (congratsModal) congratsModal.style.display = 'none';
        if (questionElement) questionElement.style.display = 'none';
        
        this.stopAllVideos();
        
        if (!this.isTransitioning) {
            this.handleProfileComplete();
        }
    }
    
    stopAllVideos() {
        const videos = document.querySelectorAll('video');
        videos.forEach(video => {
            if (!video.paused) {
                video.pause();
                video.currentTime = 0;
                video.muted = true;
            }
        });
        
        const zuckModal = document.querySelector('.zuck-modal');
        if (zuckModal) {
            const modalVideos = zuckModal.querySelectorAll('video');
            modalVideos.forEach(video => {
                video.pause();
                video.currentTime = 0;
                video.remove();
            });
        }
    }

    getCurrentProfile() {
        if (this.currentIndex < this.profiles.length) {
            return this.profiles[this.currentIndex];
        }
        return null;
    }

    /**
     * Método DEFINITIVO para abrir stories
     */
    abrirStoryAtual() {
        const currentProfile = this.getCurrentProfile();
        if (!currentProfile) {
            console.error('❌ Nenhum perfil atual');
            return false;
        }
        
        console.log(`📱 Tentando abrir story: ${currentProfile.name}`);
        
        try {
            // Método 1: Clique direto no avatar (mais confiável)
            const avatar = document.querySelector(`[data-id="${currentProfile.id}"] .item-link`);
            if (avatar) {
                console.log('✅ Abrindo via clique no avatar específico');
                avatar.click();
                return true;
            }
            
            // Método 2: Qualquer avatar disponível
            const anyAvatar = document.querySelector('.stories .story .item-link');
            if (anyAvatar) {
                console.log('✅ Abrindo via primeiro avatar encontrado');
                anyAvatar.click();
                return true;
            }
            
            // Método 3: Tentar método open se existir
            if (this.storiesPool && this.storiesPool.zuck) {
                if (typeof this.storiesPool.zuck.open === 'function') {
                    console.log('✅ Abrindo via método open');
                    this.storiesPool.zuck.open(currentProfile.id);
                    return true;
                }
            }
            
            console.error('❌ Nenhum método funcionou');
            return false;
            
        } catch (error) {
            console.error('❌ Erro ao abrir story:', error);
            return false;
        }
    }

    getProgress() {
        return {
            current: this.currentIndex + 1,
            total: this.profiles.length,
            percentage: Math.round(((this.currentIndex + 1) / this.profiles.length) * 100),
            remaining: this.profiles.length - (this.currentIndex + 1)
        };
    }
}

// ========================================================
// StoriesPool UNIFICADO - Garante que pergunta apareça
// ========================================================

class StoriesPool {
    constructor(onEnd = () => {}) {
        this.stories = [];
        this.showed = null;
        this.onEnd = onEnd;
        this.currentStoryIndex = 0;
        this.totalStories = 0;
        
        console.log('🎬 Inicializando StoriesPool unificado...');
        
        this.zuck = Zuck(document.querySelector("#stories"), {
            skin: "snapgram",
            autoFullScreen: false,
            avatars: true,
            list: false,
            cubeEffect: true,
            openEffect: true,
            localStorage: false,
            backButton: false,
            previousTap: false,
            nextTap: true,
            autoplay: true,
            callbacks: {
                onOpen: function(storyId, callback) {
                    console.log('📱 Story aberto:', storyId);
                    callback();
                    
                    // Reset contadores
                    this.currentStoryIndex = 0;
                    
                    // Verificar total de stories
                    if (this.showed && this.showed.items) {
                        this.totalStories = this.showed.items.length;
                        console.log(`📊 Total de stories no perfil: ${this.totalStories}`);
                    }
                }.bind(this),
                
                onView: function(storyId, callback) {
                    console.log('👁️ Visualizando:', storyId);
                    if (callback) callback();
                }.bind(this),
                
                onEnd: function(storyId, callback) {
                    console.log('🏁 Story item finalizado:', storyId);
                    callback();
                    
                    // Incrementar contador
                    this.currentStoryIndex++;
                    console.log(`📊 Story ${this.currentStoryIndex}/${this.totalStories} finalizado`);
                    
                    // Verificar se é o último story
                    if (this.currentStoryIndex >= this.totalStories) {
                        console.log('🎯 ÚLTIMO STORY DO PERFIL - Mostrando pergunta');
                        this.mostrarPergunta();
                    } else {
                        console.log(`⏭️ Continuando para próximo story (${this.currentStoryIndex + 1}/${this.totalStories})`);
                    }
                }.bind(this),
                
                onClose: function(storyId, callback) {
                    console.log('❌ Story fechado:', storyId);
                    callback();
                }.bind(this)
            }
        });
        
        console.log('✅ StoriesPool unificado inicializado');
    }
    
    /**
     * Método GARANTIDO para mostrar pergunta
     */
    mostrarPergunta() {
        console.log('🎯 Executando mostrarPergunta...');
        
        // Verificar se elemento existe
        const questionElement = document.querySelector("#question");
        if (!questionElement) {
            console.error('❌ Elemento #question não encontrado!');
            
            // Tentar criar elemento se não existir
            this.criarElementoPergunta();
            return;
        }
        
        // Mostrar pergunta
        questionElement.style.display = "block";
        questionElement.style.visibility = "visible";
        questionElement.style.opacity = "1";
        
        console.log('✅ Pergunta exibida');
        
        // Ocultar botão assistir
        const watchElement = document.querySelector("#watch");
        if (watchElement) {
            watchElement.style.display = "none";
        }
        
        // Habilitar botões
        const buttons = document.querySelectorAll("#question button");
        buttons.forEach(btn => {
            btn.disabled = false;
            btn.style.pointerEvents = "auto";
        });
        
        console.log(`✅ ${buttons.length} botões habilitados`);
    }
    
    /**
     * Cria elemento de pergunta se não existir
     */
    criarElementoPergunta() {
        console.log('🔧 Criando elemento de pergunta...');
        
        const questionHtml = `
            <div id="question" style="display: block; text-align: center; padding: 20px;">
                <h3>Você gostou desta publicação?</h3>
                <button class="next" style="margin: 10px; padding: 10px 20px; background: green; color: white; border: none; border-radius: 5px;">SIM</button>
                <button class="next" style="margin: 10px; padding: 10px 20px; background: red; color: white; border: none; border-radius: 5px;">NÃO</button>
            </div>
        `;
        
        // Inserir após o elemento stories
        const storiesElement = document.getElementById('stories');
        if (storiesElement) {
            storiesElement.insertAdjacentHTML('afterend', questionHtml);
            console.log('✅ Elemento de pergunta criado');
        } else {
            // Inserir no body como fallback
            document.body.insertAdjacentHTML('beforeend', questionHtml);
            console.log('✅ Elemento de pergunta criado no body');
        }
    }

    addStory(story) {
        this.stories.push(story);
        if (this.showed == null) {
            this.showStory(story);
        }
    }

    showStory(story) {
        this.currentStoryIndex = 0;
        this.totalStories = story.items ? story.items.length : 0;
        
        this.zuck.add(story);
        this.showed = story;
        
        console.log(`📱 Story adicionado: ${story.name} com ${this.totalStories} itens`);
    }

    clearStories() {
        this.stories.forEach(story => {
            this.zuck.remove(story.id);
        });
        this.stories = [];
        this.showed = null;
        this.currentStoryIndex = 0;
        this.totalStories = 0;
        
        console.log('🧹 Stories limpos');
    }

    next() {
        if (!this.showed) return;

        console.log('⏭️ Avançando para próximo perfil...');
        
        // Ocultar pergunta
        const questionElement = document.querySelector("#question");
        if (questionElement) {
            questionElement.style.display = "none";
        }
        
        this.stopAllVideos();
        this.updateBalance();
        this.showNotification();

        setTimeout(() => {
            this.onEnd();
        }, 1000);
    }
    
    stopAllVideos() {
        const videos = document.querySelectorAll('video');
        videos.forEach(video => {
            if (!video.paused) {
                video.pause();
                video.currentTime = 0;
                video.muted = true;
            }
        });
    }
    
    updateBalance() {
        const gain = this.showed.gain;
        const balanceElement = document.getElementById("balance");
        if (balanceElement) {
            let currentBalance = parseFloat(
                balanceElement.innerText
                    .replace("R$ ", "")
                    .replace(/\./g, "")
                    .replace(",", ".")
                    .replace(/&nbsp;/g, "")
            );
            currentBalance += gain;
            balanceElement.innerText = `R$ ${currentBalance.toFixed(2).replace(".", ",")}`;
        }
    }
    
    showNotification() {
        const gain = this.showed.gain;
        if (typeof Swal !== 'undefined') {
            Swal.fire({
                toast: true,
                position: "top",
                background: "rgb(252 0 98)",
                showConfirmButton: false,
                timer: 2000,
                html: `
                    <div class="flex items-center w-full text-lg text-white">
                        <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-white rounded-lg">
                            ✅
                        </div>
                        <div class="ms-3 font-normal">Você ganhou R$ ${gain.toFixed(2).replace(".", ",")}!</div>
                    </div>
                `
            });
        }
    }
}

// ========================================================
// Disponibilizar globalmente e limpar conflitos
// ========================================================

// Limpar sistemas anteriores
if (window.SimpleProfileManager) {
    delete window.SimpleProfileManager;
}

// Definir como únicos sistemas
window.ProfileManager = ProfileManager;
window.StoriesPool = StoriesPool;

console.log('🌍 Sistema unificado disponível globalmente');

export { ProfileManager, StoriesPool };

