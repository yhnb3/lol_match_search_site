from django.urls import path
from . import views

urlpatterns = [
    path('api/matches/<summonerName>/', views.getRecentMatches, name='getRecentMatches'),
    path('api/league/<summonerName>/', views.getSummonerStatus, name='getSummonerStatus'),
    path('api/spells/', views.getSummonerSpells, name='getSummonerSpells'),
    path('api/champions/', views.getChampions, name='getChampions'),
    path('api/renewal/<summonerName>/', views.renewalAccount, name="renewalAccount"),
]
