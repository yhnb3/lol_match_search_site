export default function Input(params) {
    this.$input = params.$input
    
    const disableInput = params.disableInput
    const ableInput = params.ableInput
    const searchSummoner = params.searchSummoner

    this.$input.addEventListener("keydown", async (res) => {
        if (res.key === "Enter") {
            disableInput(this.$input)
            await searchSummoner(res.target.value)
            ableInput(this.$input)
        }
    })

    this.render = () => {
        this.$input.value = ""        
    }   
}