const appFavorites = new Vue({
    el: '#appFavorites',
    data: {
        peliculasFavoritas: JSON.parse(localStorage.getItem("peliculasFavoritas") || "[]"),
    },
    methods: {
        removeFromFavorites(movie) {
            this.peliculasFavoritas = this.peliculasFavoritas.filter(favorite => favorite.id !== movie.id);
            localStorage.setItem("peliculasFavoritas", JSON.stringify(this.peliculasFavoritas));
        }
    },
});




