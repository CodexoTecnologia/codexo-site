class HeaderComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
        this.initializeEventListeners();
    }

    render() {
        this.innerHTML = `
            <header class="navbar">
                <div class="container">
                    <a href="#inicio" class="logo">
                        <img src="assets/logo_codexo_nome_branco.svg" alt="Codexo - Desenvolvimento de Software" class="logo-img" type="image/svg+xml">
                    </a>
                    <nav class="nav-links" aria-label="Menu principal">
                        <ul>
                            <li><a href="#parceiros">Parceiros</a></li>
                            <li><a href="#valores">Valores</a></li>
                            <li><a href="#solucoes">Soluções</a></li>
                            <li><a href="#sobre">Sobre Nós</a></li>
                            <li><a href="#contato">Contato</a></li>
                        </ul>
                    </nav>
                    <a href="#contato" class="btn btn-primary">Falar com Especialista</a>
                    <button class="hamburger" aria-label="Menu" aria-expanded="false">
                        <i class="fas fa-bars"></i>
                    </button>
                </div>
            </header>
        `;
    }

    initializeEventListeners() {
        const hamburger = this.querySelector('.hamburger');
        const navLinksMenu = this.querySelector('.nav-links');

        hamburger.addEventListener('click', () => {
            const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
            hamburger.setAttribute('aria-expanded', !isExpanded);
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

        const navLinks = this.querySelectorAll('.nav-links a');

        function activateNavLink() {
            const sections = document.querySelectorAll('section[id]');
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                // Considera a seção atual se estivermos dentro dela (com margem de 200px)
                if (window.scrollY >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });

            // Se não encontrou nenhuma seção (topo da página), usa 'inicio'
            if (!current && window.scrollY < 300) {
                current = 'inicio';
            }

            navLinks.forEach(link => {
                link.classList.remove('active');
                const href = link.getAttribute('href');
                if (href === '#' + current) {
                    link.classList.add('active');
                }
            });
        }

        // Ativa a seção inicial ao carregar a página
        window.addEventListener('load', activateNavLink);
        // Atualiza ao fazer scroll
        window.addEventListener('scroll', activateNavLink);
        // Ativa imediatamente
        setTimeout(activateNavLink, 100);

        this.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const offset = 100;
                    const targetPosition = target.offsetTop - offset;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    if (navLinksMenu.classList.contains('active')) {
                        navLinksMenu.classList.remove('active');
                        hamburger.setAttribute('aria-expanded', 'false');
                        const icon = hamburger.querySelector('i');
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
            });
        });
    }
}

customElements.define('header-component', HeaderComponent);
