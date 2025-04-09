from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Demandante, LoginUsuario
import json

def listar_demandantes(request):
    dados = list(Demandante.objects.values())
    return JsonResponse(dados, safe=False)

@csrf_exempt
def login_view(request):
    if request.method == "POST":
        corpo = json.loads(request.body)
        nome = corpo.get('nome')
        senha = corpo.get('senha')

        try:
            usuario = LoginUsuario.objects.get(nome=nome, senha=senha)
            return JsonResponse({'status': 'ok', 'id': usuario.id})
        except LoginUsuario.DoesNotExist:
            return JsonResponse({'status': 'erro', 'mensagem': 'Credenciais inválidas'}, status=401)

    return JsonResponse({'erro': 'Método não permitido'}, status=405)
