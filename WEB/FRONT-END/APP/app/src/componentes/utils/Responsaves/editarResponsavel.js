import axios from 'axios';
import { API_URL } from "../config";
const editarResponsavel = async (id, nome) => {
    try {
        await axios.put(`${API_URL}/api/responsaveis/${id}/editar/`, { nome });
    } catch (error) {
        console.error('Erro ao editar responsável:', error);
        throw error;
    }
};

export default editarResponsavel;
