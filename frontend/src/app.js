import Input from "./input.js"
import * as api from "./api.js"
import MatchList from "./matchList.js"
import League from "./league.js"
import Loading from "./loading.js"
import "./css/style.css"


function App(params) {
    this.$app = params.$app

    this.state = {
        summonerName: "",
        summonerLeague: {"name": ""},
        recentMatches: [],
        spells: {},
        champions: {}
    }


    const setState = (name, league, matches, spells, champions) => {
        this.state = {
            summonerName: name,
            summonerLeague: league,
            recentMatches: matches,
            spells: spells,
            champions: champions,
        }
        sessionStorage.setItem('userName', name)
        this.render()
    }


    const loading = new Loading({
        $loading: document.querySelector(".loading")
    })

    const summonerLeague = new League({
        $league: document.querySelector("#summoner-league"),
        renewalAccount: async function(name) {
            loading.show()
            const message = await api.renewalAccount(name)
            if (message === "success") {
                const summonerLeague = await api.getSummonerStatus(name)
                const recentMatches = await api.getRecentMatches(name)
                const spells = await api.getSpells()
                const champions = await api.getChampions()
                setState(name, summonerLeague, recentMatches["matches"], spells, champions)
            }
            loading.hide()
        } 
    })

    const matchList = new MatchList({
        $matchList: document.querySelector("#match-list"),
    })

    const nameInput = new Input({
        $input: document.querySelector("#input"),
        searchSummoner: async function(name) {
            loading.show()
            const summonerLeague = await api.getSummonerStatus(name)
            if (summonerLeague["status_code"] === 404) {
                loading.hide()
                setState(name, summonerLeague, [], [], [] )
            }
            else {
                const recentMatches = await api.getRecentMatches(name)
                const spells = await api.getSpells()
                const champions = await api.getChampions()
                loading.hide()
                setState(name, summonerLeague, recentMatches["matches"], spells, champions)
            }
        },
        disableInput: function ($input) {
            $input.classList.add("inputDisable")
        },
        ableInput: function ($input) {
            $input.classList.remove("inputDisable")
        }
    })

   

    this.render = () => {
        nameInput.render()
        summonerLeague.render(this.state.summonerLeague)
        matchList.render(this.state.recentMatches, this.state.summonerName, this.state.spells, this.state.champions)
    }

    this.init = async () => {
        if (sessionStorage.getItem('userName')) {
            const name = sessionStorage.getItem('userName')
            loading.show()
            const summonerLeague = await api.getSummonerStatus(name)
            const recentMatches = await api.getRecentMatches(name)
            const spells = await api.getSpells()
            const champions = await api.getChampions()
            loading.hide()
            setState(name, summonerLeague, recentMatches["matches"], spells, champions)
        }
    }

    this.init()
}


new App({
    $app: document.querySelector("#app"),
})