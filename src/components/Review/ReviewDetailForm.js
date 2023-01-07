import React from "react";
import styled from "styled-components";

const ReviewDetailForm = () => {
  return (
    <MainDiv>
      <Pic>리뷰 디테일 페이지</Pic>
      <Title>
      <CampName>캠핑장 이름</CampName>
      <Date>2023.01.05</Date>
      </Title>
      <Nick>nickname</Nick>
      <Stars>
      <StarBox>
        <div>주변환경</div>
        <Star>★★★★</Star>
      </StarBox>
      <StarBox2>
        <div>주변환경</div>
        <Star>★★★★</Star>
      </StarBox2>
      <StarBox2>
        <div>주변환경</div>
        <Star>★★★</Star>
      </StarBox2>
      <StarBox2>
        <div>주변환경</div>
        <Star>★★★</Star>
      </StarBox2>
      <StarBox2>
        <div>주변환경</div>
        <Star>★★★</Star>
      </StarBox2>
      </Stars>
      <Content>캠핑장이 깨끗하고 좋아요. 캠핑장이 깨끗하고 좋아요. 캠핑장이 깨끗하고 좋아요.</Content>
    </MainDiv>
  )
}
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
  width: 390px;
  height: 415px;
  background-color: #D9D9D9;
`

const Title = styled.div`
  width: 340px;
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
`

const CampName = styled.div`
  font-size: 20px;
`

const Date = styled.div`
  font-size: 14px;
`

const Nick = styled.div`
  width: 340px;
  margin-top: 12px;
`

const Stars = styled.div`
  width: 340px;
  height: 160px;
  border-bottom: 1px solid #BDBDBD;
  display: flex;
  align-items: center;
  flex-direction: column;
`

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
  width: 340px;
  margin-top: 10px;
`