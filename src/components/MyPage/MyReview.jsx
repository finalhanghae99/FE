import React, { useState, useEffect } from "react";
import { instance } from "../../api/axiosApi";
import { ItemBox } from "../elements/ItemBox";
import styled from "styled-components";
import ReviewElement from "./ReviewElement";
import { useDispatch, useSelector } from "react-redux";
import { __getMyReviews } from "../../redux/modules/myReviewsSlice";

function MyReview() {
  const dispatch = useDispatch();
  const [review, serReview] = useState(null);
  const { isLoading, error, myReviews } = useSelector((state) => state.myReviews);

  // const fetchReview = async () => {
  //   try {
  //     const { data } = await instance.get(`/mypage/review`);
  //     console.log(data);
  //     serReview(data.data.responseReviewOneDtoList);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  useEffect(() => {
    // fetchReview();
    dispatch(__getMyReviews());
  }, []);
  console.log(myReviews);

  return (
    <div>
      <Title>내가 작성한 리뷰</Title>
      <ItemBox>
        {myReviews?.map((v) => {
          return (
              <ReviewElement key={v.reviewId} review={v} />
          );
        })}
      </ItemBox>
    </div>
  );
}

export default MyReview;

const Title = styled.div`
  width: 100%;
  border-top: 1px solid var(--Brand4);
  margin-top: 103px;
  padding-top: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 500;
`;