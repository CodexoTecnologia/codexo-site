class ValuesComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
        this.initializeAnimation();
    }

    render() {
        this.innerHTML = `
            <section id="valores" class="values">
                <div class="container">
                    <div class="values-grid">
                        <div class="value-card animate-on-scroll">
                            <h3>Missão</h3>
                            <div class="value-icon">
                                <i class="fas fa-bullseye"></i>
                            </div>
                            <p>Transformar desafios em soluções digitais de alta performance, melhorar e escalar soluções para os nossos clientes através da tecnologia e inovação.</p>
                        </div>
                        <div class="value-card animate-on-scroll">
                            <h3>Visão</h3>
                            <div class="value-icon">
                                <i class="fas fa-eye"></i>
                            </div>
                            <p>Ser referência em desenvolvimento de software, reconhecidos pela excelência técnica, comprometimento e pela capacidade de entregar soluções que geram valor real ao mercado.</p>
                        </div>
                        <div class="value-card animate-on-scroll">
                            <h3>Valores</h3>
                            <div class="value-icon">
                                <i class="fas fa-heart"></i>
                            </div>
                            <p style="text-align: center;">
                                <strong>Empatia</strong><br>
                                <strong>Ética</strong><br>
                                <strong>Segurança</strong><br>
                                <strong>Compromisso com resultados</strong>
                            </p>
                        </div>
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

customElements.define('values-component', ValuesComponent);
