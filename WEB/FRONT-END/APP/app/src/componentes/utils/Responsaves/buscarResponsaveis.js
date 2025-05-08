import axios from 'axios';
import { API_URL } from "../config";
const buscarResponsaveis = async () => {
    try {
        const response = await axios.get(`${API_URL}/api/responsaveis/`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar responsáveis:', error);
        return [];
    }
};

export default buscarResponsaveis;
