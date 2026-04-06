const pokedex = [
    { name: 'Pikachu', id: 25 },
    { name: 'Eevee', id: 133 },
    { name: 'Gengar', id: 94 },
    { name: 'Jigglypuff', id: 39 },
    { name: 'Espeon', id: 196 },
    { name: 'Umbreon', id: 197 },
    { name: 'Mew', id: 151 },
    { name: 'Clefairy', id: 35 },
    { name: 'Snorlax', id: 143 },
];

const pokemonMessages = {
    "Pikachu": "You shine just like Pikachu, I'm so grateful to have you in my life baby! ♡",
    "Eevee": "Just like Eevee, you have so many perfect possibilities and I love every one of them bae! ♡",
    "Gengar": "You stole my heart faster than Gengar steals a soul! Take care of it sweetie! ♡",
    "Jigglypuff": "You're as sweet as a serenade written by Jigglypuff sweetie! I love you! ♡",
    "Espeon": "You're ethereal and graceful just like Espeon. You're such a cutiekat baby! ♡",
    "Umbreon": "Let me be your Umbreon and I'll protect you through the darkest nights bae! ♡",
    "Mew": "Even as a little kid, you were destined to be special.",
    "Clefairy": "You're kind and supportive just like Clefairy, always remember to be kind angel! ♡",
    "Snorlax": "I love when you hibernate and wake up renewed, when you're happy, you make me happy baby! ♡",
};

const gallery = document.getElementById('pokemon-list');

// Função para renderizar todos na tela
if(gallery){
pokedex.forEach(pokemon => {
    const wrapper = document.createElement('div');
    wrapper.className = 'pkmn-selection-wrapper';
    wrapper.onclick = () => openOak(pokemon.name.toLowerCase(), pokemon.id);

    let gifUrl;
    
    // Se for Sylveon (ID 700) ou outros novos, usa o diretório de sprites animados mais completo
    if (pokemon.id > 749) {
        gifUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/animated/${pokemon.id}.gif`;
    } else {
        // Mantém os da Gen 5 para os clássicos (Pikachu, Gengar, etc)
        gifUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemon.id}.gif`;
    }

    // URL dos GIFs animados da Gen 5 (a que você está usando)
    // const gifUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemon.id}.gif`;

    wrapper.innerHTML = `
        <img src="${gifUrl}" class="pkmn-sprite-select" alt="${pokemon.name}">
        <span class="pkmn-name">${pokemon.name}</span>
    `;
    gallery.appendChild(wrapper);
});
}

// Ajuste na função openOak para receber o ID também
function openOak(name, id) {
    const modal = document.getElementById('oak-modal');
    const oakText = document.getElementById('oak-text');
    const confirmBtn = document.getElementById('confirm-selection');

    // Usamos o nome formatado para o texto do Carvalho
    oakText.innerText = `PROF. OAK: So you want the lovely ${name.toUpperCase()}? A wonderful choice for Antonia!`;

    modal.style.display = 'flex';

    // Passamos o nome original para a função final para não dar erro no objeto de mensagens
    confirmBtn.onclick = () => showFinalModal(name, id);
}

