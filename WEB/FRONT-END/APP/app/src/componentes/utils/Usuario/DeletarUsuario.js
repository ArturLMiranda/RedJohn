import axios from 'axios';
import { API_URL } from "../config";
export const DeletarUsuario = async (usuarioId, callback) => {
    try {
        const response = await axios.delete(`${API_URL}/api/usuarios/${usuarioId}/deletar/`);
        console.log('Usuário deletado com sucesso:', response.data);
        if (callback) callback(); // Pode ser para limpar os campos ou exibir feedback
    } catch (error) {
        console.error('Erro ao deletar usuário:', error);
    }
};
