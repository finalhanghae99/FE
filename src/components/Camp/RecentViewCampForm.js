import React from "react";
import { AiOutlineLeft } from "react-icons/ai";
import { BsBookmark } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const RecentViewCampForm = () => {
  const navigate = useNavigate();
  return (
    <>
      <Main>
        <BackBtn
          onClick={() => {
            navigate(`/`);
          }}
        >
          <AiOutlineLeft />
        </BackBtn>
        <div>최근 본 캠핑장이에요.</div>
      </Main>
      <Box>
        <Pic>
          <BsBookmark />
          사진
        </Pic>
        <Suv>
          <CampName>
            <Name>학암포 오토 캠핑장</Name>
            <Rev>N개의 리뷰</Rev>
          </CampName>
          <Add>충청남도 태안군 원북면 옥파로 5길 66-107</Add>
          <Tag>
            <Category>해변</Category>
            <Category>국립공원</Category>
            <Category>해변</Category>
          </Tag>
        </Suv>
      </Box>
    </>
  );
};

export default RecentViewCampForm;

const Main = styled.div`
  display: flex;
  align-items: center;
  width: 360px;
  margin-top: 29px;
`;

const BackBtn = styled.button`
  background-color: white;
  border: 1px solid white;
  margin: 0px 88px 0px 10px;
`;

const Box = styled.div`
  width: 336px;
  height: 366px;
  margin: 75px 0px 0px 27px;
`;

const Pic = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 336px;
  height: 186px;
  background-color: #d9d9d9;
`;

const CampName = styled.div`
  width: 306px;
  display: flex;
  justify-content: space-between;
  margin: 0px 0px 0px 17px;
`;

const Name = styled.div`
  margin-top: 19px;
  font-size: 16px;
`;

const Rev = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #d9d9d9;
  margin-top: 19px;
  font-size: 10px;
`;

const Suv = styled.div`
  border-bottom: 1px solid #b5b5b5;
  border-left: 1px solid #b5b5b5;
  border-right: 1px solid #b5b5b5;
`;

const Add = styled.div`
  margin: 7px 0px 0px 17px;
  color: #7a7a7a;
  font-size: 14px;
`;

const Tag = styled.div`
  display: flex;
  word-break: break-all;
  width: 336px;
  height: 88px;
  margin-top: 20px;
  border-top: 1px solid #b5b5b5;
  padding: 11px 0px 0px 0px;
`;

const Category = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: auto;
  height: 29px;
  border: 1px solid #aaaaaa;
  border-radius: 20px;
  margin: 0px 0px 0px 10px;
  padding: 0px 14px 0px 14px;
`;
