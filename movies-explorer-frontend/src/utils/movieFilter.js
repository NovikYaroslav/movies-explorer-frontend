export function filterMovies(movies, data, short) {
  return {
    filtredMovies: movies.filter(
      (movie) =>
        movie.nameRU.includes(data.toUpperCase() && data.toLowerCase()) &&
        (short ? movie.duration < 40 : true),
    ),
    serchResult: true,
  };
}
