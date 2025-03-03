from Loguin.DB import BancoDeDados

class TipoDeUsuario:
    def __init__(self, nome):
        if len(nome) > 20:
            raise ValueError("Nome deve ter no máximo 20 caracteres.")
        
        self.nome = nome
        self.banco = BancoDeDados()

    def buscar_todos(self):
        consulta = "SELECT * FROM TipoDeUsuario"
        return self.banco.buscar(consulta)
    
    def inserir(self):
        consulta = "INSERT INTO TipoDeUsuario (nome) VALUES (%s)"
        self.banco.executar(consulta, (self.nome,))
        
    def buscar_id_por_nome(self, nome):
        """Busca o ID do status pelo nome."""
        consulta = "SELECT id FROM Status WHERE nome = %s"
        resultado = self.banco.buscar(consulta, (nome,))
        return resultado[0][0] if resultado else None