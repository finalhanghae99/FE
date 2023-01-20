import React from "react";
import styled from "styled-components";
import BottomBar from "./BottomBar";

function Footer() {
  return <Foot></Foot>;
}
function Layout({ children }) {
  return (
    <div>
      {children}
      <BottomBar />
      <Footer />
    </div>
  );
}
export default Layout;

const Foot = styled.div`
  height: 80px;
  background-color: rgba(0, 0, 0, 0);
`;
