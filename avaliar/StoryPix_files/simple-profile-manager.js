// SOLUÇÃO ROBUSTA - ProfileManager Simplificado
// Este arquivo resolve os problemas de carregamento e compatibilidade

class SimpleProfileManager {
    constructor() {
        this.profiles = [];
        this.currentIndex = 0;
        this.isInitialized = false;
        
        console.log('🚀 SimpleProfileManager inicializado');
    }

    // Adiciona perfis de forma segura
    addProfiles(profiles) {
        this.profiles = [...profiles];
        console.log(`📁 ${this.profiles.length} perfis adicionados`);
    }

    // Inicializa o sistema
    initialize() {
        if (this.isInitialized) return;
        
        try {
            // Verificar se elementos necessários existem
            const storiesElement = document.querySelector('#stories');
            const questionElement = document.querySelector('#question');
            const watchButton = document.querySelector('#watch');
            
            if (!storiesElement) {
                throw new Error('Elemento #stories não encontrado');
            }
            
            this.isInitialized = true;
            this.updateInterface();
            
            console.log('✅ SimpleProfileManager inicializado com sucesso');
            
        } catch (error) {
            console.error('❌ Erro na inicialização:', error);
            this.isInitialized = false;
        }
    }

    // Avança para próximo perfil
    nextProfile() {
        if (!this.isInitialized) {
            console.warn('⚠️ ProfileManager não inicializado, usando fallback');
            this.fallbackBehavior();
            return;
        }

        console.log(`🔄 Avançando do perfil ${this.currentIndex + 1}`);
        
        // Simular ganho de dinheiro
        this.simulateEarning();
        
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
        
        // Simular carregamento do próximo perfil
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
            );
            
            currentBalance += gain;
            balanceElement.innerText = `R$ ${currentBalance.toFixed(2).replace('.', ',')}`;
        }

        // Mostrar notificação se SweetAlert disponível
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

    // Comportamento de fallback
    fallbackBehavior() {
        console.log('🔄 Executando comportamento original');
        
        const questionElement = document.getElementById('question');
        const modalElement = document.getElementById('congratsModal');
        
        if (questionElement) {
            questionElement.style.display = 'none';
        }
        
        if (modalElement) {
            modalElement.style.display = 'block';
        }
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
            current: this.currentIndex + 1,
            total: this.profiles.length,
            percentage: Math.round(((this.currentIndex + 1) / this.profiles.length) * 100),
            remaining: this.profiles.length - (this.currentIndex + 1)
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

    // Métodos de compatibilidade
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
}

// Dados dos perfis (simplificados para teste)
const testProfiles = [
    {
        id: "perfil1",
        photo: "./StoryPix_files/avatar1.jpg",
        name: "influencer1",
        gain: 51.65
    },
    {
        id: "perfil2", 
        photo: "./StoryPix_files/avatar2.jpg",
        name: "influencer2",
        gain: 47.88
    },
    {
        id: "perfil3",
        photo: "./StoryPix_files/avatar3.jpg", 
        name: "influencer3",
        gain: 53.15
    }
];

// Inicialização segura
document.addEventListener('DOMContentLoaded', function() {
    // Aguardar um pouco para garantir que DOM está pronto
    setTimeout(() => {
        try {
            // Criar instância global
            window.profileManager = new SimpleProfileManager();
            
            // Adicionar perfis
            window.profileManager.addProfiles(testProfiles);
            
            // Inicializar
            window.profileManager.initialize();
            
            // Função global para compatibilidade
            window.nextProfile = function() {
                if (window.profileManager) {
                    window.profileManager.nextProfile();
                }
            };
            
            // Alias para compatibilidade
            window.next = window.nextProfile;
            
            console.log('🎉 Sistema de múltiplos perfis carregado!');
            
        } catch (error) {
            console.error('❌ Erro ao carregar sistema:', error);
        }
    }, 500);
});

// Exportar para uso como módulo se necessário
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SimpleProfileManager };
}

