import axios from 'axios';
import { API_URL } from "../config";
export const CadastrarUsuario = async (usuario, limparFormulario) => {
    try {
        const response = await axios.post(`${API_URL}/api/usuarios/criar/`, usuario);
        console.log("Usuário cadastrado com sucesso:", response.data);
        if (limparFormulario) limparFormulario(); // Limpar o formulário após cadastro
    } catch (error) {
        console.error("Erro ao cadastrar usuário:", error);
    }
};
