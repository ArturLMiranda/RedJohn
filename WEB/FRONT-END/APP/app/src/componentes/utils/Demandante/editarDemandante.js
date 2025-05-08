import axios from 'axios';
import { API_URL } from "../config";
const editarDemandante = async (id, nome) => {
    try {
        const response = await axios.put(`${API_URL}/api/demandantes/${id}/editar/`, { nome });
        console.log('Demandante editado com sucesso:', response.data);
    } catch (error) {
        console.error('Erro ao editar demandante:', error);
    }
};

export default editarDemandante;
