document.addEventListener('DOMContentLoaded', () => {

    // ==================== PRELOADER ====================
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    });

    // ==================== PROGRESS BAR ====================
    const progressBar = document.querySelector('.scroll-progress-bar');
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });

    // ==================== BOTÃO VOLTAR AO TOPO ====================
    const backToTopBtn = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ==================== MENU ATIVO BASEADO NA SEÇÃO ====================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    function activateNavLink() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', activateNavLink);

    // ==================== SCROLL SUAVE COM OFFSET ====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 100; // Altura do navbar
                const targetPosition = target.offsetTop - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Fechar menu mobile se estiver aberto
                const navLinksMenu = document.querySelector('.nav-links');
                if (navLinksMenu.classList.contains('active')) {
                    navLinksMenu.classList.remove('active');
                    const icon = document.querySelector('.hamburger i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    });

    // ==================== MENU HAMBURGER (MOBILE) ====================
    const hamburger = document.querySelector('.hamburger');
    const navLinksMenu = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinksMenu.classList.toggle('active');
        const icon = hamburger.querySelector('i');
        if (icon.classList.contains('fa-bars')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // ==================== ANIMAÇÃO AO ROLAR (SCROLL) ====================
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0.1
    });

    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
    elementsToAnimate.forEach(el => observer.observe(el));

    // ==================== FORMULÁRIO DE CONTATO ====================
    const contactForm = document.querySelector('.contact-form');
    const btnText = contactForm.querySelector('.btn-text');
    const btnLoader = contactForm.querySelector('.btn-loader');
    const formMessage = contactForm.querySelector('.form-message');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Mostrar loading
        btnText.style.display = 'none';
        btnLoader.style.display = 'inline-block';
        contactForm.querySelector('button').disabled = true;

        fetch(this.action, {
            method: 'POST',
            body: new FormData(this),
            headers: { 'Accept': 'application/json' }
        }).then(function(response) {
            btnText.style.display = 'inline-block';
            btnLoader.style.display = 'none';
            contactForm.querySelector('button').disabled = false;

            if (response.ok) {
                formMessage.style.display = 'block';
                formMessage.className = 'form-message success';
                formMessage.innerHTML = '<i class="fas fa-check-circle"></i> Mensagem enviada com sucesso! Retornaremos em breve.';
                contactForm.reset();
            } else {
                formMessage.style.display = 'block';
                formMessage.className = 'form-message error';
                formMessage.innerHTML = '<i class="fas fa-exclamation-circle"></i> Ocorreu um erro. Por favor, tente novamente.';
            }

            // Esconder mensagem após 5 segundos
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        }).catch(function() {
            btnText.style.display = 'inline-block';
            btnLoader.style.display = 'none';
            contactForm.querySelector('button').disabled = false;
            
            formMessage.style.display = 'block';
            formMessage.className = 'form-message error';
            formMessage.innerHTML = '<i class="fas fa-exclamation-circle"></i> Erro de conexão. Tente novamente.';
            
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        });
    });

});