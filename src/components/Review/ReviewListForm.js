import React from "react";
import { AiOutlineLeft } from "react-icons/ai";
import { BsPencilFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const ReviewListForm = () => {
  const navigate = useNavigate();
  return (
    <>
      <Main>
        <BackBtn>
          <AiOutlineLeft />
        </BackBtn>
        <CampName>안산 용설호수 캠핑장</CampName>
      </Main>
      <Write
        onClick={() => {
          navigate(`/reviewadd`);
        }}
      >
        <BsPencilFill />
      </Write>
      <PostBox>
        <Pic>후기사진</Pic>
        <Comm>
          <ComDiv>
            <Pro></Pro>
            <div>캠퍼 김씨</div>
            <Date>2023.1.4</Date>
          </ComDiv>
          <Ment>
            캠핑장이 깨끗하고 정말 좋아요. 캠핑장이 깨끗하고 정말 좋아요.
            캠핑장이 깨끗하고 정말 좋아요.
          </Ment>
        </Comm>
      </PostBox>
    </>
  );
};

export default ReviewListForm;

const Main = styled.div`
  display: flex;
  align-items: center;
  width: 360px;
  margin-left: 5px;
`;
const CampName = styled.div`
  margin-left: 95px;
`;

const BackBtn = styled.button`
  background-color: white;
  border: 1px solid white;
`;

const Write = styled.button`
  width: 360px;
  display: flex;
  justify-content: flex-end;
  background-color: white;
  border: 1px solid white;
`;

const PostBox = styled.div`
  width: 335px;
  height: 277px;
  margin: 34px 0px 30px 28px;
`;

const Pic = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 335px;
  height: 158px;
  background-color: grey;
`;

const Pro = styled.div`
  width: 35px;
  height: 35px;
  background-color: gray;
  border-radius: 100%;
`;

const Comm = styled.div`
  width: 335px;
  height: 150px;
  border: 1px solid #b5b5b5;
`;

const ComDiv = styled.div`
  width: 280px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px 0px 0px 21px;
`;

const Ment = styled.div`
  width: 291px;
  margin: 25px 0px 15px 21px;
`;

const Date = styled.div`
  margin-left: 95px;
`;
