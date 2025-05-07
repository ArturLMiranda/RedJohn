import axios from 'axios';

const editarDemandante = async (id, nome) => {
    try {
        const response = await axios.put(`http://localhost:8000/api/demandantes/${id}/editar/`, { nome });
        console.log('Demandante editado com sucesso:', response.data);
    } catch (error) {
        console.error('Erro ao editar demandante:', error);
    }
};

export default editarDemandante;
