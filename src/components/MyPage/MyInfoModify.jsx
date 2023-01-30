import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { AiOutlineCamera } from "react-icons/ai";

function MyInfoModify(props) {
  const imgRef = useRef("");
  const { userInfo, onClose } = props;
  const [nickname, setNickame] = useState("");
  const [profileImg, setProfileImg] = useState();

  const onFileUpload = () => {
    imgRef.current.click();
  };

  const onUploadImg = (e) => {
    setProfileImg(e.target.files[0]);
  };
  console.log(profileImg);

  const ImgPlus = () => {
    return (
      <label id="fileUpload" htmlFor="fileUpload" onChange={onUploadImg}>
        <input
          id="fileUpload"
          type="file"
          accept="image/*"
          ref={imgRef}
          style={{ display: "none" }}
        />
        <AddBtn onClick={onFileUpload}>
          <AiOutlineCamera />
        </AddBtn>
      </label>
    );
  };

  const ImgPreview = () => {
    if (profileImg) {
      return (
        <UserImg
          width="100%"
          height="100%"
          src={URL.createObjectURL(profileImg)}
        />
      );
    } else {
      return <UserImg src={userInfo.profileImageUrl} />;
    }
  };

  useEffect(() => {
    setNickame(userInfo.nickname);
  }, [userInfo]);

  return (
    <OutOfModal>
      <BtnBox>
        <Xbtn onClick={onClose}>취소</Xbtn>
        <Xbtn>완료</Xbtn>
      </BtnBox>
      <UserForm>
        <ImgPreview />
        <ImgPlus />
        <NameInput
          value={nickname}
          onChange={(event) => setNickame(event.target.value)}
          maxLength="6"
        />
        <NameLength>{nickname.length} / 6</NameLength>
      </UserForm>
    </OutOfModal>
  );
}

export default MyInfoModify;

const OutOfModal = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

const UserForm = styled.div`
  width: 50%;
  margin: auto;
  margin-top: 120px;
  text-align: center;
`;

const UserImg = styled.img`
  object-fit: cover;
  width: 100px;
  height: 100px;
  background-position: center;
  border-radius: 100%;
  background-color: lightgray;
  position: relative;
`;

const NameInput = styled.input`
  background: none;
  border: none;
  border-bottom: 2px solid white;
  text-align: center;
  color: white;
  margin: var(--interval) 0 var(--interval) 0;
  padding: var(--pad1);
  box-sizing: border-box;
`;

const NameLength = styled.div`
  color: white;
`;

const BtnBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 60px 24px 0px 24px;
`;

const Xbtn = styled.button`
  font-size: 16px;
  color: white;
  background-color: transparent;
  border: 1px solid transparent;
`;

const AddBtn = styled.button`
  width: 36px;
  height: 36px;
  font-size: 20px;
  color: white;
  background-color: var(--Brand6);
  border: 1px solid transparent;
  border-radius: 100%;
  position: absolute;
  top: 270px;
  right: 145px;
`;
