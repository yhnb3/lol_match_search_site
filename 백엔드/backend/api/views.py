from django.shortcuts import render
from django.conf import settings

# Create your views here.
from django.http import HttpResponse, JsonResponse

import requests, json

RIOT_API_KEY = settings.RIOT_API_KEY

def getAccount(name):
    url = f'https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/{name}'
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.190 Safari/537.36",
        "Accept-Language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
        "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
        "Origin": "https://developer.riotgames.com",
        "X-Riot-Token": RIOT_API_KEY
    }

    response = requests.get(url, headers=headers)

    return response.json()

def getMatches(matches):
    url = 'https://kr.api.riotgames.com//lol/match/v4/matches/'
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.190 Safari/537.36",
        "Accept-Language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
        "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
        "Origin": "https://developer.riotgames.com",
        "X-Riot-Token": RIOT_API_KEY
    }

    matchResult = []
    for match in matches:
        res = requests.get(url + str(match["gameId"]), headers=headers)
        matchResult.append(res.json())
    
    return matchResult

def getSummonerSpells(request):
    url = "http://ddragon.leagueoflegends.com/cdn/11.5.1/data/ko_KR/summoner.json"
    response = requests.get(url).json()

    summonerSpellDict = {}
    for key, item in response["data"].items():
        key = item["key"]
        summonerSpellDict[key] = item

    return JsonResponse({"summonerSpells" : summonerSpellDict})

def getChampions(request):
    url = "http://ddragon.leagueoflegends.com/cdn/11.5.1/data/ko_KR/champion.json"
    response = requests.get(url).json()

    championsDict = {}
    for key, item in response["data"].items():
        key = item["key"]
        championsDict[key] = item

    return JsonResponse({"champions" : championsDict})


def getSummonerStatus(request, summonerName):
    summoner = getAccount(summonerName)
    url = f'https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/{summoner["id"]}'
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.190 Safari/537.36",
        "Accept-Language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
        "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
        "Origin": "https://developer.riotgames.com",
        "X-Riot-Token": RIOT_API_KEY
    }
    response = requests.get(url, headers=headers).json()

    return JsonResponse({"leagues": response})



def getRecentMatches(request, summonerName):
    summoner = getAccount(summonerName)
    url = f'https://kr.api.riotgames.com/lol/match/v4/matchlists/by-account/{summoner["accountId"]}'
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.190 Safari/537.36",
        "Accept-Language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
        "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
        "Origin": "https://developer.riotgames.com",
        "X-Riot-Token": RIOT_API_KEY
    }
    params = {
        'beginIndex' : 0,
        'endIndex' : 1
    }
    response = requests.get(url, headers=headers, params=params).json()
    matches = response["matches"]
    
    matchResponse = getMatches(matches)
    
    for match in matchResponse:
        for idx in range(10):
            match["participants"][idx]["summonerName"] = match["participantIdentities"][idx]["player"]["summonerName"]

    response = JsonResponse({"matches": matchResponse})

    return response 
