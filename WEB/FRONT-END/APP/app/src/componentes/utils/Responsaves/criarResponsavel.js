import axios from 'axios';

const criarResponsavel = async (nome) => {
    try {
        const response = await axios.post('/api/responsaveis/', { nome });
        return response.data;
    } catch (error) {
        console.error('Erro ao criar responsável:', error);
        throw error;
    }
};

export default criarResponsavel;
