import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";
import { BoxHeader, BoxName, ItemBox } from "../elements/ItemBox";

import CampImgView from "../elements/CampImgView";
import { instance } from "../../api/axiosApi";

import { BsFillBookmarkFill } from "react-icons/bs"
import { BsBookmark } from "react-icons/bs"

import testImg from "../../img/test_camp_img.jpg"


function CampListElement(props) {
  const {camp}= props;
  const [isBMK, setIsBMK] = useState(camp.campingLikeState);
  const clickBMK = async(id) =>{
    try {
      await instance.patch(`mycamp/${camp.id}`, {"campingLikeState": !isBMK});
      setIsBMK(!isBMK)
    } catch (error) { console.log(error); }
  }
  console.log(camp)
  return (
    <ItemBox>
      <div style={{ "position": "relative" }}>
        <ListImg img={testImg} />
        <BookmarkBtn onClick={clickBMK}>
          {(isBMK) ?
            <BsFillBookmarkFill /> : <BsBookmark />
          }
        </BookmarkBtn>
      </div>
      <ItemBox>
        <BoxHeader>
          <BoxName>{camp.campingName}</BoxName>
          <CountView>{camp.reviewCount}개의 리뷰</CountView>
        </BoxHeader>
        <AddressBox>{camp.address1} {camp.address2} {camp.address3}</AddressBox>
      </ItemBox>
      <hr></hr>
      <ItemBox>
        <TagBox>
          {camp.tagCategory.map((v, i) => {
            return (
              <CategoryTag key={i}>{v}</CategoryTag>
            )
          })}
        </TagBox>
      </ItemBox>
    </ItemBox>
  )
}

export default CampListElement;

const ListImg = styled(CampImgView)`
  height: 150px;
`

const CategoryTag = styled.div`
  border-radius: 50px;
  border: 1px solid black;
  padding: var(--pad1) var(--pad2)  var(--pad1)  var(--pad2) ;
  flex-wrap: wrap;
  font-size: 12px;
`

const TagBox = styled.div`
  display: flex;
  gap: var(--pad2);
`

const CountView = styled.div`
  background-color: lightgrey;
  font-size: 10px;
  font-weight: bold;
  padding: var(--pad1);
`

const AddressBox = styled.div`
  padding: var(--pad1);
  font-size: 14px;
  color: gray;
`

const BookmarkBtn = styled.div`
    position: absolute;
    top:10px; 
    right:10px;
    /* transform: translate(-50%,-50%); */
    /* padding:0; */
    /* margin:0; */
    font-size:30px;
    filter: drop-shadow(10px 10px 10px 10px green);
    /* box-shadow: 0px 0px 10px 0px black; */
    z-index: 5;
`