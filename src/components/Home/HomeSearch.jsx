import React, {useEffect, useState } from "react";
import styled from "styled-components";
import { useModal } from "../../hooks/useModal";
import RegionPicker from "../elements/RegionPicker";

import {AiOutlineDown} from "react-icons/ai";

function HomeSearch() {
  const region = useModal();
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

  return (
    <SearchBox>
      <BtnBox>
        <MapBtn>지도 검색</MapBtn>
      </BtnBox>
      <WordInput name="keyword" value={condition.keyword} onChange={changeHandler}/>
      <SearchBottom>
        <RegionSelect onClick={region.onOpen}>
          <div>
            {condition.address1? `${condition.address1} ${condition.address2}` : "지역 선택"}
          </div>
          <AiOutlineDown />
        </RegionSelect>
        <SertchBtn>검색</SertchBtn>
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

const WordInput = styled.input`
  height: 30px;
  display: flex;
  box-sizing: border-box;
  width: 100%;
  padding: var(--pad1);
  margin-top: var(--pad1);
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

const SertchBtn = styled.button`
  width: 80px;
  height: 30px;
  flex:1;
`