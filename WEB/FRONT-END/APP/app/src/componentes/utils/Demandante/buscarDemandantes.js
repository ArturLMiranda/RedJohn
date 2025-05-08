import axios from 'axios';
import { API_URL } from "../config";
const buscarDemandantes = async () => {
    try {
        const response = await axios.get(`${API_URL}/api/demandantes`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar demandantes:', error);
    }
};

export default buscarDemandantes;
