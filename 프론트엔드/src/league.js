export default function League(params) {
    this.$league = params.$league


    this.render = (summonerLeague) => {  
        console.log(summonerLeague) 
        if (summonerLeague.length !== 0) {
            const winLate =  parseInt(summonerLeague[1].wins / (summonerLeague[1].wins + summonerLeague[1].losses) * 100)
            const htmlString = `<img class="solo-rank-emblem"src="../image/ranked-emblems/${summonerLeague[1].tier}.png"><span>${summonerLeague[1].summonerName}</span>
                                <p>${summonerLeague[1].tier} ${summonerLeague[1].rank} / <b>${summonerLeague[1].leaguePoints}LP</b></p>
                                <p>${summonerLeague[1].wins}승 ${summonerLeague[1].losses}패 / 승률 : ${winLate}%`
            this.$league.innerHTML = htmlString
        }  
    } 
}