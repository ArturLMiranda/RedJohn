import axios from 'axios';
import { API_URL } from "../config";
export const EditarUsuario = async (usuarioId, dadosUsuario, limparCampos, exibirMensagem) => {
    try {
        const response = await axios.put(`${API_URL}/api/usuarios/${usuarioId}/editar/`, dadosUsuario);
        console.log('Usuário atualizado com sucesso:', response.data);
        if (exibirMensagem) exibirMensagem('Usuário atualizado com sucesso!');
        if (limparCampos) limparCampos(); // opcional, se quiser resetar o form
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        if (exibirMensagem) exibirMensagem('Erro ao atualizar usuário.');
    }
};
