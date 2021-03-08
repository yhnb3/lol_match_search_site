import Input from "./input.js"
import * as api from "./api.js"


function App(params) {
    this.$app = params.$app
    this.matchState = params.initialMatchState

    this.setState = (matchState) => {
        this.matchState = matchState
        this.render()
    }

    const getRecentMatches = async (name) => {
        const recentMatches = await api.getRecentMatches(name)
        this.setState(recentMatches)
    }

    const nameInput = new Input({
        $input: document.querySelector("#input"),
        getRecentMatches: async function(name) {
            await getRecentMatches(name)
        }
    })

    this.render = () => {
        nameInput.render()
    }

    this.render()
}


new App({
    $app: document.querySelector("#app"),
    initialMatchState: []
})