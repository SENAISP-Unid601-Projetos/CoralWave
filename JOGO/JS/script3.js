let totalImagens = 0; // Total de imagens que precisam ser clicadas
let imagensClicadas = 0; // Contador de imagens clicadas
let imagensEliminadas = []; // Array para armazenar as imagens eliminadas
const distanciaFuga = 40; // Distância em pixels para o óleo "fugir"
const movimentoFuga = 20; // O quanto a imagem vai se mover para "fugir"

// Função para adicionar eventos de clique e movimento às imagens
function adicionarEventosDeCliqueEMovimento() {
    const imagens = document.querySelectorAll('img:not(#fundo):not(#mar)');
    
    totalImagens = imagens.length; // Define o total de imagens que precisam ser clicadas

    imagens.forEach(imagem => {
        const idImagem = imagem.id; // Captura o ID da imagem

        // Define posição inicial aleatória para cada imagem
        const posicaoInicialX = Math.random() * (window.innerWidth - imagem.offsetWidth);
        const posicaoInicialY = Math.random() * (window.innerHeight - imagem.offsetHeight);

        imagem.style.left = `${posicaoInicialX}px`;
        imagem.style.top = `${posicaoInicialY}px`;

        // Adiciona o evento de clique
        imagem.addEventListener('click', function() {
            if (!this.classList.contains('hidden')) {
                this.classList.add('hidden'); // Esconde a imagem ao clicar
                imagensClicadas++; // Incrementa o contador de imagens clicadas
                imagensEliminadas.push(idImagem); // Armazena o ID da imagem eliminada
                console.log(`Imagem eliminada: ${idImagem}`); // Exibe no console
                verificarTodasClicadas(); // Verifica se todas as imagens foram clicadas
            }
        });
        
        // Adiciona o evento de movimento do mouse
        imagem.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const mouseX = e.clientX;
            const mouseY = e.clientY;

            // Calcula a distância entre o mouse e o centro da imagem
            const imageCenterX = rect.left + rect.width / 2;
            const imageCenterY = rect.top + rect.height / 2;
            const distX = mouseX - imageCenterX;
            const distY = mouseY - imageCenterY;

            // Se o mouse estiver perto da imagem, faz com que ela se mova para "fugir"
            if (Math.abs(distX) < distanciaFuga && Math.abs(distY) < distanciaFuga) {
                const deslocamentoX = distX > 0 ? -movimentoFuga : movimentoFuga; // Movimenta para longe no eixo X
                const deslocamentoY = distY > 0 ? -movimentoFuga : movimentoFuga; // Movimenta para longe no eixo Y

                // Certifica que a imagem não vai sair da tela
                const novaPosicaoX = Math.max(0, Math.min(window.innerWidth - rect.width, rect.left + deslocamentoX));
                const novaPosicaoY = Math.max(0, Math.min(window.innerHeight - rect.height, rect.top + deslocamentoY));

                // Move a imagem alterando sua posição
                this.style.left = `${novaPosicaoX}px`;
                this.style.top = `${novaPosicaoY}px`;

                // Log para verificar se a fuga está sendo aplicada
                console.log(`Imagem ${idImagem} movida para (${novaPosicaoX}, ${novaPosicaoY})`);
            }
        });
    });
}

// Função para verificar se todas as imagens foram clicadas
function verificarTodasClicadas() {
    if (imagensClicadas === totalImagens) {
        console.log("Todas as imagens foram eliminadas:", imagensEliminadas); // Exibe todas as imagens eliminadas
        // Redireciona para fase4.html
        window.location.href = 'fase4.html';
    }
}

// Inicializa os eventos quando a página carrega
window.onload = function() {
    adicionarEventosDeCliqueEMovimento();
};
// Função para atualizar o progresso geral
function updateGlobalProgress() {
    let totalScratched = 0;

    scratcherElements.forEach((scratcher, index) => {
        const canvas = scratcher.querySelector('canvas');
        const ctx = canvas.getContext('2d');
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        let scratchedPixels = 0;
        const totalPixels = imageData.width * imageData.height;
        const sampleRate = 2;

        for (let i = 3; i < imageData.data.length; i += 4 * sampleRate) {
            if (imageData.data[i] === 0) {
                scratchedPixels++;
            }
        }

        let scratchedPercentage = (scratchedPixels * sampleRate) / totalPixels;
        totalScratched += scratchedPercentage;
    });

    totalScratchedPercentage = totalScratched / totalScratchers;
    progressBar.style.width = `${totalScratchedPercentage * 100}%`;

    console.log(`Porcentagem geral raspada: ${totalScratchedPercentage * 100}%`);

    if (totalScratchedPercentage >= 0.99) {
        pausarEfeitoSonoro(); // Pausa o efeito sonoro antes de redirecionar
        localStorage.setItem('continuarMusica', 'true'); // Armazena o estado para continuar a música
        setTimeout(() => {
            window.location.href = 'fase3.html';
        }, 500);
    }
}