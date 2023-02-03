import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { ItemBox } from "./ItemBox";
import { setAddress1 , setAddress2} from "../../redux/modules/searchConditionSlice";
import { CityObj} from "./regionData";

function RegionPicker(props) {
  const {onClose, searchHandler} = props;
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
        value=""
        onClick={(event) => { 
          dispatch(setAddress1(event.target.value))
          setSelectCity("all");
          setChecked(null); 
          dispatch(setAddress2(""));
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
        value=""
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

const GrayLine = styled.div`
  background-color:var(--Gray1);
  margin: 30px 0px 30px 0px;
  height: 1px;
  width: 100%;
  content: "";
`

const RegionBox = styled(ItemBox)`
  margin-top: var(--pad2);
  margin-bottom: var(--pad2);
`

const SelectBox = styled.div`
  display: grid;
  grid-template-columns: 70px 70px 70px 70px;
  grid-template-rows: 36px;
  text-align: center;
  line-height: 30px;
  width: 316px;
  margin: auto;
  gap : 12px;
`

const SelectBox2 = styled.div`
  display:  grid;
  width: 312px;
  margin: auto;
  grid-template-columns: 96px 96px 96px;
  grid-template-rows:repeat(auto-fill, 36px);
  text-align: center;
  line-height: 30px;
  height: 30%;
  padding: var(--pad2) auto var(--pad2) auto;
  gap : 12px;
  z-index: 10;
  box-sizing: border-box;
`

const SelectItem = styled.div`
`
const RadioLabel = styled.label`
  display: flex;
  text-align: center;
  justify-content: center;
  border-radius:50px;
  border: 1px solid var(--Gray3);
  height: 36px;
  line-height: 36px;
  font-size: 14px;
  /* border-radius:50px; */
  /* padding: var(--pad1) 15px var(--pad1) 15px; */
`

const RadioInput = styled.input`
  display: none;
  &:checked + ${RadioLabel}{
    border-color: var(--Brand6);
    background-color: var(--Brand6);
    color: white;
  };
`
