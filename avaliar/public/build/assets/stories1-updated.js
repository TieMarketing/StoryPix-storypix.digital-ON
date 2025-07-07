// stories1-updated.js - Versão atualizada usando ProfileManager
// Versão sem opção de pular stories

import { ProfileManager } from "./ProfileManager.js";

// Função para gerar timestamp
const generateTime = function (minutesAgo) {
    let timestamp = new Date() / 1000;
    if (minutesAgo) {
        timestamp -= minutesAgo * 60;
    }
    return timestamp;
};

// Definição dos perfis (mantendo a estrutura original)
const profiles = [
    {
        id: "igao",
        photo: "./StoryPix_files/avatar.jpg",
        name: "igao",
        gain: 50.00,
        time: generateTime(),
        items: [
            {
                id: "igao-1",
                type: "video",
                length: 7,
                src: "assets/igs/igao/1.mp4",
                preview: "./StoryPix_files/avatar.jpg",
                link: "",
                linkText: "",
                time: generateTime(15),
                seen: false
            },
            {
                id: "igao-2",
                type: "video",
                length: 19,
                src: "assets/igs/igao/2.mp4",
                preview: "./StoryPix_files/avatar.jpg",
                link: "",
                linkText: "",
                time: generateTime(30),
                seen: false
            },
            {
                id: "igao-3",
                type: "video",
                length: 18,
                src: "assets/igs/igao/3.mp4",
                preview: "./StoryPix_files/avatar.jpg",
                link: "",
                linkText: "",
                time: generateTime(45),
                seen: false
            }
        ]
    },
    {
        id: "carlinhos",
        photo: "assets/igs/carlinhos/avatar.webp",
        name: "carlinhos",
        gain: 51.65,
        time: generateTime(),
        items: [
            {
                id: "carlinhos-1",
                type: "video",
                length: 5,
                src: "assets/igs/carlinhos/carlinhos1.mp4",
                linkText: false,
                time: generateTime(15)
            },
            {
                id: "carlinhos-2",
                type: "photo",
                length: 3,
                src: "assets/igs/carlinhos/carlinhos2.webp",
                linkText: false,
                time: generateTime(2 * 60)
            },
            {
                id: "carlinhos-3",
                type: "video",
                length: 5,
                src: "assets/igs/carlinhos/carlinhos3.mp4",
                linkText: false,
                time: generateTime(15)
            },
            {
                id: "carlinhos-4",
                type: "photo",
                length: 3,
                src: "assets/igs/carlinhos/carlinhos4.webp",
                linkText: false,
                time: generateTime(7 * 60)
            }
        ]
    },
    {
        id: "gessicakayane",
        photo: "assets/igs/gessicakayane/avatar.webp",
        name: "gessicakayane",
        gain: 51.9,
        time: generateTime(),
        items: [
            {
                id: "gessicakayane-1",
                type: "video",
                length: 0,
                src: "assets/igs/gessicakayane/ge1.mp4",
                linkText: false,
                time: generateTime(15)
            },
            {
                id: "gessicakayane-2",
                type: "video",
                length: 0,
                src: "assets/igs/gessicakayane/ge2.mp4",
                linkText: false,
                time: generateTime(15)
            },
            {
                id: "gessicakayane-3",
                type: "video",
                length: 0,
                src: "assets/igs/gessicakayane/ge3.mp4",
                linkText: false,
                time: generateTime(15)
            },
            {
                id: "gessicakayane-4",
                type: "video",
                length: 0,
                src: "assets/igs/gessicakayane/ge4.mp4",
                linkText: false,
                time: generateTime(15)
            },
            {
                id: "gessicakayane-5",
                type: "video",
                length: 0,
                src: "assets/igs/gessicakayane/ge5.mp4",
                linkText: false,
                time: generateTime(15)
            },
            {
                id: "gessicakayane-6",
                type: "video",
                length: 0,
                src: "assets/igs/gessicakayane/ge6.mp4",
                linkText: false,
                time: generateTime(15)
            }
        ]
    },
    {
        id: "mcpedrinhooficial",
        photo: "assets/igs/mcpedrinhooficial/avatar.webp",
        name: "mcpedrinhooficial",
        gain: 47.88,
        time: generateTime(),
        items: [
            {
                id: "mcpedrinhooficial-1",
                type: "video",
                length: 0,
                src: "assets/igs/mcpedrinhooficial/mc1.mp4",
                link: "",
                linkText: false,
                time: generateTime(22)
            },
            {
                id: "mcpedrinhooficial-2",
                type: "video",
                length: 0,
                src: "assets/igs/mcpedrinhooficial/mc2.mp4",
                link: "",
                linkText: false,
                time: generateTime(24)
            },
            {
                id: "mcpedrinhooficial-3",
                type: "video",
                length: 0,
                src: "assets/igs/mcpedrinhooficial/mc4.mp4",
                link: "",
                linkText: false,
                time: generateTime(25)
            },
            {
                id: "mcpedrinhooficial-4",
                type: "photo",
                length: 0,
                src: "assets/igs/mcpedrinhooficial/mc5.webp",
                link: "",
                linkText: false,
                time: generateTime(25)
            },
            {
                id: "mcpedrinhooficial-5",
                type: "photo",
                length: 3,
                src: "assets/igs/mcpedrinhooficial/mc6.webp",
                link: "",
                linkText: false,
                time: generateTime(25)
            }
        ]
    },
    {
        id: "daviooficialll",
        photo: "assets/igs/daviooficialll/avatar.webp",
        name: "daviooficialll",
        gain: 53.15,
        time: generateTime(),
        items: [
            {
                id: "daviooficialll-1",
                type: "photo",
                length: 3,
                src: "assets/igs/daviooficialll/1.webp",
                link: "",
                linkText: false,
                time: generateTime(22)
            },
            {
                id: "daviooficialll-2",
                type: "video",
                length: 0,
                src: "assets/igs/daviooficialll/2.mp4",
                link: "",
                linkText: false,
                time: generateTime(24)
            },
            {
                id: "daviooficialll-3",
                type: "video",
                length: 0,
                src: "assets/igs/daviooficialll/3.mp4",
                link: "",
                linkText: false,
                time: generateTime(25)
            },
            {
                id: "daviooficialll-4",
                type: "video",
                length: 0,
                src: "assets/igs/daviooficialll/4.mp4",
                link: "",
                linkText: false,
                time: generateTime(22)
            }
        ]
    },
    {
        id: "simonemendes",
        photo: "assets/igs/simonemendes/avatar.webp",
        name: "simonemendes",
        gain: 60.05,
        time: generateTime(),
        items: [
            {
                id: "simonemendes-1",
                type: "video",
                length: 3,
                src: "assets/igs/simonemendes/1.mp4",
                link: "",
                linkText: false,
                time: generateTime(22)
            },
            {
                id: "simonemendes-2",
                type: "photo",
                length: 3,
                src: "assets/igs/simonemendes/2.webp",
                link: "",
                linkText: false,
                time: generateTime(24)
            },
            {
                id: "simonemendes-3",
                type: "video",
                length: 0,
                src: "assets/igs/simonemendes/3.mp4",
                link: "",
                linkText: false,
                time: generateTime(25)
            }
        ]
    },
    {
        id: "xbadmix",
        photo: "assets/igs/xbadmix/avatar.webp",
        name: "xbadmix",
        gain: 59.08,
        time: generateTime(),
        items: [
            {
                id: "xbadmix-1",
                type: "video",
                length: 0,
                src: "assets/igs/xbadmix/1.mp4",
                link: "",
                linkText: false,
                time: generateTime(22)
            },
            {
                id: "xbadmix-2",
                type: "photo",
                length: 3,
                src: "assets/igs/xbadmix/2.webp",
                link: "",
                linkText: false,
                time: generateTime(24)
            },
            {
                id: "xbadmix-3",
                type: "video",
                length: 0,
                src: "assets/igs/xbadmix/3.mp4",
                link: "",
                linkText: false,
                time: generateTime(25)
            },
            {
                id: "xbadmix-4",
                type: "video",
                length: 0,
                src: "assets/igs/xbadmix/4.mp4",
                link: "",
                linkText: false,
                time: generateTime(25)
            }
        ]
    }
];

