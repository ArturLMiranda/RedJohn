import axios from 'axios';

const buscarAtividades = async () => {
    try {
        const response = await axios.get("http://localhost:8000/api/atividades/");
        if (!response.data) throw new Error("Erro ao buscar atividades");

        const atividadesFormatadas = response.data.map((item) => ({
            id: item.id,
            titulo: item.titulo,  // Corrigido: usar 'titulo' e não mais 'descricao'
            demandante: item.demandante,
            responsaveis: item.responsaveis,
            descricao: item.descricao || "Sem detalhes",
            cor: item.cor,
            status: item.status,
            validade: item.validade ? new Date(item.validade).toISOString() : null,
        }));

        return atividadesFormatadas;
    } catch (erro) {
        console.error("Erro ao carregar atividades:", erro);
        return [];
    }
};

export default buscarAtividades;
