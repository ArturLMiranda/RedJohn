class Foto:
    def __init__(self, db):
        self.db = db
    
    def buscar(self, arquivo):
        return self.db.buscar("SELECT * FROM Foto WHERE arquivo = %s", (arquivo,))

    def inserir(self, arquivo):
        self.db.executar("INSERT INTO Foto (arquivo) VALUES (%s)", (arquivo,))
    
    def get_id(self, arquivo):
        resultado = self.db.buscar("SELECT id FROM Foto WHERE arquivo = %s", (arquivo,))
        return resultado[0][0] if resultado else None