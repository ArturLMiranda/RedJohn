/*import axios from 'axios';
import { API_URL } from "../config";
export const EditarAtividade = async (atividadeId, titulo, descricao, demandante, responsaveis, validade, status) => {
    if (!atividadeId) {
        console.log("ID da atividade não encontrado.");
        return;
    }

    // Validação de data
    const isDataValida = !isNaN(Date.parse(validade));
    if (!isDataValida) {
        console.error("Data de validade inválida:", validade);
        return;
    }

    // Garantir tipos corretos e ausência de confusão entre campos
    const dadosAtualizados = {
        titulo: String(titulo).trim(),
        descricao: String(descricao).trim(),
        demandante: parseInt(demandante),
        responsaveis: Array.isArray(responsaveis)
            ? responsaveis.map(id => parseInt(id))
            : [parseInt(responsaveis)],
        validade, // nome do campo corrigido
        status: parseInt(status) // status agora é passado como um número inteiro
    };

    try {
        console.log("Payload enviado:", dadosAtualizados);

        const response = await axios.put(
            `${API_URL}/api/atividades/${atividadeId}/editar/`,
            dadosAtualizados,
            {
                headers: {
                    "Content-Type": "application/json",
                }
            }
        );

        console.log("Atividade editada com sucesso:", response.data);
    } catch (error) {
        console.error("Erro ao editar atividade:", error);
        if (error.response?.data) {
            console.error("Detalhes do erro:", error.response.data);
        }
    }
};

export default EditarAtividade;*/
import axios from 'axios';
import { API_URL } from "../config";

export const EditarAtividade = async (
    atividadeId,
    titulo,
    descricao,
    demandante,
    responsaveis,
    validade,
    status
) => {
    if (!atividadeId) {
        console.error("ID da atividade não fornecido.");
        return;
    }

    const isDataValida = !isNaN(Date.parse(validade));
    const demandanteId = parseInt(demandante);
    const statusId = parseInt(status);
    const responsaveisIds = Array.isArray(responsaveis)
        ? responsaveis.map(id => parseInt(id))
        : [parseInt(responsaveis)];

    if (!titulo || isNaN(demandanteId) || isNaN(statusId) || responsaveisIds.some(isNaN)) {
        console.error("Campos obrigatórios inválidos ou ausentes.");
        return;
    }

    if (!isDataValida) {
        console.error("Data de validade inválida:", validade);
        return;
    }

    const dadosAtualizados = {
        titulo: String(titulo).trim(),
        descricao: String(descricao || "").trim(),
        demandante: demandanteId,
        responsaveis: responsaveisIds,
        validade,
        status: statusId
    };

    try {
        console.log("Enviando dados:", dadosAtualizados);

        const response = await axios.put(
            `${API_URL}/api/atividades/${atividadeId}/editar/`,
            dadosAtualizados,
            {
                headers: {
                    "Content-Type": "application/json",
                }
            }
        );

        console.log("Atividade editada com sucesso:", response.data);
        return response.data;
    } catch (error) {
        console.error("Erro ao editar atividade:", error.message);
        if (error.response) {
            console.error("Status HTTP:", error.response.status);
            console.error("Resposta do servidor:", error.response.data);
        } else if (error.request) {
            console.error("Nenhuma resposta recebida do servidor.");
        } else {
            console.error("Erro ao configurar a requisição:", error.message);
        }
    }
};

export default EditarAtividade;

