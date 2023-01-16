import React from "react"
import styled from "styled-components"

const StInput = styled.input`
  width: 314px;
  height: 36px;
  background-color: white;
  border: none;
  border-bottom: 1px solid var(--Brand6);
  margin: var(--pad3);
  padding-left: 13px;
  font-size: 14px;
  outline: none;
`

const Input = (props) => {
  return (
    <StInput className={props.className}>
      {props.children}
    </StInput>
  )
}

export default Input