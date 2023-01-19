import React, { useState, useEffect, useRef } from "react";

import { instance } from "../../api/axiosApi";
import { BoxHeader, BoxMoreLink, BoxName, ItemBox } from "../elements/ItemBox";

import styled from "styled-components";

import ReviewElement from "./ReviewElement";

function MyReview() {
  const [review, serReview] = useState(null);
  const fetchReview = async () => {
    try {
      const { data } = await instance.get(`/mypage/review`);
      serReview(data.data.responseReviewListDtos);
    } catch (error) { console.log(error); }
  };
  useEffect(() => {
    fetchReview();
  }, [])
  console.log(review)

  const starRender = (score) => {
    let stars = "";
    for (let i = 0; i < score; i++) {
      stars += "★";
    }
    stars = stars.padEnd(5, '☆')
    return stars;
  };

  return (
    <ItemBox>
      {review?.map((v) => {
        return (
          <ReviewElement key={v.reviewId} review={v} />
        )
      })}
    </ItemBox>
  )
}

export default MyReview;