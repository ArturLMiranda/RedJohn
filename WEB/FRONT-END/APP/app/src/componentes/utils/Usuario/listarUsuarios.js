import axios from 'axios';
import { API_URL } from "../config";
const listarUsuarios = async () => {
    try {
        const response = await axios.get(`${API_URL}/api/usuarios/`);
        return response.data;
    } catch (error) {
        console.error('Erro ao listar usuários:', error);
        return [];
    }
};

export default listarUsuarios;
