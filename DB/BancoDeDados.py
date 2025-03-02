import mysql.connector

class BancoDeDados:
    def __init__(self):
        try:
            self.conn = mysql.connector.connect(
                host="localhost",
                user="root",
                password="",  # Adicione sua senha
                database="seu_banco"
            )
            self.cursor = self.conn.cursor()
        except mysql.connector.Error as err:
            print(f"Erro ao conectar ao banco de dados: {err}")
            self.conn = None
            self.cursor = None

    def executar(self, consulta, valores=None):
        try:
            if self.cursor:
                self.cursor.execute(consulta, valores or ())
                self.conn.commit()
        except mysql.connector.Error as err:
            print(f"Erro ao executar consulta: {err}")

    def buscar(self, consulta, valores=None):
        try:
            if self.cursor:
                self.cursor.execute(consulta, valores or ())
                return self.cursor.fetchall()
        except mysql.connector.Error as err:
            print(f"Erro ao buscar dados: {err}")
            return []
    
    def fechar(self):
        if self.cursor:
            self.cursor.close()
        if self.conn:
            self.conn.close()
