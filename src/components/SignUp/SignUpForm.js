import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
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
    setUserEmail(useremailCurrent)

    if (!useremailRegex.test(useremailCurrent)) {
      setUserEmailMsg("올바른 이메일 형식이 아닙니다.")
      setIsUserEmail(false);
    } else {
      setUserEmailMsg("올바른 형식 입니다.")
      setIsUserEmail(true);
    }
  }, []);

  const onChangeNickname = useCallback((e) => {
    setNickName(e.target.value);
    if (e.target.value < 2 || e.target.value > 8) {
      setNickNameMsg(`올바르지 않은 닉네임 형식 입니다.`)
      setIsNickName(false);
    } else {
      setNickNameMsg(`올바른 닉네임 형식 입니다.`)
      setIsNickName(true);
    }
  }, [])

  const onChangePassword = useCallback((e) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^*+=-]).{8,25}$/;
    const passwordCurrent = e.target.value;
    setPassword(passwordCurrent);

    if (!passwordRegex.test(passwordCurrent)) {
      setPasswordMsg("영문자+숫자+특수문자 조합으로 8자리 이상 입력해주세요.")
      setIsPassword(false);
    } else {
      setPasswordMsg("안전한 비밀번호입니다.")
      setIsPassword(true);
    }
  }, [password])

  const onChangeCheckPassword = useCallback((e) => {
    const checkPasswordCurrent = e.target.value;
    setCheckPassword(checkPasswordCurrent);

    if (password === checkPasswordCurrent) {
      setCheckPasswordMsg("비밀번호가 일치합니다.");
      setIscheckPassword(true);
    } else {
      setCheckPasswordMsg("비밀번호가 일치하지 않습니다. 다시 입력해주세요.");
      setIscheckPassword(false);
    }
  }, [password])
  
  const onEmailCheck = (e) => {
    e.preventDefault();
    if(useremail.length === 0) {
      alert("이메일을 입력해주세요.")
      return;
    } else if (!useremailRegex.test(useremail)) {
      alert("올바른 이메일형식이 아닙니다.")
      return;
    }
    emailCheck({useremail})
  }

  const emailCheck = async (post) => {
    try {
      const data = await instance.post(`/user/checkemail`, post)
      if (data.data.statusCode === 200) {
        alert("사용 가능한 아이디 입니다!");
        setIsUserEmailCheck(true);
      } else {
        alert("중복된 아이디 입니다.")
      }
    } catch(error) {}
  }

  const onNicknameCheck = (e) => {
    e.preventDefault();
    if(nickname.length === 0) {
      alert("닉네임을 입력해주세요.")
      return;
    } 
    nickCheck({nickname})
  }

  const nickCheck = async (post) => {
    try {
      const data = await instance.post(`/user/checknickname`, post);
      if (data.data.statusCode === 200) {
        alert("사용 가능한 닉네임 입니다!");
        setIsNickNameCheck(true);
      } else {
        alert("중복된 닉네임 입니다.")
      }
      return data;
    } catch (error) {}
  }

  const onClickLogin = () => {
    navigate(`/login`)
  }

  const onClickSignUpBtn = () => {
    dispatch(__postsignup({useremail, nickname, password}))
    alert("회원가입 성공!")
    navigate(`/login`)
  }

  return (
    <div>
      <input
        type="text"
        placeholder="이메일을 입력해주세요."
        onChange={onChangeUserEmail} />
        <button
          type="button"
          onClick={(e) => {onEmailCheck(e)}}>중복체크</button>
        {useremail.length > 0 && (
          <span
            style={{color: isUserEmail ? "#497BD8" : "#f85032" }}
            >{useremailMsg}</span>
        )}
      <input
        type="text"
        placeholder="닉네임을 입력해주세요."
        onChange={onChangeNickname} />
        <button
          type="button"
          onClick={(e) => {onNicknameCheck(e)}}>중복체크</button>
        {nickname.length > 1 && (
          <span
            style={{color: isNickName ? "#497BD8" : "#f85032" }}
            >{nicknameMsg}</span>
        )}
      <input 
        type="password"
        placeholder="비밀번호를 입력해주세요."
        onChange={onChangePassword}/>
        {password.length > 0 && (
          <span
            style={{color: isPassword ? "#497BD8" : "#f85032" }}
            >{passwordMsg}</span>
        )}
      <input 
        type="password"
        placeholder="비멀번호를 확인해주세요."
        onChange={onChangeCheckPassword}/>
        {checkPassword.length > 0 && (
          <span
            style={{color: isCheckPassword ? "#497BD8" : "#f85032" }}
            >{checkPasswordMsg}</span>
        )}
        <button onClick={()=>{onClickLogin()}}>뒤로가기</button>
        <button
          type="submit"
          disabled={!(
            isUserEmail &&
            isNickName &&
            isPassword &&
            isCheckPassword &&
            isUserEmailCheck &&
            isNickNameCheck 
          )} onClick={onClickSignUpBtn}>회원가입</button>
    </div>
    
  )
}

export default SignUpForm;