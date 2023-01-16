import React, {useEffect, useState } from "react";
import styled from "styled-components";
import { useModal } from "../../hooks/useModal";
import RegionPicker from "../elements/RegionPicker";

import {FiSearch} from "react-icons/fi"
import {HiOutlineMap} from "react-icons/hi"
import {AiOutlineDown} from "react-icons/ai";
import { Navigate, useNavigate } from "react-router-dom";

function HomeSearch() {
  const region = useModal();
  const navigate = useNavigate();
  if(region.isOpen){
    document.body.style.overflow="hidden"
  }else {
    document.body.style.overflow='';
  }
  const initalCondtion = {
    keyword : "",
    address1 : "",
    address2 : "",
  }
  const [condition, setCondition] = useState(initalCondtion)

  useEffect(()=>{
    setCondition({...condition, address2 : ""})
  },[condition.address1])

  const changeHandler = (event) =>{
    const { name, value } = event.target;
    setCondition({...condition, [name] : value})
  }
  console.log(condition)
  const searchHandler = () =>{
    const word1 = (condition.keyword.trim() === "")? null : condition.keyword;
    const word2 = (condition.address1.trim() === "")? null : condition.address1;
    const word3 = (condition.address2.trim() === "")? null : condition.address2;
    navigate(`../camp/search/${word1}/${word2}/${word3}`);
  }

  return (
    <SearchBox>
      <BtnBox>
        <MapIcon>
          <HiOutlineMap />
        </MapIcon>
        {/* <MapBtn>지도 검색</MapBtn> */}
      </BtnBox>
      <InputBox>
        <WordInput name="keyword" value={condition.keyword} onChange={changeHandler}/>
        <SertchBtn onClick={searchHandler}><FiSearch /></SertchBtn>
      </InputBox>
      <SearchBottom>
        <RegionSelect onClick={region.onOpen}>
          <div>
            {condition.address1? `${condition.address1} ${condition.address2}` : "지역 선택"}
          </div>
          <AiOutlineDown />
        </RegionSelect>
      </SearchBottom>
      {region.isOpen && 
        <RegionPicker onChange={changeHandler} onClose={region.onClose} />
      }
    </SearchBox>
  )
}
export default HomeSearch;

const SearchBox = styled.div`
  padding: var(--pad2);
`
const BtnBox = styled.div`
  display: flex;
  justify-content: flex-end;
`
const MapBtn = styled.button`
  width: 80px;
  height: 30px;
`
const InputBox = styled.div`
  padding: 24px;
  display: flex;
`

const WordInput = styled.input`
  background: rgba(255,255,255,0.5);
  color: white;
  border-radius: 50px;
  box-sizing: border-box;
  padding-left: 24px;
  padding-right: 24px;
  height: 56px;
  font-size: 14px;
  display: flex;
  box-sizing: border-box;
  width: 100%;
  /* padding: var(--pad1); */
  /* margin: var(--interval); */
`

const SearchBottom = styled.div`
  display: flex;
  margin-top: var(--pad1);
  gap: var(--pad1);
`

const RegionSelect = styled.div`
  display: flex;
  height: 30px;
  box-sizing: border-box;
  border: 0.5px solid black;
  border-radius: 5px;
  flex: 3;
  padding: var(--pad1);
  justify-content: space-between;
`

const SertchBtn = styled.div`
  /* width: 80px; */
  height: 30px;
  font-size: 19px;
  position: absolute;
  right: 0;
  top: -10px;
	right:30px;
`

const MapIcon = styled.div`
  font-size:20px;
`