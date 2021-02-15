import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { filterEmptyItems } from '../utils/recipeSliceHelper';
import { RootState } from './store';
import { IFetchedMeals, IIngredients, IRecipe, ISingleMeal } from './types';

const urlRecipeById: string =
  'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
const urlRecipeBySearchName: string =
  'https://www.themealdb.com/api/json/v1/1/search.php?s=';

interface IFetchedRecipe {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strYoutube: string;
  strSource: string;
  strIngredient1: string;
  strIngredient2: string;
  strIngredient3: string;
  strIngredient4: string;
  strIngredient5: string;
  strIngredient6: string;
  strIngredient7: string;
  strIngredient8: string;
  strMeasure1: string;
  strMeasure2: string;
  strMeasure3: string;
  strMeasure4: string;
  strMeasure5: string;
  strMeasure6: string;
  strMeasure7: string;
  strMeasure8: string;
}

export const loadRecipeById = createAsyncThunk(
  'recipes/loadRecipeById',
  async (id: string) => {
    const response = await fetch(urlRecipeById + id);
    const { meals } = await response.json();
    const {
      idMeal,
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
      strIngredient8,
      strMeasure1,
      strMeasure2,
      strMeasure3,
      strMeasure4,
      strMeasure5,
      strMeasure6,
      strMeasure7,
      strMeasure8,
    }: IFetchedRecipe = meals[0];

    const ingredientsInitial: IIngredients = [
      strIngredient1,
      strIngredient2,
      strIngredient3,
      strIngredient4,
      strIngredient5,
      strIngredient6,
      strIngredient7,
      strIngredient8,
    ];

    const ingredients: IIngredients = ingredientsInitial.filter(
      filterEmptyItems
    );

    const ingredientMeasuresInitial: IIngredients = [
      strMeasure1,
      strMeasure2,
      strMeasure3,
      strMeasure4,
      strMeasure5,
      strMeasure6,
      strMeasure7,
      strMeasure8,
    ];

    const ingredientMeasures: IIngredients = ingredientMeasuresInitial.filter(
      filterEmptyItems
    );

    const formatedRecipe: IRecipe = {
      idMeal,
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
    const { meals } = await response.json();
    const formatedMeals: ISingleMeal[] = meals
      .sort((a: IFetchedMeals, b: IFetchedMeals) =>
        a.strMeal.localeCompare(b.strMeal)
      )
      .map(
        ({ idMeal: id, strMeal: meal, strMealThumb: img }: IFetchedMeals) => ({
          id,
          meal,
          img,
        })
      );
    return formatedMeals;
  }
);

interface RecipesState {
  searchedRecipes: ISingleMeal[];
  isLoading: boolean;
  hasError: boolean;
  selectedRecipe?: IRecipe;
  favoritedRecipes: IRecipe[];
}

const getFavoritesLocalStorage = () => {
  const favorites = localStorage.getItem('favorites');
  return favorites ? JSON.parse(favorites) : [];
};

const initialState /* : RecipesState */ = {
  searchedRecipes: [],
  isLoading: false,
  hasError: false,
  selectedRecipe: undefined,
  favoritedRecipes: getFavoritesLocalStorage(),
} as RecipesState;

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    addToFavorites(state, { payload }: PayloadAction<IRecipe>) {
      // const newArray = [...state.favoritedRecipes];
      state.favoritedRecipes?.push(payload);
      localStorage.setItem('favorites', JSON.stringify(state.favoritedRecipes));
    },
    removeFromFavorites(state, { payload }: PayloadAction<string>) {
      const filteredList = state.favoritedRecipes?.filter(
        (recipe) => recipe.idMeal !== payload
      );
      state.favoritedRecipes = filteredList;
      localStorage.setItem('favorites', JSON.stringify(state.favoritedRecipes));
    },
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
      (state, { payload }: PayloadAction<ISingleMeal[]>) => {
        state.searchedRecipes = payload;
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
export const { addToFavorites, removeFromFavorites } = recipesSlice.actions;

//selectors
export const selectSelectedRecipe = (state: RootState) =>
  state.recipes.selectedRecipe;
export const selectIsLoading = (state: RootState) => state.recipes.isLoading;
export const selectHasError = (state: RootState) => state.recipes.hasError;
export const selectFavoritedRecipes = (state: RootState) =>
  state.recipes.favoritedRecipes;
export const selectSearchedRecipes = (state: RootState) =>
  state.recipes.searchedRecipes;

export default recipesSlice.reducer;
