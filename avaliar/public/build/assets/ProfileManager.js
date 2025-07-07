// ProfileManager.js - VERSÃO CORRIGIDA COMPLETA
// Resolve todos os problemas: navegação entre stories, método open, timing

class ProfileManager {
    constructor(onComplete = () => { }) {
        this.profiles = [];
        this.currentIndex = 0;
        this.onComplete = onComplete;
        this.storiesPool = null;
        this.isTransitioning = false;
        this.isInitialized = false;

        console.log('🚀 ProfileManager construtor chamado');
    }

    /**
     * Adiciona múltiplos perfis de uma vez
     */
    addProfiles(profiles) {
        this.profiles.push(...profiles);
        console.log(`📁 ${profiles.length} perfis adicionados ao ProfileManager`);
    }

    /**
     * Inicializa o sistema com o primeiro perfil
     */
    initialize() {
        if (this.profiles.length === 0) {
            console.warn('⚠️ Nenhum perfil adicionado');
            return;
        }

        console.log('🔧 Inicializando ProfileManager...');

        // Aguardar elemento #stories estar disponível
        this.aguardarElementoStories(() => {
            // Cria o StoriesPool
            this.storiesPool = new StoriesPool(() => {
                this.handleProfileComplete();
            });

            // Carrega o perfil atual
            this.loadCurrentProfile();

            // Marca como inicializado
            this.isInitialized = true;

            // Disponibiliza globalmente IMEDIATAMENTE
            window.profileManager = this;

            console.log('✅ ProfileManager inicializado e disponível globalmente');

            // Dispara evento customizado
            window.dispatchEvent(new CustomEvent('profileManagerReady', {
                detail: { profileManager: this }
            }));
        });
    }

    /**
     * Aguarda o elemento #stories estar disponível
     */
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

    /**
     * Carrega o perfil atual no StoriesPool
     */
    loadCurrentProfile() {
        if (this.currentIndex >= this.profiles.length) {
            console.log('🎉 Todos os perfis completados');
            this.onComplete();
            return;
        }

        const currentProfile = this.profiles[this.currentIndex];

        // Limpa stories anteriores
        if (this.storiesPool) {
            this.storiesPool.clearStories();

            // Adiciona o perfil atual
            this.storiesPool.addStory(currentProfile);
        }

        console.log(`📱 Perfil carregado: ${currentProfile.name} (${this.currentIndex + 1}/${this.profiles.length})`);
    }

    /**
     * Manipula a conclusão de um perfil
     */
    handleProfileComplete() {
        if (this.isTransitioning) {
            console.log('⚠️ Transição já em andamento');
            return;
        }

        this.isTransitioning = true;
        console.log('🔄 Completando perfil atual...');

        // Incrementa o índice
        this.currentIndex++;

        // Verifica se há mais perfis
        if (this.currentIndex >= this.profiles.length) {
            console.log('🎉 Todos os perfis foram completados!');
            this.onComplete();
            return;
        }

        // Na linha ~120, substitua:
        setTimeout(() => {
            this.loadCurrentProfile();
            this.isTransitioning = false;

            // Mostrar botão ASSISTIR para o próximo perfil
            const watchButton = document.getElementById('watch');
            if (watchButton) {
                watchButton.style.display = 'block';
                console.log('👁️ Botão ASSISTIR disponível para próximo perfil');
            }

            console.log('✅ Próximo perfil carregado');
        }, 1000);
    }

    /**
     * Força avançar para o próximo perfil
     */
    nextProfile() {
        console.log('🔄 nextProfile chamado');

        if (!this.isInitialized) {
            console.warn('⚠️ ProfileManager não inicializado');
            return;
        }

        // Ocultar elementos
        const congratsModal = document.getElementById('congratsModal');
        const questionElement = document.getElementById('question');

        if (congratsModal) congratsModal.style.display = 'none';
        if (questionElement) questionElement.style.display = 'none';

        // Parar todos os vídeos
        this.stopAllVideos();

        // Avançar
        if (!this.isTransitioning) {
            this.handleProfileComplete();
        }
    }

