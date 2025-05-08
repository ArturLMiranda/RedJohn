import axios from 'axios';
import { API_URL } from "../config";
const criarDemandante = async (nome) => {
    try {
        const response = await axios.post(`${API_URL}/api/demandantes/criar/`, { nome });
        console.log('Demandante criado com sucesso:', response.data);
    } catch (error) {
        console.error('Erro ao criar demandante:', error);
    }
};

export default criarDemandante;
