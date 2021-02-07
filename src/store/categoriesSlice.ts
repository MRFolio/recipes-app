import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { ICategory } from './types';

const urlCategories: string =
  'https://www.themealdb.com/api/json/v1/1/categories.php';

interface FetchedCategory {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
}

export const getCategories = createAsyncThunk(
  'categories/getCategories',
  async () => {
    const response = await fetch(urlCategories);
    const { categories } = await response.json();
    const formatedCategories = categories
      .sort((a: FetchedCategory, b: FetchedCategory) =>
        a.strCategory.localeCompare(b.strCategory)
      )
      .map(
        ({
          idCategory: id,
          strCategory: category,
          strCategoryThumb: img,
        }: FetchedCategory) => ({
          id,
          category,
          img,
        })
      );
    return formatedCategories;
  }
);

interface CategoriesState {
  categories: ICategory[];
  isLoading: boolean;
  hasError: boolean;
}

const initialState: CategoriesState = {
  categories: [],
  isLoading: false,
  hasError: false,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
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
  },
});

//actions

// export const {} = categoriesSlice.actions;

// selectors
export const selectCategories = (state: RootState) => state.categories;
export const selectLoading = (state: RootState) => state.categories.isLoading;

//reducer
export default categoriesSlice.reducer;
