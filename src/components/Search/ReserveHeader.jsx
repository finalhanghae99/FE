import React, { useState , useEffect } from "react";

import { useModal } from "../../hooks/useModal";
import DatePicker from "../elements/DatePicker";

import styled from "styled-components";
import RegionPicker from "../elements/RegionPicker";
import {BsPencilFill } from "react-icons/bs"
import { useNavigate } from "react-router-dom";

import { getCookies } from "../../api/cookieControler";

function ReserveHeader() {
  const navigate = useNavigate();
  const region = useModal();
  const calendar = useModal();
  if (region.isOpen || calendar.isOpen) {
    document.body.style.overflow="hidden"
  }else {
    document.body.style.overflow='';
  }
  const initialCondition = {
    startDate: null,
    endDate: null,
    address1: "",
    address2: "",
  }
  const [condition, setCondition] = useState(initialCondition);
  useEffect(()=>{
    setCondition({...condition, address2 : ""})
  },[condition.address1])
  const changeHandler = (event) => {
    const { name, value } = event.target;
    setCondition({ ...condition, [name]: value })
  }
  const postNavigate = () =>{
    const token = getCookies("id")
    if(!token) {
      alert("로그인이 필요 합니다.")
      return ;
    } else{
    navigate("../reserve/post")
    }
  }
  return (
    <SearchBox>
      <SearchBottom>
        <DateSelect onClick={calendar.onOpen}>
          <div>
            {(condition.startDate && condition.endDate )? 
              `${condition.startDate} ~ ${condition.endDate}` : "날짜 선택"}
          </div>
        </DateSelect>
        <DateSelect onClick={region.onOpen}>
          <div>
            {condition.address1 ? `${condition.address1} ${condition.address2}` : "지역 선택"}
          </div>
        </DateSelect>
      </SearchBottom>
      {region.isOpen && 
        <RegionPicker onChange={changeHandler} onClose={region.onClose} />
      }
      {calendar.isOpen && 
        <DatePicker condition={condition} setCondition={setCondition} onClose={calendar.onClose} />
      }
      <div style={{position:"relative", "height" : "300px"}}>
        <PostBtn><BsPencilFill onClick={postNavigate}/></PostBtn>
      </div>
    </SearchBox>
  )
}
export default ReserveHeader;

const SearchBox = styled.div`
  padding: var(--pad2);
`

const SearchBottom = styled.div`
  display: flex;
  margin-top: var(--pad1); 
   
`

const DateSelect = styled.div`
  height: 30px;
  margin-right: var(--pad1);
  border: 1px solid black;
  border-radius: 5px;
  justify-content: center;
  width: 50%;
  box-sizing: border-box;
  text-align: center;
  line-height: 30px;

`
const PostBtn = styled.div`
  background-color: lightgray;
  border-radius: 100%;
  height: 30px;
  width: 30px;
  content: "";
  text-align: center;
  line-height: 30px;
  position: absolute;
  right : 0;
  bottom : 0;
`