    /**
     * Para todos os vídeos
     */
    stopAllVideos() {
        const videos = document.querySelectorAll('video');
        videos.forEach(video => {
            if (!video.paused) {
                video.pause();
                video.currentTime = 0;
                video.muted = true;
            }
        });

        // Limpar modal Zuck
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

    /**
     * Retorna o perfil atual
     */
    getCurrentProfile() {
        if (this.currentIndex < this.profiles.length) {
            return this.profiles[this.currentIndex];
        }
        return null;
    }

    /**
     * Abre o story do perfil atual - MÉTODO CORRIGIDO
     */
    abrirStoryAtual() {
        if (!this.storiesPool || !this.storiesPool.zuck) {
            console.error('❌ StoriesPool não disponível');
            return false;
        }

        const currentProfile = this.getCurrentProfile();
        if (!currentProfile) {
            console.error('❌ Nenhum perfil atual');
            return false;
        }

        try {
            console.log(`📱 Abrindo story: ${currentProfile.name}`);

            // CORREÇÃO: Usar o método correto do Zuck
            // O método correto é 'open' mas precisa ser chamado corretamente
            if (typeof this.storiesPool.zuck.open === 'function') {
                this.storiesPool.zuck.open(currentProfile.id);
            } else if (typeof this.storiesPool.zuck.openStory === 'function') {
                this.storiesPool.zuck.openStory(currentProfile.id);
            } else {
                // Fallback: simular clique no avatar
                const avatar = document.querySelector(`[data-id="${currentProfile.id}"]`);
                if (avatar) {
                    avatar.click();
                } else {
                    console.error('❌ Avatar não encontrado');
                    return false;
                }
            }

            return true;
        } catch (error) {
            console.error('❌ Erro ao abrir story:', error);
            return false;
        }
    }

    /**
     * Retorna informações de progresso
     */
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
// StoriesPool CORRIGIDO - Navegação automática entre stories
// ========================================================

class StoriesPool {
    constructor(onEnd = () => { }) {
        this.stories = [];
        this.showed = null;
        this.onEnd = onEnd;
        this.currentStoryIndex = 0; // Rastreia o story atual dentro do perfil

        console.log('🎬 Inicializando StoriesPool...');

        // Inicializa o Zuck com configuração CORRIGIDA
        this.zuck = Zuck(document.querySelector("#stories"), {
            skin: "snapgram",
            autoFullScreen: false,
            avatars: true,
            list: false,
            cubeEffect: true,
            openEffect: true,
            localStorage: false,
            backButton: true, // MUDAR PARA true
            previousTap: false,
            nextTap: true,
            autoplay: true,
            // ADICIONAR ESTAS CONFIGURAÇÕES:
            timeouts: {
                photoStory: 3000, // 3 segundos para fotos
                videoStory: 0     // Usar duração do vídeo
            },
            callbacks: {
                onOpen: function (storyId, callback) {
                    console.log('📱 Story aberto:', storyId);
                    callback();

                    // Reset do índice quando abre um novo perfil
                    this.currentStoryIndex = 0;

                    // Desativar navegação manual apenas para voltar
                    setTimeout(() => {
                        this.desativarNavegacaoVoltar();
                    }, 100);
                }.bind(this),

                onView: function (storyId, callback) {
                    console.log('👁️ Visualizando:', storyId);
                    if (callback) callback();
                }.bind(this),

                // CORREÇÃO PRINCIPAL: onEnd só para o último story do perfil
                // SUBSTITUIR TODO O CALLBACK onEnd por:
                onEnd: function (storyId, callback) {
                    console.log('🏁 Story item finalizado:', storyId);
                    callback();

                    // Verificar se é o último story do perfil atual
                    const currentProfile = this.showed;
                    if (currentProfile && currentProfile.items) {
                        this.currentStoryIndex++;

                        console.log(`📊 Story ${this.currentStoryIndex}/${currentProfile.items.length} do perfil ${currentProfile.name}`);

                        if (this.currentStoryIndex >= currentProfile.items.length) {
                            // É o último story do perfil - fechar modal e mostrar pergunta
                            console.log('🎯 Último story do perfil finalizado - mostrando pergunta');

                            // Fechar o modal do Zuck
                            setTimeout(() => {
                                // Fechar modal
                                const zuckModal = document.getElementById('zuck-modal');
                                if (zuckModal) {
                                    zuckModal.style.display = 'none';
                                }

                                // Mostrar pergunta
                                const questionElement = document.getElementById("question");
                                if (questionElement) {
                                    questionElement.style.display = "block";
                                    console.log('✅ Pergunta exibida');
                                }

                                // Esconder botão assistir
                                const watchElement = document.getElementById("watch");
                                if (watchElement) {
                                    watchElement.style.display = "none";
                                }
                            }, 500);

                        } else {
                            // Ainda há stories no perfil - continuar automaticamente
                            console.log(`⏭️ Continuando para próximo story (${this.currentStoryIndex + 1}/${currentProfile.items.length})`);
                        }
                    }
                }.bind(this),

                onNextItem: function (storyId, nextStoryId, callback) {
                    console.log('⏭️ Próximo item:', storyId, '->', nextStoryId);
                    callback();
                }.bind(this),

                onNavigateItem: function (storyId, nextStoryId, callback) {
                    console.log('🔄 Navegando:', storyId, '->', nextStoryId);
                    callback();
                }.bind(this),

                onClose: function (storyId, callback) {
                    console.log('❌ Story fechado:', storyId);
                    callback();
                }.bind(this)
            }
        });

        console.log('✅ StoriesPool inicializado');
    }

    /**
     * Desativa navegação manual apenas para voltar
     */
    desativarNavegacaoVoltar() {
        try {
            // Encontrar área de navegação para voltar (lado esquerdo)
            const storyViewer = document.querySelector('.zuck-modal .story-viewer');
            if (storyViewer) {
                // Adicionar overlay apenas no lado esquerdo para bloquear voltar
                const overlay = document.createElement('div');
                overlay.style.cssText = `
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 30%;
                    height: 100%;
                    z-index: 9999;
                    background: transparent;
                `;

                overlay.addEventListener('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('🚫 Navegação para trás bloqueada');
                    return false;
                });

                storyViewer.appendChild(overlay);
            }
        } catch (error) {
            console.error('⚠️ Erro ao desativar navegação:', error);
        }
    }

    addStory(story) {
        this.stories.push(story);
        if (this.showed == null) {
            this.showStory(story);
        }
    }

    showStory(story) {
        // ADICIONAR ESTAS LINHAS NO INÍCIO:
        console.log(`📱 Iniciando exibição do story: ${story.name}`);
        this.currentStoryIndex = 0; // Reset importante

        this.zuck.add(story);
        this.showed = story;
        console.log(`📱 Story adicionado: ${story.name} com ${story.items.length} itens`);
    }

    clearStories() {
        this.stories.forEach(story => {
            this.zuck.remove(story.id);
        });
        this.stories = [];
        this.showed = null;
        this.currentStoryIndex = 0;
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

        // Parar vídeos
        const videos = document.querySelectorAll('video');
        videos.forEach(video => {
            if (!video.paused) {
                video.pause();
                video.currentTime = 0;
                video.muted = true;
            }
        });

        // Atualizar saldo
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

        // Notificação de ganho
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

        // Chamar callback de fim
        setTimeout(() => {
            this.onEnd();
        }, 1000);
    }
}

// ========================================================
// Disponibilizar globalmente IMEDIATAMENTE
// ========================================================

// Criar instância global
window.ProfileManager = ProfileManager;
window.StoriesPool = StoriesPool;

console.log('🌍 Classes ProfileManager e StoriesPool disponíveis globalmente');

// Exportar para módulos
export { ProfileManager, StoriesPool };

