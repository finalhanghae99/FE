import React from "react";
import styled from "styled-components";
import { BoxHeader, ItemBox } from "./ItemBox";

function RegionWindow(props) {
  const {name, value, onChange , onClose} =props;
  const cityList = [
    "서울",
    "경기",
    "인천",
    "강원",
    "대전",
    "세종",
    "충복",
    "충남",
    "울산",
    "경북",
    "경남",
    "전복",
    "전남",
    "제주"
  ]

  return (
    <div>
      <OutOfModal onClick={onClose} />
      <PopWindow>
        <ModalTop>
          <TopBar></TopBar>
        </ModalTop>
        <ItemBox>
          <SelectBox>
            {cityList.map((v, i) => {
              return(
                <SelectItem key={i}>
                  <RadioInput name={name} type="radio" id={v} value={v} onChange={onChange}/>
                  <RadioLabel htmlFor={v}>{v}</RadioLabel>
                </SelectItem>
              )
            })}
          </SelectBox>
          <hr />

        </ItemBox>
      </PopWindow>
    </div>
  )
}

export default RegionWindow;

const PopWindow = styled.div`
  background-color: skyblue;
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
  background-color: blue;
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
  line-height: 40px;
  width: 80%;
  margin: auto;
`
const SelectItem = styled.div`
  width: 25%;
  /* height: 50px; */
  /* margin: var(--pad2); */
`
const RadioLabel = styled.label`
  border: 1px solid blue;
  border-radius:50px;
  padding: var(--pad1) 15px var(--pad1) 15px;
`
const RadioInput = styled.input`
  display: none;
  &:checked + ${RadioLabel}{
    background-color: blue;
    color: white;
  };
`
