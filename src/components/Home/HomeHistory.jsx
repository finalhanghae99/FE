import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { instance } from "../../api/axiosApi";

import testImg from "../../img/test_camp_img.jpg"


function HomeHistory() {
  const [history, setHistory] = useState(null);
  const fetchHistory = async () => {
    try {
      const { data } = await instance.get("history");
      setHistory(data);
    } catch (error) { console.log(error); }
  };
  useEffect(() => {
    fetchHistory();
  }, [])
  console.log(history)

  return (
    <DivBox>
      <BoxHeader>
        <ItemName>최근 본 캠핑장</ItemName>
        <MoreLink>전체보기</MoreLink>
      </BoxHeader>
      {history?.map((v) => {
        return (
          <HistoryBox key={v.id}>
            <HistoryImg src={testImg} />
            <HistoryDetail>
              <HistoryName>{v.campingName}</HistoryName>
              <HistoryAddress>{`${v.address1} ${v.address2} ${v.address3} ${v.address4}`}</HistoryAddress>
            </HistoryDetail>
          </HistoryBox>
        )
      })}
    </DivBox>
  )
}

export default HomeHistory;

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