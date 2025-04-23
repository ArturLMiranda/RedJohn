import axios from 'axios';

const deletarResponsavel = async (id) => {
    try {
        await axios.delete(`/api/responsaveis/${id}/`);
    } catch (error) {
        console.error('Erro ao deletar responsável:', error);
        throw error;
    }
};

export default deletarResponsavel;
