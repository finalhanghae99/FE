import React from "react";
import styled from "styled-components";


function HomeRecommend(){
  return(
    <DivBox>
      캠핑 다녀 오셨나요? 지금 리뷰를 등록 해보세요.
      <RevLinkBtn>+</RevLinkBtn>
    </DivBox>
  )
}
export default HomeRecommend;

const DivBox = styled.div`
  padding: var(--pad2);
`

const RevLinkBtn = styled.button`
  border: 2px dashed black;
  height: 100px;
  box-sizing: border-box;
  width: 100%;
  background-color: white;
  margin-top: var(--pad2);
`