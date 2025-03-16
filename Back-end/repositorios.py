from modelos import Demandante, Tipo, LoginUsuario

class RepositorioDemandante:
    def __init__(self, conexao):
        self.conexao = conexao

    def adicionar(self, demandante: Demandante):
        try:
            demandante.validar()
            comando = "INSERT INTO demandante (nome) VALUES (%s)"
            dados = (demandante.nome,)
            self.conexao.executar_comando(comando, dados)
            print(f"Demandante {demandante.nome} adicionado com sucesso!")
        except ValueError as e:
            print(f"Erro de validação: {e}")
        except Exception as e:
            print(f"Erro ao adicionar demandante: {e}")

    def buscar_por_id(self, id):
        try:
            comando = "SELECT * FROM demandante WHERE id = %s"
            dados = (id,)
            resultado = self.conexao.consultar(comando, dados)
            if resultado:
                return Demandante(id=resultado[0][0], nome=resultado[0][1])
            else:
                print(f"Demandante com ID {id} não encontrado.")
                return None
        except Exception as e:
            print(f"Erro ao buscar demandante: {e}")
            return None

class RepositorioTipo:
    def __init__(self, conexao):
        self.conexao = conexao

    def adicionar(self, tipo: Tipo):
        try:
            tipo.validar()
            comando = "INSERT INTO tipo (nome) VALUES (%s)"
            dados = (tipo.nome,)
            self.conexao.executar_comando(comando, dados)
            print(f"Tipo {tipo.nome} adicionado com sucesso!")
        except ValueError as e:
            print(f"Erro de validação: {e}")
        except Exception as e:
            print(f"Erro ao adicionar tipo: {e}")

    def buscar_por_id(self, id):
        try:
            comando = "SELECT * FROM tipo WHERE id = %s"
            dados = (id,)
            resultado = self.conexao.consultar(comando, dados)
            if resultado:
                return Tipo(id=resultado[0][0], nome=resultado[0][1])
            else:
                print(f"Tipo com ID {id} não encontrado.")
                return None
        except Exception as e:
            print(f"Erro ao buscar tipo: {e}")
            return None

class RepositorioLoginUsuario:
    def __init__(self, conexao):
        self.conexao = conexao

    def adicionar(self, usuario: LoginUsuario):
        try:
            usuario.validar()
            comando = "INSERT INTO login_usuario (nome, senha) VALUES (%s, %s)"
            dados = (usuario.nome, usuario.senha)
            self.conexao.executar_comando(comando, dados)
            print(f"Usuário {usuario.nome} adicionado com sucesso!")
        except ValueError as e:
            print(f"Erro de validação: {e}")
        except Exception as e:
            print(f"Erro ao adicionar usuário: {e}")

    def buscar_por_id(self, id):
        try:
            comando = "SELECT * FROM login_usuario WHERE id = %s"
            dados = (id,)
            resultado = self.conexao.consultar(comando, dados)
            if resultado:
                return LoginUsuario(id=resultado[0][0], nome=resultado[0][1], senha=resultado[0][2])
            else:
                print(f"Usuário com ID {id} não encontrado.")
                return None
        except Exception as e:
            print(f"Erro ao buscar usuário: {e}")
            return None
