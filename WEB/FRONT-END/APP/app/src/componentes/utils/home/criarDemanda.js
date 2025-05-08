import axios from 'axios';
import { API_URL } from "../config";
const criarDemanda = async (novaDemanda) => {
    try {
        const response = await axios.post(`S${API_URL}/api/atividades/criar/`, novaDemanda, {
            headers: {
                "Content-Type": "application/json",
            }
        });

        return true;
    } catch (erro) {
        console.error("Erro ao salvar demanda:", erro);
        return false;
    }
};

export default criarDemanda;
