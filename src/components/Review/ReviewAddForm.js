import React from "react";
import { BsXLg } from "react-icons/bs";
import styled from "styled-components";

const ReviewAddForm = () => {
  return (
    <MainDiv>
      <Div1>
      <BackBtn><BsXLg /></BackBtn>
      <div>리뷰 작성하기</div>
      </Div1>
      <CampName>방문하신 캠핑장을 알려주세요.(필수)</CampName>
      <CampInput placeholder="  캠핑장명"></CampInput>
      <Detail>세부항목의 별점을 매겨주세요.(필수)</Detail>
      <StarBox>
      <div>주변환경</div>
      <Star>★★★☆☆</Star>
      </StarBox>
    </MainDiv>
  )
}

export default ReviewAddForm;

const MainDiv = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Div1 = styled.div`
  display: flex;
  width: 390px;
  font-size: 20px;
`

const BackBtn = styled.button`
  background-color: white;
  border: 1px solid white;
  margin: 0px 105px 0px 8px;
`

const CampName = styled.div`
  width: 390px;
  padding-left: 27px;
  margin: 39px 0px 7px 0px;
`

const CampInput = styled.input`
  width: 338px;
  height: 38px;
  border: 1px solid #898989;
  border-radius: 5px;
  margin-right: 20px;
`

const Detail = styled.div`
  width: 265px;
  height: 19px;
  margin: 27px 96px 0px 0px;
`

const StarBox = styled.div`
  display: flex;
  width: 265px;
  font-size: 14px;
  color: #757575;
  margin: 17px 96px 0px 0px;
`

const Star = styled.div`
  margin-left: 21px;
`