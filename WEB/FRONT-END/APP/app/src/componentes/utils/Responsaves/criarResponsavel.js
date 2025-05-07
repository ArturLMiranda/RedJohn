import axios from 'axios';

const criarResponsavel = async (nome) => {
    try {
        const response = await axios.post('http://localhost:8000/api/responsaveis/criar/', { nome });
        return response.data;
    } catch (error) {
        console.error('Erro ao criar responsável:', error);
        throw error;
    }
};

export default criarResponsavel;
