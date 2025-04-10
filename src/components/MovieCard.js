// components/MovieCard.js
const createMovieCard = (movie) => {
    const movieCard = document.createElement('div');
    movieCard.classList.add('movie-card');

    movieCard.innerHTML = `
      <img src="${
          movie.Poster !== 'N/A' ? movie.Poster : 'placeholder.jpg'
      }" alt="${movie.Title}">
      <h3>${movie.Title}</h3>
      <p>Year: ${movie.Year}</p>
    `;

    return movieCard;
};

export { createMovieCard };
