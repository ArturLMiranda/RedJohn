import axios from 'axios';
import { API_URL } from "../config";
const criarResponsavel = async (nome) => {
    try {
        const response = await axios.post(`${API_URL}/api/responsaveis/criar/`, { nome });
        return response.data;
    } catch (error) {
        console.error('Erro ao criar responsável:', error);
        throw error;
    }
};

export default criarResponsavel;
