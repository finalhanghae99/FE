import React,{useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import numeral from "numeral";

import styled from "styled-components";

import { instance } from "../../api/axiosApi";
import CampImgView from "../elements/CampImgView";

import { ItemBox, BoxHeader, BoxName, BoxMoreLink } from "../elements/ItemBox";

import testImg from "../../img/test_camp_img.jpg"

function DetailHeader() {
  const {id} = useParams();
  const [reserve, setReserve] = useState(null);
  const fetchReserve = async () => {
    try {
      const { data } = await instance.get(`reservation/${id}`);
      setReserve(data.data);
    } catch (error) { console.log(error); }
  };
  useEffect(() => {
    fetchReserve();
  }, [])
  console.log(reserve)
  return (
    <div>
    <CampImgView img={reserve?.imageUrl}/>
    <ItemBox>
      <ItemBox>
        <BoxName>{reserve?.campingName}</BoxName>
        <SubText>{`${reserve?.address1} ${reserve?.address2}`}</SubText>
        <div>{reserve?.startDate}</div>
        <div>{numeral(reserve?.price).format('0,0')}원</div>
      </ItemBox>
      <hr />
      <ItemBox>
        {reserve?.content}
      </ItemBox>
    </ItemBox>
    <ChatBtn>채팅하기</ChatBtn>
    </div>
  )
}

export default DetailHeader;

const SubText = styled.div`
  color: gray;
  font-size : 12px;
`
const ChatBtn = styled.button`
  width: 100%;
  height: 50px;
  border:none;
  font-weight: bold;
  background-color: wheat;
`

