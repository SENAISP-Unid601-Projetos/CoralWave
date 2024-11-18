document.addEventListener('DOMContentLoaded', () => {
    const scratcherElements = document.querySelectorAll('.scratcher');
    const scratchRadius = 25; // Tamanho do raspador
    const progressBar = document.querySelector('.progress-bar');

    let totalScratchedPercentage = 0; // Percentual geral raspado
    const totalScratchers = scratcherElements.length; // Quantidade de scratchers

    scratcherElements.forEach((scratcher, index) => {
        const canvas = scratcher.querySelector('canvas');
        const initialImage = scratcher.querySelector(`img#initial-image${index + 1}`);
        const hiddenImage = scratcher.querySelector(`img#hidden-image${index + 1}`);
        const ctx = canvas ? canvas.getContext('2d', { willReadFrequently: true }) : null;

        if (!canvas || !initialImage || !hiddenImage || !ctx || !progressBar) {
            console.error(`Um ou mais elementos não foram encontrados no scratcher ${index + 1}.`);
            return;
        }

        // Define o tamanho do canvas com base na div .scratcher
        canvas.width = scratcher.offsetWidth;
        canvas.height = scratcher.offsetHeight;

        let isMouseOver = false; // Indica se o mouse está sobre a tartaruga
        let imagesLoaded = false;
        let scratchedPercentage = 0; // Percentual raspado individual para cada scratcher

        // Função para carregar as imagens
        const loadImages = () => {
            const imgHidden = new Image();
            const imgInitial = new Image();

            imgHidden.src = hiddenImage.src;
            imgInitial.src = initialImage.src;

            imgInitial.onload = () => {
                // Desenha a imagem oculta no canvas
                ctx.drawImage(imgHidden, 0, 0, canvas.width, canvas.height); // Fundo
                // Desenha a imagem inicial por cima
                ctx.globalCompositeOperation = 'source-over';
                ctx.drawImage(imgInitial, 0, 0, canvas.width, canvas.height); // Imagem inicial
                imagesLoaded = true;
                console.log('Imagens carregadas e desenhadas.');
            };

            imgInitial.onerror = () => console.error('Erro ao carregar a imagem inicial.');
        };

        loadImages();

        // Função para raspar a imagem
        function scratch(e) {
            if (!isMouseOver || !imagesLoaded || scratcher.classList.contains('bloqueada')) return;

            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Apaga a parte superior
            ctx.globalCompositeOperation = 'destination-out';
            ctx.beginPath();
            ctx.arc(x, y, scratchRadius, 0, Math.PI * 2);
            ctx.fill();

            // Verifica a área raspada (amostragem)
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            let scratchedPixels = 0;
            const totalPixels = imageData.width * imageData.height;
            const sampleRate = 2; // Tamanho da amostragem (quanto maior, mais rápido, mas menos preciso)

            for (let i = 3; i < imageData.data.length; i += 4 * sampleRate) {
                if (imageData.data[i] === 0) { // Verifica pixels transparentes (canal alpha)
                    scratchedPixels++;
                }
            }

            // Atualiza a porcentagem raspada individualmente
            scratchedPercentage = (scratchedPixels * sampleRate) / totalPixels;
            console.log(`Porcentagem raspada do scratcher ${index + 1}: ${scratchedPercentage * 100}%`);

            // Atualiza a barra de progresso com a porcentagem geral
            updateGlobalProgress();
        }

        // Função para iniciar a raspagem quando o mouse entra na tartaruga
        function enterScratcher() {
            isMouseOver = true;
            canvas.addEventListener('mousemove', scratch);
        }

        // Função para parar a raspagem quando o mouse sai da tartaruga
        function leaveScratcher() {
            isMouseOver = false;
            canvas.removeEventListener('mousemove', scratch);
        }

        // Adiciona os eventos de mouse
        canvas.addEventListener('mouseenter', enterScratcher);
        canvas.addEventListener('mouseleave', leaveScratcher);
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
            setTimeout(() => {
                window.location.href = 'fase3.html';
            }, 500);
        }
    }

    const popupMessage = document.getElementById('popup-message');

    if (popupMessage) {
        document.body.style.cursor = 'none'; // Oculta o cursor
        setTimeout(() => {
            popupMessage.classList.add('show');
            conteudo.classList.add('blurred');
        }, 500);

        setTimeout(() => {
            popupMessage.classList.remove('show');
            popupMessage.classList.add('hide');
            conteudo.classList.remove('blurred');
            document.body.style.cursor = 'auto'; // Restaura o cursor
        }, 5500);
    } else {
        console.error('Elemento popup-message não encontrado.');
    }
});