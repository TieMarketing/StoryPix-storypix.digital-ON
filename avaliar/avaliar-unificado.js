// ========================================================
// CÓDIGO UNIFICADO PARA AVALIAR.HTML
// Remove conflitos e garante funcionamento
// ========================================================

// REMOVER COMPLETAMENTE O SIMPLE-PROFILE-MANAGER
// Comentar ou remover esta linha do HTML:
// <script src="./StoryPix_files/simple-profile-manager.js"></script>

document.addEventListener('DOMContentLoaded', function() {
    console.log('📄 DOM carregado - Sistema unificado');
    
    // Limpar sistemas conflitantes
    if (window.SimpleProfileManager) {
        delete window.SimpleProfileManager;
        console.log('🧹 SimpleProfileManager removido');
    }
    
    // Aguardar ProfileManager unificado
    function aguardarSistemaUnificado(callback, timeout = 20000) {
        const startTime = Date.now();
        let tentativas = 0;
        
        function verificar() {
            tentativas++;
            
            // Verificação mais robusta
            const profileManagerOk = window.profileManager && 
                                   window.profileManager.isInitialized === true &&
                                   window.profileManager.storiesPool &&
                                   typeof window.profileManager.abrirStoryAtual === 'function';
            
            if (profileManagerOk) {
                console.log(`✅ Sistema unificado disponível (tentativa ${tentativas})`);
                callback(true);
            } else if (Date.now() - startTime > timeout) {
                console.log(`⏰ Timeout após ${tentativas} tentativas`);
                callback(false);
            } else {
                console.log(`⏳ Aguardando sistema... (tentativa ${tentativas})`);
                setTimeout(verificar, 300);
            }
        }
        
        verificar();
    }
    
    // Configurar botão ASSISTIR
    const watchButton = document.getElementById('watch');
    if (watchButton) {
        // Remover listeners anteriores
        const newWatchButton = watchButton.cloneNode(true);
        watchButton.parentNode.replaceChild(newWatchButton, watchButton);
        
        newWatchButton.addEventListener('click', function() {
            console.log('👆 Botão ASSISTIR clicado (sistema unificado)');
            
            // Verificação imediata
            if (window.profileManager && 
                window.profileManager.isInitialized &&
                typeof window.profileManager.abrirStoryAtual === 'function') {
                
                console.log('✅ Sistema disponível, abrindo story');
                
                const currentProfile = window.profileManager.getCurrentProfile();
                if (currentProfile) {
                    console.log(`📱 Abrindo perfil: ${currentProfile.name}`);
                    
                    const sucesso = window.profileManager.abrirStoryAtual();
                    if (sucesso) {
                        console.log('✅ Story aberto com sucesso');
                    } else {
                        console.error('❌ Falha ao abrir story');
                        alert('Erro ao abrir story. Tente novamente.');
                    }
                } else {
                    console.error('❌ Nenhum perfil disponível');
                    alert('Nenhum perfil disponível.');
                }
            } else {
                console.log('⚠️ Sistema não disponível, aguardando...');
                
                // Aguardar um pouco mais
                aguardarSistemaUnificado(function(disponivel) {
                    if (disponivel) {
                        console.log('✅ Sistema carregou, tentando novamente');
                        newWatchButton.click();
                    } else {
                        console.error('❌ Sistema não carregou');
                        alert('Sistema não carregou. Recarregue a página.');
                    }
                }, 5000);
            }
        });
        
        console.log('✅ Botão ASSISTIR configurado (sistema unificado)');
    }
    
    // Aguardar sistema e mostrar botão
    aguardarSistemaUnificado(function(disponivel) {
        if (disponivel) {
            console.log('🎉 Sistema unificado carregado com sucesso!');
            
            if (newWatchButton || watchButton) {
                const btn = newWatchButton || watchButton;
                btn.style.display = 'block';
                console.log('👁️ Botão ASSISTIR disponível');
            }
            
            const currentProfile = window.profileManager.getCurrentProfile();
            if (currentProfile) {
                console.log(`📱 Perfil atual: ${currentProfile.name}`);
            }
        } else {
            console.error('❌ Sistema unificado não carregou');
            
            // Mostrar botão mesmo assim como fallback
            if (newWatchButton || watchButton) {
                const btn = newWatchButton || watchButton;
                btn.style.display = 'block';
                console.log('⚠️ Botão mostrado como fallback');
            }
        }
    });
    
    // Configurar botões SIM/NÃO
    function configurarBotoesResposta() {
        const buttons = document.querySelectorAll('.next, #question button');
        buttons.forEach(button => {
            // Remover listeners anteriores
            const newButton = button.cloneNode(true);
            button.parentNode.replaceChild(newButton, button);
            
            newButton.addEventListener('click', function() {
                console.log('👆 Botão SIM/NÃO clicado');
                
                if (window.profileManager && window.profileManager.storiesPool) {
                    window.profileManager.storiesPool.next();
                } else {
                    console.error('❌ Sistema não disponível para avançar');
                }
            });
        });
        
        console.log(`✅ ${buttons.length} botões SIM/NÃO configurados`);
    }
    
    // Configurar botões após carregamento
    setTimeout(configurarBotoesResposta, 2000);
    
    // Reconfigurar botões periodicamente (caso sejam criados dinamicamente)
    setInterval(configurarBotoesResposta, 5000);
});

// ========================================================
// FUNÇÃO DE DEBUG MELHORADA
// ========================================================

function verificarSistemaCompleto() {
    console.log('🔍 === VERIFICAÇÃO COMPLETA DO SISTEMA ===');
    console.log('ProfileManager existe:', !!window.profileManager);
    console.log('ProfileManager inicializado:', window.profileManager?.isInitialized);
    console.log('StoriesPool existe:', !!window.profileManager?.storiesPool);
    console.log('Método abrirStoryAtual existe:', typeof window.profileManager?.abrirStoryAtual);
    console.log('Perfil atual:', window.profileManager?.getCurrentProfile()?.name);
    console.log('Progresso:', window.profileManager?.getProgress());
    
    // Verificar elementos HTML
    console.log('Elemento #stories existe:', !!document.getElementById('stories'));
    console.log('Elemento #question existe:', !!document.getElementById('question'));
    console.log('Elemento #watch existe:', !!document.getElementById('watch'));
    console.log('Botões .next encontrados:', document.querySelectorAll('.next').length);
    
    // Verificar SimpleProfileManager (deve ser undefined)
    console.log('SimpleProfileManager removido:', window.SimpleProfileManager === undefined);
    
    console.log('==========================================');
}

window.verificarSistemaCompleto = verificarSistemaCompleto;

// ========================================================
// MONITORAMENTO AUTOMÁTICO
// ========================================================

// Verificar status a cada 15 segundos
setInterval(function() {
    if (window.profileManager && window.profileManager.isInitialized) {
        const progress = window.profileManager.getProgress();
        const currentProfile = window.profileManager.getCurrentProfile();
        console.log(`📊 Status: ${progress.current}/${progress.total} - ${currentProfile?.name || 'Finalizado'}`);
    }
}, 15000);

// Verificar se pergunta está visível
setInterval(function() {
    const questionElement = document.getElementById('question');
    if (questionElement) {
        const isVisible = questionElement.style.display !== 'none' && 
                         questionElement.style.visibility !== 'hidden' &&
                         questionElement.offsetParent !== null;
        
        if (isVisible) {
            console.log('👁️ Pergunta SIM/NÃO está visível');
        }
    }
}, 10000);

