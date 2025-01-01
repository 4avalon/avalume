// config.js

   function getConfig() {
      return {
        theme: {
          active: true,
          default: 'light',
          location: 'options',
        },
        language: 'en',
      };
    }

    // Configuração de Componentes Globais
    function getGlobalComponents() {
      return {
        nav: {
          htmlPath: './frontend/html/globals/nav.html',
          cssPath: './frontend/css/globals/nav.css',
          jsPath: './frontend/js/globals/navHandler.js',
        },
        footer: {
          htmlPath: './frontend/html/globals/footer.html',
          cssPath: './frontend/css/globals/footer.css',
          jsPath: './frontend/js/globals/footerHandler.js',
        },
      };
    }

    // Configuração de Páginas
    function getPagesConfig() {
      return [
        { 
        name: 'home', 
        htmlPath: './frontend/html/pages/home.html', 
        cssPath: './frontend/css/pages/home.css' 
        },
        { 
        name: 'about', 
        htmlPath: './frontend/html/pages/about.html', 
        cssPath: './frontend/css/pages/about.css' 
        },
        { 
        name: 'contact', 
        htmlPath: './frontend/html/pages/contact.html', 
        cssPath: './frontend/css/pages/contact.css' 
        },
        { 
        name: 'login', 
        htmlPath: './frontend/html/pages/login.html', 
        cssPath: './frontend/css/pages/login.css',
        jsPath: './frontend/js/dynamics/loginHandler.js'
        },
      ];
    }
  // Configuração de Componentes Dinâmicos
function getDynamicComponentsConfig() {
  return {
    carousel: {
      htmlPath: './frontend/html/dynamics/carousel.html',
      cssPath: './frontend/css/dynamics/carousel.css',
      jsPath: './frontend/js/dynamics/carouselHandler.js',
      initFunction: 'setupCarouselEvents', // Nome da função de inicialização
    },
    form: {
      htmlPath: './frontend/html/dynamics/form.html',
      cssPath: './frontend/css/dynamics/form.css',
      jsPath: './frontend/js/dynamics/formHandler.js',
      initFunction: 'setupFormEvents', // Nome da função de inicialização
    },
    search: {
      htmlPath: './frontend/html/dynamics/search.html',
      cssPath: './frontend/css/dynamics/search.css',
      jsPath: './frontend/js/dynamics/searchHandler.js',
      initFunction: 'setupSearchEvents', // Nome da função de inicialização
    },
        profile: {
      htmlPath: './frontend/html/dynamics/profile.html',
      cssPath: './frontend/css/dynamics/profile.css',
      jsPath: './frontend/js/dynamics/profileHandler.js',
      initFunction: 'setuProfileEvents', // Nome da função de inicialização
    },
        register: {
      htmlPath: './frontend/html/dynamics/register.html',
      cssPath: './frontend/css/dynamics/register.css',
      jsPath: './frontend/js/dynamics/registerHandler.js',
      initFunction: 'setupRegisterEvents', // Nome da função de inicialização
    },
  };
}

export { getConfig, getGlobalComponents, getPagesConfig, getDynamicComponentsConfig };