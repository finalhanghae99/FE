import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { instance } from "../../api/axiosApi";
import { setCookies } from "../../api/cookieControler";

const LoginForm = () => {
  const navigate = useNavigate();
  const [useremail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (useremail === "" || password === "") {
      alert("아이디, 비밀번호를 확인해주세요.");
      return;
    } else {
    }
    postLogin({
      useremail,
      password,
    }).then((res) => {
      if (res === undefined) {
        navigate(`/login`);
      } else {
        navigate(`/`);
        setCookies("id", res.headers.authorization, {
          path: "/",
          maxAge: 1800,
        });
      }
    });
  };

  const postLogin = async (post) => {
    try {
      const data = await instance.post("login", post);
      if (data.data.statusCode === 200) {
        return data;
      } else {
        alert("아이디 비밀번호를 확인해주세요.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MainLogin>
      <Title>로그인</Title>
      <Logo>CI</Logo>
      <Id>아이디</Id>
      <StInput
        name="useremail"
        type="text"
        placeholder="이메일"
        onChange={(e) => {
          const { value } = e.target;
          setUserEmail(value);
        }}
      />
      <Id>비밀번호</Id>
      <StInput
        name="password"
        type="password"
        placeholder="비밀번호"
        onChange={(e) => {
          const { value } = e.target;
          setPassword(value);
        }}
      />
      <LoginBtn
        onClick={(e) => {
          onSubmit(e);
        }}
      >
        로그인
      </LoginBtn>
      <SignUpBtn
        onClick={() => {
          navigate(`/signup`);
        }}
      >
        회원가입
      </SignUpBtn>
      {/* <button>
        <a
          id="kakao-login-btn"
          href="https://kauth.kakao.com/oauth/authorize?client_id=00a53b1769c1cc0a1142657ec7e2b793&redirect_uri=http://4team-troubleshooter.s3-website.ap-northeast-2.amazonaws.com&response_type=code"
        >
          <img
            src="https://k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg"
            width="160"
            alt="카카오 로그인 버튼"
          />
        </a>
      </button> */}
    </MainLogin>
  );
};

export default LoginForm;

const MainLogin = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const Title = styled.div`
  width: 390px;
  margin: 26px 0px 69px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const Logo = styled.div`
  margin: 0px 0px 55px 0px;
`

const Id = styled.div`
  width: 390px;
  padding-left: 55px;
  margin: 0px 0px 12px 0px;
`

const StInput = styled.input`
  width: 308px;
  height: 46px;
  border: 1px solid #9E9E9E;
  margin: 0px 0px 19px 9px;
  padding-left: 15px;
`

const LoginBtn = styled.button`
  width: 323px;
  height: 68px;
  background-color: #D9D9D9;
  border-radius: 10px;
  border: 1px solid #D9D9D9;
  margin: 43px 0px 51px 8px;
`

const SignUpBtn = styled.button`
  background-color: white;
  border: 1px solid white;
  margin-right: 180px;
`