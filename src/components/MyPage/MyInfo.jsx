import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ItemBox } from "../elements/ItemBox";
import { Link, useNavigate } from "react-router-dom";
import { useModal } from "../../hooks/useModal";
import MyInfoModify from "./MyInfoModify";
import { useCookies } from "react-cookie";
import { getCookies } from "../../api/cookieControler";
import starIcon from "../../img/Star.svg";
import bookMark from "../../img/BookMark.svg";
import myCamp from "../../img/MyCamp.svg";
import myChat from "../../img/MyChat.svg";
import Confirm from "../elements/Confirm";
import { ReactComponent as logout } from "../../img/User_Icon.svg";
import { useDispatch, useSelector } from "react-redux";
import { __getMyInfo } from "../../redux/modules/myPageSlice";

function MyInfo() {
  const modify = useModal();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { myInfo } = useSelector((state) => state.myInfo);
  const [cookie, setCookie, removeCookie] = useCookies();
  const token = getCookies("id");

  const logOut = async () => {
    const isConfirm = await Confirm({
      body: "로그아웃 하시겠습니까?",
    });
    if (!isConfirm) {
      return;
    } else {
      removeCookie("id", { path: "/" });
      navigate("/");
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      dispatch(__getMyInfo());
    }
  }, []);

  return (
    <>
      <ItemBox>
        <UserHeader>
          <UserImg src={myInfo?.profileImageUrl} />
          <ModifyIcon onClick={modify.onOpen}>수정하기</ModifyIcon>
        </UserHeader>
      </ItemBox>
      <UserName>{myInfo?.nickname}</UserName>
      <ItemBox2>
        <LinkList>
          <UserLinks to="/mypage/mycamp">
            <IconBox>
              <img src={bookMark} />
            </IconBox>
            찜한 캠핑장
          </UserLinks>
        </LinkList>
        <LinkList>
          <UserLinks to="/mypage/myreview">
            <IconBox>
              <img src={starIcon} />
            </IconBox>
            나의 리뷰
          </UserLinks>
        </LinkList>
        <LinkList>
          <UserLinks to="/mypage/myreserve">
            <IconBox>
              <img src={myCamp} />
            </IconBox>
            나의 캠핑장 양도 글
          </UserLinks>
        </LinkList>
        <LinkList style={{ border: "none" }}>
          <UserLinks>
            <IconBox>
              <img src={myChat} />
            </IconBox>
            채팅 내역
          </UserLinks>
        </LinkList>
      </ItemBox2>
      <GrayBorder />
      <ItemBox2>
        <LinkList style={{ border: "none" }}>
          <UserBtn type="button" onClick={logOut}>
            <Logout />
            로그아웃
          </UserBtn>
        </LinkList>
      </ItemBox2>
      {modify.isOpen ? (
        <MyInfoModify userInfo={myInfo} onClose={modify.onClose} />
      ) : null}
    </>
  );
}

export default MyInfo;

const GrayBorder = styled.div`
  background-color: var(--BackColor2);
  height: 8px;
  width: 100%;
`;

const UserImg = styled.img`
  object-fit: cover;
  width: 72px;
  height: 72px;
  background-position: center;
  border-radius: 100%;
  background-color: lightgray;
  margin: 15px 0px 0px 125px;
`;

const UserHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const UserName = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
  padding-bottom: 32px;
`;

const ItemBox2 = styled.div`
  display: flex;
  flex-direction: column;
  margin: var(--interval);
`;

const UserLinks = styled(Link)`
  display: flex;
  text-decoration: none;
  color: black;
  font-weight: 400;
  font-size: 16px;
`;

const UserBtn = styled.div`
  display: flex;
  align-items: center;
  border: none;
  background-color: var(--Backcolor1);
  text-decoration: none;
  color: black;
  font-size: 16px;
  font-weight: 400;
`;

const ModifyIcon = styled.div`
  font-size: 12px;
  margin: 0px 0px 30px 80px;
  color: var(--Gray4);
  border-bottom: 1px solid var(--Gray4);
`;

const Logout = styled(logout)`
  object-position: center;
  object-fit: cover;
  padding-right: var(--pad2);
  & path {
    stroke: black;
  }
`;

const LinkList = styled.div`
  display: flex;
  text-decoration: none;
  color: black;
  font-weight: 400;
  font-size: 16px;
  padding-left: var(--pad2);
  border-bottom: 1px solid var(--Gray1);
  height: 68px;
  align-items: center;
`;

const IconBox = styled.div`
  display: flex;
  align-items: center;
  padding-right: 12px;
  color: black;
`;
