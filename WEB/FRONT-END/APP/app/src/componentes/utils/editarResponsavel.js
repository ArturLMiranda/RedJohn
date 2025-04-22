import axios from 'axios';

const editarResponsavel = async (id, nome) => {
    try {
        await axios.put(`/api/responsaveis/${id}/`, { nome });
    } catch (error) {
        console.error('Erro ao editar responsável:', error);
        throw error;
    }
};

export default editarResponsavel;
