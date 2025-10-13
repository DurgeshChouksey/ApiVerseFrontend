import { fetchWithAuth } from "@/lib/fetchWithAuth";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getApi = createAsyncThunk(
    "/api/getApi",
    async ({apiId} : any, {rejectWithValue}) => {
        try {
            const res = await fetchWithAuth(`/api/v1/apis/${apiId}`);
            return res;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)


const apiSlice = createSlice({
    name: 'api',
    initialState: {
        loading: true,
        data: null,
        error: null
    },
    reducers: {

    },
    extraReducers : (builder) => {
        builder
            .addCase(getApi.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
    }
})


export const {} = apiSlice.actions;
export default apiSlice.reducer;
