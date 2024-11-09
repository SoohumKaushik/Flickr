const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';

// Genre mapping
const genreMap = {
    28: 'Action',
    12: 'Adventure',
    16: 'Animation',
    35: 'Comedy',
    80: 'Crime',
    // Add more genres as needed
};

// Function to get random movies
async function getRandomMovies() {
    const genres = [28, 12, 16, 35, 80]; // Action, Adventure, Animation, Comedy, Crime
    const randomMovies = [];

    for (const genre of genres) {
        const res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&with_genres=${genre}&page=${Math.floor(Math.random() * 10) + 1}`);
        const data = await res.json();
        const randomMovie = data.results[Math.floor(Math.random() * data.results.length)];
        randomMovie.genre_name = genreMap[genre]; // Add genre name to the movie object
        randomMovies.push(randomMovie);
    }

    showMovies(randomMovies);
}

// Function to show movies
function showMovies(movies) {
    const main = document.getElementById('main');
    main.innerHTML = '';

    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview, genre_name } = movie;

        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');

        movieEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
                <p>Genre: ${genre_name}</p> <!-- Display genre name -->
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>
        `;
        main.appendChild(movieEl);
    });
}

// Function to get class by rating
function getClassByRate(vote) {
    if (vote >= 8) {
        return 'green';
    } else if (vote >= 5) {
        return 'orange';
    } else {
        return 'red';
    }
}

// Event listener for the recommendation button
document.getElementById('recommendation-button').addEventListener('click', function(e) {
    e.preventDefault(); // Prevent the form from submitting
    getRandomMovies(); // Fetch random movies
});

// Call getRandomMovies when the page loads
getRandomMovies();
