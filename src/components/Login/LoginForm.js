import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { instance } from "../../api/axiosApi";
import { getCookies, setCookies } from "../../api/cookieControler";
import Button from "../elements/Button";
import Input from "../elements/Input";
import Alert from "../elements/Alert";

const LoginForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const directUrl = searchParams.get("redirect");
  const [useremail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (useremail === "" || password === "") {
      Alert({
        body: "아이디, 비밀번호를 확인해주세요.",
      });
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
        directUrl ? navigate(`/${directUrl}`) : navigate("/");
        setCookies("id", res.headers.authorization, {
          path: "/",
          maxAge: 3600,
        });
        Alert({
          body: "로그인 완료!",
        });
        navigate("/");
      }
    });
  };

  const postLogin = async (post) => {
    try {
      const data = await instance.post("users/login", post);
      if (data.data.statusCode === 200) {
        return data;
      } else {
        Alert({
          body: "아이디 비밀번호를 확인해주세요.",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const token = getCookies("id");
    if (!token) {
      return;
    } else {
      navigate("/");
    }
  }, []);
  return (
    <MainLogin>
      <Logo>로그인</Logo>
      <Id>이메일</Id>
      <StInput
        name="useremail"
        type="text"
        onChange={(e) => {
          const { value } = e.target;
          setUserEmail(value);
        }}
      />
      <Id>비밀번호</Id>
      <StInput
        name="password"
        type="password"
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
  margin: var(--interval);
  margin-top: 0px;
  box-sizing: border-box;
`;

const Logo = styled.div`
  font-size: 18px;
  font-weight: 500;
  line-height: 120%;
  color: #000000;
  margin-top: var(--interval);
`;

const Id = styled.div`
  width: 100%;
  font-size: 14px;
  font-weight: 700;
  color: var(--Brand6);
  margin: 36px 0px 12px 0px;
`;

const StInput = styled(Input)`
  border-bottom: 1px solid var(--Brand6);
`;

const LoginBtn = styled(Button)`
  margin: 43px 0px 51px 0px;
`;

const SignUpBtn = styled.button`
  border: none;
  border-bottom: 1px solid var(--Brand6);
  background-color: var(--BackColor1);
  font-size: 14px;
  padding: 0px 0px 4px 0px;
  font-weight: 700;
  color: var(--Brand6);
`;
