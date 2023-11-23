const app = new Vue({
    el: '#app',
    data: {
        completed: false,
        movie: {
            id: '',
            title: '',
        },
        movies: [],
        favorites: [],
        searchQuery: '',
        filteredMovies: [],
    },
    created() {
        this.getMovies();
        this.filterMovies();
    },
    methods: {
        async getMovies() {
            const endPoint = 'https://api.themoviedb.org/3';
            const apiKey = 'e031b4af9279b55b3f8e93ada4fb04a7';
            const API_URL = `${endPoint}/discover/movie?sort_by=popularity.desc&api_key=${apiKey}`;

            try {
                const response = await fetch(API_URL);
                const data = await response.json();
                this.movies = data.results;
                this.completed = true; // Establecer completed a true para mostrar las películas

                console.log(data);
            } catch (error) {
                console.error(error);
            }
        },
        filterMovies() {
            const searchTerm = this.searchQuery.toLowerCase();
            if (!searchTerm) {
                this.filteredMovies = this.movies;
            } else {
                this.filteredMovies = this.movies.filter(movie =>
                    movie.title.toLowerCase().includes(searchTerm)
                );
            }
        },
    }
});
