import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { AiOutlineCamera } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { __putProfile } from "../../redux/modules/profileSlice";
import Alert from "../elements/Alert";
import { __getMyInfo } from "../../redux/modules/myPageSlice";
import { ItemBox } from "../elements/ItemBox";
import { instance } from "../../api/axiosApi";

function MyInfoModify(props) {
  const imgRef = useRef("");
  const dispatch = useDispatch();
  const { userInfo, onClose } = props;
  const [nickname2, setNickname2] = useState(userInfo.nickname);
  const [profileImg, setProfileImg] = useState(null);

  const onFileUpload = () => {
    imgRef.current.click();
  };

  const onUploadImg = (e) => {
    setProfileImg(e.target.files[0]);
  };

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

  const onEditProfile = async () => {
    const data = new FormData();
    data.append("profileImageUrl", profileImg);
    const nickname = { nickname: nickname2, changePro: Boolean(profileImg) };
    data.append(
      "requestUserInfoDto",
      new Blob([JSON.stringify(nickname)], { type: "application/json" })
    );
    if (profileImg === null && nickname2 === userInfo?.nickname) {
      Alert({ body: "수정 사항이 없습니다." });
      return;
    } else {
      await dispatch(__putProfile({ data }));
      Alert({ body: "프로필 수정 완료!" });
      onClose();
      dispatch(__getMyInfo());
    }
  };

  const onDelNickname = () => {
    setNickname2("");
  };

  const onNicknameCheck = (e) => {
    e.preventDefault();
    if (nickname2.length === 0) {
      Alert({ body: "닉네임을 입력해주세요." });
      return;
    }
    if (nickname2.length < 2) {
      Alert({ body: "2글자 이상\n6글자 이하 이어야 합니다." });
      return null;
    }
    nickCheck({ nickname: nickname2 });
  };

  const nickCheck = async (post) => {
    try {
      const data = await instance.post("users/checknickname", post);
      if (data.data.statusCode === 200) {
        Alert({ body: "사용 가능한 닉네임 입니다!" });
      } else {
        Alert({ body: "중복된 닉네임 입니다." });
        return data;
      }
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setNickname2(userInfo.nickname);
  }, [userInfo]);

  return (
    <OutOfModal>
      <ItemBox>
        <SubBox>
          <BtnBox>
            <Xbtn onClick={onClose}>취소</Xbtn>
            <Xbtn onClick={() => onEditProfile()}>완료</Xbtn>
          </BtnBox>
        </SubBox>
        <UserForm>
          <ImgPreview />
          <ImgPlus />
          <InputDiv>
            <NameInput
              value={nickname2}
              onChange={(event) => setNickname2(event.target.value)}
              maxLength="6"
            />
            <CheckBtn onClick={onNicknameCheck}>중복확인</CheckBtn>
            <DelBtn onClick={onDelNickname}>x</DelBtn>
          </InputDiv>
          <NameLength>{nickname2.length} / 6</NameLength>
        </UserForm>
      </ItemBox>
    </OutOfModal>
  );
}

export default MyInfoModify;

const OutOfModal = styled.div`
  background-color: rgba(0, 0, 0, 0.9);
  position: fixed;
  z-index: 99;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

const UserForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  margin: auto;
  margin-top: 60px;
  text-align: center;
`;

const SubBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
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
  width: 120px;
  background: none;
  border: none;
  text-align: center;
  color: white;
  padding: var(--pad1);
  box-sizing: border-box;
  font-size: 15px;
  outline: none;
`;

const NameLength = styled.div`
  color: white;
`;

const BtnBox = styled.div`
  width: 380px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 80px;
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
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  color: white;
  background-color: var(--Brand6);
  border: 1px solid transparent;
  border-radius: 100%;
  position: absolute;
  top: 235px;
  margin: 20px 0px 0px 20px;
`;

const CheckBtn = styled.button`
  color: white;
  background-color: rgba(0, 0, 0, 0);
  border: none;
  border-bottom: 1px solid white;
`;

const DelBtn = styled.button`
  color: white;
  background-color: rgba(0, 0, 0, 0);
  border: none;
  margin-bottom: 5px;
  font-size: 20px;
  margin-left: 10px;
`;

const InputDiv = styled.div`
  width: 300px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  border-bottom: 2px solid white;
  margin: var(--interval) 0 var(--interval) 0;
`;
