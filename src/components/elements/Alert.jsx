import React from "react";
import { ItemBox } from "./ItemBox";

import styled from "styled-components";

function Alert() {
  return (
    <div>
      <OutOfModal />
      <ItemBox>
        사용할수 없습니다.
      </ItemBox>
    </div>
  )
}

export default Alert;

const OutOfModal = styled.div`
  background-color: rgba(0,0,0,0.5);
  position: fixed;
  bottom:0;
  left: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  justify-content: center;
  z-index: 99;
`