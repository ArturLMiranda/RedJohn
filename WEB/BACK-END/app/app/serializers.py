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
    demandante = DemandanteSerializer(read_only=True)
    status = StatusSerializer(read_only=True)
    responsaveis = ResponsavelSerializer(many=True, read_only=True)

    class Meta:
        model = Atividade
        fields = ['id', 'titulo', 'descricao', 'validade', 'demandante', 'status', 'responsaveis']

# Serializador de criação e atualização para o modelo Atividade
class AtividadeCreateUpdateSerializer(serializers.ModelSerializer):
    responsaveis = serializers.PrimaryKeyRelatedField(
        queryset=Responsavel.objects.all(),
        many=True
    )

    class Meta:
        model = Atividade
        fields = ['id', 'titulo', 'descricao', 'validade', 'demandante', 'status', 'responsaveis']

    def create(self, validated_data):
        responsaveis = validated_data.pop('responsaveis', [])
        atividade = Atividade.objects.create(**validated_data)

        # Adiciona os vínculos na tabela intermediária
        atividade.responsaveis.set(responsaveis)

        return atividade

    def update(self, instance, validated_data):
        responsaveis = validated_data.pop('responsaveis', None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        if responsaveis is not None:
            instance.responsaveis.set(responsaveis)

        return instance