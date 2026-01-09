class FooterComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const year = new Date().getFullYear();
        const companyName = this.getAttribute('company-name') || 'Codexo';
        const linkedinUrl = this.getAttribute('linkedin') || 'https://www.linkedin.com/company/codexo-tecnologia';
        const githubUrl = this.getAttribute('github') || 'https://github.com/CodexoTecnologiaLTDA';
        const instagramUrl = this.getAttribute('instagram') || 'https://www.instagram.com/codexotecnologia';

        this.innerHTML = `
            <footer class="footer" itemscope itemtype="https://schema.org/WPFooter">
                <div class="container">
                    <div class="footer-content">
                        <div class="footer-column footer-about">
                            <h3>Codexo</h3>
                            <p>Transformando ideias em realidade digital desde 2025. Soluções inteligentes para o mercado empresarial.</p>
                            <div class="social-links">
                                <a href="${linkedinUrl}" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn da ${companyName}">
                                    <i class="fab fa-linkedin"></i>
                                </a>
                                <a href="${githubUrl}" target="_blank" rel="noopener noreferrer" aria-label="GitHub da ${companyName}">
                                    <i class="fab fa-github"></i>
                                </a>
                                <a href="${instagramUrl}" target="_blank" rel="noopener noreferrer" aria-label="Instagram da ${companyName}">
                                    <i class="fab fa-instagram"></i>
                                </a>
                            </div>
                        </div>

                        <div class="footer-column footer-nav">
                            <h4>Navegação</h4>
                            <ul>
                                <li><a href="#inicio">Início</a></li>
                                <li><a href="#solucoes">Soluções</a></li>
                                <li><a href="#valores">Valores</a></li>
                                <li><a href="#sobre">Sobre Nós</a></li>
                                <li><a href="#contato">Contato</a></li>
                            </ul>
                        </div>

                        <div class="footer-column footer-info">
                            <h4>Informações</h4>
                            <ul>
                                <li>
                                    <i class="fas fa-map-marker-alt"></i>
                                    <span></span>
                                </li>
                                <li>
                                    <i class="fas fa-clock"></i>
                                    <span>Seg a Sex: 08:00 às 18:00</span>
                                </li>
                                <li>
                                    <i class="fas fa-envelope"></i>
                                    <span></span>
                                </li>
                                <li>
                                    <i class="fas fa-phone-alt"></i>
                                    <span>(41) 9 9565-6346</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="footer-bottom">
                        <p>&copy; ${year} ${companyName.toUpperCase()}. Todos os direitos reservados.</p>
                        <div class="footer-credits">
                            <span>Desenvolvido por</span>
                            <img src="assets/logo_codexo_nome_branco.svg" alt="Codexo" class="footer-logo">
                        </div>
                    </div>
                </div>
            </footer>
        `;
    }
}

customElements.define('footer-component', FooterComponent);
