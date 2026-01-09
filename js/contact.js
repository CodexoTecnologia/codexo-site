class ContactComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
        this.initializeAnimation();
        this.initializeForm();
    }

    render() {
        const title = this.getAttribute('title') || 'Vamos Conversar?';
        const description = this.getAttribute('description') || 'Envie-nos uma mensagem e vamos descobrir como a Codexo pode ajudar a levar sua empresa para o próximo nível.';
        const formAction = this.getAttribute('form-action') || 'https://formspree.io/f/xnnberyp';

        this.innerHTML = `
            <section id="contato" class="contact">
                <div class="container">
                    <h2 class="section-title animate-on-scroll">${title}</h2>
                    <p class="animate-on-scroll">${description}</p>

                    <form class="contact-form animate-on-scroll" action="${formAction}" method="POST" itemscope itemtype="https://schema.org/ContactPage">
                        <input type="text" name="name" placeholder="Seu nome" required aria-label="Nome">
                        <input type="email" name="email" placeholder="Seu melhor e-mail" required aria-label="E-mail">
                        <input type="tel" name="phone" placeholder="Seu telefone(Whatsapp)" aria-label="Telefone">
                        <textarea name="message" placeholder="Conte-nos sobre seu projeto..." rows="5" required aria-label="Mensagem"></textarea>
                        <button type="submit" class="btn btn-primary">
                            <span class="btn-text">Enviar Mensagem</span>
                            <span class="btn-loader" style="display: none;">
                                <i class="fas fa-circle-notch fa-spin"></i> Enviando...
                            </span>
                        </button>
                        <div class="form-message" style="display: none;" role="alert"></div>
                    </form>
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

    initializeForm() {
        const contactForm = this.querySelector('.contact-form');
        const btnText = contactForm.querySelector('.btn-text');
        const btnLoader = contactForm.querySelector('.btn-loader');
        const formMessage = contactForm.querySelector('.form-message');

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
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
    }
}

customElements.define('contact-component', ContactComponent);
