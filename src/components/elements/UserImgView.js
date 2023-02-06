import React from "react";
import styled from "styled-components";

import DefaultUser from "../../img/icons/userUnknown.png"

function UserImgView(props){
  const ProImg = (props.src)? (props.src) : (DefaultUser)
  return(
    <ImgCircle 
      src={ProImg}
      className={props.className}
    />
  )
}

export default UserImgView;

const ImgCircle = styled.img`
  border: none;
  border-radius: 100%;
`