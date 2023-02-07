import React from "react";
import styled from "styled-components";

const StButton = styled.button`
  width: 100%;
  height: 56px;
  font-size: 16px;
  font-weight: 700;
  font-family: var(--font);
  color: white;
  background-color: var(--Brand6);
  border-radius: 36px;
  border: none;
  /* border: 1px solid #d9d9d9; */
  &:disabled{
    background-color: var(--Gray3);
  }
`;

const Button = (props) => {
  return (
    <StButton
      className={props.className}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </StButton>
  );
};

export default Button;
