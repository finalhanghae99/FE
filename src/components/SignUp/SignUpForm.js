import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { instance } from "../../api/axiosApi";
import { __postsignup } from "../../redux/modules/signUpSlice";
import Button from "../elements/Button";
import Input from "../elements/Input";

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
    console.log(post);
    try {
      const data = await instance.post("users/checkemail", post);
      if (data.data.statusCode === 200) {
        alert("사용 가능한 아이디 입니다!");
        setIsUserEmailCheck(true);
      } else {
        alert("중복된 아이디 입니다.");
      }
    } catch (error) {
      console.log(error);
    }
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
      const data = await instance.post("users/checknickname", post);
      if (data.data.statusCode === 200) {
        alert("사용 가능한 닉네임 입니다!");
        setIsNickNameCheck(true);
      } else {
        alert("중복된 닉네임 입니다.");
      }
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const onClickLogin = () => {
    navigate(`/login`);
  };

  const onClickSignUpBtn = () => {
    console.log(useremail, nickname, password);
    dispatch(__postsignup({ useremail, nickname, password }));
    alert("회원가입 성공!");
    navigate(`/login`);
  };

  return (
    <MainSignUp>
      <Title></Title>
      <Logo>회원가입</Logo>
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
            중복확인
          </CheckBtn>
        </StDiv>
        {useremail.length > 0 && (
          <Span
            style={{
              color: isUserEmail ? "#000000" : "#f85032",
              position: "absolute",
            }}
          >
            {useremailMsg}
          </Span>
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
            중복확인
          </CheckBtn>
        </StDiv>

        {nickname.length > 1 && (
          <Span
            style={{
              color: isNickName ? "#000000" : "#f85032",
              position: "absolute",
            }}
          >
            {nicknameMsg}
          </Span>
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
          <Span
            style={{
              color: isPassword ? "#000000" : "#f85032",
              position: "absolute",
            }}
          >
            {passwordMsg}
          </Span>
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
          <Span
            style={{
              color: isCheckPassword ? "#000000" : "#f85032",
              position: "absolute",
            }}
          >
            {checkPasswordMsg}
          </Span>
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
        회원가입 완료
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
  width: 100%;
  border-bottom: 1px solid var(--Brand4);
  margin: 103px 0px 16px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Logo = styled.div`
  font-size: 18px;
  font-weight: 500;
  line-height: 120%;
  color: #000000;
  margin-top: var(--intarval);
`;

const Id = styled.div`
  width: 100%;
  font-size: 14px;
  font-weight: 700;
  color: var(--Brand6);
  padding-left: 55px;
  margin: 36px 0px 0px 0px;
`;

const StDiv = styled.div`
  width: 331px;
  height: 36px;
  margin-top: 10px;
  border-bottom: 1px solid var(--Brand6);
`;

const Inp = styled(Input)`
  width: 245px;
  height: 32px;
  border: none;
`;

const CheckBtn = styled.button`
  width: 61px;
  height: 18px;
  border: none;
  border-bottom: 1px solid #343333;
  background-color: var(--BackColor1);
`;

const StInput = styled(Input)`
  border-bottom: 1px solid var(--Brand6);
`;

const SignUpBtn = styled(Button)`
  margin: 62px 0px 36px 0px;
`;

const Back = styled.button`
  border: none;
  border-bottom: 1px solid var(--Brand6);
  background-color: var(--BackColor1);
  font-size: 14px;
  padding-bottom: 4px;
  font-weight: 700;
  color: var(--Brand6);
`;

const Span = styled.span`
  padding-top: 4px;
  padding-left: 7px;
`;
