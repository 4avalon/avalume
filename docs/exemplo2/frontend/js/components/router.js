// Função para carregar páginas dinamicamente
const loadPage = async (page) => {
  try {
    const response = await fetch(`./frontend/html/pages/${page}.html`);
    if (!response.ok) {
      throw new Error(`Erro ao carregar a página ${page}`);
    }
    const content = await response.text();
    document.querySelector('main').innerHTML = content;
  } catch (error) {
    console.error(error.message);
  }
};

// Função para configurar os eventos no menu
const setupMenuEvents = () => {
  const menuLinks = document.querySelectorAll('nav a[data-page]');
  menuLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault(); // Evita o comportamento padrão do link
      const page = link.getAttribute('data-page');
      loadPage(page); // Carrega a página correspondente
    });
  });
};

// Configuração inicial do roteamento
document.addEventListener('DOMContentLoaded', async () => {
  // Carrega o nav.html dinamicamente
  await loadHTML('nav-container', './frontend/html/components/nav.html');

  // Configura os eventos no menu após o carregamento dinâmico do nav
  setupMenuEvents();

  // Carrega a página inicial por padrão
  loadPage('home');
});
