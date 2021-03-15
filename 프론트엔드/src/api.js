const apiCall = async (url) => {
    try {
        const newData = await fetch(url)
            .then(res => res.json())
        return newData 
    }
    catch {
        alert("api를 부르지 못햇습니다.")
    }
}

export const getRecentMatches = async (name) => {
    const url = `http://127.0.0.1:8000/matches/${name}`
    const matches = await apiCall(url)
    return matches
}

export const getSummonerStatus = async (name) => {
    const url = `http://127.0.0.1:8000/league/${name}`
    const status = await apiCall(url)
    return status
}

export const getChampions = async () => {
    const url = `http://127.0.0.1:8000/champions`
    const champions = await apiCall(url)
    return champions
}

export const getSpells = async () => {
    const url = `http://127.0.0.1:8000/spells`
    const spells = await apiCall(url)
    return spells
}

export const renewalAccount = async (name) => {
    const url = `http://127.0.0.1:8000/renewal/${name}`
    const success = await apiCall(url)
    return success["message"]
}