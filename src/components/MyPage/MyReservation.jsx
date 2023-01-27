import React, { useState, useEffect } from "react";
import { instance } from "../../api/axiosApi";
import styled from "styled-components";
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

  console.log(myReserve)
  return (
    <div>
      <Title>나의 캠핑장 양도</Title>
      <ListBox>
      {myReserve?.map((v) => {
        return <MyReserveList key={v.reservationId} reserve={v}/>
      })}
      </ListBox>
    </div>
  )
}

export default MyReservation;

const ListBox = styled.div`
  background-color: var(--BackColor1);
  display: flex;
  flex-direction: column;
  gap: 8px;
`
const Title = styled.div`
  margin: 35px 0px 12px 0px;
`