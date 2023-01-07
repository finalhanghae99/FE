import React from "react";
import { BsXLg } from "react-icons/bs";
import styled from "styled-components";

const ReviewAddForm = () => {
  return (
    <MainDiv>
      <Div1>
        <BackBtn>
          <BsXLg />
        </BackBtn>
        <div>리뷰 작성하기</div>
      </Div1>
      <CampName>방문하신 캠핑장을 알려주세요.(필수)</CampName>
      <CampInput placeholder="  캠핑장명"></CampInput>
      <Detail>세부항목의 별점을 매겨주세요.(필수)</Detail>
      <StarBox>
        <div>주변환경</div>
        <Star>★★★☆☆</Star>
      </StarBox>
      <StarBox2>
        <div>주변환경</div>
        <Star>★★★☆☆</Star>
      </StarBox2>
      <StarBox2>
        <div>주변환경</div>
        <Star>★★★☆☆</Star>
      </StarBox2>
      <StarBox2>
        <div>주변환경</div>
        <Star>★★★☆☆</Star>
      </StarBox2>
      <StarBox2>
        <div>주변환경</div>
        <Star>★★★☆☆</Star>
      </StarBox2>
      <Pic>캠핑장의 사진을 올려주세요.(필수)</Pic>
      <PicBtn>+</PicBtn>
      <PicBtnBox>
        <PicAdd>+</PicAdd>
        <PicAdd>+</PicAdd>
        <PicAdd>+</PicAdd>
        <PicAdd>+</PicAdd>
      </PicBtnBox>
      <Exp>캠핑장 경험에 대해 알려주세요.(필수)</Exp>
      <ExpInput placeholder="다른 캠퍼들이 참고 할 수 있도록 캠핑장에 대해 알려주세요."></ExpInput>
      <AddBtn>등록하기</AddBtn>
    </MainDiv>
  );
};

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
  margin-top: 31px;
`;

const BackBtn = styled.button`
  background-color: white;
  border: 1px solid white;
  margin: 0px 105px 0px 8px;
`;

const CampName = styled.div`
  width: 390px;
  padding-left: 27px;
  margin: 39px 0px 7px 27px;
`;

const CampInput = styled.input`
  width: 335px;
  height: 38px;
  border: 1px solid #898989;
  border-radius: 5px;
  margin: 0px 0px 0px 2px;
`;

const Detail = styled.div`
  width: 390px;
  height: 19px;
  padding-left: 27px;
  margin: 27px 0px 0px 27px;
`;

const StarBox = styled.div`
  display: flex;
  width: 265px;
  font-size: 14px;
  color: #757575;
  padding-left: 27px;
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
  padding-left: 27px;
  margin: 8px 96px 0px 0px;
`;

const Pic = styled.div`
  width: 265px;
  padding-left: 27px;
  margin: 17px 96px 0px 0px;
`;

const PicBtn = styled.button`
  width: 324px;
  height: 324px;
  margin-top: 23px;
  background-color: white;
  border: 1px solid #a8a8a8;
  font-size: 42px;
`;

const PicBtnBox = styled.div`
  display: flex;
  width: 324px;
  margin-top: 23px;
  justify-content: space-between;
`;

const PicAdd = styled.button`
  width: 72px;
  height: 72px;
  background-color: white;
  border: 1px solid #a8a8a8;
  font-size: 32px;
`;

const Exp = styled.div`
  width: 390px;
  margin-top: 27px;
  margin-bottom: 17px;
  padding-left: 54px;
`;

const ExpInput = styled.input`
  width: 323px;
  height: 143px;
  border: 1px solid #b7b7b7;
  margin-bottom: 25px;
`;

const AddBtn = styled.button`
  width: 324px;
  height: 53px;
  border: 1px solid #d9d9d9;
  background-color: #d9d9d9;
  border-radius: 10px;
`;
