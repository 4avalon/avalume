import { loadHTML, loadCSS } from '../utils.js';

// Função para carregar HTML e CSS juntos, garantindo ordem
const loadHTMLWithCSS = async (containerId, htmlPath, cssPath) => {
  try {
    // Carrega o CSS primeiro
    if (cssPath) {
      await loadCSS(cssPath);
    }

    // Carrega o HTML depois que o CSS for carregado
    await loadHTML(containerId, htmlPath);
  } catch (error) {
    console.error(`[Error] Erro ao carregar HTML ou CSS: ${error.message}`);
  }
};

// Função principal para carregar os componentes
export const loadComponents = async () => {
  console.log("[LoadComponents] Carregando componentes...");

  // Carregar Navegação
  await loadHTMLWithCSS('nav-container', './frontend/html/components/nav.html', './frontend/css/components/nav.css');

  // Carregar Rodapé
  await loadHTMLWithCSS('footer-container', './frontend/html/components/footer.html', './frontend/css/components/footer.css');
};
