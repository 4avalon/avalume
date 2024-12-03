import { loadHTML, loadCSS, loadScriptForPage } from './utils.js';
import { pagesConfig } from './pagesConfig.js';
import { generateMenu } from './components/menuGenerator.js'; // Importa a geração do menu


// Função principal para carregar uma página
const loadPage = async (page) => {
  const pageConfig = pagesConfig.find((config) => config.page === page);

  if (!pageConfig) {
    console.warn(`[Router] Configuração para a página '${page}' não encontrada.`);
    return;
  }

  try {
    // Carregar HTML da página
    const content = await fetch(pageConfig.htmlPath).then((res) => {
      if (!res.ok) throw new Error(`Erro ao carregar HTML da página '${page}'`);
      return res.text();
    });

    // Encapsular o conteúdo em uma section com ID único
    const dynamicContent = document.querySelector('#dynamic-content');
    dynamicContent.innerHTML = `<section id="${page}-section">${content}</section>`;

    // Verifica e carrega o CSS específico da página
    if (pageConfig.cssPath) {
      loadCSS(pageConfig.cssPath);
    }

    // Carregar script específico da página e executar função de setup, se necessário
    loadScriptForPage(pageConfig);
  } catch (error) {
    console.error(`[Router] Erro ao carregar a página '${page}': ${error.message}`);
  }
};

// Configuração inicial
document.addEventListener('DOMContentLoaded', async () => {
  // Carregar navegação e rodapé
  await loadHTML('nav-container', './frontend/html/components/nav.html');
  await loadHTML('footer-container', './frontend/html/components/footer.html');

  // Carregar estilos globais
  loadCSS('./frontend/css/components/nav.css');
  loadCSS('./frontend/css/components/footer.css');

  // Gera o menu dinamicamente com base no pagesConfig
  generateMenu();

  // Configurar eventos de navegação
  const menuLinks = document.querySelectorAll('nav a[data-page]');
  menuLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const page = link.getAttribute('data-page');
      loadPage(page);
    });
  });

  // Carregar a página inicial
  await loadPage('home');
});

