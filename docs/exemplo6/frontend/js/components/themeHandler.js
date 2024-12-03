// themeHandler.js

// Chave usada para armazenar o tema no localStorage
const THEME_KEY = 'avalume-theme';

// Aplica o tema no <html> com base no tema escolhido
const applyTheme = (theme) => {
  document.documentElement.setAttribute('data-theme', theme); // Define o tema como atributo no <html>
  localStorage.setItem(THEME_KEY, theme); // Salva o tema no localStorage
  console.log(`[ThemeHandler] Tema aplicado: ${theme}`);
};

// Alterna entre temas claro e escuro
const toggleTheme = () => {
  const currentTheme = localStorage.getItem(THEME_KEY) || 'light'; // Obtém o tema atual
  const newTheme = currentTheme === 'light' ? 'dark' : 'light'; // Alterna o tema
  applyTheme(newTheme); // Aplica o novo tema

  // Atualiza o texto do botão, se existir
  const themeToggleButton = document.getElementById('theme-toggle-button');
  if (themeToggleButton) {
    themeToggleButton.innerText = newTheme === 'light' ? 'Alternar para Escuro' : 'Alternar para Claro';
  }
};

// Inicializa o tema com base no localStorage ou usa o padrão
const initializeTheme = () => {
  const savedTheme = localStorage.getItem(THEME_KEY) || 'light'; // Padrão é claro
  applyTheme(savedTheme); // Aplica o tema salvo

  // Configura o texto do botão de alternância, se existir
  const themeToggleButton = document.getElementById('theme-toggle-button');
  if (themeToggleButton) {
    themeToggleButton.innerText = savedTheme === 'light' ? 'Alternar para Escuro' : 'Alternar para Claro';
  }
};

// Exporta as funções para uso em outros arquivos
export { initializeTheme, toggleTheme };

// Inicializa o tema automaticamente ao carregar a página
document.addEventListener('DOMContentLoaded', initializeTheme);
