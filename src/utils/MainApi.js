const BASE_URL = 'https://api.movies.novik.nomoredomains.monster';

function prepareHeaders() {
  const jwt = localStorage.getItem('jwt');
  if (jwt) {
    return {
      authorization: `Bearer ${jwt}`,
      'Content-type': 'application/json',
    };
  } else {
    return {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
  }
}

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

export function authorize(email, password) {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then(checkServerResponse)
    .then((data) => {
      if (data.jwt) {
        localStorage.setItem('jwt', data.jwt);
      }
    });
}

export function getUserInfoFromServer() {
  return fetch(`${BASE_URL}/users/me`, {
    headers: prepareHeaders(),
    method: 'GET',
  }).then(checkServerResponse);
}

export function checkToken(jwt) {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`,
    },
  }).then(checkServerResponse);
}

export function editUserData(profileData) {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'PATCH',
    headers: prepareHeaders(),
    body: JSON.stringify({
      name: `${profileData.name}`,
      email: `${profileData.email}`,
    }),
  }).then(checkServerResponse);
}

export function addMovie(newMovie) {
  return fetch(`${BASE_URL}/movies`, {
    headers: prepareHeaders(),
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

export function deleteMovie(_id) {
  return fetch(`${BASE_URL}/movies/${_id}`, {
    headers: prepareHeaders(),
    method: 'DELETE',
  }).then(checkServerResponse);
}

export function getSavedMovies() {
  return fetch(`${BASE_URL}/movies`, {
    headers: prepareHeaders(),
    method: 'GET',
  }).then(checkServerResponse);
}
