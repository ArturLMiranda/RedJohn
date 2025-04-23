import axios from 'axios';

// Função para deletar a atividade
export const DeletarAtividade = async (atividadeId, setAtividadeId) => {
    if (!atividadeId) {
        console.log("ID da atividade não encontrado.");
        return;
    }

    try {
        // Aqui você faz a requisição para deletar a atividade
        const response = await axios.delete(`/api/atividade/${atividadeId}`);
        console.log("Atividade deletada com sucesso:", response.data);
        // Após deletar, você pode fazer algo como limpar o estado ou redirecionar o usuário
        setAtividadeId(null); // Limpar o ID após a exclusão
    } catch (error) {
        console.error("Erro ao deletar atividade:", error);
    }
};
