from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import check_password
from .models import LoginUsuario, Demandante
import json

@csrf_exempt
def login_view(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            nome = data.get("nome")
            senha = data.get("senha")

            if not nome or not senha:
                return JsonResponse({"valido": False, "mensagem": "Nome e senha são obrigatórios."}, status=400)

            try:
                usuario = LoginUsuario.objects.get(nome=nome)
                if check_password(senha, usuario.senha):
                    return JsonResponse({"valido": True, "mensagem": "Login bem-sucedido"})
                else:
                    return JsonResponse({"valido": False, "mensagem": "Senha incorreta"}, status=401)
            except LoginUsuario.DoesNotExist:
                return JsonResponse({"valido": False, "mensagem": "Usuário não encontrado"}, status=404)

        except json.JSONDecodeError:
            return JsonResponse({"valido": False, "mensagem": "JSON inválido"}, status=400)

    return JsonResponse({"valido": False, "mensagem": "Método não permitido"}, status=405)


def ultimos_demandantes(request):
    if request.method == "GET":
        dados = Demandante.objects.all().order_by('-id')[:30]
        resultado = [{"id": d.id, "nome": d.nome} for d in dados]
        return JsonResponse(resultado, safe=False)
    return JsonResponse({"erro": "Método não permitido"}, status=405)