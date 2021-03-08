export default function Input(params) {
    this.$input = params.$input

    const getRecentMatches = params.getRecentMatches

    this.$input.addEventListener("keydown", async (res) => {
        if (res.key === "Enter") {
            await getRecentMatches(res.target.value)
        }
    })

    this.render = () => {
        this.$input.value = ""        
    }   
}