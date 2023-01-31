
import React, { useState, useEffect } from "react";
import { instance } from "../../api/axiosApi";
import styled from "styled-components";
import { ItemBox } from "../elements/ItemBox";
import CampImgView from "../elements/CampImgView";
import CampListElement from "../Camp/CampListElement";


function MyChatting() {
  const [myCamp, setMyCamp] = useState(null);
  const fetchMyChat = async () => {
    try {
      const data  = await instance.get(`chat/mypage/chatting`);
      console.log(data)
    } catch (error) { console.log(error); }
  };
  useEffect(() => {
    fetchMyChat();
  }, [])
  return (
    <ItemBox>
      나의 채팅방
    </ItemBox>
  )
}

export default MyChatting;

const ListImg = styled(CampImgView)`
  height: 150px;
`

const CategoryTag = styled.div`
  border-radius: 50px;
  border: 1px solid black;
  padding: var(--pad1) var(--pad2)  var(--pad1)  var(--pad2) ;
  flex-wrap: wrap;
  font-size: 12px;
`

const TagBox = styled.div`
  display: flex;
  gap: var(--pad2);
`

const CountView = styled.div`
  background-color: lightgrey;
  font-size: 10px;
  font-weight: bold;
  padding: var(--pad1);
`

const AddressBox = styled.div`
  padding: var(--pad1);
  font-size: 14px;
  color: gray;
`

const BookmarkBtn = styled.div`
    position: absolute;
    top:10px; 
    right:10px;
    /* transform: translate(-50%,-50%); */
    /* padding:0; */
    /* margin:0; */
    font-size:30px;
    filter: drop-shadow(10px 10px 10px 10px green);
    /* box-shadow: 0px 0px 10px 0px black; */
    z-index: 5;
`

const ItemName = styled.div`
  margin: auto;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
`