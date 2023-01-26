import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {ItemBox, BoxHeader, BoxName, BoxMoreLink} from "../elements/ItemBox"; 

import campFireImg from "../../img/CampFire.svg"
import campBtn from "../../img/CampBtn.svg"


import {BsArrowRightShort} from "react-icons/bs"

import { getCookies } from "../../api/cookieControler";
import Confirm from "../elements/Confirm";

function HomeRecommend(){
  const navigate = useNavigate();

  const navEvent = async () =>{
    // const token = getCookies("id");
    // (token)? (navigate("/reviewadd")) : (
    //   navigate("/login?redirect=reviewadd")
    // )
    const isConfirm = await Confirm({
      body: 'TEST CONFIRM'
    });
    console.log(isConfirm)
  }

  return(
    <ItemBox>
      <RevLinkBtn onClick={()=>{navEvent()}}>
        <ImgView src={campBtn}/>
        <BtnText>
          <SmallText>
            캠핑 다녀오셨나요?
          </SmallText>
          <BigText>
            리뷰를 등록해보세요.
          </BigText>
        </BtnText>
        <ArrowImg>
          <BsArrowRightShort />
        </ArrowImg>
      </RevLinkBtn>
    </ItemBox>
  )
}
export default HomeRecommend;

const RevLinkBtn = styled.button`
  border: none;
  border-radius: 12px;
  height: 100px;
  box-sizing: border-box;
  width: 100%;
  background-color: white;
  padding: 9px 18px 9px 18px;
  display: flex;
  align-items: center;
  gap:9px;
  box-shadow: 4px 4px 10px 4px rgba(0, 0, 0, 0.12);
  justify-content: space-between;
`

const ImgView = styled.img`
  object-fit: cover;
  object-position: center;
  /* flex: 2; */
`

const BtnText = styled.div`
  /* flex: 4; */
  text-align: left;
`

const ArrowImg = styled.div`
  /* flex:1; */
  font-size: 24px;
  color: var(--Brand6);
  text-align: left;
`

const SmallText = styled.a`
`

const BigText = styled.div`
  padding-top: 8px;
  color: var(--Brand6);
  font-size: 18px;
  font-weight: bold;
`