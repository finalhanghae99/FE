
import React, { useState, useEffect } from "react";
import { instance } from "../../api/axiosApi";
import styled from "styled-components";
import { ItemBox } from "../elements/ItemBox";
import CampImgView from "../elements/CampImgView";
import moment from 'moment';
import { useNavigate } from "react-router-dom";
import UserImgView from "../elements/UserImgView";

function MyChatting() {
  const navigate = useNavigate();
  const [myChat, setMyChat] = useState(null);
  const [nickname, setNickname] = useState();
  const setName = async () => {
    try {
      const { data } = await instance.get('/usernick');
      if (data.statusCode === 200) setNickname(data.data.nickname)
    } catch (error) {
      console.log(error);
    }
  }

  const fetchMyChat = async () => {
    try {
      const { data } = await instance.get(`chat/mypage/chatting`);
      setMyChat(data.data.responseChattingDtoList);
    } catch (error) { console.log(error); }
  };

  useEffect(() => {
    setName();
    fetchMyChat();
  }, [])
  const dateCalc = (postDate) => {
    const current = moment();
    let date = moment(postDate);
    const diff = current - date
    if (diff < 86400000) {
      date = date.format("a hh:mm")
    } else {
      date = date.format("MM.DD")
    }
    return date;
  }
  return (
    <div>
      <Title>나의 채팅방</Title>
      <ChatLists>
        {myChat?.map((v, i) => {
          let opponentName, imgUrl
          if (v.buyer === nickname) {
            opponentName = v.seller;
            imgUrl = v.sellerProfileImageUrl;
          } else {
            opponentName = v.buyer;
            imgUrl = v.buyerProfileImageUrl;
          }
          return (
            <ChatCard key={i}>
              <ProfileImg src={imgUrl} />
              <InfoDetail onClick={() => navigate(`../../chatting/${v.roomId}`)}>
                <CampName>{v.campingName}</CampName>
                <UserName>{opponentName}</UserName>
                <LastMsg>{v.lastChatMessage}</LastMsg>
              </InfoDetail>
              <MsgDate>{dateCalc(v.lastSendDate)}</MsgDate>
            </ChatCard>
          )
        })}
      </ChatLists>
      {(myChat?.length === 0) && (
        <NonData>채팅 내역 없습니다.</NonData>
      )}
    </div>
  )
}

export default MyChatting;

const ChatLists = styled.div`
  display: flex;
  flex-direction: column;
  gap:1px;
  background-color: var(--Gray1);
  flex-wrap: wrap;
`
const ChatCard = styled(ItemBox)`
  display: flex;
  background-color: white;
  gap:12px;
  box-sizing: border-box;
  overflow: hidden;
`
const ProfileImg = styled(UserImgView)`
  height: 73px;
  width: 73px;
  border-radius: 100%;
`
const CampName = styled.div`
  width: 100%;
  font-size: 14px;
  margin-bottom: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`
const UserName = styled.div`
width: fit-content;
  font-size: 12px;
  color: var(--Gray4);
  margin-bottom: 8px;
`
const LastMsg = styled.div`
  font-size: 16px;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`
const MsgDate = styled.div`
  font-size: 12px;
  color: var(--Gray3);
  text-align: right;
  min-width: 55px;
`

const Title = styled.div`
  /* display: inline; */
  /* margin: auto; */
  text-align: center;
  font-size: 18px;
  margin: 24px 0 12px 0;
  font-weight: bold;
`
const InfoDetail = styled.div`
  flex: auto;
  overflow: hidden;
  /* flex-wrap: wrap; */
`

const ListImg = styled(CampImgView)`
  height: 150px;
`

const CategoryTag = styled.div`
  border-radius: 50px;
  border: 1px solid black;
  padding: var(--pad1) var(--pad2)  var(--pad1)  var(--pad2) ;
  flex-wrap: wrap;
  font-size: 12px;
`

const TagBox = styled.div`
  display: flex;
  gap: var(--pad2);
`

const CountView = styled.div`
  background-color: lightgrey;
  font-size: 10px;
  font-weight: bold;
  padding: var(--pad1);
`

const AddressBox = styled.div`
  padding: var(--pad1);
  font-size: 14px;
  color: gray;
`

const BookmarkBtn = styled.div`
    position: absolute;
    top:10px; 
    right:10px;
    /* transform: translate(-50%,-50%); */
    /* padding:0; */
    /* margin:0; */
    font-size:30px;
    filter: drop-shadow(10px 10px 10px 10px green);
    /* box-shadow: 0px 0px 10px 0px black; */
    z-index: 5;
`

const ItemName = styled.div`
  margin: auto;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
`
const NonData = styled(ItemBox)`
  text-align: center;
`