import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import categoriesReducer from './categoriesSlice';
import recipesReducer from './recipesSlice';

const store = configureStore({
  reducer: {
    recipes: recipesReducer,
    categories: categoriesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
