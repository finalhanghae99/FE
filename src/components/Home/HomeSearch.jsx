import React from "react";
import styled from "styled-components";

function HomeSearch() {
  return (
    <SearchBox>
      <BtnBox>
        <MapBtn>지도 검색</MapBtn>
      </BtnBox>
      <WordInput />
      <SearchBottom>
        <RegionSelect>
        </RegionSelect>
        <SertchBtn>검색</SertchBtn>
      </SearchBottom>
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
  
`

const RegionSelect = styled.select`
  height: 30px;
  flex: 3;
  margin-right: var(--pad1);
`

const SertchBtn = styled.button`
  width: 80px;
  height: 30px;
  flex:1;
`