import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

import { instance } from "../../api/axiosApi";
import {ItemBox, BoxHeader, BoxName, BoxMoreLink} from "../elements/ItemBox"; 

import testImg from "../../img/test_camp_img.jpg"
import { getCookies } from "../../api/cookieControler";

function HomeHistory() {
  const navigate = useNavigate();
  const [history, setHistory] = useState(null);
  const fetchHistory = async (record) => {
    try {
      const { data } = await instance.post("/camping/permit/listfive", {"campingIdList":record });
      setHistory(data.data);
    } catch (error) { console.log(error); }
  };
  useEffect(() => {
    let record = getCookies("history")
    if(record === undefined) record = []
    record.splice(5)
    fetchHistory(record);
  }, [])
  const token = getCookies("id")

  return (
    <ItemBox>
      <BoxHeader>
        <BoxName>최근 본 캠핑장</BoxName>
        {(token)? (
           <BoxMoreLink to="/recentviewcamp"></BoxMoreLink>
        ):(
          <div onClick={()=>alert("로그인이 필요 합니다.")}>
            <BoxMoreLink></BoxMoreLink>
          </div>
        )}
      </BoxHeader>
      <HistoryList>
      {history?.map((v) => {
        return (
          <HistoryBox key={v.campingId} onClick={()=>{navigate(`campdetail/${v.campingId}`)}}>
            <HistoryImg src={v.imageUrl} />
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
  /* border: 2px solid gray; */
  border-radius: 8px;
  background-color: white;
  /* margin-bottom: var(--pad2); */
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
  /* width: 0%; */
  color: gray;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const NotFount = styled.div`
  text-align: center;
`