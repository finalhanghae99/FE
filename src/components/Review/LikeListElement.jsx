import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import moment from 'moment';

import styled from "styled-components";

import CampImgView from "../elements/CampImgView";

import {AiFillHeart, AiOutlineHeart} from "react-icons/ai"

// likeState

function LikeListElement(props) {
  const { review } = props;
  const dateFormat = "YYYY-MM-DD";

  return (
    <PostBox >
      <Pic>
        <ListImg img={review?.reviewUrlList[0]}></ListImg>
        <LikeBtn>
          {review.likeState? (
            <AiFillHeart />
          ):(<AiOutlineHeart />)}
        </LikeBtn>
      </Pic>
      <Comm>
        <ComDiv>
          <ListTop>
            <ProfileImg img={review.profileImageUrl} />
            <div>{review.nickname}</div>
          </ListTop>
          <div>{moment(review.modifiedAt).format(dateFormat)}</div>
        </ComDiv>
        <CampName>{review?.campingName}</CampName>
        <Ment>{review.content}</Ment>
      </Comm>
    </PostBox>
  )
}

export default LikeListElement;

const ListImg = styled(CampImgView)`
  width: 100%;
  height: 100%;
`
const CampName = styled.div`
  font-size: 18px;
  /* width: 291px; */
  margin: 10px 0px 0px 21px;
`;

const ListTop = styled.div`
  display: flex;
  line-height: 50px;
  gap: var(--pad2);
`

const ProfileImg = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 100%;
  background-color: gray;
`

const PostBox = styled.div`
  width: 335px;
  height: 270px;
  margin: 13px 0px 60px 0px;
`;

const Pic = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 335px;
  height: 158px;
  background-color: grey;
  position: relative;
`;

const Comm = styled.div`
  width: 333px;
  /* height: 150px; */
  border: 1px solid #b5b5b5;
`;

const ComDiv = styled.div`
  width: 291px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 25px 0px 0px 21px;
`;

const Ment = styled.div`
  width: 291px;
  margin: 25px 0px 15px 21px;
`;

// const BookmarkBtn = styled.div`
//     position: absolute;
//     top:20px; 
//     right:20px;
//     font-size:30px;
//     filter: drop-shadow(10px 10px 10px 10px green);
//     z-index: 5;
// `

const LikeBtn = styled.div`
  position: absolute;
  top:20px; 
  right:20px;
  font-size:30px;
  filter: drop-shadow(10px 10px 10px 10px green);
  z-index: 5;
`