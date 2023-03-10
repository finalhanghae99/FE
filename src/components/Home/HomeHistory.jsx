import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { instance } from "../../api/axiosApi";
import { ItemBox, BoxHeader, BoxName, BoxMoreLink } from "../elements/ItemBox";
import { getCookies } from "../../api/cookieControler";

function HomeHistory() {
  const navigate = useNavigate();
  const [history, setHistory] = useState(null);
  const fetchHistory = async (record) => {
    try {
      const { data } = await instance.post("/camping/permit/listfive", { "campingIdList": record });
      setHistory(data.data);
    } catch (error) { console.log(error); }
  };
  useEffect(() => {
    let record = getCookies("history")
    if (record === undefined) record = []
    record.splice(5)
    fetchHistory(record);
  }, [])
  

  return (
    <ItemBox>
      <BoxHeader>
        <BoxName onClick={()=>navigate(`/recentviewcamp`)}>최근 본 캠핑장</BoxName>
        <BoxMoreLink to="/recentviewcamp"></BoxMoreLink>
      </BoxHeader>
      <HistoryList>
        {history?.map((v) => {
          return (
            <HistoryBox key={v.campingId} onClick={() => { navigate(`campdetail/${v.campingId}`) }}>
              {v.imageUrl === "" ?
                <HistoryDiv>이미지 준비중</HistoryDiv> : <HistoryImg src={v.imageUrl} />
              }
              <HistoryDetail>
                <HistoryName>{v.campingName}</HistoryName>
                <HistoryAddress>{v.address3}</HistoryAddress>
              </HistoryDetail>
            </HistoryBox>
          )
        })}
        {(history?.length === 0) && (
          <NotFount>
            이력이 없습니다.
          </NotFount>
        )}
      </HistoryList>
    </ItemBox>
  )
}

export default HomeHistory;

const HistoryBox = styled.div`
  display: flex;
  border-radius: 8px;
  background-color: white;
`

const HistoryList = styled.div`
  display: flex;
  flex-direction:column;
  gap: 16px;
`

const HistoryImg = styled.img`
border-radius: 12px;
  object-fit: cover;
  max-width: 96px;
  min-width: 96px;
  height: 96px;
  padding: 4px;
  background-position: center;
`

const HistoryDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  object-fit: cover;
  max-width: 96px;
  min-width: 96px;
  height: 96px;
  padding: 4px;
  font-size: 12px;
  background-color: var(--Gray2);
`

const HistoryDetail = styled.div`
  margin: auto 16px auto var(--pad2);
  overflow: hidden;
`
const HistoryName = styled.div`
  font-size: 16px;
  font-weight: bold;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`
const HistoryAddress = styled.div`
  font-size: 12px;
  color: gray;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const NotFount = styled.div`
  text-align: center;
`