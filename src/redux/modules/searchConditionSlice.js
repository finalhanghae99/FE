import { addListener, createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  keyword : "",
  address1 : "",
  address2 : "",
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

export const searchConditionSlice = createSlice({
  name: "searchCondition",
  initialState,
  reducers: {
    // setInitialError: (state, action) => {
    //   state.error = null;
    // },
    setKeyword : (state, action) =>{
      state.keyword = action.payload
    },    
    setAddress1 : (state, action) =>{
      state.address1 = action.payload
    },    
    setAddress2 : (state, action) =>{
      state.address2 = action.payload
    }
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

export const {setKeyword, setAddress1, setAddress2} = searchConditionSlice.actions;
export default searchConditionSlice.reducer;
