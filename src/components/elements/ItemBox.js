import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"
import {RiArrowRightSLine} from "react-icons/ri"

const ItemBox = (props) => {
  return (
    <StBox className={props.className}>
      {props.children}
    </StBox>
  )
}

const BoxHeader = (props) => {
  return (
    <StHeader className={props.className}>
      {props.children}
    </StHeader>
  )
}

const BoxName = (props) => {
  return (
    <StName className={props.className} onClick={props.onClick}>
      {props.children}
    </StName>
  )
}

const BoxMoreLink = (props) => {
  return (
    <StLink className={props.className} to={props.to}>
      <RiArrowRightSLine />
      {props.children}
    </StLink>
  )
}

export {ItemBox, BoxHeader, BoxName, BoxMoreLink};

const StBox = styled.div`
  padding: var(--interval);
  width: 100%;
  box-sizing: border-box;
`
const StHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: var(--interval);
`
const StName = styled.div`
  font-size: 16px;
  font-weight: bold;
`
const StLink = styled(Link)`
  color: black;
  text-decoration: none;
  font-size: 24px;
`