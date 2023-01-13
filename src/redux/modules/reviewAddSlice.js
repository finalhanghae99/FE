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
    console.log("payload", payload)
    try {
      const data = await instance.post(`/review`, payload);
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
    builder.addCase(__postreviewadd.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(__postreviewadd.fulfilled, (state, action) => {
      state.isLoading = false;
      state.review = action.payload;
    });
    builder.addCase(__postreviewadd.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default reviewAddSlice.reducer;
