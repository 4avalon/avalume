import { getGlobalComponents, getPagesConfig } from '../core/config.js';
import { loadHTML, loadCSS } from '../core/loader.js';
    // Inicialização do Menu
    function setupNav() {
      //console.log('[NavHandler] Iniciando menu...');
      const { htmlPath, cssPath } = getGlobalComponents().nav;

      loadHTML('nav-container', htmlPath).then(() => {
        loadCSS(cssPath);
        setupMenuItems();
      });
    }

    function setupMenuItems() {
      //console.log('[NavHandler] Gerando itens do menu...');
      const menuList = document.querySelector('#menu-list');
      if (!menuList) {
        //console.error('[NavHandler] Elemento "#menu-list" não encontrado no DOM.');
        return;
      }

      const pages = getPagesConfig();
      menuList.innerHTML = '';
      pages.forEach((page) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<a href="#${page.name}">${page.name.charAt(0).toUpperCase() + page.name.slice(1)}</a>`;
        menuList.appendChild(listItem);
      });
      //console.log('[NavHandler] Itens do menu gerados com sucesso.');
    }

    export { setupNav, setupMenuItems };