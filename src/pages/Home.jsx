import React from "react";
import HomeHistory from "../components/Home/HomeHistory";
import HomePopularReview from "../components/Home/HomePopularReview";
import HomeRecommend from "../components/Home/HomeRecommend";
import HomeReserve from "../components/Home/HomeReserve";
import HomeSearch from "../components/Home/HomeSearch";

function Home() {
  return (
    <div>
      <HomeSearch />
      <HomeRecommend />
      <HomeReserve />
      <HomePopularReview />
      <HomeHistory />
    </div>
  )
}
export default Home;