// Função para carregar seções dinamicamente
const loadSection = async (sectionId, filePath, cssPath = null) => {
  try {
    console.log(`[Landpage Router] Carregando seção: ${sectionId}`);
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`Erro ao carregar a seção ${sectionId}. Status: ${response.status}`);
    }
    const content = await response.text();
    document.querySelector(`#${sectionId}`).innerHTML = content;
    console.log(`[Landpage Router] Seção '${sectionId}' carregada com sucesso.`);

    // Carrega o CSS da seção, se houver
    if (cssPath) {
      loadCSS(cssPath);
    }
  } catch (error) {
    console.error(`[Landpage Router] Erro ao carregar a seção ${sectionId}:`, error.message);
  }
};

// Função para carregar CSS dinamicamente
const loadCSS = (filePath) => {
  // Verifica se o CSS já foi carregado
  if (!document.querySelector(`link[href="${filePath}"]`)) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = filePath;
    document.head.appendChild(link);
    console.log(`[CSS Loader] Arquivo CSS '${filePath}' carregado.`);
  } else {
    console.log(`[CSS Loader] Arquivo CSS '${filePath}' já carregado.`);
  }
};

// Configuração inicial da landpage
document.addEventListener('DOMContentLoaded', async () => {
  console.log("[Landpage Router] Inicializando landpage...");

  // Carrega Nav e Footer
  await loadHTML('nav-container', './frontend/html/components/nav.html');
  console.log("[Landpage Router] Nav carregado com sucesso.");
  await loadHTML('footer-container', './frontend/html/components/footer.html');
  console.log("[Landpage Router] Footer carregado com sucesso.");

  // Carrega Seções
  await loadSection('home-section', './frontend/html/pages/home.html', './frontend/css/pages/home.css');
  await loadSection('about-section', './frontend/html/pages/about.html', './frontend/css/pages/about.css');
  await loadSection('contact-section', './frontend/html/pages/contact.html', './frontend/css/pages/contact.css');
  await loadSection('form-section', './frontend/html/pages/form.html', './frontend/css/pages/form.css');

  console.log("[Landpage Router] Todas as seções carregadas.");

  // Inicializa Menu Scroll
  initializeMenuScroll();

  console.log("[Landpage Router] Landpage configurada com sucesso!");
});
