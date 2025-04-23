# =========================================
# IMPORTAÇÕES
# =========================================
import json
import hashlib

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import LoginUsuario, Atividade, Tipo, TipoLogin, Responsavel, Demandante
from .serializers import (
    AtividadeSerializer,
    ResponsavelSerializer,
    DemandanteSerializer,
    TipoSerializer,
    LoginUsuarioSerializer,
    TipoLoginSerializer
)

# =========================================
# LOGIN
# =========================================

@csrf_exempt
def login_view(request):
    if request.method == "POST":
        try:
            dados = json.loads(request.body)
            nome = dados.get("nome")
            senha = dados.get("senha")

            senha_hash = hashlib.sha256(senha.encode()).hexdigest()
            usuario = LoginUsuario.objects.filter(nome=nome, senha=senha_hash).first()

            if usuario:
                return JsonResponse({"sucesso": True})
            else:
                return JsonResponse({"mensagem": "Nome ou senha inválidos."}, status=401)
        except Exception as e:
            return JsonResponse({"mensagem": f"Erro no servidor: {str(e)}"}, status=500)

    return JsonResponse({"mensagem": "Método não permitido."}, status=405)

# =========================================
# CRUD ATIVIDADES
# =========================================

@api_view(['GET'])
def listar_atividades(request):
    atividades = Atividade.objects.all()
    serializer = AtividadeSerializer(atividades, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def criar_atividade(request):
    if request.method == 'POST':
        serializer = AtividadeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"mensagem": "Atividade criada com sucesso!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def editar_atividade(request, id):
    try:
        atividade = Atividade.objects.get(id=id)
    except Atividade.DoesNotExist:
        return JsonResponse({"erro": "Atividade não encontrada"}, status=404)

    if request.method == 'PUT':
        serializer = AtividadeSerializer(atividade, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse({"mensagem": "Atividade atualizada com sucesso!"})
        return JsonResponse(serializer.errors, status=400)

@api_view(['DELETE'])
def deletar_atividade(request, id):
    try:
        atividade = Atividade.objects.get(id=id)
        atividade.delete()
        return JsonResponse({"message": "Atividade deletada com sucesso"}, status=200)
    except Atividade.DoesNotExist:
        return JsonResponse({"error": "Atividade não encontrada"}, status=404)

# =========================================
# CRUD USUÁRIOS
# =========================================

@csrf_exempt
def criar_usuario(request):
    if request.method == 'POST':
        try:
            dados = json.loads(request.body)
            nome = dados.get('nome')
            senha = dados.get('senha')
            confirmar_senha = dados.get('confirmar_senha')
            tipo_id = dados.get('tipo_id')

            if not all([nome, senha, confirmar_senha, tipo_id]):
                return JsonResponse({'erro': 'Todos os campos são obrigatórios.'}, status=400)
            if senha != confirmar_senha:
                return JsonResponse({'erro': 'As senhas não coincidem.'}, status=400)

            senha_hash = hashlib.sha256(senha.encode()).hexdigest()
            usuario = LoginUsuario.objects.create(nome=nome, senha=senha_hash)
            tipo = Tipo.objects.get(id=tipo_id)
            TipoLogin.objects.create(login=usuario, tipo=tipo)

            return JsonResponse({'mensagem': 'Usuário criado com sucesso!'}, status=201)
        except Exception as e:
            return JsonResponse({'erro': str(e)}, status=500)
    return JsonResponse({'erro': 'Método não permitido'}, status=405)

@csrf_exempt
def editar_usuario(request, usuario_id):
    if request.method == 'PUT':
        try:
            dados = json.loads(request.body)
            nome = dados.get('nome')
            senha = dados.get('senha')
            confirmar_senha = dados.get('confirmar_senha')
            tipo_id = dados.get('tipo_id')

            usuario = LoginUsuario.objects.get(id=usuario_id)

            if not all([nome, tipo_id]):
                return JsonResponse({'erro': 'Nome e tipo são obrigatórios.'}, status=400)

            if senha:
                if senha != confirmar_senha:
                    return JsonResponse({'erro': 'As senhas não coincidem.'}, status=400)
                senha_hash = hashlib.sha256(senha.encode()).hexdigest()
                usuario.senha = senha_hash

            usuario.nome = nome
            usuario.save()

            tipo = Tipo.objects.get(id=tipo_id)
            TipoLogin.objects.update_or_create(login=usuario, defaults={'tipo': tipo})

            return JsonResponse({'mensagem': 'Usuário atualizado com sucesso!'})
        except LoginUsuario.DoesNotExist:
            return JsonResponse({'erro': 'Usuário não encontrado.'}, status=404)
        except Exception as e:
            return JsonResponse({'erro': str(e)}, status=500)
    return JsonResponse({'erro': 'Método não permitido'}, status=405)

@csrf_exempt
def deletar_usuario(request, usuario_id):
    if request.method == 'DELETE':
        usuario = get_object_or_404(LoginUsuario, id=usuario_id)
        TipoLogin.objects.filter(login=usuario).delete()
        usuario.delete()
        return JsonResponse({'mensagem': 'Usuário deletado com sucesso'})
    return JsonResponse({'erro': 'Método não permitido'}, status=405)

def listar_usuarios(request):
    if request.method == 'GET':
        usuarios = []
        for usuario in LoginUsuario.objects.all():
            tipo_login = TipoLogin.objects.filter(login=usuario).first()
            tipo_nome = tipo_login.tipo.nome if tipo_login else 'Sem perfil'
            usuarios.append({
                'id': usuario.id,
                'nome': usuario.nome,
                'tipo': tipo_nome
            })
        return JsonResponse(usuarios, safe=False)

# =========================================
# CRUD RESPONSÁVEIS
# =========================================

@api_view(['GET'])
def listar_responsaveis(request):
    responsaveis = Responsavel.objects.all()
    serializer = ResponsavelSerializer(responsaveis, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def criar_responsavel(request):
    if request.method == 'POST':
        serializer = ResponsavelSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse({'id': serializer.data['id'], 'nome': serializer.data['nome']}, status=201)
        return JsonResponse(serializer.errors, status=400)

@api_view(['DELETE'])
def deletar_responsavel(request, id):
    try:
        responsavel = Responsavel.objects.get(id=id)
        responsavel.delete()
        return JsonResponse({'mensagem': 'Responsável deletado com sucesso'})
    except Responsavel.DoesNotExist:
        return JsonResponse({'erro': 'Responsável não encontrado'}, status=404)

# =========================================
# CRUD DEMANDANTES
# =========================================

@api_view(['GET'])
def listar_demandantes(request):
    demandantes = Demandante.objects.all()
    serializer = DemandanteSerializer(demandantes, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def criar_demandante(request):
    if request.method == 'POST':
        serializer = DemandanteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse({"id": serializer.data['id'], "nome": serializer.data['nome']}, status=201)
        return JsonResponse(serializer.errors, status=400)
@api_view(['PUT'])
def editar_demandante(request, pk):
    try:
        demandante = Demandante.objects.get(pk=pk)
    except Demandante.DoesNotExist:
        return JsonResponse({"error": "Demandante não encontrado"}, status=404)

    serializer = DemandanteSerializer(demandante, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return JsonResponse({"id": serializer.data['id'], "nome": serializer.data['nome']}, status=200)
    return JsonResponse(serializer.errors, status=400)
@api_view(['DELETE'])
def deletar_demandante(request, pk):
    try:
        demandante = Demandante.objects.get(pk=pk)
    except Demandante.DoesNotExist:
        return JsonResponse({"error": "Demandante não encontrado"}, status=404)

    demandante.delete()
    return JsonResponse({"message": "Demandante deletado com sucesso"}, status=204)
