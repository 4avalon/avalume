import { getPagesConfig } from "../core/config.js";

function setupSearchEvents() {
  console.log("[SearchHandler] Configurando eventos de busca...");

  // Seleciona os elementos do DOM
  const searchInput = document.querySelector("#search-input");
  const searchButton = document.querySelector("#search-button");
  const resultsContainer = document.querySelector("#search-results-container");
  const resultsList = document.querySelector("#search-results");
  const closeDropdownButton = document.querySelector("#close-search-dropdown");

  // Verifica se todos os elementos necessários existem
  if (!searchInput || !searchButton || !resultsContainer || !resultsList || !closeDropdownButton) {
    console.error("[SearchHandler] Elementos de busca não encontrados no DOM.");
    return;
  }

  // Fecha o dropdown de resultados
  closeDropdownButton.addEventListener("click", () => {
    resultsContainer.style.display = "none";
  });

  // Função para realizar a busca
  function performSearch() {
    const query = searchInput.value.trim().toLowerCase();
    if (!query) return;

    console.log(`[SearchHandler] Buscando por: "${query}"`);
    resultsList.innerHTML = ""; // Limpa os resultados anteriores

    const pages = getPagesConfig();

    let foundResults = false;

    // Mapeia todas as páginas para verificar o conteúdo
    const fetchPromises = pages.map((page) => {
      return fetch(page.htmlPath)
        .then((response) => response.text())
        .then((html) => {
          if (html.toLowerCase().includes(query)) {
            const snippet = extractAndHighlightSnippet(html, query, 100);
            const resultItem = document.createElement("div");
            resultItem.className = "search-item";
            resultItem.innerHTML = `
              <h3>${page.name.charAt(0).toUpperCase() + page.name.slice(1)}</h3>
              <p>${snippet}</p>
            `;
            resultItem.addEventListener("click", () => {
              window.location.hash = page.name; // Navega para a página
              resultsContainer.style.display = "none"; // Fecha o dropdown
            });
            resultsList.appendChild(resultItem);
            foundResults = true;
          }
        });
    });

    // Processa os resultados
    Promise.all(fetchPromises).then(() => {
      if (!foundResults) {
        const noResultItem = document.createElement("div");
        noResultItem.className = "search-item";
        noResultItem.innerHTML = `<p>Nenhum resultado encontrado.</p>`;
        resultsList.appendChild(noResultItem);
      }
      resultsContainer.style.display = "block"; // Mostra o dropdown
    });
  }

  // Função para extrair e destacar os trechos encontrados
  function extractAndHighlightSnippet(content, keyword, length) {
    const index = content.toLowerCase().indexOf(keyword);
    if (index === -1) return "";
    const start = Math.max(0, index - length / 2);
    const end = Math.min(content.length, index + length / 2);
    const snippet = content
      .substring(start, end)
      .replace(/<\/?[^>]+(>|$)/g, "") // Remove tags HTML
      .replace(new RegExp(keyword, "gi"), (match) => `<mark>${match}</mark>`); // Destaca o termo pesquisado
    return snippet;
  }

  // Configura eventos para o botão e o input
  searchButton.addEventListener("click", performSearch);
  searchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      performSearch();
    }
  });
}

// Expõe a função globalmente
window.setupSearchEvents = setupSearchEvents;

export { setupSearchEvents };
