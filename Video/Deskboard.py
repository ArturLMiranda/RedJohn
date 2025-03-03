from DB import BancoDeDados
class Deskboard:
    def __init__(self, db):
        self.db = db
    
    def buscar(self, nome):
        return self.db.buscar("SELECT * FROM Deskboard WHERE nome = %s", (nome,))

    def inserir(self, nome):
        self.db.executar("INSERT INTO Deskboard (nome) VALUES (%s)", (nome,))
    
    def get_id(self, nome):
        resultado = self.db.buscar("SELECT id FROM Deskboard WHERE nome = %s", (nome,))
        return resultado[0][0] if resultado else None