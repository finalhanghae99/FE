import React from "react";
import styled from "styled-components";
import HomeHistory from "../components/Home/HomeHistory";
import HomeMain from "../components/Home/HomeMain";
import HomePopularReview from "../components/Home/HomePopularReview";
import HomeRecommend from "../components/Home/HomeRecommend";
import HomeReserve from "../components/Home/HomeReserve";
import HomeSearch from "../components/Home/HomeSearch";

import nightImg from "../img/night_star.png" 

function Home() {
  return (
    <div>
      <SearchVisual>
        <ImgFrame>
          <KeyImg src={nightImg}/>
        </ImgFrame>
        <MainMsg>
          어디로 <br /> 떠나고 싶으세요?
        </MainMsg>
        <SearchWindow>
          <HomeSearch color="rgba(255,255,255,0.5)"/>
        </SearchWindow>
      </SearchVisual>
      <HomeMain />
    </div>
  );
}
export default Home;

const SearchVisual = styled.div`
  height: 400px;
  width: 100%;
  background-color: var(--Brand5);
  border-bottom-left-radius: 24px;
  border-bottom-right-radius: 24px;
  position: relative;
  overflow: hidden;
  color: white;
`
const KeyImg = styled.img`
  object-fit: cover;
  width: 100%;
  height: 80%;
  object-position: center;
  position: absolute;
`

const MainMsg = styled.div`
  position: absolute;
  top: 0;
  color: white;
  font-size : 32px;
  font-weight: bold;
  padding-left: 24px;
  padding-top: 87px;
`

const ImgFrame = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  &:after {
    height: 100%;
    content: '';
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    opacity: 1;
    background-image: linear-gradient(0deg, var(--Brand5) 25% , rgba(0,0,0,0) 100%);
  };
`

const SearchWindow = styled.div`
  position: absolute;
  top: 178px;
  width: 100%;
`