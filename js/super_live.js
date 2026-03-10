const player = document.getElementById('videoMaster');

// IDs do seu canal LordZeddBR
const MY_CHANNEL_ID = 'UCRBaoBV9nCLePTqot4jvYUA';
const TWITCH_USER = 'lordzeddbr';
const KICK_USER = 'lordzeddbr';

function updatePlayer(type = 'youtube') {
    let newSrc = "";

    switch (type) {
        case 'youtube':
            // Esta URL redireciona para a Live ON ou para o vídeo mais recente/destaque se estiver OFF
            newSrc = `https://www.youtube.com/embed/live_stream?channel=${MY_CHANNEL_ID}&autoplay=1&mute=1&enablejsapi=1`;
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

// Fechar dropdown ao clicar fora
document.addEventListener('click', function (event) {
    const dropdown = document.querySelector('.social-dropdown');
    if (dropdown && !dropdown.contains(event.target)) {
        dropdown.removeAttribute('open');
    }
});

// Inicia com o YouTube (Live ou vídeo mais recente) por padrão
window.onload = () => updatePlayer('youtube');
