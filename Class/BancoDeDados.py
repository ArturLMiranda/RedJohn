import json
import mysql.connector
from mysql.connector import Error

class BancoDeDados:
    def __init__(self, host, usuario, senha, banco):
        try:
            self.conexao = mysql.connector.connect(
                host=host,
                user=usuario,
                password=senha,
                database=banco
            )
            self.cursor = self.conexao.cursor(dictionary=True)
            print("Conexão bem-sucedida!")
        except Error as e:
            raise Exception("Erro no tratamento: Não foi possível conectar ao MySQL.") from e

    def __init__(self):
        try:
            # Abrir e carregar o arquivo JSON
            with open("DB\configDB.json", 'r') as arquivo:
                config = json.load(arquivo)

            # Obter as credenciais do banco
            db_config = config["database"]
            
            # Conectar ao MySQL
            self.conexao = mysql.connector.connect(
                host=db_config.get("host", "localhost"),
                user=db_config.get("user"),
                password=db_config.get("password"),
                database=db_config.get("database"),
                port=db_config.get("port", 3306)
            )
        except mysql.connector.Error as err:
            raise Exception(f"Erro ao conectar ao banco de dados: {err}")
        except FileNotFoundError:
            raise Exception("Arquivo JSON não encontrado.")
        except json.JSONDecodeError:
            raise Exception("Erro ao decodificar JSON.")
        
    def executar_query(self, query, params=None):
        try:
            self.cursor.execute(query, params or ())
            self.conexao.commit()
            return self.cursor.lastrowid
        except Error as e:
            raise Exception("Erro no tratamento: Não foi possível executar a query.") from e

    def buscar_todos(self, query, params=None):
        try:
            self.cursor.execute(query, params or ())
            return self.cursor.fetchall()
        except Error as e:
            raise Exception("Erro no tratamento: Não foi possível buscar os dados.") from e

    def fechar(self):
        try:
            self.cursor.close()
            self.conexao.close()
            print("Conexão encerrada!")
        except Error as e:
            raise Exception("Erro no tratamento: Não foi possível fechar a conexão.") from e

