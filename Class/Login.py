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
            self.registrar_login(nome, sucesso=True)
            return True
        else:
            raise Exception("Erro no tratamento: Nome ou senha incorretos.")
    
    def registrar_login(self, nome, senha):
        if not nome or not senha:
            raise Exception("Nome e senha são obrigatórios.")
        
        # Criptografar a senha com SHA-256
        senha_hash = hashlib.sha256(senha.encode()).hexdigest()
        
        # Verificar se o usuário já existe
        query_verificar = "SELECT * FROM login_usuario WHERE nome = %s"
        resultado = self.db.buscar_todos(query_verificar, (nome,))
        
        if resultado:
            raise Exception("Usuário já cadastrado.")
        
        # Inserir novo usuário
        query_inserir = "INSERT INTO login_usuario (nome, senha) VALUES (%s, %s)"
        self.db.executar(query_inserir, (nome, senha_hash))
        print("Usuário registrado com sucesso!")
        return True
