import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import numeral from "numeral";
import styled from "styled-components";
import { instance } from "../../api/axiosApi";
import CampImgView from "../elements/CampImgView";
import { ItemBox } from "../elements/ItemBox";
import Button from "../elements/Button";
import Alert from "../elements/Alert";
import moment from "moment";

function DetailHeader() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [reserve, setReserve] = useState(null);
  const startDate = moment(reserve?.startDate).format("YYYY년 MM월 DD일");
  const endDate = moment(reserve?.endDate).format("YYYY년 MM월 DD일");

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
      if (reserve?.ownerCheck === false) {
        Alert({ body: "삭제 권한이 없습니다." });
      } else if (reserve?.ownerCheck === true) {
        Alert({ body: "삭제 완료!" });
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onEditReserve = () => {
    if (reserve.ownerCheck === false) {
      Alert({ body: "수정 권한이 없습니다." });
    } else {
      navigate(`/reserve/edit/${id}`);
    }
  };

  const beginChat = async () => {
    try {
      const { data } = await instance.post(`/chat/${id}`);
      if (data.statusCode === 200) {
        navigate(`../../chatting/${data.data}`, { state: id });
      } else {
        Alert({ body: "로그인 정보를 확인 해주세요" });
      }
    } catch (error) {
      console.log(error);
      Alert({ body: error.response.data.msg });
    }
  };

  useEffect(() => {
    fetchReserve();
  }, []);
  return (
    <div>
      <CampImgView img={reserve?.imageUrl} />
      <ItemBox>
        <MiddleBox>
          <UserImg src={reserve?.profileImageUrl} />
          <Nickname>{reserve?.nickname}</Nickname>
          {reserve?.ownerCheck ? (
            reserve?.tradeState ? (
              ""
            ) : (
              <StateDiv>양도완료</StateDiv>
            )
          ) : (
            ""
          )}
        </MiddleBox>
        <Name
          onClick={() => {
            navigate(`/campdetail/${reserve?.campingId}`);
          }}
        >
          {reserve?.campingName}
        </Name>
        <SubText>{reserve?.address3}</SubText>
        <div>
          {startDate} ~ {endDate}
        </div>
      </ItemBox>
      <Line />
      <ItemBox>
        <Contents>{reserve?.content}</Contents>
        <Price>
          <div>{numeral(reserve?.price).format("0,0")}원</div>
        </Price>
      </ItemBox>
      {reserve?.ownerCheck ? (
        <ItemBox>
          <ChatBtn onClick={onEditReserve}>수정하기</ChatBtn>
          <DelBox>
            <DelBtn onClick={onDeleteReserve}>삭제하기</DelBtn>
          </DelBox>
        </ItemBox>
      ) : reserve?.tradeState ? (
        <ItemBox>
          <ChatBtn onClick={beginChat}>채팅하기</ChatBtn>
        </ItemBox>
      ) : (
        <ItemBox>
          <EndBtn>양도완료</EndBtn>
        </ItemBox>
      )}
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
  /* margin: 0px 24px 0px 24px; */
  box-sizing: border-box;
  width: 100%;
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
  margin: 40px 0px 0px 24px;
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
  white-space: pre-wrap;
`;

const DelBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 24px;
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

const EndBtn = styled(Button)`
  color: #999999;
  background-color: var(--Gray2);
  border: 1px solid var(--Gray2);
`;

const StateDiv = styled.div`
  width: 77px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  border: 1px solid var(--Brand6);
  background-color: white;
  color: var(--Brand6);
  position: absolute;
  top: 439px;
  left: 284px;
`;
