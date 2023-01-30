import { configureStore } from "@reduxjs/toolkit"

import contents from "../modules/contentsSlice"
import reserves from "../modules/reservesSlice"

const store = configureStore({
  reducer: { contents ,reserves },
  devTools: process.env.NODE_ENV !== "production",
})

export default store
