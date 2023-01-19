import React, { useState, useEffect } from "react";

import { instance } from "../../api/axiosApi";

import styled from "styled-components";

import testImg from "../../img/test_camp_img.jpg"
import { BsPencilFill } from "react-icons/bs";

import { BoxHeader, ItemBox } from "../elements/ItemBox";
import { Link } from "react-router-dom";
import { useModal } from "../../hooks/useModal";
import MyInfoModify from "./MyInfoModify";

function MyInfo() {
  const modify = useModal();
  const [userInfo, setUserInfo] = useState(null);
  const fetchUser = async () => {
    try {
      const { data } = await instance.get(`/mypage`);
      setUserInfo(data.data);
    } catch (error) { console.log(error); }
  };
  useEffect(() => {
    fetchUser();
  }, [])
  console.log(userInfo)
  return (
    <ItemBox>
      <ItemBox>
        <UserHeader>
          <UserImg src={userInfo?.profileImageUrl}/>
          <UserName>{userInfo?.nickname}</UserName>
          <ModifyIcon onClick={modify.onOpen}><BsPencilFill /></ModifyIcon>
        </UserHeader>
      </ItemBox>

      <ItemBox>
        <UserLinks to="/mypage/mycamp">찜한 캠핑장</UserLinks><br /><hr />
        <UserLinks to="/mypage/myreview">나의 리뷰</UserLinks><br /><hr />
        {/* <UserLinks>채팅내역</UserLinks> */}
      </ItemBox>
      {modify.isOpen? (<MyInfoModify userInfo={userInfo} onClose={modify.onClose}/>) : null}
    </ItemBox>
  )
}

export default MyInfo;

const UserImg = styled.img`
  object-fit: cover;
  width: 75px;
  height: 75px;
  background-position: center;
  border-radius:100%;
  background-color: lightgray;
`

const UserHeader = styled.div`
  display: flex;
  line-height: 75px;
  width: 100%;
`

const UserName = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-left: var(--pad2);
`

const UserLinks = styled(Link)`
  text-decoration: none;
  color: black;
  font-weight: bold;
  padding: var(--pad2);
`

const ModifyIcon = styled.div`
  display: flex;
  justify-content: flex-end;
  line-height: 75px;
  align-items: center;
  flex:1
`