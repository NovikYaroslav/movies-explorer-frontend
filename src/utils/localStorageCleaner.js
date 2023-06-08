export function localStorageCleaner() {
  localStorage.removeItem('jwt');
  localStorage.removeItem('moviesToDisplay');
  localStorage.removeItem('filterData');
  localStorage.removeItem('filterSavedData');
}
