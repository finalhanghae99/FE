import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useModal } from "../../hooks/useModal";
import RegionPicker from "../elements/RegionPicker";

import { FiSearch } from "react-icons/fi"
import { HiOutlineMap } from "react-icons/hi"
import { AiOutlineDown } from "react-icons/ai";
import { Navigate, useNavigate } from "react-router-dom";

function HomeSearch({color}) {
  const region = useModal();
  const navigate = useNavigate();
  if (region.isOpen) {
    document.body.style.overflow = "hidden"
  } else {
    document.body.style.overflow = '';
  }
  const initalCondtion = {
    keyword: "",
    address1: "",
    address2: "",
  }
  const [condition, setCondition] = useState(initalCondtion)

  useEffect(() => {
    setCondition({ ...condition, address2: "" })
  }, [condition.address1])

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setCondition({ ...condition, [name]: value })
  }
  console.log(condition)
  const searchHandler = () => {
    const word1 = (condition.keyword.trim() === "") ? null : condition.keyword;
    const word2 = (condition.address1.trim() === "") ? null : condition.address1;
    const word3 = (condition.address2.trim() === "") ? null : condition.address2;
    navigate(`../camp/search?keyword=${condition.keyword}&address1=${condition.address1}&address2=${condition.address2}`);
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
        <WordInput name="keyword" value={condition.keyword} onChange={changeHandler} placeholder="캠핑장" color={color}/>
        <SeartchBtn onClick={searchHandler}><FiSearch /></SeartchBtn>
      </InputBox>
      <InputBox onClick={region.onOpen}>
        <RegionBtn color={color}>
          {condition.address1 ? `${condition.address1} ${condition.address2}` : "지역 선택"}
        </RegionBtn>
        <SeartchBtn>
          <AiOutlineDown />
        </SeartchBtn>
      </InputBox>
      {region.isOpen &&
        <RegionPicker onChange={changeHandler} onClose={region.onClose} />
      }
    </SearchBox>
  )
}
export default HomeSearch;

const SearchBox = styled.div`
  padding-left: var(--interval);
  padding-right: var(--interval);

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
  padding-bottom: 16px;
  display: flex;
`

const WordInput = styled.input`
  background: ${props=>props.color};
  color: white;
  border: none;
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
  &::placeholder{
    color: white;
  }
`

const RegionBtn = styled.div`
  background: ${props=>props.color};
  color: white;
  border: none;
  border-radius: 50px;
  box-sizing: border-box;
  padding-left: 24px;
  padding-right: 24px;
  height: 56px;
  font-size: 14px;
  display: flex;
  box-sizing: border-box;
  width: 100%;
  line-height: 56px;
  /* overflow: hidden; */
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

const SeartchBtn = styled.div`
  /* width: 80px; */
  height: 19px;
  font-size: 19px;
  position: absolute;
  right: 50px;
  line-height: 19px;
  /* top : 50% */
  transform: translateY(100%);
  color: white;
`

const MapIcon = styled.div`
  font-size:20px;
  top: -5px;
  position: relative;
`