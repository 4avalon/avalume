//config.js
console.log(`[Config] carregado.`);
const config = {
    globals: {
        nav: { name: "nav", hasJs: true },        // Navbar, tem JS
        footer: { name: "footer", hasJs: false }, // Footer, sem JS
    },
    pages: {


        profile: { name: "profile", hasJs: false },
        home: { name: "home", hasJs: false },
        contact: { name: "contact", hasJs: false },
        about: { name: "about", hasJs: false },
        theme: { name: "theme", hasJs: false },
        avamap: { name: "avamap", hasJs: true },
        login: { name: "login", hasJs: false },
    },
    dynamics: {
        carousel: { name: "carousel", hasJs: true }, // Componente "carousel", tem JS
        form: { name: "form", hasJs: true }, // Componente "carousel", tem JS
        search: { name: "search", hasJs: true }, // Componente "carousel", tem JS
        login: { name: "login", hasJs: true },                
        // Outros dinamics podem ser adicionados aqui
    },
};

// Exportar configuração para outros módulos (se necessário)
export { config };