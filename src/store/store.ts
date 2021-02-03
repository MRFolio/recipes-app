import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import allRecipesReducer from './allRecipesSlice';

const store = configureStore({
  reducer: {
    allRecipes: allRecipesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
