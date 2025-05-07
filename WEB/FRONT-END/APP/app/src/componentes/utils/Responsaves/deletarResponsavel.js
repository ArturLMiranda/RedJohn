import axios from 'axios';

const deletarResponsavel = async (id) => {
    try {
        await axios.delete(`http://localhost:8000/api/responsaveis/${id}/deletar/`);
    } catch (error) {
        console.error('Erro ao deletar responsável:', error);
        throw error;
    }
};

export default deletarResponsavel;
