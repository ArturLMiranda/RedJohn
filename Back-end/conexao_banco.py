import mysql.connector
from mysql.connector import Error

class ConexaoBanco:
    def __init__(self, host, usuario, senha, banco):
        self.host = host
        self.usuario = usuario
        self.senha = senha
        self.banco = banco
        self.conexao = None
        self.cursor = None

    def conectar(self):
        try:
            self.conexao = mysql.connector.connect(
                host=self.host,
                user=self.usuario,
                password=self.senha,
                database=self.banco
            )
            if self.conexao.is_connected():
                self.cursor = self.conexao.cursor()
                print("Conexão com o banco de dados realizada com sucesso!")
        except Error as e:
            print(f"Erro ao conectar com o banco de dados: {e}")
            raise

    def desconectar(self):
        if self.conexao.is_connected():
            self.cursor.close()
            self.conexao.close()
            print("Desconectado do banco de dados.")

    def executar_comando(self, comando, dados=None):
        try:
            self.cursor.execute(comando, dados)
            self.conexao.commit()
        except Error as e:
            print(f"Erro ao executar comando: {e}")
            self.conexao.rollback()
            raise

    def consultar(self, comando, dados=None):
        try:
            self.cursor.execute(comando, dados)
            return self.cursor.fetchall()
        except Error as e:
            print(f"Erro ao consultar dados: {e}")
            raise 