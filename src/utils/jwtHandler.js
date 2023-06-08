const JWT_KEY = 'movies-explorer';

export const getJwt = () => {
  const token = localStorage.getItem(JWT_KEY);
  return token;
};

export const saveJwt = (token) => {
  localStorage.setItem(JWT_KEY, token);
};

export const removeJwt = () => {
  localStorage.removeItem(JWT_KEY);
};
