// src/api/buscarAtividades.js

const buscarAtividades = async () => {
    try {
        const response = await fetch("http://localhost:8000/api/atividades/");
        if (!response.ok) throw new Error("Erro ao buscar atividades");

        const dados = await response.json();

        const atividadesFormatadas = dados.map((item) => ({
            titulo: item.descricao,
            demandante: item.demandante,
            responsavel: item.responsaveis.join(', '),
            descricao: "Detalhes...", // ajuste conforme necessário
            cor: item.cor
        }));

        return atividadesFormatadas;
    } catch (erro) {
        console.error("Erro ao carregar atividades:", erro);
        return [];
    }
};

export default buscarAtividades;
