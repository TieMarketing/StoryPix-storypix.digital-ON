// SISTEMA INTEGRADO - Compatibilidade Total
// Este arquivo resolve os conflitos entre SimpleProfileManager e ProfileManager

class IntegratedProfileManager {
    constructor() {
        this.profiles = [];
        this.currentIndex = 0;
        this.isInitialized = false;
        this.storiesPool = null;
        
        // Configurações dos stories
        this.storiesConfig = {
            backButton: true,
            backNative: false,
            previousTap: true,
            skin: 'snapgram',
            avatars: true,
            stories: []
        };
        
        console.log('🚀 IntegratedProfileManager inicializado');
    }

    // Adiciona perfis e cria stories automaticamente
    addProfiles(profiles) {
        this.profiles = [...profiles];
        this.createStoriesData();
        console.log(`📁 ${this.profiles.length} perfis adicionados com stories`);
    }

    // Cria dados dos stories baseado nos perfis
    createStoriesData() {
        this.storiesConfig.stories = this.profiles.map((profile, index) => ({
            id: profile.id || `profile_${index}`,
            photo: profile.photo,
            name: profile.name,
            link: '',
            lastUpdated: Date.now(),
            items: [
                {
                    id: `${profile.id}_story_1`,
                    type: 'photo',
                    length: 3,
                    src: profile.photo,
                    preview: profile.photo,
                    link: '',
                    linkText: false,
                    time: Date.now()
                }
            ]
        }));
    }

    // Inicializa o sistema completo
    initialize() {
        if (this.isInitialized) return;
        
        try {
            // Verificar elementos necessários
            const storiesElement = document.querySelector('#stories');
            if (!storiesElement) {
                throw new Error('Elemento #stories não encontrado');
            }
            
            // Inicializar Zuck se disponível
            this.initializeZuck();
            
            this.isInitialized = true;
            this.updateInterface();
            
            console.log('✅ IntegratedProfileManager inicializado com sucesso');
            
        } catch (error) {
            console.error('❌ Erro na inicialização:', error);
            this.isInitialized = false;
        }
    }

    // Inicializa o Zuck Stories
    initializeZuck() {
        if (typeof Zuck !== 'undefined' && this.storiesConfig.stories.length > 0) {
            try {
                this.storiesPool = {
                    zuck: new Zuck('stories', {
                        ...this.storiesConfig,
                        callbacks: {
                            onOpen: (storyId, callback) => {
                                console.log(`📱 Story aberto: ${storyId}`);
                                callback();
                            },
                            onView: (storyId) => {
                                console.log(`👁️ Visualizando: ${storyId}`);
                            },
                            onEnd: (storyId, callback) => {
                                console.log(`🏁 Story finalizado: ${storyId}`);
                                this.onStoryEnd(storyId);
                                callback();
                            },
                            onClose: (storyId, callback) => {
                                console.log(`📊 Story fechado: ${storyId}`);
                                callback();
                            },
                            onNextItem: (storyId, nextStoryId, callback) => {
                                console.log(`⏭️ Próximo item: ${storyId} -> ${nextStoryId}`);
                                callback();
                            }
                        }
                    })
                };
                
                console.log('📚 Zuck Stories inicializado');
                
            } catch (error) {
                console.warn('⚠️ Erro ao inicializar Zuck:', error);
                this.storiesPool = { zuck: null };
            }
        } else {
            console.warn('⚠️ Zuck não disponível ou sem stories');
            this.storiesPool = { zuck: null };
        }
    }

    // Abre um perfil específico
    openProfile(profileId) {
        console.log(`📱 Abrindo perfil: ${profileId}`);
        
        if (this.storiesPool && this.storiesPool.zuck) {
            try {
                // Método correto para abrir story no Zuck
                this.storiesPool.zuck.open(profileId);
                return true;
            } catch (error) {
                console.error('❌ Erro ao abrir story:', error);
                return false;
            }
        } else {
            console.warn('⚠️ Stories não disponível, usando fallback');
            this.fallbackStoryOpen(profileId);
            return false;
        }
    }

    // Fallback quando Zuck não está disponível
    fallbackStoryOpen(profileId) {
        const profile = this.profiles.find(p => p.id === profileId || p.name === profileId);
        if (profile) {
            console.log(`📱 Simulando abertura do perfil: ${profile.name}`);
            
            // Simular visualização
            setTimeout(() => {
                this.simulateStoryViewing(profileId);
            }, 1000);
        }
    }

