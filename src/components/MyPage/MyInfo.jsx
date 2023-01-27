import React, { useState, useEffect } from "react";
import { instance } from "../../api/axiosApi";
import styled from "styled-components";
import { ItemBox } from "../elements/ItemBox";
import { Link, useNavigate } from "react-router-dom";
import { useModal } from "../../hooks/useModal";
import MyInfoModify from "./MyInfoModify";
import { useCookies } from "react-cookie";
import { getCookies } from "../../api/cookieControler";
import logout from "../../img/User_Icon.svg";
import starIcon from "../../img/Star.svg"
import bookMark from "../../img/BookMark.svg"
import myCamp from "../../img/MyCamp.svg"
import myChat from "../../img/MyChat.svg"

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

  const logOut = () => {
    if (!window.confirm("로그아웃 하시겠습니까?")) {
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
        <UserHeader>
          <UserImg src={userInfo?.profileImageUrl} />
          <ModifyIcon onClick={modify.onOpen}>수정하기</ModifyIcon>
        </UserHeader>
      </ItemBox>
      <UserName>{userInfo?.nickname}</UserName>
      <ItemBox2>
        <UserLinks to="/mypage/mycamp">
        <BookDiv><img src={bookMark} style={{width:"100%"}}/></BookDiv>
          <ContentName>찜한 캠핑장</ContentName>
          </UserLinks>
        <UserLinks to="/mypage/myreview">
        <img src={starIcon} />
          나의 리뷰</UserLinks>
        <UserLinks>
          <img src={myCamp} />
          나의 캠핑장 양도 글</UserLinks>
        <UserLinks>
          <img src={myChat} />
          채팅 내역</UserLinks>
          <UserBtn type="button" onClick={logOut}>
          <Logout src={logout} />
            로그아웃
          </UserBtn>
      </ItemBox2>
      {modify.isOpen ? (
        <MyInfoModify userInfo={userInfo} onClose={modify.onClose} />
      ) : null}
    </>
  );
}

export default MyInfo;

const Title = styled.div`
  width: 100%;
  height: 103px;
  border-bottom: 1px solid var(--Brand4);
`;

const UserImg = styled.img`
  object-fit: cover;
  width: 72px;
  height: 72px;
  background-position: center;
  border-radius: 100%;
  background-color: lightgray;
  margin: 15px 0px 0px 130px;
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
  margin-left: var(--pad1);
  padding-bottom: 32px;
  border-bottom: 8px solid var(--BackColor2);
`;

const ItemBox2 = styled.div`
  display: flex;
  flex-direction: column;
  margin: var(--interval);
`;

const UserLinks = styled(Link)`
  display: flex;
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
  display: flex;
  align-items: center;
  border: none;
  background-color: var(--Backcolor1);
  text-decoration: none;
  color: black;
  font-size: 16px;
  font-weight: 400;
  padding-left: var(--pad2);
`;

const ModifyIcon = styled.div`
  font-size: 12px;
  margin: 0px 0px 30px 80px;
  color: var(--Gray4);
  border-bottom: 1px solid var(--Gray4);
`;

const Logout = styled.img`
  object-position: center;
  object-fit: cover;
  padding-right: var(--pad2);
`

const BookDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 16px;
  height: 16px;
`

const ContentName = styled.div`
  height: 20px;
  line-height: 20px;
`