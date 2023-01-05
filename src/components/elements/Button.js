import React from "react"
import styled from "styled-components"

const Button = (props) => {
  return (
    <StButton type="button" onClick={props.onClick}>
      {props.children}
    </StButton>
  )
}

export default Button

const StButton = styled.button`
  
`
