from rest_framework import serializers
from .models import (
    Demandante, Tipo, LoginUsuario, TipoLogin,
    Status, Atividade, Responsavel, AtividadeResponsavel
)


class DemandanteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Demandante
        fields = '__all__'


class TipoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tipo
        fields = '__all__'


class LoginUsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoginUsuario
        fields = '__all__'


class TipoLoginSerializer(serializers.ModelSerializer):
    tipo = TipoSerializer()
    login = LoginUsuarioSerializer()

    class Meta:
        model = TipoLogin
        fields = '__all__'


class StatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Status
        fields = '__all__'


class ResponsavelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Responsavel
        fields = '__all__'


class AtividadeResponsavelSerializer(serializers.ModelSerializer):
    atividade = serializers.PrimaryKeyRelatedField(queryset=Atividade.objects.all())
    responsavel = ResponsavelSerializer()

    class Meta:
        model = AtividadeResponsavel
        fields = '__all__'


class AtividadeSerializer(serializers.ModelSerializer):
    demandante = DemandanteSerializer()
    status = StatusSerializer()
    responsaveis = serializers.SerializerMethodField()

    class Meta:
        model = Atividade
        fields = ['id', 'descricao', 'validade', 'demandante', 'status', 'responsaveis']

    def get_responsaveis(self, obj):
        responsaveis = Responsavel.objects.filter(atividaderesponsavel__atividade=obj)
        return ResponsavelSerializer(responsaveis, many=True).data
