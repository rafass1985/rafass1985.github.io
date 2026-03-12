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

// --- INICIO DA ADIÇÃO: LÓGICA DE BOTÃO ATIVO ---
    
    // 1. Selecionamos todos os botões dentro do menu de players
    const buttons = document.querySelectorAll('.stream-selector button');
    
    // 2. Percorremos cada botão para atualizar o estado visual
    buttons.forEach(btn => {
        // Removemos a classe 'active' (desliga a luz vermelha de todos)
        btn.classList.remove('active');
        
        // Comparamos o texto do botão com o 'type' que a função recebeu
        // trim() remove espaços bobos e toLowerCase() evita erro de Maiúscula/Minúscula
        if (btn.innerText.trim().toLowerCase() === type.toLowerCase()) {
            // Se for o botão certo, adicionamos a classe 'active' (acende a luz)
            btn.classList.add('active');
        }
    });
    
// Fechar dropdown ao clicar fora
document.addEventListener('click', function (event) {
    const dropdown = document.querySelector('.social-dropdown');
    if (dropdown && !dropdown.contains(event.target)) {
        dropdown.removeAttribute('open');
    }
});

// Inicia com o YouTube (Live ou vídeo mais recente) por padrão
window.onload = () => updatePlayer('youtube');