import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useModal } from "../../hooks/useModal";
import { ItemBox } from "../elements/ItemBox";
import DatePicker from "../elements/DatePicker";
import { instance } from "../../api/axiosApi";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../elements/Button";

function ReserveEditForm() {
  const initialState = {
    startDate: null,
    endDate: null,
    price: 0,
    content: "",
  };
  const navigate = useNavigate();
  const [reserve, setReserve] = useState(initialState);
  const { id } = useParams();
  const [isComp, setIsComp] = useState(false);
  const datePick = useModal();

  const fetchReserve = async () => {
    try {
      const { data } = await instance.get(`reservation/${id}`);
      console.log(data)
      setReserve(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setReserve({ ...reserve, [name]: value });
  };

  useEffect(() => {
    fetchReserve();
  }, []);

  useEffect(() => {
    setIsComp(
      Boolean(reserve.startDate) &&
      Boolean(reserve.endDate) &&
      reserve.content.trim() !== ""
    );
  }, [reserve]);

  const editFunc = async () => {
    try {
      const { data } = await instance.put(`/reservation/${id}`, reserve);
      return data
    } catch (error) {
      console.log(error);
    }
  };

  const editHandler = async (event) => {
    event.preventDefault();
    if (reserve.price === "" || reserve.price === 0) {
      if (
        window.confirm(
          "현재 양도금액을 설정되어 있지 않습니다. \n무료로 양도 하시겠습니까?"
        )
      ) {
        editFunc();
      } else {
        return null;
      }
    } else {
      if (window.confirm("양도글을 수정하시겠습니까?")) {
        editFunc();
        navigate("../");
      } else {
        return null;
      }
    }
  };

  return (
    <ItemBox>
      <PostForm onSubmit={editHandler}>
        <InputBox>
          <WordInput>{reserve?.campingName}</WordInput>
        </InputBox>
        <EventBox onClick={datePick.onOpen}>
          {reserve?.startDate} ~ {reserve?.endDate}
        </EventBox>
        <PriceInput
          type="number"
          name="price"
          max="10000000"
          placeholder="금액을 입력해주세요"
          min="0"
          onChange={changeHandler}
          value={reserve?.price}
        />
        <PostContent
          name="content"
          placeholder="게시글 내용을 작성해주세요"
          onChange={changeHandler}
          value={reserve?.content}
        />
        <Button disabled={!isComp}>수정하기</Button>
      </PostForm>
      {datePick.isOpen && (
        <DatePicker
          condition={reserve}
          setCondition={setReserve}
          onClose={datePick.onClose}
        />
      )}
    </ItemBox>
  );
}

export default ReserveEditForm;

const EventBox = styled.div`
  border: 1px solid var(--Gray1);
  height: 56px;
  line-height: 56px;
  border-radius: 10px;
  padding-left: 16px;
  font-size: 14px;
  margin-bottom: var(--pad2);
  box-sizing: border-box;
`;

const PriceInput = styled.input`
  border: 0.5px solid black;
  border-radius: 5px;
  height: 56px;
  line-height: 56px;
  padding-left: 16px;
  margin-bottom: var(--pad2);
  box-sizing: border-box;
  width: 100%;
  font-size: 14px;
`;
const PostForm = styled.form`
  /* padding: var(--pad2); */
`;
const PostContent = styled.textarea`
  border: 0.5px solid black;
  box-sizing: border-box;
  width: 100%;
  border-radius: 5px;
  box-sizing: border-box;
  height: 100px;
  resize: none;
  padding: 16px;
  height: 240px;
  margin-bottom: 56px;
`;
const InputBox = styled.div`
  padding-bottom: 16px;
  display: flex;
  align-items: center;
  position: relative;
`;
const WordInput = styled.div`
  /* background: ${(props) => props.color}; */
  /* color: white; */
  border: 1px solid var(--Gray1);
  border-radius: 50px;
  box-sizing: border-box;
  padding-left: 24px;
  padding-right: 24px;
  height: 52px;
  font-size: 14px;
  display: flex;
  box-sizing: border-box;
  width: 100%;
  line-height: 52px;
`;
