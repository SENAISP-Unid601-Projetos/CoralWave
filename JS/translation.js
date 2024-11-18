const translations = {
    'português': {
        "English": "Português",
        "Login": "Login",
        "Frequent Questions": "Dúvidas Frequentes",
        "Where is it available?": "Onde está disponível?",
        "Our game is available for Web Browsers.": "Nosso jogo está disponível para Navegadores Web.",
        "What is the recommended age range?": "Qual a faixa etária indicada?",
        "The recommended age range is for children from 4 - 7 years old.": "A faixa etária indicada é para crianças de 4 - 7 anos de idade.",
        "Is it accessible?": "É acessível?",
        "Our game is accessible for all ages, being educational, playful and beautiful.": "Nosso jogo é acessível para todas as idades, sendo educativo, lúdico e bonito.",
        "How many levels are there?": "Quantas fases têm?",
        "The game has 4 levels, two about waste collection and recycling and two about marine cleaning and preservation.": "O jogo possui 4 fases, sendo duas sobre coleta e reciclagem de resíduos e duas sobre limpeza e preservação marinha.",
        "Do I need to pay anything?": "Preciso pagar algo?",
        "The game is completely free, with no additional costs or charges.": "O jogo é totalmente gratuito, sem nenhum custo adicional ou cobrança.",
        "What is it for?": "Para que serve?",
        "'Ocean Guardians' aims to provide playful education and raise awareness among children through the game.": "'Guardiões do Oceano' tem como intuito a educação lúdica e conscientização das crianças através do jogo."
    },
    'english': {
        "Português": "English",
        "Login": "Login",
        "Dúvidas Frequentes": "Frequent Questions",
        "Onde está disponível?": "Where is it available?",
        "Nosso jogo está disponível para Navegadores Web.": "Our game is available for Web Browsers.",
        "Qual a faixa etária indicada?": "What is the recommended age range?",
        "A faixa etária indicada é para crianças de 4 - 7 anos de idade.": "The recommended age range is for children from 4 - 7 years old.",
        "É acessível?": "Is it accessible?",
        "Nosso jogo é acessível para todas as idades, sendo educativo, lúdico e bonito.": "Our game is accessible for all ages, being educational, playful and beautiful.",
        "Quantas fases têm?": "How many levels are there?",
        "O jogo possui 4 fases, sendo duas sobre coleta e reciclagem de resíduos e duas sobre limpeza e preservação marinha.": "The game has 4 levels, two about waste collection and recycling and two about marine cleaning and preservation.",
        "Preciso pagar algo?": "Do I need to pay anything?",
        "O jogo é totalmente gratuito, sem nenhum custo adicional ou cobrança.": "The game is completely free, with no additional costs or charges.",
        "Para que serve?": "What is it for?",
        "'Guardiões do Oceano' tem como intuito a educação lúdica e conscientização das crianças através do jogo.": "'Ocean Guardians' aims to provide playful education and raise awareness among children through the game."
    }
};

let currentLanguage = 'português';

function updateContent(language) {
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[language][key]) {
            element.textContent = translations[language][key];
        } else if (translations[language][element.textContent]) {
            // Caso a chave não seja encontrada, tenta usar o texto atual como chave
            element.textContent = translations[language][element.textContent];
        }
    });
}

document.getElementById('languageToggle').addEventListener('click', function() {
    currentLanguage = currentLanguage === 'português' ? 'english' : 'português';
    this.textContent = currentLanguage === 'português' ? 'English' : 'Português';
    updateContent(currentLanguage);
});

// Inicializar a página com o idioma padrão (português)
updateContent('português');
document.querySelector('.formulario-contato').addEventListener('submit', function(e) {
    e.preventDefault(); // Previne o envio padrão do formulário

    // Mostra o popup
    const popup = document.getElementById('popup');
    popup.style.display = 'block';

    // Espera 3 segundos e então faz o fade out
    setTimeout(() => {
        popup.style.animation = 'fadeOut 0.5s';
        
        // Após a animação, recarrega a página
        setTimeout(() => {
            window.location.reload();
        }, 500);
    }, 3000);
});