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

export const saveSavedSearchParams = (savedSearchParams) => {
  localStorage.setItem('savedSearchParams', JSON.stringify(savedSearchParams));
};

export const saveSearchParams = (searchParams) => {
  localStorage.setItem('searchParams', JSON.stringify(searchParams));
};

export const localStorageCleaner = () => {
  localStorage.removeItem('searchParams');
  localStorage.removeItem('savedSearchParams');
};
