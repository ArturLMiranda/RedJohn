import hashlib
import datetime

class Login:
    def __init__(self, db):
        self.db = db

    def autenticar(self, nome, senha):
        if not nome or not senha:
            raise Exception("Erro no tratamento: Nome e senha são obrigatórios.")
        
        senha_hash = hashlib.sha256(senha.encode()).hexdigest()
        query = "SELECT * FROM login_usuario WHERE nome = %s AND senha = %s"
        resultado = self.db.buscar_todos(query, (nome, senha_hash))
        
        if resultado:
            print("Login bem-sucedido!")
            self.registrar_login(nome, sucesso=True)
            return True
        else:
            raise Exception("Erro no tratamento: Nome ou senha incorretos.")
    
    def registrar_login(self, nome, sucesso):
        timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        query = """
        INSERT INTO registro_login (nome, sucesso, timestamp)
        VALUES (%s, %s, %s)
        """
        self.db.executar_query(query, (nome, sucesso, timestamp))
