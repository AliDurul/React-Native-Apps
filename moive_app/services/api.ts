export const TMDB_CONFIG = {
    BASE_URL: "https://api.themoviedb.org/3",
    ACCESS_KEY: process.env.EXPO_PUBLIC_TMDB_ACCESS_KEY,
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_ACCESS_KEY}`
    }
}

export const fetchMovies = async ({ query }: { query: string }) => {

    const endpoint = query
        ? `/search/movie?query=${encodeURIComponent(query)}`
        : `/discover/movie?include_adult=false&include_video=true&language=en-US&sort_by=popularity.desc`;

    try {

        const res = await fetch(TMDB_CONFIG.BASE_URL + endpoint, {
            method: 'GET',
            headers: TMDB_CONFIG.headers
        });

        if (!res.ok) {
            throw new Error(`Error fetching movies: ${res.statusText}`);
        };

        const data = await res.json();


        return data.results;
    } catch (error) {
        console.error("Error fetching movie details:", error);
        throw error;
    }
}

export const fetchTrendingMovies = async () => {

    try {

        const res = await fetch(TMDB_CONFIG.BASE_URL + '/trending/movie/week?language=en-US', {
            method: 'GET',
            headers: TMDB_CONFIG.headers
        });

        if (!res.ok) {
            throw new Error(`Error fetching movies: ${res.statusText}`);
        };

        const data = await res.json();

        return data.results;
    } catch (error) {
        console.error("Error fetching movie details:", error);
        throw error;
    }
};

export const fetchMovieDetails = async (movieId: string): Promise<MovieDetails> => {

    if (!movieId) {
        throw new Error("Movie ID is required to fetch movie details.");
    }

    try {
        const response = await fetch(`${TMDB_CONFIG.BASE_URL}/movie/${movieId}?&language=en-US`, {
            method: "GET",
            headers: TMDB_CONFIG.headers,
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch movie details: ${response.statusText}`);
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.error("Error fetching movie details:", error);
        throw error;
    }
};