// frontend/js/dynamics/profileHandler.js
import { apiRequest } from '../core/api.js';

function setupProfileEvents() {
    document.addEventListener('DOMContentLoaded', async () => {
        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                alert('Você não está logado. Redirecionando para a página de login.');
                window.location.hash = '#login';
                return;
            }

            const response = await apiRequest('/profile', 'GET', null, { Authorization: `Bearer ${token}` });
            const profileElement = document.querySelector('#profileInfo');

            if (profileElement) {
                profileElement.innerHTML = `
                    <h2>Bem-vindo, ${response.username}!</h2>
                    <p>ID do usuário: ${response.id}</p>
                    <p>${response.isAdmin ? 'Administrador' : 'Usuário comum'}</p>
                `;
            }
        } catch (err) {
            console.error(err.message);
            alert('Erro ao carregar perfil. Redirecionando para login.');
            localStorage.removeItem('authToken');
            window.location.hash = '#login';
        }
    });
}

// Exporta a função principal
export default setupProfileEvents;
