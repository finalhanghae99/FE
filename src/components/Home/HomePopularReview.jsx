import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ItemBox, BoxHeader, BoxName, BoxMoreLink } from "../elements/ItemBox";

import { instance } from "../../api/axiosApi";

function HomePopularReview() {
  const [review, setReview] = useState(null);
  const fetchReview = async () => {
    try {
      const { data } = await instance.get("/review/bestsix");
      console.log(data)
      setReview(data.data.responseReviewSixDtos);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchReview();
  }, []);
  const starRender = (score) => {
    let stars = "";
    for (let i = 0; i < score; i++) {
      stars += "★";
    }
    return stars;
  };

  return (
    <ItemBox>
      <BoxHeader>
        <BoxName>인기있는 리뷰</BoxName>
        <BoxMoreLink>더보기</BoxMoreLink>
      </BoxHeader>
      <ReviewBox>
        {review?.map((v) => {
          return (
            <ReviewCard key={v.id}>
              <ReviewName>{v.campingName}</ReviewName>
              <ScoreBox>
                <ReviewItem>평가항목 1</ReviewItem>
                <ReviewScore>{starRender(v.score1)}</ReviewScore>
                <ReviewItem>평가항목 1</ReviewItem>
                <ReviewScore>{starRender(v.score2)}</ReviewScore>
                <ReviewItem>평가항목 1</ReviewItem>
                <ReviewScore>{starRender(v.score3)}</ReviewScore>
                <ReviewItem>평가항목 1</ReviewItem>
                <ReviewScore>{starRender(v.score4)}</ReviewScore>
                <ReviewItem>평가항목 1</ReviewItem>
                <ReviewScore>{starRender(v.score5)}</ReviewScore>
              </ScoreBox>
            </ReviewCard>
          );
        })}
      </ReviewBox>
    </ItemBox>
  );
}

export default HomePopularReview;

const ReviewBox = styled.div`
  display: flex;
  overflow: scroll;
  gap: var(--pad2);
`;

const ReviewCard = styled.div`
  min-width: 200px;
  max-width: 200px;
  padding: var(--pad2);
  background-color: aliceblue;
`;
const ReviewName = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

const ScoreBox = styled.div`
  display: grid;
  grid-template-columns: 80px 120px;
  align-items: center;
`;
const ReviewItem = styled.div`
  font-size: 12px;
  color: gray;
  line-height: 25px;
`;

const ReviewScore = styled.div`
  font-size: 12px;
`;
