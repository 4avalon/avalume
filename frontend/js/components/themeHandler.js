export const themeHandler = (() => {
  const THEME_KEY = 'avalume-theme';

  // Aplica o tema no <html> com base no localStorage ou tema padrão
  const applyTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
  };

  // Alterna entre temas (claro e escuro)
  const toggleTheme = () => {
    const currentTheme = localStorage.getItem(THEME_KEY) || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
  };

  // Inicializa o tema com base no localStorage
  const initializeTheme = () => {
    const savedTheme = localStorage.getItem(THEME_KEY) || 'light';
    applyTheme(savedTheme);
  };

  // Expor funções públicas
  return {
    initializeTheme,
    toggleTheme,
  };
})();

// Inicializa o tema ao carregar a página
document.addEventListener('DOMContentLoaded', themeHandler.initializeTheme);
