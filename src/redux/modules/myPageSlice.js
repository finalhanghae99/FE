import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "../../api/axiosApi";

const initialState = {
  myInfo: [],
  isLoading: false,
  error: null,
};

export const __getMyInfo = createAsyncThunk(
  "myPage",
  async (payload, thunkAPI) => {
    try {
      const { data }  = await instance.get(`/mypage`);
      return thunkAPI.fulfillWithValue(data.data)
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const myPageSlice = createSlice({
  name: "myPage",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(__getMyInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__getMyInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.myInfo = action.payload;
      })
      .addCase(__getMyInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
  }
})

export const {} = myPageSlice.actions;
export default myPageSlice.reducer;