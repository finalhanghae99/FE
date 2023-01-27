import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import numeral from "numeral";

import styled from "styled-components";

import { instance } from "../../api/axiosApi";
import CampImgView from "../elements/CampImgView";

import { ItemBox, BoxHeader, BoxName, BoxMoreLink } from "../elements/ItemBox";

import testImg from "../../img/test_camp_img.jpg";
import Button from "../elements/Button";

function DetailHeader() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [reserve, setReserve] = useState(null);

  const fetchReserve = async () => {
    try {
      const { data } = await instance.get(`reservation/${id}`);
      setReserve(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onDeleteReserve = async () => {
    try {
      const data = await instance.delete(`/reservation/${id}`);
      console.log(data);
      if (reserve?.ownerCheck === false) {
        alert("삭제 권한이 없습니다.");
      } else if (reserve?.ownerCheck === true) {
        alert("삭제 완료!");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onEditReserve = () => {
    if (reserve.ownerCheck === false) {
      alert("수정 권한이 없습니다.");
    } else {
      navigate(`/reserve/edit/${id}`, { state: { reserve } });
    }
  }

  useEffect(() => {
    fetchReserve();
  }, []);
  console.log(reserve);
  return (
    <div>
      <CampImgView img={reserve?.imageUrl} />
      <ItemBox>
        <MiddleBox>
          <UserImg src={reserve?.profileImageUrl} />
          <Nickname>{reserve?.nickname}</Nickname>
        </MiddleBox>
        <Name>{reserve?.campingName}</Name>
        <SubText>{reserve?.address3}</SubText>
        <div>
          {reserve?.startDate} ~ {reserve?.endDate.slice(5, 10)}
        </div>
      </ItemBox>
      <Line />
      <ItemBox>
        <Contents>{reserve?.content}</Contents>
        <Price>
          <div>{numeral(reserve?.price).format("0,0")}원</div>
        </Price>
        <ChatBtn onClick={onEditReserve}>수정하기</ChatBtn>
      </ItemBox>
      <DelBox>
        <DelBtn onClick={onDeleteReserve}>삭제하기</DelBtn>
      </DelBox>
    </div>
  );
}

export default DetailHeader;

const SubText = styled.div`
  color: var(--Gray3);
  font-size: 14px;
  margin-bottom: 8px;
`;
const ChatBtn = styled(Button)`
  font-weight: bold;
`;

const MiddleBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 32px;
`;

const UserImg = styled.img`
  object-fit: cover;
  width: 50px;
  height: 50px;
  background-position: center;
  border-radius: 100%;
  background-color: lightgray;
  position: relative;
  margin-right: 8px;
`;

const Name = styled.div`
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 8px;
`;

const Nickname = styled.div`
  font-size: 14px;
  font-weight: 400;
`;

const Price = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: var(--interval);
  margin-top: 40px;
  font-weight: bold;
  font-size: 18px;
`;

const Line = styled.div`
  height: 8px;
  background-color: var(--BackColor2);
`;

const Contents = styled.div`
  width: 100%;
  word-break: break-all;
`;

const DelBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DelBtn = styled.button`
  border: none;
  border-bottom: 1px solid var(--Brand6);
  background-color: white;
  font-size: 14px;
  padding-bottom: 4px;
  font-weight: 700;
  color: var(--Brand6);
`;
