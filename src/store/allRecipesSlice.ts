import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

const urlRecipeByID: string =
  'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';

const loadRecipeById = createAsyncThunk(
  'allRecipes/getAllRecipes',
  async (searchInput: string) => {
    const response = await fetch(`${urlRecipeByID}${searchInput}`);
    const data = await response.json();
    return data;
  }
);

export interface Recipe {
  id: string;
  name: string;
}

interface AllRecipesState {
  value: number;
  isLoading: boolean;
  allRecipes: Recipe[];
}

const initialState = {
  value: 0,
  isLoading: false,
  allRecipes: [],
} as AllRecipesState;

const allRecipesSlice = createSlice({
  name: 'allRecipes',
  initialState,
  reducers: {
    increment(state) {
      state.value += 1;
    },
    decrement(state, { payload }: PayloadAction<number>) {
      state.value -= 1;
    },
    // incrementByAmount(
    //   state,
    //   {
    //     payload,
    //   }: PayloadAction<{ id: string; desc: string; isLoading: boolean }>
    // ) {
    //   state.value += payload;
    // },
  },
  // extraReducers: {
  //   [loadRecipeById.pending]: (state, action) => {
  //     state.isLoading = true;
  //     state.hasError = false;
  //   },
  //   [loadRecipeById.fulfilled]: (
  //     state,
  //     { payload }: PayloadAction<{ allRecipes: IRecipes[] }>
  //   ) => {
  //     state.allRecipes = payload;
  //     state.isLoading = false;
  //     state.hasError = false;
  //   },
  //   [loadRecipeById.rejected]: (state, action) => {
  //     state.isLoading = false;
  //     state.hasError = true;
  //   },
  // },
});

export const { increment, decrement } = allRecipesSlice.actions;

export default allRecipesSlice.reducer;
