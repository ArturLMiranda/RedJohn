from DB import BancoDeDados
class Camera:
    def __init__(self, db):
        self.db = db
    
    def buscar(self, nome):
        return self.db.buscar("SELECT * FROM Camera WHERE nome = %s", (nome,))

    def inserir(self, nome, descricao):
        self.db.executar("INSERT INTO Camera (nome, descricao) VALUES (%s, %s)", (nome, descricao))
    
    def get_id(self, nome):
        resultado = self.db.buscar("SELECT id FROM Camera WHERE nome = %s", (nome,))
        return resultado[0][0] if resultado else None