function showFinalModal(name, id) {
    closeOak();
    const finalModal = document.getElementById('final-modal');
    const finalGif = document.getElementById('final-pkmn-gif');
    const messageContainer = document.getElementById('dynamic-message');
    
    // 1. Atualiza o GIF
    finalGif.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${id}.gif`;

    // 2. Busca a mensagem (Garante a primeira letra maiúscula para bater com seu objeto)
    const formattedName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    const message = pokemonMessages[formattedName] || "You are the best trainer I've ever met! ❤️";

    // 3. Injeta o texto na box
    messageContainer.innerHTML = `<p>${message}</p>`;

    // 4. Mostra o modal e reseta o scroll para o topo
    finalModal.style.display = 'flex';
    document.querySelector('.message-scroll-container').scrollTop = 0;
}

function closeOak() {
    document.getElementById('oak-modal').style.display = 'none';
}


// 3. CARREGAMENTO DINÂMICO
window.onload = () => {
    // Lógica Página 1
    const gridPkmn = document.querySelector('.grid-pokemon');
    if (gridPkmn) {
        mensagens.forEach(p => {
            gridPkmn.innerHTML += `
                <div class="pkmn-card" onclick="openMsg('${p.msg}')">
                    <img src="../assets/${p.img}">
                    <p>${p.name}</p>
                </div>`;
        });
    }

    // Lógica Página 2
    const photoScroll = document.querySelector('.photo-scroll');
    if (photoScroll) {
        fotos.forEach(f => {
            photoScroll.innerHTML += `
                <div class="photo-card">
                    <img src="../assets/${f.url}">
                    <p>${f.legenda}</p>
                </div>`;
        });
    }
};

// 4. FUNÇÃO DO MODAL (TYPEWRITER)
function openMsg(texto) {
    const modal = document.getElementById('modal');
    const displayTexto = document.getElementById('msg-text');
    if(!modal || !displayTexto) return;

    modal.style.display = 'block';
    displayTexto.innerHTML = "";
    let i = 0;
    function type() {
        if (i < texto.length) {
            displayTexto.innerHTML += texto.charAt(i);
            i++;
            setTimeout(type, 40);
        }
    }
    type();
}

// 5. FUNÇÃO DA JUKEBOX (PÁGINA 3)
function playMusic(file, title) {
    const player = document.getElementById('audio-player');
    const status = document.getElementById('track-status');
    if(!player) return;

    player.src = `../assets/music/${file}`;
    player.play();
    if(status) status.innerText = "Now Playing: " + title;
}

// Adicione isso dentro do seu window.onload
window.onload = () => {
    const path = window.location.pathname;

    // ... lógica da página 1 aqui ...

    // Lógica da Página 2 (Trainer Card)
    const photoScroll = document.querySelector('.photo-scroll');
    if (photoScroll) {
        infosDela.forEach(item => {
            photoScroll.innerHTML += `
                <div class="photo-card">
                    <img src="../assets/${item.foto}">
                    <p style="margin-top:10px; font-size:1.4rem;">${item.msg}</p>
                </div>`;
        });
    }
    
    // ... lógica da Jukebox aqui ...
};

// Função para criar poeira estelar ao passar o mouse
function createStardust(event) {
    const button = event.currentTarget;
    const container = document.body; // Cria as partículas no body para não ficarem presas no botão
    
    // Coordenadas do botão
    const rect = button.getBoundingClientRect();
    const buttonCenterX = rect.left + rect.width / 2;
    const buttonCenterY = rect.top + rect.height / 2;

    // Número de partículas
    const particleCount = 20;

    // Cores da poeira (tons de fada etéreo)
    const colors = ['#FFCCEE', '#D6A2E8', '#99FFCC', '#FFFFFF', '#4ECDC4'];

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'stardust-particle';
        
        // Tamanho pixelado (2px a 4px)
        const size = Math.random() * 2 + 2 + 'px';
        particle.style.width = size;
        particle.style.height = size;
        
        // Cor aleatória
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        // Posição inicial (centro do botão)
        particle.style.left = buttonCenterX + (Math.random() - 0.5) * rect.width + 'px';
        particle.style.top = buttonCenterY + (Math.random() - 0.5) * rect.height + 'px';

        // Vetor de movimento (aleatório para fora)
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 30 + 60; // Velocidade
        const destinationX = Math.cos(angle) * velocity;
        const destinationY = Math.sin(angle) * velocity;

        // Propriedades CSS para animação
        particle.style.setProperty('--x', destinationX + 'px');
        particle.style.setProperty('--y', destinationY + 'px');
        
        container.appendChild(particle);

        // Remove a partícula após a animação (1 segundo)
        setTimeout(() => {
            particle.remove();
        }, 6000);
    }
}

// Dentro do seu window.onload, adicione este bloco:
const pkmnLinks = document.querySelectorAll('.pkmn-link');
pkmnLinks.forEach(link => {
    link.addEventListener('mouseenter', createStardust);
});

function showOak(pokemon) {
    const dialog = document.getElementById('oak-dialogue');
    const text = document.getElementById('oak-text');
    const backBtn = document.getElementById('back-link');

    dialog.style.display = 'block';
    backBtn.style.display = 'none'; // Esconde o back para focar na escolha

    if (pokemon === 'pikachu') {
        text.innerText = "PROF. OAK: So you want the energetic Pikachu? A bright choice for a bright Trainer like Antonia!";
    } else {
        text.innerText = "PROF. OAK: Eevee, the Pokemon of infinite potential! Just like your journey together. Excellent!";
    }
    
    // Rola automaticamente para o diálogo
    dialog.scrollIntoView({ behavior: 'smooth' });
}


// 1. Sua "Database" de memórias
const memorias = [
    {
        foto: "../assets/antoniaandcutedog.jpeg",
        titulo: "Antonia and a cool dog",
        mensagem: "The most beautiful trainer I've ever seen. I love your smile, I love your soul, I love you baby!"
    },
    {
        foto: "../assets/cutieantonia.jpeg",
        titulo: "Little Cutie Antonia",
        mensagem: "You were born to be special, you're perfect sweetie."
    },
    {
        foto: "../assets/antoniagoingtoschool.jpeg",
        titulo: "Antonia going to school",
        mensagem: "I still see you as that little wonderful kid baby, I'll always take care of you!"
    },

    {
        foto: "../assets/antoniawalkinginthesnow.jpeg",
        titulo: "Antonia walking in the snow",
        mensagem: "Even in the cold days, you're still shining. You're the light that brightens my world cutie!"
    },

    {
        foto: "../assets/fairyantonia.jpeg",
        titulo: "Fairy Antonia",
        mensagem: "You were always such an angel! You were a gift from the unverse to me! ♡" 
    },

    {
        foto: "../assets/antoniaandhercooldada.jpeg",
        titulo: "Beach Day",
        mensagem: "You're not from this world darling, I'll always love you ♡!" 
    },

    {
        foto: "../assets/catbirthday.jpg",
        titulo: "HAPPY BIRTHDAY DARLING!",
        mensagem: "HAPPY BIRTHDAY BABY! I hope this day is as special as you are to me! ♡" 
    },

    {
        foto: "../assets/catbouquet.jpg",
        titulo: "I'll always love you! ♡",
        mensagem: "Do you wanna make it forever? Do you wanna be my only one? (I didn't know about yellow flowers, but I know about flowers of love!♡) " 
    },
];

// 2. Função para renderizar na tela
function carregarMemorias() {
    const container = document.getElementById('deck-conteudo');
    
    // Se o container não existir (ex: na página de seleção), ele para aqui sem dar erro
    if (!container) return; 

    let conteudoHTML = "";
    memorias.forEach(item => {
        conteudoHTML += `
            <div class="memory-card">
                <h3 class="pkmn-msg-title">${item.titulo}</h3>
                <img src="${item.foto}" class="scroll-img" alt="${item.titulo}">
                <p class="pkmn-msg">${item.mensagem}</p>
                <hr class="pkmn-hr-short">
            </div>
        `;
    });
    container.innerHTML = conteudoHTML;
}

document.addEventListener('DOMContentLoaded', carregarMemorias);

let currentAudio = null;

const jukeboxData = {
    "song1": { 
        title: "Rosemary",
        artist: "Deftones",
        file: "../assets/music/rosemary.m4a",
        color: "#ff4a69",
        pokeId: 39, 
        lyrics: "Stay with me... ♡"
    },
    "song2": { 
        title: "Demolition Lovers",
        artist: "My Chemical Romance",
        file: "../assets/music/demolitionlovers.m4a",
        color: "#7535bf",
        pokeId: 94, 
        lyrics: "I'm the only one... ♡"
    },
    "song3": { 
        title: "Heaven Can Wait",
        artist: "Michael Jackson",
        file: "../assets/music/heavencanwait.m4a",
        color: "#805656",
        pokeId: 104, 
        lyrics: "Heaven can wait... ♡"
    },
    "song4": { 
        title: "I cant help falling in love with you",
        artist: "Elvis Presley",
        file: "../assets/music/icanthelpfallinginlovewithu.m4a",
        color: "#d900ff",
        pokeId: 196, 
        lyrics: "Heaven can wait... ♡"
    },
    "song5": { 
        title: "I Think About You All The Time",
        artist: "Deftones",
        file: "../assets/music/ithinkaboutyouallthetime.m4a",
        color: "#332a59",
        pokeId: 197,
        lyrics: "Heaven can wait... ♡"
    },
    "song6": { 
        title: "Nothing is Gonna Hurt You Baby",
        artist: "Cigarretes After Sex",
        file: "../assets/music/nothingisgonnahurtubaby.m4a",
        color: "#FFC0CB",
        pokeId: 35,
        lyrics: "Heaven can wait... ♡"
    },
    "song7": { 
        title: "Lover You Should've Come Over",
        artist: "Jeff Buckley",
        file: "../assets/music/loveryoushouldhavecomeover.m4a",
        color: "#ff7ff6",
        pokeId: 151,
        lyrics: "Heaven can wait... ♡"
    },
    "song8": { 
        title: "Strangers in the Night",
        artist: "Frank Sinatra",
        file: "../assets/music/strangersinthenight.m4a",
        color: "#e4d500",
        pokeId: 25,
        lyrics: "Heaven can wait... ♡"
    },
    "song9": { 
        title: "Je nen Connais Pas La Fin",
        artist: "Deftones",
        file: "../assets/music/jenenconnaispaslafilm.m4a",
        color: "#6089ea",
        pokeId: 143,
        lyrics: "Heaven can wait... ♡"
    }
};

const songKeys = Object.keys(jukeboxData);
let currentSongIndex = 0;

function mostrarModalMensagem(titulo, letra) {
    console.log("Mostrando modal de:", titulo);
    // Aqui você pode adicionar a lógica para abrir o seu modal real na tela
}

function renderJukebox() {
    const container = document.getElementById('jukebox-container');
    if (!container) return;
    
    container.innerHTML = ""; 

    songKeys.forEach(id => {
        const song = jukeboxData[id];
        const card = document.createElement('div');
        
        // AQUI ESTÁ O SEGREDO: Adicionando a classe que tem o estilo das caixas
        card.className = 'song-card'; 
        card.onclick = () => playMusic(id);

        // Estrutura interna com a imagem e os textos
        card.innerHTML = `
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${song.pokeId}.gif" 
                 alt="${song.title}" class="card-pkmn">
            <div class="song-info">
                <h3 class="song-title">${song.title}</h3>
                <p class="song-artist">${song.artist}</p>
            </div>
        `;
        container.appendChild(card);
    });
}

// Isso faz com que a grid seja criada assim que a página carregar
document.addEventListener("DOMContentLoaded", renderJukebox);

function playMusic(id) {
    const song = jukeboxData[id];
    const playerBar = document.getElementById('player-controls');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const themeColor = song.color || "#B19CD9"; // Cor do Pokémon ou roxo padrão

    currentSongIndex = songKeys.indexOf(id); 

    if (currentAudio) { currentAudio.pause(); }

    currentAudio = new Audio(song.file);
    playerBar.classList.remove('player-hidden');
    document.getElementById('close-player').style.display = 'flex';
    playPauseBtn.innerText = "⏸";

    // --- MÁGICA DAS CORES ---
    // 1. Muda a cor dos botões de controle
    const buttons = document.querySelectorAll('.audio-buttons button');
    buttons.forEach(btn => btn.style.color = themeColor);

    // 2. Passa a cor para a barra de progresso usar
    const progressRange = document.getElementById('progress-range');
    progressRange.dataset.activeColor = themeColor;

    // --- ATUALIZA INTERFACE ---
    document.getElementById('player-title').innerText = song.title;
    document.getElementById('player-artist').innerText = song.artist;
    document.getElementById('player-pkmn').src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${song.pokeId}.gif`;

    setupAudioEvents(); // Ativa cronômetro e barra
    
    currentAudio.play().catch(e => console.error("Erro ao tocar:", e));
    currentAudio.onended = () => nextMusic();
}

