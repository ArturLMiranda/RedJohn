# =========================================
# IMPORTAÇÕES
# =========================================
import hashlib
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Atividade, LoginUsuario, Tipo, TipoLogin, Responsavel, Demandante
from .serializers import (
    AtividadeSerializer, LoginUsuarioSerializer, TipoLoginSerializer,
    ResponsavelSerializer, DemandanteSerializer
)

# =========================================
# LOGIN
# =========================================

@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        nome = data.get('nome')
        senha = hashlib.sha256(data.get('senha').encode()).hexdigest()
        try:
            usuario = LoginUsuario.objects.get(nome=nome, senha=senha)
            tipo_login = TipoLogin.objects.get(loginusuario=usuario)
            tipo = tipo_login.tipo.tipo
            return JsonResponse({'status': 'success', 'usuario_id': usuario.id, 'tipo': tipo})
        except LoginUsuario.DoesNotExist:
            return JsonResponse({'status': 'error', 'mensagem': 'Usuário ou senha inválidos'})
    return JsonResponse({'status': 'error', 'mensagem': 'Método não permitido'}, status=405)

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
    serializer = AtividadeSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'status': 'success', 'atividade': serializer.data})
    return Response(serializer.errors, status=400)

@api_view(['PUT'])
def editar_atividade(request, id):
    try:
        atividade = Atividade.objects.get(id=id)
    except Atividade.DoesNotExist:
        return Response({'status': 'error', 'mensagem': 'Atividade não encontrada'}, status=404)
    serializer = AtividadeSerializer(atividade, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'status': 'success', 'atividade': serializer.data})
    return Response(serializer.errors, status=400)

@api_view(['DELETE'])
def deletar_atividade(request, id):
    try:
        atividade = Atividade.objects.get(id=id)
        atividade.delete()
        return Response({'status': 'success'})
    except Atividade.DoesNotExist:
        return Response({'status': 'error', 'mensagem': 'Atividade não encontrada'}, status=404)

# =========================================
# CRUD USUÁRIOS
# =========================================

@csrf_exempt
def criar_usuario(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        data['senha'] = hashlib.sha256(data['senha'].encode()).hexdigest()
        serializer = LoginUsuarioSerializer(data=data)
        if serializer.is_valid():
            usuario = serializer.save()
            tipo = Tipo.objects.get(id=data['tipo'])
            TipoLogin.objects.create(loginusuario=usuario, tipo=tipo)
            return JsonResponse({'status': 'success', 'usuario': serializer.data})
        return JsonResponse(serializer.errors, status=400, safe=False)

@csrf_exempt
def editar_usuario(request, usuario_id):
    try:
        usuario = LoginUsuario.objects.get(id=usuario_id)
    except LoginUsuario.DoesNotExist:
        return JsonResponse({'status': 'error', 'mensagem': 'Usuário não encontrado'}, status=404)

    data = json.loads(request.body)
    if 'senha' in data:
        data['senha'] = hashlib.sha256(data['senha'].encode()).hexdigest()
    serializer = LoginUsuarioSerializer(usuario, data=data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return JsonResponse({'status': 'success', 'usuario': serializer.data})
    return JsonResponse(serializer.errors, status=400, safe=False)

@csrf_exempt
def deletar_usuario(request, usuario_id):
    try:
        usuario = LoginUsuario.objects.get(id=usuario_id)
        TipoLogin.objects.filter(loginusuario=usuario).delete()
        usuario.delete()
        return JsonResponse({'status': 'success'})
    except LoginUsuario.DoesNotExist:
        return JsonResponse({'status': 'error', 'mensagem': 'Usuário não encontrado'}, status=404)

def listar_usuarios(request):
    usuarios = LoginUsuario.objects.all()
    serializer = LoginUsuarioSerializer(usuarios, many=True)
    return JsonResponse(serializer.data, safe=False)

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
        serializer.save()
        return Response({'status': 'success', 'responsavel': serializer.data})
    return Response(serializer.errors, status=400)

@api_view(['DELETE'])
def deletar_responsavel(request, id):
    try:
        responsavel = Responsavel.objects.get(id=id)
        responsavel.delete()
        return Response({'status': 'success'})
    except Responsavel.DoesNotExist:
        return Response({'status': 'error', 'mensagem': 'Responsável não encontrado'}, status=404)

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
        serializer.save()
        return Response({'status': 'success', 'demandante': serializer.data})
    return Response(serializer.errors, status=400)

@api_view(['PUT'])
def editar_demandante(request, pk):
    try:
        demandante = Demandante.objects.get(id=pk)
    except Demandante.DoesNotExist:
        return Response({'status': 'error', 'mensagem': 'Demandante não encontrado'}, status=404)
    serializer = DemandanteSerializer(demandante, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'status': 'success', 'demandante': serializer.data})
    return Response(serializer.errors, status=400)

@api_view(['DELETE'])
def deletar_demandante(request, pk):
    try:
        demandante = Demandante.objects.get(id=pk)
        demandante.delete()
        return Response({'status': 'success'})
    except Demandante.DoesNotExist:
        return Response({'status': 'error', 'mensagem': 'Demandante não encontrado'}, status=404)
