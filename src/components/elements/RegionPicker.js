import React, { useState } from "react";
import styled from "styled-components";
import { BoxHeader, ItemBox } from "./ItemBox";

import { CityObj} from "./regionData";

function RegionPicker(props) {
  const {setAddress1, setAddress2, onClose } = props;
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
          onClick={(event) => { 
            setAddress1(event.target.value)
            setSelectCity(key);
            setChecked(null); 
            setAddress2("");
          }} 
        />
        <RadioLabel htmlFor={key}>{key}</RadioLabel>
      </SelectItem>
    )
  })
  city1.push(
    <SelectItem key="all">
      <RadioInput 
        name="address1" 
        type="radio" 
        id="all"
        value="all"
        onClick={(event) => { 
          setAddress1("")
          setSelectCity("all");
          setChecked(null); 
          setAddress2("")
        }} 
      />
      <RadioLabel htmlFor="all">없음</RadioLabel>
    </SelectItem>
  )


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
            setAddress2(v)
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
        {/* <ModalTop>
          <TopBar></TopBar>
        </ModalTop> */}
        <RegionBox>
          <SelectBox>
            {city1}
          </SelectBox>
          <hr />
          <SelectBox2>
            {city2}
          </SelectBox2>
        </RegionBox>
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
  height: 365px;
  width: 100%;
  border-top-left-radius: 32px;
  border-top-right-radius: 32px;
  overscroll-behavior: contain;
  overflow-y: scroll;
  z-index: 60;
  @media (min-width: 414px) {
    width : 414px;
    /* top: 50%; */
    height: 50vh;
    left: 50%;
    transform: translate(-50%, 0%);
  }
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
// const ModalTop = styled.div`
//   height: 50px;
//   display: flex;
//   justify-content: center;
// `
// const TopBar = styled.div`
//   background-color: var(--Brand6);
//   border-radius: 50px;
//   height: 10px;
//   width: 100px;
//   margin: auto;
// `

const RegionBox = styled(ItemBox)`
  height: 70%;
  margin-top: var(--pad2);
  /* position: fixed; */
`

const SelectBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 30px;
  /* margin: auto; */
  text-align: center;
  line-height: 30px;
  width: 90%;
  margin: auto;
  gap : var(--pad2);
`

const SelectBox2 = styled.div`
  display:  grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows:repeat(auto-fill, 30px);
  /* flex-wrap: wrap; */
  text-align: center;
  line-height: 30px;
  /* overflow-y: scroll; */
  /* width: 90%; */
  height: 30%;
  margin: var(--pad2) auto var(--pad2) auto;
  padding: var(--pad2);
  gap : var(--pad2);
  z-index: 10;
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