// --- CONFIGURAÇÃO DA BARRA E TEMPO ---
function setupAudioEvents() {
    const progressRange = document.getElementById('progress-range');
    const currentTimeEl = document.getElementById('current-time');
    const totalDurationEl = document.getElementById('total-duration');

    currentAudio.addEventListener('timeupdate', () => {
        if (!isNaN(currentAudio.duration)) {
            const progress = (currentAudio.currentTime / currentAudio.duration) * 100;
            const activeColor = progressRange.dataset.activeColor;

            progressRange.value = progress;
            
            // Pinta a barra com a cor do Pokémon atual!
            progressRange.style.backgroundImage = `linear-gradient(${activeColor}, ${activeColor})`;
            progressRange.style.backgroundSize = progress + '% 100%';

            currentTimeEl.innerText = formatTime(currentAudio.currentTime);
        }
    });

    currentAudio.addEventListener('loadedmetadata', () => {
        totalDurationEl.innerText = formatTime(currentAudio.duration);
    });

    progressRange.oninput = function() {
        const seekTime = (this.value / 100) * currentAudio.duration;
        currentAudio.currentTime = seekTime;
        this.style.backgroundSize = this.value + '% 100%';
    };
}

function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}
// --- AUXILIARES ---
function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}

function togglePlay() {
    const btn = document.getElementById('play-pause-btn');
    if (!currentAudio) return;
    if (currentAudio.paused) {
        currentAudio.play();
        btn.innerText = "⏸";
    } else {
        currentAudio.pause();
        btn.innerText = "▶";
    }
}

function nextMusic() {
    currentSongIndex = (currentSongIndex + 1) % songKeys.length;
    playMusic(songKeys[currentSongIndex]);
}

function prevMusic() {
    currentSongIndex = (currentSongIndex - 1 + songKeys.length) % songKeys.length;
    playMusic(songKeys[currentSongIndex]);
}

function togglePlayer() {
    const playerBar = document.getElementById('player-controls');
    playerBar.classList.toggle('minimized');
}

function navegarPara(pagina) {
    // 1. Lógica para mostrar/esconder as divs das páginas (você provavelmente já tem)
    showPage(pagina); 

    // 2. Lógica para mudar o Título da Aba
    switch(pagina) {
        case 'messages':
            document.title = "Pokémessages | For My Baby ♡";
            window.history.pushState({}, "", "/pokemessages");
            break;
        case 'memories':
            document.title = "Pokémemories | Our Journey";
            window.history.pushState({}, "", "/pokememories");
            break;
        case 'music':
            document.title = "Pokémusic | Jukebox";
            window.history.pushState({}, "", "/pokemusic");
            break;
        default:
            document.title = "I LOVE U BABY"; // Nome da Home
            window.history.pushState({}, "", "/");
    }
}