import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

const url = www.api / recipes;

const loadRecipes = createAsyncThunk(
  'allRecipes/getAllRecipes',
  async (searchInput: string) => {
    const data = await fetch(`${url}${searchInput}`);
    const json = await data.json();
    return json;
  }
);

export interface AllRecipes {
  id: string;
  name: string;
}

interface AllRecipesState {
  value: number;
  isLoading: boolean;
  allRecipes: [];
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
      state.value++;
    },
    decrement(state, { payload }: PayloadAction<number>) {
      state.value--;
    },
    incrementByAmount(
      state,
      {
        payload,
      }: PayloadAction<{ id: string; desc: string; isLoading: boolean }>
    ) {
      state.value += payload;
    },
  },
  extraReducers: {
    [loadRecipes.pending]: (state, action) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [loadRecipes.fulfilled]: (
      state,
      { payload }: PayloadAction<{ allRecipes: IRecipes[] }>
    ) => {
      state.allRecipes = payload;
      state.isLoading = false;
      state.hasError = false;
    },
    [loadRecipes.rejected]: (state, action) => {
      state.isLoading = false;
      state.hasError = true;
    },
  },
});

export const {
  increment,
  decrement,
  incrementByAmount,
} = allRecipesSlice.actions;

export default allRecipesSlice.reducer;
