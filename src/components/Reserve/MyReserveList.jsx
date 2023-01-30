import React, { useState } from "react";
import styled from "styled-components";
import numeral from "numeral";
import moment from "moment";
import { ItemBox } from "../elements/ItemBox";
import { instance } from "../../api/axiosApi";
import Confirm from "../elements/Confirm";
import { useDispatch } from "react-redux";
import { __compMyReserves, __delMyReserves } from "../../redux/modules/reservesSlice";
import { useNavigate } from "react-router-dom";

function MyReserveList({ reserve }) {
  const navigate = useNavigate();
  const [isTrade, setIsTrade] = useState(reserve.tradeState);
  const startDate = moment(reserve.startDate).format("YYYY년 MM월 DD일");
  const endDate = moment(reserve.endDate).format("YYYY년 MM월 DD일");

  const compReserve = async () => {
    const isConfirm = await Confirm({
      body: "거래를 완료하셨나요?",
    });
    if (!isConfirm) {
      return null;
    } else {
      try {
        const { data } = await instance.post(
          `/reservation/changestate/${reserve.reservationId}`
        );
        console.log(data);
      } catch (error) {
        console.log(error);
      }
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
      try {
        const { data } = await instance.delete(
          `/reservation/${reserve.reservationId}`
        );
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
  };
  
  return (
    <ListElement>
      <ItemBox>
        <ReserveBox
          onClick={() => {
            navigate(`/reserve/detail/${reserve.reservationId}`);
          }}
        >
          <ReserveImg src={reserve.imageUrl} />
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
  /* border: 2px solid gray; */
  border-radius: 8px;
  background-color: white;
  /* margin-bottom: var(--pad2); */
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
  /* padding: 4px; */
  background-position: center;
`;
const ReserveDetail = styled.div`
  margin: auto 16px auto var(--pad2);
  overflow: hidden;
  /* gap:8px; */
  /* display: flex; */
  /* flex-direction: column; */
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
  /* width: 0%; */
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
  /* margin: 20px 24px 40px 24px; */
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
  /* width: 96px; */
  flex: 1;
`;
const OrangeBtn = styled.button`
  background-color: var(--Brand6);
  color: white;
  border: 1px solid var(--Brand6);
  /* width: 96px; */
  flex: 1;
`;

const ListBox = styled.div`
  background-color: var(--BackColor1);
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const ListElement = styled.div`
  background-color: white;
`;
const Title = styled.div`
  margin: 35px 0px 12px 0px;
`;
const VoidSpace = styled.div`
  /* width: 96px; */
  flex: 1;
  background-color: none;
`;

const GrayBtn = styled.button`
  background-color: var(--Gray2);
  color: var(--Gray3);
  border: none;
  /* width: 96px; */
  flex: 1;
`;
