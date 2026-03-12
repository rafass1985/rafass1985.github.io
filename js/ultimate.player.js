const player = document.getElementById('videoMaster');

// IDs do seu canal LordZeddBR
const MY_CHANNEL_ID = 'UCRBaoBV9nCLePTqot4jvYUA';
const TWITCH_USER = 'lordzeddbr';
const KICK_USER = 'lordzeddbr';

function updatePlayer(type = 'youtube') {
    let newSrc = "";

    // 1. Define a URL do Iframe
    switch (type) {
        case 'youtube':
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

    // 2. Lógica das "Luzes" do Painel
    const buttons = document.querySelectorAll('.stream-selector button');
    
    buttons.forEach(btn => {
        // Remove a classe active de todos
        btn.classList.remove('active');
        
        // Compara o texto do botão com o tipo selecionado
        // O trim() ajuda a evitar erros com espaços extras
        if (btn.innerText.trim().toLowerCase() === type.toLowerCase()) {
            btn.classList.add('active');
        }
    }
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
