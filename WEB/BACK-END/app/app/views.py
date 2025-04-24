# =========================================
# IMPORTAÇÕES
# =========================================
import hashlib
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import (
    Tipo, LoginUsuario, Demandante, Responsavel,
    Status, Atividade, AtividadeResponsavel
)
from .serializers import (
    TipoSerializer, LoginUsuarioSerializer, LoginUsuarioCreateSerializer,
    DemandanteSerializer, ResponsavelSerializer,
    StatusSerializer, AtividadeSerializer, AtividadeCreateUpdateSerializer
)

# =========================================
# LOGIN
# =========================================

@csrf_exempt
@api_view(['POST'])
def login_view(request):
    data = request.data
    nome = data.get('nome')
    senha = data.get('senha')
    senha_hash = hashlib.sha256(senha.encode()).hexdigest()

    try:
        usuario = LoginUsuario.objects.get(nome=nome, senha=senha_hash)
        serializer = LoginUsuarioSerializer(usuario)
        return Response(serializer.data)
    except LoginUsuario.DoesNotExist:
        return Response({'erro': 'Credenciais inválidas'}, status=401)

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
    serializer = AtividadeCreateUpdateSerializer(data=request.data)
    if serializer.is_valid():
        atividade = serializer.save()
        return Response(AtividadeSerializer(atividade).data, status=201)
    return Response(serializer.errors, status=400)

@api_view(['PUT'])
def editar_atividade(request, id):
    try:
        atividade = Atividade.objects.get(pk=id)
    except Atividade.DoesNotExist:
        return Response({'erro': 'Atividade não encontrada'}, status=404)

    serializer = AtividadeCreateUpdateSerializer(atividade, data=request.data)
    if serializer.is_valid():
        atividade = serializer.save()
        return Response(AtividadeSerializer(atividade).data)
    return Response(serializer.errors, status=400)

@api_view(['DELETE'])
def deletar_atividade(request, id):
    try:
        atividade = Atividade.objects.get(pk=id)
        atividade.delete()
        return Response(status=204)
    except Atividade.DoesNotExist:
        return Response({'erro': 'Atividade não encontrada'}, status=404)

# =========================================
# CRUD USUÁRIOS
# =========================================

@csrf_exempt
@api_view(['POST'])
def criar_usuario(request):
    data = request.data.copy()
    senha = data.get('senha')
    data['senha'] = hashlib.sha256(senha.encode()).hexdigest()

    serializer = LoginUsuarioCreateSerializer(data=data)
    if serializer.is_valid():
        usuario = serializer.save()
        return Response(LoginUsuarioSerializer(usuario).data, status=201)
    return Response(serializer.errors, status=400)

@csrf_exempt
@api_view(['PUT'])
def editar_usuario(request, usuario_id):
    try:
        usuario = LoginUsuario.objects.get(pk=usuario_id)
    except LoginUsuario.DoesNotExist:
        return Response({'erro': 'Usuário não encontrado'}, status=404)

    data = request.data.copy()
    if 'senha' in data:
        data['senha'] = hashlib.sha256(data['senha'].encode()).hexdigest()

    serializer = LoginUsuarioCreateSerializer(usuario, data=data)
    if serializer.is_valid():
        usuario = serializer.save()
        return Response(LoginUsuarioSerializer(usuario).data)
    return Response(serializer.errors, status=400)

@csrf_exempt
@api_view(['DELETE'])
def deletar_usuario(request, usuario_id):
    try:
        usuario = LoginUsuario.objects.get(pk=usuario_id)
        usuario.delete()
        return Response(status=204)
    except LoginUsuario.DoesNotExist:
        return Response({'erro': 'Usuário não encontrado'}, status=404)

@api_view(['GET'])
def listar_usuarios(request):
    usuarios = LoginUsuario.objects.all()
    serializer = LoginUsuarioSerializer(usuarios, many=True)
    return Response(serializer.data)

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
    serializer = ResponsavelSerializer(data=request.data)
    if serializer.is_valid():
        responsavel = serializer.save()
        return Response(ResponsavelSerializer(responsavel).data, status=201)
    return Response(serializer.errors, status=400)

@api_view(['DELETE'])
def deletar_responsavel(request, id):
    try:
        responsavel = Responsavel.objects.get(pk=id)
        responsavel.delete()
        return Response(status=204)
    except Responsavel.DoesNotExist:
        return Response({'erro': 'Responsável não encontrado'}, status=404)

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
    serializer = DemandanteSerializer(data=request.data)
    if serializer.is_valid():
        demandante = serializer.save()
        return Response(DemandanteSerializer(demandante).data, status=201)
    return Response(serializer.errors, status=400)

@api_view(['PUT'])
def editar_demandante(request, pk):
    try:
        demandante = Demandante.objects.get(pk=pk)
    except Demandante.DoesNotExist:
        return Response({'erro': 'Demandante não encontrado'}, status=404)

    serializer = DemandanteSerializer(demandante, data=request.data)
    if serializer.is_valid():
        demandante = serializer.save()
        return Response(DemandanteSerializer(demandante).data)
    return Response(serializer.errors, status=400)

@api_view(['DELETE'])
def deletar_demandante(request, pk):
    try:
        demandante = Demandante.objects.get(pk=pk)
        demandante.delete()
        return Response(status=204)
    except Demandante.DoesNotExist:
        return Response({'erro': 'Demandante não encontrado'}, status=404)
