export const getLocalStorage = (key: string): string | null =>
  localStorage.getItem(key) ? localStorage.getItem(key) : '';

export const setLocalStorage = (key: string, values: string | Object): void => {
  localStorage.setItem(key, JSON.stringify(values));
};
