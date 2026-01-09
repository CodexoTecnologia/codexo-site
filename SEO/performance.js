// Otimizações de performance para SEO
class PerformanceOptimizer {
    // Lazy loading de imagens
    static initLazyLoading() {
        if ('loading' in HTMLImageElement.prototype) {
            // Navegadores modernos suportam lazy loading nativo
            const images = document.querySelectorAll('img[loading="lazy"]');
            images.forEach(img => {
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                }
            });
        } else {
            // Fallback para navegadores antigos usando Intersection Observer
            const images = document.querySelectorAll('img[loading="lazy"]');
            
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                        }
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        }
    }

    // Defer de scripts não críticos
    static deferScripts() {
        const scripts = document.querySelectorAll('script[data-defer]');
        scripts.forEach(script => {
            const newScript = document.createElement('script');
            newScript.src = script.src;
            newScript.defer = true;
            script.parentNode.replaceChild(newScript, script);
        });
    }

    // Minificar inline CSS crítico
    static optimizeCriticalCSS() {
        // Adiciona CSS crítico inline para first paint mais rápido
        const criticalCSS = `
            body{margin:0;font-family:Poppins,sans-serif;background:#16161a;color:#fff}
            .navbar{position:fixed;top:0;width:100%;z-index:1000;background:rgba(22,22,26,.8)}
            #preloader{position:fixed;top:0;left:0;width:100%;height:100%;background:#16161a;z-index:9999;display:flex;align-items:center;justify-content:center}
        `;
        
        const style = document.createElement('style');
        style.textContent = criticalCSS;
        document.head.insertBefore(style, document.head.firstChild);
    }

    // Resource hints para recursos importantes
    static addResourceHints() {
        // DNS Prefetch
        const dnsPrefetchUrls = [
            'https://fonts.googleapis.com',
            'https://fonts.gstatic.com',
            'https://cdnjs.cloudflare.com'
        ];

        dnsPrefetchUrls.forEach(url => {
            const link = document.createElement('link');
            link.rel = 'dns-prefetch';
            link.href = url;
            document.head.appendChild(link);
        });
    }

    // Registrar Service Worker para cache
    static registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                    .then(registration => console.log('SW registered'))
                    .catch(err => console.log('SW registration failed'));
            });
        }
    }

    // Comprimir imagens automaticamente
    static compressImages() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            // Adiciona parâmetros de otimização se a URL suportar
            if (img.src && !img.dataset.optimized) {
                img.decoding = 'async';
                img.dataset.optimized = 'true';
            }
        });
    }

    // Monitorar Web Vitals
    static monitorWebVitals() {
        // Largest Contentful Paint (LCP)
        const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime);
        });
        
        try {
            observer.observe({ entryTypes: ['largest-contentful-paint'] });
        } catch (e) {
            // Navegador não suporta
        }

        // First Input Delay (FID)
        const fidObserver = new PerformanceObserver((list) => {
            list.getEntries().forEach(entry => {
                console.log('FID:', entry.processingStart - entry.startTime);
            });
        });
        
        try {
            fidObserver.observe({ entryTypes: ['first-input'] });
        } catch (e) {
            // Navegador não suporta
        }
    }

    // Inicializar otimizações
    static initAll() {
        this.optimizeCriticalCSS();
        this.addResourceHints();
        this.initLazyLoading();
        this.compressImages();
        this.monitorWebVitals();
        
        // Executar após carregamento completo
        if (document.readyState === 'complete') {
            this.deferScripts();
        } else {
            window.addEventListener('load', () => {
                this.deferScripts();
            });
        }
    }
}

// Inicializar quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => PerformanceOptimizer.initAll());
} else {
    PerformanceOptimizer.initAll();
}
