// frontend/js/dynamics/registerHandler.js
import { apiRequest } from '../core/api.js';

function setupRegisterEvents() {
    const registerForm = document.querySelector('#registerForm');

    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(registerForm);
            const username = formData.get('username');
            const password = formData.get('password');

            // Validação simples
            if (!username || !password) {
                alert('Por favor, preencha todos os campos.');
                return;
            }

            try {
                const response = await apiRequest('/auth/register', 'POST', { username, password });
                alert('Cadastro bem-sucedido! Redirecionando para o login.');
                window.location.hash = '#login';
            } catch (err) {
                console.error(err.message);
                alert('Erro ao registrar. Tente novamente.');
            }
        });
    }
}

// Exporta a função principal
export default setupRegisterEvents;
