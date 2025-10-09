import { fetchWithAuth } from "@/lib/fetchWithAuth";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk to login
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (credentials: { method?: string; data?: any; headers?: Record<string, string> }, { rejectWithValue }) => {
    try {
      const res = await fetchWithAuth('/api/v1/auth/login', credentials);
      return res;
    } catch (err : any) {
      return rejectWithValue(err);
    }
  }
);

// Thunk to check auth
export const checkAuth = createAsyncThunk(
  "user/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetchWithAuth('/api/v1/auth/check-auth', {
        method: 'POST'
      });
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// Thunk to check auth
export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async(_, {rejectWithValue}) => {
    try {
      const res = await fetchWithAuth('/api/v1/auth/logout', {
        method: 'POST'
      })
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
)

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action : any) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(logoutUser.pending, (state) => {
          state.loading = true;
          state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
          state.loading = false;
          state.user = null;
      })
      .addCase(logoutUser.rejected, (state, action: any) => {
          state.loading = false;
          state.error = action.payload;
          // Still clear user on logout failure (optional, depends on your UX)
          state.user = null;
      })
  },
});

export const {  } = userSlice.actions;
export default userSlice.reducer;
