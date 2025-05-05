import axios from 'axios';

const listarUsuarios = async () => {
    try {
        const response = await axios.get('http://localhost:8000/api/usuarios/');
        return response.data;
    } catch (error) {
        console.error('Erro ao listar usuários:', error);
        return [];
    }
};

export default listarUsuarios;
