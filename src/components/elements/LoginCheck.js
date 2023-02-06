import React from "react";
import { useNavigate } from "react-router-dom";
import Confirm from "./Confirm";

async function LoginCheck (){
  const navigate = useNavigate();
  const isConfirm = await Confirm({
    body: "로그인이 필요 합니다.\n 로그인 하겠씁니까?"
  })
  if(!isConfirm){
    return null;
  } else {
    navigate("../../login");
    return null;
  }
}

export default LoginCheck;