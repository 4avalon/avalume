import { getPagesConfig, getDynamicComponentsConfig } from './config.js';
import { loadHTML, loadCSS, loadHandler } from './loader.js';

    // Navegação Entre Páginas
 function navigateToPage() {
    const hash = window.location.hash.slice(1) || 'home';
    console.log(`[Router] Navegando para a página: "${hash}"`);

    const page = getPagesConfig().find((p) => p.name === hash);
    if (!page) {
      console.error(`[Router] Página "${hash}" não encontrada.`);
      return;
    }

    loadHTML('pages-container', page.htmlPath).then(() => {
      loadCSS(page.cssPath);
       // Após carregar a página, injetar componentes dinâmicos se necessário
    injectDynamicComponents();
      if (page.handlerPath) {
        loadHandler(page.handlerPath);
      }
      });
  }

// Injeção de Componentes Dinâmicos
function injectDynamicComponents() {
  console.log('[Router] Injetando componentes dinâmicos...');

  const dynamicComponents = getDynamicComponentsConfig();
  for (const [key, component] of Object.entries(dynamicComponents)) {
    const placeholder = document.querySelector(`#${key}-placeholder`);
    if (placeholder) {
      console.log(`[Router] Injetando componente: ${key}`);
      loadHTML(placeholder.id, component.htmlPath).then(() => {
        loadCSS(component.cssPath);
        if (component.jsPath) {
          loadHandler(component.jsPath);
        }
      });
    } else {
      console.log(`[Router] Componente dinâmico "${key}" não utilizado nesta página.`);
    }
  }
}

export { navigateToPage };