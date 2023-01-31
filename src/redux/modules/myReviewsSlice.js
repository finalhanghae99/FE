import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { instance } from "../../api/axiosApi";

import Alert from "../../components/elements/Alert";

const initialState = {
  myReviews: [],
  isLoading: false,
  error: null,
  msg: "",
};

export const __getMyReviews = createAsyncThunk(
  "myReviews/getMyAll",
  async (payload, thunkAPI) => {
    try {
      const { data } = await instance.get(`/mypage/review`);
      console.log(data)
      return thunkAPI.fulfillWithValue(data.data.responseReviewOneDtoList)
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const __delMyReviews = createAsyncThunk(
  "myReviews/delete",
  async (payload, thunkAPI) => {
    try {
      const {data} = await instance.delete(`/review/${payload}`);
      if (data.statusCode === 200) {
        return thunkAPI.fulfillWithValue(payload)
      } else {
        Alert({ body: "로그인 정보를 확인 해주세요." })
        return null
      }
    } catch (error) {
      console.log(error);
    }
  }
)

export const myReviewsSlice = createSlice({
  name: "myReviews",
  initialState,
  reducers: {
    // setInitialError: (state, action) => {
    //   state.error = null;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(__getMyReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__getMyReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.myReviews = action.payload;
      })
      .addCase(__getMyReviews.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(__delMyReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__delMyReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.myReviews = state.myReviews.filter((v) => {
          return v.reviewId !== action.payload
        });
      })
      .addCase(__delMyReviews.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
  },
});

export const { } = myReviewsSlice.actions;
export default myReviewsSlice.reducer;
