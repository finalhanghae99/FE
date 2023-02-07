import React from "react";
import { useEffect , useState} from "react";
import { useParams , useLocation, useNavigate} from "react-router-dom";
import { instance } from "../../api/axiosApi";

import styled from "styled-components";
import { ItemBox } from "../elements/ItemBox";

import numeral from "numeral";

function ChatHeader({nickname}){
  const {id} = useParams();
  const [opponent, setOpponent] = useState();
  const [reserve, setReserve] = useState();
  const navigate = useNavigate();
  const fetchInfo = async() =>{
    try{
      const reserveInfo = await instance.get(`/chat/room/reservation/${id}`);
      const chatter = await instance.get(`/chat/${id}`);
      console.log(reserveInfo, chatter)
      setReserve(reserveInfo.data.data)
      if(chatter.data.data.seller === nickname){
        setOpponent(chatter.data.data.buyer)
      }else {
        setOpponent(chatter.data.data.seller)
      }
    }catch (error){
      console.log(error)
    }
  }
  useEffect(()=>{
    fetchInfo();
  },[])

  return(
    <ChatHead>
      <ItemBox>
        <Oppnent>{opponent}</Oppnent>
        <ReserveInfo onClick={()=>{navigate(`../reserve/detail/${reserve?.reservationId}`)}}>
          <ReserveImg src={reserve?.imageUrl}></ReserveImg>
          <ReserveDetail>
            <ReserveName>{reserve?.campingName}</ReserveName>
            <ReservePrice>{numeral(reserve?.price).format('0,0')} 원</ReservePrice>
          </ReserveDetail>
        </ReserveInfo>
      </ItemBox>
      <GrayLine />
    </ChatHead>
  )
}

export default ChatHeader;
const GrayLine = styled.div`
  height: 8px;
  width: 100%;
  background-color: var(--Gray2);
`

const ChatHead = styled.div`
  position: fixed;
  top: 72px;
  background-color: white;
  width: 100%;
    @media (min-width: 414px) {
    width : 414px;
    /* top: 50%; */
    left: 50%;
    transform: translate(-50%, 0%);
  }
`

const Oppnent = styled.div`
  font-size: 18px;
  text-align: center;
  margin-bottom: var(--interval);
`

const ReserveInfo = styled.div`
  display: flex;
  /* flex-direction: column; */
  gap:12px;
`

const ReserveImg = styled.img`
  /* border-radius: 12px; */
  object-fit: cover;
  max-width: 44px;
  min-width: 44px;
  height: 44px;
  /* padding: 4px; */
  background-position: center;
`
const ReserveDetail = styled.div`
  /* margin: auto 16px auto var(--pad2); */
  /* overflow: hidden; */
`
const ReserveName = styled.div`
  font-size: 14px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`
const ReservePrice = styled.div`
  font-size: 14px;
  font-weight: bold;
`