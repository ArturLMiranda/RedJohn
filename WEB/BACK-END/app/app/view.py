# views.py
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
import json
import hashlib
from .models import LoginUsuario,Atividade,Tipo, TipoLogin
from rest_framework.decorators import api_view
from rest_framework.response import Response

@csrf_exempt
def login_view(request):
    if request.method == "POST":
        try:
            dados = json.loads(request.body)
            nome = dados.get("nome")
            senha = dados.get("senha")

            # Criptografar a senha recebida para comparar com o banco
            senha_hash = hashlib.sha256(senha.encode()).hexdigest()

            usuario = LoginUsuario.objects.filter(nome=nome, senha=senha_hash).first()

            if usuario:
                return JsonResponse({"sucesso": True})
            else:
                return JsonResponse({"mensagem": "Nome ou senha inválidos."}, status=401)

        except Exception as e:
            return JsonResponse({"mensagem": f"Erro no servidor: {str(e)}"}, status=500)

    return JsonResponse({"mensagem": "Método não permitido."}, status=405)

@api_view(['GET'])
def listar_atividades(request):
    atividades = Atividade.objects.all()
    serializer = AtividadeSerializer(atividades, many=True)
    return Response(serializer.data)
@csrf_exempt
@api_view(['POST'])
def criar_atividade(request):
    try:
        dados = request.data

        descricao = dados.get("descricao")
        validade = dados.get("validade")
        nome_demandante = dados.get("demandante")
        nome_responsavel = dados.get("responsavel")
        status = dados.get("status", "aguardando").lower().replace(" ", "_")

        # Buscar ou criar Demandante
        demandante, _ = Demandante.objects.get_or_create(nome=nome_demandante)

        # Buscar ou criar Responsável
        responsavel, _ = Responsavel.objects.get_or_create(nome=nome_responsavel)

        # Criar atividade
        nova_atividade = Atividade.objects.create(
            descricao=descricao,
            validade=validade,
            demandante=demandante,
            status=status
        )

        # Relacionar responsável
        nova_atividade.responsaveis.add(responsavel)

        return Response({"mensagem": "Atividade criada com sucesso!"}, status=201)

    except Exception as e:
        return Response({"erro": str(e)}, status=400)
def deletar_atividade(request, id):
    # Procurar a atividade pelo ID
    atividade = get_object_or_404(Atividade, id=id)

    try:
        # Deletar a atividade
        atividade.delete()
        return JsonResponse({"message": "Atividade deletada com sucesso"}, status=200)
    except Exception as e:
        # Caso haja algum erro
        return JsonResponse({"error": str(e)}, status=500)
@csrf_exempt
def editar_atividade(request, id):
    if request.method == 'PUT':
        try:
            dados = json.loads(request.body)
            atividade = Atividade.objects.get(id=id)

            atividade.nome = dados.get('nome', atividade.nome)
            atividade.status = dados.get('status', atividade.status)
            atividade.demandante = dados.get('demandante', atividade.demandante)
            atividade.responsavel = dados.get('responsavel', atividade.responsavel)
            atividade.descricao = dados.get('descricao', atividade.descricao)
            atividade.data_vencimento = dados.get('data_vencimento', atividade.data_vencimento)

            atividade.save()
            return JsonResponse({'mensagem': 'Atividade atualizada com sucesso!'})
        except Atividade.DoesNotExist:
            return JsonResponse({'erro': 'Atividade não encontrada'}, status=404)
        except Exception as e:
            return JsonResponse({'erro': str(e)}, status=500)
    else:
        return JsonResponse({'erro': 'Método não permitido'}, status=405)
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
