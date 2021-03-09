export default function Input(params) {
    this.$input = params.$input

    const searchSummoner = params.searchSummoner

    this.$input.addEventListener("keydown", async (res) => {
        if (res.key === "Enter") {
            await searchSummoner(res.target.value)
        }
    })

    this.render = () => {
        this.$input.value = ""        
    }   
}