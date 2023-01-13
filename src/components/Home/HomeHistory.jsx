import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { instance } from "../../api/axiosApi";
import {ItemBox, BoxHeader, BoxName, BoxMoreLink} from "../elements/ItemBox"; 

import testImg from "../../img/test_camp_img.jpg"
import { getCookies } from "../../api/cookieControler";

function HomeHistory() {
  const [history, setHistory] = useState(null);
  const fetchHistory = async (record) => {
    try {
      const { data } = await instance.post("/camping/listfive", {"campingIdList":record });
      setHistory(data.data);
    } catch (error) { console.log(error); }
  };
  useEffect(() => {
    let record = getCookies("history")
    if(record === undefined) record = []
    record.splice(5)
    fetchHistory(record);
  }, [])
  return (
    <ItemBox>
      <BoxHeader>
        <BoxName>최근 본 캠핑장</BoxName>
        <BoxMoreLink>전체보기</BoxMoreLink>
      </BoxHeader>
      {history?.map((v) => {
        return (
          <HistoryBox key={v.campingId}>
            <HistoryImg src={v.imageUrl} />
            <HistoryDetail>
              <HistoryName>{v.campingName}</HistoryName>
              <HistoryAddress>{v.address3}</HistoryAddress>
            </HistoryDetail>
          </HistoryBox>
        )
      })}
    </ItemBox>
  )
}

export default HomeHistory;

const HistoryBox = styled.div`
  display: flex;
  border: 2px solid gray;
  margin-bottom: var(--pad2);
`
const HistoryImg = styled.img`
  object-fit: cover;
  width: 75px;
  height: 75px;
  background-position: center;
`
const HistoryDetail = styled.div`
  margin: auto 0 auto var(--pad2);
`
const HistoryName = styled.div`
  font-size: 16px;
  font-weight: bold;
`
const HistoryAddress = styled.div`
  font-size: 12px;
  color: gray;
`