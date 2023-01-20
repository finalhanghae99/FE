import React,{useState, useEffect} from "react";
import { AiOutlineLeft } from "react-icons/ai";
import { BsBookmark } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import CampListElement from "./CampListElement";

import { instance } from "../../api/axiosApi";
import { getCookies } from "../../api/cookieControler";
import { ItemBox } from "../elements/ItemBox";


const RecentViewCampForm = () => {
  const navigate = useNavigate();
  const [history, setHistory] = useState(null);
  const fetchHistory = async (record) => {
    try {
      const { data } = await instance.post("/review/listten", {"campingIdList":record });
      setHistory(data.data);
    } catch (error) { console.log(error); }
  };
  useEffect(() => {
    let record = getCookies("history")
    if(record === undefined) record = []
    fetchHistory(record);
  }, [])
  console.log(history)
  return (
    <ItemBox>
      <ItemBox>
        <ItemName>최근 본 캠핑장 입니다.</ItemName>
      </ItemBox>
      <Main>
      {/* <Main>
        <BackBtn
          onClick={() => {
            navigate(`/`);
          }}
        >
          <AiOutlineLeft />
        </BackBtn>
        <div>최근 본 캠핑장이에요.</div>
      </Main>
      <Box>
        <Pic>
          <BsBookmark />
          사진
        </Pic>
        <Suv>
          <CampName>
            <Name>학암포 오토 캠핑장</Name>
            <Rev>N개의 리뷰</Rev>
          </CampName>
          <Add>충청남도 태안군 원북면 옥파로 5길 66-107</Add>
          <Tag>
            <Category>해변</Category>
            <Category>국립공원</Category>
            <Category>해변</Category>
          </Tag>
        </Suv>
      </Box> */}
      {history?.map((v)=>{
        return(
          <CampListElement key={v.campingId} camp={v}/>
        )
      })}
      </Main>
    </ItemBox>
  );
};

export default RecentViewCampForm;

const Main = styled.div`
  display: flex;
  /* align-items: center; */
  /* width: 360px; */
  /* margin-top: 29px; */
  flex-direction: column;
  gap: 32px;
`;

const ItemName = styled.div`
  margin: auto;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
`