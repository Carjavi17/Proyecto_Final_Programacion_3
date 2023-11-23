const appDescription = new Vue({
    el: '#appDescription',
    data: {
        id: '',
        movie: {},
        title: '',
        overview: '',
        poster_path: '',
        peliculasFavoritas: [],
        genres: '',
    },
    methods: {
        getMovie() {
            const movieId = this.id;

            fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=88c04dc49e43f548fabdab4b3fdea812`)
                .then(response => response.json())
                .then(data => {
                    this.movie = data;
                    this.title = data.title;
                    this.overview = data.overview;
                    this.poster_path = data.poster_path;

                    // Obtener el género de la película
                    const genreIds = data.genre_ids;
                    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=88c04dc49e43f548fabdab4b3fdea812&language=es`)
                        .then(response => response.json())
                        .then(genresData => {
                            const genres = genresData.genres;
                            const movieGenres = genres.filter(genre => genreIds.includes(genre.id));
                            this.movie.genres = movieGenres.map(genre => genre.name).join(', ');
                        });

                    // Obtener la valoración de la película
                    fetch(`https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=88c04dc49e43f548fabdab4b3fdea812`)
                        .then(response => response.json())
                        .then(reviewsData => {
                            const reviews = reviewsData.results;
                            const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
                            this.movie.averageRating = averageRating.toFixed(2);
                        });
                });
        },

        addMovieToFavorites() {
            // Obtén las películas favoritas del localStorage
            const existingFavorites = JSON.parse(localStorage.getItem("peliculasFavoritas")) || [];

            // Verifica si la película ya está en la lista
            const exists = existingFavorites.some(favorite => favorite.id === this.movie.id);

            // Si no existe, agrégala a la lista
            if (!exists) {
                existingFavorites.push({
                    id: this.movie.id,
                    title: this.movie.title,
                    overview: this.movie.overview,
                    poster_path: this.movie.poster_path,
                    genres: this.movie.genres,
                    averageRating: this.movie.averageRating,
                });

                // Guarda la lista actualizada en el localStorage
                localStorage.setItem("peliculasFavoritas", JSON.stringify(existingFavorites));

                // Muestra un mensaje de éxito
                alert('Película agregada a favoritos exitosamente!');
            } else {
                // Muestra un mensaje de advertencia si la película ya está en favoritos
                alert('Esta película ya está en tus favoritos.');
            }
        },
    },
    mounted() {
        // Obtener el ID de la película de la cadena de consulta de la URL
        const urlParams = new URLSearchParams(window.location.search);
        this.id = parseInt(urlParams.get('id'), 10);

        // Obtener datos de la película
        this.getMovie();
    }
});




