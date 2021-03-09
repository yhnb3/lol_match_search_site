export default function MatchList(params) {
    this.$matchList = params.$matchList

    this.render = (matches, name) => {
        console.log(matches, name)
        const htmlString = matches.map((match) => {
            const participants = match.participants.map((participant) => participant.summonerName.toUpperCase() === name.toUpperCase() ?
            `<p><b>${participant.summonerName}</b>   ${participant.stats.kills}/${participant.stats.deaths}/${participant.stats.assists}</p>`:
            `<p>${participant.summonerName}  ${participant.stats.kills}/${participant.stats.deaths}/${participant.stats.assists}</p>`
            ).join('')
            return `<div id="match">${participants}</div>`
        }).join('')
        this.$matchList.innerHTML = htmlString
    }
}