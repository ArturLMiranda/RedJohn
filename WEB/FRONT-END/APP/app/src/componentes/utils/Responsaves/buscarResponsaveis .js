import axios from 'axios';

const buscarResponsaveis = async () => {
    try {
        const response = await axios.get('/api/responsaveis/');
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar responsáveis:', error);
        return [];
    }
};

export default buscarResponsaveis;
