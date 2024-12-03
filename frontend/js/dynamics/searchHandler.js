// menuGenerator.js
import { pagesConfig } from '../pagesConfig.js'; // Importa a configuração das páginas

export const generateMenu = () => {
  const menuList = document.querySelector('#menu-list'); // Seleciona o container do menu
  if (!menuList) {
    console.error('Elemento com ID "menu-list" não encontrado no DOM.');
    return;
  }

  // Limpa o menu antes de gerar os itens
  menuList.innerHTML = '';

  // Percorre o pagesConfig e cria os itens do menu
  pagesConfig.forEach((page) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `<a href="#${page.page}-section" data-page="${page.page}">${capitalize(page.page)}</a>`;
    menuList.appendChild(listItem);
  });
};

// Função auxiliar para capitalizar as primeiras letras dos textos
const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1);
