import { loadHTML, loadCSS, loadScriptForPage } from './utils.js';

console.log('[Router] O script Router.js foi carregado corretamente.');

// Carregar o HTML do menu
loadHTML('nav-container', './frontend/html/globals/nav.html');

// Carregar o CSS do menu
loadCSS('./frontend/css/globals/nav.css');

// Carregar o JS do menu
loadScriptForPage({
  scriptPath: './frontend/js/globals/navHandler.js',
  setupFunctionName: 'generateMenu', // Nome da função que será chamada após carregar o script
});
