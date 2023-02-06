import React, { useState, useEffect } from "react";
import { instance } from "../../api/axiosApi";
import styled from "styled-components";
import MyReserveList from "../Reserve/MyReserveList";
import { useDispatch, useSelector } from "react-redux";
import { __getMyReserves } from "../../redux/modules/reservesSlice";
import { ItemBox } from "../elements/ItemBox";


function MyReservation() {
  const dispatch = useDispatch()
  const { isLoading, error, reserves } = useSelector((state) => state.reserves);

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
      {(reserves?.length === 0) && (
          <NonData>양도글이 없습니다.</NonData>
        )}
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
  width: 100%;
  padding-top: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 500;
  font-weight: bold;
`

const NonData = styled(ItemBox)`
  text-align: center;
`