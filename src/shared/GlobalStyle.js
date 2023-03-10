import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  :root {
    --Brand2 : #F5CC60;
    --Brand3 : #471B02;
    --Brand4 : #EDE0CB;
    --Brand5 : #05113D;
    --Brand6 : #cb6225;

    --BackColor1 : #f9f9f9;
    --BackColor2 : #F1F1F1;

    --Gray1 : #E0E0E0;
    --Gray2 : #E7E7E7;
    --Gray3 : #8A8A8A;
    --Gray4 : #343333;
    --Error : #DB0000;

    --pad1: 5px;
    --pad2: 10px;
  
    --interval : 24px;
  }
  body {
    font-family: 'Noto Sans KR', 'Roboto';
    @font-face {
      font-family: 'Roboto';
      font-style: normal;
      unicode-range: U+0041-005A, U+0061-007A;
    }
    
    /* width: 100%; */
    @media (min-width: 414px) {
      width : 414px;
      margin :auto;
    }
  }
  textarea, input, select, button {
    font-family: 'Roboto';
  }
`;

export default GlobalStyle;
