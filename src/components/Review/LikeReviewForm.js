import React, { useEffect, useState } from "react";
import { AiOutlineLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import LikeListElement from "./LikeListElement";
import { instance } from "../../api/axiosApi";

const LikeReviewForm = () => {
  const navigate = useNavigate();
  const [review, setReview] = useState(null);
  const fetchReview = async () => {
    try {
      const { data } = await instance.get("review/likerank");
      setReview(data.data.responseReviewListDtos);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchReview();
  }, []);
  // const starRender = (score) => {
  //   let stars = "";
  //   for (let i = 0; i < score; i++) {
  //     stars += "★";
  //   }
  //   return stars;
  // };
  console.log(review)
  return (
    <>
      <Main>
        <BackBtn onClick={() => { navigate(`/`) }}>
          <AiOutlineLeft />
        </BackBtn>
        <div>좋아요를 많이 받은 리뷰에요</div>
      </Main>
      <PostBox>
        <Pic>후기사진</Pic>
        <Comm>
          <ComDiv>
            <Pro></Pro>
            <div>캠퍼 김씨</div>
            <Date>2023.1.4</Date>
          </ComDiv>
          <CampName>안산 용설 호수 캠핑장</CampName>
          <Ment>
            캠핑장이 깨끗하고 정말 좋아요. 캠핑장이 깨끗하고 정말 좋아요.
            캠핑장이 깨끗하고 정말 좋아요.
          </Ment>
        </Comm>
      </PostBox>
      {review?.map((v) => {
        return (
          <PostBox key={v.reviewId} >
          <LikeListElement review={v} />
          </PostBox>
        )
      })}
    </>
  );
};

export default LikeReviewForm;

const Main = styled.div`
  display: flex;
  align-items: center;
  width: 360px;
  margin-top: 29px;
`;

const BackBtn = styled.button`
  background-color: white;
  border: 1px solid white;
  margin: 0px 68px 0px 10px;
`;

const PostBox = styled.div`
  /* width: 335px;
  height: 277px; */
  margin: 48px 0px 20px 28px;
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
  height: 170px;
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
  margin: 10px 0px 15px 21px;
`;

const Date = styled.div`
  margin-left: 95px;
`;

const CampName = styled.div`
  font-size: 18px;
  width: 291px;
  margin: 10px 0px 0px 21px;
`;
