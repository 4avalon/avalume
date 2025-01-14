// saveAsText.js
const fs = require('fs');
const path = require('path');

const projectDir = 'C:/Users/roger/OneDrive/Documentos/Servidor_Local_Phy/Avalon/Projetos/AvaMap';
const backendDir = path.join(projectDir, 'backend');
const frontendDir = path.join(projectDir, 'frontend');
const backendOutputFile = path.join(projectDir, 'backend.txt');
const frontendOutputFile = path.join(projectDir, 'frontend.txt');

// Extensões permitidas
const allowedExtensions = ['.html', '.css', '.js'];

function listFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const ext = path.extname(file); // Obtém a extensão do arquivo
        if (fs.statSync(filePath).isDirectory()) {
            listFiles(filePath, fileList); // Recursão para subpastas
        } else if (allowedExtensions.includes(ext)) {
            fileList.push(filePath); // Adiciona arquivos permitidos à lista
        }
    });
    return fileList;
}

// Função para gerar conteúdo do arquivo de saída
function generateOutput(fileList, outputFile, projectDir) {
    const output = fileList.map(filePath => {
        const relativePath = path.relative(projectDir, filePath);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        return `// ${relativePath}\n\n${fileContent}\n`;
    }).join('\n\n');
    fs.writeFileSync(outputFile, output);
    console.log(`Estrutura salva em ${outputFile}`);
}

// Gera os arquivos para backend e frontend
const backendFiles = listFiles(backendDir);
const frontendFiles = listFiles(frontendDir);

generateOutput(backendFiles, backendOutputFile, projectDir);
generateOutput(frontendFiles, frontendOutputFile, projectDir);
