function setupAvamapEvents() {
    console.log('[setupAvamapEvents] Iniciando configuração da página AvaMap...');

    const treeContainer = document.getElementById('tree-list');
    if (!treeContainer) {
        console.error('[setupAvamapEvents] Elemento #tree-list não encontrado no DOM.');
        return;
    }

    treeContainer.innerHTML = '';

    fetch('/avalume/avamap.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro HTTP! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('[setupAvamapEvents] JSON recebido:', data);
            const originalData = JSON.parse(JSON.stringify(data.children)); // Preserva os dados originais
            console.log('[setupAvamapEvents] Dados originais preservados:', originalData);
            renderTree(treeContainer, originalData);
            setupHighlightEvents(treeContainer);
            setupFilters(originalData); // Passa os dados originais para os filtros
        })
        .catch(error => console.error('[setupAvamapEvents] Erro ao carregar o JSON:', error));
}

function renderTree(container, data) {
    console.log('[renderTree] Renderizando árvore com os dados:', data);
    container.innerHTML = ''; // Limpa a árvore antes de renderizar
    data.forEach(item => {
        console.log(`[renderTree] Processando item: ${item.name}`);
        if (item.name.toLowerCase() === 'assets' || containsOnlyImages(item)) {
            console.log(`[renderTree] Ignorando pasta: ${item.name}`);
            return;
        }

        const li = document.createElement('li');
        li.textContent = item.name;
        li.classList.add(item.type === 'directory' ? 'directory-item' : 'file-item');

        if (item.type === 'file' && item.path) {
            li.dataset.path = item.path; // Salva o caminho do arquivo
            li.dataset.ext = item.name.split('.').pop().toLowerCase(); // Salva a extensão do arquivo
            console.log(`[renderTree] Adicionado arquivo: ${item.name}, Extensão: ${li.dataset.ext}`);
        }

        if (item.type === 'directory' && item.children) {
            const ul = document.createElement('ul');
            renderTree(ul, item.children);

            if (ul.children.length > 0) {
                li.appendChild(ul);
                console.log(`[renderTree] Diretório adicionado: ${item.name}`);
            }
        }

        container.appendChild(li);
    });
}

function containsOnlyImages(item) {
    if (item.type === 'directory' && item.children) {
        const isOnlyImages = item.children.every(child => {
            if (child.type === 'file') {
                const ext = child.name.split('.').pop().toLowerCase();
                return ['png', 'jpg', 'jpeg', 'gif', 'svg'].includes(ext);
            }
            return false;
        });
        console.log(`[containsOnlyImages] Pasta "${item.name}" contém apenas imagens: ${isOnlyImages}`);
        return isOnlyImages;
    }
    return false;
}

function setupHighlightEvents(container) {
    console.log('[setupHighlightEvents] Configurando eventos de destaque...');
    container.addEventListener('click', event => {
        const item = event.target;

        if (item.classList.contains('file-item')) {
            console.log(`[setupHighlightEvents] Clique no arquivo: ${item.textContent}`);
            toggleHighlight(item);
            updateContentBox();
        }

        if (item.classList.contains('directory-item')) {
            console.log(`[setupHighlightEvents] Clique no diretório: ${item.textContent}`);
            toggleHighlight(item);
            updateContentBox(); // Atualiza o conteúdo ao clicar em grupo
        }
    });
}

function toggleHighlight(item) {
    console.log(`[toggleHighlight] Alternando destaque para: ${item.textContent}`);
    item.classList.toggle('green');

    if (item.classList.contains('directory-item')) {
        const children = item.querySelectorAll('.file-item, .directory-item');
        children.forEach(child => {
            child.classList.toggle('green', item.classList.contains('green'));
            console.log(`[toggleHighlight] ${child.textContent} agora está ${child.classList.contains('green') ? 'destacado' : 'não destacado'}`);
        });
    }
}

