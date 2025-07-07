document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const banner = document.querySelector('.imagens-banner');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dotsContainer = document.querySelector('.banner-dots');
    
    // Variáveis de controle
    let currentIndex = 0;
    const totalSlides = slides.length;
    let intervalId;
    const intervalTime = 5000; // 5 segundos
    
    // Função para criar os dots de navegação
    function createDots() {
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
    }
    
    // Função para mover o banner
    function moveBanner() {
        banner.style.transform = `translateX(-${currentIndex * 100}%)`;
        updateDots();
    }
    
    // Função para atualizar os dots ativos
    function updateDots() {
        const dots = document.querySelectorAll('.dot');
        dots.forEach(dot => dot.classList.remove('active'));
        dots[currentIndex].classList.add('active');
    }
    
    // Função para ir para um slide específico
    function goToSlide(index) {
        currentIndex = index;
        moveBanner();
        resetInterval();
    }
    
    // Avançar para o próximo slide
    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        moveBanner();
        resetInterval();
    }
    
    // Voltar para o slide anterior
    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        moveBanner();
        resetInterval();
    }
    
    // Configurar intervalo para troca automática
    function startInterval() {
        intervalId = setInterval(nextSlide, intervalTime);
    }
    
    // Resetar intervalo quando o usuário interagir
    function resetInterval() {
        clearInterval(intervalId);
        startInterval();
    }
    
    // Inicialização
    function init() {
        // Configura o container dos slides
        banner.style.display = 'flex';
        banner.style.width = `${totalSlides * 100}%`;
        
        // Configura cada slide
        slides.forEach(slide => {
            slide.style.flex = '0 0 100%';
            slide.style.width = '100%';
        });
        
        createDots();
        startInterval();
        
        // Event listeners
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);
        
        // Pausar quando o mouse estiver sobre o banner
        banner.addEventListener('mouseenter', () => {
            clearInterval(intervalId);
        });
        
        // Retomar quando o mouse sair do banner
        banner.addEventListener('mouseleave', startInterval);
        
        // Teclado: setas esquerda/direita
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') nextSlide();
            if (e.key === 'ArrowLeft') prevSlide();
        });
    }
    
    // Iniciar o banner
    init();
  });