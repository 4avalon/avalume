const path = require('path');
const fs = require('fs');

const basePath = path.join(__dirname, '..', '..', '..'); // Caminho raiz do projeto
const baseURL = '/AvaMap'; // URL base para o ambiente web

function listDirectoryContents(dirPath, webPath) {
    if (!fs.existsSync(dirPath)) {
        console.error(`[ERRO] Diretório não encontrado: ${dirPath}`);
        return [];
    }

    const result = [];
    const items = fs.readdirSync(dirPath, { withFileTypes: true });

    items.forEach((item) => {
        const fullPath = path.join(dirPath, item.name);
        const webFullPath = path.join(webPath, item.name).replace(/\\/g, '/');

        if (item.isDirectory()) {
            result.push({
                name: item.name,
                type: 'directory',
                path: webFullPath,
                children: listDirectoryContents(fullPath, webFullPath),
            });
        } else {
            result.push({
                name: item.name,
                type: 'file',
                path: webFullPath,
            });
        }
    });

    return result;
}

function generateAvamapJSON(outputPath) {
    const projectStructure = {
        name: 'Avamap',
        type: 'project',
        children: [
            {
                name: 'Frontend',
                type: 'directory',
                path: `${baseURL}/frontend`,
                children: listDirectoryContents(path.join(basePath, 'frontend'), `${baseURL}/frontend`),
            },
            {
                name: 'Backend',
                type: 'directory',
                path: `${baseURL}/backend`,
                children: listDirectoryContents(path.join(basePath, 'backend'), `${baseURL}/backend`),
            },
        ],
    };

    fs.writeFileSync(outputPath, JSON.stringify(projectStructure, null, 2), 'utf-8');
    console.log(`Arquivo JSON gerado em: ${outputPath}`);
}

generateAvamapJSON(path.join(basePath, 'avamap.json'));
