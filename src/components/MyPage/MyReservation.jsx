import React, { useState, useEffect } from "react";
import { instance } from "../../api/axiosApi";
import styled from "styled-components";
import MyReserveList from "../Reserve/MyReserveList";
import { useDispatch, useSelector } from "react-redux";
import { __getMyReserves } from "../../redux/modules/reservesSlice";


function MyReservation() {
  const dispatch = useDispatch()
  const { isLoading, error, reserves } = useSelector((state) => state.reserves);
  console.log(reserves)
  useEffect(() => {
    // fetchCamp();
    dispatch(__getMyReserves());
  }, [])
  return (
    <div>
      <Title>나의 캠핑장 양도</Title>
      <ListBox>
      {reserves?.map((v) => {
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
  /* margin: 35px 0px 12px 0px; */
  width: 100%;
  border-top: 1px solid var(--Brand4);
  margin-top: 103px;
  padding-top: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 500;
`