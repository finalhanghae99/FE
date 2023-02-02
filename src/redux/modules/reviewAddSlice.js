import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "../../api/axiosApi";

const initialState = {
  review: [],
  isLoading: false,
  error: null,
};

export const __postreviewadd = createAsyncThunk(
  "reviewadd",
  async (payload, thunkAPI) => {
    try {
      const data = await instance.post(`/review/${payload.id}`, payload.data, {
        headers: { "Content-Type": `multipart/form-data` },
      });
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue("error");
    }
  }
);

export const __putreviewadd = createAsyncThunk(
  "reviewput",
  async (payload, thunkAPI) => {
    try {
      const data = await instance.put(`/review/${payload.id}`, payload.data, {
        headers: { "Content-Type": `multipart/form-data` },
      });
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue("error");
    }
  }
);

const reviewAddSlice = createSlice({
  name: "reviewadd",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(__postreviewadd.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__postreviewadd.fulfilled, (state, action) => {
        state.isLoading = false;
        state.review = action.payload;
      })
      .addCase(__postreviewadd.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(__putreviewadd.fulfilled, (state, action) => {
        state.isLoading = false;
        state.review = action.payload;
      });
  },
});

export default reviewAddSlice.reducer;
