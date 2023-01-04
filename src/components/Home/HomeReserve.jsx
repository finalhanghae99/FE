import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { instance } from "../../api/axiosApi";

import testImg from "../../img/test_camp_img.jpg"

function HomeReserve() {
  const [reserve, setReserve] = useState(null);
  const fetchReserve = async () => {
    try {
      const { data } = await instance.get("reserve");
      setReserve(data);
    } catch (error) { console.log(error); }
  };
  useEffect(() => {
    fetchReserve();
  }, [])
  return (
    <DivBox>
      <BoxHeader>
        <ItemName>캠핑장 양도</ItemName>
        <MoreLink>더보기</MoreLink>
      </BoxHeader>
      <ReserveBox>
        {reserve?.map((v) => {
          return (
            <ReserveCard key={v.id}>
              <CardImg src={testImg} />
              <CardDetail>
                <CardTitle>{v.campingName}</CardTitle>
                <CardRegion>{v.address}</CardRegion>
                <CardDate>{v.startDate}</CardDate>
                <CardPrice>{v.price}원</CardPrice>
              </CardDetail>
            </ReserveCard>
          )
        })}
      </ReserveBox>
    </DivBox>
  )
}

export default HomeReserve;

const DivBox = styled.div`
  padding: var(--pad2);
`

const BoxHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin: var(--pad1);
`
const ItemName = styled.div`
  font-size: 16px;
`
const MoreLink = styled(Link)`
  color: gray;
  text-decoration: none;
  font-size: 12px;
`

const ReserveBox = styled.div`
  display: flex;
  overflow: scroll;
  gap: var(--pad2);
`

const ReserveCard = styled.div`
  min-width: 150px;
  max-width: 150px;
  border: 2px solid gray;
`

const CardImg = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100px;
  background-position: center;
`

const CardDetail = styled.div`
  padding: var(--pad2);
  display: flex;
  flex-direction: column;
  gap: var(--pad1)
`

const CardTitle = styled.div`
  font-size: 16px;
`

const CardRegion = styled.div`
  font-size: 12px;
  color:  gray;
`

const CardDate = styled.div`
  font-size: 12px;
`

const CardPrice = styled.div`
  font-size: 12px;
`