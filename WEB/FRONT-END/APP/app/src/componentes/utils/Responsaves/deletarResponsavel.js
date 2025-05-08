import axios from 'axios';
import { API_URL } from "../config";
const deletarResponsavel = async (id) => {
    try {
        await axios.delete(`${API_URL}/api/responsaveis/${id}/deletar/`);
    } catch (error) {
        console.error('Erro ao deletar responsável:', error);
        throw error;
    }
};

export default deletarResponsavel;
