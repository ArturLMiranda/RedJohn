class AtividadeCRUD:
    def __init__(self, db):
        self.db = db

    def criar_atividade(self, descricao, demandante_id, validade):
        if not descricao or not isinstance(demandante_id, int) or not validade:
            raise Exception("Erro no tratamento: Dados inválidos para inserção.")
        
        query = """
        INSERT INTO atividade (descricao, demandante_id, validade)
        VALUES (%s, %s, %s)
        """
        return self.db.executar_query(query, (descricao, demandante_id, validade))

    def listar_atividades(self):
        query = "SELECT * FROM atividade"
        return self.db.buscar_todos(query)

    def buscar_atividade(self, coluna, valor):
        if not coluna or not valor:
            raise Exception("Erro no tratamento: Coluna ou valor inválido para pesquisa.")
        
        query = f"SELECT * FROM atividade WHERE {coluna} = %s"
        return self.db.buscar_todos(query, (valor,))

    def atualizar_atividade(self, atividade_id, descricao, demandante_id, validade):
        if not isinstance(atividade_id, int) or not descricao or not isinstance(demandante_id, int) or not validade:
            raise Exception("Erro no tratamento: Dados inválidos para atualização.")
        
        query = """
        UPDATE atividade SET descricao = %s, demandante_id = %s, validade = %s WHERE id = %s
        """
        return self.db.executar_query(query, (descricao, demandante_id, validade, atividade_id))

    def excluir_atividade(self, atividade_id):
        if not isinstance(atividade_id, int):
            raise Exception("Erro no tratamento: ID inválido para exclusão.")
        
        query = "DELETE FROM atividade WHERE id = %s"
        return self.db.executar_query(query, (atividade_id,))
