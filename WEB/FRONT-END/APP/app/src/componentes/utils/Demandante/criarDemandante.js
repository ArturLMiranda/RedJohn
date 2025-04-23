import axios from 'axios';

const criarDemandante = async (nome) => {
    try {
        const response = await axios.post('/api/demandantes', { nome });
        console.log('Demandante criado com sucesso:', response.data);
    } catch (error) {
        console.error('Erro ao criar demandante:', error);
    }
};

export default criarDemandante;
