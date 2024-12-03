// pagesConfig.js
export const pagesConfig = [
  {
    page: 'home',
    htmlPath: './frontend/html/pages/home.html',
    cssPath: './frontend/css/pages/home.css',
  },
  {
    page: 'about',
    htmlPath: './frontend/html/pages/about.html',
    cssPath: './frontend/css/pages/about.css',
  },
  {
    page: 'contact',
    htmlPath: './frontend/html/pages/contact.html',
    cssPath: './frontend/css/pages/contact.css',
  },
  {
    page: 'form',
    htmlPath: './frontend/html/pages/form.html',
    cssPath: './frontend/css/pages/form.css',
    scriptPath: './frontend/js/pages/formHandler.js',
    setupFunctionName: 'setupFormEvents',
  },
  {
    page: 'carousel',
    htmlPath: './frontend/html/pages/carousel.html',
    cssPath: './frontend/css/pages/carousel.css',
    scriptPath: './frontend/js/pages/carouselHandler.js',
    setupFunctionName: 'setupCarouselEvents',
  },
];