    // Simula visualização de story
    simulateStoryViewing(profileId) {
        console.log(`👁️ Simulando visualização: ${profileId}`);
        
        // Após 3 segundos, finalizar automaticamente
        setTimeout(() => {
            this.onStoryEnd(profileId);
        }, 3000);
    }

    // Callback quando story termina
    onStoryEnd(storyId) {
        console.log(`🏁 Story ${storyId} finalizado`);
        
        // Encontrar índice do perfil atual
        const profileIndex = this.profiles.findIndex(p => 
            p.id === storyId || p.name === storyId
        );
        
        if (profileIndex !== -1) {
            this.currentIndex = profileIndex;
            this.simulateEarning();
            this.nextProfile();
        }
    }

    // Avança para próximo perfil
    nextProfile() {
        console.log(`🔄 Avançando do perfil ${this.currentIndex + 1}`);
        
        // Incrementar índice
        this.currentIndex++;
        
        // Verificar se há mais perfis
        if (this.currentIndex >= this.profiles.length) {
            console.log('🎉 Todos os perfis completados!');
            this.onComplete();
            return;
        }
        
        // Atualizar interface
        this.updateInterface();
        
        // Mostrar próximo perfil após delay
        setTimeout(() => {
            this.showNextProfile();
        }, 1000);
    }

    // Simula ganho de dinheiro
    simulateEarning() {
        const currentProfile = this.getCurrentProfile();
        if (!currentProfile) return;

        const gain = currentProfile.gain || 50;
        const balanceElement = document.getElementById('balance');
        
        if (balanceElement) {
            let currentBalance = parseFloat(
                balanceElement.innerText
                    .replace('R$ ', '')
                    .replace(/\./g, '')
                    .replace(',', '.')
            ) || 0;
            
            currentBalance += gain;
            balanceElement.innerText = `R$ ${currentBalance.toFixed(2).replace('.', ',')}`;
        }

        // Mostrar notificação
        this.showEarningNotification(gain);
    }

    // Mostra notificação de ganho
    showEarningNotification(gain) {
        if (typeof Swal !== 'undefined') {
            Swal.fire({
                toast: true,
                position: 'top',
                background: 'rgb(252 0 98)',
                showConfirmButton: false,
                timer: 2000,
                html: `
                    <div class="flex items-center w-full text-lg text-white">
                        <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-white rounded-lg">
                            ✅
                        </div>
                        <div class="ms-3 font-normal">Você ganhou R$ ${gain.toFixed(2).replace('.', ',')}!</div>
                    </div>
                `
            });
        } else {
            console.log(`💰 Ganho: R$ ${gain.toFixed(2).replace('.', ',')}`);
        }
    }

    // Mostra próximo perfil
    showNextProfile() {
        const questionElement = document.querySelector('#question');
        const watchButton = document.querySelector('#watch');
        
        if (questionElement) {
            questionElement.style.display = 'none';
        }
        
        if (watchButton) {
            watchButton.style.display = 'block';
        }
        
        console.log(`📱 Perfil ${this.currentIndex + 1} carregado`);
    }

    // Atualiza interface
    updateInterface() {
        const progress = this.getProgress();
        
        // Atualizar contador
        const counterElement = document.getElementById('profile-counter');
        if (counterElement) {
            counterElement.textContent = `${progress.current} de ${progress.total}`;
        }
        
        // Atualizar barra de progresso
        const progressBar = document.getElementById('progress-bar');
        if (progressBar) {
            progressBar.style.width = `${progress.percentage}%`;
        }
        
        // Atualizar informações do perfil
        const currentProfile = this.getCurrentProfile();
        if (currentProfile) {
            const profileInfo = document.getElementById('current-profile-info');
            if (profileInfo) {
                profileInfo.innerHTML = `
                    <div class="profile-info">
                        <img src="${currentProfile.photo}" alt="${currentProfile.name}" class="profile-avatar">
                        <span class="profile-name">@${currentProfile.name}</span>
                        <span class="profile-reward">+R$ ${currentProfile.gain.toFixed(2).replace('.', ',')}</span>
                    </div>
                `;
            }
        }
    }

    // Retorna perfil atual
    getCurrentProfile() {
        if (this.currentIndex < this.profiles.length) {
            return this.profiles[this.currentIndex];
        }
        return null;
    }

    // Retorna progresso
    getProgress() {
        return {
            current: Math.min(this.currentIndex + 1, this.profiles.length),
            total: this.profiles.length,
            percentage: Math.round((Math.min(this.currentIndex + 1, this.profiles.length) / this.profiles.length) * 100),
            remaining: Math.max(0, this.profiles.length - (this.currentIndex + 1))
        };
    }

