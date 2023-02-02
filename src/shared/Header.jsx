import React from "react";
import styled from "styled-components";
import HeaderLogo from "../img/HeaderLogo.svg";
import CampingZip from "../img/CampingZip.svg";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

function Headbox() {
  const navigate = useNavigate();

  return (
    <MainBox>
      <LogoBox>
        <SuvBox
          onClick={() => {
            navigate("/");
          }}
        >
          <Logo src={HeaderLogo} />
          <CampZip src={CampingZip} />
        </SuvBox>
        <SearchBtn onClick={()=>{navigate("/camp/search")}}>
          <FiSearch />
        </SearchBtn>
      </LogoBox>
    </MainBox>
  );
}

function Header() {
  return (
    <div>
      <Headbox />
      <Outlet />
    </div>
  );
}

export default Header;

const MainBox = styled.div`
  width: 100%;
  display: flex;
  position: fixed;
  top:0;
  align-items: flex-start;
  padding-top: 61px;
  border-bottom: 1px solid var(--Brand4);
  background-color: white;
  z-index: 5;
  @media (min-width: 414px) {
    width : 414px;
    left: 50%;
    transform: translate(-50%, 0%);
  }
`;

const LogoBox = styled.div`
  margin: 0px 24px 8px 24px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SuvBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.img`
  width: 36px;
  height: 36px;
`;

const CampZip = styled.img`
  width: 100px;
  height: 12px;
  margin-left: 12px;
`;

const SearchBtn = styled.button`
  border: none;
  background-color: rgba(0, 0, 0, 0);
  height: 19px;
  font-size: 19px;
`;
