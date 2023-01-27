import React, { useState, useEffect } from "react";
import { instance } from "../../api/axiosApi";
import styled from "styled-components";
import { ItemBox } from "../elements/ItemBox";
import numeral from "numeral";
import moment from 'moment';
import MyReserveList from "../Reserve/MyReserveList";

function MyReservation() {
  const [myReserve, setMyReserve] = useState(null);
  const fetchCamp = async () => {
    try {
      const { data } = await instance.get(`/mypage/reservation`);
      setMyReserve(data.data.responseSearchDtoList);
    } catch (error) { console.log(error); }
  };
  useEffect(() => {
    fetchCamp();
  }, [])

  // const compReserve = async (id) =>{
  //   try {
  //     const { data } = await instance.get(`/reservation//changestate/${id}`);
  //     console.log(data);
  //   } catch (error) { console.log(error); }
  // };


  console.log(myReserve)
  return (
    <div>
      <Title>나의 캠핑장 양도</Title>
      <ListBox>
      {myReserve?.map((v) => {
        // const startDate = moment(v.startDate).format("YYYY년 MM월 DD일")
        // const endDate = moment(v.endDate).format("YYYY년 MM월 DD일")
        // return (
        //   <ListElement key={v.reservationId}>
        //     <ItemBox>
        //       <ReserveBox>
        //           <ReserveImg src={v.imageUrl} />
        //           <ReserveDetail>
        //             <ReserveAddress>{v.address1} {v.address2}</ReserveAddress>
        //             <ReserveName>{v.campingName}</ReserveName>
        //             <ReserveDate>{startDate} ~ {endDate}</ReserveDate>
        //             <ReservePrice>{numeral(v.price).format('0,0')}</ReservePrice>
        //           </ReserveDetail>
        //         </ReserveBox>
        //         {(v.tradeState)?( 
        //           <BtnBox>
        //             <WhiteBtn>삭제</WhiteBtn>
        //             <OrangeBtn>수정</OrangeBtn>
        //             <OrangeBtn>양도 완료</OrangeBtn>
        //           </BtnBox>
        //         ):(
        //           <BtnBox>
        //             <VoidSpace></VoidSpace>
        //             <VoidSpace></VoidSpace>
        //             <GrayBtn>양도 완료</GrayBtn>
        //           </BtnBox>
        //         )}
        //     </ItemBox>
        //   </ListElement>
        // )
        return <MyReserveList key={v.reservationId} reserve={v}/>
      })}
      </ListBox>
    </div>
  )
}

export default MyReservation;

const ReserveBox = styled.div`
  display: flex;
  /* border: 2px solid gray; */
  border-radius: 8px;
  background-color: white;
  /* margin-bottom: var(--pad2); */
  padding-bottom:var(--interval);
  
  border-radius: 0;
  border-bottom: 1px solid var(--Gray1);
`

const ReserveImg = styled.img`
  border-radius: 12px;
  object-fit: cover;
  max-width: 96px;
  min-width: 96px;
  height: 96px;
  /* padding: 4px; */
  background-position: center;
`
const ReserveDetail = styled.div`
  margin: auto 16px auto var(--pad2);
  overflow: hidden;
  /* gap:8px; */
  /* display: flex; */
  /* flex-direction: column; */
`
const ReserveName = styled.div`
  padding-bottom: 4px;
  font-size: 14px;
  font-weight: bold;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`
const ReserveAddress = styled.div`
  font-size: 10px;
  padding-bottom: 2px;
  /* width: 0%; */
  color: var(--Gray3);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`
const ReserveDate = styled.div`
  color: var(--Gray4);
  font-size: 12px;
  padding-bottom: 8px;
`
const ReservePrice = styled.div`
  font-size: 16px;
`

const BtnBox = styled.div`
  display: flex;
  /* margin: 20px 24px 40px 24px; */
  margin: auto;
  margin-top: 20px;
  gap:19px;
  height: 33px;
  justify-content: center;
`

const WhiteBtn = styled.button`
  background-color: white;
  color: var(--Brand6);
  border: 1px solid var(--Brand6);
  width: 96px;
`
const OrangeBtn = styled.button`
  background-color:var(--Brand6);
  color: white;
  border: 1px solid var(--Brand6);
  width: 96px;
`

const ListBox = styled.div`
  background-color: var(--BackColor1);
  display: flex;
  flex-direction: column;
  gap: 8px;
`
const ListElement = styled.div`
  background-color: white;
`
const Title = styled.div`
  margin: 35px 0px 12px 0px;
`
const VoidSpace = styled.div`
  width: 96px;
  background-color: none;
`

const GrayBtn = styled.button`
  background-color:var(--Gray2);
  color: var(--Gray3);
  border: none;
  width: 96px;
`