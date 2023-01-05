import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
      const data = await instance.post(`/user/login`, post);
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
    <div>
      <input
        name="useremail"
        type="text"
        placeholder="이메일"
        onChange={(e) => {
          const { value } = e.target;
          setUserEmail(value);
        }}
      />
      <input
        name="password"
        type="password"
        placeholder="비밀번호"
        onChange={(e) => {
          const { value } = e.target;
          setPassword(value);
        }}
      />
      <button
        onClick={(e) => {
          onSubmit(e);
        }}
      >
        로그인
      </button>
      <button
        onClick={() => {
          navigate(`/signup`);
        }}
      >
        회원가입
      </button>
      <button>
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
      </button>
    </div>
  );
};

export default LoginForm;
