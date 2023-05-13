const BASE_URL = 'http://localhost:3001';
const BASE_HEADERS = {
  authorization:
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDVmODM2MGUwMGM0M2ZmMWIyZDQyNzMiLCJpYXQiOjE2ODM5ODExNTUsImV4cCI6MTY4NDU4NTk1NX0.BebuATjZeRgkJ_mA2wuySZu23KfhYqhJ5u4Vs3pDgiw',
  'Content-type': 'application/json',
};

function checkServerResponse(response) {
  if (response.ok) {
    return response.json();
  } else {
    return response.json().then((error) => {
      throw new Error(error.message || `${response.status} ${response.statusText}`);
    });
  }
}

export function register(name, email, password) {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, password, email }),
  }).then(checkServerResponse);
}

export function addMovie(newMovie) {
  return fetch(`${BASE_URL}/movies`, {
    headers: BASE_HEADERS,
    method: 'POST',
    body: JSON.stringify({
      country: `${newMovie.country}`,
      director: `${newMovie.director}`,
      duration: newMovie.duration,
      year: `${newMovie.year}`,
      description: `${newMovie.description}`,
      image: `https://api.nomoreparties.co/${newMovie.image.url}`,
      trailerLink: `${newMovie.trailerLink}`,
      thumbnail: `https://api.nomoreparties.co/${newMovie.image.formats.thumbnail.url}`,
      nameRU: `${newMovie.nameRU}`,
      nameEN: `${newMovie.nameEN}`,
      movieId: `${newMovie.id}`,
    }),
  }).then(checkServerResponse);
}

// export function deleteMovie(movieId) {
//   return fetch(`${base_url}/movies/645f84d8bb44f603e34aefbc`, {
//     headers: base_headers,
//     method: 'DELETE',
//   }).then(checkServerResponse);
// }
