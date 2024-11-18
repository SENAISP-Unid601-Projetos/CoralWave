document.addEventListener('DOMContentLoaded', function() {
    const btnTopo = document.getElementById('btnTopo');
    
    // Mostrar/ocultar botão baseado na posição da rolagem
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) { // Mostrar botão após rolar 300px
            btnTopo.classList.add('visible');
        } else {
            btnTopo.classList.remove('visible');
        }
    });

    // Função de rolagem suave ao topo
    btnTopo.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
window.addEventListener('scroll', function() {
    const estaticorContainer = document.querySelector('.estaticor-container');
    const estatico = document.querySelector('.estatico');
    const rect = estatico.getBoundingClientRect();
    
    if (rect.top < window.innerHeight && rect.bottom > 0) {
        const offset = (window.innerHeight - rect.top) * 0.3; // Ajuste o 0.3 para controlar a velocidade
        estaticorContainer.style.transform = `translateY(${offset}px)`;
         // Movimento adicional para a logo
         const logoemp = document.querySelector('.logoemp');
         const logoOffset = offset * 1; // A logo se move mais lentamente que o fundo
         logoemp.style.transform = `translate(-50%, calc(-50% + ${logoOffset}px))`;
    }
});
