class RegistroLog:
    def __init__(self, db):
        self.db = db

    def registrar(self, nome, sucesso):
        timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        query = """
        INSERT INTO registro_login (nome, sucesso, timestamp)
        VALUES (%s, %s, %s)
        """
        self.db.executar_query(query, (nome, sucesso, timestamp))
