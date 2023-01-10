import React,{useState} from "react";
import styled from "styled-components";
import { useModal } from "../../hooks/useModal";
import { ItemBox } from "../elements/ItemBox";
import NameSearch from "../Search/NameSearch";

function ReservePostForm(){
  const initialState = {
    id : "",
    campingName : "",
    startDate : null,
    endDate : null,
    price : 0,
    content : ""
  }
  const [reserve , setReserve] = useState(initialState); 
  const changeHandler = (event) =>{
    const { name, value } = event.target;
    setReserve({...reserve, [name] : value})
  }
  const datePick = useModal();
  const campName = useModal();
  if(campName.isOpen){
    document.body.style.position='fixed';
    document.body.style.width = "100%"
  }else {
    document.body.style.position='';
  }
  console.log(reserve)
  return(
    <ItemBox>
      <PostForm>
        <EventBox onClick={campName.onOpen}>캠핑장</EventBox>
        <EventBox>일정</EventBox>
        <PriceInput 
          type="number"
          name = "price"
          onChange={changeHandler} />
        <PostContent 
          name="content"
          onChange={changeHandler}/>
      </PostForm>
      {campName.isOpen && <NameSearch reserve={reserve} setReserve={setReserve} onClose={campName.onClose} />}

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