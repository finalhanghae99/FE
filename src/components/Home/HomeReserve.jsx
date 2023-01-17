import React, { useEffect, useState } from "react";
import styled from "styled-components";
import numeral from "numeral";

import { instance } from "../../api/axiosApi";
import {ItemBox, BoxHeader, BoxName, BoxMoreLink} from "../elements/ItemBox"; 

import testImg from "../../img/test_camp_img.jpg"
import { useNavigate } from "react-router-dom";

function HomeReserve() {
  const navigate = useNavigate();
  const [reserve, setReserve] = useState(null);
  const fetchReserve = async () => {
    try {
      const { data } = await instance.get("reservation/listsix");
      setReserve(data.data);
    } catch (error) { console.log(error); }
  };
  useEffect(() => {
    fetchReserve();
  }, [])
  return (
    <ItemBox>
      <BoxHeader>
        <BoxName>캠핑장 양도</BoxName>
        <BoxMoreLink to="reserve/search"></BoxMoreLink>
      </BoxHeader>
      <ReserveBox>
        {reserve?.map((v) => {
          return (
            <ReserveCard key={v.reservationId} 
              onClick={()=>{navigate(`../reserve/detail/${v.reservationId}`)}}>
              <CardImg src={v.imageUrl} />
              <CardDetail>
                <CardTitle>{v.campingName}</CardTitle>
                <CardRegion>{v.address1} {v.address2}</CardRegion>
                <CardDate>{v.startDate}</CardDate>
                <CardDate> ~ {v.endDate}</CardDate>
                <CardPrice>{numeral(v.price).format('0,0')}</CardPrice>
              </CardDetail>
            </ReserveCard>
          )
        })}
      </ReserveBox>
    </ItemBox>
  )
}

export default HomeReserve;

const ReserveBox = styled.div`
  display: flex;
  overflow: scroll;
  gap: 4px;
`

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