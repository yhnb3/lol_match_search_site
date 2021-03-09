import Input from "./input.js"
import * as api from "./api.js"
import MatchList from "./matchList.js"
import League from "./league.js"


function App(params) {
    this.$app = params.$app
    this.matchState = params.initialMatchState

    this.state = {
        summonerName: "",
        summonerLeague: [],
        recentMatches: []
    }

    const setState = (name, league, matches) => {
        this.state = {
            summonerName: name,
            summonerLeague: league,
            recentMatches: matches,
        }
        this.render()
    }

    const getSummonerStatus = async (name) => {
        const summonerLeague = await api.getSummonerStatus(name)
        return summonerLeague["leagues"]
    }

    const getRecentMatches = async (name) => {
        const recentMatches = await api.getRecentMatches(name)
        return recentMatches["matches"]
    }

    const summonerLeague = new League({
        $league: document.querySelector("#summoner-league")
    })

    const matchList = new MatchList({
        $matchList: document.querySelector("#match-list")
    })

    const nameInput = new Input({
        $input: document.querySelector("#input"),
        searchSummoner: async function(name) {
            const summonerLeague = await getSummonerStatus(name)
            const recentMatches= await getRecentMatches(name)
            setState(name, summonerLeague, recentMatches)
        }
    })

    this.render = () => {
        nameInput.render()
        summonerLeague.render(this.state.summonerLeague)
        matchList.render(this.state.recentMatches, this.state.summonerName)
    }

    this.render()
}


new App({
    $app: document.querySelector("#app"),
    initialMatchState: []
})