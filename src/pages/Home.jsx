import React from "react";
import styled from "styled-components";
import HomeHistory from "../components/Home/HomeHistory";
import HomeMain from "../components/Home/HomeMain";
import HomePopularReview from "../components/Home/HomePopularReview";
import HomeRecommend from "../components/Home/HomeRecommend";
import HomeReserve from "../components/Home/HomeReserve";
import HomeSearch from "../components/Home/HomeSearch";

import nightImg from "../img/night_star.png" 
import keyimg from "../img/KeyVisual.svg"
import keytext from "../img/CampingZipText.svg"
 
function Home() {
  return (
    <div>
      <SearchVisual>
        <ImgFrame>
          <KeyImg src={keyimg}/>
          <KeyImg src={keytext} />
        </ImgFrame>
        <SearchWindow>
          <HomeSearch />
        </SearchWindow>
      </SearchVisual>
      <HomeMain />
    </div>
  );
}
export default Home;

const SearchVisual = styled.div`
  /* height: 400px; */
  width: 100%;
  position: relative;
  overflow: hidden;
  /* color: ; */
`
const KeyImg = styled.img`
  object-fit: cover;
  object-position: center;
  /* position: absolute; */
  margin: auto;
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 37px;
  margin-bottom: 16px;
`

const SearchWindow = styled.div`
  /* position: absolute;
  top: 178px;
  width: 100%; */
`