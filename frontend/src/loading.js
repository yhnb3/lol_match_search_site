export default function Loading(params) {
    this.$loading = params.$loading

    this.show = () => {
        this.$loading.classList.add("show")
    }

    this.hide = () => {
        this.$loading.classList.remove("show")
    }
}