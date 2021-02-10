import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getLocalStorage } from '../utils/localStorageHelper';
import { RootState } from './store';
import { ICategory, ICategoryMeal } from './types';

const urlAllCategories: string =
  'https://www.themealdb.com/api/json/v1/1/categories.php';

const urlCategoryMeals: string =
  'https://www.themealdb.com/api/json/v1/1/filter.php?c=';

interface IFetchedCategory {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
}

export const getCategories = createAsyncThunk(
  'categories/getCategories',
  async () => {
    const response = await fetch(urlAllCategories);
    const { categories } = await response.json();
    const formatedCategories: ICategory[] = categories
      .sort((a: IFetchedCategory, b: IFetchedCategory) =>
        a.strCategory.localeCompare(b.strCategory)
      )
      .map(
        ({
          idCategory: id,
          strCategory: category,
          strCategoryThumb: img,
        }: IFetchedCategory) => ({
          id,
          category,
          img,
        })
      );
    return formatedCategories;
  }
);

interface IFetchedMeals {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export const getCategoryMeals = createAsyncThunk(
  'categories/getCategoryMeals',
  async (category: string) => {
    const response = await fetch(urlCategoryMeals + category);
    const { meals } = await response.json();
    const formatedMeals: ICategoryMeal[] = meals
      /* .sort((a: FetchedMeals, b: FetchedMeals) =>
        a.strMeal.localeCompare(b.strMeal)
      ) */
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

interface CategoriesState {
  categories: ICategory[];
  isLoading: boolean;
  hasError: boolean;
  selectedCategory: string | null;
  selectedCategoryMeals?: ICategoryMeal[];
}

const initialState: CategoriesState = {
  categories: [],
  isLoading: false,
  hasError: false,
  selectedCategory: getLocalStorage('category'),
  selectedCategoryMeals: undefined,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setSelectedCategory(state, { payload }: PayloadAction<string>) {
      state.selectedCategory = payload;
      localStorage.setItem('category', payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCategories.pending, (state) => {
      state.isLoading = true;
      state.hasError = false;
    });
    builder.addCase(
      getCategories.fulfilled,
      (state, { payload }: PayloadAction<ICategory[]>) => {
        state.categories = payload;
        state.isLoading = false;
        state.hasError = false;
      }
    );
    builder.addCase(getCategories.rejected, (state) => {
      state.isLoading = false;
      state.hasError = true;
    });
    builder.addCase(getCategoryMeals.pending, (state) => {
      state.isLoading = true;
      state.hasError = false;
    });
    builder.addCase(
      getCategoryMeals.fulfilled,
      (state, { payload }: PayloadAction<ICategoryMeal[]>) => {
        state.selectedCategoryMeals = payload;
        state.isLoading = false;
        state.hasError = false;
      }
    );
    builder.addCase(getCategoryMeals.rejected, (state) => {
      state.isLoading = false;
      state.hasError = true;
    });
  },
});

//actions
export const { setSelectedCategory } = categoriesSlice.actions;

// selectors
export const selectCategories = (state: RootState) => state.categories;
export const selectLoading = (state: RootState) => state.categories.isLoading;
export const selectHasError = (state: RootState) => state.categories.hasError;
export const selectSelectedCategory = (state: RootState) =>
  state.categories.selectedCategory;
export const selectSelectedCategoryMeals = (state: RootState) =>
  state.categories.selectedCategoryMeals;

//reducer
export default categoriesSlice.reducer;
