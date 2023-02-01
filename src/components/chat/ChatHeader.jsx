import React from "react";
import { useEffect , useState} from "react";
import { useParams , useLocation} from "react-router-dom";
import { instance } from "../../api/axiosApi";

import styled from "styled-components";
import { ItemBox } from "../elements/ItemBox";

import numeral from "numeral";

function ChatHeader(){
  const {id} = useParams();
  const [opponent, setOpponent] = useState();
  const [reserve, setReserve] = useState();

  const location = useLocation();
  const reservationId = location.state;

  const fetchInfo = async() =>{
    try{
      const reserveInfo = await instance.get(`/chat/room/${reservationId}/${id}`);
      const chatter = await instance.get(`/chat/${id}`);
      console.log(reserveInfo, chatter)
      setOpponent(chatter.data.data.seller)
      setReserve(reserveInfo.data.data)
    }catch (error){
      console.log(error)
    }
  }
  useEffect(()=>{
    fetchInfo();
  },[])

  return(
    <ItemBox>
      <Oppnent>{opponent}</Oppnent>
      <ReserveInfo>
        <ReserveImg src={reserve?.imageUrl}></ReserveImg>
        <ReserveDetail>
          <ReserveName>{reserve?.campingName}</ReserveName>
          <ReservePrice>{numeral(reserve?.price).format('0,0')} 원</ReservePrice>
        </ReserveDetail>
      </ReserveInfo>
    </ItemBox>
  )
}

export default ChatHeader;

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