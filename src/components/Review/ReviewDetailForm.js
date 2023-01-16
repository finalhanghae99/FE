import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { instance } from "../../api/axiosApi";

const ReviewDetailForm = () => {
  const [reviewDetail, setReviewDetail] = useState();

  const fetchreviewDetail = async () => {
    try {
      const data = await instance.get(`/review/reviewone`);
      console.log(data);
      if (data.statusCode === 200) {
        return setReviewDetail(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(reviewDetail);

  useEffect(() => {
    fetchreviewDetail();
  }, []);

  return (
    <MainDiv>
      <Pic>리뷰 디테일 페이지 사진</Pic>
      <Title>
        <CampName>안산 용설 호수 캠핑장{reviewDetail?.campingName}</CampName>
        <Date>2023.1.10{reviewDetail?.modifiedAt}</Date>
      </Title>
      <Suv>
        <Pro></Pro>
        <Nick>캠퍼 김씨{reviewDetail?.nickname}</Nick>
      </Suv>
      <Stars>
        <StarBox>
          <NameDiv>정보일치</NameDiv>
          <Star>★★★★</Star>
        </StarBox>
        <StarBox2>
          <NameDiv>편의시설</NameDiv>
          <Star>★★★★</Star>
        </StarBox2>
        <StarBox2>
          <NameDiv>관리상태</NameDiv>
          <Star>★★★</Star>
        </StarBox2>
        <StarBox2>
          <NameDiv>접근성</NameDiv>
          <Star>★★★</Star>
        </StarBox2>
        <StarBox2>
          <NameDiv>청결도</NameDiv>
          <Star>★★★</Star>
        </StarBox2>
      </Stars>
      <Content>리뷰 내용이 들어갑니다.{reviewDetail?.content}</Content>
    </MainDiv>
  );
};
export default ReviewDetailForm;

const MainDiv = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Pic = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 407px;
  background-color: #d9d9d9;
`;

const Title = styled.div`
  width: 100%;
  margin: var(--intarval);
  margin-bottom: none;
  display: flex;
  justify-content: space-between;
`;

const CampName = styled.div`
  font-size: 18px;
  font-weight: 700;
  padding-left: var(--intarval);
`;

const Date = styled.div`
  font-size: 12px;
  padding-top: 6px;
  padding-right: var(--intarval);
`;

const Suv = styled.div`
  width: 100%;
  display: flex;
  margin-left: 48px;
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
  color: #757575;
  padding-left: 23px;
  margin: 17px 96px 0px 0px;
`;

const Star = styled.div`
  margin-left: 21px;
`;

const StarBox2 = styled.div`
  display: flex;
  width: 265px;
  font-size: 14px;
  color: #757575;
  padding-left: 23px;
  margin: 8px 96px 0px 0px;
`;

const Content = styled.div`
  border-top: 8px solid #e1e1e1;
  padding: 24px 0px 0px 48px;
  width: 100%;
  margin-top: 10px;
`;

const NameDiv = styled.div`
  width: 60px;
`;
