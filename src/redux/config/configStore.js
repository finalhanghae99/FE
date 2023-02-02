import { configureStore } from "@reduxjs/toolkit"

import contents from "../modules/contentsSlice"
import reserves from "../modules/reservesSlice"
import myReviews from "../modules/myReviewsSlice"
import chatting from "../modules/chattingSlice"
import searchCondition from "../modules/searchConditionSlice"
import myInfo from "../modules/myPageSlice"
import review from "../modules/reviewAddSlice"

const store = configureStore({
  reducer: { contents ,reserves , myReviews, searchCondition, myInfo ,chatting, review},

  devTools: process.env.NODE_ENV !== "production",
})

export default store
