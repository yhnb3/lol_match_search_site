export default function League(params) {
    this.$league = params.$league
    this.renewalAccount = params.renewalAccount

    this.$league.addEventListener('click', (res) => {
        if (res.target.tagName === 'BUTTON') {
            this.renewalAccount(res.target.dataset.name)
        }
    })

    

    this.render = (summonerLeague) => {
        if (summonerLeague.name !== "") {
            let htmlString = `<p>${summonerLeague.name}</p>`
            if (!!summonerLeague.solo) {
                const soloWinLate =  parseInt(summonerLeague.solo.wins / (summonerLeague.solo.wins + summonerLeague.solo.losses) * 100)
                htmlString += `<div class="summoner-solo-rank">
                                <p>솔로 랭크<p>
                                <img class="solo-rank-emblem"src="../image/ranked-emblems/${summonerLeague.solo.tier}.png">
                                <p>${summonerLeague.solo.tier} ${summonerLeague.solo.rank} / <b>${summonerLeague.solo.leaguePoints}LP</b></p>
                                <p>${summonerLeague.solo.wins}승 ${summonerLeague.solo.losses}패 / 승률 : ${soloWinLate}%
                                </div>`
            } else {
                htmlString += `<div class="summoner-solo-rank">정보없음</div>`
            }
            if (!!summonerLeague.flex) {
                const flexWinLate =  parseInt(summonerLeague.flex.wins / (summonerLeague.flex.wins + summonerLeague.flex.losses) * 100)
                htmlString += `<div class="summoner-flex-rank">
                            <p>자유 랭크<p>
                            <img class="solo-rank-emblem"src="../image/ranked-emblems/${summonerLeague.flex.tier}.png">
                            <p>${summonerLeague.flex.tier} ${summonerLeague.flex.rank} / <b>${summonerLeague.flex.leaguePoints}LP</b></p>
                            <p>${summonerLeague.flex.wins}승 ${summonerLeague.flex.losses}패 / 승률 : ${flexWinLate}%
                            </div>`
    
            } else {
                htmlString += `<div class="summoner-flex-rank">정보없음</div>`
            }
            // if (summonerLeague.length !== 0) {
            //     const winLate =  parseInt(summonerLeague[1].wins / (summonerLeague[1].wins + summonerLeague[1].losses) * 100)
            //     const htmlString = `<img class="solo-rank-emblem"src="../image/ranked-emblems/${summonerLeague[1].tier}.png"><span class="summoner-name">${summonerLeague[1].summonerName}</span>
            //                         <p>${summonerLeague[1].tier} ${summonerLeague[1].rank} / <b>${summonerLeague[1].leaguePoints}LP</b></p>
            //                         <p>${summonerLeague[1].wins}승 ${summonerLeague[1].losses}패 / 승률 : ${winLate}%
            //                         <button class="renewal-button" data-name="${summonerLeague[1].summonerName}">전적 갱신</button>`
            //     this.$league.innerHTML = htmlString
            // }
            htmlString += `<button class="renewal-button" data-name="${summonerLeague.name}">전적 갱신</button>`
            this.$league.innerHTML = htmlString
        }   
    } 
}