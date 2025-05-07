// utils/home/DeletarAtividade.js
import axios from 'axios';

// Função para deletar a atividade
export const DeletarAtividade = async (atividadeId) => {
    if (!atividadeId) {
        console.log("ID da atividade não encontrado.");
        return;
    }

    try {
        const response = await axios.delete(`http://localhost:8000/api/atividades/${atividadeId}/deletar/`);
        if (response.status === 204 || response.status === 200) {
            console.log("Atividade deletada com sucesso");
        } else {
            console.error("Resposta inesperada ao deletar atividade:", response);
        }
    } catch (error) {
        console.error("Erro ao deletar atividade:", error);
    }
};


export default DeletarAtividade