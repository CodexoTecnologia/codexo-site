class MetaTags {
    static setOpenGraph(options = {}) {
        const defaults = {
            title: 'Codexo - Desenvolvimento de Software Sob Medida',
            description: 'Transformamos ideias em realidade digital. Criamos softwares sob medida que impulsionam o crescimento e a eficiência da sua empresa.',
            image: 'https://codexo.com.br/assets/logo_codexo_roxo_principal.png',
            url: 'https://codexo.com.br',
            type: 'website'
        };

        const config = { ...defaults, ...options };

        this.setMeta('og:title', config.title, 'property');
        this.setMeta('og:description', config.description, 'property');
        this.setMeta('og:image', config.image, 'property');
        this.setMeta('og:url', config.url, 'property');
        this.setMeta('og:type', config.type, 'property');
        this.setMeta('og:site_name', 'Codexo', 'property');
        this.setMeta('og:locale', 'pt_BR', 'property');
    }

    // Twitter Cards
    static setTwitterCards(options = {}) {
        const defaults = {
            title: 'Codexo - Desenvolvimento de Software Sob Medida',
            description: 'Transformamos ideias em realidade digital. Criamos softwares sob medida que impulsionam o crescimento e a eficiência da sua empresa.',
            image: 'https://codexo.com.br/assets/logo_codexo_roxo_principal.png'
        };

        const config = { ...defaults, ...options };

        this.setMeta('twitter:card', 'summary_large_image', 'name');
        this.setMeta('twitter:title', config.title, 'name');
        this.setMeta('twitter:description', config.description, 'name');
        this.setMeta('twitter:image', config.image, 'name');
    }

    static setMeta(key, content, attribute = 'name') {
        let meta = document.querySelector(`meta[${attribute}="${key}"]`);
        
        if (!meta) {
            meta = document.createElement('meta');
            meta.setAttribute(attribute, key);
            document.head.appendChild(meta);
        }
        
        meta.setAttribute('content', content);
    }

    static initAll() {
        this.setOpenGraph();
        this.setTwitterCards();
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => MetaTags.initAll());
} else {
    MetaTags.initAll();
}
