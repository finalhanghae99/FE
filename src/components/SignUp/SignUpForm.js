import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { instance } from "../../api/axiosApi";
import { __postsignup } from "../../redux/modules/signUpSlice";

const SignUpForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [useremail, setUserEmail] = useState("");
  const [nickname, setNickName] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");

  const [useremailMsg, setUserEmailMsg] = useState("");
  const [nicknameMsg, setNickNameMsg] = useState("");
  const [passwordMsg, setPasswordMsg] = useState("");
  const [checkPasswordMsg, setCheckPasswordMsg] = useState("");

  const [isUserEmail, setIsUserEmail] = useState(false);
  const [isNickName, setIsNickName] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isCheckPassword, setIscheckPassword] = useState(false);
  const [isUserEmailCheck, setIsUserEmailCheck] = useState(false);
  const [isNickNameCheck, setIsNickNameCheck] = useState(false);

  const useremailRegex =
    /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

  const onChangeUserEmail = useCallback((e) => {
    const useremailCurrent = e.target.value;
    setUserEmail(useremailCurrent);

    if (!useremailRegex.test(useremailCurrent)) {
      setUserEmailMsg("올바른 이메일 형식이 아닙니다.");
      setIsUserEmail(false);
    } else {
      setUserEmailMsg("올바른 형식 입니다.");
      setIsUserEmail(true);
    }
  }, []);

  const onChangeNickname = useCallback((e) => {
    setNickName(e.target.value);
    if (e.target.value < 2 || e.target.value > 8) {
      setNickNameMsg(`올바르지 않은 닉네임 형식 입니다.`);
      setIsNickName(false);
    } else {
      setNickNameMsg(`올바른 닉네임 형식 입니다.`);
      setIsNickName(true);
    }
  }, []);

  const onChangePassword = useCallback(
    (e) => {
      const passwordRegex = /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^*+=-]).{8,25}$/;
      const passwordCurrent = e.target.value;
      setPassword(passwordCurrent);

      if (!passwordRegex.test(passwordCurrent)) {
        setPasswordMsg("영문자+숫자+특수문자 조합으로 8자리 이상");
        setIsPassword(false);
      } else {
        setPasswordMsg("안전한 비밀번호입니다.");
        setIsPassword(true);
      }
    },
    [password]
  );

  const onChangeCheckPassword = useCallback(
    (e) => {
      const checkPasswordCurrent = e.target.value;
      setCheckPassword(checkPasswordCurrent);

      if (password === checkPasswordCurrent) {
        setCheckPasswordMsg("비밀번호가 일치합니다.");
        setIscheckPassword(true);
      } else {
        setCheckPasswordMsg("비밀번호가 일치하지 않습니다. 확인해주세요.");
        setIscheckPassword(false);
      }
    },
    [password]
  );

  const onEmailCheck = (e) => {
    e.preventDefault();
    if (useremail.length === 0) {
      alert("이메일을 입력해주세요.");
      return;
    } else if (!useremailRegex.test(useremail)) {
      alert("올바른 이메일형식이 아닙니다.");
      return;
    }
    emailCheck({ useremail });
  };

  const emailCheck = async (post) => {
    try {
      const data = await instance.post("checkemail", post);
      if (data.data.statusCode === 204) {
        alert("사용 가능한 아이디 입니다!");
        setIsUserEmailCheck(true);
      } else {
        alert("중복된 아이디 입니다.");
      }
    } catch (error) {}
  };

  const onNicknameCheck = (e) => {
    e.preventDefault();
    if (nickname.length === 0) {
      alert("닉네임을 입력해주세요.");
      return;
    }
    nickCheck({ nickname });
  };

  const nickCheck = async (post) => {
    try {
      const data = await instance.post("checknickname", post);
      if (data.data.statusCode === 200) {
        alert("사용 가능한 닉네임 입니다!");
        setIsNickNameCheck(true);
      } else {
        alert("중복된 닉네임 입니다.");
      }
      return data;
    } catch (error) {}
  };

  const onClickLogin = () => {
    navigate(`/login`);
  };

  const onClickSignUpBtn = () => {
    dispatch(__postsignup({ useremail, nickname, password }));
    alert("회원가입 성공!");
    navigate(`/login`);
  };

  return (
    <MainSignUp>
      <Title>회원가입</Title>
      <Logo>CI</Logo>
      <Id>아이디</Id>
      <div style={{ position: "relative" }}>
        <StDiv>
          <Inp
            type="text"
            placeholder="이메일을 입력해주세요."
            onChange={onChangeUserEmail}
          />
          <CheckBtn
            type="button"
            onClick={(e) => {
              onEmailCheck(e);
            }}
          >
            중복체크
          </CheckBtn>
        </StDiv>
        {useremail.length > 0 && (
          <span
            style={{
              color: isUserEmail ? "#497BD8" : "#f85032",
              position: "absolute",
            }}
          >
            {useremailMsg}
          </span>
        )}
      </div>
      <Id>닉네임</Id>
      <div style={{ position: "relative" }}>
        <StDiv>
          <Inp
            type="text"
            placeholder="닉네임을 입력해주세요."
            onChange={onChangeNickname}
          />
          <CheckBtn
            type="button"
            onClick={(e) => {
              onNicknameCheck(e);
            }}
          >
            중복체크
          </CheckBtn>
        </StDiv>

        {nickname.length > 1 && (
          <span
            style={{
              color: isNickName ? "#497BD8" : "#f85032",
              position: "absolute",
            }}
          >
            {nicknameMsg}
          </span>
        )}
      </div>
      <Id>비밀번호</Id>
      <div style={{ position: "relative" }}>
        <StDiv>
          <StInput
            type="password"
            placeholder="비밀번호를 입력해주세요."
            onChange={onChangePassword}
          />
        </StDiv>
        {password.length > 0 && (
          <span
            style={{
              color: isPassword ? "#497BD8" : "#f85032",
              position: "absolute",
            }}
          >
            {passwordMsg}
          </span>
        )}
      </div>
      <Id>비밀번호 확인</Id>
      <div style={{ position: "relative" }}>
        <StDiv>
          <StInput
            type="password"
            placeholder="비멀번호를 확인해주세요."
            onChange={onChangeCheckPassword}
          />
        </StDiv>
        {checkPassword.length > 0 && (
          <span
            style={{
              color: isCheckPassword ? "#497BD8" : "#f85032",
              position: "absolute",
            }}
          >
            {checkPasswordMsg}
          </span>
        )}
      </div>
      <SignUpBtn
        type="submit"
        disabled={
          !(
            isUserEmail &&
            isNickName &&
            isPassword &&
            isCheckPassword &&
            isUserEmailCheck &&
            isNickNameCheck
          )
        }
        onClick={onClickSignUpBtn}
      >
        회원가입
      </SignUpBtn>
      <Back
        onClick={() => {
          onClickLogin();
        }}
      >
        뒤로가기
      </Back>
    </MainSignUp>
  );
};

export default SignUpForm;

const MainSignUp = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Title = styled.div`
  width: 390px;
  margin: 26px 0px 69px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Logo = styled.div`
  margin: 0px 0px 55px 0px;
`;

const Id = styled.div`
  width: 390px;
  padding-left: 55px;
  margin: 23px 0px 12px 0px;
`;

const StDiv = styled.div`
  /* margin-bottom: 23px; */
`;

const Inp = styled.input`
  width: 221px;
  height: 36px;
`;

const CheckBtn = styled.button`
  width: 87px;
  height: 43px;
  border: 1px solid white;
  background-color: #d9d9d9;
`;

const StInput = styled.input`
  width: 297px;
  height: 36px;
  border: 1px solid #9e9e9e;
  /* margin: 0px 0px 19px 0px; */
  padding-left: 15px;
`;

const SignUpBtn = styled.button`
  width: 315px;
  height: 58px;
  background-color: #d9d9d9;
  border-radius: 10px;
  border: 1px solid #d9d9d9;
  margin: 43px 7px 30px 8px;
`;

const Back = styled.button`
  background-color: white;
  border: 1px solid white;
  margin-right: 200px;
`;
