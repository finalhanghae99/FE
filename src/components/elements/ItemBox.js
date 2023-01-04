import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"

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
    <StName className={props.className}>
      {props.children}
    </StName>
  )
}

const BoxMoreLink = (props) => {
  return (
    <StLink className={props.className} to={props.to}>
      {props.children}
    </StLink>
  )
}

export {ItemBox, BoxHeader, BoxName, BoxMoreLink};
// export default ItemBox;

const StBox = styled.div`
  padding: var(--pad2);
`
const StHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin: var(--pad1);
`
const StName = styled.div`
  font-size: 16px;
`
const StLink = styled(Link)`
  color: gray;
  text-decoration: none;
  font-size: 12px;
`