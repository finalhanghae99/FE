import React, { useState, useEffect } from "react";
import styled from "styled-components";
import numeral from "numeral";
import { instance } from "../../api/axiosApi";

import { ItemBox, BoxHeader, BoxName, BoxMoreLink } from "../elements/ItemBox";

import testImg from "../../img/test_camp_img.jpg"

function ReserveList() {
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
    <ItemBox>
      {reserve?.map((v, i) => {
        return (
          <div key={v.id}>
            <HistoryBox>
              <HistoryImg src={testImg} />
              <HistoryDetail>
                <HistoryName>{v.campingName}</HistoryName>
                <HistoryAddress>{`${v.address}`}</HistoryAddress>
                <div>{v.startDate}</div>
                <div>{numeral(v.price).format('0,0')}원</div>
              </HistoryDetail>
            </HistoryBox>
            {(i + 1 !== reserve.length) ? <Line /> : null}
          </div>
        )
      })}
    </ItemBox>
  )
}
export default ReserveList;

const Line = styled.div`
  border-bottom : 1px solid gray;
  content: "";
  height: 1px;
`

const HistoryBox = styled.div`
  display: flex;
  /* margin-bottom: var(--pad2); */
  padding:var(--pad2);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`
const HistoryImg = styled.img`
  object-fit: cover;
  width: 75px;
  height: 75px;
  background-position: center;
`
const HistoryDetail = styled.div`
  margin: auto var(--pad2) auto var(--pad2);
  overflow: hidden;
`
const HistoryName = styled.div`
  font-size: 16px;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`
const HistoryAddress = styled.div`
  font-size: 12px;
  color: gray;
`