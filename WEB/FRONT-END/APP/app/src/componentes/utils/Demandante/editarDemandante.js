import axios from 'axios';

const editarDemandante = async (id, nome) => {
    try {
        const response = await axios.put(`/api/demandantes/${id}`, { nome });
        console.log('Demandante editado com sucesso:', response.data);
    } catch (error) {
        console.error('Erro ao editar demandante:', error);
    }
};

export default editarDemandante;
