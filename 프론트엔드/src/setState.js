export const setState = (target, value, state) => {
    switch(target) {
        case 'summonerName':
           const newState = {...state, summonerName : value}
           return newState
        case 'summonerLeague':
            const newState= {...state, summonerLeague : value}
            return newState
        case 'recentMatches':
            const newState = {...state, recentMatches : value}
            return newState
        case 'spells':
            const newState = {...state, spells : value}
            return newState
        case 'champions':
            const newState = {...state, champions : value}
            return newState
    }
}