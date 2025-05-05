from django.db import models

# Classe para Demandante
class Demandante(models.Model):
    nome = models.CharField(max_length=255)

    class Meta:
        db_table = 'demantande'  # Garante que ele acessa a tabela correta
        managed = False    # Não deixa o Django tentar gerenciar (criar/modificar)

    def __str__(self):
        return self.nome


# Classe para Tipo
class Tipo(models.Model):
    nome = models.CharField(max_length=255)

    class Meta:
        db_table = 'tipo'  # Garante que ele acessa a tabela correta
        managed = False    # Não deixa o Django tentar gerenciar (criar/modificar)

    def __str__(self):
        return self.nome


# Classe para LoginUsuario
class LoginUsuario(models.Model):
    nome = models.CharField(max_length=255)
    senha = models.CharField(max_length=64)  # SHA-256
    tipo = models.ForeignKey('Tipo', on_delete=models.CASCADE, db_column='tipo', to_field='id')

    class Meta:
        db_table = 'login_usuario' # Garante que ele acessa a tabela correta
        managed = False  # IMPORTANTE: Impede o Django de tentar alterar a tabela existente

    def __str__(self):
        return self.nome


# Classe para Status
class Status(models.Model):
    nome = models.CharField(max_length=50)
    cor = models.CharField(max_length=7, null=True, blank=True, default="#FFFFFF")  # Ex: #33A1FF

    class Meta:
        db_table = 'status'  # Garante que ele acessa a tabela correta
        managed = False    # Não deixa o Django tentar gerenciar (criar/modificar)

    def __str__(self):
        return self.nome


# Classe para Atividade
class Atividade(models.Model):
    descricao = models.TextField()
    demandante = models.ForeignKey(Demandante, on_delete=models.CASCADE)
    validade = models.DateField()
    status = models.ForeignKey(Status, on_delete=models.SET_NULL, null=True, blank=True)

    class Meta:
        db_table = 'atividade'  # Garante que ele acessa a tabela correta
        managed = False    # Não deixa o Django tentar gerenciar (criar/modificar)

    def __str__(self):
        return f'{self.descricao[:30]}...'


# Classe para Responsavel
class Responsavel(models.Model):
    nome = models.CharField(max_length=255)

    class Meta:
        db_table = 'responsavel'  # Garante que ele acessa a tabela correta
        managed = False    # Não deixa o Django tentar gerenciar (criar/modificar)

    def __str__(self):
        return self.nome


# Classe para AtividadeResponsavel
class AtividadeResponsavel(models.Model):
    atividade = models.ForeignKey(Atividade, on_delete=models.CASCADE)
    responsavel = models.ForeignKey(Responsavel, on_delete=models.CASCADE)

    class Meta:
        db_table = 'atividade_responsavel'  # Garante que ele acessa a tabela correta
        managed = False    # Não deixa o Django tentar gerenciar (criar/modificar)

    class Meta:
        unique_together = ('atividade', 'responsavel')
