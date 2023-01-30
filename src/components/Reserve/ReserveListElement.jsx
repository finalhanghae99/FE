import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import numeral from "numeral";
import moment from "moment";

function ReserveListElement({reserve}) {
  const navigate = useNavigate();
  const startDate = moment(reserve.startDate).format("YYYY년 MM월 DD일");
  const endDate = moment(reserve.endDate).format("YYYY년 MM월 DD일");


  return (
    <ReserveCard
      onClick={() => { navigate(`../reserve/detail/${reserve.reservationId}`) }}>
      <CardImg src={reserve.imageUrl} />
      <CardDetail>
        <CardTitle>{reserve.campingName}</CardTitle>
        <CardRegion>{reserve.address1} {reserve.address2}</CardRegion>
        <CardDate>{startDate}</CardDate>
        <CardDate> ~ {endDate}</CardDate>
        <CardPrice>{numeral(reserve.price).format('0,0')}</CardPrice>
      </CardDetail>
    </ReserveCard>
  )
}

export default ReserveListElement;


const ReserveCard = styled.div`
  min-width: 156px;
  max-width: 156px;
  /* border: 2px solid gray; */
`

const CardImg = styled.img`
  object-fit: cover;
  width: 100%;
  height: 156px;
  background-position: center;
  border-radius: 6px;
`

const CardDetail = styled.div`
  padding-top: var(--pad2);
  display: flex;
  flex-direction: column;
  gap: var(--pad1);
`

const CardTitle = styled.div`
  font-size: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: bold;
  padding-bottom:var(--pad1);

`

const CardRegion = styled.div`
  font-size: 12px;
  color: var(--Gray3);
`

const CardDate = styled.div`
  font-size: 12px;
  color: var(--Gray3);
`

const CardPrice = styled.div`
  padding-top:var(--pad1);
  font-size: 18px;
  font-weight: bold;
`