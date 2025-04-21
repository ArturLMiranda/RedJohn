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


class Responsavel(models.Model):
    nome = models.CharField(max_length=255)

    def __str__(self):
        return self.nome


# models.py
class Atividade(models.Model):
    STATUS_CHOICES = [
        ('aguardando', 'Aguardando'),
        ('em_andamento', 'Em Andamento'),
        ('resolvido', 'Resolvido'),
        ('erro', 'Erro'),
    ]
    
    descricao = models.TextField()
    validade = models.DateField()
    demandante = models.ForeignKey(Demandante, on_delete=models.CASCADE)
    responsaveis = models.ManyToManyField(Responsavel, through='AtividadeResponsavel')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='aguardando')

    def cor_status(self):
        cores = {
            'aguardando': '#33A1FF',   # Azul
            'em_andamento': '#FFCC00', # Amarelo
            'resolvido': '#33FF57',    # Verde
            'erro': '#FF3399'          # Vermelho
        }
        return cores.get(self.status, '#FFFFFF')

    def __str__(self):
        return f'{self.descricao[:30]}...'



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
