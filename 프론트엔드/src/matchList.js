export default function MatchList(params) {
    this.$matchList = params.$matchList
    

    this.render = (matches, name, spells, champions) => {
        console.log(matches, name)
        // const htmlString = matches.map((match) => {
        //     const participants = match.participants.map((participant) => participant.summonerName.toUpperCase() === name.toUpperCase() ?
        //     `<p><b>${participant.summonerName}</b>   ${participant.stats.kills}/${participant.stats.deaths}/${participant.stats.assists}</p>`:
        //     `<p>${participant.summonerName}  ${participant.stats.kills}/${participant.stats.deaths}/${participant.stats.assists}</p>`
        //     ).join('')
        //     return `<div id="match">${participants}</div>`
        // }).join('')
        const summonerString = matches.map((match) => {
            const summonerMatchResult = match.participants.filter((user) => user.summonerName.toUpperCase() === name.toUpperCase())[0]
            console.log(summonerMatchResult)
            const firstSpellId = summonerMatchResult.spell1Id
            const secondSpellId = summonerMatchResult.spell2Id
            const championId = summonerMatchResult.championId

            const champion = champions.champions[championId].id
            const firstSpell = spells.summonerSpells[firstSpellId].id
            const secondSpell = spells.summonerSpells[secondSpellId].id
            

            return `<img class="champion" src="http://ddragon.leagueoflegends.com/cdn/11.5.1/img/champion/${champion}.png">
                    <img class="summoner-spell" src="http://ddragon.leagueoflegends.com/cdn/11.5.1/img/spell/${firstSpell}.png">
                    <img class="summoner-spell" src="http://ddragon.leagueoflegends.com/cdn/11.5.1/img/spell/${secondSpell}.png">  
                    <span>${summonerMatchResult.stats.kills}/${summonerMatchResult.stats.deaths}/${summonerMatchResult.stats.assists}</span>`
        }).join('')
        this.$matchList.innerHTML = summonerString
    }
}