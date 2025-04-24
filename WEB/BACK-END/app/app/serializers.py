from rest_framework import serializers
from .models import (
    Tipo, LoginUsuario, Demandante, Responsavel,
    Status, Atividade, AtividadeResponsavel
)

# Serializador para o modelo Tipo
class TipoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tipo
        fields = '__all__'


# Serializador para o modelo LoginUsuario
class LoginUsuarioSerializer(serializers.ModelSerializer):
    tipo = TipoSerializer(read_only=True)

    class Meta:
        model = LoginUsuario
        fields = ['id', 'nome', 'senha', 'tipo']


# Serializador de criação para LoginUsuario
class LoginUsuarioCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoginUsuario
        fields = ['id', 'nome', 'senha', 'tipo']


# Serializador para o modelo Demandante
class DemandanteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Demandante
        fields = '__all__'


# Serializador para o modelo Responsavel
class ResponsavelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Responsavel
        fields = '__all__'


# Serializador para o modelo Status
class StatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Status
        fields = '__all__'


# Serializador para o modelo AtividadeResponsavel
class AtividadeResponsavelSerializer(serializers.ModelSerializer):
    class Meta:
        model = AtividadeResponsavel
        fields = '__all__'


# Serializador para o modelo Atividade
class AtividadeSerializer(serializers.ModelSerializer):
    # O campo demandante será um objeto serializado de DemandanteSerializer
    demandante = DemandanteSerializer(read_only=True)
    # O campo status será um objeto serializado de StatusSerializer
    status = StatusSerializer(read_only=True)
    # O campo responsaveis será uma lista de objetos serializados de ResponsavelSerializer
    responsaveis = ResponsavelSerializer(many=True, read_only=True)

    class Meta:
        model = Atividade
        fields = ['id', 'descricao', 'validade', 'demandante', 'status', 'responsaveis']


# Serializador de criação e atualização para o modelo Atividade
class AtividadeCreateUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Atividade
        fields = ['id', 'descricao', 'validade', 'demandante', 'status']
