// Dados estruturados para SEO (Schema.org)
class StructuredData {
    // Website Schema
    static addWebsiteSchema() {
        const structuredData = {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Codexo",
            "url": "https://codexo.com.br",
            "description": "Desenvolvimento de software sob medida. Transformamos ideias em realidade digital.",
            "potentialAction": {
                "@type": "SearchAction",
                "target": "https://codexo.com.br/?s={search_term_string}",
                "query-input": "required name=search_term_string"
            }
        };

        this.addToHead(structuredData, 'website');
    }

    // Organization Schema
    static addOrganizationSchema() {
        const structuredData = {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Codexo",
            "url": "https://codexo.com.br",
            "logo": "https://codexo.com.br/assets/logo_codexo_roxo_principal.svg",
            "description": "Desenvolvimento de software sob medida. Transformamos ideias em realidade digital.",
            "sameAs": [
                "https://www.linkedin.com/company/codexo-tecnologia",
                "https://github.com/CodexoTecnologiaLTDA",
                "https://www.instagram.com/codexotecnologia"
            ],
            "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+55-41-99565-6346",
                "contactType": "customer service",
                "availableLanguage": "Portuguese"
            }
        };

        this.addToHead(structuredData, 'organization');
    }

    // Breadcrumb Schema
    static addBreadcrumbSchema() {
        const structuredData = {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Início",
                    "item": "https://codexo.com.br"
                },
                {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Projetos",
                    "item": "https://codexo.com.br#projetos"
                },
                {
                    "@type": "ListItem",
                    "position": 3,
                    "name": "Sobre",
                    "item": "https://codexo.com.br#sobre"
                },
                {
                    "@type": "ListItem",
                    "position": 4,
                    "name": "Contato",
                    "item": "https://codexo.com.br#contato"
                }
            ]
        };

        this.addToHead(structuredData, 'breadcrumb');
    }

    // Projects Schema
    static addProjectsSchema(projects) {
        if (!projects || projects.length === 0) return;

        const structuredData = {
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": projects.map((project, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                    "@type": "CreativeWork",
                    "name": project.name,
                    "description": project.description,
                    "image": project.image
                }
            }))
        };

        this.addToHead(structuredData, 'projects');
    }

    // Adicionar JSON-LD ao head
    static addToHead(data, identifier) {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(data);
        
        const oldScript = document.querySelector(`script[type="application/ld+json"][data-${identifier}]`);
        if (oldScript) oldScript.remove();
        
        script.setAttribute(`data-${identifier}`, 'true');
        document.head.appendChild(script);
    }

    // Inicializar todos os schemas
    static initAll() {
        this.addWebsiteSchema();
        this.addOrganizationSchema();
        this.addBreadcrumbSchema();
    }
}

// Inicializar schemas quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => StructuredData.initAll());
} else {
    StructuredData.initAll();
}
