// import loadEvent from './events/loadEvent.js';
// import addItemEvent from './events/addItemEvent.js';
// import clearAllEvent from './events/clearAllEvent.js';

// loadEvent();
// addItemEvent();
// clearAllEvent();
const apiKey = 'eb34b2'; // Replace with your OMDB API key
const searchInput = document.getElementById('searchInput');
const movieResults = document.getElementById('movieResults');

// Search movies function
async function searchMovies() {
    const query = searchInput.value.trim();
    if (!query) {
        movieResults.innerHTML = '<p>Please enter a movie name.</p>';
        return;
    }

    try {
        const response = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${query}`);
        const data = await response.json();

        if (data.Response === 'True') {
            displayMovies(data.Search);
        } else {
            movieResults.innerHTML = `<p>No movies found for "${query}".</p>`;
        }
    } catch (error) {
        movieResults.innerHTML = '<p>Error fetching movies. Please try again later.</p>';
        console.error(error);
    }
}

// Display movies in grid
function displayMovies(movies) {
    movieResults.innerHTML = ''; // Clear previous results
    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');

        movieCard.innerHTML = `
            <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'placeholder.jpg'}" alt="${movie.Title}">
            <h3>${movie.Title}</h3>
            <p>Year: ${movie.Year}</p>
        `;
        movieResults.appendChild(movieCard);
    });
}

// Allow search on Enter key press
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchMovies();
    }
});