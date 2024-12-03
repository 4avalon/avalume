const initializeMenuScroll = () => {
  console.log("[MenuScroll] Inicializando evento de clique...");
  const menuLinks = document.querySelectorAll('nav ul li a[data-page]');

  if (menuLinks.length === 0) {
    console.error("[MenuScroll] Nenhum link encontrado no menu.");
    return;
  }

  menuLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();

      const section = document.querySelector(link.getAttribute('href'));
      if (!section) {
        console.error(`[MenuScroll] Seção não encontrada para o link: ${link.getAttribute('href')}`);
        return;
      }

      console.log(`[MenuScroll] Rolando suavemente para a seção: ${section.id}`);
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  });

  console.log("[MenuScroll] Eventos de clique configurados com sucesso.");
};
