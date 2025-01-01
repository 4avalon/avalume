// frontend/js/core/api.js

const API_BASE_URL = 'http://localhost:3000'; // Ajuste conforme necessário

async function apiRequest(endpoint, method = 'GET', data = null) {
    const headers = { 'Content-Type': 'application/json' };
    const token = localStorage.getItem('authToken');
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const options = {
        method,
        headers,
    };

    if (data) {
        options.body = JSON.stringify(data);
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
    if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.statusText}`);
    }
    return response.json();
}

export { apiRequest };
