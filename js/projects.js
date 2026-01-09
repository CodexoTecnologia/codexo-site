class SolutionsComponent extends HTMLElement {
    constructor() {
        super();
        this.solutions = [];
    }

    connectedCallback() {
        this.loadSolutions();
    }

    loadSolutions() {
        this.solutions = [
            {
                icon: 'fas fa-globe',
                title: 'Sistemas Web e Presença de Alta Performance',
                description: 'Muito mais que um site: construímos a estrutura digital que o seu negócio precisa para crescer. Desenvolvemos plataformas web rápidas, seguras e otimizadas para converter visitantes em clientes, garantindo que sua empresa tenha uma presença sólida e escalável no mercado.'
            },
            {
                icon: 'fas fa-robot',
                title: 'Automação e Inteligência de Processos',
                description: 'Elimine processos repetitivos e operacionais, ganhando tempo para focar no que é importante. Desenvolvemos automações para transformar fluxos de trabalho de forma inteligente, maximizando a eficiência das operações.'
            },
            {
                icon: 'fas fa-mobile-alt',
                title: 'Soluções para o Cotidiano',
                description: 'Criamos softwares como serviço pensados para facilitar a vida das pessoas. Nossas soluções proprietárias focam em resolver problemas reais do dia a dia com tecnologia intuitiva, acessível e humana, permitindo que usuários comuns alcancem novos níveis de produtividade e organização.'
            },
            {
                icon: 'fas fa-chart-line',
                title: 'Gestão e Controle',
                description: 'Soluções completas para organizações, com gestão funcional, centralização de dados e painéis administrativos complexos para tomada de decisão. Entregamos a inteligência necessária para um controle total da sua empresa.'
            }
        ];
        
        this.render();
        this.initializeAnimation();
    }

    render() {
        this.innerHTML = `
            <section id="solucoes" class="solutions">
                <div class="container">
                    <h2 class="section-title animate-on-scroll">Nossas Soluções</h2>
                    <div class="solutions-grid">
                        ${this.renderSolutions()}
                    </div>
                </div>
            </section>
        `;
    }

    renderSolutions() {
        return this.solutions.map(solution => `
            <div class="solution-card animate-on-scroll">
                <div class="solution-icon">
                    <i class="${solution.icon}"></i>
                </div>
                <h3>${solution.title}</h3>
                <p>${solution.description}</p>
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
        elementsToAnimate.forEach(el => observer.observe(el));
    }
}

customElements.define('solutions-component', SolutionsComponent);
