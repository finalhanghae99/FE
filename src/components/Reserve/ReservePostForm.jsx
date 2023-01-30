import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useModal } from "../../hooks/useModal";
import { ItemBox } from "../elements/ItemBox";
import NameSearch from "../Search/NameSearch";
import DatePicker from "../elements/DatePicker";

import { instance } from "../../api/axiosApi";
import { Navigate, useNavigate } from "react-router-dom";

import { FiSearch } from "react-icons/fi"
import Button from "../elements/Button";

function ReservePostForm() {
  const initialState = {
    startDate: null,
    endDate: null,
    price: 0,
    content: ""
  }
  const navigate = useNavigate();
  const [campingName, setCampingName] = useState("");
  const [campingId, setCampingId] = useState("");
  const [reserve, setReserve] = useState(initialState);
  const changeHandler = (event) => {
    const { name, value } = event.target;
    setReserve({ ...reserve, [name]: value })
  }
  const [isComp, setIsComp] = useState(false)
  const datePick = useModal();
  const campName = useModal();
  if (campName.isOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
  useEffect(() => {
    setIsComp(
      Boolean(campingName)
      && Boolean(reserve.startDate)
      && Boolean(reserve.endDate)
      && (reserve.content.trim() !== "")
    )
  }, [reserve])

  const postFunc = async () => {
    try {
      const { data } = await instance.post(`/reservation/${campingId}`, reserve)
    } catch (error) {
    }
  }

  const postHandler = async (event) => {
    event.preventDefault();
    if (reserve.price === "" || reserve.price == 0) {
      if (window.confirm("현재 양도금액을 설정되어 있지 않습니다. \n무료로 양도 하시겠습니까?")) {
        postFunc();
      } else {
        return null
      }
    } else {
      if (window.confirm("양도글을 등록하시겠습니까?")) {
        postFunc();
        navigate("../")
      } else {
        return null
      }
    }
  }
  console.log(reserve)
  return (
    <ItemBox>
      <PostForm onSubmit={postHandler}>
        <InputBox>
          <WordInput onClick={campName.onOpen}>
            {(campingId && campingName) ?
              `${campingName}` : "캠핑장 찾기"}
          </WordInput>
          <SeartchBtn><FiSearch /></SeartchBtn>
        </InputBox>
        <EventBox onClick={datePick.onOpen}>
          {(reserve.startDate && reserve.endDate) ?
            `${reserve.startDate} ~ ${reserve.endDate}` : "일정"}
        </EventBox>
        <PriceInput
          type="number"
          name="price"
          max="10000000"
          placeholder="금액을 입력해주세요"
          min="0"
          onChange={changeHandler} />
        <PostContent
          name="content"
          placeholder="게시글 내용을 작성해주세요"
          onChange={changeHandler} />
        <Button disabled={!isComp}>등록하기</Button>
      </PostForm>
      {campName.isOpen &&
        <NameSearch setCampingName={setCampingName} setCampingId={setCampingId} onClose={campName.onClose} />}
      {datePick.isOpen &&
        <DatePicker condition={reserve} setCondition={setReserve} onClose={datePick.onClose} />
      }
    </ItemBox>
  )
}

export default ReservePostForm;

const EventBox = styled.div`
  border: 1px solid var(--Gray1);
  height: 56px;
  line-height: 56px;
  border-radius: 10px;
  padding-left: 16px;
  font-size: 14px;
  margin-bottom: var(--pad2);
  box-sizing: border-box;
`
const PriceInput = styled.input`
  border: 0.5px solid black;
  border-radius: 5px;
  height: 56px;
  line-height: 56px;
  padding-left: 16px;
  margin-bottom: var(--pad2);
  box-sizing: border-box;
  width: 100%;
  font-size: 14px;
`
const PostForm = styled.form`
  /* padding: var(--pad2); */
`
const PostContent = styled.textarea`
  border: 0.5px solid black;
  box-sizing: border-box;
  width: 100%;
  border-radius: 5px;
  box-sizing: border-box;
  height: 100px;
  resize: none;
  padding: 16px;
  height: 240px;
  margin-bottom: 56px;
`
const InputBox = styled.form`
  padding-bottom: 16px;
  display: flex;
  align-items: center;
  position: relative;
`
const WordInput = styled.div`
  /* background: ${props => props.color}; */
  /* color: white; */
  border: 1px solid var(--Gray1);
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
`
const SeartchBtn = styled.button`
  /* width: 80px; */
  border: none;
  background-color: rgba(0,0,0,0);
  height: 19px;
  font-size: 19px;
  position: absolute;
  right: 24px;
  line-height: 19px;
  /* top : 50% */
  /* transform: translateY(100%); */
`