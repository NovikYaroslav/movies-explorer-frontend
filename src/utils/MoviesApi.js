const beatFilm_url = 'https://api.nomoreparties.co/beatfilm-movies';
const beatFilm_headers = {
  'Content-type': 'application/json',
};

function checkServerResponse(response) {
  if (response.ok) {
    return response.json();
  } else {
    return Promise.reject(`Ошибка: ${response.status} ${response.statusText}`);
  }
}

export function getMovies() {
  return fetch(beatFilm_url, {
    headers: beatFilm_headers,
    method: 'GET',
  }).then(checkServerResponse);
}
