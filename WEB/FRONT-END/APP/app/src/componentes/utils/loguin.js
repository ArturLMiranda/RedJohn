export function validarNome(nome) {
    if (!nome) return "Nome é obrigatório.";
    if (nome.length < 3) return "Nome deve ter no mínimo 3 caracteres.";
    if (nome.length > 100) return "Nome deve ter no máximo 100 caracteres.";
    return null;
}

export function validarSenha(senha) {
    if (!senha) return "Senha é obrigatória.";
    if (senha.length < 6) return "Senha deve ter no mínimo 6 caracteres.";
    if (senha.length > 64) return "Senha deve ter no máximo 64 caracteres.";
    return null;
}

// Validação completa com requisição ao backend
export async function validar(nome, senha) {
    const erros = {};

    const erroNome = validarNome(nome);
    if (erroNome) erros.nome = erroNome;

    const erroSenha = validarSenha(senha);
    if (erroSenha) erros.senha = erroSenha;

    if (Object.keys(erros).length > 0) {
        console.error("Erros de validação:", erros);
        return false;
    }

    try {
        const response = await fetch("http://localhost:8000/api/login/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ nome, senha })
        });

        const data = await response.json();

        if (!response.ok || !data.valido) {
            console.error("Erro do servidor:", data.mensagem || "Erro desconhecido");
            return false;
        }

        console.log("Login autorizado:", data.mensagem);
        return true;

    } catch (error) {
        console.error("Erro na conexão com o backend:", error.message);
        return false;
    }
}
