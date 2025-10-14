import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchWithAuth } from "@/lib/fetchWithAuth";

interface SubscriptionState {
  isSubscribed: boolean | null;
  isOwner: boolean;
  apiKey: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: SubscriptionState = {
  isSubscribed: null,
  isOwner: false,
  apiKey: null,
  loading: false,
  error: null,
};

// ✅ Check subscription
export const checkSubscription = createAsyncThunk(
  "subscription/checkSubscription",
  async (apiId: string, { rejectWithValue }) => {
    try {
      const res = await fetchWithAuth(`/api/v1/apis/${apiId}/subscribed`);
      return res;
    } catch (err: any) {
      return rejectWithValue(err);
    }
  }
);

// ✅ Subscribe to API
export const subscribeToApi = createAsyncThunk(
  "subscription/subscribeToApi",
  async ({ apiId, plan }: { apiId: string; plan: string }, { rejectWithValue }) => {
    try {
      const res = await fetchWithAuth(`/api/v1/apis/${apiId}/subscribe`, {
        method: "POST",
        data: {plan}
      });
      return res;
    } catch (err: any) {
      return rejectWithValue(err);
    }
  }
);

// ✅ Get API key
export const getApiKey = createAsyncThunk(
  "subscription/getApiKey",
  async (apiId: string, { rejectWithValue }) => {
    try {
      const res = await fetchWithAuth(`/api/v1/apis/${apiId}/apikey`);
      return res;
    } catch (err: any) {
      return rejectWithValue(err);
    }
  }
);

// ✅ Generate new API key
export const generateApiKey = createAsyncThunk(
  "subscription/generateApiKey",
  async (apiId: string, { rejectWithValue }) => {
    try {
      const res = await fetchWithAuth(`/api/v1/apis/${apiId}/apikey`, {
        method: "POST",
      });
      return res;
    } catch (err: any) {
      return rejectWithValue(err);
    }
  }
);

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {
    resetSubscriptionState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkSubscription.pending, (state) => {
        state.loading = true;
        state.apiKey = null;
      })
      .addCase(checkSubscription.fulfilled, (state, { payload }) => {
        state.loading = false;
        if (payload.isOwner) {
          state.isOwner = true;
          state.isSubscribed = false;
          state.apiKey = payload.apiKey;
        } else {
          state.isSubscribed = !!payload.isSubscribed;
          state.apiKey = payload.apiKey;
        }
      })
      .addCase(checkSubscription.rejected, (state, action : any) => {
        state.loading = false;
        state.isSubscribed = false;
        state.error = action.payload;
        state.apiKey = null;
      })
      .addCase(subscribeToApi.fulfilled, (state) => {
        state.isSubscribed = true;
      })
      .addCase(getApiKey.fulfilled, (state, { payload }) => {
        state.apiKey = payload;
      })
      .addCase(generateApiKey.fulfilled, (state, { payload }) => {
        state.apiKey = payload;
      });
  },
});

export const { resetSubscriptionState } = subscriptionSlice.actions;
export default subscriptionSlice.reducer;
