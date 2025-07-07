// SCRIPT DE COMPATIBILIDADE - Resolve conflitos específicos
// Este script deve ser carregado APÓS o IntegratedProfileManager

(function() {
    'use strict';
    
    console.log('🔧 Iniciando script de compatibilidade...');
    
    // Função para aguardar ProfileManager estar pronto
    function aguardarProfileManager(callback, maxTentativas = 50) {
        let tentativas = 0;
        
        function verificar() {
            tentativas++;
            
            if (window.profileManager && window.profileManager.isReady()) {
                console.log('✅ ProfileManager encontrado e pronto!');
                callback(true);
                return;
            }
            
            if (tentativas >= maxTentativas) {
                console.log('❌ ProfileManager não carregou após múltiplas tentativas');
                callback(false);
                return;
            }
            
            console.log(`⏰ Aguardando ProfileManager... (${tentativas}/${maxTentativas})`);
            setTimeout(verificar, 200);
        }
        
        verificar();
    }
    
    // Sobrescrever função problemática do botão ASSISTIR
    function configurarBotaoAssistir() {
        const watchButton = document.querySelector('#watch');
        if (!watchButton) {
            console.log('⚠️ Botão #watch não encontrado');
            return;
        }
        
        // Remover todos os event listeners existentes
        const newButton = watchButton.cloneNode(true);
        watchButton.parentNode.replaceChild(newButton, watchButton);
        
        // Adicionar novo event listener compatível
        newButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('👆 Botão ASSISTIR clicado (compatibilidade)');
            
            if (!window.profileManager || !window.profileManager.isReady()) {
                console.log('⚠️ ProfileManager não está pronto, aguardando...');
                
                aguardarProfileManager(function(sucesso) {
                    if (sucesso) {
                        executarAcaoAssistir();
                    } else {
                        console.log('❌ Não foi possível carregar ProfileManager');
                        // Fallback para comportamento original
                        executarFallback();
                    }
                });
                return;
            }
            
            executarAcaoAssistir();
        });
        
        console.log('🔧 Botão ASSISTIR reconfigurado');
    }
    
    // Executa a ação principal do botão assistir
    function executarAcaoAssistir() {
        try {
            // Pegar o primeiro perfil disponível
            const primeiroPerfilId = window.profileManager.profiles[0]?.id || 
                                   window.profileManager.profiles[0]?.name || 
                                   'igao';
            
            console.log(`📱 Tentando abrir perfil: ${primeiroPerfilId}`);
            
            // Tentar abrir com o método correto
            const sucesso = window.profileManager.openProfile(primeiroPerfilId);
            
            if (!sucesso) {
                console.log('⚠️ Abertura via Zuck falhou, usando simulação');
                // Se falhar, simular o processo
                simularVisualizacao(primeiroPerfilId);
            }
            
        } catch (error) {
            console.error('❌ Erro ao executar ação assistir:', error);
            executarFallback();
        }
    }
    
    // Simula visualização quando Zuck não funciona
    function simularVisualizacao(profileId) {
        console.log(`🎭 Simulando visualização do perfil: ${profileId}`);
        
        // Esconder botão assistir
        const watchButton = document.querySelector('#watch');
        if (watchButton) {
            watchButton.style.display = 'none';
        }
        
        // Mostrar algum feedback visual se possível
        const questionElement = document.querySelector('#question');
        if (questionElement) {
            questionElement.innerHTML = `
                <div class="text-center">
                    <div class="loading-spinner">
                        <div class="spinner"></div>
                    </div>
                    <p>Visualizando perfil @${profileId}...</p>
                </div>
            `;
        }
        
        // Simular tempo de visualização
        setTimeout(() => {
            console.log(`✅ Visualização simulada concluída: ${profileId}`);
            window.profileManager.onStoryEnd(profileId);
        }, 3000);
    }
    
    // Fallback para comportamento original
    function executarFallback() {
        console.log('🔄 Executando comportamento de fallback');
        
        const questionElement = document.getElementById('question');
        const modalElement = document.getElementById('congratsModal');
        
        if (questionElement) {
            questionElement.style.display = 'none';
        }
        
        if (modalElement) {
            modalElement.style.display = 'block';
        } else {
            // Se não há modal, simular progresso
            if (window.nextProfile) {
                setTimeout(window.nextProfile, 1000);
            }
        }
    }
    
    // Adicionar estilos CSS para loading se necessário
    function adicionarEstilosLoading() {
        if (document.getElementById('compatibility-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'compatibility-styles';
        style.textContent = `
            .loading-spinner {
                display: flex;
                justify-content: center;
                align-items: center;
                margin: 20px 0;
            }
            
            .spinner {
                width: 40px;
                height: 40px;
                border: 4px solid #f3f3f3;
                border-top: 4px solid #fc0062;
                border-radius: 50%;
                animation: spin 1s linear infinite;
            }
            
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            
            .profile-info {
                display: flex;
                align-items: center;
                gap: 10px;
                padding: 10px;
                background: rgba(255,255,255,0.1);
                border-radius: 8px;
                margin: 10px 0;
            }
            
            .profile-avatar {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                object-fit: cover;
            }
            
            .profile-name {
                color: #333;
                font-weight: bold;
            }
            
            .profile-reward {
                color: #fc0062;
                font-weight: bold;
                margin-left: auto;
            }
        `;
        
        document.head.appendChild(style);
    }
    
    // Função para corrigir problemas específicos mencionados nos logs
    function corrigirProblemasEspecificos() {
        // Problema 1: stories1-updated.js tentando usar profileManager.storiesPool.zuck.open
        if (window.profileManager && !window.profileManager.storiesPool) {
            console.log('🔧 Corrigindo storiesPool indefinido');
            window.profileManager.storiesPool = { zuck: null };
        }
        
        // Problema 2: Método open não existe
        if (window.profileManager && window.profileManager.storiesPool && !window.profileManager.storiesPool.zuck) {
            console.log('🔧 Criando mock do Zuck para compatibilidade');
            window.profileManager.storiesPool.zuck = {
                open: function(storyId) {
                    console.log(`🎭 Mock Zuck: abrindo ${storyId}`);
                    // Usar o método de fallback do profileManager
                    if (window.profileManager.fallbackStoryOpen) {
                        window.profileManager.fallbackStoryOpen(storyId);
                    }
                    return true;
                }
            };
        }
    }
    
    // Inicialização do script de compatibilidade
    function inicializar() {
        console.log('🚀 Configurando compatibilidade...');
        
        // Aguardar DOM estar pronto
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', executarConfiguracoes);
        } else {
            executarConfiguracoes();
        }
    }
    
    function executarConfiguracoes() {
        // Aguardar um pouco para garantir que outros scripts carregaram
        setTimeout(() => {
            adicionarEstilosLoading();
            
            aguardarProfileManager(function(sucesso) {
                if (sucesso) {
                    corrigirProblemasEspecificos();
                    configurarBotaoAssistir();
                    console.log('✅ Compatibilidade configurada com sucesso!');
                } else {
                    console.log('⚠️ ProfileManager não carregou, configurando fallback');
                    configurarBotaoAssistir(); // Configurar mesmo sem ProfileManager
                }
            });
        }, 800);
    }
    
    // Exportar funções úteis globalmente
    window.compatibilityManager = {
        aguardarProfileManager: aguardarProfileManager,
        executarAcaoAssistir: executarAcaoAssistir,
        simularVisualizacao: simularVisualizacao,
        corrigirProblemasEspecificos: corrigirProblemasEspecificos
    };
    
    // Inicializar
    inicializar();
    
    console.log('🔧 Script de compatibilidade carregado');
    
})();