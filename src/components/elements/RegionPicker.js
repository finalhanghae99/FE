import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { BoxHeader, ItemBox } from "./ItemBox";
import { setAddress1 , setAddress2} from "../../redux/modules/searchConditionSlice";
import { CityObj} from "./regionData";

function RegionPicker(props) {
  const {onClose} = props;
  const [selectCity, setSelectCity] = useState(null)
  const [checked , setChecked] = useState(null)
  const dispatch = useDispatch();
  

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
            dispatch(setAddress1(event.target.value))
            setSelectCity(key);
            setChecked(null); 
            dispatch(setAddress2(""));
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
          setAddress2("");
        }} 
      />
      <RadioLabel htmlFor="all">없음</RadioLabel>
    </SelectItem>
  )


  const cityDiv = CityObj[`${selectCity}`]?.data
  let city2 = cityDiv?.map((v, i) => {
    return (
      <SelectItem key={i}>
        <RadioInput 
          checked={checked === v } 
          name='address2' 
          type="radio" 
          id={v} 
          value={v}
          onChange={(event) => { 
            dispatch(setAddress2(v));
            setChecked(v);
          }} 
          onClick={onClose}
        />
        <RadioLabel htmlFor={v}>{v}</RadioLabel>
      </SelectItem>
    )
  })
  city2?.unshift(
    <SelectItem key="all2">
      <RadioInput 
        name="address2" 
        type="radio" 
        id="all2"
        value="all2"
        onChange={(event) => { 
          setAddress2("")
          setChecked("all2");
        }} 
        onClick={onClose}
      />
      <RadioLabel htmlFor="all2">전체</RadioLabel>
    </SelectItem>
  )
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
          <GrayLine />
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
  z-index: 10;
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

const GrayLine = styled.div`
  background-color:var(--Gray1);
  margin: 30px 0px 30px 0px;
  height: 1px;
  width: 100%;
  content: "";
`

const RegionBox = styled(ItemBox)`
  /* height: 70%; */
  margin-top: var(--pad2);
  margin-bottom: var(--pad2);
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
  padding: var(--pad2) auto var(--pad2) auto;
  /* padding: var(--pad2); */
  gap : var(--pad2);
  z-index: 10;
  box-sizing: border-box;
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
