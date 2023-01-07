import React from "react";
import styled from "styled-components";
import { BsPencilFill, BsBookmark } from "react-icons/bs";
import { AiOutlineLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function CampDetailForm() {
  const navigate = useNavigate();

  return (
    <MainDiv>
      <StDiv>
        <img
          width="391"
          height="419"
          src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMDA1MjNfMjc5%2FMDAxNTkwMjE3ODAwNjg5.XwKjMgxDgZbEw2o-16H9v1HQ9yhByTSNQku4DEuJswMg.qnaprXwy7UjDJkyoJ3VfPXR7SXpbH_XSDuakylFjaU0g.JPEG.jjhye0310%2FIMG_1110.jpg&type=sc960_832"
        ></img>
        <BackBtn>
          <AiOutlineLeft />
        </BackBtn>
        <Mark>
          <BsBookmark />
        </Mark>
      </StDiv>
      <SuvDiv>
        <CampName>안성 용설호수 캠핑장</CampName>
        <Address>경기도 안성시 죽산면 용설호수길 234</Address>
        <SDiv>
          <div>031-123-4567</div>
          <div>홈페이지 바로가기</div>
        </SDiv>
      </SuvDiv>
      <Environment>
        <div>캠핑장 환경</div>
        <Ele>해변</Ele>
        <div>캠핑 유형</div>
        <Ele>카라반</Ele>
        <div>캠핑장 시설 정보</div>
        <Ele>전기</Ele>
        <div>주변 이용가능 시설</div>
        <Ele>해수욕</Ele>
      </Environment>
      <Map>
        <div>위치</div>
        <Mapp>MAP</Mapp>
      </Map>
      <Post>
        <Review>
          <div>후기</div>
          <ReviewBtn
            onClick={() => {
              navigate(`/reviewadd`);
            }}
          >
            <BsPencilFill />
          </ReviewBtn>
          <AllBtn onClick={()=>{navigate(`/reviewlist`)}}>전체보기</AllBtn>
        </Review>
        <PostBox>
          <Pic>후기사진</Pic>
          <Comm>
            <ComDiv>
              <div>캠퍼 김씨</div>
              <div>2023.1.4</div>
            </ComDiv>
            <Ment>
              캠핑장이 깨끗하고 정말 좋아요. 캠핑장이 깨끗하고 정말 좋아요.
              캠핑장이 깨끗하고 정말 좋아요.
            </Ment>
          </Comm>
        </PostBox>
      </Post>
    </MainDiv>
  );
}
export default CampDetailForm;

const MainDiv = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const StDiv = styled.div`
  background-color: grey;
  width: 391px;
  height: 419px;
`;

const BackBtn = styled.button`
  background-color: white;
  border: 1px solid white;
`;

const Mark = styled.button`
  background-color: white;
  border: 1px solid white;
`;

const SuvDiv = styled.div`
  width: 336px;
  padding: 23px 0px 21px 0px;
  border-bottom: 1px solid #d8d8d8;
`;
const SDiv = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #626262;
`;

const CampName = styled.div`
  font-size: 18px;
  color: #000000;
`;

const Address = styled.div`
  padding: 6px 0px 2px 0px;
  font-size: 14px;
  color: #626262;
`;

const Environment = styled.div`
  width: 336px;
  padding: 19px 0px 15px 0px;
  border-bottom: 1px solid #d8d8d8;
`;

const Ele = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 54px;
  height: 29px;
  left: 27px;
  top: 575px;
  margin: 10px 0px 10px 0px;
  font-size: 14px;
  padding: 6px 14px;
  gap: 6px;
  border-radius: 20px;
  border: 1px solid #aaaaaa;
`;

const Map = styled.div`
  width: 336px;
  padding-top: 15px;
  border-bottom: 1px solid #d8d8d8;
`;

const Mapp = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: grey;
  margin: 17px 0px 33px 0px;
  width: 336px;
  height: 168px;
`;

const Post = styled.div`
  width: 336px;
  padding-top: 15px;
`;

const PostBox = styled.div`
  width: 335px;
  height: 277px;
  margin: 13px 0px 0px 0px;
`;

const Pic = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 335px;
  height: 158px;
  background-color: grey;
`;

const Comm = styled.div`
  width: 335px;
  height: 150px;
  border: 1px solid #b5b5b5;
`;

const ComDiv = styled.div`
  width: 291px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 25px 0px 0px 21px;
`;

const Ment = styled.div`
  width: 291px;
  margin: 25px 0px 15px 21px;
`;

const Review = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ReviewBtn = styled.button`
  margin-left: 200px;
  background-color: white;
  border: 1px solid white;
`;

const AllBtn = styled.button`
  background-color: white;
  border: 1px solid white;
`