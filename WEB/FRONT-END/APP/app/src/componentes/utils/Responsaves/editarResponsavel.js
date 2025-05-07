import axios from 'axios';

const editarResponsavel = async (id, nome) => {
    try {
        await axios.put(`http://localhost:8000/api/responsaveis/${id}/editar/`, { nome });
    } catch (error) {
        console.error('Erro ao editar responsável:', error);
        throw error;
    }
};

export default editarResponsavel;
