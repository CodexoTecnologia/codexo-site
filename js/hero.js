class HeroComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
        this.initializeAnimation();
    }

    render() {
        const title = this.getAttribute('title') || 'Transformamos Ideias em Realidade Digital.';
        const description = this.getAttribute('description') || 'Traduzimos a complexidade do desenvolvimento em soluções inteligentes e humanas para o mercado empresarial e cotidiano.';
        const ctaText = this.getAttribute('cta-text') || 'Falar com Especialista';
        const ctaLink = this.getAttribute('cta-link') || '#contato';
        const backgroundImage = 'assets/banner.png';

        this.innerHTML = `
            <section id="inicio" class="hero" style="background-image: url('${backgroundImage}');">
                <div class="container">
                    <div class="hero-content">
                        <h1 class="animate-on-scroll">${title}</h1>
                        <p class="animate-on-scroll">${description}</p>
                        <a href="${ctaLink}" class="btn btn-secondary animate-on-scroll">${ctaText}</a>
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

customElements.define('hero-component', HeroComponent);
