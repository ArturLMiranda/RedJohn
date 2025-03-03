from DB import BancoDeDados
from Loguin import TipoDeUsuario
from Loguin import Status
import bcrypt

class Usuario:
    def __init__(self, nome, senha, tipo_usuario, status):
        if len(nome) > 20:
            raise ValueError("Nome deve ter no máximo 20 caracteres.")
        if len(senha) > 20:
            raise ValueError("Senha deve ter no máximo 20 caracteres.")

        self.nome = nome
        self.senha = senha
        self.tipo_usuario = tipo_usuario
        self.status = status
        self.banco = BancoDeDados()

    def inserir(self):
        if not self.nome or not self.senha or not self.tipo_usuario or not self.status:
            raise ValueError("Nome, senha, tipo de usuário e status são obrigatórios.")

        # Gerar hash da senha
        senha_hash = bcrypt.hashpw(self.senha.encode('utf-8'), bcrypt.gensalt())

        # Inserir usuário no banco
        consulta = "INSERT INTO Usuario (nome, senha, idTipo, idStatus) VALUES (%s, %s, %s, %s)"
        self.banco.executar(consulta, (self.nome, senha_hash, self.tipo_usuario, self.status))

    def validar_login(self, nome, senha):
        consulta = "SELECT senha FROM Usuario WHERE nome = %s"
        resultado = self.banco.buscar(consulta, (nome,))
        
        if resultado:
            senha_hash = resultado[0][0]
            if bcrypt.checkpw(senha.encode('utf-8'), senha_hash.encode('utf-8')):
                print(f"Login bem-sucedido! Bem-vindo, {nome}.")
                return True
            else:
                print("Senha incorreta.")
        else:
            print("Nome ou senha incorretos.")
        
        return False
