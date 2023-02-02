import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { instance } from "../../api/axiosApi";

import Alert from "../../components/elements/Alert";

const initialState = {
  reserves: [],
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
export const __getMyReserves = createAsyncThunk(
  "reserves/getMyAll",
  async (payload, thunkAPI) => {
    try {
      const { data } = await instance.get(`/mypage/reservation`);
      return thunkAPI.fulfillWithValue(data.data.responseSearchDtoList)
    } catch (error) { 
      console.log(error)
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const __delMyReserves = createAsyncThunk(
  "reserves/delete",
  async (payload, thunkAPI) =>{
    try {
      const { data } = await instance.delete(`/reservation/${payload.id}`);
      if(data.statusCode === 200) {
        return thunkAPI.fulfillWithValue(payload.id)
      } else {
        Alert({body: "로그인 정보를 확인 해주세요."})
        return null
      }
    } catch (error) { 
      console.log(error); 
    }
  }
)

export const __compMyReserves = createAsyncThunk(
  "reserves/complete",
  async (payload, thunkAPI) =>{
    try {
      const { data } = await instance.post(`/reservation/changestate/${payload}`);
      if(data.statusCode === 200) {
        return thunkAPI.fulfillWithValue(payload)
      } else {
        Alert({body: "로그인 정보를 확인 해주세요."})
        return null
      }
    } catch (error) { console.log(error); }
  }
)



export const reservesSlice = createSlice({
  name: "reserves",
  initialState,
  reducers: {
    // setInitialError: (state, action) => {
    //   state.error = null;
    // },
  },
  extraReducers: (builder) => {
    builder
      // .addCase(__getContentsAll.pending, (state) => {
      //   state.isLoading = true;
      // })
      // .addCase(__getContentsAll.fulfilled, (state, action) => {
      //   state.isLoading = false;
      //   state.contents = action.payload;
      // })
      // .addCase(__getContentsAll.rejected, (state, action) => {
      //   state.isLoading = false;
      //   state.error = action.payload;
      // })
      .addCase(__getMyReserves.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__getMyReserves.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reserves = action.payload;
      })
      .addCase(__getMyReserves.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(__delMyReserves.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__delMyReserves.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reserves = state.reserves.filter((v) => {
          return v.reservationId !== action.payload
        });
      })
      .addCase(__delMyReserves.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(__compMyReserves.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__compMyReserves.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reserves = state.reserves.map((v => 
          (v.reservationId === action.payload) ? (
            {...v , tradeState : false}
          ) : (
            v
          )
        ))
      })
      .addCase(__compMyReserves.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
  },

});

export const {} = reservesSlice.actions;
export default reservesSlice.reducer;
