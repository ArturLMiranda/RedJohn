from django.contrib import admin
from django.urls import path
from .views import (
    login_view,
    listar_atividades,
    criar_atividade,
    deletar_atividade,
    editar_atividade,
    criar_usuario,
    editar_usuario,
    deletar_usuario,
    listar_usuarios,
    listar_responsaveis,
    criar_responsavel,
    deletar_responsavel,
    listar_demandantes,
    criar_demandante,
    editar_demandante,
    deletar_demandante,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # Login
    path("api/login/", login_view, name="login"),
    
    # Atividades
    path('api/atividades/', listar_atividades, name='listar_atividades'),
    path('api/atividades/criar/', criar_atividade, name='criar_atividade'),
    path('api/atividade/<int:id>/editar/', editar_atividade, name='editar_atividade'),
    path('api/atividade/<int:id>/', deletar_atividade, name='deletar_atividade'),
    
    # Usuários
    path('api/usuarios/', listar_usuarios, name='listar_usuarios'),
    path('api/usuarios/criar/', criar_usuario, name='criar_usuario'),
    path('api/usuarios/<int:usuario_id>/editar/', editar_usuario, name='editar_usuario'),
    path('api/usuarios/<int:usuario_id>/deletar/', deletar_usuario, name='deletar_usuario'),
    
    # Responsáveis
    path('api/responsaveis/', listar_responsaveis, name='listar_responsaveis'),
    path('api/responsaveis/criar/', criar_responsavel, name='criar_responsavel'),
    path('api/responsaveis/<int:id>/deletar/', deletar_responsavel, name='deletar_responsavel'),
    
    # Demandantes
    path('api/demandantes/', listar_demandantes, name='listar_demandantes'),
    path('api/demandantes/criar/', criar_demandante, name='criar_demandante'),
    path('api/demandantes/<int:id>/editar/', editar_demandante, name='editar_demandante'),
    path('api/demandantes/<int:id>/deletar/', deletar_demandante, name='deletar_demandante'),
]
