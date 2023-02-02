import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "../../api/axiosApi";

const initialState = {
  profile: [],
  isLoading: false,
  error: null,
};

export const __putProfile = createAsyncThunk(
  "profileput",
  async (payload, thunkAPI) => {
    console.log("payload", payload);
    try {
      const data = await instance.put(`/mypage/update`, payload.data, {
        headers: { "Content-Type": `multipart/form-data` },
      });
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue("error");
    }
  }
);

const profileSlice = createSlice({
  name: "profileput",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(__putProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__putProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;
      })
      .addCase(__putProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
    }
})

export default profileSlice.reducer;