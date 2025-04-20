from django.shortcuts import render

# Create your views here.
# usuarios/views.py
import hashlib
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import LoginUsuario

@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            nome = data.get('nome')
            senha = data.get('senha')

            if not nome or not senha:
                return JsonResponse({'mensagem': 'Nome e senha obrigatórios'}, status=400)

            senha_hash = hashlib.sha256(senha.encode()).hexdigest()

            if LoginUsuario.objects.filter(nome=nome, senha=senha_hash).exists():
                return JsonResponse({'mensagem': 'Login realizado com sucesso'})
            else:
                return JsonResponse({'mensagem': 'Usuário ou senha inválidos'}, status=401)

        except json.JSONDecodeError:
            return JsonResponse({'mensagem': 'Erro no formato do JSON'}, status=400)
    else:
        return JsonResponse({'mensagem': 'Método não permitido'}, status=405)
