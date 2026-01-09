class PartnersComponent extends HTMLElement {
    constructor() {
        super();
        this.partners = [];
    }

    connectedCallback() {
        this.loadPartners();
    }

    loadPartners() {
        this.partners = [
            { name: 'TechCorp Solutions', logo: 'https://via.placeholder.com/200x80/7F5AF0/FFFFFF?text=TechCorp' },
            { name: 'Digital Innovations', logo: 'https://via.placeholder.com/200x80/5E35B1/FFFFFF?text=Digital+Innovations' },
            { name: 'Smart Systems', logo: 'https://via.placeholder.com/200x80/8E44AD/FFFFFF?text=Smart+Systems' },
            { name: 'Cloud Dynamics', logo: 'https://via.placeholder.com/200x80/6A1B9A/FFFFFF?text=Cloud+Dynamics' },
            { name: 'DataFlow Pro', logo: 'https://via.placeholder.com/200x80/9B59B6/FFFFFF?text=DataFlow+Pro' },
            { name: 'NextGen Tech', logo: 'https://via.placeholder.com/200x80/7E57C2/FFFFFF?text=NextGen+Tech' },
            { name: 'Innovate Labs', logo: 'https://via.placeholder.com/200x80/673AB7/FFFFFF?text=Innovate+Labs' },
            { name: 'Future Software', logo: 'https://via.placeholder.com/200x80/512DA8/FFFFFF?text=Future+Software' }
        ];
        
        this.render();
        this.initializeAnimation();
    }

    render() {
        this.innerHTML = `
            <section id="parceiros" class="partners">
                <div class="container">
                    <h2 class="section-title animate-on-scroll">Nossos Parceiros</h2>
                </div>
                <div class="partners-carousel">
                    <div class="partners-track">
                        ${this.renderPartners()}
                        ${this.renderPartners()} <!-- Duplicado para efeito infinito -->
                    </div>
                </div>
            </section>
        `;
    }

    renderPartners() {
        if (this.partners.length === 0) {
            return '<p class="no-partners">Em breve, nossos parceiros!</p>';
        }
        
        return this.partners.map(partner => `
            <div class="partner-item">
                <div class="partner-logo-placeholder">
                    <span>${partner.name}</span>
                </div>
            </div>
        `).join('');
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
        elementsToAnimate.forEach(element => observer.observe(element));
    }
}

customElements.define('partners-component', PartnersComponent);