function setupFilters(originalData) {
    console.log('[setupFilters] Configurando filtros...');
    const filters = {
        html: true,
        css: true,
        js: true
    };

    Object.keys(filters).forEach(filter => {
        const button = document.getElementById(`filter-${filter}`);
        if (button) {
            button.addEventListener('click', () => {
                console.log(`[setupFilters] Clique no filtro: ${filter}`);
                filters[filter] = !filters[filter];
                button.classList.toggle('active', filters[filter]);
                console.log(`[setupFilters] Filtro "${filter}" está agora ${filters[filter] ? 'ativo' : 'inativo'}`);
                applyFilters(filters, originalData);
            });
        }
    });
}

function applyFilters(filters, originalData) {
    console.log('[applyFilters] Aplicando filtros com os seguintes valores:', filters);
    const treeContainer = document.getElementById('tree-list');

    const filteredData = filterData(JSON.parse(JSON.stringify(originalData)), filters);
    console.log('[applyFilters] Dados filtrados:', filteredData);
    renderTree(treeContainer, filteredData);
    updateContentBox();
}

function filterData(data, filters) {
    console.log('[filterData] Filtrando dados com os filtros:', filters);
    return data
        .map(item => {
            if (item.type === 'file') {
                const ext = item.name.split('.').pop().toLowerCase();
                const isVisible = filters[ext];
                console.log(`[filterData] Arquivo "${item.name}" visível: ${isVisible}`);
                return isVisible ? item : null;
            }

            if (item.type === 'directory') {
                const filteredChildren = filterData(item.children, filters);
                if (filteredChildren.length > 0) {
                    console.log(`[filterData] Diretório "${item.name}" contém itens visíveis.`);
                    return { ...item, children: filteredChildren };
                }
            }

            console.log(`[filterData] Diretório "${item.name}" ou item ignorado.`);
            return null;
        })
        .filter(Boolean); // Remove valores nulos
}

function updateContentBox() {
    console.log('[updateContentBox] Atualizando conteúdo...');
    const greenItems = document.querySelectorAll('.file-item.green');
    const contentBox = document.getElementById('content-box');

    if (!contentBox) {
        console.error('[updateContentBox] Elemento #content-box não encontrado no DOM.');
        return;
    }

    const promises = Array.from(greenItems)
        .filter(item => item.dataset.path) // Garante que o caminho está definido
        .map(item => fetch(item.dataset.path)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erro ao carregar arquivo: ${item.dataset.path}`);
                }
                return response.text().then(content => ({
                    path: item.dataset.path,
                    ext: item.dataset.ext,
                    content
                }));
            })
            .catch(error => {
                console.error(`[fetchFileContent] Erro ao carregar o arquivo ${item.dataset.path}:`, error);
                return {
                    path: item.dataset.path,
                    ext: item.dataset.ext,
                    content: `/* Erro ao carregar ${item.dataset.path} */`
                };
            })
        );

    Promise.all(promises).then(results => {
        // Adiciona comentários personalizados baseados na extensão do arquivo
        const formattedResults = results.map(({ path, ext, content }) => {
            let comment;

            // Define o comentário baseado no tipo de arquivo
            switch (ext) {
                case 'html':
                    comment = `<!-- ${path} -->`;
                    break;
                case 'css':
                    comment = `/* ${path} */`;
                    break;
                case 'js':
                    comment = `//  ${path}`;
                    break;
                default:
                    comment = `/* Caminho relativo (tipo desconhecido): ${path} */`;
            }

            return `${comment}\n${content}`;
        });

        // Junta todos os conteúdos formatados e adiciona ao contentBox
        contentBox.textContent = formattedResults.join('\n\n');
    });
}



function fetchFileContent(item) {
    console.log('[fetchFileContent] Carregando conteúdo para:', item.dataset.path);
    if (!item.dataset.path) {
        console.error(`[fetchFileContent] Caminho inválido para o arquivo: ${item.textContent}`);
        return Promise.resolve(`/* Caminho inválido para ${item.textContent} */`);
    }

    return fetch(item.dataset.path)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro ao carregar arquivo: ${item.dataset.path}`);
            }
            return response.text();
        })
        .catch(error => {
            console.error(`[fetchFileContent] Erro ao carregar o arquivo ${item.dataset.path}:`, error);
            return `/* Erro ao carregar ${item.dataset.path} */`;
        });
}

export { setupAvamapEvents };
