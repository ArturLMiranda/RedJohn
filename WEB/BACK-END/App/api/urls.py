from django.urls import path
from . import views

urlpatterns = [
    path('demandantes/', views.listar_demandantes),
    path('login/', views.login_view),
]
