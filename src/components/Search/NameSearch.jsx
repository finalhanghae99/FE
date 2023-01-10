import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { instance } from "../../api/axiosApi";

import { ItemBox, BoxHeader, BoxName, BoxMoreLink } from "../elements/ItemBox";


function NameSearch({ reserve, setReserve, onClose }) {
  const [keyword, setKeyword] = useState("");
  const [searchList, setSearchList] = useState(null);

  const fetchSearchList = async () => {
    try {
      const { data } = await instance.get(`camp?campingName=${keyword}`);
      setSearchList(data);
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
  const clickCamp = (id, campingName) => {
    setReserve({ ...reserve, id, campingName })
    onClose();
  }
  console.log(keyword)
  return (
    <SearchWindow>
      <button onClick={onClose}>닫기</button>
      <ItemBox>
        <form onSubmit={submitHandler}>
          <WordInput name="keyword" onChange={(event) => { setKeyword(event.target.value) }} />
        </form>
        <BoxName>{searchList?.length}개의 검색 결과가 있어요.</BoxName>
        <SearchList>
          {searchList?.map((v, i) => {
            return (
              <div key={v.id} onClick={() => { clickCamp(v.id, v.campingName) }}>
                <SearchElement>
                  <SearchDetail>
                    <SearchName>{v.campingName}</SearchName>
                    <SearchAddress>{`${v.address1} ${v.address2} ${v.address3} ${v.address4}`}</SearchAddress>
                  </SearchDetail>
                  <button>선택</button>
                </SearchElement>
                {(i + 1 !== searchList.length) ? <Line /> : null}
              </div>
            )
          })}
        </SearchList>
      </ItemBox>
    </SearchWindow>
  )
}
export default NameSearch;

const SearchWindow = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: lightskyblue;
  position: fixed;
  bottom: 0;
  left: 0;
`

const SearchList = styled.div`
  border: 1px solid black;
  border-radius: 10px;
  overflow: hidden;
`

const SearchElement = styled.div`
  display: flex;
  justify-content: space-between;
  padding: var(--pad2);
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
`
const SearchAddress = styled.div`
  font-size: 12px;
  color: gray;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`
const WordInput = styled.input`
  height: 30px;
  display: flex;
  box-sizing: border-box;
  width: 100%;
  padding: var(--pad1);
  margin-top: var(--pad1);
`