import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import allRecipesReducer from './allRecipesSlice';
import categoriesReducer from './categoriesSlice';

const store = configureStore({
  reducer: {
    allRecipes: allRecipesReducer,
    categories: categoriesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
