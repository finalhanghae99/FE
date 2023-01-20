import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { instance } from "../../api/axiosApi";
import { FiSearch } from "react-icons/fi"

import { ItemBox, BoxHeader, BoxName, BoxMoreLink } from "../elements/ItemBox";


function NameSearch({ setCampingName, setCampingId , onClose }) {
  const [keyword, setKeyword] = useState("");
  const [searchList, setSearchList] = useState(null);

  const fetchSearchList = async () => {
    try {
      const { data } = await instance.get(`/camping/search?campingname=${keyword}`);
      // const { data } = await instance.get(`camp?campingName=${keyword}`);
      setSearchList(data.data);
    } catch (error) { console.log(error); }
  };
  const submitHandler = (event) => {
    event.preventDefault();
    if (keyword.trim() === "") {
      alert("입력 해주세요")
    } else {
      fetchSearchList()
    }
  }
  const clickCamp = (campingId, campingName) => {
    setCampingId(campingId)
    setCampingName(campingName)
    onClose();
  }

  return (
    <SearchWindow>
      <button onClick={onClose}>닫기</button>
      <ItemBox>
        <InputBox onSubmit={submitHandler}>
          {/* <form onSubmit={submitHandler}> */}
            <WordInput name="keyword" onChange={(event) => { setKeyword(event.target.value) }} />
            <SeartchBtn><FiSearch /></SeartchBtn>
          {/* </form> */}
        </InputBox>
        <BoxName>{searchList?.length}개의 검색 결과가 있어요.</BoxName>
        <SearchList>
          {searchList?.map((v, i) => {
            return (
                <SearchElement key={v.campingId} onClick={() => { clickCamp(v.campingId, v.campingName) }}>
                  <SearchDetail>
                    <SearchName>{v.campingName}</SearchName>
                    <SearchAddress>{v.address3}</SearchAddress>
                  </SearchDetail>
                  <SelectBtn>선택</SelectBtn>
                </SearchElement>
            )
          })}
        </SearchList>
      </ItemBox>
    </SearchWindow>
  )
}
export default NameSearch;



const SearchWindow = styled.div`
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  background-color: var(--Gray2);
  position: fixed;
  /* overflow: scroll; */
  bottom: 0;
  left: 0;
  z-index: 60;
  @media (min-width: 414px) {
    width : 414px;
    /* top: 50%; */
    /* height: 50vh; */
    left: 50%;
    transform: translate(-50%, 0%);
  }
`

const SearchList = styled.div`
  /* border: 1px solid black; */
  /* border-radius: 10px; */
  margin-bottom:50px;
  height: 80vh;
  overflow: scroll;
`

const SearchElement = styled.div`
  display: flex;
  justify-content: space-between;
  padding: var(--interval);
  background-color: white;
  border-radius: 8px;
  margin-top: 16px;

`

const Line = styled.div`
  border-bottom : 1px solid gray;
  content: "";
  height: 1px;
`

const SearchDetail = styled.div`
  margin: auto 0 auto var(--pad2);
  width: 70%;
`
const SearchName = styled.div`
  font-size: 16px;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 8px;
`
const SearchAddress = styled.div`
  font-size: 12px;
  color: gray;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`
// const WordInput = styled.input`
//   height: 30px;
//   display: flex;
//   box-sizing: border-box;
//   width: 100%;
//   padding: var(--pad1);
//   margin-top: var(--pad1);
// `

const WordInput = styled.input`
  /* background: ${props=>props.color}; */
  /* color: white; */
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
    /* color: white; */
  }
`

const SeartchBtn = styled.button`
  /* width: 80px; */
  border: none;
  background-color: rgba(0,0,0,0);
  height: 19px;
  font-size: 19px;
  position: absolute;
  right: 50px;
  line-height: 19px;
  /* top : 50% */
  transform: translateY(100%);
`

const InputBox = styled.form`
  padding-bottom: 16px;
  display: flex;
`
const SelectBtn = styled.button`
  border: none;
  border-radius:4px;
  background-color: var(--Brand6);
  color: white;
  line-height: 20px;
  /* padding: 4px 16px 4px 16px; */
  width: 60px;
`