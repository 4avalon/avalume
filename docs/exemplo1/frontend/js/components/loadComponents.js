//avalume/frontend/js/components/loadComponents.js
// Função para carregar HTML em elementos específicos
const loadHTML = async (containerId, filePath) => {
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`Erro ao carregar o arquivo ${filePath}`);
    }
    const content = await response.text();
    document.getElementById(containerId).innerHTML = content;
  } catch (error) {
    console.error(error.message);
  }
};

// Carregar componentes dinâmicos
loadHTML('nav-container', './frontend/html/components/nav.html');
loadHTML('footer-container', './frontend/html/components/footer.html');
