import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ItemBox, BoxHeader, BoxName, BoxMoreLink } from "../elements/ItemBox";
import { instance } from "../../api/axiosApi";
import { useNavigate } from "react-router-dom";

function HomePopularReview() {
  const navigate = useNavigate();
  const [review, setReview] = useState(null);
  const fetchReview = async () => {
    try {
      const { data } = await instance.get("/reviewlookup/bestsix");
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

  const onReviewDetail = (id) => {
    navigate(`reviewdetail/${id}`);
  };

  return (
    <ItemBox>
      <BoxHeader>
        <BoxName onClick={()=>{navigate("/likereview")}}>인기있는 리뷰</BoxName>
        <BoxMoreLink to="likereview"></BoxMoreLink>
      </BoxHeader>
      <ReviewBox>
        {review?.map((v) => {
          return (
            <ReviewCard key={v.reviewId} img={v.imageUrl} onClick={()=>{onReviewDetail(v.reviewId)}}>
              <ReviewName>{v.campingName}</ReviewName>
              <ScoreBox>
                <ReviewItem>정보일치</ReviewItem>
                <ReviewScore>{starRender(v.score1)}</ReviewScore>
                <ReviewItem>접근성</ReviewItem>
                <ReviewScore>{starRender(v.score2)}</ReviewScore>
                <ReviewItem>화장실 청결도</ReviewItem>
                <ReviewScore>{starRender(v.score3)}</ReviewScore>
                <ReviewItem>관리상태</ReviewItem>
                <ReviewScore>{starRender(v.score4)}</ReviewScore>
                <ReviewItem>편의시설</ReviewItem>
                <ReviewScore>{starRender(v.score5)}</ReviewScore>
              </ScoreBox>
            </ReviewCard>
          );
        })}
        {(review?.length === 0) && (
        <NotFount>
          등록된 리뷰가 없습니다.
        </NotFount>
      )}
      </ReviewBox>
    </ItemBox>
  );
}

export default HomePopularReview;

const ReviewBox = styled.div`
  display: flex;
  overflow-x: scroll;
  gap: 16px;
  padding-bottom: var(--interval);
`;

const ReviewCard = styled.div`
  box-sizing: border-box;
  min-width: 206px;
  max-width: 206px;
  height: 221px;
  padding: var(--interval);
  background-image: url(${(props) => props.img});
  background-size: cover;
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  color: white;
  &::before {
    background: inherit;
    filter: blur(4px);
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
  &::after {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    opacity: 0.6;
    background: black;
  }
`;

const ReviewName = styled.div`
  font-size: 18px;
  font-weight: bold;
  position: relative;
  z-index: 3;
  padding-bottom:30px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const ScoreBox = styled.div`
  display: grid;
  grid-template-columns: 80px 80px;
  align-items: center;
  z-index: 3;
  position: relative;
`;
const ReviewItem = styled.div`
  font-size: 12px;
  line-height: 25px;
`;

const ReviewScore = styled.div`
  font-size: 12px;
  letter-spacing: 0.2em;
`;

const NotFount = styled.div`
  text-align: center;
`