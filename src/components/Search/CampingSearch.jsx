import React, { useState, useEffect } from "react";
import { useNavigate, useParams , useSearchParams} from "react-router-dom";
import styled from "styled-components";
import { instance } from "../../api/axiosApi";
import CampListElement from "../Camp/CampListElement";
import { ItemBox, BoxHeader, BoxName, BoxMoreLink } from "../elements/ItemBox";
import { setCookies, getCookies } from "../../api/cookieControler";
import {ReactComponent as xMark} from "../../img/icons/x-mark.svg"

function CampingSearch() {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");
  const address1 = searchParams.get("address1");
  const address2 = searchParams.get("address2");

  let word = getCookies("word");
  if (word === undefined) word = [];
 
  // let {keyword, address1, address2} = useParams();
  const [searchList, setSearchList] = useState(null);

  // null 값 제거
  const search1 = (keyword)?
    (`campingname=${keyword}&`) : ("");
  const search2 = (address1)?
    (`address1=${address1}&`) : ("");
  const search3 = (address2)? 
    (`address2=${address2}&`) : ("");

  // 검색 조건 합치기
  let searchWord = ("" + search1 + search2 + search3)
  searchWord = searchWord.slice(0, searchWord.length - 1)

  const fetchSearchList = async () => {
    if(!searchWord) {
      return null
    } else {
      console.log("fetch")
      try {
        const { data } = await instance.get(`/camping/permit/search?${searchWord}`);
        setSearchList(data.data);
        word = word.filter((v) => {
          return v !== keyword;
        });
        word.unshift(keyword);
        word.splice(10);
        setCookies("word", word, {
          path: "/",
          maxAge: 604800,
        });
      } catch (error) { console.log(error); }
    }
  };
  useEffect(() => {
    fetchSearchList();
  }, [keyword, address1, address2])
  console.log(searchWord, Boolean(searchWord))


  return (
    <ItemBox>
      {(searchWord)? (
        (searchList?.length === 0) ? (<SearchCount>검색 결과가 없습니다</SearchCount>):(
          <>
            <SearchCount>{searchList?.length}개의 검색 결과가 있어요.</SearchCount>
            <SearchList>
              {searchList?.map((v)=>{
                return(
                  <CampListElement key={v.campingId} camp={v}/>
                )
              })}
            </SearchList>
          </>
        )
      ):(
        <>
          {word.map(v => {
            return <WordList>{v} <XBtn></XBtn></WordList>
          })}
        </>
      )}
      
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

const WordList = styled.div`
  display: "flex";
  justify-content: space-between;
`

const XBtn = styled(xMark)`
  
`