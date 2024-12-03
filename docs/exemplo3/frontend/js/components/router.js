const loadHTML = async (containerId, filePath) => {
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`Erro ao carregar o arquivo HTML: ${filePath}`);
    }
    const content = await response.text();
    const container = document.getElementById(containerId);
    if (container) {
      // Limpa o conteúdo anterior do container antes de inserir o novo conteúdo
      container.innerHTML = '';
      container.innerHTML = content;
      console.log(`[Utils] HTML carregado de ${filePath} para #${containerId}`);
    } else {
      console.warn(`[Utils] Container com ID #${containerId} não encontrado.`);
    }
  } catch (error) {
    console.error(`[Utils] Erro ao carregar HTML: ${error.message}`);
  }
};

// Função para carregar CSS dinamicamente
const loadCSS = (filePath) => {
  const existingLink = document.querySelector(`link[href="${filePath}"]`);
  if (!existingLink) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = filePath;
    document.head.appendChild(link);
    console.log(`[CSS Loader] Arquivo CSS '${filePath}' carregado.`);
  } else {
    console.log(`[CSS Loader] Arquivo CSS '${filePath}' já está carregado.`);
  }
};
// Função para carregar páginas dinamicamente
const loadPage = async (page, cssPath = null) => {
  console.log(`[Router] Tentando carregar a página: ${page}`);
  try {
    // Carrega o conteúdo HTML da página
    const response = await fetch(`./frontend/html/pages/${page}.html`);
    if (!response.ok) {
      throw new Error(`Erro ao carregar a página ${page}. Status: ${response.status}`);
    }
    const content = await response.text();

    // Insere o conteúdo dentro de uma section com o ID da página
    const dynamicContent = document.querySelector('#dynamic-content');
    dynamicContent.innerHTML = `<section id="${page}-section">${content}</section>`;
    console.log(`[Router] Página '${page}' carregada com sucesso.`);

    // Verifica se o CSS específico deve ser carregado
    if (cssPath) {
      loadCSS(cssPath);
    }

    // Verifica se é a página de formulário e carrega o script
    if (page === 'form') {
      console.log("[Router] Página 'form' detectada. Configurando formulário...");

      // Verifica se o script já foi carregado
      const existingScript = document.querySelector('script[src="./frontend/js/pages/formHandler.js"]');
      if (!existingScript) {
        console.log("[Router] Script de formulário ainda não carregado. Carregando agora...");
        const script = document.createElement('script');
        script.src = './frontend/js/pages/formHandler.js';
        script.onload = () => {
          console.log("[Router] Script de formulário carregado com sucesso.");
          if (typeof setupFormEvents === 'function') {
            console.log("[Router] Chamando setupFormEvents...");
            setupFormEvents();
          } else {
            console.error("[Router] setupFormEvents não está definido!");
          }
        };
        script.onerror = () => console.error("[Router] Erro ao carregar o script do formulário.");
        document.body.appendChild(script);
      } else {
        console.log("[Router] Script de formulário já carregado.");
        if (typeof setupFormEvents === 'function') {
          setupFormEvents(); // Apenas reconfigura os eventos do formulário
        }
      }
    }

    // Confirmação final de estilos
    console.log(`[Router] Estilos para '${page}' aplicados.`);
  } catch (error) {
    console.error(`[Router] Erro ao carregar a página '${page}':`, error.message);
  }
};

// Função para configurar os eventos no menu
const setupMenuEvents = () => {
  console.log("[Router] Configurando eventos no menu...");
  const menuLinks = document.querySelectorAll('nav a[data-page]');
  menuLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault(); // Evita o comportamento padrão do link
      const page = link.getAttribute('data-page');
      const cssPath = `./frontend/css/pages/${page}.css`; // Define o caminho do CSS para a página
      console.log(`[Router] Link clicado: ${page}`);
      loadPage(page, cssPath); // Carrega a página e o CSS correspondente
    });
  });
};

// Configuração inicial do roteador
document.addEventListener('DOMContentLoaded', async () => {
  console.log("[Router] DOM completamente carregado.");

  // Carrega a navegação e o rodapé
  await loadHTML('nav-container', './frontend/html/components/nav.html');
  await loadHTML('footer-container', './frontend/html/components/footer.html');
  console.log("[Router] Navegação e rodapé carregados com sucesso.");

  // Configura os eventos do menu
  setupMenuEvents();

  // Carrega a página inicial e o CSS correspondente
  loadPage('home', './frontend/css/pages/home.css');
});
