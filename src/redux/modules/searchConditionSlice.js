import { addListener, createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  keyword : "",
  address1 : "",
  address2 : "",
  isLoading: false,
  error: null,
  msg: "",
};

export const searchConditionSlice = createSlice({
  name: "searchCondition",
  initialState,
  reducers: {
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
});

export const {setKeyword, setAddress1, setAddress2} = searchConditionSlice.actions;
export default searchConditionSlice.reducer;
