import React, { useState, useEffect, useRef, useMemo } from "react";

import { BoxHeader, BoxMoreLink, BoxName, ItemBox } from "../elements/ItemBox";

import moment from "moment";

import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import styled from "styled-components";

import testImg from "../../img/test_camp_img.jpg";
import { useNavigate } from "react-router-dom";
import { instance } from "../../api/axiosApi";

function ReviewElement(props) {
  const navigate = useNavigate();
  const { review } = props;
  const starRender = (score) => {
    let stars = [];
    for (let i = 0; i < score; i++) {
      stars.push(
        <StarText key={i} style={{ color: "var(--Brand6)" }}>
          ★
        </StarText>
      );
    }
    for (let i = score; i < 5; i++) {
      stars.push(
        <StarText key={i} style={{ color: "var(--Gray1)" }}>
          ★
        </StarText>
      );
    }
    return stars;
  };

  const imgArr2 = [testImg, testImg, testImg];
  console.log(review);
  const [isShowMore, setIsShowMore] = useState(false); // 더보기 열고 닫는 스위치
  const textLimit = useRef(50); // 글자수 제한 선언

  const commenter = useMemo(() => {
    // 조건에 따라 게시글을 보여주는 함수
    const shortReview = review.content.slice(0, textLimit.current); // 원본에서 글자 수만큼 잘라서 짧은 버전을 준비하자
    if (review.content.length > textLimit.current) {
      // 원본이 길면 (원본 글자수 > 제한된 갯수)
      if (isShowMore) {
        return review.content;
      } // 더보기가 true 면 원본 바로 리턴
      return shortReview; // (더보기가 false면) 짧은 버전 리턴해주자
    }
    return review.content; // 그렇지않으면 (짧은 글에는) 쓴글 그대로 리턴!
  }, [isShowMore]);

  const onEditReview = (id, reviewDetail) => {
    navigate(`/reviewedit/${id}`, { state: { reviewDetail } });
  };

  const onDeleteReview = async () => {
    if (!window.confirm("삭제 하시겠습니까?")) {
      return;
    } else {
      try {
        const data = await instance.delete(`/review/${review.reviewId}`);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
    navigate("/");
  };

  return (
    <div>
      <ItemBox>
        <BoxHeader>
          <CampName>{review.campingName}</CampName>
          <div>
            {review.likeState ? <AiFillHeart /> : <AiOutlineHeart />}
            {review.likeCount}
          </div>
        </BoxHeader>
        <Date>{moment(review.modifiedAt).format("YYYY.MM.DD")}</Date>
        <ScoreLists>
          <Stars>
            <StarBox2>
              <NameDiv>정보일치</NameDiv>
              <Star>({review?.score1})</Star>
              <Starr>{starRender(review?.score1)}</Starr>
            </StarBox2>
            <StarBox2>
              <NameDiv>편의시설</NameDiv>
              <Star>({review?.score2})</Star>
              <Starr>{starRender(review?.score2)}</Starr>
            </StarBox2>
            <StarBox2>
              <NameDiv>관리상태</NameDiv>
              <Star>({review?.score3})</Star>
              <Starr>{starRender(review?.score3)}</Starr>
            </StarBox2>
            <StarBox2>
              <NameDiv>접근성</NameDiv>
              <Star>({review?.score4})</Star>
              <Starr>{starRender(review?.score4)}</Starr>
            </StarBox2>
            <StarBox2>
              <NameDiv>청결도</NameDiv>
              <Star>({review?.score5})</Star>
              <Starr>{starRender(review?.score5)}</Starr>
            </StarBox2>
          </Stars>
        </ScoreLists>
        <ContentsBox>{commenter}</ContentsBox>
        {/* <BoxMoreLink>...더보기</BoxMoreLink> */}
        <div onClick={() => setIsShowMore(!isShowMore)}>
          {review.content.length > textLimit.current && // 버튼명은 조건에 따라 달라진다
            (isShowMore ? "[닫기]" : "...[더보기]")}
        </div>
      </ItemBox>
      <ImgLists>
        {review.reviewUrlList.map((v, i) => {
          return <ImgView key={i} src={v} />;
        })}
      </ImgLists>
      <br />
      <hr color="#E0E0E0" />
      <BtnBox>
        <DelBtn onClick={() => onDeleteReview(review.reviewId)}>삭제</DelBtn>
        <EditBtn onClick={() => onEditReview(review?.reviewId, review)}>
          수정
        </EditBtn>
      </BtnBox>
    </div>
  );
}

export default ReviewElement;

const ScoreLists = styled.div`
  display: grid;
  grid-template-columns: 2fr 3fr 2fr 3fr;
`;

const CampName = styled.div`
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  color: #000000;
`;

const Date = styled.div`
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  color: #999999;
  margin: 12px 0px 26px 0px;
`;

const ContentsBox = styled.div`
  width: 100%;
  margin-top: 16px;
  word-break: break-all;
`;

const ImgLists = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  padding: var(--pad2);
  box-sizing: border-box;
  margin-left: 15px;
`;

const ImgView = styled.img`
  object-fit: cover;
  width: 15vw;
  height: 15vw;
  background-position: center;
`;

const BtnBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 20px 0px 40px 0px;
  gap: var(--pad2);
  border-bottom: 8px solid var(--BackColor2);
`;

const DelBtn = styled.button`
  width: 154px;
  height: 33px;
  border: 1px solid var(--Brand6);
  background-color: white;
  color: var(--Brand6);
`;

const EditBtn = styled.button`
  width: 154px;
  height: 33px;
  border: 1px solid var(--Brand6);
  background-color: var(--Brand6);
  color: white;
`;

const StarText = styled.span`
  color: ${(props) => props.color};
  font-size: 18px;
  line-height: 18px;
`;

const NameDiv = styled.div`
  width: 60px;
`;

const Stars = styled.div`
  display: flex;
  flex-direction: column;
`;

const Star = styled.div`
  width: 17px;
  padding: 0 8px 0 0px;
`;

const StarBox2 = styled.div`
  display: flex;
  font-size: 14px;
  padding-bottom: 9px;
  line-height: 18px;
`;

const Starr = styled.span``;
