"""
URL configuration for app project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from .views import login_view
from .views import listar_atividades,criar_atividade,deletar_atividade,editar_atividade
from .views import criar_usuario,editar_usuario,deletar_usuario,listar_usuarios
from .views import listar_responsaveis,criar_responsave,deletar_responsavel

urlpatterns = [ 
    path('admin/', admin.site.urls),
    path("api/login/", login_view, name="login"),
    path('api/atividades/', listar_atividades, name='listar_atividades'),
    path('api/atividades/criar/', views.criar_atividade, name='criar_atividade'),
    path('api/atividade/<int:id>/editar', views.editar_atividade, name='editar_atividade'),
    path('api/atividade/<int:id>/', views.deletar_atividade, name='deletar_atividade'),
    path('api/usuarios/<int:usuario_id>/editar/', editar_usuario, name='editar_usuario'),
    path('api/usuarios/criar/', views.criar_usuario, name='criar_usuario'),
    path('api/usuarios/<int:usuario_id>/deletar/', deletar_usuario),
    path('api/usuarios/', listar_usuarios),
    path('api/responsaveis/', views.listar_responsaveis, name='listar_responsaveis'),
    path('api/responsaveis/', criar_responsavel),
    path('api/responsaveis/<int:id>/', views.deletar_responsavel),
]
