import { fetchWithAuth } from "@/lib/fetchWithAuth";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// to fetch public api's
export const publicApis = createAsyncThunk(
  "apis/publicApis",
  async ({page, sort} : any, { rejectWithValue }) => {
    try {
      const res = await fetchWithAuth(`/api/v1/apis?page=${page}&sort=${sort}`);
      return res;
    } catch (err : any) {
      return rejectWithValue(err);
    }
  }
);

// to fetch my api's
export const myApis = createAsyncThunk(
  "apis/myApis",
  async ({page, sort} : any, { rejectWithValue }) => {
    try {
      const res = await fetchWithAuth(`/api/v1/apis/my?page=${page}&sort=${sort}`);
      return res;
    } catch (err : any) {
      return rejectWithValue(err);
    }
  }
);

// to fetch bookmarks api's


const apiSlice = createSlice({
    name: "apis",
    initialState: {
      loading: false,
      data: null,
      error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(publicApis.pending, (state) => {
              state.loading = true;
              state.error = null;
            })
            .addCase(publicApis.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(publicApis.rejected, (state, action: any) => {
              state.loading = false;
              state.error = action.payload;
              state.data = null;
            })
            .addCase(myApis.fulfilled, (state, action) => {
                state = action.payload;
            })
    }
})


export const { } = apiSlice.actions;
export default apiSlice.reducer;
