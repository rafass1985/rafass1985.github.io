const videoPlayer = document.getElementById('videoMaster');
const chatPlayer = document.getElementById('chatFrame');

// Configurações LordZeddBR
const MY_CHANNEL_ID = 'UCRBaoBV9nCLePTqot4jvYUA';
const TWITCH_USER = 'lordzeddbr';
const KICK_USER = 'lordzeddbr';
const CHAT_UNIFICADO_URL = 'https://socialstream.ninja/dock.html?session=pRftJeqMLi&alignbottom&hidemenu&font=Roboto&color&darkmode&strokecolor=%23ffffff00';

// Variável global para rastrear qual player de vídeo está ativo no momento
let currentPlatform = 'youtube'; 

function updatePlayer(type = 'youtube') {
    let videoSrc = "";
    let chatSrc = "";
    const currentDomain = window.location.hostname;
    const btnChatUnido = [...document.querySelectorAll('.stream-selector button')].find(b => b.innerText.trim().toLowerCase() === 'chat unido');

    // --- LÓGICA DO BOTÃO CHAT UNIDO (TOGGLE) ---
    if (type === 'unificado') {
        // Se já estiver ativo, DESLIGA e volta para o chat da plataforma atual
        if (btnChatUnido.classList.contains('active')) {
            btnChatUnido.classList.remove('active');
            type = currentPlatform; // Forçamos o retorno para o chat nativo
        } else {
            // Se estiver desligado, LIGA o unificado
            btnChatUnido.classList.add('active');
            chatPlayer.src = CHAT_UNIFICADO_URL;
            return; // Encerra aqui para não trocar o vídeo nem resetar as luzes dos players
        }
    }

    // --- LÓGICA DE URLs ---
    // Se chegamos aqui, ou trocamos de plataforma ou desativamos o Chat Unido
    switch (type) {
        case 'youtube':
            videoSrc = `https://www.youtube.com/embed/live_stream?channel=${MY_CHANNEL_ID}&autoplay=1&mute=1&enablejsapi=1`;
            chatSrc = `https://www.youtube.com/live_chat?v=live_stream&embed_domain=${currentDomain}`;
            currentPlatform = 'youtube';
            break;
            
        case 'twitch':
            videoSrc = `https://player.twitch.tv/?channel=${TWITCH_USER}&parent=${window.location.hostname}&autoplay=true`;
            chatSrc = `https://www.twitch.tv/embed/${TWITCH_USER}/chat?parent=${window.location.hostname}&darkpopout`;
            currentPlatform = 'twitch';
            break;
            
        case 'kick':
            videoSrc = `https://player.kick.com/${KICK_USER}`;
            chatSrc = `https://kick.com/chat/${KICK_USER}`;
            currentPlatform = 'kick';
            break;
    }

    // Aplica as URLs (apenas se houver mudança de vídeo ou retorno de chat)
    if (videoSrc && videoPlayer.src !== videoSrc) videoPlayer.src = videoSrc;
    if (chatSrc) chatPlayer.src = chatSrc;

    // --- ATUALIZAÇÃO DAS LUZES DOS PLAYERS ---
    const buttons = document.querySelectorAll('.stream-selector button');
    buttons.forEach(btn => {
        const btnText = btn.innerText.trim().toLowerCase();
        
        // Gerencia apenas os botões de plataforma (YT, Twitch, Kick)
        if (['youtube', 'twitch', 'kick'].includes(btnText)) {
            btn.classList.remove('active');
            if (btnText === currentPlatform) btn.classList.add('active');
        }
        
        // Ao trocar de plataforma, o Chat Unido deve ser desativado
        if (type !== 'unificado' && btnText === 'chat unido' && type === currentPlatform) {
            // Se entramos aqui via clique em plataforma, removemos o active do chat unido
            // Mas mantemos se foi apenas o toggle acima
        }
    });
    
    // Se trocou de player, o chat unido sempre apaga por padrão
    if (['youtube', 'twitch', 'kick'].includes(type)) {
        btnChatUnido.classList.remove('active');
    }
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