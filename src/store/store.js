import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './reducers/allRecipesSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
  },
});
