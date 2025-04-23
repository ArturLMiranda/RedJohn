from rest_framework import serializers
from .models import (
    Atividade,
    LoginUsuario,
    Responsavel,
    Demandante,
    Tipo,
    TipoLogin
)

# -------------------------------
# Serializers básicos
# -------------------------------
class ResponsavelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Responsavel
        fields = ['id', 'nome']


class DemandanteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Demandante
        fields = ['id', 'nome']


class TipoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tipo
        fields = ['id', 'nome']


class LoginUsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoginUsuario
        fields = ['id', 'nome']


# -------------------------------
# Serializer para o TipoLogin com dados aninhados
# -------------------------------
class TipoLoginSerializer(serializers.ModelSerializer):
    login = LoginUsuarioSerializer()
    tipo = TipoSerializer()

    class Meta:
        model = TipoLogin
        fields = ['id', 'login', 'tipo']


# -------------------------------
# Serializer da Atividade com relacionamentos
# -------------------------------
class AtividadeSerializer(serializers.ModelSerializer):
    demandante = DemandanteSerializer()
    responsaveis = ResponsavelSerializer(many=True)
    cor_status = serializers.CharField(source='cor_status', read_only=True)

    class Meta:
        model = Atividade
        fields = [
            'id',
            'descricao',
            'validade',
            'status',
            'cor_status',
            'demandante',
            'responsaveis',
        ]
