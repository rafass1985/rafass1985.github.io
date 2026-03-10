const player = document.getElementById('videoMaster');

// IDs das tuas plataformas
const MY_CHANNEL_ID = 'UCRBaoBV9nCLePTqot4jvYUA'; // Confirma se este é o ID correto (UC...)
const VIDEO_RECENTE_ID = 'JJ5hNieBWDs'; // Um vídeo para aparecer quando estiveres offline
const TWITCH_USER = 'lordzeddbr';
const KICK_USER = 'lordzeddbr';

function updatePlayer(type = 'youtube') {
    let newSrc = "";

    switch (type) {
        case 'youtube':
            // Tenta a live. Se falhar, o YouTube mostra o ecrã de "offline" ou o vídeo mais recente.
            newSrc = `https://www.youtube.com/embed/live_stream?channel=${MY_CHANNEL_ID}&autoplay=1&mute=1&enablejsapi=1`;
            
            // DICA: Se a URL acima falhar totalmente, substitui por:
            // newSrc = `https://www.youtube.com/embed/${VIDEO_RECENTE_ID}?autoplay=1&mute=1`;
            break;
            
        case 'twitch':
            newSrc = `https://player.twitch.tv/?channel=${TWITCH_USER}&parent=${window.location.hostname}&autoplay=true`;
            break;
            
        case 'kick':
            newSrc = `https://player.kick.com/${KICK_USER}`;
            break;
    }

    if (newSrc) {
        player.src = newSrc;
        console.log("Player atualizado para:", type);
    }
}

// Fechar o dropdown de sociais ao clicar fora
document.addEventListener('click', (event) => {
    const dropdown = document.querySelector('.social-dropdown');
    if (dropdown && !dropdown.contains(event.target)) {
        dropdown.removeAttribute('open');
    }
});

// Inicia com o YouTube por padrão
window.onload = () => updatePlayer('youtube');
