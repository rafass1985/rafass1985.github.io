const player = document.getElementById('videoMaster');
const gallery = document.getElementById('gallery');

// IDs das Plataformas
const MY_CHANNEL_ID = 'UCRBaoBV9nCLePTqot4jvYUA';
const TWITCH_USER = 'lordzeddbr';
const KICK_USER = 'lordzeddbr';

async function initGallery() {
    try {
        updatePlayer('youtube');

        const response = await fetch(`lives.txt?v=${new Date().getTime()}`);
        const data = await response.text();
        const lines = data.split('\n').filter(line => line.trim() !== '');

        lines.forEach((line, index) => {
            const [id, title] = line.split(',');
            if(!id) return;
            const cleanID = id.trim();
            const cleanTitle = title ? title.trim() : `Vídeo ${index + 1}`;

            const card = document.createElement('div');
            card.className = 'video-card';
            card.innerHTML = `
                <div class="thumb-video-container">
                    <iframe src="https://www.youtube.com/embed/${cleanID}?autoplay=0&mute=1&controls=0" loading="lazy"></iframe>
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
        console.error("Erro na galeria:", err);
    }
}

function updatePlayer(type = 'youtube', id = null) {
    let newSrc = "";
    switch (type) {
        case 'youtube':
            newSrc = `https://www.youtube.com/embed/live_stream?channel=${MY_CHANNEL_ID}&autoplay=1&mute=1`;
            break;
        case 'youtube_video':
            newSrc = `https://www.youtube.com/embed/${id}?autoplay=1&mute=0`;
            break;
        case 'twitch':
            newSrc = `https://player.twitch.tv/?channel=${TWITCH_USER}&parent=${window.location.hostname}&autoplay=true`;
            break;
        case 'kick':
            newSrc = `https://player.kick.com/${KICK_USER}`;
            break;
    }
    if (newSrc) player.src = newSrc;
}

// Controles de Visibilidade
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('togglePlayer').addEventListener('change', (e) => {
        document.getElementById('playerContainer').classList.toggle('hidden', !e.target.checked);
    });

    document.getElementById('toggleChat').addEventListener('change', (e) => {
        document.getElementById('chatContainer').classList.toggle('hidden', !e.target.checked);
    });

    initGallery();
});
