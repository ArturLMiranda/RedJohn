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
    senha = models.CharField(max_length=64)  # SHA-256

    def __str__(self):
        return self.nome


class TipoLogin(models.Model):
    tipo = models.ForeignKey(Tipo, on_delete=models.CASCADE)
    login = models.ForeignKey(LoginUsuario, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('tipo', 'login')


class Status(models.Model):
    nome = models.CharField(max_length=50)
    cor = models.CharField(max_length=7, null=True, blank=True)  # Ex: #33A1FF

    def __str__(self):
        return self.nome


class Atividade(models.Model):
    descricao = models.TextField()
    demandante = models.ForeignKey(Demandante, on_delete=models.CASCADE)
    validade = models.DateField()
    status = models.ForeignKey(Status, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return f'{self.descricao[:30]}...'


class Responsavel(models.Model):
    nome = models.CharField(max_length=255)

    def __str__(self):
        return self.nome


class AtividadeResponsavel(models.Model):
    atividade = models.ForeignKey(Atividade, on_delete=models.CASCADE)
    responsavel = models.ForeignKey(Responsavel, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('atividade', 'responsavel')
