// Função para carregar o conteúdo HTML de um arquivo dentro de um container específico
export const loadHTML = async (containerId, filePath) => {
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`[loadHTML] Erro ao carregar o arquivo: ${filePath}`);
    }
    const content = await response.text();
    const container = document.getElementById(containerId);
    if (!container) {
      throw new Error(`[loadHTML] Container com ID '${containerId}' não encontrado.`);
    }
    container.innerHTML = content;
    //console.log(`[loadHTML] HTML carregado no container '${containerId}'.`);
  } catch (error) {
    //console.error(error.message);
  }
};

// Função para carregar arquivos CSS dinamicamente
export const loadCSS = (filePath) => {
  //console.log(`[loadCSS] Tentando carregar CSS: ${filePath}`);
  const existingLink = document.querySelector(`link[href="${filePath}"]`);
  if (!existingLink) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = filePath;
    document.head.appendChild(link);
    //console.log(`[loadCSS] Arquivo CSS '${filePath}' carregado.`);
  } else {
    //console.log(`[loadCSS] Arquivo CSS '${filePath}' já está carregado.`);
  }
};

// Função para carregar e configurar o script necessário para uma página específica
export const loadScriptForPage = (pageConfig) => {
  if (!pageConfig || !pageConfig.scriptPath) {
    //console.warn(`[loadScriptForPage] Nenhum script configurado para a página.`);
    return;
  }

  const { scriptPath, setupFunctionName } = pageConfig;
  //console.log(`[loadScriptForPage] Tentando carregar script: ${scriptPath}`);

  // Verifica se o script já está carregado
  const existingScript = document.querySelector(`script[src="${scriptPath}"]`);
  if (!existingScript) {
    const script = document.createElement('script');
    script.src = scriptPath;

    script.onload = () => {
      //console.log(`[loadScriptForPage] Script '${scriptPath}' carregado com sucesso.`);
      if (setupFunctionName && typeof window[setupFunctionName] === 'function') {
        //console.log(`[loadScriptForPage] Chamando função de setup: '${setupFunctionName}'...`);
        window[setupFunctionName]();
      }
    };

    script.onerror = () => console.error(`[loadScriptForPage] Erro ao carregar o script '${scriptPath}'.`);
    document.body.appendChild(script);
  } else {
    //console.log(`[loadScriptForPage] Script '${scriptPath}' já carregado.`);
    if (setupFunctionName && typeof window[setupFunctionName] === 'function') {
      //console.log(`[loadScriptForPage] Reconfigurando com função de setup: '${setupFunctionName}'...`);
      window[setupFunctionName]();
    }
  }
};
