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

  // Carregar estilos globais
  console.log("[LoadComponents] Carregando estilos globais...");
  await loadCSS('./frontend/css/theme.css'); // Estilos de tema
  await loadCSS('./frontend/css/styles.css'); // Estilos globais

  // Carregar Navegação
  console.log("[LoadComponents] Carregando navegação...");
  await loadHTMLWithCSS('nav-container', './frontend/html/components/nav.html', './frontend/css/components/nav.css');

  // Carregar Rodapé
  console.log("[LoadComponents] Carregando rodapé...");
  await loadHTMLWithCSS('footer-container', './frontend/html/components/footer.html', './frontend/css/components/footer.css');
};
