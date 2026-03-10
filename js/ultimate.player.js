const player = document.getElementById('videoMaster');

// Suas IDs atualizadas
const MY_CHANNEL_ID = 'UCRBaoBV9nCLePTqot4jvYUA';
// A playlist de uploads usa 'UU' no lugar de 'UC' no início da sua ID
const UPLOADS_PLAYLIST_ID = 'UURBaoBV9nCLePTqot4jvYUA'; 

function updatePlayer(type = 'youtube') {
    let newSrc = "";

    switch (type) {
        case 'youtube':
            /** * A CHECAGEM É FEITA AQUI:
             * O link /live_stream?channel=ID tenta localizar uma live ativa.
             * Se você estiver OFFLINE, o player do YouTube redireciona 
             * internamente para o último vídeo disponível no canal.
             */
            newSrc = `https://www.youtube.com/embed/live_stream?channel=${MY_CHANNEL_ID}&autoplay=1&mute=1&enablejsapi=1`;
            break;

        case 'youtube_uploads':
            /**
             * Caso o redirecionamento acima não funcione como você quer,
             * este link força a abertura do seu vídeo mais recente 
             * (o primeiro da playlist de uploads).
             */
            newSrc = `https://www.youtube.com/embed/videoseries?list=${UPLOADS_PLAYLIST_ID}&autoplay=1&mute=1`;
            break;

        case 'twitch':
            newSrc = `https://player.twitch.tv/?channel=lordzeddbr&parent=${window.location.hostname}&autoplay=true`;
            break;

        case 'kick':
            newSrc = `https://player.kick.com/lordzeddbr`;
            break;
    }
     if (newSrc) player.src = newSrc;
}

 // Inicia com o YouTube por padrão
window.onload = () => updatePlayer('youtube');

// Fecha o dropdown de sociais ao clicar fora dele
document.addEventListener('click', function (event) {
    const dropdown = document.querySelector('.social-dropdown');
    
    // Se o clique não foi dentro do dropdown e o dropdown está aberto, fecha ele
    if (dropdown && !dropdown.contains(event.target)) {
        dropdown.removeAttribute('open');
    }
});
