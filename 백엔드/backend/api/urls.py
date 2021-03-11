from django.urls import path
from . import views

urlpatterns = [
    path('matches/<summonerName>/', views.getRecentMatches, name='getRecentMatches'),
    path('league/<summonerName>/', views.getSummonerStatus, name='getSummonerStatus'),
    path('spells/', views.getSummonerSpells, name='getSummonerSpells'),
    path('champions/', views.getChampions, name='getChampions'),
]
