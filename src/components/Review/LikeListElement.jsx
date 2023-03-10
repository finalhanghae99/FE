import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from 'moment';
import styled from "styled-components";
import CampImgView from "../elements/CampImgView";
import {AiFillHeart, AiOutlineHeart} from "react-icons/ai"
import { instance } from "../../api/axiosApi";
import { getCookies } from "../../api/cookieControler";
import Alert from "../elements/Alert";
import Confirm from "../elements/Confirm"
import LoginCheck from "../elements/LoginCheck";
import UserImgView from "../elements/UserImgView"

function LikeListElement(props) {
  const navigate = useNavigate();
  const { review } = props;
  const dateFormat = "YYYY.MM.DD";
  const [isLike, setIsLike] = useState(review.likeState);
  const [likeCount, setLikeCount] = useState(review.likeCount);

  const clickLike = async(event,id) =>{
    event.stopPropagation();
    const token = getCookies("id")
    if(!token) {
      const isConfirm = await Confirm({
        body: "로그인이 필요 합니다.\n 로그인 하시겠습니까?"
      })
      if(!isConfirm){
        return null;
      } else {
        navigate("../../login");
      }
      return ;
    }
    try {
      const {data} = await instance.post(`/review/${id}/like`);
      (isLike)? (setLikeCount(likeCount - 1)) : (setLikeCount(likeCount + 1))
      setIsLike(!isLike)
    } catch (error) { console.log(error); }
  }

  return (
    <PostBox onClick={()=>{navigate(`/reviewdetail/${review.reviewId}`)}}>
      <Pic>
        <ListImg img={review.reviewUrlList[0]}></ListImg>
        <LikeBox>
          <LikeBtn onClick={(event)=>{clickLike(event, review.reviewId)}}>
            {isLike? (
              <AiFillHeart />
            ):(<AiOutlineHeart />)}
          </LikeBtn>
          <LikeCount>
            {likeCount}
          </LikeCount>
        </LikeBox>
      </Pic>
      <Comm>
        <ComDiv>
          <ListTop>
            <ProfileImg src={review.profileImageUrl} />
            <div>{review.nickname}</div>
          </ListTop>
          <DateText>{moment(review.modifiedAt).format(dateFormat)}</DateText>
        </ComDiv>
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

const ListTop = styled.div`
  display: flex;
  line-height: 40px;
  gap: var(--pad2);
  font-size: 14px;
`
const DateText = styled.div`
  color: var(--Gray3);
  font-size: 12px;
  padding-right: 10px;
`

const ProfileImg = styled(UserImgView)`
  height: 40px;
  width: 40px;
  border-radius: 100%;
  background-color: gray;
`

const PostBox = styled.div`
  border-radius: 8px;
  background-color: white;
  overflow: hidden;
  border: 1px solid var(--Gray2);
`;

const Pic = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  background-color: grey;
  position: relative;
`;

const Comm = styled.div`
  padding: 24px 20px 24px 20px;
`;

const ComDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 12px;
`;

const Ment = styled.div`
  padding-top: 12px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
`;

const LikeBox = styled.div`
  position: absolute;
  display: flex;
  justify-content: right;
  line-height: 30px;
  top:20px; 
  right:20px;
  font-size:30px;
  z-index: 5;
  color: white;
`
const LikeBtn = styled.div`
`

const LikeCount = styled.div`
  display: flex;
  font-size:16px;
  line-height: 30px;
  padding-left: 6px;
  width: 15px;
  justify-content: right;
  font-weight:bold;
`