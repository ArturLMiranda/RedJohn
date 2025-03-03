class Pessoa:
    def __init__(self, db):
        self.db = db
    
    def buscar(self, nome):
        return self.db.buscar("SELECT * FROM Pessoa WHERE nome = %s", (nome,))

    def inserir(self, nome, idFoto):
        self.db.executar("INSERT INTO Pessoa (nome, idFoto) VALUES (%s, %s)", (nome, idFoto))
    
    def get_id(self, nome):
        resultado = self.db.buscar("SELECT id FROM Pessoa WHERE nome = %s", (nome,))
        return resultado[0][0] if resultado else None
