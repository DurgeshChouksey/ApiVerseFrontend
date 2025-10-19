import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface SearchState {
  filter: string;
}

const initialState: SearchState = {
  filter: '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<string>) => {
      state.filter = action.payload;
    },
    clearFilter: (state) => {
      state.filter = '';
    },
  },
});

export const { setFilter, clearFilter } = searchSlice.actions;
export default searchSlice.reducer;
