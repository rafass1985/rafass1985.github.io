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

    // 1. Lógica de URLs
    switch (type) {
        case 'youtube':
            videoSrc = `https://www.youtube.com/embed/live_stream?channel=${MY_CHANNEL_ID}&autoplay=1&mute=1&enablejsapi=1`;
            chatSrc = `https://www.youtube.com/live_chat?v=live_stream&embed_domain=${window.location.hostname}&dark_theme=1`;
            break;
            
        case 'twitch':
            videoSrc = `https://player.twitch.tv/?channel=${TWITCH_USER}&parent=${window.location.hostname}&autoplay=true`;
            chatSrc = `https://www.twitch.tv/embed/${TWITCH_USER}/chat?parent=${window.location.hostname}&darkpopout`;
            break;
            
        case 'kick':
            videoSrc = `https://player.kick.com/${KICK_USER}`;
            chatSrc = `https://kick.com/chat/${KICK_USER}`;
            break;

        case 'unificado':
            // Apenas troca o chat, mantém o vídeo atual
            chatSrc = CHAT_UNIFICADO_URL;
            break;
    }

    // 2. Aplica as URLs nos Iframes
    if (videoSrc) videoPlayer.src = videoSrc;
    if (chatSrc) chatPlayer.src = chatSrc;

    // 3. LÓGICA DE CORES (BOTÕES)
    const buttons = document.querySelectorAll('.stream-selector button');

    buttons.forEach(btn => {
        const btnText = btn.innerText.trim().toLowerCase();

        // Se o clique foi no "CHAT UNIDO"
        if (type === 'unificado') {
            if (btnText === 'chat unido') {
                btn.classList.add('active'); // Liga o chat unido
            } else if (btnText !== 'youtube' && btnText !== 'twitch' && btnText !== 'kick') {
                // Se houvesse outros botões de chat, limparia aqui
            }
            // NOTA: Se clicou em Chat Unido, NÃO removemos o 'active' dos players de vídeo
        } 
        
        // Se o clique foi em um Player (YouTube, Twitch ou Kick)
        else {
            // Se o botão for um player de vídeo, gerencia o grupo (apenas um ativo)
            if (['youtube', 'twitch', 'kick'].includes(btnText)) {
                btn.classList.remove('active');
                if (btnText === type) btn.classList.add('active');
            }
            
            // Se clicou num player, desliga o "Chat Unido" pois o chat nativo assumiu
            if (btnText === 'chat unido') {
                btn.classList.remove('active');
            }
        }
    });
}

// Fechar dropdown ao clicar fora
document.addEventListener('click', function (event) {
    const dropdown = document.querySelector('.social-dropdown');
    if (dropdown && !dropdown.contains(event.target)) {
        dropdown.removeAttribute('open');
    }
});

// Inicialização
window.onload = () => updatePlayer('youtube');