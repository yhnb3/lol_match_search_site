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
            const userHtmlString = `<img class="user-info-icon" src="http://ddragon.leagueoflegends.com/cdn/11.6.1/img/profileicon/${summonerLeague.summonerIcon}.png">
                                    <div class="user-info-p">
                                        <p class="user-info-name">${summonerLeague.name}</p>
                                        <p class="user-info-level">레벨: ${summonerLeague.summonerLevel}</p>
                                        <button class="renewal-button" data-name="${summonerLeague.name}">전적 갱신</button>
                                    </div>`
            const soloWinLate = !!summonerLeague.solo ? parseInt(summonerLeague.solo.wins / (summonerLeague.solo.wins + summonerLeague.solo.losses) * 100) : undefined
            const soloHtmlString = !!summonerLeague.solo ? 
                                    `<div class="summoner-solo-rank">
                                    <p>솔로 랭크<p>
                                    <img class="solo-rank-emblem"src="../image/ranked-emblems/${summonerLeague.solo.tier}.png">
                                    <p>${summonerLeague.solo.tier} ${summonerLeague.solo.rank} / <b>${summonerLeague.solo.leaguePoints}LP</b></p>
                                    <p>${summonerLeague.solo.wins}승 ${summonerLeague.solo.losses}패 / 승률 : ${soloWinLate}%
                                    </div>` :
                                    `<div class="summoner-solo-rank">정보없음</div>`

            const flexWinLate = !!summonerLeague.flex ? parseInt(summonerLeague.flex.wins / (summonerLeague.flex.wins + summonerLeague.flex.losses) * 100) : undefined
            const flexHtmlString = !!summonerLeague.flex ? 
                                    `<div class="summoner-flex-rank">
                                    <p>자유 랭크<p>
                                    <img class="solo-rank-emblem"src="../image/ranked-emblems/${summonerLeague.flex.tier}.png">
                                    <p>${summonerLeague.flex.tier} ${summonerLeague.flex.rank} / <b>${summonerLeague.flex.leaguePoints}LP</b></p>
                                    <p>${summonerLeague.flex.wins}승 ${summonerLeague.flex.losses}패 / 승률 : ${flexWinLate}%
                                    </div>` :
                                    `<div class="summoner-flex-rank">정보없음</div>`
            const leagueHtmlString = `<div class="user-information">${userHtmlString}</div>
                                     <div class="rank-information">${soloHtmlString}${flexHtmlString}</div>`
            this.$league.innerHTML = leagueHtmlString
        }   
    } 
}