//----------------------------------------------------------------------------------------------------- fase1
let totalImagens = 0; // Total de imagens que precisam ser clicadas
let imagensClicadas = 0; // Contador de imagens clicadas

// Função para adicionar eventos de clique às imagens, excluindo a imagem de fundo e 'mar'
function adicionarEventosDeClique() {
    // Seleciona todas as imagens exceto a imagem de fundo e 'mar'
    const imagens = document.querySelectorAll('img:not(#fundo):not(#mar)');
    
    totalImagens = imagens.length; // Define o total de imagens que precisam ser clicadas

    imagens.forEach(imagem => {
        imagem.addEventListener('click', function() {
            if (!this.classList.contains('hidden')) {
                this.classList.add('hidden'); // Adiciona a classe 'hidden' para esconder a imagem
                imagensClicadas++; // Incrementa o contador de imagens clicadas
                verificarTodasClicadas(); // Verifica se todas as imagens foram clicadas
            }
        });
    });
}

// Função para verificar se todas as imagens foram clicadas
function verificarTodasClicadas() {
    if (imagensClicadas === totalImagens) {
        // Redireciona para fase2.html
        window.location.href = '../JOGO/fase2.html';
    }
}

// Inicializa os eventos quando a página carrega
window.onload = function() {
    adicionarEventosDeClique();
};
//------------------------------------------------------------------------------------------------ fase 2
document.addEventListener('DOMContentLoaded', function() {
    const opçõesBtn = document.getElementById('opções');
    const popup = document.getElementById('popup');
    const popupClose = document.querySelector('.popup-close');

    opçõesBtn.addEventListener('click', function() {
        popup.style.display = 'block';
    });

    popupClose.addEventListener('click', function() {
        popup.style.display = 'none';
    });

    //Fechar o popup quando clicar fora dele
    window.addEventListener('click', function(event) {
        if (event.target === popup) {
            popup.style.display = 'none';
        }
    });
});

const popupMessage = document.getElementById('popup-message');
const conteudo = document.getElementById('conteudo'); // Seleciona o contêiner do conteúdo
if (popupMessage) { // Verifica se o elemento existe
    // Exibe o popup ao carregar a página
    setTimeout(() => {
        popupMessage.classList.add('show'); // Mostra o popup com animação
        conteudo.classList.add('blurred'); // Aplica o desfoque no conteúdo
    }, 500); // Atraso inicial para garantir carregamento

    // Oculta o popup após 5 segundos
    setTimeout(() => {
        popupMessage.classList.remove('show');
        popupMessage.classList.add('hide'); // Aplica animação de saída
        conteudo.classList.remove('blurred'); // Remove o desfoque do conteúdo
    }, 5500); // 5 segundos de exibição + 500ms de atraso inicial
} else {
    console.error('Elemento popup-message não encontrado.');
}
document.getElementById('sair').addEventListener('click', function() {
    if (confirm("Você realmente deseja sair?")) {
      window.location.href = '../JOGO/saida.html'; // Altere para a URL desejada
    }
  });
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
            window.location.href = '../JOGO/fase3.html';
        }, 500);
    }
}