    // Callback quando completa todos os perfis
    onComplete() {
        console.log('🎯 Redirecionando para página final...');
        
        // Tentar usar Livewire primeiro
        if (typeof Livewire !== 'undefined' && Livewire.navigate) {
            Livewire.navigate('../pix');
        } else {
            // Fallback para redirecionamento normal
            window.location.href = '../pix';
        }
    }

    // Métodos de compatibilidade com ProfileManager antigo
    getStats() {
        const totalGain = this.profiles.reduce((sum, profile) => sum + (profile.gain || 50), 0);
        const earnedSoFar = this.profiles
            .slice(0, this.currentIndex)
            .reduce((sum, profile) => sum + (profile.gain || 50), 0);

        return {
            totalProfiles: this.profiles.length,
            completedProfiles: this.currentIndex,
            totalPotentialGain: totalGain,
            earnedSoFar: earnedSoFar,
            remainingGain: totalGain - earnedSoFar
        };
    }

    // Método para compatibilidade com código antigo
    isReady() {
        return this.isInitialized && this.profiles.length > 0;
    }

    // Método para aguardar inicialização
    async waitForReady(timeout = 10000) {
        const startTime = Date.now();
        
        while (!this.isReady() && (Date.now() - startTime) < timeout) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        
        return this.isReady();
    }
}

// Dados dos perfis expandidos
const enhancedProfiles = [
    {
        id: "igao",
        photo: "./StoryPix_files/avatar1.jpg",
        name: "igao",
        gain: 51.65
    },
    {
        id: "maria_silva", 
        photo: "./StoryPix_files/avatar2.jpg",
        name: "maria_silva",
        gain: 47.88
    },
    {
        id: "joao_tech",
        photo: "./StoryPix_files/avatar3.jpg", 
        name: "joao_tech",
        gain: 53.15
    },
    {
        id: "ana_beauty",
        photo: "./StoryPix_files/avatar4.jpg", 
        name: "ana_beauty",
        gain: 45.30
    },
    {
        id: "carlos_fit",
        photo: "./StoryPix_files/avatar5.jpg", 
        name: "carlos_fit",
        gain: 49.75
    }
];

// Inicialização segura e compatível
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        try {
            // Criar instância global
            window.profileManager = new IntegratedProfileManager();
            
            // Adicionar perfis
            window.profileManager.addProfiles(enhancedProfiles);
            
            // Inicializar
            window.profileManager.initialize();
            
            // Funções globais para compatibilidade
            window.nextProfile = function() {
                if (window.profileManager && window.profileManager.isReady()) {
                    window.profileManager.nextProfile();
                } else {
                    console.warn('⚠️ ProfileManager não está pronto');
                }
            };
            
            // Função para abrir perfil (compatibilidade com código antigo)
            window.openProfile = function(profileId) {
                if (window.profileManager && window.profileManager.isReady()) {
                    return window.profileManager.openProfile(profileId);
                } else {
                    console.warn('⚠️ ProfileManager não está pronto para abrir perfil');
                    return false;
                }
            };
            
            // Aliases para compatibilidade
            window.next = window.nextProfile;
            
            // Expor método de verificação
            window.checkProfileManager = function() {
                return window.profileManager && window.profileManager.isReady();
            };
            
            // Expor método de espera
            window.waitForProfileManager = async function(timeout = 5000) {
                if (window.profileManager) {
                    return await window.profileManager.waitForReady(timeout);
                }
                return false;
            };
            
            console.log('🎉 Sistema Integrado de Perfis carregado!');
            console.log('📊 Status:', {
                initialized: window.profileManager.isInitialized,
                profiles: window.profileManager.profiles.length,
                hasStories: !!window.profileManager.storiesPool
            });
            
        } catch (error) {
            console.error('❌ Erro ao carregar sistema integrado:', error);
        }
    }, 500);
});

// Função adicional para debugging
window.debugProfileManager = function() {
    if (window.profileManager) {
        console.log('🔍 Debug ProfileManager:', {
            isInitialized: window.profileManager.isInitialized,
            currentIndex: window.profileManager.currentIndex,
            profilesCount: window.profileManager.profiles.length,
            currentProfile: window.profileManager.getCurrentProfile(),
            progress: window.profileManager.getProgress(),
            stats: window.profileManager.getStats(),
            hasZuck: !!(window.profileManager.storiesPool && window.profileManager.storiesPool.zuck)
        });
    } else {
        console.log('❌ ProfileManager não encontrado');
    }
};

// Exportar para uso como módulo se necessário
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { IntegratedProfileManager };
}