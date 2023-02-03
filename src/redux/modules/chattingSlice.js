import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { instance } from "../../api/axiosApi";

const initialState = {
  messages: [],
  isLoading: false,
  error: null,
  msg: "",
};

export const __getPrevMsg = createAsyncThunk(
  "chatting/getPrevMsg",
  async (payload, thunkAPI) => {
    try {
      const {data} = await instance.get(`/chat/room/${payload}`);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
)

export const chattingSlice = createSlice({
  name: "chatting",
  initialState,
  reducers: {
    setMessages : (state, action) =>{
      state.messages =[ ...state.messages, action.payload]
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(__getPrevMsg.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__getPrevMsg.fulfilled, (state, action) => {
        state.isLoading = false;
        state.messages = action.payload;
      })
      .addCase(__getPrevMsg.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
  },
});

export const {setMessages} = chattingSlice.actions;
export default chattingSlice.reducer;
