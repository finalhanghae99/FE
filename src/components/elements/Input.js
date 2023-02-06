import React from "react";
import styled from "styled-components";

const StInput = styled.input`
  width: 100%;
  height: 36px;
  border: none;
  border-bottom: 1px solid var(--Brand6);
  margin: var(--pad3);
  padding-left: 13px;
  font-size: 14px;
  font-family: var(--font);
  outline: none;
  box-sizing: border-box;
  border-radius: 0;
`;

const Input = (props) => {
  return (
    <StInput
      className={props.className}
      onChange={props.onChange}
      type={props.type}
      disabled={props.disabled}
      placeholder={props.placeholder}
      maxLength={props.maxLength}
      minLength={props.minLength}
    >
      {props.children}
    </StInput>
  );
};

export default Input;
