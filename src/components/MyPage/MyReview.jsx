import React, { useState, useEffect } from "react";
import { instance } from "../../api/axiosApi";
import { ItemBox } from "../elements/ItemBox";
import styled from "styled-components";
import ReviewElement from "./ReviewElement";
import { useDispatch, useSelector } from "react-redux";
import { __getMyReviews } from "../../redux/modules/myReviewsSlice";

function MyReview() {
  const dispatch = useDispatch();
  const { isLoading, error, myReviews } = useSelector((state) => state.myReviews);

  useEffect(() => {
    dispatch(__getMyReviews());
  }, []);

  return (
    <div>
      <Title>내가 작성한 리뷰</Title>
      <ItemBox>
        {myReviews?.map((v) => {
          return (
            <ReviewElement key={v.reviewId} review={v} />
          );
        })}
        {(myReviews?.length === 0)&&(
          <NonData>아직 리뷰가 없습니다.</NonData>
        )}
      </ItemBox>
    </div>
  );
}

export default MyReview;

const Title = styled.div`
  width: 100%;
  padding-top: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 500;
`;

const NonData = styled(ItemBox)`
  text-align: center;
`