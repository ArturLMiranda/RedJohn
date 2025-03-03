from Loguin.DB import BancoDeDados

class Status:
    def __init__(self, nome, ativo):
        if len(nome) > 20:
            raise ValueError("Nome deve ter no máximo 20 caracteres.")
        if not isinstance(ativo, bool):
            raise ValueError("Status deve ser um valor booleano.")
        
        self.nome = nome
        self.ativo = ativo
        self.banco = BancoDeDados()

    def buscar_todos(self):
        consulta = "SELECT * FROM Status"
        return self.banco.buscar(consulta)

    def inserir(self):
        consulta = "INSERT INTO Status (nome, Campo) VALUES (%s, %s)"
        self.banco.executar(consulta, (self.nome, int(self.ativo)))
    def buscar_id_por_nome(self, nome):
        """Busca o ID do tipo de usuário pelo nome."""
        consulta = "SELECT id FROM TipoDeUsuario WHERE nome = %s"
        resultado = self.banco.buscar(consulta, (nome,))
        return resultado[0][0] if resultado else None