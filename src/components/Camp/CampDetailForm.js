import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BsPencilFill, BsBookmark } from "react-icons/bs";
import { AiOutlineLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { instance } from "../../api/axiosApi";

function CampDetailForm() {
  const navigate = useNavigate();
  const [campDetail, setCampDetail] = useState();

  const fetchCampDetail = async () => {
    try {
      const { data } = await instance.get("campdetail");
      if (data.statusCode === 200) {
        return setCampDetail(data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(campDetail);

  useEffect(() => {
    fetchCampDetail();
  }, []);

  return (
    <MainDiv>
      <StDiv>
        <img width="391" height="419" src={campDetail?.imageUrl}></img>
        <BackBtn>
          <AiOutlineLeft />
        </BackBtn>
        <Mark>
          <BsBookmark />
        </Mark>
      </StDiv>
      <SuvDiv>
        <CampName>{campDetail?.campingName}</CampName>
        <Address>{campDetail?.address1}</Address>
        <SDiv>
          <div>{campDetail?.phoneNumber}</div>
          <a href={campDetail?.homepageUrl}>홈페이지 바로가기</a>
        </SDiv>
      </SuvDiv>
      <Environment>
        <div>캠핑장 환경</div>
        <EleDiv>
          {campDetail?.CampingEnv.map((a) => {
            return <Ele>{a}</Ele>;
          })}
        </EleDiv>
        <div>캠핑 유형</div>
        <EleDiv>
          {campDetail?.CampingType.map((b) => {
            return <Ele>{b}</Ele>;
          })}
        </EleDiv>
        <div>캠핑장 시설 정보</div>
        <EleDiv>
          {campDetail?.CampingFac.map((c) => {
            return <Ele>{c}</Ele>;
          })}
        </EleDiv>
        <div>주변 이용가능 시설</div>
        <EleDiv>
          {campDetail?.CampingSurroundFac.map((d) => {
            return <Ele>{d}</Ele>;
          })}
        </EleDiv>
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
          <AllBtn
            onClick={() => {
              navigate(`/reviewlist`);
            }}
          >
            전체보기
          </AllBtn>
        </Review>
        {campDetail?.reviewList?.map((a) => {
          return (
            <PostBox key={a.id}>
              <Pic>
                <img src={a?.url} width="335" height="158"></img>
              </Pic>
              <Comm>
                <ComDiv>
                  <div>{a.nickname}</div>
                  <div>{a.modifiedAt}</div>
                </ComDiv>
                <Ment>{a.content}</Ment>
              </Comm>
            </PostBox>
          );
        })}
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

const EleDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 5px;
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
  height: 270px;
  margin: 13px 0px 60px 0px;
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
  width: 333px;
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
`;
