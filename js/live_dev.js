const videoPlayer = document.getElementById('videoMaster');
const chatPlayer = document.getElementById('chatFrame');

const MY_CHANNEL_ID = 'UCRBaoBV9nCLePTqot4jvYUA';
const TWITCH_USER = 'lordzeddbr';
const KICK_USER = 'lordzeddbr';
const CHAT_UNIFICADO_URL = 'https://socialstream.ninja/dock.html?session=pRftJeqMLi&alignbottom&hidemenu&font=Roboto&color&darkmode&strokecolor=%23ffffff00';

let currentPlatform = 'youtube'; 

function updatePlayer(type = 'youtube') {
    let videoSrc = "";
    let chatSrc = "";
    
    // CAPTURA O DOMÍNIO DINAMICAMENTE
    // Isso evita que o chat quebre se você mudar do PC de teste para o servidor real
    const currentDomain = window.location.hostname;

    const btnChatUnido = [...document.querySelectorAll('.stream-selector button')].find(b => b.innerText.trim().toLowerCase() === 'chat unido');

    if (type === 'unificado') {
        if (btnChatUnido.classList.contains('active')) {
            btnChatUnido.classList.remove('active');
            type = currentPlatform; 
        } else {
            btnChatUnido.classList.add('active');
            chatPlayer.src = CHAT_UNIFICADO_URL;
            return; 
        }
    }

    switch (type) {
        case 'youtube':
            videoSrc = `https://www.youtube.com/embed/live_stream?channel=${MY_CHANNEL_ID}&autoplay=1&mute=1&enablejsapi=1`;
            
            // CORREÇÃO DA URL DO CHAT:
            // 1. v=live_stream funciona para o vídeo, mas para o chat o YouTube prefere o ID real.
            // 2. O embed_domain PRECISA ser o hostname puro (sem http ou barras).
            chatSrc = `https://www.youtube.com/live_chat?v=live_stream&embed_domain=${currentDomain}`;
            
            currentPlatform = 'youtube';
            break;
            
        case 'twitch':
            videoSrc = `https://player.twitch.tv/?channel=${TWITCH_USER}&parent=${currentDomain}&autoplay=true`;
            chatSrc = `https://www.twitch.tv/embed/${TWITCH_USER}/chat?parent=${currentDomain}&darkpopout`;
            currentPlatform = 'twitch';
            break;
            
        case 'kick':
            videoSrc = `https://player.kick.com/${KICK_USER}`;
            chatSrc = `https://kick.com/chat/${KICK_USER}`;
            currentPlatform = 'kick';
            break;
    }

    if (videoSrc && videoPlayer.src !== videoSrc) videoPlayer.src = videoSrc;
    if (chatSrc) chatPlayer.src = chatSrc;

    // Lógica das luzes (idêntica à anterior)
    const buttons = document.querySelectorAll('.stream-selector button');
    buttons.forEach(btn => {
        const btnText = btn.innerText.trim().toLowerCase();
        if (['youtube', 'twitch', 'kick'].includes(btnText)) {
            btn.classList.remove('active');
            if (btnText === currentPlatform) btn.classList.add('active');
        }
    });
    
    if (['youtube', 'twitch', 'kick'].includes(type)) {
        btnChatUnido.classList.remove('active');
    }
}

window.onload = () => updatePlayer('youtube');