import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { instance } from "../../api/axiosApi";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Button from "../elements/Button";

const ReviewDetailForm = () => {
  const [reviewDetail, setReviewDetail] = useState();
  const param = useParams();
  const navigate = useNavigate();

  const settings = {
    dots: true, // 슬라이더 밑에 버튼
    Infinity: true, // 컨텐츠가 끝까지 갔을 때 무한으로 반복
    speed: 500, // 컨텐츠 넘어가는 속도 500ms
    slidersToShow: 1, // 보이는 컨텐츠 개수 1개
    slidesToScroll: 1, // 한번에 넘어가는 컨텐츠 수 1개
    centerPadding: "0px",
    // centerMode: true,
    arrows: false,
    // variableWidth: false
  };

  const fetchreviewDetail = async () => {
    try {
      const { data } = await instance.get(`/review/reviewone/${param.id}`);
      console.log(data);
      if (data.statusCode === 200) {
        return setReviewDetail(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(reviewDetail);

  const onDeleteReview = async () => {
    try {
      const data = await instance.delete(`/review/${param.id}`);
      console.log(data);
      if (data.data.statusCode === 401) {
        alert("삭제 권한이 없습니다.");
      } else if (data.data.statusCode === 200) {
        alert("삭제 완료!");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const starRender = (score) => {
    let stars = "";
    for (let i = 0; i < score; i++) {
      stars += "★";
    }
    return stars;
  };

  useEffect(() => {
    fetchreviewDetail();
  }, []);

  return (
    <MainDiv>
      <StyledSlider {...settings}>
        {reviewDetail?.reviewUrlList.map((a, i) => {
          return <Pic key={i} src={a}></Pic>;
        })}
      </StyledSlider>
      <Title>
        <Pro></Pro>
        <Nick>{reviewDetail?.nickname}</Nick>
        <Date>{reviewDetail?.modifiedAt.slice(0, 10)}</Date>
      </Title>
      <Suv>
        <CampName>{reviewDetail?.campingName}</CampName>
      </Suv>
      <Stars>
        <StarBox>
          <NameDiv>정보일치</NameDiv>
          <Star>({reviewDetail?.score1})</Star>
          <Starr>{starRender(reviewDetail?.score1)}</Starr>
        </StarBox>
        <StarBox2>
          <NameDiv>편의시설</NameDiv>
          <Star>({reviewDetail?.score2})</Star>
          <Starr>{starRender(reviewDetail?.score2)}</Starr>
        </StarBox2>
        <StarBox2>
          <NameDiv>관리상태</NameDiv>
          <Star>({reviewDetail?.score3})</Star>
          <Starr>{starRender(reviewDetail?.score3)}</Starr>
        </StarBox2>
        <StarBox2>
          <NameDiv>접근성</NameDiv>
          <Star>({reviewDetail?.score4})</Star>
          <Starr>{starRender(reviewDetail?.score4)}</Starr>
        </StarBox2>
        <StarBox2>
          <NameDiv>청결도</NameDiv>
          <Star>({reviewDetail?.score5})</Star>
          <Starr>{starRender(reviewDetail?.score5)}</Starr>
        </StarBox2>
      </Stars>
      <Content>
        <Contents>
        {reviewDetail?.content}
          </Contents></Content>
      <EditBtn>수정하기</EditBtn>
      <DelBtn onClick={onDeleteReview}>삭제하기</DelBtn>
    </MainDiv>
  );
};
export default ReviewDetailForm;

const StyledSlider = styled(Slider)`
  display: flex;
  .slick-list {
    width: 390px;
    margin: 0px 0px -45px 0px;
  }
`;

const MainDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: var(--font);
`;

const Pic = styled.img`
  width: 100%;
  height: 407px;
`;

const Title = styled.div`
  width: 100%;
  margin: 60px 0px 20px 48px;
  display: flex;
`;

const CampName = styled.div`
  width: 100%;
  font-size: 18px;
  font-weight: 700;
  margin-left: var(--interval);
`;

const Date = styled.div`
  font-size: 12px;
  margin: 14px 0px 0px 180px;
`;

const Suv = styled.div`
  width: 100%;
  display: flex;
`;

const Nick = styled.div`
  font-size: 14px;
  margin: 15px 0px 0px 13px;
`;

const Pro = styled.div`
  width: 40px;
  height: 40px;
  border: 1px solid black;
  border-radius: 100%;
`;

const Stars = styled.div`
  width: 340px;
  height: 160px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const StarBox = styled.div`
  display: flex;
  width: 265px;
  font-size: 14px;
  padding-left: 23px;
  margin: 17px 96px 0px 0px;
`;

const Star = styled.div`
  margin: 0px 10px 0px 0px;
`;

const StarBox2 = styled.div`
  display: flex;
  width: 265px;
  font-size: 14px;
  padding-left: 23px;
  margin: 8px 96px 0px 0px;
`;

const Starr = styled.div`
  color: var(--Brand6);
`;

const Content = styled.div`
  width: 100%;
  border-top: 8px solid #e1e1e1;
  padding-top: 24px;
  margin: 0px 24px 0px 24px;
  margin-top: 10px;
`;

const Contents = styled.div`
  margin: 0px 24px 0px 24px;
`

const NameDiv = styled.div`
  width: 60px;
`;

const EditBtn = styled(Button)`
  margin: 40px 24px 24px 24px;
`;

const DelBtn = styled.button`
  border: none;
  border-bottom: 1px solid var(--Brand6);
  background-color: var(--BackColor2);
  font-size: 14px;
  padding-bottom: 4px;
  font-weight: 700;
  color: var(--Brand6);
`;
