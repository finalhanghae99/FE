import React, { useState } from "react";
import styled from "styled-components";
import { BoxHeader, ItemBox } from "./ItemBox";

import { CityObj} from "./regionData";

function RegionPicker(props) {
  const {onChange, onClose } = props;
  const [selectCity, setSelectCity] = useState(null)
  const [checked , setChecked] = useState(null)

  const city1 = []
  Object.keys(CityObj).forEach((key, i) => {
    city1.push(
      <SelectItem key={i}>
        <RadioInput 
          name="address1" 
          type="radio" 
          id={key} 
          value={CityObj[key].official} 
          onChange={(event) => { 
            onChange(event); 
            setSelectCity(key);
            setChecked(null); 
          }} 
        />
        <RadioLabel htmlFor={key}>{key}</RadioLabel>
      </SelectItem>
    )
  })

  const cityDiv = CityObj[`${selectCity}`]?.data
  const city2 = cityDiv?.map((v, i) => {
    return (
      <SelectItem key={i}>
        <RadioInput 
          checked={checked === v } 
          name='address2' 
          type="radio" 
          id={v} 
          value={v}
          onChange={(event) => { 
            onChange(event); 
            setChecked(v);
          }} 
        />
        <RadioLabel htmlFor={v}>{v}</RadioLabel>
      </SelectItem>
    )
  })
  return (
    <div>
      <OutOfModal onClick={onClose} />
      <PopWindow>
        <ModalTop>
          <TopBar></TopBar>
        </ModalTop>
        <ItemBox>
          <SelectBox>
            {city1}
          </SelectBox>
          <hr />
          <SelectBox>
            {city2}
          </SelectBox>
        </ItemBox>
      </PopWindow>
    </div>
  )
}

export default RegionPicker;

const PopWindow = styled.div`
  background-color: white;
  color: black;
  position: fixed;
  bottom: 0;
  left: 0;
  border: none;
  height: 400px;
  width: 100%;
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
  overscroll-behavior: contain;
  overflow-y: scroll;
  z-index: 5;
`

const OutOfModal = styled.div`
  background-color: rgba(0,0,0,0.5);
  position: fixed;
  bottom:0;
  left: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`
const ModalTop = styled.div`
  height: 50px;
  display: flex;
  justify-content: center;
`
const TopBar = styled.div`
  background-color: var(--Brand6);
  border-radius: 50px;
  height: 10px;
  width: 100px;
  margin: auto;
`

const SelectBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  /* margin: auto; */
  text-align: center;
  line-height: 30px;
  width: 90%;
  margin: auto;
  gap : var(--pad2)
`
const SelectItem = styled.div`
  /* width: 25%; */
  /* height: 50px; */
  /* margin: var(--pad2); */
`
const RadioLabel = styled.label`
  border: 1px solid var(--Gray3);
  border-radius:50px;
  padding: var(--pad1) 15px var(--pad1) 15px;
`
const RadioInput = styled.input`
  display: none;
  &:checked + ${RadioLabel}{
    border-color: var(--Brand6);
    background-color: var(--Brand6);
    color: white;
  };
`
