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
    const url = `http://127.0.0.1:8000/${name}`
    const matches = await apiCall(url)
    return matches
}