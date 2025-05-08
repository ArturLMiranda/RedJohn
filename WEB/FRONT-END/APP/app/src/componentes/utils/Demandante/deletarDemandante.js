import axios from 'axios';
import { API_URL } from "../config";
const deletarDemandante = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/api/demandantes/${id}/deletar/`);
        console.log('Demandante deletado com sucesso:', response.data);
    } catch (error) {
        console.error('Erro ao deletar demandante:', error);
    }
};

export default deletarDemandante;
