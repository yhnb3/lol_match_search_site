from django.shortcuts import render
from django.conf import settings

# Create your views here.
from django.http import HttpResponse, JsonResponse

# cache
from django.core.cache import cache

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
    accountInfo = cache.get(f'account_{name}')
    if not accountInfo:
        accountInfo = requests.get(url, headers=headers)
        cache.set(f'account_{name}', accountInfo)

    return accountInfo.json()

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
        res = cache.get(f'{match["gameId"]}')
        if not res:
            res = requests.get(url + str(match["gameId"]), headers=headers)
            cache.set(f'{match["gameId"]}', res)
        matchResult.append(res.json())
    
    return matchResult

def getSummonerSpells(request):
    spells = cache.get('spells')
    if not spells:
        url = "http://ddragon.leagueoflegends.com/cdn/11.5.1/data/ko_KR/summoner.json"
        response = requests.get(url).json()
        spells = {}
        for key, item in response["data"].items():
            key = item["key"]
            spells[key] = item
        cache.set('spells', spells)

    return JsonResponse({"summonerSpells" : spells})

def getChampions(request):
    championsDict = cache.get('champions')
    if not championsDict:
        url = "http://ddragon.leagueoflegends.com/cdn/11.5.1/data/ko_KR/champion.json"
        response = requests.get(url).json()

        championsDict = {}
        for key, item in response["data"].items():
            key = item["key"]
            championsDict[key] = item
        cache.set('champions', championsDict)

    return JsonResponse({"champions" : championsDict})


def getSummonerStatus(request, summonerName):
    summoner = getAccount(summonerName)
    summonerLeague = cache.get(f'league_{summoner["id"]}')
    if not summonerLeague:
        url = f'https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/{summoner["id"]}'
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.190 Safari/537.36",
            "Accept-Language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
            "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
            "Origin": "https://developer.riotgames.com",
            "X-Riot-Token": RIOT_API_KEY
        }
        summonerLeague = requests.get(url, headers=headers).json()
        cache.set(f'league_{summoner["id"]}', summonerLeague)

    return JsonResponse({"leagues": summonerLeague})



def getRecentMatches(request, summonerName):
    summoner = getAccount(summonerName)
    recentMatches = cache.get(f'matches_{summoner["accountId"]}')
    if not recentMatches:
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
            'endIndex' : 20
        }
        response = requests.get(url, headers=headers, params=params).json()
        matches = response["matches"]
        
        recentMatches = getMatches(matches)
        
        for match in recentMatches:
            for idx in range(10):
                match["participants"][idx]["summonerName"] = match["participantIdentities"][idx]["player"]["summonerName"]
        cache.set(f'matches_{summoner["accountId"]}', recentMatches)

    return JsonResponse({"matches": recentMatches})


def renewalAccount(request, summonerName):
    summoner = getAccount(summonerName)
    matchUrl = f'https://kr.api.riotgames.com/lol/match/v4/matchlists/by-account/{summoner["accountId"]}'
    leagueUrl = f'https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/{summoner["id"]}'

    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.190 Safari/537.36",
        "Accept-Language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
        "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
        "Origin": "https://developer.riotgames.com",
        "X-Riot-Token": RIOT_API_KEY
    }
    params = {
        'beginIndex' : 0,
        'endIndex' : 20
    }
    matchResponse = requests.get(matchUrl, headers=headers, params=params).json()
    matches = matchResponse["matches"]
    recentMatches = getMatches(matches)
    for match in recentMatches:
        for idx in range(10):
            match["participants"][idx]["summonerName"] = match["participantIdentities"][idx]["player"]["summonerName"]
    cache.set(f'matches_{summoner["accountId"]}', recentMatches)
    summonerLeague = requests.get(leagueUrl, headers=headers).json()
    cache.set(f'league_{summoner["id"]}', summonerLeague)

    return JsonResponse({'message':'success'}, status = 200)