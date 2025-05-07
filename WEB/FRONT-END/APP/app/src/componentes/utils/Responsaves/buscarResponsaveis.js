import axios from 'axios';

const buscarResponsaveis = async () => {
    try {
        const response = await axios.get('http://localhost:8000/api/responsaveis/');
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar responsáveis:', error);
        return [];
    }
};

export default buscarResponsaveis;
