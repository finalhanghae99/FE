import React, { useEffect, useState } from "react";
import { AiOutlineLeft } from "react-icons/ai";
import { BsPencilFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { instance } from "../../api/axiosApi";

const ReviewListForm = () => {
  const navigate = useNavigate();
  const [reviewList, setReviewList] = useState();

  const fetchreviewList = async () => {
    try {
      const data = await instance.get("reviewlist");
      // console.log(data)
      if (data.status === 200) {
        return setReviewList(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(reviewList);

  useEffect(() => {
    fetchreviewList();
  }, []);

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
        {reviewList?.map((a) => {
          return (
            <>
              <Pic>{a.reviewUrl}</Pic>
              <Comm>
                <ComDiv>
                  <Pro></Pro>
                  <div>{a.nickname}</div>
                  <Date>{a.modifiedAt}</Date>
                </ComDiv>
                <Ment>{a.content}</Ment>
              </Comm>
            </>
          );
        })}
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
  margin-bottom: 15px;
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
