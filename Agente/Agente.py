from DB import BancoDeDados

class Agente:
    """Classe que representa a entidade Agente."""
    def __init__(self, db):
        self.db = db
    
    def buscar(self, nome):
        """Busca um agente pelo nome."""
        return self.db.buscar("SELECT * FROM Agente WHERE nome = %s", (nome,))

    def inserir(self, nome, ip, idProtocolo, idBalanceamento):
        """Insere um novo agente no banco de dados."""
        self.db.executar(
            "INSERT INTO Agente (nome, ip, idProtocolo, idBalanceamento) VALUES (%s, %s, %s, %s)",
            (nome, ip, idProtocolo, idBalanceamento)
        )
    
    def get_id(self, nome):
        """Retorna o ID de um agente pelo nome."""
        resultado = self.db.buscar("SELECT id FROM Agente WHERE nome = %s", (nome,))
        return resultado[0][0] if resultado else None
