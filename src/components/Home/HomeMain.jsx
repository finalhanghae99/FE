import React from "react";
import HomeHistory from "./HomeHistory";
import HomeReserve from "./HomeReserve";
import HomePopularReview from "./HomePopularReview";
import HomeRecommend from "./HomeRecommend";

function HomeMain() {
  return (
    <div>
      <HomeRecommend />
      <HomeReserve />
      <HomePopularReview />
      <HomeHistory />
    </div>
  )
}

export default HomeMain;