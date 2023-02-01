import { configureStore } from "@reduxjs/toolkit"

import contents from "../modules/contentsSlice"
import reserves from "../modules/reservesSlice"
import myReviews from "../modules/myReviewsSlice"
import searchCondition from "../modules/searchConditionSlice"

const store = configureStore({
  reducer: { contents ,reserves , myReviews, searchCondition},
  devTools: process.env.NODE_ENV !== "production",
})

export default store
