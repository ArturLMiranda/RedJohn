import axios from 'axios';

export const CadastrarUsuario = async (usuario, limparFormulario) => {
    try {
        const response = await axios.post('/api/usuarios/', usuario);
        console.log("Usuário cadastrado com sucesso:", response.data);
        if (limparFormulario) limparFormulario();
    } catch (error) {
        console.error("Erro ao cadastrar usuário:", error);
    }
};
