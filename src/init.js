import  dom  from './dom.js';


const apiKey = 'eb34b2';// Ensure you have a valid API key


const searchMovieIn = async () => {
    const query = dom.searchInput.value.trim();
    if (!query) {
        dom.movieResults.innerHTML = '<p>Please enter a movie name.</p>';
        return;
    }

    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`);
        const data = await response.json();

        if (data.Response === 'True') {
            displayMovies(data.Search);
        } else {
            dom.movieResults.innerHTML = `<p>No movies found for "${query}".</p>`;
        }
    } catch (error) {
        dom.movieResults.innerHTML = '<p>Error fetching movies. Please try again later.</p>';
        console.error(error);
    }




// Search movies function
 dom.searchMovies.addEventListener( 'click', searchMovieIn); 
// Display movies in grid

const displayMovies = (movies) => {
    dom.movieResults.innerHTML = ''; // Clear previous results
    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');

        movieCard.innerHTML = `
            <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'placeholder.jpg'}" alt="${movie.Title}">
            <h3>${movie.Title}</h3>
            <p>Year: ${movie.Year}</p>
        `;
        dom.movieResults.appendChild(movieCard);
    });
}

// Search movies function
dom.searchMovies.addEventListener("click", 
     async () => {
        const query = dom.searchInput.value.trim();
        if (!query) {
            dom.movieResults.innerHTML = '<p>Please enter a movie name.</p>';
            return;
        }
    
        try {
            const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`);
            const data = await response.json();
    
            if (data.Response === 'True') {
                displayMovies(data.Search);
            } else {
                dom.movieResults.innerHTML = `<p>No movies found for "${query}".</p>`;
            }
            
        } catch (error) {
            dom.movieResults.innerHTML = '<p>Error fetching movies. Please try again later.</p>';
            console.error(error);
        }
    }
) 

// Allow search on Enter key press
dom.searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchMovies();
    }
});