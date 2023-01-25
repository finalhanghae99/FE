import React from "react";
import styled from "styled-components";

const StInput = styled.input`
  /* width: 314px; */
  width: 100%;
  height: 36px;
  /* background-color: var(--BackColor1); */
  border: none;
  border-bottom: 1px solid var(--Brand6);
  margin: var(--pad3);
  padding-left: 13px;
  font-size: 14px;
  font-family: var(--font);
  outline: none;
  box-sizing: border-box;
`;

const Input = (props) => {
  return (
    <StInput
      className={props.className}
      onChange={props.onChange}
      type={props.type}
      placeholder={props.placeholder}
    >
      {props.children}
    </StInput>
  );
};

export default Input;
