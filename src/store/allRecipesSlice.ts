import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

const urlRecipeByID: string =
  'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
const urlRecipeBySearchName: string =
  'https://www.themealdb.com/api/json/v1/1/search.php?s=';

export const loadRecipeById = createAsyncThunk(
  'allRecipes/loadRecipeById',
  async (id: string) => {
    const response = await fetch(`${urlRecipeByID}${id}`);
    const data = await response.json();
    console.log(data);
    return data;
  }
);

export const loadRecipeBySearchInput = createAsyncThunk(
  'allRecipes/loadRecipeBySearchInput',
  async (searchInput: string) => {
    const response = await fetch(`${urlRecipeBySearchName}${searchInput}`);
    // const response = await fetch(urlRecipeBySearchName + searchInput);
    const data = await response.json();
    console.log(data);
    return data;
  }
);

// localhost favorite recipes
// pärast type folderisse
export interface IRecipe {
  id: string;
  name: string;
}

interface AllRecipesState {
  allRecipes: IRecipe[];
  isLoading: boolean;
  hasError: boolean;
}

const initialState = {
  allRecipes: [],
  isLoading: false,
  hasError: false,
} as AllRecipesState;

const allRecipesSlice = createSlice({
  name: 'allRecipes',
  initialState,
  reducers: {
    // incrementByAmount(
    //   state,
    //   {
    //     payload,
    //   }: PayloadAction<{ id: string; desc: string; isLoading: boolean }>
    // ) {
    //   state.value += payload;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(loadRecipeById.pending, (state, { payload }) => {
      state.isLoading = true;
      state.hasError = false;
    });
    builder.addCase(
      loadRecipeById.fulfilled,
      (state, { payload }: PayloadAction<IRecipe[]>) => {
        state.allRecipes = payload;
        state.isLoading = false;
        state.hasError = false;
      }
    );
    builder.addCase(loadRecipeById.rejected, (state, action) => {
      state.isLoading = false;
      state.hasError = true;
    });
  },
});

// export const { } = allRecipesSlice.actions;

export default allRecipesSlice.reducer;
