class Video:
    def __init__(self, db):
        self.db = db
    
    def buscar(self, local):
        return self.db.buscar("SELECT * FROM Video WHERE local = %s", (local,))

    def inserir(self, local, idCamera, idProtocolo=None, porta=None):
        self.db.executar("INSERT INTO Video (local, idCamera, idProtocolo, porta) VALUES (%s, %s, %s, %s)", (local, idCamera, idProtocolo, porta))
    
    def get_id(self, local):
        resultado = self.db.buscar("SELECT id FROM Video WHERE local = %s", (local,))
        return resultado[0][0] if resultado else None