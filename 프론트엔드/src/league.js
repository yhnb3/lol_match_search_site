export default function League(params) {
    this.$league = params.$league


    this.render = (summonerLeague) => {     
        if (summonerLeague.length !== 0) {
            const htmlString = `<p>${summonerLeague[0].tier}</p>`
            this.$league.innerHTML = htmlString
        }  
    } 
}