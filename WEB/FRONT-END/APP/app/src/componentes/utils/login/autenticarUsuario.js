export const autenticarUsuario = async (nome, senha) => {
    try {
        const response = await fetch("http://localhost:8000/api/login/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ nome, senha }),
        });

        if (response.ok) {
            return true;
        } else {
            const data = await response.json();
            console.warn(data.erro);
            return false;
        }
    } catch (error) {
        console.error("Erro ao autenticar:", error);
        return false;
    }
};
