from DB import BancoDeDados
class Balanceamento:
    """Classe que representa a entidade Balanceamento."""
    def __init__(self, db):
        self.db = db
    
    def buscar(self, nome):
        """Busca um balanceamento pelo nome."""
        return self.db.buscar("SELECT * FROM Balanceamento WHERE nome = %s", (nome,))

    def inserir(self, nome, ip, idProtocolo):
        """Insere um novo balanceamento no banco de dados."""
        self.db.executar(
            "INSERT INTO Balanceamento (nome, ip, idProtocolo) VALUES (%s, %s, %s)",
            (nome, ip, idProtocolo)
        )
    
    def get_id(self, nome):
        """Retorna o ID de um balanceamento pelo nome."""
        resultado = self.db.buscar("SELECT id FROM Balanceamento WHERE nome = %s", (nome,))
        return resultado[0][0] if resultado else None