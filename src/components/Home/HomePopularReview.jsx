import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { instance } from "../../api/axiosApi";

function HomePopularReview() {
  const [review, setReview] = useState(null);
  const fetchReview = async () => {
    try {
      const { data } = await instance.get("review");
      setReview(data);
    } catch (error) { console.log(error); }
  };
  useEffect(() => {
    fetchReview();
  }, [])

  const starRender = (score) => {
    let stars = "";
    for (let i = 0; i < score; i++) {
      stars +="★";
    }
    return stars;
  }


  return (
    <DivBox>
      <BoxHeader>
        <ItemName>인기있는 리뷰</ItemName>
        <MoreLink>더보기</MoreLink>
      </BoxHeader>
      <ReviewBox>
        {review?.map((v)=>{
          return(
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
          )
        })}
      </ReviewBox>
    </DivBox>
  )
}

export default HomePopularReview;


const DivBox = styled.div`
  padding: var(--pad2);
`

const BoxHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin: var(--pad1);
`
const ItemName = styled.div`
  font-size: 16px;
`
const MoreLink = styled(Link)`
  color: gray;
  text-decoration: none;
  font-size: 12px;
`

const ReviewBox = styled.div`
  display: flex;
  overflow: scroll;
  gap: var(--pad2);
`

const ReviewCard = styled.div`
  min-width: 200px;
  max-width: 200px;
  padding: var(--pad2);
  background-color: aliceblue;
`
const ReviewName = styled.div`
  font-size:16px;
  font-weight: bold;
`

const ScoreBox = styled.div`
  display: grid;
  grid-template-columns: 80px 120px;
  align-items: center;
`
const ReviewItem = styled.div`
  font-size: 12px;
  color: gray;
  line-height: 25px;
`

const ReviewScore = styled.div`
  font-size: 12px;
`
