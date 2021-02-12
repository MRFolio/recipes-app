export const getLocalStorage = (key: string): string | null =>
  localStorage.getItem(key) ? localStorage.getItem(key) : '';

export const setLocalStorage = (key: string, values: string | Object): void => {
  localStorage.setItem(key, JSON.stringify(values));
};

// const getFavoritesLocalStorage = () => {
//   const favorites = localStorage.getItem('favorites');
//   return favorites ? JSON.parse(favorites) : [];
// };
// localStorage.setItem('favorites', JSON.stringify(state.favoritedRecipes));
