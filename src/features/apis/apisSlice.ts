import { fetchWithAuth } from "@/lib/fetchWithAuth";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// to fetch public api's
export const publicApis = createAsyncThunk(
  "apis/publicApis",
  async ({page, sort, filter} : any, { rejectWithValue }) => {
    try {
      const res = await fetchWithAuth(`/api/v1/apis?page=${page}&sort=${sort}&filter=${filter}`);
      console.log(res)
      return res;
    } catch (err : any) {
      return rejectWithValue(err);
    }
  }
);

// to fetch my api's
export const myApis = createAsyncThunk(
  "apis/myApis",
  async ({page, sort, filter} : any, { rejectWithValue }) => {
    try {
      const res = await fetchWithAuth(`/api/v1/apis/my?page=${page}&sort=${sort}&filter=${filter}`);
      return res;
    } catch (err : any) {
      return rejectWithValue(err);
    }
  }
);

// to fetch subscribed api's
export const subscribedApis = createAsyncThunk(
  "apis/subscribedApis",
  async ({page, sort, filter} : any, { rejectWithValue }) => {
    try {
      const res = await fetchWithAuth(`/api/v1/apis/subscribed?page=${page}&sort=${sort}&filter=${filter}`);
      return res;
    } catch (err : any) {
      return rejectWithValue(err);
    }
  }
);

// to fetch bookmarks api's
export const bookmarkedApis = createAsyncThunk(
  "apis/bookmarkedApis",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetchWithAuth(`/api/v1/apis/bookmarks`);
      return res;
    } catch (err : any) {
      return rejectWithValue(err);
    }
  }
);


const apisSlice = createSlice({
    name: "apis",
    initialState: {
      filter: "",
      loading: false,
      data: null,
      error: null
    },
    reducers: {
      setFilter: (state, action) => {
        state.filter = action.payload;
      }
    },
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
                state.data = action.payload;
            })
            .addCase(subscribedApis.fulfilled, (state, action) => {
                state.data = action.payload;
            })
            .addCase(bookmarkedApis.fulfilled, (state, action) => {
                state.data = action.payload;
            })
    }
})


export const { setFilter } = apisSlice.actions;
export default apisSlice.reducer;
