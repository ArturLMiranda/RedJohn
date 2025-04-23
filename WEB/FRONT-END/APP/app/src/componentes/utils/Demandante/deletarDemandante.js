import axios from 'axios';

const deletarDemandante = async (id) => {
    try {
        const response = await axios.delete(`/api/demandantes/${id}`);
        console.log('Demandante deletado com sucesso:', response.data);
    } catch (error) {
        console.error('Erro ao deletar demandante:', error);
    }
};

export default deletarDemandante;
