const player = document.getElementById('videoMaster');
const gallery = document.getElementById('gallery');
const chatFrame = document.getElementById('chatFrame');

// 1. Configurações de Identidade
const MY_CHANNEL_ID = 'UCRBaoBV9nCLePTqot4jvYUA'; // Teu ID do YouTube
const TWITCH_USER = 'lordzeddbr';
const KICK_USER = 'lordzeddbr';

// 2. URLs de Chat (Ajusta conforme necessário)
const CHATS = {
    youtube: `https://www.youtube.com/live_chat?v=ALGO&embed_domain=${window.location.hostname}`,
    twitch: `https://www.twitch.tv/embed/${TWITCH_USER}/chat?parent=${window.location.hostname}`,
    kick: `https://kick.com/lordzeddbr/chatroom` // Nota: Kick pode exigir métodos específicos de embed
};

/**
 * Inicializa a Galeria e o Player Principal
 */
async function initGallery() {
    try {
        // Começa sempre com a tua live do YouTube ativa
        updatePlayer('youtube');

        // Carrega os vídeos antigos do ficheiro lives.txt
        const response = await fetch(`lives.txt?v=${new Date().getTime()}`);
        const data = await response.text();
        const lines = data.split('\n').filter(line => line.trim() !== '');

        lines.forEach((line, index) => {
            const [id, title] = line.split(',');
            if(!id) return;

            const cleanID = id.trim();
            const cleanTitle = title ? title.trim() : `Live Antiga ${index + 1}`;

            const card = document.createElement('div');
            card.className = 'video-card';

            card.innerHTML = `
                <div class="thumb-video-container">
                    <iframe
                        src="https://www.youtube.com/embed/${cleanID}?autoplay=0&mute=1&controls=0&modestbranding=1&rel=0"
                        allow="encrypted-media"
                        loading="lazy">
                    </iframe>
                    <div class="click-overlay"></div>
                </div>
                <span class="video-title">${cleanTitle}</span>
            `;

            card.onclick = () => {
                updatePlayer('youtube_video', cleanID);
                document.querySelectorAll('.video-card').forEach(c => c.classList.remove('active'));
                card.classList.add('active');
            };

            gallery.appendChild(card);
        });
    } catch (err) {
        console.error("Erro ao carregar galeria:", err);
        if(gallery) gallery.innerHTML = "<p>⚠️ Erro ao carregar lives.txt</p>";
    }
}

/**
 * Lógica de Troca de Player e Chat (Inspirado no Spidium)
 */
function updatePlayer(type, id = null) {
    let videoUrl = "";
    let chatUrl = "";

    switch (type) {
        case 'youtube':
            videoUrl = `https://www.youtube.com/embed/live_stream?channel=${MY_CHANNEL_ID}&autoplay=1&mute=1&enablejsapi=1`;
            chatUrl = CHATS.youtube;
            break;
        case 'youtube_video':
            videoUrl = `https://www.youtube.com/embed/${id}?autoplay=1&mute=0&enablejsapi=1`;
            chatUrl = `https://www.youtube.com/live_chat?v=${id}&embed_domain=${window.location.hostname}`;
            break;
        case 'twitch':
            videoUrl = `https://player.twitch.tv/?channel=${TWITCH_USER}&parent=${window.location.hostname}&autoplay=true`;
            chatUrl = CHATS.twitch;
            break;
        case 'kick':
            videoUrl = `https://player.kick.com/${KICK_USER}`;
            chatUrl = CHATS.kick;
            break;
    }

    if (videoUrl && player) player.src = videoUrl;
    if (chatUrl && chatFrame) chatFrame.src = chatUrl;
}

/**
 * Listeners de Interface (Temas e Visibilidade)
 */
document.addEventListener('DOMContentLoaded', () => {
    
    // Alternar Temas
    const themeSelect = document.getElementById('themeSelect');
    if(themeSelect) {
        themeSelect.addEventListener('change', (e) => {
            document.body.className = e.target.value;
        });
    }

    // Mostrar/Esconder Chat
    const toggleChat = document.getElementById('toggleChat');
    if(toggleChat) {
        toggleChat.addEventListener('change', (e) => {
            const chatContainer = document.getElementById('chatContainer');
            if(chatContainer) chatContainer.style.display = e.target.checked ? 'flex' : 'none';
        });
    }

    // Mostrar/Esconder Player
    const togglePlayer = document.getElementById('togglePlayer');
    if(togglePlayer) {
        togglePlayer.addEventListener('change', (e) => {
            const playerContainer = document.getElementById('playerContainer');
            if(playerContainer) playerContainer.style.display = e.target.checked ? 'block' : 'none';
        });
    }
});

// Inicializa tudo
initGallery();
