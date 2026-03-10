const player = document.getElementById('videoMaster');

// Configurações do seu canal
const MY_CHANNEL_ID = 'UCRBaoBV9nCLePTqot4jvYUA';
const TWITCH_USER = 'lordzeddbr';
const KICK_USER = 'lordzeddbr';

/**
 * Atualiza apenas o player principal.
 * O chat permanece estático com sua URL unificada.
 */
function updatePlayer(type = 'youtube') {
    let newSrc = "";

    switch (type) {
        case 'youtube':
            newSrc = `https://www.youtube.com/embed/live_stream?channel=${MY_CHANNEL_ID}&autoplay=1&mute=1`;
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

// Inicialização dos controles de interface
document.addEventListener('DOMContentLoaded', () => {
    // Alternar visibilidade do Player
    document.getElementById('togglePlayer').addEventListener('change', function() {
        document.getElementById('playerSection').style.display = this.checked ? 'flex' : 'none';
    });

    // Alternar visibilidade do Chat
    document.getElementById('toggleChat').addEventListener('change', function() {
        document.getElementById('chatSection').style.display = this.checked ? 'flex' : 'none';
    });

    // Carrega o YouTube por padrão ao abrir a página
    updatePlayer('youtube');
});
