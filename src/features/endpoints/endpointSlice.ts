import { fetchWithAuth } from "@/lib/fetchWithAuth";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// to fetch endpoint's for an api

// to fetch my api's
export const getEndpoints = createAsyncThunk(
  "endpoints/getEndpoints",
  async ({apiId, filter} : any, { rejectWithValue }) => {
    try {
      const res = await fetchWithAuth(`/api/v1/apis/${apiId}/endpoints?filter=${filter}`);
      return res;
    } catch (err : any) {
      return rejectWithValue(err);
    }
  }
);

const endpointSlice = createSlice({
    name: "endpoints",
    initialState: {
        filter: "",
        laoding: true,
        data: [],
        error: null
    },
    reducers: {
        setFilter: (state, action) => {
        state.filter = action.payload;
      }
    },
    extraReducers: (builder) => {
      builder
        .addCase(getEndpoints.fulfilled, (state, action) => {
          state.data = action.payload || [];
        })
    }
})

export const { setFilter } = endpointSlice.actions;
export default endpointSlice.reducer;
