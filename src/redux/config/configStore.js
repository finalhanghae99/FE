import { configureStore } from "@reduxjs/toolkit"

import contents from "../modules/contentsSlice"
import reserves from "../modules/reservesSlice"
import myReviews from "../modules/myReviewsSlice"


const store = configureStore({
  reducer: { contents ,reserves , myReviews},
  devTools: process.env.NODE_ENV !== "production",
})

export default store
