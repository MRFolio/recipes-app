import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { IRecipe } from './types';

const urlRecipeById: string =
  'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
const urlRecipeBySearchName: string =
  'https://www.themealdb.com/api/json/v1/1/search.php?s=';

interface IFetchedRecipe {
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strYoutube: string;
  strSource: string;
  strIngredient1?: string;
  strIngredient2?: string;
  strIngredient3?: string;
  strIngredient4?: string;
  strIngredient5?: string;
  strIngredient6?: string;
  strIngredient7?: string;
  strMeasure1?: string;
  strMeasure2?: string;
  strMeasure3?: string;
  strMeasure4?: string;
  strMeasure5?: string;
  strMeasure6?: string;
  strMeasure7?: string;
}

export const loadRecipeById = createAsyncThunk(
  'recipes/loadRecipeById',
  async (id: string) => {
    const response = await fetch(urlRecipeById + id);
    const { meals } = await response.json();
    const {
      strMeal: meal,
      strCategory: category,
      strArea: area,
      strInstructions: instructions,
      strMealThumb: img,
      strYoutube: linkYT,
      strSource: linkWeb,
      strIngredient1,
      strIngredient2,
      strIngredient3,
      strIngredient4,
      strIngredient5,
      strIngredient6,
      strIngredient7,
      strMeasure1,
      strMeasure2,
      strMeasure3,
      strMeasure4,
      strMeasure5,
      strMeasure6,
      strMeasure7,
    }: IFetchedRecipe = meals[0];

    const ingredients: (string | undefined)[] = [
      strIngredient1,
      strIngredient2,
      strIngredient3,
      strIngredient4,
      strIngredient5,
      strIngredient6,
      strIngredient7,
    ];
    const ingredientMeasures: (string | undefined)[] = [
      strMeasure1,
      strMeasure2,
      strMeasure3,
      strMeasure4,
      strMeasure5,
      strMeasure6,
      strMeasure7,
    ];
    const formatedRecipe: IRecipe = {
      meal,
      category,
      area,
      instructions,
      img,
      linkYT,
      linkWeb,
      ingredients,
      ingredientMeasures,
    };

    return formatedRecipe;
  }
);

export const loadRecipeBySearchInput = createAsyncThunk(
  'recipes/loadRecipeBySearchInput',
  async (searchInput: string) => {
    const response = await fetch(urlRecipeBySearchName + searchInput);
    const data = await response.json();
    return data;
  }
);

// localhost favorite recipes
// pärast type folderisse

interface RecipesState {
  recipes: IRecipe[];
  isLoading: boolean;
  hasError: boolean;
  selectedRecipe?: IRecipe;
}

const initialState /* : RecipesState */ = {
  recipes: [],
  isLoading: false,
  hasError: false,
  selectedRecipe: undefined,
} as RecipesState;

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    // setSelectedRecipe(state, { payload }: PayloadAction<any>) {
    //   state.selectedRecipe = payload;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(loadRecipeById.pending, (state) => {
      state.isLoading = true;
      state.hasError = false;
    });
    builder.addCase(
      loadRecipeById.fulfilled,
      (state, { payload }: PayloadAction<IRecipe>) => {
        state.selectedRecipe = payload;
        state.isLoading = false;
        state.hasError = false;
      }
    );
    builder.addCase(loadRecipeById.rejected, (state) => {
      state.isLoading = false;
      state.hasError = true;
    });
    // search input
    builder.addCase(loadRecipeBySearchInput.pending, (state) => {
      state.isLoading = true;
      state.hasError = false;
    });
    builder.addCase(
      loadRecipeBySearchInput.fulfilled,
      (state, { payload }: PayloadAction<IRecipe[]>) => {
        state.recipes = payload;
        state.isLoading = false;
        state.hasError = false;
      }
    );
    builder.addCase(loadRecipeBySearchInput.rejected, (state) => {
      state.isLoading = false;
      state.hasError = true;
    });
  },
});

//actions
// export const { setSelectedRecipe } = recipesSlice.actions;

//selectors
export const selectSelectedRecipe = (state: RootState) =>
  state.recipes.selectedRecipe;
export const selectIsLoading = (state: RootState) => state.recipes.isLoading;
export const selectHasError = (state: RootState) => state.recipes.hasError;

export default recipesSlice.reducer;
