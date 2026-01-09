class AboutComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
        this.initializeAnimation();
    }

    render() {
        const title = this.getAttribute('title') || 'Quem Somos';
        const description = this.getAttribute('description') || 'A Codexo nasceu do propósito de resolver desafios reais através da tecnologia. Mais do que desenvolvedores, somos sócios estratégicos comprometidos com o sucesso de quem confia em nosso trabalho. Nosso time de 5 especialistas une empatia, rigor analítico e expertise técnica, trazendo uma visão inovadora para entregar soluções de alta performance que simplificam processos e geram valor real para o mercado e para o cotidiano.';

        this.innerHTML = `
            <section id="sobre" class="about" itemscope itemtype="https://schema.org/Organization">
                <div class="container">
                    <div class="about-content">
                        <h2 class="section-title animate-on-scroll" itemprop="name">${title}</h2>
                        <p class="animate-on-scroll" itemprop="description">${description}</p>
                        <meta itemprop="url" content="https://codexo.com.br">
                        <meta itemprop="logo" content="https://codexo.com.br/assets/logo_codexo_roxo_principal.svg">
                    </div>
                </div>
            </section>
        `;
    }

    initializeAnimation() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, {
            threshold: 0.1
        });

        const elementsToAnimate = this.querySelectorAll('.animate-on-scroll');
        elementsToAnimate.forEach(el => observer.observe(el));
    }
}

customElements.define('about-component', AboutComponent);
