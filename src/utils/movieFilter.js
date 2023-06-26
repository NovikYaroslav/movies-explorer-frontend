import { DURATION_OF_FULL_LENGTH_MOVIE } from './const';

export function filterMovies(movies, data, short) {
  const regex = new RegExp(data, 'i');
  return movies.filter(
    (movie) =>
      regex.test(movie.nameRU) && (short ? movie.duration < DURATION_OF_FULL_LENGTH_MOVIE : true),
  );
}
