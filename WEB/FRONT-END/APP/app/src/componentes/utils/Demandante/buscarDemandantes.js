import axios from 'axios';

const buscarDemandantes = async () => {
    try {
        const response = await axios.get('/api/demandantes');
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar demandantes:', error);
    }
};

export default buscarDemandantes;
