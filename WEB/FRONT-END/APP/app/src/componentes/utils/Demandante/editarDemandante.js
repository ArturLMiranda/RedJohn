/*import axios from 'axios';
import { API_URL } from "../config";
const editarDemandante = async (id, nome) => {
    try {
        const response = await axios.put(`${API_URL}/api/demandantes/${id}/editar/`, { nome });
        console.log('Demandante editado com sucesso:', response.data);
    } catch (error) {
        console.error('Erro ao editar demandante:', error);
    }
};

export default editarDemandante;*/
import axios from 'axios';
import { API_URL } from "../config";

export const EditarAtividade = async (id, titulo, descricao, demandante, responsaveis, validade, status) => {
    try {
        const payload = {
            titulo,
            descricao,
            demandante: parseInt(demandante), // garantir que seja um número
            responsaveis: responsaveis.map(r => parseInt(r)), // array de números
            validade,
            status: parseInt(status), // se for uma foreign key, também precisa ser número
        };

        const response = await axios.put(`${API_URL}/api/atividades/${id}/editar/`, payload);
        console.log('Atividade editada com sucesso:', response.data);
    } catch (error) {
        console.error('Erro ao editar atividade:', error);
        if (error.response) {
            console.error('Detalhes do erro:', error.response.data);
        }
    }
};
