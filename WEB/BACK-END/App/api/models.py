from django.db import models

class Demandante(models.Model):
    nome = models.CharField(max_length=255)

    def __str__(self):
        return self.nome

class Tipo(models.Model):
    nome = models.CharField(max_length=255)

    def __str__(self):
        return self.nome

class LoginUsuario(models.Model):
    nome = models.CharField(max_length=255)
    senha = models.CharField(max_length=64)

    def __str__(self):
        return self.nome

class Atividade(models.Model):
    descricao = models.TextField()
    validade = models.DateField()
    demandante = models.ForeignKey(Demandante, on_delete=models.CASCADE)

    def __str__(self):
        return self.descricao

class Responsavel(models.Model):
    nome = models.CharField(max_length=255)

    def __str__(self):
        return self.nome

class AtividadeResponsavel(models.Model):
    atividade = models.ForeignKey(Atividade, on_delete=models.CASCADE)
    responsavel = models.ForeignKey(Responsavel, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('atividade', 'responsavel')

class TipoLogin(models.Model):
    tipo = models.ForeignKey(Tipo, on_delete=models.CASCADE)
    login = models.ForeignKey(LoginUsuario, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('tipo', 'login')
