import React, { useEffect } from "react";
import styled from "styled-components";
import { useModal } from "../../hooks/useModal";
import RegionPicker from "../elements/RegionPicker";
import { FiSearch } from "react-icons/fi";
import { HiOutlineMap } from "react-icons/hi";
import { AiOutlineDown } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Alert from "../elements/Alert";
import { useSelector, useDispatch } from "react-redux";
import {
  setAddress1,
  setKeyword,
  setAddress2,
} from "../../redux/modules/searchConditionSlice";

function HomeSearch({ color }) {
  const region = useModal();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (region.isOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }

  const { keyword, address1, address2 } = useSelector(
    (state) => state.searchCondition
  );

  const searchHandler = (event) => {
    event.stopPropagation();
    const word1 = keyword.trim() === "" ? null : keyword;
    const word2 = address1.trim() === "" ? null : address1;
    const word3 = address2.trim() === "" ? null : address2;
    if (word1 || word2 || word3) {
      navigate(
        `../camp/search?keyword=${keyword}&address1=${address1}&address2=${address2}`
      );
    } else {
      Alert({ body: "캠핑장 이름 또는 지역을 입력 해주세요" });
    }
  }
  const changeWordHandler = (e) =>{
    dispatch(setKeyword(e.target.value))
  }
  useEffect(()=>{
    dispatch(setKeyword(""))
    dispatch(setAddress1(""))
    dispatch(setAddress2(""))
  },[])
  useEffect(()=>{
    !(address2 === "") && (
      searchHandler()
    )
  },[address2])

  return (
    <SearchBox>
      <BtnBox>
        <MapIcon>
          <HiOutlineMap />
        </MapIcon>
        {/* <MapBtn>지도 검색</MapBtn> */}
      </BtnBox>
      <InputBox>
        <WordInput
          name="keyword"
          value={keyword}
          onChange={(event) => {
            changeWordHandler(event);
          }}
          placeholder="캠핑장"
          color={color}
          maxLength="12"
        />
        <SeartchBtn onClick={searchHandler}>
          <FiSearch />
        </SeartchBtn>
      </InputBox>
      <Suvdiv>
        <InputBox2 onClick={region.onOpen}>
          <RegionBtn color={color}>
            {address1 ? `${address1} ${address2}` : "지역 선택"}
          </RegionBtn>
          <SeartchBtn2>
            <AiOutlineDown />
          </SeartchBtn2>
        </InputBox2>
        <CheckBtn onClick={searchHandler}>검색</CheckBtn>
      </Suvdiv>
      {region.isOpen && (
        <RegionPicker
          onClose={region.onClose}
        />
      )}
    </SearchBox>
  );
}
export default HomeSearch;

const SearchBox = styled.div`
  padding-left: var(--interval);
  padding-right: var(--interval);
  position: relative;
`;
const BtnBox = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const InputBox = styled.div`
  padding-bottom: 16px;
  display: flex;
`;

const InputBox2 = styled.div`
  padding-bottom: 16px;
  display: flex;
  flex: 1;
`;

const WordInput = styled.input`
  color: black;
  border: 2px solid var(--Gray2);
  border-radius: 50px;
  box-sizing: border-box;
  padding-left: 24px;
  padding-right: 24px;
  height: 52px;
  font-size: 14px;
  display: flex;
  box-sizing: border-box;
  width: 100%;
`;

const RegionBtn = styled.div`
  border: 2px solid var(--Gray2);
  border-radius: 50px;
  box-sizing: border-box;
  padding-left: 24px;
  padding-right: 24px;
  height: 52px;
  font-size: 14px;
  display: flex;
  box-sizing: border-box;
  width: 100%;
  line-height: 52px;
`;

const SeartchBtn = styled.div`
  height: 19px;
  font-size: 19px;
  position: absolute;
  right: 48px;
  line-height: 19px;
  transform: translateY(100%);
`;

const SeartchBtn2 = styled.div`
  height: 19px;
  font-size: 19px;
  position: absolute;
  right: 148px;
  line-height: 19px;
  transform: translateY(100%);
`;

const MapIcon = styled.div`
  font-size: 20px;
  top: -5px;
  position: relative;
`;

const CheckBtn = styled.button`
  width: 98px;
  height: 52px;
  border-radius: 36px;
  font-size: 14px;
  color: white;
  border: 1px solid white;
  background-color: var(--Brand6);
  margin-left: 8px;
`;

const Suvdiv = styled.div`
  display: flex;
`;
