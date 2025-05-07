import axios from 'axios';

const criarDemanda = async (novaDemanda) => {
    try {
        const response = await axios.post("http://localhost:8000/api/atividades/criar/", novaDemanda, {
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
