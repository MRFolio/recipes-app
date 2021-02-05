import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

const urlCategories: string =
  'https://www.themealdb.com/api/json/v1/1/categories.php';

interface FetchedCategories {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
}

export const getCategories = createAsyncThunk(
  'categories/getCategoriesStatus',
  async () => {
    const response = await fetch(urlCategories);
    const { categories } = await response.json();
    const categoriesFormated = categories.map(
      ({
        idCategory: id,
        strCategory: category,
        strCategoryThumb: img,
      }: FetchedCategories) => ({ id, category, img })
    );
    return categoriesFormated;
    // return categories;
  }
);

export interface ICategory {
  id: string;
  category: string;
  img: string;
}

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
      (state, { payload }: PayloadAction<ICategory>) => {
        state.categories.push(payload);
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

// export const {} = categoriesSlice.actions;
export default categoriesSlice.reducer;
