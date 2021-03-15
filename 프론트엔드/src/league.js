export default function League(params) {
    this.$league = params.$league
    this.renewalAccount = params.renewalAccount

    this.$league.addEventListener('click', (res) => {
        if (res.target.tagName === 'BUTTON') {
            this.renewalAccount(res.target.dataset.name)
        }
    })

    this.render = (summonerLeague) => {   
        if (summonerLeague.length !== 0) {
            const winLate =  parseInt(summonerLeague[1].wins / (summonerLeague[1].wins + summonerLeague[1].losses) * 100)
            const htmlString = `<img class="solo-rank-emblem"src="../image/ranked-emblems/${summonerLeague[1].tier}.png"><span class="summoner-name">${summonerLeague[1].summonerName}</span>
                                <p>${summonerLeague[1].tier} ${summonerLeague[1].rank} / <b>${summonerLeague[1].leaguePoints}LP</b></p>
                                <p>${summonerLeague[1].wins}승 ${summonerLeague[1].losses}패 / 승률 : ${winLate}%
                                <button data-name="${summonerLeague[1].summonerName}">전적 갱신</button>`
            this.$league.innerHTML = htmlString
        }  
    } 
}