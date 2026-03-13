const videoPlayer = document.getElementById('videoMaster');
const chatPlayer = document.getElementById('chatFrame');

// Configurações LordZeddBR
const MY_CHANNEL_ID = 'UCRBaoBV9nCLePTqot4jvYUA';
const TWITCH_USER = 'lordzeddbr';
const KICK_USER = 'lordzeddbr';
const CHAT_UNIFICADO_URL = 'https://socialstream.ninja/dock.html?session=pRftJeqMLi&alignbottom&hidemenu&font=Roboto&color&darkmode&strokecolor=%23ffffff00';

function updatePlayer(type = 'youtube') {
    let videoSrc = "";
    let chatSrc = "";

    switch (type) {
        case 'youtube':
            videoSrc = `https://www.youtube.com/embed/live_stream?channel=${MY_CHANNEL_ID}&autoplay=1&mute=1&enablejsapi=1`;
            // Chat nativo do YouTube (modo dark)
            chatSrc = `https://www.youtube.com/live_chat?v=live_stream&embed_domain=${window.location.hostname}&dark_theme=1`;
            break;
            
        case 'twitch':
            videoSrc = `https://player.twitch.tv/?channel=${TWITCH_USER}&parent=${window.location.hostname}&autoplay=true`;
            // Chat nativo da Twitch
            chatSrc = `https://www.twitch.tv/embed/${TWITCH_USER}/chat?parent=${window.location.hostname}&darkpopout`;
            break;
            
        case 'kick':
            videoSrc = `https://player.kick.com/${KICK_USER}`;
            // Chat nativo do Kick
            chatSrc = `https://kick.com/chat/${KICK_USER}`;
            break;

        case 'unificado':
            // Mantém o vídeo que já está passando e só troca o chat
            chatSrc = CHAT_UNIFICADO_URL;
            break;
    }

    // Atualiza o Vídeo (exceto se for apenas troca para chat unificado)
    if (videoSrc) videoPlayer.src = videoSrc;
    
    // Atualiza o Chat
    if (chatSrc) chatPlayer.src = chatSrc;

    // --- LÓGICA DE BOTÃO ATIVO ---
    const buttons = document.querySelectorAll('.stream-selector button');
    buttons.forEach(btn => {
        btn.classList.remove('active');
        // Se clicar em Chat Unido, acende apenas ele. Se clicar em plataforma, acende a plataforma.
        if (btn.getAttribute('onclick').includes(`'${type}'`)) {
            btn.classList.add('active');
        }
    });
}

// Fechar dropdown e inicialização permanecem iguais...
document.addEventListener('click', (e) => {
    const d = document.querySelector('.social-dropdown');
    if (d && !d.contains(e.target)) d.removeAttribute('open');
});
window.onload = () => updatePlayer('youtube');