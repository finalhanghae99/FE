import React, { useEffect, useState } from "react";
import styled from "styled-components";
import numeral from "numeral";
import moment from "moment";
import { ItemBox } from "../elements/ItemBox";
import { instance } from "../../api/axiosApi";
import Confirm from "../elements/Confirm";
import { useNavigate } from "react-router-dom";
import { BsPencilFill } from "react-icons/bs";
import {
  __compMyReserves,
  __delMyReserves,
} from "../../redux/modules/reservesSlice";
import { useDispatch } from "react-redux";

function MyReserveList({ reserve }) {
  const navigate = useNavigate();
  const [isTrade, setIsTrade] = useState(reserve.tradeState);
  const startDate = moment(reserve.startDate).format("YYYY년 MM월 DD일");
  const endDate = moment(reserve.endDate).format("YYYY년 MM월 DD일");
  const dispatch = useDispatch();

  const compReserve = async () => {
    const isConfirm = await Confirm({
      body: "거래를 완료하셨나요?",
    });
    if (!isConfirm) {
      return null;
    } else {
      dispatch(__compMyReserves({ id: reserve.reservationId }));
      setIsTrade(!isTrade);
    }
  };

  const delReserve = async () => {
    const isConfirm = await Confirm({
      body: "양도글을 삭제하시겠습니까?",
    });
    if (!isConfirm) {
      return null;
    } else {
      dispatch(__delMyReserves({ id: reserve.reservationId }));
    }
  };

  const postNavigate = async () => {
    navigate("../reserve/post");
  };

  return (
    <ListElement>
      <ItemBox>
        <BtnPostition>
          <PostBtn onClick={postNavigate}>
            <BsPencilFill style={{ color: "white" }} />
          </PostBtn>
        </BtnPostition>
        <ReserveBox
          onClick={() => {
            navigate(`/reserve/detail/${reserve.reservationId}`);
          }}
        >
          {reserve.imageUrl === "" ? (
            <ReserveDiv>이미지 준비중</ReserveDiv>
          ) : (
            <ReserveImg src={reserve.imageUrl} />
          )}
          <ReserveDetail>
            <ReserveAddress>
              {reserve.address1} {reserve.address2}
            </ReserveAddress>
            <ReserveName>{reserve.campingName}</ReserveName>
            <ReserveDate>
              {startDate} ~ {endDate}
            </ReserveDate>
            <ReservePrice>{numeral(reserve.price).format("0,0")}</ReservePrice>
          </ReserveDetail>
        </ReserveBox>
        {isTrade ? (
          <BtnBox>
            <WhiteBtn
              onClick={() => {
                delReserve();
              }}
            >
              삭제
            </WhiteBtn>
            <OrangeBtn
              onClick={() => {
                navigate(`/reserve/edit/${reserve.reservationId}`);
              }}
            >
              수정
            </OrangeBtn>
            <OrangeBtn
              onClick={() => {
                compReserve();
              }}
            >
              양도 완료
            </OrangeBtn>
          </BtnBox>
        ) : (
          <BtnBox>
            <VoidSpace></VoidSpace>
            <VoidSpace></VoidSpace>
            <GrayBtn>양도 완료</GrayBtn>
          </BtnBox>
        )}
      </ItemBox>
    </ListElement>
  );
}
export default MyReserveList;

const ReserveBox = styled.div`
  display: flex;
  border-radius: 8px;
  background-color: white;
  padding-bottom: var(--interval);
  border-radius: 0;
  border-bottom: 1px solid var(--Gray1);
`;

const ReserveImg = styled.img`
  border-radius: 12px;
  object-fit: cover;
  max-width: 96px;
  min-width: 96px;
  height: 96px;
  background-position: center;
`;

const ReserveDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  border-radius: 12px;
  object-fit: cover;
  max-width: 96px;
  min-width: 96px;
  height: 96px;
  background-position: center;
  background-color: var(--Gray2);
`;

const ReserveDetail = styled.div`
  margin: auto 16px auto var(--pad2);
  overflow: hidden;
`;

const ReserveName = styled.div`
  padding-bottom: 4px;
  font-size: 14px;
  font-weight: bold;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const ReserveAddress = styled.div`
  font-size: 10px;
  padding-bottom: 2px;
  color: var(--Gray3);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ReserveDate = styled.div`
  color: var(--Gray4);
  font-size: 12px;
  padding-bottom: 8px;
`;

const ReservePrice = styled.div`
  font-size: 16px;
`;

const BtnBox = styled.div`
  display: flex;
  margin: auto;
  margin-top: 20px;
  gap: 19px;
  height: 33px;
  justify-content: center;
`;

const WhiteBtn = styled.button`
  background-color: white;
  color: var(--Brand6);
  border: 1px solid var(--Brand6);
  flex: 1;
`;
const OrangeBtn = styled.button`
  background-color: var(--Brand6);
  color: white;
  border: 1px solid var(--Brand6);
  flex: 1;
`;

const ListElement = styled.div`
  background-color: white;
`;

const VoidSpace = styled.div`
  flex: 1;
  background-color: none;
`;

const GrayBtn = styled.button`
  background-color: var(--Gray2);
  color: var(--Gray3);
  border: none;
  flex: 1;
`;

const PostBtn = styled.div`
  background-color: var(--Brand6);
  border-radius: 100%;
  line-height: 52px;
  height: 52px;
  width: 52px;
  content: "";
  text-align: center;
  line-height: 30px;
  position: fixed;
  bottom: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
`;

const BtnPostition = styled.div`
  display: flex;
  justify-content: flex-end;
`;
