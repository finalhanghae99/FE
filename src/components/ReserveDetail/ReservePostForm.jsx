import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useModal } from "../../hooks/useModal";
import { ItemBox } from "../elements/ItemBox";
import NameSearch from "../Search/NameSearch";
import DatePicker from "../elements/DatePicker";

import { instance } from "../../api/axiosApi";

function ReservePostForm() {
  const initialState = {
    startDate: null,
    endDate: null,
    price: 0,
    content: ""
  }
  const initialSet = {
    isName : false,
    isStart : false,
    isEnd : false,
    isContent : false
  }
  const [campingName, setCampingName] = useState("");
  const [campingId , setCampingId] = useState("");
  const [reserve, setReserve] = useState(initialState);
  const changeHandler = (event) => {
    const { name, value } = event.target;
    setReserve({ ...reserve, [name]: value })
  }
  const [isComp, setIsComp] = useState(false)
  const datePick = useModal();
  const campName = useModal();
  if (campName.isOpen) {
    document.body.style.position = 'fixed';
    document.body.style.width = "100%"
  } else {
    document.body.style.position = '';
  }
  useEffect(()=>{
    setIsComp(
      Boolean(campingName)
      && Boolean(reserve.startDate)
      && Boolean(reserve.endDate)
      && (reserve.content.trim() !== "")
    )
  },[reserve])

  const postFunc = async() =>{
    try {
      const {data} = await instance.post(`/reservation/${campingId}`, reserve)
    } catch(error){
      console.log(error)
    }
  }

  const postHandler = async (event) => {
    event.preventDefault();
    if(reserve.price === "" || reserve.price === 0){
      if(window.confirm("현재 양도금액을 설정되어 있지 않습니다. \n무료로 양도 하시겠습니까?")){
        console.log("post")
        postFunc();
      } else {
        console.log("not")
        return null
      }
    }else {
      if(window.confirm("양도글을 올리겠습니까?")){
        console.log("post")
        postFunc();
      } else {
        console.log("not")
        return null
      }
    }
  }
  return (
    <ItemBox>
      <PostForm>
        <EventBox onClick={campName.onOpen}>
          {(campingId && campingName) ?
            `${campingName}` : "캠핑장"}
        </EventBox>
        <EventBox onClick={datePick.onOpen}>
          {(reserve.startDate && reserve.endDate) ?
            `${reserve.startDate} ~ ${reserve.endDate}` : "일정"}
        </EventBox>
        <PriceInput
          type="number"
          name="price"
          onChange={changeHandler} />
        <PostContent
          name="content"
          onChange={changeHandler} />
      </PostForm>
      {campName.isOpen && 
        <NameSearch setCampingName={setCampingName} setCampingId={setCampingId} onClose={campName.onClose} />}
      {datePick.isOpen &&
        <DatePicker condition={reserve} setCondition={setReserve} onClose={datePick.onClose} />
      }
      <button onClick={postHandler} disabled={!isComp}>양도하기</button>
    </ItemBox>
  )
}

export default ReservePostForm;

const EventBox = styled.div`
  border: 0.5px solid black;
  border-radius: 5px;
  padding: var(--pad1);
  margin-bottom: var(--pad2);
`
const PriceInput = styled.input`
  border: 0.5px solid black;
  border-radius: 5px;
  padding: var(--pad1);
  margin-bottom: var(--pad2);
  box-sizing: border-box;
  width: 100%;
`
const PostForm = styled.form`
  padding: var(--pad2);
`
const PostContent = styled.textarea`
  border: 0.5px solid black;
  box-sizing: border-box;
  width: 100%;
  border-radius: 5px;
  box-sizing: border-box;
  height: 100px;
  resize: none;
`