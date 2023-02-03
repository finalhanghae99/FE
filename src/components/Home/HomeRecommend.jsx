import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ItemBox } from "../elements/ItemBox";
import campBtn from "../../img/CampBtn.svg";
import { BsArrowRightShort } from "react-icons/bs";
import { getCookies } from "../../api/cookieControler";
import { instance } from "../../api/axiosApi";
import { useEffect } from "react";
import { useState } from "react";

function HomeRecommend() {
  const navigate = useNavigate();
  const token = getCookies("id");
  const [nickname, setNickname] = useState();

  const setName = async () => {
    try {
      const { data } = await instance.get("/usernick");
      if (data.statusCode === 200) setNickname(data.data.nickname + "님 \n");
    } catch (error) {
      console.log(error);
    }
  };

  const navEvent = async () => {
    token ? navigate("/reviewadd") : navigate("/login?redirect=reviewadd");
  };

  useEffect(() => {
    setName();
  }, []);

  return (
    <ItemBox>
      <RevLinkBtn
        onClick={() => {
          navEvent();
        }}
      >
        <ImgView src={campBtn} />
        <BtnText>
          <SmallText>
            <Nick>{nickname && nickname}</Nick>캠핑 다녀오셨나요?
          </SmallText>
          <BigText>리뷰를 등록해보세요.</BigText>
        </BtnText>
        <ArrowImg>
          <BsArrowRightShort />
        </ArrowImg>
      </RevLinkBtn>
    </ItemBox>
  );
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
  gap: 9px;
  box-shadow: 4px 4px 10px 4px rgba(0, 0, 0, 0.12);
  justify-content: space-between;
`;

const ImgView = styled.img`
  object-fit: cover;
  object-position: center;
`;

const BtnText = styled.div`
  text-align: left;
`;

const ArrowImg = styled.div`
  font-size: 24px;
  color: var(--Brand6);
  text-align: left;
`;

const SmallText = styled.a`
  white-space: pre-wrap;
`;

const BigText = styled.div`
  padding-top: 8px;
  color: var(--Brand6);
  font-size: 18px;
  font-weight: bold;
`;

const Nick = styled.div`
  font-weight: bold;
`;
