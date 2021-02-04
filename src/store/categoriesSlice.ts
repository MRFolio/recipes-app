import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

const urlCategories: string =
  'https://www.themealdb.com/api/json/v1/1/categories.php';

const getCategories = createAsyncThunk('categories/getCategories', async () => {
  const response = await fetch(urlCategories);
  const data = await response.json();
  return data;
  //   dispatch(todoSlice.actions.addTodo(newTodo))
});

interface ICategories {
  id: string;
  category: string;
  img: string;
}

interface CategoriesState {
  categories: ICategories[];
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
      (state, { payload }: PayloadAction<ICategories>) => {
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
