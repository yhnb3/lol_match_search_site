export default function MatchList(params) {
    this.$matchList = params.$matchList
    

    this.render = (matches, name, spells, champions) => {
        console.log(matches)
        const summaryMatchesString = matches.map((match) => {
            const summonerMatchResult = match.participants.filter((user) => user.summonerName.toUpperCase() === name.toUpperCase())[0]
            return summonerMatchResult.stats.win ? `<div class="summary-recent-match win"></div>` :  `<div class="summary-recent-match lose"></div>`
        }).join('')
        // const htmlString = matches.map((match) => {
        //     const participants = match.participants.map((participant) => participant.summonerName.toUpperCase() === name.toUpperCase() ?
        //     `<p><b>${participant.summonerName}</b>   ${participant.stats.kills}/${participant.stats.deaths}/${participant.stats.assists}</p>`:
        //     `<p>${participant.summonerName}  ${participant.stats.kills}/${participant.stats.deaths}/${participant.stats.assists}</p>`
        //     ).join('')
        //     return `<div id="match">${participants}</div>`
        // }).join('')
        const summonerMatchString = matches.map((match) => {
            const summonerMatchResult = match.participants.filter((user) => user.summonerName.toUpperCase() === name.toUpperCase())[0]
            const firstSpellId = summonerMatchResult.spell1Id
            const secondSpellId = summonerMatchResult.spell2Id
            const championId = summonerMatchResult.championId

            const champion = champions.champions[championId].id
            const firstSpell = spells.summonerSpells[firstSpellId].id
            const secondSpell = spells.summonerSpells[secondSpellId].id

            const items = [summonerMatchResult.stats.item0, summonerMatchResult.stats.item1, summonerMatchResult.stats.item2, summonerMatchResult.stats.item3, summonerMatchResult.stats.item4, summonerMatchResult.stats.item5]
            const itemString = items.map((item) => item === 0 ?  
                `<div class="summoner-item"></div>` :
                `<div class="summoner-item"><img class="summoner-item image" src="http://ddragon.leagueoflegends.com/cdn/11.6.1/img/item/${item}.png"></div>`
            ).join('')

            return `<div class="recent-match">
                    <img class="champion" src="http://ddragon.leagueoflegends.com/cdn/11.5.1/img/champion/${champion}.png">
                    <div class="summoner-spell">
                        <img class="summoner-spell" src="http://ddragon.leagueoflegends.com/cdn/11.5.1/img/spell/${firstSpell}.png">
                        <img class="summoner-spell" src="http://ddragon.leagueoflegends.com/cdn/11.5.1/img/spell/${secondSpell}.png">
                    </div>
                    <span>${summonerMatchResult.stats.kills}/${summonerMatchResult.stats.deaths}/${summonerMatchResult.stats.assists}</span>
                    <div class="summoner-items">${itemString}</div>
                    </div>`
        }).join('')
        this.$matchList.innerHTML = `<div class="summary-matches">
                                        <p>최근전적</p>
                                        <div class="recent-matches-visuality">${summaryMatchesString}</div>
                                    </div>
                                    <div class="summoner-match">${summonerMatchString}</div>`
    }
}