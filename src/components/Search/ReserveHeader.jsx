import React, { useState } from "react";

import { useModal } from "../../hooks/useModal";
import RegionWindow from "../elements/RegionWindow";
import DatePicker from "../elements/DatePicker";

import styled from "styled-components";


function ReserveHeader() {
  const region = useModal();
  const calendar = useModal();
  if(region.isOpen || calendar.isOpen){
    document.body.style.position='fixed';
    document.body.style.width = "100%"
  }else {
    document.body.style.position='';
  }

  const initialCondition = {
    startDate : null,
    endDate : null,
    address1 : "",
    address2 : "",
  }
  const [condition, setCondition] = useState(initialCondition);

  const changeHandler = (event) =>{
    const { name, value } = event.target;
    setCondition({...condition, [name] : value})
  }
  return (
    <SearchBox>
      <SearchBottom>
        <DateSelect onClick={calendar.onOpen}>
          날짜
        </DateSelect>
        <DateSelect onClick={region.onOpen}>
          지역
        </DateSelect>
      </SearchBottom>
      {region.isOpen && <RegionWindow name="address1" value={condition.address1} onChange={changeHandler} onClose={region.onClose} />}
      {calendar.isOpen && <DatePicker condition={condition} setCondition={setCondition} onClose={calendar.onClose} />}
    </SearchBox>
  )
}
export default ReserveHeader;

const SearchBox = styled.div`
  padding: var(--pad2);
`

const SearchBottom = styled.div`
  display: flex;
  margin-top: var(--pad1); 
   
`

const DateSelect = styled.div`
  height: 30px;
  margin-right: var(--pad1);
  border: 1px solid black;
  border-radius: 5px;
  justify-content: center;
  width: 50%;
  box-sizing: border-box;
  text-align: center;
  line-height: 30px;

`
