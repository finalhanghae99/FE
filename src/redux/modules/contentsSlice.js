import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  contents: [],
  isLoading: false,
  error: null,
  msg: "",
};

// export const __getContentsAll = createAsyncThunk(
//   "contents/getAll",
//   async (payload, thunkAPI) => {
//     try {
//       const data = await axiosDB.get("/api/posts");
//       return thunkAPI.fulfillWithValue(data.data.data);
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );

export const contentsSlice = createSlice({
  name: "contents",
  initialState,
  reducers: {
    // setInitialError: (state, action) => {
    //   state.error = null;
    // },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(__getContentsAll.pending, (state) => {
  //       state.isLoading = true;
  //     })
  //     .addCase(__getContentsAll.fulfilled, (state, action) => {
  //       state.isLoading = false;
  //       state.contents = action.payload;
  //     })
  //     .addCase(__getContentsAll.rejected, (state, action) => {
  //       state.isLoading = false;
  //       state.error = action.payload;
  //     })
  // },
});

export const {} = contentsSlice.actions;
export default contentsSlice.reducer;
