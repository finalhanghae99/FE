import React, { useState, useEffect } from "react";
import { useModal } from "../../hooks/useModal";
import DatePicker from "../elements/DatePicker";
import styled from "styled-components";
import RegionPicker from "../elements/RegionPicker";
import { BsPencilFill } from "react-icons/bs"
import { useNavigate } from "react-router-dom";
import Alert from "../elements/Alert";
import { getCookies } from "../../api/cookieControler";
import { ItemBox } from "../elements/ItemBox";
import { AiOutlineDown } from "react-icons/ai";
import { instance } from "../../api/axiosApi";
import ReserveListElement from "../Reserve/ReserveListElement";
import { useSelector } from "react-redux";

function ReserveHeader() {
  const [reserve, setReserve] = useState([])
  const navigate = useNavigate();
  const region = useModal();
  const calendar = useModal();
  const { address1, address2 } = useSelector((state)=>state.searchCondition)

  if (region.isOpen || calendar.isOpen) {
    document.body.style.overflow = "hidden"
  } else {
    document.body.style.overflow = '';
  }
  const initialCondition = {
    startDate: "",
    endDate: "",
  }
  // const [address1, setAddress1] = useState("")
  // const [address2, setAddress2] = useState("")

  const [condition, setCondition] = useState(initialCondition);
  useEffect(() => {
    setResult().then(res => {
      setReserve(res.data.data.responseSearchDtoList);
    });
    // instance.get(
    //   `/reservation?startDate=${condition.startDate}&endDate=${condition.endDate}&address1=${address1}&address2=${address2}`)
    // .then(res => {
    //   setReserve(res.data.data.responseSearchDtoList)
    // })
  }, [region.isOpen, calendar.isOpen])
  useEffect(()=>{
    fetchReserve();
  },[])
  const fetchReserve = async () => {
    try {
      const { data } = await instance.get("reservation/listsix");
      setReserve(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const setResult = () => {
    const city1 = (address1 === "")? ("") : (`&address1=${address1}`)
    const city2 = (address2 === "")? ("") : (`&address2=${address2}`)
    try {
      const data = instance.get(
        `/reservation/findall?startDate=${condition.startDate}&endDate=${condition.endDate}${city1}${city2}`);
      return (data);
    } catch (error) { console.log(error); }
  }

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setCondition({ ...condition, [name]: value })
  }
  const postNavigate = () => {
    const token = getCookies("id")
    if (!token) {
      Alert({ body: "로그인이 필요 합니다." })
      return;
    } else {
      navigate("../reserve/post")
    }
  }
  return (
    <SearchBox>
      <HeadTitle>캠핑장 양도</HeadTitle>
      <ItemBox style={{ position: "relative" }}>
        <InputBox onClick={calendar.onOpen}>
          <RegionBtn>
            {(condition.startDate && condition.endDate) ?
              `${condition.startDate} ~ ${condition.endDate}` : "날짜 선택"}
          </RegionBtn>
          <SeartchBtn>
            <AiOutlineDown />
          </SeartchBtn>
        </InputBox>
        <InputBox onClick={region.onOpen}>
          <RegionBtn>
            {address1 ? `${address1} ${address2}` : "지역 선택"}
          </RegionBtn>
          <SeartchBtn>
            <AiOutlineDown />
          </SeartchBtn>
        </InputBox>
      </ItemBox>
      {region.isOpen &&
        <RegionPicker onClose={region.onClose} />
      }
      {calendar.isOpen &&
        <DatePicker condition={condition} setCondition={setCondition} onClose={calendar.onClose} />
      }
      <BtnPostition>
        <PostBtn onClick={postNavigate} ><BsPencilFill style={{ color: "white" }} /></PostBtn>
      </BtnPostition>
      <ItemBox>
        {(reserve?.length===0) ? (
          <NoneMsg>
            게시글이 없습니다.
          </NoneMsg>
        ) : (
          <ReserveBox>
            {reserve?.map((v) => {
              return (
                <div key={v.reservationId} style={{ margin: "auto" }}>
                  <ReserveListElement reserve={v} />
                </div>
              )
            })}
          </ReserveBox>
        )}
      </ItemBox>
    </SearchBox>
  )
}
export default ReserveHeader;

const SearchBox = styled.div`
  /* padding: var(--pad2); */
`
const HeadTitle = styled.div`
  margin: var(--interval);
  font-size: 18px;
  text-align: center;

`

const SearchBottom = styled.div`
  display: flex;
  margin-top: var(--pad1); 
   
`

const DateSelect = styled.div`
  height: 30px;
  margin-right: var(--pad1);
  border: 1px solid black;
  border-radius: 5px;
  justify-content: center;
  width: 50%;
  box-sizing: border-box;
  text-align: center;
  line-height: 30px;

`
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
  /* right : var(--interval); */
  bottom : 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
`

const BtnPostition = styled.div`
  /* position: relative; */
  /* width: 100%; */
  display: flex;
  justify-content: flex-end;
  margin-right: var(--interval);
`

const RegionBtn = styled.div`
  /* background: ${props => props.color}; */

  /* color: white; */
  border: 2px solid var(--Gray2);
  border-radius: 50px;
  box-sizing: border-box;
  padding-left: 24px;
  padding-right: 24px;
  height: 56px;
  font-size: 14px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  line-height: 56px;
  /* overflow: hidden; */
`

const SeartchBtn = styled.div`
  /* width: 80px; */
  height: 19px;
  font-size: 19px;
  position: absolute;
  right: var(--interval);
  line-height: 19px;
  /* top : 50% */
  transform: translateY(100%);
  /* color: white; */
`
const InputBox = styled.div`
  padding-bottom: 16px;
  display: flex;
  position: relative;
`

const NoneMsg = styled.div`
  display: flex;
  justify-content: center;
`

const ReserveBox = styled.div`
  display:  grid;
  grid-template-columns: 1fr 1fr;
  /* grid-template-rows:repeat(auto-fill, 30px); */
  justify-content: center;
  align-items: center;
  gap:12px;
`