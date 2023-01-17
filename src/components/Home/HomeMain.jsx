import React from "react";
import HomeHistory from "./HomeHistory";
import HomeReserve from "./HomeReserve";
import HomePopularReview from "./HomePopularReview";
import HomeRecommend from "./HomeRecommend";

import styled from "styled-components";

function HomeMain() {
  return (
    <div>
      <HomeRecommend />
      <HomeReserve />
      <GrayLine />
      <HomePopularReview />
      <GrayLine />
      <HomeHistory />
    </div>
  )
}

export default HomeMain;

const GrayLine = styled.div`
  background-color: var(--Gray1);
  height: 8px;
  width: 100%;
`