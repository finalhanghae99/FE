import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import CampListElement from "./CampListElement";
import { instance } from "../../api/axiosApi";
import { getCookies } from "../../api/cookieControler";
import { ItemBox } from "../elements/ItemBox";

const RecentViewCampForm = () => {
  const [history, setHistory] = useState(null);
  const fetchHistory = async (record) => {
    try {
      const { data } = await instance.post("/camping/permit/listten", {
        campingIdList: record,
      });
      setHistory(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    let record = getCookies("history");
    if (record === undefined) record = [];
    fetchHistory(record);
  }, []);

  return (
    <ItemBox>
      <ItemBox>
        <ItemName>최근 본 캠핑장 입니다.</ItemName>
      </ItemBox>
      <Main>
        {history?.map((v) => {
          return <CampListElement key={v.campingId} camp={v} />;
        })}
      </Main>
    </ItemBox>
  );
};

export default RecentViewCampForm;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const ItemName = styled.div`
  margin: auto;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
`;
