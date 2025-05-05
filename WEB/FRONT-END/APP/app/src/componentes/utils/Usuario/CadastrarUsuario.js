import axios from 'axios';

export const CadastrarUsuario = async (usuario, limparFormulario) => {
    try {
        const response = await axios.post('http://localhost:8000/api/usuarios/criar/', usuario);
        console.log("Usuário cadastrado com sucesso:", response.data);
        if (limparFormulario) limparFormulario(); // Limpar o formulário após cadastro
    } catch (error) {
        console.error("Erro ao cadastrar usuário:", error);
    }
};
