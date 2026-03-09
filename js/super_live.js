const player = document.getElementById('videoMaster');
const gallery = document.getElementById('gallery');

// 1. IDs das Plataformas
const MY_CHANNEL_ID = 'UCZiYbVptd3PVPf4f6eR6UaQ';
const TWITCH_USER = 'lordzeddbr';
const KICK_USER = 'lordzeddbr';

async function initGallery() {
    try {
        // Inicia o player principal com a live automática do YouTube
        updatePlayer('youtube');

        const response = await fetch(`lives.txt?v=${new Date().getTime()}`);
        const data = await response.text();
        const lines = data.split('\n').filter(line => line.trim() !== '');

        lines.forEach((line, index) => {
            const [id, title] = line.split(',');
            const cleanID = id.trim();
            const cleanTitle = title ? title.trim() : `Vídeo ${index + 1}`;

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
                // Ao clicar na galeria, forçamos o embed do YouTube com o ID do vídeo
                updatePlayer('youtube_video', cleanID);
                document.querySelectorAll('.video-card').forEach(c => c.classList.remove('active'));
                card.classList.add('active');
            };

            gallery.appendChild(card);
        });
    } catch (err) {
        console.error("Erro crítico:", err);
        gallery.innerHTML = "<p>⚠️ Use o Live Server para carregar o arquivo .txt</p>";
    }
}

/**
 * Atualiza o player principal com base na plataforma ou ID de vídeo
 */
function updatePlayer(type = 'youtube', id = null) {
    let newSrc = "";

    switch (type) {
        case 'youtube':
            // Sempre aponta para a live ativa do canal
            newSrc = `https://www.youtube.com/embed/live_stream?channel=${MY_CHANNEL_ID}&autoplay=1&mute=1&enablejsapi=1`;
            break;
        case 'youtube_video':
            // Vídeo específico do lives.txt
            newSrc = `https://www.youtube.com/embed/${id}?autoplay=1&mute=0&enablejsapi=1`;
            break;
        case 'twitch':
            // Embed da Twitch (parent é necessário para segurança)
            newSrc = `https://player.twitch.tv/?channel=${TWITCH_USER}&parent=${window.location.hostname}&autoplay=true`;
            break;
        case 'kick':
            // Embed do Kick
            newSrc = `https://player.kick.com/${KICK_USER}`;
            break;
    }

    if (newSrc) player.src = newSrc;
}

// Vincula os botões do HTML à função de troca
document.addEventListener('DOMContentLoaded', () => {
    // Seleciona os botões pelos IDs (ou você pode adicionar IDs no HTML se preferir)
    // Exemplo usando seletores de texto caso não queira mudar o HTML:
    const buttons = document.querySelectorAll('.stream-selector button, .buttons-container button');
    
    buttons.forEach(btn => {
        const text = btn.innerText.toLowerCase();
        if (text.includes('youtube')) btn.onclick = () => updatePlayer('youtube');
        if (text.includes('twitch')) btn.onclick = () => updatePlayer('twitch');
        if (text.includes('kick')) btn.onclick = () => updatePlayer('kick');
    });
});

initGallery();
