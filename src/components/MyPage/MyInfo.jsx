import React, { useState, useEffect } from "react";

import { instance } from "../../api/axiosApi";

import styled from "styled-components";

import testImg from "../../img/test_camp_img.jpg";
import { BsPencilFill } from "react-icons/bs";

import { BoxHeader, ItemBox } from "../elements/ItemBox";
import { Link, useNavigate } from "react-router-dom";
import { useModal } from "../../hooks/useModal";
import MyInfoModify from "./MyInfoModify";
import { useCookies } from "react-cookie";
import { getCookies } from "../../api/cookieControler";
import Confirm from "../elements/Confirm";

function MyInfo() {
  const modify = useModal();
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();
  const [cookie, setCookie, removeCookie] = useCookies();
  const token = getCookies("id");
  const fetchUser = async () => {
    try {
      const { data } = await instance.get(`/mypage`);
      setUserInfo(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const logOut = async() => {
    const isConfirm = await Confirm({
      body: "로그아웃 하시겠습니까?"
    })
    if (!isConfirm){
    // if (!window.confirm("로그아웃 하시겠습니까?")) {
      return;
    } else {
      removeCookie("id", { path: "/" });
      navigate("/");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  console.log(userInfo);
  return (
    <>
    <Title></Title>
    <ItemBox>
      <ItemBox>
        <UserHeader>
          <UserImg src={userInfo?.profileImageUrl} />
          <UserName>{userInfo?.nickname}</UserName>
          <ModifyIcon onClick={modify.onOpen}>
            <BsPencilFill />
          </ModifyIcon>
        </UserHeader>
      </ItemBox>
      <ItemBox2>
        <UserLinks to="/mypage/mycamp">찜한 캠핑장</UserLinks>
        <UserLinks to="/mypage/myreview">나의 리뷰</UserLinks>
        <UserLinks>나의 캠핑장 양도 글</UserLinks>
        <UserLinks>채팅 내역</UserLinks>
        <div><UserBtn type="button" onClick={logOut}>로그아웃</UserBtn></div>
        {/* <UserLinks>채팅내역</UserLinks> */}
      </ItemBox2>
      {modify.isOpen? (<MyInfoModify userInfo={userInfo} onClose={modify.onClose}/>) : null}
    </ItemBox>
    </>
  );
}

export default MyInfo;

const Title = styled.div`
  width: 100%;
  height: 103px;
  border-bottom: 1px solid var(--Brand4);
`

const UserImg = styled.img`
  object-fit: cover;
  width: 75px;
  height: 75px;
  background-position: center;
  border-radius: 100%;
  background-color: lightgray;
`;

const UserHeader = styled.div`
  display: flex;
  line-height: 75px;
  width: 100%;
`;

const UserName = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-left: var(--pad2);
`;

const ItemBox2 = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  /* align-items: center; */
  margin: var(--interval);
`

const UserLinks = styled(Link)`
  width: 100%;
  text-decoration: none;
  color: black;
  font-weight: 400;
  font-size: 16px;
  margin-bottom: 24px;
  padding-left: var(--pad2);
  padding-bottom: var(--interval);
  border-bottom: 1px solid var(--Gray1);
`;

const UserBtn = styled.button`
  border: none;
  background-color: var(--Backcolor1);
  text-decoration: none;
  color: black;
  font-size: 16px;
  font-weight: 400;
  padding-left: var(--pad2);
`;

const ModifyIcon = styled.div`
  display: flex;
  justify-content: flex-end;
  line-height: 75px;
  align-items: center;
  flex: 1;
`;
