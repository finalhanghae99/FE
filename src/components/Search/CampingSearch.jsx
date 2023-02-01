import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { instance } from "../../api/axiosApi";
import CampListElement from "../Camp/CampListElement";
import { ItemBox, BoxHeader, BoxName, BoxMoreLink } from "../elements/ItemBox";
import { setCookies, getCookies } from "../../api/cookieControler";
import { ReactComponent as xMark } from "../../img/icons/x-mark.svg"
import { useDispatch } from "react-redux";
import { setKeyword } from "../../redux/modules/searchConditionSlice";

function CampingSearch() {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");
  const address1 = searchParams.get("address1");
  const address2 = searchParams.get("address2");
  const dispatch = useDispatch();

  let words = getCookies("words");
  if (words === undefined) words = [];

  const [history, setHistory] = useState()

  // let {keyword, address1, address2} = useParams();
  const [searchList, setSearchList] = useState(null);

  console.log(keyword, address1,address2)
  // null 값 제거
  const search1 = (keyword) ?
    (`campingname=${keyword}&`) : ("");
  const search2 = (address1) ?
    (`address1=${address1}&`) : ("");
  const search3 = (address2) ?
    (`address2=${address2}&`) : ("");

  // 검색 조건 합치기
  let searchWord = ("" + search1 + search2 + search3)
  searchWord = searchWord.slice(0, searchWord.length - 1)

  const fetchSearchList = async () => {
    console.log(keyword, address1, address2)
    if (!searchWord) {
      return null
    } else {
      console.log("fetch")
      try {
        const { data } = await instance.get(`/camping/permit/search?${searchWord}`);
        setSearchList(data.data);
        words = words.filter((v) => {
          return v !== keyword;
        });
        (keyword) && (words.unshift(keyword));
        words.splice(10);
        setCookies("words", words, {
          path: "/",
          maxAge: 604800,
        });
      } catch (error) { console.log(error); }
    }
  };
  useEffect(() => {
    fetchSearchList();
    setHistory(words)
  }, [keyword, address1, address2])

  const delWord = (word) =>{
    words = words.filter((v)=>{
      return v !== word
    })
    console.log(words)
    setHistory(words)
    setCookies("words", words, {
      path: "/",
      maxAge: 604800,
    });
  }

  const delAllWord = () =>{
    setHistory([]);
    setCookies("words", [], {
      path: "/",
      maxAge: 604800,
    });
  }

  return (
    <ItemBox>
      {(searchWord) ? (
        (searchList?.length === 0) ? (<MsgCenter>검색 결과가 없습니다</MsgCenter>) : (
          <>
            <SearchCount>{searchList?.length}개의 검색 결과가 있어요.</SearchCount>
            <SearchList>
              {searchList?.map((v) => {
                return (
                  <CampListElement key={v.campingId} camp={v} />
                )
              })}
            </SearchList>
          </>
        )
      ) : (
        <>
          {(history?.length === 0) ? (
            <WordBox>
              <MsgCenter>최근 검색 내역이 없습니다.</MsgCenter>
            </WordBox>
          ) : (
            <WordBox>
              <AllDel onClick={delAllWord}>전체삭제</AllDel>
              {history?.map((v,i) => {
                return (
                  <WordList 
                    key={i} 
                    onClick={()=>dispatch(setKeyword(v))}>
                    <div>{v}</div> 
                    <XBtn onClick={()=>{delWord(v)}}></XBtn>
                  </WordList>
                )
              })}
            </WordBox>
          )}
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
const WordList = styled.div`
  display: flex;
  /* width: 100%; */
  justify-content: space-between;
  /* flex-direction: row; */
  text-align: center;
  align-items: center;
  margin-bottom: 16px;
`
const XBtn = styled(xMark)`
`
const WordBox = styled.div`
  width: 100%;
`
const AllDel = styled.div`
  text-decoration: underline;
  display: flex;
  justify-content: flex-end;
  margin-bottom: var(--interval);
  color: var(--Gray3);
`
const MsgCenter = styled.div`
  /* margin: auto; */
  text-align: center;
`
