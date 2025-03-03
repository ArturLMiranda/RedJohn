from DB import BancoDeDados
class Registro:
    def __init__(self, db):
        self.db = db
    
    def buscar(self, idVideo):
        return self.db.buscar("SELECT * FROM Registro WHERE idVideo = %s", (idVideo,))

    def inserir(self, idVideo, idPessoa, tempo):
        self.db.executar("INSERT INTO Registro (idVideo, idPessoa, tempo) VALUES (%s, %s, %s)", (idVideo, idPessoa, tempo))