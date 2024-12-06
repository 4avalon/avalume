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
      
      // Verifica se o script já foi carregado
      const existingScript = document.querySelector(`script[src="${path}"]`);
      if (existingScript) {
        console.log(`[HandlerLoader] Handler já carregado: ${path}`);
        return;
      }

      const script = document.createElement('script');
      script.type = 'module';
      script.src = path;

      script.onload = () => {
        console.log(`[HandlerLoader] Handler carregado com sucesso: ${path}`);
        
        // Gera o nome da função baseado no nome do arquivo
        const rawFileName = path.split('/').pop(); // Obtém o nome do arquivo
        console.log(`[HandlerLoader] Nome bruto do arquivo: ${rawFileName}`);
        
        const functionName = `setup${rawFileName
          .replace('.js', '') // Remove a extensão .js
          .replace(/^\w/, (c) => c.toUpperCase()) // Coloca a primeira letra em maiúscula
          .replace(/Handler$/, 'Events')}`; // Substitui "Handler" por "Events"

        console.log(`[HandlerLoader] Função esperada: ${functionName}`);

        // Verifica se a função existe globalmente
        if (typeof window[functionName] === 'function') {
          console.log(`[HandlerLoader] Inicializando a função: ${functionName}`);
          window[functionName](); // Chama a função
        } else {
          console.warn(`[HandlerLoader] Função ${functionName} não encontrada no handler.`);
          console.warn(`[HandlerLoader] Certifique-se de que a função está exposta globalmente como window.${functionName}`);
        }
      };

      script.onerror = () => console.error(`[HandlerLoader] Erro ao carregar handler: ${path}`);
      document.body.appendChild(script);

      console.log(`[HandlerLoader] Script adicionado ao DOM para carregar: ${path}`);
    }

export { loadHTML, loadCSS, loadHandler };