class Protocolo:
    def __init__(self, db):
        self.db = db
    
    def buscar(self, nome):
        return self.db.buscar("SELECT * FROM Protocolo WHERE nome = %s", (nome,))

    def inserir(self, nome, porta):
        self.db.executar("INSERT INTO Protocolo (nome, porta) VALUES (%s, %s)", (nome, porta))
    
    def get_id(self, nome):
        resultado = self.db.buscar("SELECT id FROM Protocolo WHERE nome = %s", (nome,))
        return resultado[0][0] if resultado else None