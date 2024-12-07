  // Carregamento de HTML
    function loadHTML(containerId, path) {
      console.log(`[Loader] Tentando carregar HTML de: ${path} para o container: #${containerId}`);
      return fetch(path)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`[Loader] Erro ao carregar HTML (${response.status}): ${path}`);
          }
          return response.text();
        })
        .then((html) => {
          const container = document.querySelector(`#${containerId}`);
          if (!container) {
            throw new Error(`[Loader] Container com ID "${containerId}" não encontrado no DOM.`);
          }
          container.innerHTML = html;
          console.log(`[Loader] HTML carregado com sucesso em: #${containerId}`);
        })
        .catch((error) => console.error(error));
    }

    // Carregamento de CSS
    function loadCSS(path) {
      console.log(`[Loader] Tentando carregar CSS de: ${path}`);
      const existingLink = document.querySelector(`link[href="${path}"]`);
      if (existingLink) {
        console.log(`[Loader] CSS já carregado: ${path}`);
        return;
      }
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = path;
      document.head.appendChild(link);
      console.log(`[Loader] CSS carregado com sucesso: ${path}`);
    }

    // Carregamento de Handlers
   function loadHandler(path) {
  console.log(`[HandlerLoader] Tentando carregar handler de: ${path}`);

  return new Promise((resolve, reject) => {
    const existingScript = document.querySelector(`script[src="${path}"]`);
    if (existingScript) {
      console.log(`[HandlerLoader] Handler já carregado: ${path}`);
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.type = 'module';
    script.src = path;

    script.onload = () => {
      console.log(`[HandlerLoader] Handler carregado com sucesso: ${path}`);
      resolve();
    };

    script.onerror = () => {
      console.error(`[HandlerLoader] Erro ao carregar handler: ${path}`);
      reject(new Error(`Erro ao carregar handler: ${path}`));
    };

    document.body.appendChild(script);
  });
}


export { loadHTML, loadCSS, loadHandler };