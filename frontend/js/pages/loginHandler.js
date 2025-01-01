// frontend/js/dynamics/loginHandler.js
import { apiRequest } from '../core/api.js';

function setupLoginEvents() {
    const loginForm = document.querySelector('#loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(loginForm);
            const username = formData.get('username');
            const password = formData.get('password');

            // Validação simples
            if (!username || !password) {
                alert('Por favor, preencha todos os campos.');
                return;
            }

            try {
                const response = await apiRequest('/auth/login', 'POST', { username, password });

                // Armazenar token e redirecionar
                localStorage.setItem('authToken', response.token);
                alert(`Bem-vindo, ${response.username}!`);
                window.location.hash = '#profile'; // Navegação sem recarregar
            } catch (err) {
                console.error(err.message);
                if (err.response && err.response.status === 401) {
                    alert('Credenciais inválidas.');
                } else {
                    alert('Erro inesperado. Tente novamente.');
                }
            }
        });
    }
}

// Exporta a função principal
export default setupLoginEvents;
