// src/api/criarDemanda.js

const criarDemanda = async (novaDemanda) => {
    try {
        const response = await fetch("http://localhost:8000/api/atividades/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(novaDemanda),
        });

        if (!response.ok) {
            const erro = await response.json();
            throw new Error(erro?.mensagem || "Erro ao criar demanda.");
        }

        return true;
    } catch (erro) {
        console.error("Erro ao salvar demanda:", erro);
        return false;
    }
};

export default criarDemanda;
