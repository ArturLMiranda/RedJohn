import axios from 'axios';

export const EditarAtividade = async (atividadeId, nome, status, demandante, responsavel, descricao, dataVencimento) => {
    if (!atividadeId) {
        console.log("ID da atividade não encontrado.");
        return;
    }

    try {
        const response = await axios.put(`/api/atividade/${atividadeId}/`, {
            nome,
            status,
            demandante,
            responsavel,
            descricao,
            data_vencimento: dataVencimento
        });
        console.log("Atividade editada com sucesso:", response.data);
    } catch (error) {
        console.error("Erro ao editar atividade:", error);
    }
};
