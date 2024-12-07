// frontend/js/globals/footerHandler.js

import { getGlobalComponents } from '../core/config.js';
import { loadHTML, loadCSS } from '../core/loader.js';

/**
 * Inicializa o rodapé, carregando o HTML e o CSS correspondentes.
 */
function setupFooter() {
  //console.log('[FooterHandler] Iniciando rodapé...');
  const { htmlPath, cssPath } = getGlobalComponents().footer;

  loadHTML('footer-container', htmlPath).then(() => {
    loadCSS(cssPath);
    //console.log('[FooterHandler] Rodapé carregado com sucesso.');
  });
}

// Exporta a função para ser utilizada no arquivo principal
export { setupFooter };