// Inicialização do ProfileManager
const profileManager = new ProfileManager(function () {
    // Callback executado quando todos os perfis são completados
    let currentUrl = window.location.href;
    let url = new URL(currentUrl);
    let pathname = url.pathname;
    let search = url.search;

    if (!pathname.endsWith("/")) {
        pathname += "/";
    }

    let redirectUrl = pathname + "../pix";
    if (search) {
        redirectUrl += search;
    }

    // Usa Livewire se disponível, senão redireciona normalmente
    if (typeof Livewire !== 'undefined' && Livewire.navigate) {
        Livewire.navigate(redirectUrl);
    } else {
        window.location.href = redirectUrl;
    }
});

// Adiciona todos os perfis ao manager
profileManager.addProfiles(profiles);

// Inicializa o sistema
profileManager.initialize();

// Função para avançar para o próximo perfil (mantém compatibilidade)
function nextProfile() {
    // Parar todos os vídeos antes de avançar
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        if (!video.paused) {
            video.pause();
            video.currentTime = 0;
            video.muted = true;
        }
    });
    
    // Remover elementos de vídeo do modal Zuck
    const zuckModal = document.querySelector('.zuck-modal');
    if (zuckModal) {
        const modalVideos = zuckModal.querySelectorAll('video');
        modalVideos.forEach(video => {
            video.pause();
            video.currentTime = 0;
            video.muted = true;
        });
    }
    
    // Avançar para o próximo perfil
    profileManager.nextProfile();
}

// Mantém compatibilidade com o código existente
function next() {
    nextProfile();
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Adiciona listeners para botões
    document.querySelectorAll(".next").forEach(button => {
        button.addEventListener("click", function() {
            console.log('👆 Botão next clicado');
            nextProfile();
        });
    });
    
    // Adiciona listener para o botão ASSISTIR
    const watchButton = document.getElementById('watch');
    if (watchButton) {
        watchButton.addEventListener('click', function() {
            console.log('👆 Botão ASSISTIR clicado');
            
            // Obter o perfil atual
            const currentProfile = profileManager.getCurrentProfile();
            if (currentProfile && profileManager.storiesPool) {
                console.log(`📱 Abrindo perfil: ${currentProfile.name}`);
                
                // Abrir o story do perfil atual
                profileManager.storiesPool.zuck.open(currentProfile.id);
            }
        });
    }
    
    // Adiciona listener para parar vídeos quando a página perde foco
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            const videos = document.querySelectorAll('video');
            videos.forEach(video => {
                if (!video.paused) {
                    video.pause();
                }
            });
        }
    });
});

// Expõe funções globalmente para compatibilidade
window.profileManager = profileManager;
window.nextProfile = nextProfile;
window.next = next;

// Adiciona informações de debug no console
console.log("🚀 ProfileManager inicializado com", profiles.length, "perfis");
console.log("📋 Perfis carregados:", profiles.map(p => p.name).join(", "));

export { profileManager, nextProfile, next };

