import { getGlobalComponents, getPagesConfig } from './config.js';
import { loadHTML, loadCSS, loadHandler } from './loader.js';
import { setupNav } from '../globals/navHandler.js';
import { setupFooter } from '../globals/footerHandler.js';
import { navigateToPage } from './router.js';

// Inicialização
function initialize() {
   console.log('[Main] Inicializando aplicação...');
  loadCSS('./frontend/css/reset.css');
  loadCSS('./frontend/css/theme.css');
  loadCSS('./frontend/css/styles.css');


  setupNav();
  setupFooter();
  navigateToPage();
}

// Eventos
document.addEventListener('DOMContentLoaded', initialize);
window.addEventListener('hashchange', navigateToPage);
