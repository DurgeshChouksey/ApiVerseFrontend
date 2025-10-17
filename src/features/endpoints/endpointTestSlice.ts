import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchWithAuth } from "@/lib/fetchWithAuth";

export const testEndpoint = createAsyncThunk(
  "endpoints/testEndpoint",
  async ({ apiId, endpointId, payload, headers }: { apiId: string; endpointId: string; payload: any; headers: any }, thunkAPI) => {
    try {
      const res = await fetchWithAuth(`/api/v1/apis/${apiId}/endpoints/test/${endpointId}`, {
        method: "POST",
        data: payload,
        headers: headers,
      });
      return res;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data || { message: "Something went wrong" });
    }
  }
);

const endpointTestSlice = createSlice({
  name: "endpointTest",
  initialState: {
    loading: false,
    response: null as any,
    error: null as any,
  },
  reducers: {
    clearResponse: (state) => {
      state.response = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(testEndpoint.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(testEndpoint.fulfilled, (state, action) => {
        state.loading = false;
        state.response = action.payload;
      })
      .addCase(testEndpoint.rejected, (state, action) => {
        state.loading = false;
        state.response = null;
        state.error = action.payload;
      });
  },
});

export const { clearResponse } = endpointTestSlice.actions;
export default endpointTestSlice.reducer;
