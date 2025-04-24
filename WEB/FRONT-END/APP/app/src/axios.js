// src/axios.js ou src/utils/axios.js

import axios from 'axios';

// Criando uma instância do Axios com a configuração básica
const back = axios.create({
  baseURL: 'http://localhost:8000/api/', // URL base do seu back-end Django
  headers: {
    'Content-Type': 'application/json',
    // Adicione outros cabeçalhos se necessário, como autenticação.
  },
  // Caso precise de uma configuração padrão para timeout, por exemplo:
  timeout: 5000, // tempo máximo de espera em ms
});