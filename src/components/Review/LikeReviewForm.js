import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import LikeListElement from "./LikeListElement";
import { instance } from "../../api/axiosApi";
import { ItemBox } from "../elements/ItemBox";

const LikeReviewForm = () => {
  const navigate = useNavigate();
  const [review, setReview] = useState(null);
  const fetchReview = async () => {
    try {
      const { data } = await instance.get(`/reviewlookup/likerank`);
      setReview(data.data.responseReviewListDtos);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchReview();
  }, []);
  console.log(review)
  return (
    <>
      <Main>
        <ItemBox>
          <ItemName>좋아요를 많이 받은 리뷰 입니다.</ItemName>
        </ItemBox>
      </Main>
      {review?.map((v) => {
        return (
          <ItemBox key={v.reviewId} >
            <LikeListElement review={v} />
          </ItemBox>
        )
      })}
    </>
  );
};

export default LikeReviewForm;

const Main = styled.div`
  display: flex;
  align-items: center;
  margin-top: 29px;
`;

const ItemName = styled.div`
  margin: auto;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
`