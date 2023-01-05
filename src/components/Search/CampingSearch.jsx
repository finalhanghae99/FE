import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { instance } from "../../api/axiosApi";

import { ItemBox, BoxHeader, BoxName, BoxMoreLink } from "../elements/ItemBox";


function CampingSearch() {
  const [searchList, setSearchList] = useState(null);
  const fetchSearchList = async () => {
    try {
      const { data } = await instance.get("search");
      setSearchList(data);
    } catch (error) { console.log(error); }
  };
  useEffect(() => {
    fetchSearchList();
  }, [])
  return (
    <ItemBox>
      <BoxName>{searchList?.length}개의 검색 결과가 있어요.</BoxName>
      <SearchList>
        {searchList?.map((v, i) => {
          return (
            <div key={v.id}>
              <SearchElement>
                <SearchDetail>
                  <SearchName>{v.campingName}</SearchName>
                  <SearchAddress>{`${v.address1} ${v.address2} ${v.address3} ${v.address4}`}</SearchAddress>
                </SearchDetail>
                <button>선택</button>
              </SearchElement>
              {(i+1 !==  searchList.length) ? <Line /> : null}
            </div>
          )
        })}

      </SearchList>
    </ItemBox>
  )
}
export default CampingSearch;

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
