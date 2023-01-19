import React, { useState, useEffect, useRef , useMemo} from "react";

import { BoxHeader, BoxMoreLink, BoxName, ItemBox } from "../elements/ItemBox";

import moment from "moment";

import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import styled from "styled-components";

import testImg from "../../img/test_camp_img.jpg"


function ReviewElement(props) {
  const { review } = props;
  const starRender = (score) => {
    let stars = "";
    for (let i = 0; i < score; i++) {
      stars += "★";
    }
    stars = stars.padEnd(5, '☆')
    return stars;
  };
  const imgArr2 = [testImg, testImg, testImg]
  console.log(review)
  const [isShowMore, setIsShowMore] = useState(false); // 더보기 열고 닫는 스위치 
  const textLimit = useRef(50); 			// 글자수 제한 선언

  const commenter = useMemo(() => { 		// 조건에 따라 게시글을 보여주는 함수
    const shortReview = review.content.slice(0, textLimit.current) + " ..."; 	// 원본에서 글자 수만큼 잘라서 짧은 버전을 준비하자
    if (review.content.length > textLimit.current) { 	// 원본이 길면 (원본 글자수 > 제한된 갯수)
      if (isShowMore) { return review.content; } 	// 더보기가 true 면 원본 바로 리턴
      return shortReview;			// (더보기가 false면) 짧은 버전 리턴해주자
    }
    return review.content; 			// 그렇지않으면 (짧은 글에는) 쓴글 그대로 리턴!
  }, [isShowMore]);

  return (
    <div>
      <ItemBox>
        <BoxHeader>
          <BoxName>{review.campingName}</BoxName>
          <div>
            {(review.likeState)? (
              <AiFillHeart />
            ):(
              <AiOutlineHeart /> )}
            {review.likeCount}
          </div>
        </BoxHeader>
        <ItemBox>{moment(review.modifiedAt).format("YYYY.MM.DD")}</ItemBox>
        <ScoreLists>
          <div>Score1</div> <div>{starRender(review.score1)}</div>
          <div>Score2</div> <div>{starRender(review.score2)}</div>
          <div>Score3</div> <div>{starRender(review.score5)}</div>
          <div>Score4</div> <div>{starRender(review.score4)}</div>
          <div>Score5</div> <div>{starRender(review.score3)}</div>
        </ScoreLists>
        <ContentsBox>
          {commenter}
        </ContentsBox>
        {/* <BoxMoreLink>...더보기</BoxMoreLink> */}
        <div onClick={() => setIsShowMore(!isShowMore)}>
          {(review.content.length > textLimit.current) &&	   // 버튼명은 조건에 따라 달라진다
            (isShowMore ? '[닫기]' : '...[더보기]')}
        </div>
      </ItemBox>
      <ImgLists>
        {review.reviewUrlList.map((v, i) => {
          return (
            <ImgView key={i} src={v} />
          )
        })}
      </ImgLists>
      <BtnBox>
        <ReviewBtn>수정</ReviewBtn>
        <ReviewBtn>삭제</ReviewBtn>
      </BtnBox>
      <hr />
    </div>
  )
}

export default ReviewElement;

const ScoreLists = styled.div`
  display: grid;
  grid-template-columns: 2fr 3fr 2fr 3fr;
`

const ContentsBox = styled.div`
  /* display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden; */
`
const ImgLists = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  padding: var(--pad2);
  box-sizing: border-box;
`

const ImgView = styled.img`
  object-fit: cover;
  width: 15vw;
  height: 15vw;
  background-position: center;
`

const BtnBox = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: var(--pad1);
  gap: var(--pad2);
`

const ReviewBtn = styled.button`
  height: 30px;
  width: 50px;
`