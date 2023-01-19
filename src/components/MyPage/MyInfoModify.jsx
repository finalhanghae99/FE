import React, { useEffect, useState } from "react";
import styled from "styled-components";

function MyInfoModify(props) {
  const {userInfo, onClose} = props;
  const [nickname, setNickame] = useState("");
  const [profileImg, setProfileImg] = useState();
  useEffect(()=>{ 
    setNickame(userInfo.nickname)
  },[userInfo])
  
  return (
    <OutOfModal>
      <button onClick={onClose}>닫기</button>
      <UserForm>
        <UserImg src={userInfo.profileImageUrl}/>
        <NameInput value={nickname} onChange={(event)=>setNickame(event.target.value)} maxLength="10"/>
      <NameLength>{nickname.length} / 10</NameLength>
      </UserForm>
    </OutOfModal>

  )
}

export default MyInfoModify;

const OutOfModal = styled.div`
  background-color: rgba(0,0,0,0.5);
  position: fixed;
  bottom:0;
  left: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`

const UserForm = styled.div`
  width: 50%;
  margin: auto;
  margin-top: 200px;
  text-align: center;
`

const UserImg = styled.img`
  object-fit: cover;
  width: 75px;
  height: 75px;
  background-position: center;
  border-radius:100%;
  background-color: lightgray;
`

const NameInput = styled.input`
  background: none;
  border: none;
  border-bottom:2px solid white;
  text-align: center;
  color:white;
  margin: var(--interval) 0 var(--interval) 0;
  padding: var(--pad1);
  box-sizing: border-box;
`

const NameLength = styled.div`
  color: white;
`