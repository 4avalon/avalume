import { loadHTML, loadCSS, loadScriptForPage } from './utils.js';
import { pagesConfig } from './pagesConfig.js'; 
import { generateMenu } from './components/menuGenerator.js'; 
import { setupMenuScroll } from './components/menuScroll.js'; 


// Função principal para carregar todas as páginas no modo Landpage
const loadLandpage = async () => {
  const dynamicContent = document.querySelector('#dynamic-content');
  dynamicContent.innerHTML = ''; // Limpa o conteúdo antes de carregar as seções

  try {
    for (const pageConfig of pagesConfig) {
      // Carregar HTML da página
      const content = await fetch(pageConfig.htmlPath).then((res) => {
        if (!res.ok) throw new Error(`Erro ao carregar HTML da página '${pageConfig.page}'`);
        return res.text();
      });

      // Adicionar conteúdo encapsulado em uma section
      const section = document.createElement('section');
      section.id = `${pageConfig.page}-section`;
      section.innerHTML = content;
      dynamicContent.appendChild(section);

      // Carregar CSS específico da página
      if (pageConfig.cssPath) {
        loadCSS(pageConfig.cssPath);
      }

      // Carregar Script específico e executar função de setup
      if (pageConfig.scriptPath) {
        loadScriptForPage(pageConfig);

        if (pageConfig.setupFunctionName && typeof window[pageConfig.setupFunctionName] === 'function') {
          window[pageConfig.setupFunctionName]();
        }
      }
    }
  } catch (error) {
    console.error(`[RouterLandpage] Erro durante o carregamento no modo Landpage: ${error.message}`);
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
  
   // Configura o comportamento de scroll do menu
  setupMenuScroll();

  // Carregar todo o conteúdo no modo Landpage
  await loadLandpage();
});
