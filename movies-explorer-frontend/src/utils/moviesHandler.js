import { getMovies } from './MoviesApi';

function filterMovies(data, short, movies) {
  const moviesToDisplay = movies.filter(
    (movie) => movie.nameRU.includes(data) && (short ? movie.duration < 40 : true),
  );
  const filterData = { params: data, short: short };
  console.log(moviesToDisplay);
  localStorage.setItem('moviesToDisplay', JSON.stringify(moviesToDisplay));
  localStorage.setItem('filterData', JSON.stringify(filterData));
  return { moviesToDisplay, filterData };
}

function handleMovies(data, short) {
  getMovies(data)
    .then((movies) => {
      filterMovies(data, short, movies);
    })
    .catch((error) => {
      throw error;
    })
    .finally(() => {});
}

export { handleMovies, filterMovies };
