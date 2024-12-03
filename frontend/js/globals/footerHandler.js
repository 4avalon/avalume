import { pagesConfig } from '../pagesConfig.js';


document.addEventListener('DOMContentLoaded', async () => {
  console.log('[Search] DOM totalmente carregado.');

  const searchInput = document.getElementById('search-input');
  const searchButton = document.getElementById('search-button');
  const searchDropdown = document.getElementById('search-dropdown');
  const searchResults = document.getElementById('search-results');
  const closeButton = document.getElementById('close-search-dropdown');

  console.log('[Search] Elementos capturados:', { searchInput, searchButton, searchDropdown, searchResults, closeButton });

  if (!searchInput || !searchButton || !searchDropdown || !searchResults || !closeButton) {
    console.error('[Search] Algum dos elementos do componente não foi encontrado.');
    return;
  }

  // Indexar dinamicamente os dados das páginas
  const indexPagesContent = async () => {
    const indexedData = [];

    for (const page of pagesConfig) {
      try {
        const response = await fetch(page.htmlPath);
        if (!response.ok) throw new Error(`Erro ao carregar: ${page.htmlPath}`);
        const htmlContent = await response.text();

        // Extrai texto visível do HTML
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlContent, 'text/html');
        const pageContent = doc.body.textContent || ''; // Apenas texto

        indexedData.push({
          title: page.page, // Nome da página
          content: pageContent.trim(), // Conteúdo extraído
          href: `#${page.page}-section`, // Link para navegar
          dataPage: page.page, // Valor de data-page
        });
      } catch (error) {
        console.error(`[Search] Erro ao indexar a página '${page.page}':`, error);
      }
    }

    return indexedData;
  };

  const indexedData = await indexPagesContent();
  console.log('[Search] Dados indexados:', indexedData);

  // Função para realizar a busca
  const performSearch = (query) => {
    console.log(`[Search] Realizando busca com a query: "${query}"`);
    if (!query) {
      searchResults.innerHTML = `<p>Digite algo para buscar ou clique no botão.</p>`;
      return;
    }

    const results = indexedData.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.content.toLowerCase().includes(query)
    );

    if (results.length > 0) {
      console.log('[Search] Resultados encontrados:', results);
      searchResults.innerHTML = results
        .map(
          (result) =>
            `<div class="search-item">
              <a href="${result.href}" data-page="${result.dataPage}">
                <h3>${result.title}</h3>
                <p>${result.content.substring(0, 100)}...</p> <!-- Mostra trecho -->
              </a>
            </div>`
        )
        .join('');
      searchDropdown.style.display = 'block'; // Mostra o dropdown
    } else {
      console.log('[Search] Nenhum resultado encontrado.');
      searchResults.innerHTML = `<p>Nenhum resultado encontrado. Por favor, tente outra palavra-chave.</p>`;
      searchDropdown.style.display = 'block'; // Mostra o dropdown mesmo sem resultados
    }
  };

  // Evento ao clicar no botão "Pesquisar"
  searchButton.addEventListener('click', () => {
    console.log('[Search] Botão de pesquisa clicado.');
    const query = searchInput.value.trim().toLowerCase();
    performSearch(query);
  });
  
  // **NOVO: Evento ao pressionar Enter no campo de busca**
  searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      console.log('[Search] Enter pressionado no campo de busca.');
      const query = searchInput.value.trim().toLowerCase();
      performSearch(query);
      event.preventDefault(); // Evita comportamento padrão do Enter (como submissão de formulário)
    }
  });


  // Evento para fechar o dropdown
  closeButton.addEventListener('click', () => {
    console.log('[Search] Botão de fechar dropdown clicado.');
    searchDropdown.style.display = 'none'; // Oculta o dropdown
    searchResults.innerHTML = `<p>Digite algo para buscar ou clique no botão.</p>`;
  });

  // Intercepta cliques nos links do dropdown**
  searchResults.addEventListener('click', (event) => {
    const target = event.target.closest('a[data-page]');
    if (target) {
      event.preventDefault(); // Evita o comportamento padrão do link
      const page = target.getAttribute('data-page');
      console.log(`[Search] Navegando para a página: ${page}`);
      const link = document.querySelector(`[data-page="${page}"]`);
      if (link) {
        link.click(); // Simula o clique no menu
      }
    }
  });
});

