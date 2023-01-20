import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getCookies } from "../api/cookieControler";

import CampIcon from "../img/Camp_Icon.svg"
import StarIcon from "../img/Star_Icon.svg"
import UserIcon from "../img/User_Icon.svg"

function BottomBar() {
  const navigate = useNavigate();
  const token = getCookies("id")

  const UserCheck = () => {
    (token) ? (
      navigate("/mypage")
    ) : (
      navigate("/login")
    )
  }

  return (
    <BarBody>
        <BarIcon
          onClick={() => { navigate("/") }}
          src={CampIcon} />
        <BarIcon
          onClick={() => { navigate("/") }}
          src={StarIcon} />
        <BarIcon
          onClick={UserCheck}
          src={UserIcon} />
    </BarBody>

  )
}

export default BottomBar;

const BarBody = styled.div`
  position: fixed;
  z-index: 50;
  bottom: 0;
  left: 0;
  width: 100%;
  border-radius: 36px;
  height: 64px;
  background-color: white;
  box-shadow: 1px 4px 11px 2px rgba(0,0,0,0.1);
  display: flex;
  padding: 16px 60px 16px 60px;
  justify-content: space-between;
  box-sizing: border-box;
  @media (min-width: 414px) {
    width : 414px;
    /* top: 50%; */
    left: 50%;
    transform: translate(-50%, 0%);
  }
`

const BarIcon = styled.img`
  height: 32px;
  width: 32px;
  object-position: center;
  object-fit: cover;
`

