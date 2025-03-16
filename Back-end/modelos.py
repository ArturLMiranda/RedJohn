class Demandante:
    def __init__(self, id=None, nome=None):
        self.id = id
        self.nome = nome

    def validar(self):
        if not self.nome or len(self.nome) < 3:
            raise ValueError("Nome do demandante inválido. Deve ter no mínimo 3 caracteres.")

class Tipo:
    def __init__(self, id=None, nome=None):
        self.id = id
        self.nome = nome

    def validar(self):
        if not self.nome or len(self.nome) < 3:
            raise ValueError("Nome do tipo inválido. Deve ter no mínimo 3 caracteres.")

class LoginUsuario:
    def __init__(self, id=None, nome=None, senha=None):
        self.id = id
        self.nome = nome
        self.senha = senha

    def validar(self):
        if not self.nome or len(self.nome) < 3:
            raise ValueError("Nome de usuário inválido. Deve ter no mínimo 3 caracteres.")
        if not self.senha or len(self.senha) < 6:
            raise ValueError("Senha inválida. Deve ter no mínimo 6 caracteres.")
