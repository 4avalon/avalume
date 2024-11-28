function setupMenuScroll() {
  const scrollDuration = 2500; // Tempo de rolagem suave em milissegundos

  const menu = document.querySelector('nav');
  if (!menu) {
    console.error('[MenuScroll] O menu não foi encontrado no DOM.');
    return;
  }

  console.log('[MenuScroll] Menu encontrado:', menu);

  const menuLinks = menu.querySelectorAll('a'); // Seleciona os links do menu
  if (!menuLinks.length) {
    console.error('[MenuScroll] Nenhum link foi encontrado no menu.');
    return;
  }

  console.log('[MenuScroll] Links do menu encontrados:', menuLinks);

  menuLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault(); // Previne o comportamento padrão do link
      const targetId = link.getAttribute('href').replace('#', ''); // Obtém o ID da seção
      const targetElement = document.getElementById(targetId); // Encontra o elemento alvo

      if (targetElement) {
        const targetPosition = targetElement.offsetTop; // Posição do topo da seção
        smoothScrollTo(targetPosition, scrollDuration); // Rola suavemente até a seção
      } else {
        console.error(`[MenuScroll] Seção com ID '${targetId}' não encontrada.`);
      }
    });
  });
}

// Função auxiliar simples para rolar suavemente
function smoothScrollTo(targetPosition, duration) {
  const startPosition = window.pageYOffset; // Posição inicial
  const distance = targetPosition - startPosition; // Distância a percorrer
  const startTime = performance.now();

  function animation(currentTime) {
    const elapsed = currentTime - startTime; // Tempo decorrido
    const progress = Math.min(elapsed / duration, 1); // Progresso (entre 0 e 1)
    const ease = progress * (2 - progress); // Função de easing simples (facilita a transição)

    window.scrollTo(0, startPosition + distance * ease); // Atualiza a posição do scroll

    if (elapsed < duration) {
      requestAnimationFrame(animation); // Continua a animação
    }
  }

  requestAnimationFrame(animation);
}

export { setupMenuScroll };
