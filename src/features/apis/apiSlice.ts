import { fetchWithAuth } from "@/lib/fetchWithAuth";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// to fetch public api's
export const publicApis = createAsyncThunk(
  "apis/publicApis",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetchWithAuth('/api/v1/apis');
      return res;
    } catch (err : any) {
      return rejectWithValue(err);
    }
  }
);

// to fetch my api's
export const myApis = createAsyncThunk(
  "apis/myApis",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetchWithAuth('/api/v1/apis/my');
      return res;
    } catch (err : any) {
      return rejectWithValue(err);
    }
  }
);

// to fetch bookmarks api's


const apiSlice = createSlice({
    name: "apis",
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(publicApis.fulfilled, (state, action) => {
                state = action.payload;
            })
            .addCase(myApis.fulfilled, (state, action) => {
                state = action.payload;
            })
    }
})


export const { } = apiSlice.actions;
export default apiSlice.reducer;
