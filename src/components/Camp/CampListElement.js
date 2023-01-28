import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BoxHeader, BoxName, ItemBox } from "../elements/ItemBox";
import CampImgView from "../elements/CampImgView";
import { instance } from "../../api/axiosApi";
import { BsFillBookmarkFill } from "react-icons/bs"
import { BsBookmark } from "react-icons/bs"
import BMKFill from "../../img/icons/bmkFill.svg"
import BMKLine from "../../img/icons/bmkLine.svg"
import { getCookies } from "../../api/cookieControler";
import Alert from "../elements/Alert";

// /camping/{campingId}/like
function CampListElement(props) {
  const navigate = useNavigate();
  const {camp}= props;
  const [isBMK, setIsBMK] = useState(camp.campingLikeState);
  const clickBMK = async(event, id) =>{
    event.stopPropagation();
    const token = getCookies("id")
    if(!token) {
      Alert({ body: "로그인이 필요 합니다." })
      return ;
    }
    try {
      const {data} = await instance.post(`/camping/${id}/like`);
      setIsBMK(!isBMK)
    } catch (error) { console.log(error); }
  }
  
  return (
    <ListBox onClick={()=>{navigate(`../campdetail/${camp.campingId}`)}}>
      <div style={{ "position": "relative" }}>
        <ListImg img={camp.imageUrl} />
        <CountView>{camp.reviewCount}개 리뷰</CountView>
        <BookmarkBtn onClick={(event)=>{clickBMK(event, camp.campingId)}}>
          {(isBMK) ?
            <img src={BMKFill} /> : <img src={BMKLine} />
          }
        </BookmarkBtn>
      </div>
      <ItemBox>
        <DetailHeader>
          <DetailName>{camp.campingName}</DetailName>
        </DetailHeader>
        <AddressBox>{camp.address3}</AddressBox>
        <TagBox>
          {camp.campingEnv?.map((v, i) => {
            return (
              <CategoryTag key={i}>{v}</CategoryTag>
            )
          })}          
          {camp.campingType?.map((v, i) => {
            return (
              <CategoryTag key={i}>{v}</CategoryTag>
            )
          })}          
          {camp.campingFac?.map((v, i) => {
            return (
              <CategoryTag key={i}>{v}</CategoryTag>
            )
          })}
        </TagBox>
      </ItemBox>
    </ListBox>
  )
}

export default CampListElement;

const ListBox = styled.div`
  border-radius: 8px;
  overflow: hidden;
  background-color:white;
  border: 2px solid var(--Gray2);
`

const ListImg = styled(CampImgView)`
  height: 150px;
`
const CategoryTag = styled.div`
  border-radius: 50px;
  line-height: 24px;
  height: 24px;
  /* font-size: 12px; */
  /* border: 1px solid black; */
  background-color: var(--BackColor2);
  padding: var(--pad1) var(--pad2)  var(--pad1)  var(--pad2) ;
  flex-wrap: wrap; 
  font-size: 12px;
`

const TagBox = styled.div`
  /* display: flex; */
  display: inline-flex;
  gap: var(--pad2);
  padding-top: var(--interval);
  /* height: 60px; */
  flex-wrap: nowrap;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const DetailHeader = styled.div`
  padding-bottom:8px;
  display: flex;
`

const DetailName = styled(BoxName)`
  flex:5;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`
const CountView = styled.div`
  background-color: white;
  font-size: 10px;
  font-weight: bold;
  padding: var(--pad1) var(--pad2) var(--pad1) var(--pad2);
  border-radius: 4px;
  flex:1;
  text-align: center;
  position: absolute;
  top:10px; 
  left:10px;
`

const AddressBox = styled.div`
  /* padding: var(--pad1); */
  font-size: 14px;
  color: gray;
`

const BookmarkBtn = styled.div`
    position: absolute;
    top:20px; 
    right:20px;
    color: white;
    /* transform: translate(-50%,-50%); */
    /* padding:0; */
    /* margin:0; */
    /* font-size:30px; */
    /* box-shadow: 0px 0px 10px 0px black; */
    z-index: 5;
`