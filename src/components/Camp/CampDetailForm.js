import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom";
import { instance } from "../../api/axiosApi";
import { getCookies, setCookies } from "../../api/cookieControler";
import Alert from "../elements/Alert";
import bmkFill from "../../img/icons/bmkFill.svg";
import bmkLine from "../../img/icons/bmkLine.svg";
import CampImgView from "../elements/CampImgView";
import DetailMap from "../KakaoMap/DetailMap";
import LikeListElement from "../Review/LikeListElement";
import { ItemBox } from "../elements/ItemBox";
import Button from "../elements/Button";

function CampDetailForm() {
  const navigate = useNavigate();

  const [campDetail, setCampDetail] = useState();
  const [reviewList, setReviewList] = useState();
  const { id } = useParams();

  const [isBMK, setIsBMK] = useState();
  const clickBMK = async (id) => {
    const token = getCookies("id");
    if (!token) {
      Alert({ body: "로그인이 필요 합니다." });
      return;
    }
    try {
      const { data } = await instance.post(`/camping/${id}/like`);
      console.log(data);
      setIsBMK(!isBMK);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchCampDetail = async () => {
    try {
      const { data } = await instance.get(`/camping/permit/${id}`);
      if (data.statusCode === 200) {
        return setCampDetail(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchReviewDetail = async () => {
    try {
      const { data } = await instance.get(`/reviewlookup/listfive/${id}`);
      if (data.statusCode === 200) {
        return setReviewList(data.data.responseReviewListDtos);
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(campDetail);
  useEffect(() => {
    // 캠핑장 열람 이력 저장
    let history = getCookies("history");
    if (history === undefined) history = [];
    history = history.filter((v) => {
      return v !== id;
    });
    history.unshift(id);
    history.splice(10);
    setCookies("history", history, {
      path: "/",
      maxAge: 604800,
    });
    fetchCampDetail();
    fetchReviewDetail();
  }, []);

  useEffect(() => {
    setIsBMK(campDetail?.campingLikeState);
  }, [campDetail]);

  const position = {
    lat: Number(campDetail?.mapY),
    lng: Number(campDetail?.mapX),
  };

  const moreNavigate = () => {
    if (reviewList.length === 0) {
      Alert({ body: "리뷰 정보가 없습니다" });
      return;
    } else {
      navigate(`/reviewlist/${id}`);
    }
  };

  return (
    <MainDiv>
      <StDiv>
        <div style={{ position: "relative", height: "414px" }}>
          {campDetail?.imageUrl ? (
            <CampImgView img={campDetail?.imageUrl} />
          ) : (
            <div style={{ textAlign: "center", lineHeight: "414px" }}>
              이미지를 준비중이에요.
            </div>
          )}
          <BookmarkBtn onClick={() => clickBMK(id)}>
            {isBMK ? <img src={bmkFill} /> : <img src={bmkLine} />}
          </BookmarkBtn>
        </div>
      </StDiv>
      <SuvDiv>
        <CampName>{campDetail?.campingName}</CampName>
        <Address>{campDetail?.address3}</Address>
        <SDiv>
          <div>{campDetail?.phoneNumber}</div>
          {campDetail?.homepageUrl === "" ? (
            ""
          ) : campDetail?.homepageUrl.startsWith("http") ? (
            <a href={campDetail?.homepageUrl} target="_blank">
              홈페이지 바로가기
            </a>
          ) : (
            <a href={"http://" + campDetail?.homepageUrl} target="_blank">
              홈페이지 바로가기
            </a>
          )}
        </SDiv>
      </SuvDiv>
      <Environment>
        <EleName>캠핑장 환경</EleName>
        <EleDiv>
          {campDetail?.campingEnv.map((a, i) => {
            return <Ele key={i}>{a}</Ele>;
          })}
        </EleDiv>
        <EleName>캠핑 유형</EleName>
        <EleDiv>
          {campDetail?.campingType.map((b, i) => {
            return <Ele key={i}>{b}</Ele>;
          })}
        </EleDiv>
        <EleName>캠핑장 시설 정보</EleName>
        <EleDiv>
          {campDetail?.campingFac.map((c, i) => {
            return <Ele key={i}>{c}</Ele>;
          })}
        </EleDiv>
        <EleName>주변 이용가능 시설</EleName>
        <EleDiv2>
          {campDetail?.campingSurroundFac.map((d, i) => {
            return <Ele key={i}>{d}</Ele>;
          })}
        </EleDiv2>
      </Environment>
      <Map>
        <MapName>위치</MapName>
        {campDetail && (
          <MapDiv>
            <DetailMap
              campingName={campDetail?.campingName}
              position={position}
            />
          </MapDiv>
        )}
        <Address2>{campDetail?.address3}</Address2>
      </Map>
      <ItemBox>
        <Review>
          <div>리뷰({campDetail?.reviewList.length})</div>
          <div>
            <ReviewBtn
              onClick={() => {
                navigate(`/reviewadd`);
              }}
            >
              <HiOutlinePencilAlt />
            </ReviewBtn>
          </div>
        </Review>
        {reviewList?.map((v) => {
          return (
            <ReviewBox key={v.reviewId}>
              <LikeListElement review={v} />
            </ReviewBox>
          );
        })}
      </ItemBox>
      <Button
        onClick={() => {
          moreNavigate();
        }}
      >
        전체보기
      </Button>
    </MainDiv>
  );
}
export default CampDetailForm;

const MainDiv = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  font-family: var(--font);
`;

const StDiv = styled.div`
  width: 100%;
`;

const SuvDiv = styled.div`
  width: 100%;
  border-bottom: 8px solid #e1e1e1;
`;
const SDiv = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #999999;
  margin: 12px 24px 24px 24px;
`;

const CampName = styled.div`
  margin: 24px 24px 0px 24px;
  font-size: 18px;
  font-weight: 700;
  color: #000000;
`;

const Address = styled.div`
  margin: 9px 0px 0px 24px;
  font-size: 14px;
  color: #343333;
`;

const Address2 = styled.div`
  font-size: 14px;
  font-weight: 400;
  margin: 12px 0px 24px 24px;
`;

const Environment = styled.div`
  width: 100%;
  border-bottom: 8px solid #d8d8d8;
  margin-top: 12px;
`;

const EleName = styled.div`
  margin: 12px 24px 0px 24px;
  font-size: 16px;
  font-weight: 500;
  color: #000000;
`;

const EleDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0px 24px 0px 24px;
  gap: 8px;
`;

const EleDiv2 = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0px 24px 24px 24px;
  gap: 8px;
`;

const Ele = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 29px;
  margin: 10px 0px 5px 0px;
  font-size: 14px;
  padding: 1px 12px;
  gap: 8px;
  border-radius: 24px;
  background-color: var(--BackColor2);
`;

const Map = styled.div`
  width: 100%;
  border-bottom: 8px solid #e1e1e1;
`;

const MapName = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #000000;
  margin: 24px 0px 20px 24px;
`;

const MapDiv = styled.div`
  margin: 0px 24px 0px 24px;
  border-radius: 8px;
  overflow: hidden;
`;

const Review = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;

const ReviewBtn = styled.button`
  background-color: white;
  border: white;
  font-size: 25px;
  margin-top: var(--pad1);
`;

const BookmarkBtn = styled.div`
  position: absolute;
  color: white;
  top: 20px;
  right: 20px;
  font-size: 30px;
  filter: drop-shadow(10px 10px 10px 10px green);
  z-index: 5;
`;

const ReviewBox = styled.div`
  margin-top: var(--interval);
`;
