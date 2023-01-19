import React, { useState, useEffect } from "react";
import { useNavigate, useParams , useSearchParams} from "react-router-dom";
import styled from "styled-components";

import { instance } from "../../api/axiosApi";
import CampListElement from "../Camp/CampListElement";

import { ItemBox, BoxHeader, BoxName, BoxMoreLink } from "../elements/ItemBox";

function CampingSearch() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  let keyword = searchParams.get("keyword");
  let address1 = searchParams.get("address1");
  let address2 = searchParams.get("address2");
  console.log(keyword, address1, address2)
  

  // let {keyword, address1, address2} = useParams();
  const [searchList, setSearchList] = useState(null);

  // null 값 제거
  if(keyword !== "") {
    (keyword = `campingname=${keyword}&`)}
    else { keyword = ""; }
  if(address1 !== "") {
    (address1 = `address1=${address1}&`)
  } else { address1 = ""}
  if(address2 !== "") {
    (address2 = `address2=${address2}&`);
  } else {address2 = ""}

  // 검색 조건 합치기
  let searchWord = (keyword + address1 + address2)
  searchWord = searchWord.slice(0, searchWord.length - 1)
  console.log(searchList)

  const fetchSearchList = async () => {
    try {
      const { data } = await instance.get(`/camping/search?${searchWord}`);
      setSearchList(data.data);
    } catch (error) { console.log(error); }
  };
  useEffect(() => {
    fetchSearchList();
  }, [searchWord])
  
  console.log(searchList)
  return (
    <ItemBox>
      <SearchCount>{searchList?.length}개의 검색 결과가 있어요.</SearchCount>
      <SearchList>
        {/* {searchList?.map((v, i) => {
          return (
            <div key={v.campingId}>
              <SearchElement>
                <SearchDetail>
                  <SearchName>{v.campingName}</SearchName>
                  <SearchAddress>
                    {`${v.address3}`}
                  </SearchAddress>
                </SearchDetail>
                <button onClick={()=>{navigate(`../campdetail/${v.campingId}`)}}>선택</button>
              </SearchElement>
              {(i+1 !==  searchList.length) ? <Line /> : null}
            </div>
          )
        })} */}
        {searchList?.map((v)=>{
          return(
            <CampListElement key={v.campingId} camp={v}/>
          )
        })}
      </SearchList>
    </ItemBox>
  )
}
export default CampingSearch;

const SearchCount = styled.div`
  margin-bottom: 16px;
`

const SearchList = styled.div`
  /* border: 1px solid black; */
  /* border-radius: 10px; */
  /* overflow: hidden; */
  display: flex;
  flex-direction: column;
  gap: 32px;
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
