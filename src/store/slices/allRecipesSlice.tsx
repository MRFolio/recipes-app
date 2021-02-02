import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AllRecipesState {
  value: number;
}

const initialState = { value: 0 } as AllRecipesState;

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
});

export const {
  increment,
  decrement,
  incrementByAmount,
} = allRecipesSlice.actions;
export default allRecipesSlice.reducer;
